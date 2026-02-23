"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/lib/portal/supabase"
// Assuming ClientPortal is a component we can import directly or wrap
// We will need to migrate ClientPortal.jsx to .tsx or adjust imports.
// For now, let's assume we copy ClientPortal to app/portal/client-portal/page.tsx or similar
// This page acts as the RootRedirect from App.jsx

function PortalContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const clientId = searchParams.get('client')
    const { user, loading: authLoading } = useAuth()
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        async function checkClientAccess() {
            try {
                if (!clientId) {
                    // Default to dashboard logic or check role
                    // For now, redirect to dashboard if no client param
                    router.push('/portal/dashboard')
                    return
                }

                // Look up the client record
                const { data: clientData, error } = await supabase
                    .from('clients')
                    .select('id, auth_user_id')
                    .eq('id', clientId)
                    .single()

                if (error) {
                    console.error("Portal Error: Failed to fetch client data", error)
                    router.push('/portal/login')
                    return
                }

                if (!clientData) {
                    console.error("Portal Error: No client data found")
                    router.push('/portal/login')
                    return
                }

                // If client has no account yet → send to profile setup
                if (!clientData.auth_user_id) {
                    router.push(`/portal/profile-setup/${clientId}`)
                    return
                }

                // If user is logged in and is this client → show portal
                if (user && clientData.auth_user_id === user.id) {
                    // Redirect to the client-portal route
                    router.push('/portal/client-portal')
                    return
                }

                // Client has account but user isn't logged in → send to login
                router.push('/portal/login')
            } catch (err) {
                console.error("Portal: Unexpected error checking access", err)
                router.push('/portal/login')
            } finally {
                setChecking(false)
            }
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
