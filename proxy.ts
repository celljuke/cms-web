import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require admin access
const ADMIN_ROUTES = ["/admin"];

// Protected routes that require authentication
const PROTECTED_ROUTES = ["/recruiting", "/settings", "/profile", "/admin"];

// Public routes
const PUBLIC_ROUTES = ["/sign-in", "/sign-up", "/"];

/**
 * Decode JWT token without verification
 * The backend already verified the token when it was issued
 * We just need to read the payload to check the role
 */
function decodeToken(token: string) {
  try {
    // JWT format: header.payload.signature
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    // Decode the payload (base64url)
    const payload = parts[1];
    const decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("JWT decode failed:", error);
    return null;
  }
}

/**
 * Proxy middleware to protect routes and handle authentication
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from httpOnly cookie
  const token = request.cookies.get("access_token")?.value;

  // Check if the route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route);
  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));

  // If accessing protected route without token, redirect to sign-in
  if (isProtectedRoute && !token) {
    const url = new URL("/sign-in", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // If accessing public route with token, redirect to dashboard
  if (isPublicRoute && token && pathname === "/sign-in") {
    return NextResponse.redirect(new URL("/recruiting", request.url));
  }

  // For admin routes, decode JWT and check role
  if (isAdminRoute && token) {
    const payload = decodeToken(token);

    if (!payload || !payload.role) {
      // Invalid token or no role - redirect to sign-in
      const url = new URL("/sign-in", request.url);
      return NextResponse.redirect(url);
    }

    const userRole = payload.role as string;

    // Check if user has admin or super_admin role
    if (userRole !== "admin" && userRole !== "super_admin") {
      // User doesn't have permission - show 404 instead of revealing the route exists
      return NextResponse.rewrite(new URL("/404", request.url));
    }
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
