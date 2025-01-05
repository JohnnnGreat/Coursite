import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { JWT } from "next-auth/jwt";
import { NextRequest } from "next/server";

// Custom logging function for Edge Runtime
const log = (...args: any[]): void => {
   console.log("[Middleware]", ...args);
};

/**
 * Middleware function for route protection and user redirection
 */
export default withAuth(
   async function middleware(req: NextRequest) {
      const userId = req.url.split("/dashboard/")[1]; // Get userId from URL
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("userId", userId);

      const token = req.nextauth.token as JWT | null;
      const isAuth = !!token;
      const isAuthPage =
         req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");
      const isAdminPage = req.nextUrl.pathname.startsWith("/dashboard");
      
      const isInstructorCreate = req.nextUrl.pathname.startsWith("/dashboard/courses/create");

      log("Token:", token?.role, "Is Instructor Create Page:", isInstructorCreate);

      // Handle authenticated users visiting auth pages
      if (isAuthPage && isAuth) {
         log("Redirecting authenticated user from auth page to dashboard");
         return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      // Redirect users who are not instructors from the instructor create page
      if (token?.role !== "INSTRUCTOR" && isInstructorCreate) {
         log("Redirecting non-instructor from instructor create page to courses");
         return NextResponse.redirect(new URL("/dashboard/courses", req.url));
      }

      // Handle admin route protection
      if (!isAuth) {
         log("Unauthorized access to protected page, redirecting to unauthorized");
         return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      log("Allowing request to proceed");
      return NextResponse.next({
         request: {
            headers: requestHeaders,
         },
      });
   },
   {
      callbacks: {
         authorized: ({ token }: { token: JWT | null }) => {
            log("Authorization check for token:", !!token);
            return !!token;
         },
      },
   },
);

export const config = {
   matcher: ["/dashboard/:path*", "/admin/:path*", "/teacher/:path*", "/profile/:path*"],
};
