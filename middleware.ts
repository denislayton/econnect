import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if the user is authenticated
  const session = request.cookies.get("session")

  // If the user is not authenticated and trying to access protected routes
  if (
    !session &&
    (request.nextUrl.pathname.startsWith("/profile") ||
      request.nextUrl.pathname.startsWith("/post-property") ||
      request.nextUrl.pathname.startsWith("/post-plan") ||
      request.nextUrl.pathname.startsWith("/admin"))
  ) {
    // Redirect to the login page
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // If the user is authenticated and trying to access auth routes
  if (
    session &&
    (request.nextUrl.pathname.startsWith("/auth/login") || request.nextUrl.pathname.startsWith("/auth/register"))
  ) {
    // Redirect to the profile page
    return NextResponse.redirect(new URL("/profile", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile/:path*", "/post-property", "/post-plan", "/admin/:path*", "/auth/login", "/auth/register"],
}
