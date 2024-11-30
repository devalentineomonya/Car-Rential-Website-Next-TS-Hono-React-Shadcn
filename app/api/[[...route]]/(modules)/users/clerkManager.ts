import { clerkClient } from "@clerk/nextjs/server";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

import {
  schemaWithCurrentPassword,
  schemaWithoutCurrentPassword,
} from "@/utils/constants";
const imageUpdateSchema = z.object({
  file: z.instanceof(File),
});

const app = new Hono()
  .put(
    "/change-image",
    clerkMiddleware(),
    zValidator("form", imageUpdateSchema),
    async (c) => {
      const auth = getAuth(c);
      const client = await clerkClient();

      if (!auth?.userId) {
        return c.json({ success: false, message: "Unauthorized user" }, 401);
      }
      await client.users.updateUserProfileImage(auth.userId, {
        file: c.req.valid("form").file,
      });
      return c.json({ success: true, message: "Image updated" }, 200);
    }
  )
  .put("/remove-image", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    const client = await clerkClient();
    if (!auth?.userId) {
      return c.json({ success: false, message: "Unauthorized user" }, 401);
    }
    await client.users.deleteUserProfileImage(auth.userId);
    return c.json({ success: true, message: "Image removed" }, 200);
  })
  .put(
    "/set-password",
    clerkMiddleware(),
    zValidator("json", schemaWithoutCurrentPassword),
    async (c) => {
      const auth = getAuth(c);
      const client = await clerkClient();
      if (!auth?.userId) {
        return c.json({ success: false, message: "Unauthorized user" }, 401);
      }
      const response = await client.users.updateUser(auth.userId, {
        password: c.req.valid("json").newPassword,
      });
      return c.json(
        { success: true, message: "Password updated", data: response },
        200
      );
    }
  )
  .put(
    "/change-password",
    clerkMiddleware(),
    zValidator("json", schemaWithCurrentPassword),
    async (c) => {
      const auth = getAuth(c);
      const client = await clerkClient();
      if (!auth?.userId) {
        return c.json({ success: false, message: "Unauthorized user" }, 401);
      }
      const { currentPassword, newPassword } = c.req.valid("json");

      const isValidPassword = await client.users.verifyPassword({
        password: currentPassword,
        userId: auth.userId,
      });
      console.log("isValidPassword", { isValidPassword });
      if (!isValidPassword) {
        return c.json(
          { success: false, message: "Invalid current password" },
          400
        );
      }
      const response = await client.users.updateUser(auth.userId, {
        password: newPassword,
      });
      console.log(response);
      return c.json({ success: true, message: "Password updated" }, 200);
    }
  );

export default app;
