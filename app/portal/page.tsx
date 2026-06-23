"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/lib/portal/supabase"
import { isPublicPortalRoute } from "@/lib/portal/permissions"

function PortalContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const clientId = searchParams.get('client')
    const { user, loading: authLoading, portalAccess } = useAuth()

    useEffect(() => {
        async function routeUser() {
            if (authLoading) return

            if (!user) {
                if (isPublicPortalRoute(pathname)) {
                    return
                }
                router.replace(`/portal/login?from=${encodeURIComponent(pathname)}`)
                return
            }

            if (portalAccess?.userType === 'staff') {
                router.replace('/portal/dashboard')
                return
            }

            if (portalAccess?.userType === 'client' && portalAccess.clientId) {
                if (clientId && clientId !== portalAccess.clientId) {
                    router.replace(`/portal/client-portal?client=${portalAccess.clientId}`)
                    return
                }

                router.replace(`/portal/client-portal?client=${portalAccess.clientId}`)
                return
            }

            if (clientId) {
                const { data: clientData, error } = await supabase
                    .from('clients')
                    .select('id, auth_user_id')
                    .eq('id', clientId)
                    .maybeSingle()

                if (error || !clientData) {
                    router.replace('/portal/login?error=unauthorized')
                    return
                }

                if (!clientData.auth_user_id) {
                    router.replace(`/portal/profile-setup/${clientId}`)
                    return
                }

                if (clientData.auth_user_id === user.id) {
                    router.replace(`/portal/client-portal?client=${clientData.id}`)
                    return
                }

                router.replace('/portal/login?error=unauthorized')
                return
            }

            router.replace('/portal/login?error=unauthorized')
        }

        routeUser()
    }, [clientId, user, authLoading, portalAccess, pathname, router])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-6 text-sm text-muted-foreground animate-pulse">
                Loading Security Hub...
            </div>
        </div>
    )
}

export default function PortalRootPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="p-6 text-sm text-muted-foreground animate-pulse">
                    Loading Portal...
                </div>
            </div>
        }>
            <PortalContent />
        </Suspense>
    )
}