import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/admin(.*)", "/user(.*)"]);

export default clerkMiddleware(
  async (auth, request) => {
    if (isProtectedRoute(request)) {
      await auth.protect();
      const { userId } = await auth();
      const url = new URL(request.url);
      const path = url.pathname;

      if (userId) {
        const client = await clerkClient();
        const user = await client.users.getUser(userId);

        const publicMetadata = user.publicMetadata;
        const isNewUser =
          publicMetadata?.isNew &&
          (path.startsWith("/admin") || path.startsWith("/user"));

        if (isNewUser && path !== "/user/profile") {
          return NextResponse.redirect(new URL("/user/profile", request.url));
        }
      }

      if (path === "/user") {
        return NextResponse.redirect(new URL("/user/dashboard", request.url));
      }

      if (path === "/admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
    }
    return NextResponse.next();
  },
  //   { debug: process.env.NODE_ENV === "development" }
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
