'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/portal/supabase'
import { Button } from '@/components/portal/ui/button'
import { Input } from '@/components/portal/ui/input'
import { Label } from '@/components/portal/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/portal/ui/card'
import { Alert, AlertDescription } from '@/components/portal/ui/alert'
import { Loader2, ShieldCheck, Lock, UserPlus, CheckCircle2 } from 'lucide-react'

interface ProfileSetupProps {
    params: Promise<{ id: string }>
}

export default function ProfileSetupPage({ params }: ProfileSetupProps) {
    const { id } = use(params)
    const router = useRouter()
    const [client, setClient] = useState<{ id: string; name: string; email: string; auth_user_id?: string } | null>(null)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        async function fetchClient() {
            try {
                const { data: rawData, error } = await supabase
                    .rpc('get_client_for_setup', { p_client_id: id })
                    .single()

                if (error) throw error
                const data = rawData as { id: string; name: string; email: string; auth_user_id?: string } | null

                if (data?.auth_user_id) {
                    setError('Profile already setup for this client. Please sign in.')
                    setTimeout(() => router.push('/portal/login'), 3000)
                }
                setClient(data)
            } catch (err: unknown) {
                console.error('Error fetching client:', err)
                setError('Invalid or expired invitation link.')
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchClient()
    }, [id, router])

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!client) {
            return setError('Client data not loaded')
        }

        if (password !== confirmPassword) {
            return setError('Passwords do not match')
        }
        if (password.length < 6) {
            return setError('Password must be at least 6 characters')
        }

        setActionLoading(true)
        try {
            // 1. Sign up the user
            const { error: signUpError } = await supabase.auth.signUp({
                email: client.email,
                password: password,
                options: {
                    data: {
                        full_name: client.name,
                        client_id: client.id,
                        role: 'client'
                    }
                }
            })

            if (signUpError) throw signUpError

            // 2. Securely link the client profile using RPC
            const { error: linkError } = await supabase.rpc('claim_client_profile', {
                p_client_id: client.id
            })
            if (linkError) throw linkError

            // 3. Sign out the user so they are forced to log in with their new credentials
            await supabase.auth.signOut()

            setSuccess(true)
            setTimeout(() => {
                router.push('/portal/login?setup=true')
            }, 2000)
        } catch (err: unknown) {
            setError((err as Error).message || 'Failed to create profile')
        } finally {
            setActionLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-white dark:bg-brand-navy">
                <Loader2 className="w-8 h-8 animate-spin text-brand-electric" />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-brand-white dark:bg-brand-navy px-4">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-electric/20 via-brand-white to-brand-steel/20 dark:from-brand-navy dark:via-brand-navy dark:to-black opacity-80" />

            <Card className="w-full max-w-md relative z-10 border-none shadow-2xl bg-white/80 dark:bg-brand-navy/80 backdrop-blur-xl ring-1 ring-brand-steel/40 dark:ring-brand-navy">
                <CardHeader className="space-y-1 text-center pb-8">
                    <div className="flex justify-center mb-6">
                        <div className="bg-brand-electric/10 p-4 rounded-full">
                            <UserPlus className="h-8 w-8 text-brand-electric" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">
                        Client Onboarding
                    </CardTitle>
                    <CardDescription>
                        Set up your profile to access the GSS Client Portal
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                    {error && (
                        <Alert variant="destructive" className="border-red-500/50 bg-red-500/10 text-red-600 font-sans">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {success ? (
                        <div className="flex flex-col items-center justify-center py-6 text-center space-y-4 font-sans">
                            <CheckCircle2 className="h-16 w-16 text-emerald-500 animate-bounce" />
                            <div>
                                <h3 className="text-xl font-bold text-brand-navy dark:text-white">Profile Created!</h3>
                                <p className="text-brand-steel dark:text-brand-steel">Redirecting to sign-in...</p>
                            </div>
                        </div>
                    ) : client ? (
                        <form onSubmit={handleSignup} className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-brand-slate dark:text-brand-steel/60">Full Name</Label>
                                <Input value={client.name} disabled className="bg-brand-white text-brand-steel border-brand-steel/40 dark:bg-brand-navy dark:text-brand-steel dark:border-brand-slate opacity-100" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-brand-slate dark:text-brand-steel/60">Email Address</Label>
                                <Input value={client.email} disabled className="bg-brand-white text-brand-steel border-brand-steel/40 dark:bg-brand-navy dark:text-brand-steel dark:border-brand-slate opacity-100" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" title="password" className="text-brand-navy dark:text-white font-medium">Create Password</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-steel" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Min 6 characters"
                                        className="pl-10 h-11 bg-white text-brand-navy border-brand-steel/60 focus:border-brand-electric focus:ring-brand-electric dark:bg-brand-navy dark:text-white dark:border-brand-slate font-sans"
                                        value={password}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" title='confirm password' className="text-brand-navy dark:text-white font-medium">Confirm Password</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-steel" />
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Confirm your password"
                                        className="pl-10 h-11 bg-white text-brand-navy border-brand-steel/60 focus:border-brand-electric focus:ring-brand-electric dark:bg-brand-navy dark:text-white dark:border-brand-slate font-sans"
                                        value={confirmPassword}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="w-full h-11 bg-brand-electric hover:bg-brand-electric text-white shadow-lg mt-4 font-semibold"
                                disabled={actionLoading}
                            >
                                {actionLoading ? <Loader2 className="animate-spin" /> : 'Create Profile'}
                            </Button>
                        </form>
                    ) : null}
                </CardContent>

                <CardFooter className="justify-center border-t border-brand-steel/20 dark:border-brand-navy mt-6 pt-4 text-xs text-brand-steel">
                    <ShieldCheck className="h-4 w-4 mr-1" /> Secure Access powered by GSS
                </CardFooter>
            </Card>
        </div>
    )
}
