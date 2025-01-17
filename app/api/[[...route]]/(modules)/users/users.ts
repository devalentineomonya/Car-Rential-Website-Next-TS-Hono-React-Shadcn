import { clerkClient } from "@clerk/nextjs/server";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "@/db/drizzle";
import { insertUserSchema, users } from "@/db/schema";

const createUserSchema = insertUserSchema
  .extend({
    isNew: z.boolean().optional().default(true),
  })
  .omit({ createdAt: true, updatedAt: true });

const updateUserSchema = insertUserSchema
  .extend({
    isNew: z.boolean().optional().default(false),
  })
  .required()
  .omit({ createdAt: true, updatedAt: true });

export const createUser = async (
  userData: z.infer<typeof createUserSchema>
) => {
  try {
    const [data] = await db
      .insert(users)
      .values({
        ...userData,
      })
      .returning();

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      error: "Failed to create user",
    };
  }
};

export const updateUser = async (
  userData: z.infer<typeof updateUserSchema>
) => {
  const { id, clerk_id, ...safeUpdate } = userData;
  try {
    const [data] = await db
      .update(users)
      .set(safeUpdate)
      .where(and(eq(users.id, id), eq(users.clerk_id, clerk_id)))
      .returning({
        firstName: users.firstName,
        lastName: users.lastName,
        location: users.location,
        address: users.address,
        phone: users.phone,
        email: users.email,
      });

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      success: false,
      error: "Failed to update user",
    };
  }
};

const app = new Hono()
  /*====================
  GET all users
  =====================*/
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ success: false, message: "Unauthorized user" }, 401);
    }
    const data = await db.query.users.findMany();
    return c.json({ success: true, data }, 200);
  })
  /*====================
  GET user by Clerk ID
  =====================*/
  .get(
    "/:clerkId?",
    zValidator("param", z.object({ clerkId: z.string().optional() })),
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ success: false, message: "Unauthorized user" }, 401);
      }
      const { clerkId } = c.req.valid("param");
      if (!clerkId) {
        return c.json(
          { success: false, message: "Missing or invalid Clerk ID" },
          400
        );
      }
      const data = await db.query.users.findFirst({
        where: eq(users.clerk_id, clerkId),
        columns: {
          id: true,
          clerk_id: true,
          firstName: true,
          lastName: true,
          location: true,
          address: true,
          phone: true,
          email: true,
        },
      });
      if (!data) {
        return c.json(
          {
            success: false,
            message: "User with the specified id was not found.",
          },
          404
        );
      }

      return c.json({ success: true, data }, 200);
    }
  )

  /*===============
  Create User
  ================*/
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      createUserSchema.pick({
        firstName: true,
        lastName: true,
        location: true,
        email: true,
        address: true,
        phone: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ success: false, message: "Unauthorized user" }, 401);
      }

      const values = c.req.valid("json");

      const userData = {
        id: createId(),
        isNew: true,
        clerk_id: auth.userId,
        ...values,
      };

      const data = await createUser(userData);
      if (data.success) {
        return c.json({ success: true, data: data.data }, 200);
      } else {
        return c.json(
          { success: false, message: "Error creating user in DB" },
          500
        );
      }
    }
  )

  /*===============
  Update User
  ================*/
  .put(
    "/:id",
    clerkMiddleware(),
    zValidator("json", updateUserSchema.omit({ isNew: true })),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ success: false, message: "Unauthorized user" }, 401);
      }

      const values = c.req.valid("json");

      const client = await clerkClient();
      await client.users.updateUserMetadata(auth.userId, {
        publicMetadata: {
          isNew: false,
        },
      });

      await client.users.updateUser(auth.userId, {
        firstName: values.firstName ?? "",
        lastName: values.lastName ?? "",
      });

      const data = await updateUser({ ...values, isNew: false });
      if (data.success) {
        return c.json({ success: true, data: data.data }, 200);
      } else {
        return c.json(
          { success: false, message: "Error updating user in DB" },
          500
        );
      }
    }
  );

export default app;
