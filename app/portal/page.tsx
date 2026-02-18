"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/lib/portal/supabase"
// Assuming ClientPortal is a component we can import directly or wrap
// We will need to migrate ClientPortal.jsx to .tsx or adjust imports.
// For now, let's assume we copy ClientPortal to app/portal/client-portal/page.tsx or similar
// This page acts as the RootRedirect from App.jsx

export default function PortalRootPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const clientId = searchParams.get('client')
    const { user, loading: authLoading } = useAuth()
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        async function checkClientAccess() {
            if (!clientId) {
                // Default to dashboard logic or check role
                // For now, redirect to dashboard if no client param
                router.push('/portal/dashboard')
                setChecking(false)
                return
            }

            // Look up the client record
            const { data: clientData } = await supabase
                .from('clients')
                .select('id, auth_user_id')
                .eq('id', clientId)
                .single()

            if (!clientData) {
                router.push('/portal/login')
                setChecking(false)
                return
            }

            // If client has no account yet → send to profile setup
            if (!clientData.auth_user_id) {
                router.push(`/portal/setup-profile/${clientId}`)
                setChecking(false)
                return
            }

            // If user is logged in and is this client → show portal
            if (user && clientData.auth_user_id === user.id) {
                // Redirect to the client-portal route
                router.push('/portal/client-portal')
                setChecking(false)
                return
            }

            // Client has account but user isn't logged in → send to login
            router.push('/portal/login')
            setChecking(false)
        }

        // Only run if auth is done loading
        if (!authLoading) {
            checkClientAccess()
        }
    }, [clientId, user, authLoading, router])

    if (authLoading || checking) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="p-6 text-sm text-muted-foreground animate-pulse">
                    Loading Security Hub...
                </div>
            </div>
        )
    }

    return null // Redirecting...
}
