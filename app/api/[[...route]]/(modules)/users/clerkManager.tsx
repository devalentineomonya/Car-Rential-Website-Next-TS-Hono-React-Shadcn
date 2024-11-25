import { getAuth } from "@clerk/nextjs/server";
import { Hono } from "hono";

const app = new Hono()
.put("/", async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) {
      return c.json({ success: false, message: "Unauthorized user" }, 401);
    }
  });

export default app;

