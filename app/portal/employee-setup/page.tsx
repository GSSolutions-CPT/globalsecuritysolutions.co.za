'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/portal/supabase'
import { Button } from '@/components/portal/ui/button'
import { Input } from '@/components/portal/ui/input'
import { Label } from '@/components/portal/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/portal/ui/card'
import { Alert, AlertDescription } from '@/components/portal/ui/alert'
import { Loader2, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react'

export default function EmployeeSetupPage() {
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        // Wait for Supabase to process the URL hash from the invite link
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                // Wait a bit in case the hash is still processing
                setTimeout(async () => {
                    const { data: { session: retrySession } } = await supabase.auth.getSession()
                    if (!retrySession) {
                        setError('Invalid or expired invitation link. Please request a new one.')
                    }
                    setLoading(false)
                }, 1000)
            } else {
                setLoading(false)
            }
        }

        checkSession()
    }, [router])

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            return setError('Passwords do not match')
        }
        if (password.length < 6) {
            return setError('Password must be at least 6 characters')
        }

        setActionLoading(true)
        try {
            // Because the invite link already signed them in, we just update their password
            const { error: updateError } = await supabase.auth.updateUser({
                password: password
            })

            if (updateError) throw updateError

            // Sign out and redirect to login, as requested
            await supabase.auth.signOut()
            setSuccess(true)

            setTimeout(() => {
                router.push('/portal/login?setup=true')
            }, 2000)

        } catch (err: unknown) {
            setError((err as Error).message || 'Failed to set password')
            setActionLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-slate-950 px-4">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-slate-200 dark:from-slate-900 dark:via-slate-950 dark:to-black opacity-80" />

            <Card className="w-full max-w-md relative z-10 border-none shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200 dark:ring-slate-800">
                <CardHeader className="space-y-1 text-center pb-8">
                    <div className="flex justify-center mb-6">
                        <div className="bg-emerald-600/10 p-4 rounded-full">
                            <ShieldCheck className="h-8 w-8 text-emerald-600" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">
                        Team Setup
                    </CardTitle>
                    <CardDescription>
                        Create your permanent password to access the GSS CRM
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                    {error && !success && (
                        <Alert variant="destructive" className="border-red-500/50 bg-red-500/10 text-red-600 font-sans">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {success ? (
                        <div className="flex flex-col items-center justify-center py-6 text-center space-y-4 font-sans">
                            <CheckCircle2 className="h-16 w-16 text-emerald-500 animate-bounce" />
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Profile Secured!</h3>
                                <p className="text-slate-500 dark:text-slate-400">Redirecting to sign-in...</p>
                            </div>
                        </div>
                    ) : !error ? (
                        <form onSubmit={handleUpdatePassword} className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-slate-700 dark:text-slate-300">Create Password</Label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                                    </div>
                                    <Input
                                        type="password"
                                        placeholder="Min 6 characters"
                                        className="pl-10 h-11 bg-slate-50 border-slate-200 dark:bg-slate-900/50 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500/20"
                                        value={password}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                        required
                                        minLength={6}
                                        disabled={actionLoading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-700 dark:text-slate-300">Confirm Password</Label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                                    </div>
                                    <Input
                                        type="password"
                                        placeholder="Confirm your password"
                                        className="pl-10 h-11 bg-slate-50 border-slate-200 dark:bg-slate-900/50 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500/20"
                                        value={confirmPassword}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                                        required
                                        minLength={6}
                                        disabled={actionLoading}
                                    />
                                </div>
                            </div>

                            <Button
                                className="w-full h-11 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg mt-4"
                                type="submit"
                                disabled={actionLoading}
                            >
                                {actionLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Saving Password...
                                    </>
                                ) : (
                                    'Secure Profile'
                                )}
                            </Button>
                        </form>
                    ) : (
                        <Button
                            className="w-full h-11 bg-slate-200 hover:bg-slate-300 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white"
                            onClick={() => router.push('/portal/login')}
                        >
                            Return to Login
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
