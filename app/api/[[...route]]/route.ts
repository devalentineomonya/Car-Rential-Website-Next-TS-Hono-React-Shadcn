import { Hono } from "hono";
import { handle } from "hono/vercel";
import users from "./(modules)/users/users";
import webhooks from "./(modules)/users/webhooks";
const app = new Hono().basePath("/api");

const routes = app.route("/users", users).route("/users/webhooks", webhooks);

routes.onError((err, c) => {
  console.error(err);
  return c.json(
    { success: false, message: "Internal server error", error: err.message },
    500
  );
});

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
