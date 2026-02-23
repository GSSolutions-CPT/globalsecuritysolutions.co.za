'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/portal/supabase'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/portal/ui/card'
import { Button } from '@/components/portal/ui/button'
import { Input } from '@/components/portal/ui/input'
import { Label } from '@/components/portal/ui/label'
import { Alert, AlertDescription } from '@/components/portal/ui/alert'
import {
    FileText, Phone, ShieldCheck, LogOut, CheckCircle2,
    Loader2, ChevronRight, Building2, Clock, FileCheck, Receipt
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ClientData {
    id: string
    name: string
    company: string
    email: string
    phone: string
}

interface Quotation {
    id: string
    quote_number: string
    status: string
    total_amount: string
    date_created: string
}

interface Invoice {
    id: string
    invoice_number: string
    status: string
    total_amount: string
    date_created: string
}

// ─── Service Options ──────────────────────────────────────────────────────────

const SERVICES = [
    'CCTV / Surveillance',
    'Access Control',
    'Electric Fence',
    'Alarm System',
    'Intercom System',
    'Security Lighting',
    'Maintenance / Service',
    'Other',
]

const CALLBACK_TIMES = ['Morning (8am–12pm)', 'Afternoon (12pm–5pm)', 'Any time']

// ─── Helper: status badge colour ──────────────────────────────────────────────

function statusColor(status: string) {
    const s = status?.toLowerCase()
    if (s === 'paid') return 'bg-emerald-100 text-emerald-700'
    if (s === 'sent' || s === 'pending') return 'bg-blue-100 text-blue-700'
    if (s === 'overdue') return 'bg-red-100 text-red-700'
    if (s === 'draft') return 'bg-slate-100 text-slate-600'
    return 'bg-slate-100 text-slate-600'
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ClientPortalPage() {
    const { user, signOut } = useAuth()
    const router = useRouter()

    const [client, setClient] = useState<ClientData | null>(null)
    const [quotations, setQuotations] = useState<Quotation[]>([])
    const [invoices, setInvoices] = useState<Invoice[]>([])
    const [loading, setLoading] = useState(true)

    // Panel state: null | 'quote' | 'callback'
    const [panel, setPanel] = useState<null | 'quote' | 'callback'>(null)
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState<string | null>(null)
    const [formError, setFormError] = useState<string | null>(null)

    // Quote form
    const [service, setService] = useState('')
    const [siteAddress, setSiteAddress] = useState('')
    const [quoteNotes, setQuoteNotes] = useState('')

    // Callback form
    const [callbackPhone, setCallbackPhone] = useState('')
    const [callbackTime, setCallbackTime] = useState('')
    const [callbackNotes, setCallbackNotes] = useState('')

    // ── Load client data ───────────────────────────────────────────────────────

    useEffect(() => {
        if (!user) {
            router.replace('/portal/login')
            return
        }

        const load = async () => {
            // Find client record linked to this auth user
            const { data: clientData, error } = await supabase
                .from('clients')
                .select('id, name, company, email, phone')
                .eq('auth_user_id', user.id)
                .single()

            if (error || !clientData) {
                // Not a registered client — sign out
                await signOut()
                router.replace('/portal/login?error=google_not_client')
                return
            }

            setClient(clientData)
            setCallbackPhone(clientData.phone || '')

            // Load their quotations and invoices in parallel
            const [quotRes, invRes] = await Promise.all([
                supabase
                    .from('quotations')
                    .select('id, quote_number, status, total_amount, date_created')
                    .eq('client_id', clientData.id)
                    .order('date_created', { ascending: false })
                    .limit(5),
                supabase
                    .from('invoices')
                    .select('id, invoice_number, status, total_amount, date_created')
                    .eq('client_id', clientData.id)
                    .order('date_created', { ascending: false })
                    .limit(5),
            ])

            setQuotations((quotRes.data as Quotation[]) || [])
            setInvoices((invRes.data as Invoice[]) || [])
            setLoading(false)
        }

        load()
    }, [user, router, signOut])

    // ── Submit helpers ─────────────────────────────────────────────────────────

    const logActivity = async (type: string, description: string) => {
        if (!client) return
        await supabase.from('activity_log').insert({
            type,
            description,
            related_entity_type: 'client',
            related_entity_id: client.id,
            timestamp: new Date().toISOString(),
        })
    }

    const handleQuoteSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!service) { setFormError('Please select a service.'); return }
        setFormError(null)
        setSubmitting(true)
        try {
            const desc = `${client?.name} (${client?.company || client?.email}) requested a quote for: ${service}${siteAddress ? ` at ${siteAddress}` : ''}${quoteNotes ? `. Notes: ${quoteNotes}` : ''}`
            await logActivity('Quote Request', desc)
            setSuccess('Your quote request has been sent! We\'ll be in touch shortly.')
            setPanel(null)
            setService(''); setSiteAddress(''); setQuoteNotes('')
        } catch {
            setFormError('Something went wrong. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    const handleCallbackSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!callbackTime) { setFormError('Please select a preferred time.'); return }
        setFormError(null)
        setSubmitting(true)
        try {
            const desc = `${client?.name} (${client?.company || client?.email}) requested a callback${callbackPhone ? ` on ${callbackPhone}` : ''} — preferred time: ${callbackTime}${callbackNotes ? `. Notes: ${callbackNotes}` : ''}`
            await logActivity('Callback Request', desc)
            setSuccess('Callback request received! We\'ll call you during your preferred time.')
            setPanel(null)
            setCallbackTime(''); setCallbackNotes('')
        } catch {
            setFormError('Something went wrong. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    // ── Render ─────────────────────────────────────────────────────────────────

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        )
    }

    if (!client) return null

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">

            {/* Header */}
            <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-30">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-600 shadow-lg shadow-blue-500/20">
                            <ShieldCheck className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wider">Client Portal</p>
                            <p className="font-semibold text-slate-900 dark:text-white text-sm leading-none">
                                {client.company || client.name}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={async () => { await signOut(); router.replace('/portal/login') }}
                        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-500 transition-colors"
                    >
                        <LogOut className="h-4 w-4" /> Sign out
                    </button>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">

                {/* Welcome */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#3b82f620,transparent)] pointer-events-none" />
                    <p className="text-slate-400 text-sm mb-1">Welcome back</p>
                    <h1 className="text-2xl font-bold mb-1">{client.name}</h1>
                    {client.company && (
                        <p className="flex items-center gap-1.5 text-slate-300 text-sm">
                            <Building2 className="h-3.5 w-3.5" />{client.company}
                        </p>
                    )}
                </div>

                {/* Success toast */}
                {success && (
                    <Alert className="border-emerald-500/50 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertDescription>{success}</AlertDescription>
                    </Alert>
                )}

                {/* Action Cards */}
                <div className="grid sm:grid-cols-2 gap-4">
                    <button
                        onClick={() => { setPanel('quote'); setSuccess(null); setFormError(null) }}
                        className="group text-left p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
                    >
                        <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Request a Quote</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Get a detailed quote for security installation or services.</p>
                        <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
                            Get started <ChevronRight className="h-3 w-3" />
                        </span>
                    </button>

                    <button
                        onClick={() => { setPanel('callback'); setSuccess(null); setFormError(null) }}
                        className="group text-left p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300"
                    >
                        <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Request a Callback</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Speak directly with one of our security specialists.</p>
                        <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-emerald-600 dark:text-emerald-400 group-hover:gap-2 transition-all">
                            Schedule call <ChevronRight className="h-3 w-3" />
                        </span>
                    </button>
                </div>

                {/* Quote Request Form */}
                {panel === 'quote' && (
                    <Card className="border-blue-200 dark:border-blue-800 shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                                <FileText className="h-5 w-5" /> Request a Quote
                            </CardTitle>
                            <CardDescription>Tell us what you need and we'll prepare a detailed quote.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleQuoteSubmit} className="space-y-4">
                                {formError && (
                                    <Alert variant="destructive" className="border-red-400/50 bg-red-50 dark:bg-red-900/20 text-red-600">
                                        <AlertDescription>{formError}</AlertDescription>
                                    </Alert>
                                )}
                                <div className="space-y-2">
                                    <Label>Service Required *</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {SERVICES.map(s => (
                                            <button
                                                key={s} type="button"
                                                onClick={() => setService(s)}
                                                className={`px-3 py-2 rounded-lg text-sm border text-left transition-all ${service === s
                                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                                                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                                                    }`}
                                            >{s}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="site-address">Site Address / Location</Label>
                                    <Input
                                        id="site-address"
                                        placeholder="e.g. 12 Main Road, Claremont, Cape Town"
                                        value={siteAddress}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSiteAddress(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="quote-notes">Additional Details</Label>
                                    <textarea
                                        id="quote-notes"
                                        rows={3}
                                        placeholder="Any specific requirements, number of cameras, access points, etc."
                                        value={quoteNotes}
                                        onChange={e => setQuoteNotes(e.target.value)}
                                        className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none"
                                    />
                                </div>
                                <div className="flex gap-3 pt-1">
                                    <Button type="submit" disabled={submitting}
                                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
                                        {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                        Send Quote Request
                                    </Button>
                                    <Button type="button" variant="outline" onClick={() => setPanel(null)}>Cancel</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Callback Request Form */}
                {panel === 'callback' && (
                    <Card className="border-emerald-200 dark:border-emerald-800 shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                                <Phone className="h-5 w-5" /> Request a Callback
                            </CardTitle>
                            <CardDescription>We'll call you back during your preferred time slot.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleCallbackSubmit} className="space-y-4">
                                {formError && (
                                    <Alert variant="destructive" className="border-red-400/50 bg-red-50 dark:bg-red-900/20 text-red-600">
                                        <AlertDescription>{formError}</AlertDescription>
                                    </Alert>
                                )}
                                <div className="space-y-2">
                                    <Label htmlFor="callback-phone">Phone Number</Label>
                                    <Input
                                        id="callback-phone"
                                        type="tel"
                                        placeholder="+27 ..."
                                        value={callbackPhone}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCallbackPhone(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Preferred Time *</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {CALLBACK_TIMES.map(t => (
                                            <button
                                                key={t} type="button"
                                                onClick={() => setCallbackTime(t)}
                                                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm border transition-all ${callbackTime === t
                                                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium'
                                                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                                                    }`}
                                            >
                                                <Clock className="h-3.5 w-3.5" />{t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="callback-notes">Additional Notes</Label>
                                    <textarea
                                        id="callback-notes"
                                        rows={2}
                                        placeholder="What would you like to discuss?"
                                        value={callbackNotes}
                                        onChange={e => setCallbackNotes(e.target.value)}
                                        className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 resize-none"
                                    />
                                </div>
                                <div className="flex gap-3 pt-1">
                                    <Button type="submit" disabled={submitting}
                                        className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white">
                                        {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                        Request Callback
                                    </Button>
                                    <Button type="button" variant="outline" onClick={() => setPanel(null)}>Cancel</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Quotations */}
                {quotations.length > 0 && (
                    <Card className="border-none shadow-sm">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <FileCheck className="h-4 w-4 text-blue-500" /> Your Quotations
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {quotations.map(q => (
                                <div key={q.id} className="flex items-center justify-between py-2.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
                                    <div>
                                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{q.quote_number || `Quote #${q.id.slice(0, 8)}`}</p>
                                        <p className="text-xs text-slate-400">{new Date(q.date_created).toLocaleDateString('en-ZA')}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            R {parseFloat(q.total_amount || '0').toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(q.status)}`}>
                                            {q.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {/* Invoices */}
                {invoices.length > 0 && (
                    <Card className="border-none shadow-sm">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Receipt className="h-4 w-4 text-purple-500" /> Your Invoices
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {invoices.map(inv => (
                                <div key={inv.id} className="flex items-center justify-between py-2.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
                                    <div>
                                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{inv.invoice_number || `Invoice #${inv.id.slice(0, 8)}`}</p>
                                        <p className="text-xs text-slate-400">{new Date(inv.date_created).toLocaleDateString('en-ZA')}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            R {parseFloat(inv.total_amount || '0').toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(inv.status)}`}>
                                            {inv.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {/* Footer */}
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 py-4">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Secured by GSS Solutions · <a href="mailto:info@globalsecuritysolutions.co.za" className="hover:text-blue-500 transition-colors">info@globalsecuritysolutions.co.za</a></span>
                </div>
            </main>
        </div>
    )
}
