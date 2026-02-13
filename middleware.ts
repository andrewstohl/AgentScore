import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Password for authentication
const AUTH_PASSWORD = 'GoIrish200!'
const AUTH_COOKIE_NAME = 'as-auth'
const AUTH_COOKIE_VALUE = 'authenticated'

// Routes that require authentication
const PROTECTED_ROUTES = ['/dashboard', '/docs']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the current path is protected
  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  // If not a protected route, allow access
  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Check for auth cookie
  const authCookie = request.cookies.get(AUTH_COOKIE_NAME)
  const isAuthenticated = authCookie?.value === AUTH_COOKIE_VALUE

  // If authenticated, allow access
  if (isAuthenticated) {
    return NextResponse.next()
  }

  // Not authenticated - redirect to login
  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('redirect', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/docs', '/docs/:path*'],
}
