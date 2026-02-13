import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AUTH_COOKIE_NAME = 'as-auth'
const AUTH_COOKIE_VALUE = 'authenticated'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect old routes to mission-control
  if (pathname === '/dashboard' || pathname.startsWith('/dashboard/')) {
    return NextResponse.redirect(new URL('/mission-control', request.url))
  }
  
  // Only protect /mission-control routes
  const isProtectedRoute = pathname === '/mission-control' || pathname.startsWith('/mission-control/')

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
  matcher: [
    '/mission-control',
    '/mission-control/:path*',
    '/dashboard',
    '/dashboard/:path*',
  ],
}
