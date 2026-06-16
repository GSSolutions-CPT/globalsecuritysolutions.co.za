'use client'

import { useEffect, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import {
    isClientPortalRoute,
    isPublicPortalRoute,
    isStaffPortalRoute,
    staffRoleCanAccess,
} from '@/lib/portal/permissions'

interface PortalGuardProps {
    children: ReactNode
}

export default function PortalGuard({ children }: PortalGuardProps) {
    const { user, loading, portalAccess, accessLoading } = useAuth()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        if (loading || accessLoading) return
        if (isPublicPortalRoute(pathname)) return

        if (!user) {
            router.replace(`/portal/login?from=${encodeURIComponent(pathname)}`)
            return
        }

        if (!portalAccess) return

        if (portalAccess.userType === 'unknown') {
            router.replace('/portal/login?error=unauthorized')
            return
        }

        if (isClientPortalRoute(pathname)) {
            if (portalAccess.userType !== 'client' || !portalAccess.clientId) {
                router.replace('/portal/dashboard')
            }
            return
        }

        if (isStaffPortalRoute(pathname)) {
            if (portalAccess.userType !== 'staff' || !portalAccess.staffRole) {
                if (portalAccess.clientId) {
                    router.replace(`/portal/client-portal?client=${portalAccess.clientId}`)
                } else {
                    router.replace('/portal/login?error=unauthorized')
                }
                return
            }

            if (!staffRoleCanAccess(pathname, portalAccess.staffRole)) {
                router.replace('/portal/dashboard')
            }
        }
    }, [
        user,
        loading,
        accessLoading,
        portalAccess,
        pathname,
        router,
    ])

    if (loading || accessLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <p className="text-muted-foreground animate-pulse">Checking access...</p>
            </div>
        )
    }

    if (!isPublicPortalRoute(pathname) && !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <p className="text-muted-foreground animate-pulse">Redirecting to login...</p>
            </div>
        )
    }

    return <>{children}</>
}