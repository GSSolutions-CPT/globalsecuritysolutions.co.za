import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareSupabaseClient } from '@/lib/portal/supabase/middleware'
import { resolvePortalAccessFromTables } from '@/lib/portal/resolve-portal-access-from-tables'
import {
    isClientPortalRoute,
    isPublicPortalRoute,
    isStaffPortalRoute,
    staffRoleCanAccess,
    type StaffRole,
} from '@/lib/portal/permissions'

const DISABLED_REGISTRATION_ROUTES = ['/portal/register', '/portal/register-client']

export async function proxy(request: NextRequest) {
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
            const destination = await resolvePostLoginPath(supabase, '/portal/dashboard')
            if (!destination.startsWith('/portal/login')) {
                return NextResponse.redirect(new URL(destination, request.url))
            }
        }
        return response
    }

    if (!user) {
        const loginUrl = request.nextUrl.clone()
        loginUrl.pathname = '/portal/login'
        loginUrl.searchParams.set('from', `${pathname}${request.nextUrl.search}`)
        return NextResponse.redirect(loginUrl)
    }

    const portalAccess = await resolvePortalAccessFromDb(supabase)
    const staffRole = portalAccess.staffRole
    const isStaff = Boolean(staffRole)
    const isClient = Boolean(portalAccess.clientId)
    const clientProfile = portalAccess.clientId ? { id: portalAccess.clientId } : null

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

type MiddlewarePortalAccess = {
    staffRole: StaffRole | null
    clientId: string | null
}

async function resolvePortalAccessFromDb(
    supabase: ReturnType<typeof createMiddlewareSupabaseClient>
): Promise<MiddlewarePortalAccess> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { staffRole: null, clientId: null }
    }

    return resolvePortalAccessFromTables(supabase, user.id)
}

async function resolvePostLoginPath(
    supabase: ReturnType<typeof createMiddlewareSupabaseClient>,
    fallback: string
) {
    const portalAccess = await resolvePortalAccessFromDb(supabase)

    if (portalAccess.clientId) {
        return `/portal/client-portal?client=${portalAccess.clientId}`
    }

    if (portalAccess.staffRole) {
        return fallback
    }

    return '/portal/login?error=unauthorized'
}

export const config = {
    matcher: ['/portal/:path*'],
}