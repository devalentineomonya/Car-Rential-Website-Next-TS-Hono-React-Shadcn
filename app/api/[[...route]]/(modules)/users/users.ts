import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { insertUserSchema, users } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";

import { z } from "zod";
import { eq } from "drizzle-orm";

export const createUser = async (
  userData: z.infer<typeof insertUserSchema>
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

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ success: false, message: "Unauthorized user" }, 401);
    }
    const data = await db.query.users.findMany();
    return c.json({ success: true, data }, 200);
  })
  .get("/:clerkId", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ success: false, message: "Unauthorized user" }, 401);
    }
    const { clerkId } = c.req.param();
    const data = await db.query.users.findFirst({
      where: eq(users.clerk_id, clerkId),
    });
    return c.json({ success: true, data }, 200);
  })
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertUserSchema.pick({
        firstName: true,
        lastName: true,
        location: true,
        email: true,
        address: true,
        phone: true,
        isNew: true,
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
  .put("/:id", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ success: false, message: "Unauthorized user" }, 401);
      
      
    }
  });
export default app;
