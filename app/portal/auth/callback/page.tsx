'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/portal/supabase'
import { Loader2, ShieldCheck } from 'lucide-react'

/**
 * OAuth Callback Page
 *
 * Supabase SDK auto-exchanges the auth code from the URL on page load
 * (detectSessionInUrl = true by default in @supabase/supabase-js v2).
 * We wait for the session, then route the user by role.
 */
export default function AuthCallbackPage() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Supabase has already exchanged the code by the time we call getSession()
                const { data: { session }, error: sessionError } = await supabase.auth.getSession()
                if (sessionError) throw sessionError
                if (!session?.user) throw new Error('No session established')

                const { data: clientData } = await supabase
                    .from('clients')
                    .select('id')
                    .eq('auth_user_id', session.user.id)
                    .single()

                if (clientData) {
                    router.replace(`/portal/?client=${clientData.id}`)
                } else {
                    router.replace('/portal/dashboard')
                }
            } catch (err) {
                console.error('[auth/callback]', err)
                setError('Authentication failed. Please try again.')
            }
        }

        // Small delay to allow the SDK to finish detecting the session from the URL
        const timer = setTimeout(handleCallback, 300)
        return () => clearTimeout(timer)
    }, [router])

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-950">
                <p className="text-red-500 text-sm font-medium">{error}</p>
                <button
                    onClick={() => router.push('/portal/login')}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Back to login
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-950">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <p className="text-sm text-slate-500 dark:text-slate-400">Signing you in…</p>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-4">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Secured by GSS Solutions</span>
            </div>
        </div>
    )
}
