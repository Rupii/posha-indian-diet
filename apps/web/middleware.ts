// AUTH DISABLED — preview mode, no login required
// To re-enable: remove the early return below and uncomment the auth logic
import { NextResponse, type NextRequest } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PROTECTED_ROUTES = [
  '/dashboard',
  '/meal-plans',
  '/log',
  '/recipes',
  '/pregnancy',
  '/postpartum',
  '/thali',
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AUTH_ROUTES = ['/login', '/signup', '/onboarding']

export async function middleware(request: NextRequest) {
  // AUTH DISABLED: pass all requests through
  return NextResponse.next({ request: { headers: request.headers } })

  /* AUTH LOGIC — uncomment when Supabase is wired up
  import { createServerClient, type CookieOptions } from '@supabase/ssr'

  let response = NextResponse.next({ request: { headers: request.headers } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    },
  )

  const { data: { session } } = await supabase.auth.getSession()
  const { pathname } = request.nextUrl

  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  )
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  )

  if (isProtectedRoute && !session) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute && session) {
    const redirectTo = request.nextUrl.searchParams.get('redirectTo')
    const destination =
      redirectTo && PROTECTED_ROUTES.some((r) => redirectTo.startsWith(r))
        ? redirectTo
        : '/dashboard'
    return NextResponse.redirect(new URL(destination, request.url))
  }

  return response
  */
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/meal-plans/:path*',
    '/log/:path*',
    '/recipes/:path*',
    '/pregnancy/:path*',
    '/postpartum/:path*',
    '/thali/:path*',
    '/login',
    '/signup',
    '/onboarding/:path*',
  ],
}
