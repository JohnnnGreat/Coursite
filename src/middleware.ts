// middleware.ts
import { url } from "inspector";
import { withAuth } from "next-auth/middleware";
import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

// Custom logging function for Edge Runtime
const log = (...args: any[]) => {
   console.log("[Middleware]", ...args);
};

export default withAuth(
   function middleware(req) {
      // Use the custom logging function
      log("Request URL:", req.url);
      log("Token:", req.nextauth.token);

      const token = req.nextauth.token;
      const isAuth = !!token;
      const isAuthPage =
         req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");
      const isAdminPage = req.nextUrl.pathname.startsWith("/dashboard");
      const isTeacherPage = req.nextUrl.pathname.startsWith("/teacher");
      const isInstructorCreate = req.nextUrl.pathname.startsWith("/dashboard/courses/create");
      

      // Handle authenticated users visiting auth pages
      if (isAuthPage && isAuth) {
         log("Redirecting authenticated user from auth page to dashboard");
         return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      if (token?.role !== "INSTRUCTOR" && isInstructorCreate) {
         return NextResponse.redirect(new URL("/dashboard/courses", req.url));
      }

      // Handle admin route protection
      if (!isAuth) {
         log("Unauthorized access to admin page, redirecting");
         return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      log("Allowing request to proceed");
      return NextResponse.next();
   },
   {
      callbacks: {
         authorized: ({ token }) => {
            log("Authorization check for token:", !!token);

            return !!token;
         },
      },
   },
);

export const config = {
   matcher: ["/dashboard/:path*", "/admin/:path*", "/teacher/:path*", "/profile/:path*"],
};
