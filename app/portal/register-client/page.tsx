'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/portal/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/portal/ui/card'
import { Button } from '@/components/portal/ui/button'
import { Input } from '@/components/portal/ui/input'
import { Label } from '@/components/portal/ui/label'
import { Alert, AlertDescription } from '@/components/portal/ui/alert'
import { ShieldCheck, Loader2, UserCheck } from 'lucide-react'

export default function RegisterClientPage() {
    const { user, signOut } = useAuth()
    const router = useRouter()

    // Form fields — pre-filled from Google profile where possible
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // ── Guard: must be authenticated, must not already have a client record ──

    useEffect(() => {
        if (!user) {
            router.replace('/portal/login')
            return
        }

        const checkExisting = async () => {
            // Pre-fill from Google user metadata
            const meta = user.user_metadata || {}
            setName(meta.full_name || meta.name || '')
            setEmail(user.email || '')

            // If they already have a client record, skip registration
            const { data: existing } = await supabase
                .from('clients')
                .select('id')
                .eq('auth_user_id', user.id)
                .single()

            if (existing) {
                router.replace(`/portal/?client=${existing.id}`)
                return
            }

            setLoading(false)
        }

        checkExisting()
    }, [user, router])

    // ── Submit ────────────────────────────────────────────────────────────────

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (!name.trim()) { setError('Please enter your full name.'); return }
        if (!phone.trim()) { setError('Please enter a contact number.'); return }

        setSubmitting(true)
        try {
            // Create client record linked to this auth user
            const { data: newClient, error: insertError } = await supabase
                .from('clients')
                .insert({
                    name: name.trim(),
                    email: email.trim(),
                    company: company.trim() || null,
                    phone: phone.trim(),
                    address: address.trim() || null,
                    auth_user_id: user!.id,
                })
                .select('id')
                .single()

            if (insertError) throw insertError

            // Log the new signup to activity_log so the CRM team sees it
            await supabase.from('activity_log').insert({
                type: 'New Client Registration',
                description: `${name.trim()}${company.trim() ? ` (${company.trim()})` : ''} registered via Google Sign-In.`,
                related_entity_type: 'client',
                related_entity_id: newClient.id,
                timestamp: new Date().toISOString(),
            })

            router.replace(`/portal/client-portal?client=${newClient.id}`)
        } catch (err: unknown) {
            console.error('[register-client]', err)
            setError(err instanceof Error ? err.message : 'Registration failed. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    // ── Render ────────────────────────────────────────────────────────────────

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-white dark:bg-brand-navy">
                <Loader2 className="h-8 w-8 animate-spin text-brand-electric" />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-brand-white dark:bg-brand-navy px-4">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-electric/20 via-brand-white to-brand-steel/20 dark:from-brand-navy dark:via-brand-navy dark:to-black opacity-80" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-electric/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-40 -left-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

            <Card className="w-full max-w-md relative z-10 border-none shadow-2xl bg-white/80 dark:bg-brand-navy/80 backdrop-blur-xl ring-1 ring-brand-steel/40 dark:ring-brand-navy">
                <CardHeader className="text-center pb-6">
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-brand-electric to-emerald-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-700" />
                            <div className="relative p-4 rounded-full bg-white dark:bg-brand-navy ring-1 ring-brand-steel/40 dark:ring-brand-navy shadow-xl">
                                <UserCheck className="h-8 w-8 text-brand-electric" />
                            </div>
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight bg-gradient-to-r from-brand-navy to-brand-slate dark:from-white dark:to-brand-steel/60 bg-clip-text text-transparent">
                        Complete Your Profile
                    </CardTitle>
                    <CardDescription className="text-brand-steel dark:text-brand-steel mt-1">
                        Just a few details to set up your client portal.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <Alert variant="destructive" className="border-red-500/50 bg-red-50 dark:bg-red-900/20 text-red-600">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {/* Name */}
                        <div className="space-y-1.5">
                            <Label htmlFor="reg-name">Full Name *</Label>
                            <Input
                                id="reg-name"
                                placeholder="Jane Smith"
                                value={name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                required
                                className="h-11"
                            />
                        </div>

                        {/* Email (read-only from Google) */}
                        <div className="space-y-1.5">
                            <Label htmlFor="reg-email">Email Address</Label>
                            <Input
                                id="reg-email"
                                type="email"
                                value={email}
                                readOnly
                                className="h-11 bg-brand-white dark:bg-brand-navy text-brand-steel cursor-not-allowed"
                            />
                            <p className="text-xs text-brand-steel">Provided by your Google account</p>
                        </div>

                        {/* Company */}
                        <div className="space-y-1.5">
                            <Label htmlFor="reg-company">Company / Business Name</Label>
                            <Input
                                id="reg-company"
                                placeholder="Acme Corp (optional)"
                                value={company}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)}
                                className="h-11"
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-1.5">
                            <Label htmlFor="reg-phone">Contact Number *</Label>
                            <Input
                                id="reg-phone"
                                type="tel"
                                placeholder="+27 ..."
                                value={phone}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                                required
                                className="h-11"
                            />
                        </div>

                        {/* Address */}
                        <div className="space-y-1.5">
                            <Label htmlFor="reg-address">Site / Property Address</Label>
                            <Input
                                id="reg-address"
                                placeholder="12 Main Road, Cape Town (optional)"
                                value={address}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                                className="h-11"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={submitting}
                            className="w-full h-11 mt-2 bg-gradient-to-r from-brand-electric to-emerald-600 hover:from-brand-electric hover:to-emerald-700 text-white shadow-lg shadow-brand-electric/20 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            {submitting
                                ? <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                : null}
                            {submitting ? 'Setting up your portal…' : 'Access My Portal'}
                        </Button>

                        <button
                            type="button"
                            onClick={async () => { await signOut(); router.replace('/portal/login') }}
                            className="w-full text-xs text-brand-steel hover:text-red-500 transition-colors text-center mt-1"
                        >
                            Cancel and sign out
                        </button>
                    </form>
                </CardContent>

                {/* Bottom gradient bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-brand-electric via-emerald-500 to-brand-electric opacity-50 rounded-b-xl" />
            </Card>

            <div className="absolute bottom-6 flex items-center gap-2 text-sm text-brand-steel dark:text-brand-slate z-10">
                <ShieldCheck className="h-4 w-4" />
                <span>Secured by GSS Solutions</span>
            </div>
        </div>
    )
}
