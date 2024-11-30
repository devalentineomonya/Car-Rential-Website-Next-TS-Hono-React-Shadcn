import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

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

    return c.json({ success: true, cars: fetchedCars }, 200);
  })
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
