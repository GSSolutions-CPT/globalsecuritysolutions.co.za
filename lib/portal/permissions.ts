export type StaffRole = 'admin' | 'manager' | 'technician' | 'accountant'

export type PortalUserType = 'staff' | 'client' | 'unknown'

export const STAFF_ROLES: StaffRole[] = ['admin', 'manager', 'technician', 'accountant']

export const PUBLIC_PORTAL_ROUTES = [
    '/portal/login',
    '/portal/register',
    '/portal/register-client',
    '/portal/auth/callback',
    '/portal/reset-password',
] as const

export const CLIENT_PORTAL_ROUTES = [
    '/portal/client-portal',
] as const

const ROUTE_ROLE_REQUIREMENTS: Array<{ prefix: string; roles: StaffRole[] | 'all_staff' }> = [
    { prefix: '/portal/settings', roles: ['admin', 'manager'] },
    { prefix: '/portal/financials', roles: ['admin', 'manager', 'accountant'] },
    { prefix: '/portal/contracts', roles: ['admin', 'manager'] },
    { prefix: '/portal/sales', roles: ['admin', 'manager', 'accountant'] },
    { prefix: '/portal/dashboard', roles: 'all_staff' },
    { prefix: '/portal/requests', roles: 'all_staff' },
    { prefix: '/portal/clients', roles: 'all_staff' },
    { prefix: '/portal/products', roles: 'all_staff' },
    { prefix: '/portal/jobs', roles: 'all_staff' },
]

export function isPublicPortalRoute(pathname: string): boolean {
    if (PUBLIC_PORTAL_ROUTES.includes(pathname as (typeof PUBLIC_PORTAL_ROUTES)[number])) {
        return true
    }
    return pathname.startsWith('/portal/profile-setup/')
}

export function isClientPortalRoute(pathname: string): boolean {
    return CLIENT_PORTAL_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))
}

export function isStaffPortalRoute(pathname: string): boolean {
    if (!pathname.startsWith('/portal')) return false
    if (isPublicPortalRoute(pathname)) return false
    if (isClientPortalRoute(pathname)) return false
    if (pathname === '/portal') return false
    return true
}

export function getRequiredStaffRoles(pathname: string): StaffRole[] | 'all_staff' | null {
    if (!isStaffPortalRoute(pathname)) return null

    const match = ROUTE_ROLE_REQUIREMENTS.find(({ prefix }) =>
        pathname === prefix || pathname.startsWith(`${prefix}/`)
    )

    return match?.roles ?? 'all_staff'
}

export function staffRoleCanAccess(pathname: string, role: StaffRole): boolean {
    const required = getRequiredStaffRoles(pathname)
    if (!required) return true
    if (required === 'all_staff') return true
    return required.includes(role)
}

export function canManageTeam(role: StaffRole | null): boolean {
    return role === 'admin' || role === 'manager'
}

export function canExportData(role: StaffRole | null): boolean {
    return role === 'admin' || role === 'manager'
}

export function canImportData(role: StaffRole | null): boolean {
    return role === 'admin'
}