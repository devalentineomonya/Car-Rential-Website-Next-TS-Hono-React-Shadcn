import { Hono } from "hono";
import { handle } from "hono/vercel";
import users from "./(modules)/users/users";
import webhooks from "./(modules)/users/webhooks";
import clerkManager from "./(modules)/users/clerkManager";
const app = new Hono().basePath("/api");

const routes = app
  .route("/users", users)
  .route("/users/webhooks", webhooks)
  .route("/user", clerkManager);

routes.onError((err, c) => {
  console.error(err);
  return c.json(
    { success: false, message: "Internal server error", error: err.message },
    500
  );
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
