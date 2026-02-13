import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Shield, Lock, ArrowRight } from 'lucide-react'

const AUTH_PASSWORD = 'GoIrish200!'
const AUTH_COOKIE_NAME = 'as-auth'
const AUTH_COOKIE_VALUE = 'authenticated'

async function login(formData: FormData) {
  'use server'
  
  const password = formData.get('password') as string
  const redirectTo = formData.get('redirect') as string || '/dashboard'

  if (password === AUTH_PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set(AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    redirect(redirectTo)
  }
  
  // Password incorrect - redirect back with error
  redirect(`/login?error=1&redirect=${encodeURIComponent(redirectTo)}`)
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const redirectTo = (searchParams.redirect as string) || '/dashboard'
  const hasError = searchParams.error === '1'

  return (
    <main className="min-h-screen bg-gradient-to-b from-as-dark to-as-navy flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-as-accent/10 mb-4">
              <Shield className="w-8 h-8 text-as-accent" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">
              AgentScore — Mission Control
            </h1>
            <p className="text-as-muted text-sm">
              Enter the password to access protected areas
            </p>
          </div>

          {/* Form */}
          <form action={login} className="space-y-4">
            <input type="hidden" name="redirect" value={redirectTo} />
            
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-as-muted mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-as-muted" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  autoFocus
                  className="block w-full pl-10 pr-3 py-3 bg-as-dark border border-white/10 rounded-xl text-white placeholder-as-muted focus:outline-none focus:ring-2 focus:ring-as-accent/50 focus:border-as-accent/50 transition-all"
                  placeholder="Enter password"
                />
              </div>
            </div>

            {hasError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                Incorrect password. Please try again.
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-as-accent hover:bg-as-accent-hover text-as-dark font-semibold rounded-xl transition-colors"
            >
              Enter
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Back link */}
          <div className="mt-6 text-center">
            <a 
              href="/" 
              className="text-sm text-as-muted hover:text-as-accent transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-as-muted/60 mt-6">
          Protected area. Unauthorized access prohibited.
        </p>
      </div>
    </main>
  )
}
