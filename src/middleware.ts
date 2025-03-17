import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public paths that don't require authentication
const publicPaths = ['/auth/login', '/auth/signup'];

export function middleware(request: NextRequest) {
  // Get the path from the request URL
  const path = request.nextUrl.pathname;

  // Get auth token from the cookies - using the same cookie name as in AuthContext
  const isAuthenticated = request.cookies.has('authToken');

  // Check if the path is a public path
  const isPublicPath = publicPaths.some(
    (publicPath) => path === publicPath || path.startsWith(`${publicPath}/`),
  );

  // If the user is not authenticated and tries to access a protected route
  if (!isAuthenticated && !isPublicPath) {
    // Redirect to login
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If the user is authenticated and tries to access login or signup page
  if (isAuthenticated && isPublicPath) {
    // Redirect to dashboard
    return NextResponse.redirect(new URL('/', request.url));
  }

  // For all other cases, continue with the request
  return NextResponse.next();
}

// Configure which paths this middleware should run on
export const config = {
  matcher: [
    // Apply to all routes except static files, api routes, and _next
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
