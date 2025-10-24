import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware to protect routes and handle authentication
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ["/sign-in"];

  // Check if the route is public
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Get token from cookie (if available) or check localStorage on client side
  // Note: This is a basic implementation. For production, use httpOnly cookies
  const token = request.cookies.get("access_token")?.value;

  // If trying to access a protected route without a token
  if (!isPublicRoute && !token) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // If trying to access sign-in page while already authenticated
  if (isPublicRoute && token && pathname === "/sign-in") {
    return NextResponse.redirect(new URL("/recruiting", request.url));
  }

  return NextResponse.next();
}

/**
 * Matcher configuration
 * This middleware runs on all routes except static files and API routes
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp).*)",
  ],
};
