"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/portal/supabase'
import { Session, User, AuthError, SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from '@supabase/supabase-js'

type AuthContextType = {
    user: User | null
    session: Session | null
    loading: boolean
    signIn: (data: SignInWithPasswordCredentials) => Promise<{ data: { user: User | null, session: Session | null }, error: AuthError | null }>
    signUp: (data: SignUpWithPasswordCredentials) => Promise<{ data: { user: User | null, session: Session | null }, error: AuthError | null }>
    signInWithGoogle: () => Promise<{ data: { provider: string; url: string | null }; error: AuthError | null }>
    signOut: () => Promise<{ error: AuthError | null }>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    loading: true,
    signIn: async () => ({ data: { user: null, session: null }, error: null }),
    signUp: async () => ({ data: { user: null, session: null }, error: null }),
    signInWithGoogle: async () => ({ data: { provider: 'google', url: null }, error: null }),
    signOut: async () => ({ error: null }),
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check active session
        const initSession = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession()
                if (error) throw error
                setSession(session)
                setUser(session?.user ?? null)
            } catch (error) {
                console.error("AuthContext: Error checking session:", error)
            } finally {
                setLoading(false)
            }
        }
        initSession()

        // Listen for changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    const value = {
        user,
        session,
        loading,
        signIn: (data: SignInWithPasswordCredentials) => supabase.auth.signInWithPassword(data),
        signUp: (data: SignUpWithPasswordCredentials) => supabase.auth.signUp(data),
        signInWithGoogle: () => supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'https://www.globalsecuritysolutions.co.za/portal/auth/callback',
            },
        }),
        signOut: () => supabase.auth.signOut(),
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
