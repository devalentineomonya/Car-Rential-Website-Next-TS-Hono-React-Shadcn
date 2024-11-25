import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { clerkClient } from "@clerk/nextjs/server";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
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
  });

export default app;
