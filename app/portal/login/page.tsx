'use client'

import React, { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/portal/supabase'
import { Button } from '@/components/portal/ui/button'
import { Input } from '@/components/portal/ui/input'
import { Label } from '@/components/portal/ui/label'
import { Alert, AlertDescription } from '@/components/portal/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/portal/ui/dialog'
import { Mail, Loader2, Lock, ArrowRight, ArrowLeft, Eye, EyeOff, Shield } from 'lucide-react'
import Image from 'next/image'
import type { User } from '@supabase/supabase-js'

function LoginContent() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [forgotOpen, setForgotOpen] = useState(false)
    const [resetEmail, setResetEmail] = useState('')
    const [resetLoading, setResetLoading] = useState(false)
    const [resetMessage, setResetMessage] = useState('')
    const [resetError, setResetError] = useState('')

    const { signIn, signInWithGoogle, refreshPortalAccess } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()

    const from = searchParams.get('from') || '/portal/dashboard'
    const errorParam = searchParams.get('error')
    const googleError = errorParam === 'google_not_client'
        ? 'Google Sign-In is for clients only. Staff must use email & password.'
        : errorParam === 'registration_disabled'
            ? 'Self-registration is disabled. Please use your invitation link or contact support.'
            : errorParam === 'unauthorized'
                ? 'Your account does not have access to this portal.'
                : null

    const routeByRole = async (user: User) => {
        // Explicitly refresh access with the freshly logged-in user to prevent race conditions
        await refreshPortalAccess(user)

        const [{ data: clientData }, { data: staffData }] = await Promise.all([
            supabase.from('clients').select('id').eq('auth_user_id', user.id).maybeSingle(),
            supabase.from('users').select('role').eq('id', user.id).maybeSingle(),
        ])
        const clientId = clientData?.id ?? null
        const staffRole = staffData?.role ?? null

        if (!staffRole && !clientId) {
            await supabase.auth.signOut()
            setError('Your account does not have portal access. Contact support to be added as staff or linked to a client record.')
            return
        }

        let target = from

        if (clientId) {
            if (target === '/portal/dashboard' || target === '/' || target.startsWith('/portal/dashboard')) {
                target = `/portal/client-portal?client=${clientId}`
            } else if (!target.startsWith('/portal/client-portal')) {
                target = `/portal/client-portal?client=${clientId}`
            }
            router.replace(target)
            return
        }

        if (!target.startsWith('/')) {
            target = `/${target}`
        }
        router.replace(target)
    }

    const normalizeEmail = (value: string) => value.trim().toLowerCase()

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setResetError('')
        setResetMessage('')
        setResetLoading(true)

        try {
            const redirectTo = `${window.location.origin}/portal/reset-password`
            const { error: resetErr } = await supabase.auth.resetPasswordForEmail(normalizeEmail(resetEmail), { redirectTo })
            if (resetErr) throw resetErr
            setResetMessage('If an account exists for that email, a reset link has been sent.')
        } catch (err: unknown) {
            setResetError(err instanceof Error ? err.message : 'Failed to send reset email')
        } finally {
            setResetLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const normalizedEmail = normalizeEmail(email)
            const { data, error } = await signIn({ email: normalizedEmail, password })
            if (error) {
                if (error.message === 'Invalid login credentials') {
                    throw new Error('Invalid email or password. Use Forgot password to reset your account password.')
                }
                throw error
            }
            if (!data.user) throw new Error('Sign in succeeded but no user was returned')
            await routeByRole(data.user)
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to sign in')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#020617] px-4 py-12">
            
            {/* Tech grid scanlines background overlay */}
            <div className="absolute inset-0 tech-grid-bg pointer-events-none opacity-40 z-0" />
            
            {/* Glowing animated background light blobs */}
            <div className="absolute top-1/4 -right-32 w-[400px] h-[400px] bg-brand-electric/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -left-32 w-[350px] h-[350px] bg-brand-steel/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Back Button */}
            <Link
                href="/"
                className="absolute top-6 left-6 z-50 flex items-center gap-2 text-xs font-semibold text-brand-slate hover:text-white transition-colors bg-brand-navy/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5 hover:border-brand-electric/25 shadow-lg shadow-black/30"
            >
                <ArrowLeft className="h-4 w-4 text-brand-electric" />
                <span>Back to Website</span>
            </Link>

            {/* Login Card */}
            <div className="w-full max-w-md relative z-10 glass-panel glass-panel-hover rounded-2xl border-white/10 shadow-2xl p-6 md:p-8">
                
                {/* Cyber top glow line indicator */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-electric via-[#00a2ff] to-brand-electric" />

                {/* Header Section */}
                <div className="space-y-2 text-center pb-6">
                    <div className="flex justify-center mb-5">
                        <div className="relative group">
                            {/* Logo outer cyber rings */}
                            <div className="absolute -inset-2 bg-brand-electric/20 rounded-2xl blur-md group-hover:bg-brand-electric/40 transition-all duration-300" />
                            <div className="relative p-4 rounded-xl bg-brand-navy border border-white/10 shadow-xl flex items-center justify-center">
                                <Image src="/logo.png" alt="GSS Logo" width={40} height={40} className="w-10 h-10 object-contain" />
                            </div>
                        </div>
                    </div>
                    <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-white font-sans">
                        GSS SECURITY HUB
                    </h2>
                    <p className="text-xs md:text-sm text-brand-slate font-medium">
                        Secure Gateway Portal
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {(error || googleError) && (
                        <Alert variant="destructive" className="border-red-500/20 bg-red-500/10 text-red-400 rounded-xl">
                            <AlertDescription className="text-xs font-medium">{error || googleError}</AlertDescription>
                        </Alert>
                    )}

                    {/* Email Input */}
                    <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs text-brand-slate font-bold uppercase tracking-wider">
                            Email Address
                        </Label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Mail className="h-4.5 w-4.5 text-brand-slate" />
                            </div>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@company.com"
                                className="pl-11 pr-4 h-11 rounded-xl cyber-input w-full text-white text-sm"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-xs text-brand-slate font-bold uppercase tracking-wider">
                                Password
                            </Label>
                            <button
                                type="button"
                                onClick={() => {
                                    setResetEmail(email)
                                    setResetError('')
                                    setResetMessage('')
                                    setForgotOpen(true)
                                }}
                                className="text-xs font-bold text-brand-electric hover:underline transition-colors"
                            >
                                Forgot?
                            </button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Lock className="h-4.5 w-4.5 text-brand-slate" />
                            </div>
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className="pl-11 pr-11 h-11 rounded-xl cyber-input w-full text-white text-sm"
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-brand-slate hover:text-white transition-colors"
                                tabIndex={-1}
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        className="w-full h-11 rounded-xl bg-brand-electric hover:bg-[#00c5dd] text-brand-navy shadow-lg shadow-brand-electric/15 transition-all duration-300 font-bold text-sm tracking-wide mt-2 hover:shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                Access Portal <ArrowRight className="h-4 w-4" />
                            </span>
                        )}
                    </Button>
                </form>

                {/* Cyber Divider */}
                <div className="relative w-full my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/5" />
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
                        <span className="bg-brand-navy/60 px-3 text-brand-slate">Third-Party Gateway</span>
                    </div>
                </div>

                {/* Google SSO Button */}
                <div className="space-y-2">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full h-11 rounded-xl border-white/10 hover:border-brand-electric/30 hover:bg-white/5 text-white text-sm font-semibold transition-all duration-200"
                        onClick={() => signInWithGoogle && signInWithGoogle()}
                    >
                        <svg className="mr-2.5 h-4 w-4" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </Button>
                    
                    {/* Clear visual disclaimer explaining that OAuth is for clients only, solving Issue #13 */}
                    <p className="text-[10px] text-center text-brand-slate font-medium px-2">
                        💡 <span className="text-brand-electric">Note:</span> Google Login is for <span className="text-white font-bold">Clients only</span>. Staff must use their registered email and password credentials.
                    </p>
                </div>

                <div className="w-full text-center mt-6 pt-4 border-t border-white/5">
                    <p className="text-xs text-brand-slate font-medium">
                        Need access? Contact your GSS manager for setup instructions.
                    </p>
                </div>
            </div>

            {/* Secured Badge footer */}
            <div className="absolute bottom-6 flex items-center gap-2 text-xs text-brand-slate font-semibold tracking-wide z-10 bg-brand-navy/60 px-4 py-2 rounded-xl border border-white/5 backdrop-blur-md">
                <Shield className="h-4 w-4 text-brand-electric shadow-[0_0_8px_#00e5ff]" />
                <span>Secured by <span className="text-white">GSS Systems</span></span>
            </div>

            {/* Forgot password dialog overlay */}
            <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
                <DialogContent className="sm:max-w-md bg-brand-navy border border-white/10 rounded-2xl text-white">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold">Reset Password</DialogTitle>
                        <DialogDescription className="text-brand-slate text-sm font-medium">
                            Provide your registered email address to receive a secure password reset link.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleForgotPassword} className="space-y-4 mt-2">
                        {resetError && (
                            <Alert variant="destructive" className="border-red-500/20 bg-red-500/10 text-red-400 rounded-xl">
                                <AlertDescription className="text-xs">{resetError}</AlertDescription>
                            </Alert>
                        )}
                        {resetMessage && (
                            <Alert className="border-brand-electric/20 bg-brand-electric/5 text-brand-electric rounded-xl">
                                <AlertDescription className="text-xs font-semibold">{resetMessage}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="reset-email" className="text-xs text-brand-slate font-bold uppercase tracking-wider">Email address</Label>
                            <Input
                                id="reset-email"
                                type="email"
                                className="cyber-input h-11 rounded-xl text-white text-sm"
                                value={resetEmail}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setResetEmail(e.target.value)}
                                required
                            />
                        </div>
                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button type="button" variant="ghost" className="rounded-xl border border-white/5 hover:bg-white/5 text-white" onClick={() => setForgotOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={resetLoading} className="rounded-xl bg-brand-electric hover:bg-[#00c5dd] text-brand-navy font-bold">
                                {resetLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Send link
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default function Login() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#020617]">
                <Loader2 className="w-8 h-8 animate-spin text-brand-electric" />
            </div>
        }>
            <LoginContent />
        </Suspense>
    )
}
