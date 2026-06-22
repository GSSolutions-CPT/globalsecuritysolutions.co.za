import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * OAuth / Magic-link Callback Route Handler
 *
 * This is a Next.js Route Handler (not a page) — it runs on the server and is
 * responsible for exchanging the one-time `code` query parameter for a Supabase
 * session stored in an HTTP-only cookie.
 *
 * Why this MUST be a route handler and not a page:
 * - Supabase PKCE OAuth requires `exchangeCodeForSession()` on the server
 *   so that the resulting `sb-*` auth cookies are correctly set.
 * - A client `page.tsx` cannot reliably set cookies before the middleware runs,
 *   causing users to be redirected back to /portal/login even after a successful
 *   OAuth sign-in.
 */
export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // `next` allows deep-linking after OAuth — defaults to portal root which will redirect by role
    const next = searchParams.get('next') ?? '/portal'

    if (code) {
        const cookieStore = await cookies()

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll()
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            cookieStore.set(name, value, options)
                        })
                    },
                },
            }
        )

        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // Redirect to the portal root — the middleware + portal/page.tsx will
            // handle routing to the correct destination based on the user's role.
            return NextResponse.redirect(`${origin}${next}`)
        }

        console.error('[auth/callback] Code exchange failed:', error.message)
    }

    // If code is missing or exchange failed, redirect to login with an error flag
    return NextResponse.redirect(`${origin}/portal/login?error=auth_failed`)
}
