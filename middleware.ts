import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareSupabaseClient } from '@/lib/portal/supabase/middleware'
import {
    isClientPortalRoute,
    isPublicPortalRoute,
    isStaffPortalRoute,
    staffRoleCanAccess,
    type StaffRole,
} from '@/lib/portal/permissions'

const DISABLED_REGISTRATION_ROUTES = ['/portal/register', '/portal/register-client']

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (!pathname.startsWith('/portal')) {
        return NextResponse.next()
    }

    let response = NextResponse.next({ request })
    const supabase = createMiddlewareSupabaseClient(request, response)
    const { data: { user } } = await supabase.auth.getUser()

    if (DISABLED_REGISTRATION_ROUTES.includes(pathname)) {
        const loginUrl = request.nextUrl.clone()
        loginUrl.pathname = '/portal/login'
        loginUrl.searchParams.set('error', 'registration_disabled')
        return NextResponse.redirect(loginUrl)
    }

    if (isPublicPortalRoute(pathname)) {
        if (user && (pathname === '/portal/login' || pathname === '/portal/register')) {
            const destination = await resolvePostLoginPath(supabase, user.id, '/portal/dashboard')
            return NextResponse.redirect(new URL(destination, request.url))
        }
        return response
    }

    if (!user) {
        const loginUrl = request.nextUrl.clone()
        loginUrl.pathname = '/portal/login'
        loginUrl.searchParams.set('from', `${pathname}${request.nextUrl.search}`)
        return NextResponse.redirect(loginUrl)
    }

    const [{ data: staffProfile }, { data: clientProfile }] = await Promise.all([
        supabase.from('users').select('role').eq('id', user.id).maybeSingle(),
        supabase.from('clients').select('id').eq('auth_user_id', user.id).maybeSingle(),
    ])

    const staffRole = (staffProfile?.role as StaffRole | undefined) ?? null
    const isStaff = Boolean(staffProfile)
    const isClient = Boolean(clientProfile)

    if (pathname === '/portal') {
        if (isClient && clientProfile) {
            return NextResponse.redirect(new URL(`/portal/client-portal?client=${clientProfile.id}`, request.url))
        }
        if (isStaff) {
            return NextResponse.redirect(new URL('/portal/dashboard', request.url))
        }
        const loginUrl = request.nextUrl.clone()
        loginUrl.pathname = '/portal/login'
        loginUrl.searchParams.set('error', 'unauthorized')
        return NextResponse.redirect(loginUrl)
    }

    if (isClientPortalRoute(pathname)) {
        if (!isClient || !clientProfile) {
            if (isStaff) {
                return NextResponse.redirect(new URL('/portal/dashboard', request.url))
            }
            const loginUrl = request.nextUrl.clone()
            loginUrl.pathname = '/portal/login'
            loginUrl.searchParams.set('error', 'unauthorized')
            return NextResponse.redirect(loginUrl)
        }

        const requestedClientId = request.nextUrl.searchParams.get('client')
        if (requestedClientId && requestedClientId !== clientProfile.id) {
            return NextResponse.redirect(new URL(`/portal/client-portal?client=${clientProfile.id}`, request.url))
        }

        if (!requestedClientId) {
            const clientPortalUrl = request.nextUrl.clone()
            clientPortalUrl.searchParams.set('client', clientProfile.id)
            return NextResponse.redirect(clientPortalUrl)
        }

        return response
    }

    if (isStaffPortalRoute(pathname)) {
        if (!isStaff || !staffRole) {
            if (isClient && clientProfile) {
                return NextResponse.redirect(new URL(`/portal/client-portal?client=${clientProfile.id}`, request.url))
            }
            const loginUrl = request.nextUrl.clone()
            loginUrl.pathname = '/portal/login'
            loginUrl.searchParams.set('error', 'unauthorized')
            return NextResponse.redirect(loginUrl)
        }

        if (!staffRoleCanAccess(pathname, staffRole)) {
            return NextResponse.redirect(new URL('/portal/dashboard', request.url))
        }
    }

    return response
}

async function resolvePostLoginPath(
    supabase: ReturnType<typeof createMiddlewareSupabaseClient>,
    userId: string,
    fallback: string
) {
    const [{ data: clientProfile }, { data: staffProfile }] = await Promise.all([
        supabase.from('clients').select('id').eq('auth_user_id', userId).maybeSingle(),
        supabase.from('users').select('role').eq('id', userId).maybeSingle(),
    ])

    if (clientProfile) {
        return `/portal/client-portal?client=${clientProfile.id}`
    }

    if (staffProfile) {
        return fallback
    }

    return '/portal/login?error=unauthorized'
}

export const config = {
    matcher: ['/portal/:path*'],
}