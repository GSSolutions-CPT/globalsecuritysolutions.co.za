"use client"

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { supabase } from '@/lib/portal/supabase'
import { resolvePortalAccess, type PortalAccess } from '@/lib/portal/resolve-portal-access'
import { Session, User, AuthError, SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from '@supabase/supabase-js'

type AuthContextType = {
    user: User | null
    session: Session | null
    loading: boolean
    accessLoading: boolean
    portalAccess: PortalAccess | null
    signIn: (data: SignInWithPasswordCredentials) => Promise<{ data: { user: User | null, session: Session | null }, error: AuthError | null }>
    signUp: (data: SignUpWithPasswordCredentials) => Promise<{ data: { user: User | null, session: Session | null }, error: AuthError | null }>
    signInWithGoogle: () => Promise<{ data: { provider: string; url: string | null }; error: AuthError | null }>
    signOut: () => Promise<{ error: AuthError | null }>
    refreshPortalAccess: (nextUser?: User | null) => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    loading: true,
    accessLoading: false,
    portalAccess: null,
    signIn: async () => ({ data: { user: null, session: null }, error: null }),
    signUp: async () => ({ data: { user: null, session: null }, error: null }),
    signInWithGoogle: async () => ({ data: { provider: 'google', url: null }, error: null }),
    signOut: async () => ({ error: null }),
    refreshPortalAccess: async () => {},
})

export const useAuth = () => useContext(AuthContext)

function getOAuthRedirectUrl() {
    if (typeof window !== 'undefined') {
        return `${window.location.origin}/portal/auth/callback`
    }

    return process.env.NEXT_PUBLIC_SITE_URL
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/portal/auth/callback`
        : 'https://www.globalsecuritysolutions.co.za/portal/auth/callback'
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const [accessLoading, setAccessLoading] = useState(false)
    const [portalAccess, setPortalAccess] = useState<PortalAccess | null>(null)

    const refreshPortalAccess = useCallback(async (nextUser: User | null = user) => {
        if (!nextUser) {
            setPortalAccess(null)
            setAccessLoading(false)
            return
        }

        setAccessLoading(true)
        try {
            const access = await resolvePortalAccess(nextUser.id)
            setPortalAccess(access)
        } catch (error) {
            console.error('AuthContext: Error resolving portal access:', error)
            setPortalAccess(null)
        } finally {
            setAccessLoading(false)
        }
    }, [user])

    const refreshPortalAccessRef = useRef(refreshPortalAccess)
    refreshPortalAccessRef.current = refreshPortalAccess

    useEffect(() => {
        const initSession = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession()
                if (error) throw error
                setSession(session)
                setUser(session?.user ?? null)
                await refreshPortalAccessRef.current(session?.user ?? null)
            } catch (error) {
                console.error("AuthContext: Error checking session:", error)
            } finally {
                setLoading(false)
            }
        }
        initSession()
    }, [])

    const value = {
        user,
        session,
        loading,
        accessLoading,
        portalAccess,
        signIn: (data: SignInWithPasswordCredentials) => supabase.auth.signInWithPassword(data),
        signUp: (data: SignUpWithPasswordCredentials) => supabase.auth.signUp(data),
        signInWithGoogle: () => supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: getOAuthRedirectUrl(),
            },
        }),
        signOut: async () => {
            const result = await supabase.auth.signOut()
            setPortalAccess(null)
            return result
        },
        refreshPortalAccess: (nextUser?: User | null) => refreshPortalAccess(nextUser),
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
