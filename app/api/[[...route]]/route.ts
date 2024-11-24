import { Hono } from "hono";
import { handle } from "hono/vercel";
import users from "./users";
export const runtime = "edge";
import { HTTPException } from "hono/http-exception";
const app = new Hono().basePath("/api");

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.json({ success: false, message: "Internal server error" }, 500);
});

const routes = app.route("/users", users);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
