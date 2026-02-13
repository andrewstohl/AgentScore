import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const AUTH_PASSWORD = 'GoIrish200!'
const AUTH_COOKIE_NAME = 'as-auth'
const AUTH_COOKIE_VALUE = 'authenticated'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { password } = body

    if (password === AUTH_PASSWORD) {
      const cookieStore = await cookies()
      cookieStore.set(AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })
      
      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid password' },
      { status: 401 }
    )
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal error' },
      { status: 500 }
    )
  }
}
