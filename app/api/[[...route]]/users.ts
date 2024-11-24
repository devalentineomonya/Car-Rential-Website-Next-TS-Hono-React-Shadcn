import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";
const app = new Hono().get("/", clerkMiddleware(), async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) {
    throw new HTTPException(401, {
      res: c.json({ success: false, message: "Unauthorized user" }),
    });
  }
  const data = await db.query.users.findMany();
  return c.json({ success: true, data }, 200);
});
export default app;
