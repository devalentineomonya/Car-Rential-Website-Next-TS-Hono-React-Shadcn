import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/admin(.*)", "/user(.*)"]);
export default clerkMiddleware(
  (auth, request) => {
    if (isProtectedRoute(request)) {
      auth.protect();
      const url = new URL(request.url);
      const path = url.pathname;
      if (path === "/user") {
        return NextResponse.redirect(new URL("/user/dashboard", request.url));
      }
      if (path === "/admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
    }
  },
  { debug: true }
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
