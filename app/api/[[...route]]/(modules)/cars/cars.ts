import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "@/db/drizzle";
import { dynamicSchema, cars, users } from "@/db/schema";

const app = new Hono()
  .get("/", async (c) => {
    const fetchedCars = await db.query.cars.findMany({
      with: {
        owner: {
          columns: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return c.json({ success: true, data: fetchedCars }, 200);
  })
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ success: false, message: "Unauthorized user" }, 401);
      }
      const { id } = c.req.valid("param");
      if (!id) {
        return c.json({ success: false, message: "Car ID is required" }, 400);
      }
      const car = await db.query.cars.findFirst({
        where: eq(cars.id, id),
        with: {
          owner: {
            columns: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });
      if (!car) {
        return c.json({ success: false, message: "Car not found" }, 404);
      }
      return c.json({ success: true, data: car }, 200);
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator("json", dynamicSchema),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ success: false, message: "Unauthorized user" }, 401);
      }
      console.log("authenticated user", auth.userId);

      const body = c.req.valid("json");
      const user = await db.query.users.findFirst({
        where: eq(users.clerk_id, auth.userId),
      });
      if (!user) {
        return c.json({ success: false, message: "User not found" }, 404);
      }
      const values = {
        ...body,
        ownerId: user.id,
        id: createId(),
      };
      console.log("values", values);
      const car = await db.insert(cars).values(values).returning();
      console.log("car", car);

      return c.json({ success: true, car }, 200);
    }
  );

export default app;
