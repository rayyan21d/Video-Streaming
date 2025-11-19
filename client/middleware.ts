// // middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // If user is logged in and tries to access /login, redirect to /profile
    if (token && path.startsWith("/login")) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }

    // If user is not logged in and tries to access /profile, middleware will
    // automatically redirect to /login due to withAuth configuration
    return NextResponse.next();
  },
  {
    callbacks: {
      // Return true if the user should be allowed to access the page
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        
        // Allow access to login page without authentication
        if (path.startsWith("/login")) {
          return true;
        }

        // Require authentication for profile page
        if (path.startsWith("/profile")) {
          return !!token;
        }

        // Allow access to other pages
        return true;
      },
    },
    pages: {
      signIn: "/login",
    },
}
);

// Specify which routes to run middleware on
export const config = {
  matcher: ["/login/:path*", "/profile/:path*"]
};