'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/portal/ui/card'
import { Button } from '@/components/portal/ui/button'
import { Badge } from '@/components/portal/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/portal/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/portal/ui/dialog'
import { ShieldCheck, Download, CheckCircle, Upload, MessageCircle, Phone, Mail, HelpCircle, PenTool, CreditCard, FileText, MapPin, Send, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/portal/supabase'
import { useSearchParams, useRouter } from 'next/navigation'
import { generateInvoicePDF, generateQuotePDF } from '@/lib/portal/pdf-service'
import { useCurrency } from '@/lib/portal/use-currency'
import { SignaturePad } from '@/components/portal/ui/signature-pad'
import { toast } from 'sonner'
import { useSettings } from '@/lib/portal/use-settings'
import { InstallPrompt } from '@/components/portal/InstallPrompt'
import { cn } from '@/lib/portal/utils'
import { useAuth } from '@/context/AuthContext'
import { Input } from '@/components/portal/ui/input'
import { Label } from '@/components/portal/ui/label'
import { Textarea } from '@/components/portal/ui/textarea'
import { Client, Quotation, Invoice } from '@/types/crm'

export default function ClientPortalPage() {
    const { formatCurrency } = useCurrency()
    const { settings } = useSettings()
    const { user } = useAuth()
    const searchParams = useSearchParams()
    const router = useRouter()
    const urlClientId = searchParams.get('client')
    const [clientId, setClientId] = useState<string | null>(urlClientId)

    // Track whether the authenticated user is unauthorized to view the requested client
    const [accessDenied, setAccessDenied] = useState(false)

    // Controlled tab state — replaces dangerous document.getElementById().click() anti-pattern
    const [activeTab, setActiveTab] = useState('overview')

    const [client, setClient] = useState<Client | null>(null)
    const [quotations, setQuotations] = useState<Quotation[]>([])
    const [invoices, setInvoices] = useState<Invoice[]>([])

    const [loading, setLoading] = useState(true)

    // Acceptance Workflow State
    const [acceptingQuote, setAcceptingQuote] = useState<Quotation | null>(null)
    const [step, setStep] = useState(0) // 0: Closed, 1: Sign, 2: Payment Info, 3: Success, 4: Final Payment
    const [signature, setSignature] = useState<string | null>(null)
    const [contactOpen, setContactOpen] = useState(false)

    // Request dialogs
    const [requestQuoteOpen, setRequestQuoteOpen] = useState(false)
    const [requestVisitOpen, setRequestVisitOpen] = useState(false)
    const [requestLoading, setRequestLoading] = useState(false)
    const [requestForm, setRequestForm] = useState({ description: '', address: '', preferredDate: '' })

    /**
     * SECURITY: resolveClient — IDOR Prevention
     *
     * If a ?client= URL param is provided, we MUST verify that the requesting
     * user actually owns that client record by checking auth_user_id.
     */
    useEffect(() => {
        async function resolveClient() {
            if (!user) {
                // Not authenticated — wait for auth context to load (AuthContext handles redirect)
                return
            }

            try {
                if (urlClientId) {
                    // URL param present: verify ownership by requiring auth_user_id match
                    const { data, error } = await supabase
                        .from('clients')
                        .select('id')
                        .eq('id', urlClientId)
                        .eq('auth_user_id', user.id) // IDOR guard: ownership check
                        .single()

                    if (error || !data) {
                        // No matching record owned by this user — deny access
                        setAccessDenied(true)
                        setLoading(false)
                        return
                    }

                    // Ownership confirmed
                    setClientId(data.id)
                    return
                }

                // No URL param — look up the client record for the authenticated user
                const { data, error } = await supabase
                    .from('clients')
                    .select('id')
                    .eq('auth_user_id', user.id)
                    .maybeSingle()

                if (error) throw error

                if (data) {
                    setClientId(data.id)
                } else {
                    // Authenticated user has no client record
                    setLoading(false)
                }
            } catch (err) {
                console.error('Error resolving client:', err)
                setLoading(false)
            }
        }
        resolveClient()
    }, [urlClientId, user])

    const fetchClientData = useCallback(async () => {
        if (!clientId) return
        try {
            // Fetch client info
            const { data: clientData, error: clientError } = await supabase
                .from('clients')
                .select('*')
                .eq('id', clientId)
                .single()

            if (clientError) throw clientError
            setClient(clientData as Client)

            // Fetch quotations
            const { data: quotationsData, error: quotationsError } = await supabase
                .from('quotations')
                .select('*')
                .eq('client_id', clientId)
                .order('date_created', { ascending: false })

            if (quotationsError) throw quotationsError
            setQuotations(quotationsData as Quotation[] || [])

            // Fetch invoices
            const { data: invoicesData, error: invoicesError } = await supabase
                .from('invoices')
                .select(`
          *,
          quotations (payment_proof)
        `)
                .eq('client_id', clientId)
                .order('date_created', { ascending: false })

            if (invoicesError) throw invoicesError

            // Flatten payment_proof from quotations if needed
            const processedInvoices = (invoicesData || []).map((inv: Invoice & { quotations?: { payment_proof: string | null } }) => ({
                ...inv,
                payment_proof: inv.payment_proof || inv.quotations?.payment_proof || null
            }))

            setInvoices(processedInvoices as Invoice[])
            setLoading(false)
        } catch (error) {
            console.error('Error fetching client data:', error)
            setLoading(false)
        }
    }, [clientId])

    useEffect(() => {
        if (clientId) {
            fetchClientData()
        }
    }, [clientId, fetchClientData])

    const initiateAcceptance = (quote: Quotation) => {
        setAcceptingQuote(quote)
        setStep(1)
        setSignature(null)
    }

    const handleSignatureSave = (dataUrl: string) => {
        setSignature(dataUrl)
    }

    // HELPER: Convert a DataURL string to a Blob object.
    const dataURLtoBlob = (dataurl: string) => {
        const parts = dataurl.split(',')
        const mime = parts[0].match(/:(.*?);/)?.[1] || 'image/png'
        const bstr = atob(parts[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new Blob([u8arr], { type: mime })
    }

    const uploadFileToStorage = async (file: File | Blob, path: string) => {
        const fileName = `${path}_${Math.random().toString(36).substring(7)}`
        const { error: uploadError } = await supabase.storage
            .from('payment-proofs')
            .upload(fileName, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
            .from('payment-proofs')
            .getPublicUrl(fileName)

        return publicUrl
    }

    const submitAcceptance = async () => {
        if (!signature) {
            toast.error('Please sign the document first.')
            return
        }
        setStep(2)
    }

    const downloadProof = (url: string, filename: string) => {
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const submitFinalAcceptance = async (paymentProofFile: File) => {
        if (!acceptingQuote) return
        const toastId = toast.loading('Submitting acceptance and payment proof...')
        try {
            if (!paymentProofFile) throw new Error('Payment proof is required')
            if (!signature) throw new Error('Signature is required')

            const proofUrl = await uploadFileToStorage(paymentProofFile, `proof_${acceptingQuote.id}`)
            const signatureBlob = dataURLtoBlob(signature)
            const signatureUrl = await uploadFileToStorage(signatureBlob, `sig_${acceptingQuote.id}`)

            const { error } = await supabase
                .from('quotations')
                .update({
                    status: 'Pending Review',
                    client_signature: signatureUrl,
                    payment_proof: proofUrl,
                    accepted_at: new Date().toISOString()
                })
                .eq('id', acceptingQuote.id)

            if (error) throw error

            await supabase.from('activity_log').insert([{
                type: 'Quotation Pending Review',
                description: `Client signed and uploaded proof for quotation #${acceptingQuote.id.substring(0, 6)}`,
                related_entity_id: acceptingQuote.id,
                related_entity_type: 'quotation'
            }])

            setStep(3)
            fetchClientData()
            toast.success('Submitted for review!', { id: toastId })
        } catch (error: unknown) {
            console.error('Error submitting final acceptance:', error)
            const message = error instanceof Error ? error.message : 'An unknown error occurred'
            toast.error(`Failed to submit: ${message}`, { id: toastId })
        }
    }

    const submitFinalPaymentProof = async (proofFile: File) => {
        if (!acceptingQuote) return
        const toastId = toast.loading('Uploading final payment proof...')
        try {
            if (!proofFile) throw new Error('File is required')
            const proofUrl = await uploadFileToStorage(proofFile, `final_proof_${acceptingQuote.id}`)

            const { error } = await supabase
                .from('quotations')
                .update({
                    final_payment_proof: proofUrl,
                })
                .eq('id', acceptingQuote.id)

            if (error) throw error

            await supabase.from('activity_log').insert([{
                type: 'Final Payment Proof Uploaded',
                description: `Client uploaded final payment proof for quotation #${acceptingQuote.id.substring(0, 6)}`,
                related_entity_id: acceptingQuote.id,
                related_entity_type: 'quotation'
            }])

            setStep(3)
            fetchClientData()
            toast.success('Final proof uploaded successfully!', { id: toastId })
        } catch (error: unknown) {
            console.error('Error uploading final proof:', error)
            const message = error instanceof Error ? error.message : 'An unknown error occurred'
            toast.error(`Failed to upload: ${message}`, { id: toastId })
        }
    }

    const handleDecline = async (quote: Quotation) => {
        if (!confirm('Are you sure you want to decline this quotation?')) return
        try {
            await supabase.from('quotations').update({ status: 'Rejected' }).eq('id', quote.id)
            fetchClientData()
            toast.info('Quotation declined')
        } catch (e: unknown) {
            console.error(e)
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Draft': return 'bg-gray-500'
            case 'Sent': return 'bg-blue-500'
            case 'Approved': case 'Accepted': return 'bg-green-500'
            case 'Rejected': return 'bg-red-500'
            case 'Paid': return 'bg-green-600'
            case 'Overdue': return 'bg-red-600'
            case 'Pending Review': return 'bg-amber-500'
            default: return 'bg-gray-500'
        }
    }

    const companyPhone = settings.companyPhone || '0629558559'
    const companyEmail = settings.companyEmail || 'Kyle@GSSolutions.co.za'
    const whatsappNumber = settings.whatsappNumber || companyPhone
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\s+/g, '')}`

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
                    <p className="text-sm text-slate-500 animate-pulse">Loading Security Hub...</p>
                </div>
            </div>
        )
    }

    if (accessDenied) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="h-20 w-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-2">
                    <ShieldCheck className="h-10 w-10 text-red-600 dark:text-red-400" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Access Denied</h1>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                    You do not have permission to view this client record.
                    If you believe this is an error, please contact support.
                </p>
                <Button variant="outline" onClick={() => router.push('/portal/login')}>Return to Login</Button>
            </div>
        )
    }

    if (!clientId || !client) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
                <HelpCircle className="h-12 w-12 text-slate-400 mb-4" />
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Invalid Link</h1>
                <p className="text-slate-500 dark:text-slate-400 mb-6">Invalid or expired portal link. Please contact support if you think this is a mistake.</p>
                <Button onClick={() => router.push('/portal/login')}>Return to Login</Button>
            </div>
        )
    }

    const DashboardOverview = () => {
        const totalOutstanding = invoices
            .filter(i => i.status !== 'Paid' && i.status !== 'Draft' && i.status !== 'Cancelled')
            .reduce((sum, i) => sum + (i.total_amount || 0), 0) +
            quotations
                .filter(q => q.status === 'Accepted' || q.status === 'Approved')
                .reduce((sum, q) => {
                    if (q.final_payment_approved) return sum
                    const isApproved = q.status === 'Approved' || q.admin_approved
                    const depositRatio = (q.payment_type === 'full' ? 100 : (q.deposit_percentage || 75)) / 100
                    if (isApproved) {
                        return sum + (q.total_amount * (1 - depositRatio))
                    } else {
                        return sum + (q.total_amount * depositRatio)
                    }
                }, 0)

        const activeQuotes = quotations.filter(q => q.status === 'Sent').length
        const recentSuccesses = quotations.filter(q => q.final_payment_approved)

        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl group">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-600/30 transition-all duration-1000 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl group-hover:bg-purple-600/30 transition-all duration-1000 delay-700 animate-pulse"></div>
                    <div className="relative z-10 p-8 md:p-12">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                                    Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{client.name.split(' ')[0]}</span>
                                </h2>
                                <p className="text-slate-400 text-lg max-w-xl">
                                    Your secure client dashboard. Track quotes, manage invoices, and approve payments in real-time.
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <Badge variant="outline" className="text-blue-400 border-blue-500/30 px-4 py-1.5 text-sm backdrop-blur-md bg-blue-950/30">Verified Client</Badge>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group/card">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400 group-hover/card:text-blue-300 transition-colors">
                                        <CreditCard className="w-6 h-6" />
                                    </div>
                                    <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-0">Outstanding</Badge>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Due</p>
                                    <p className="text-3xl font-bold text-white mt-1">{formatCurrency(totalOutstanding)}</p>
                                </div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group/card">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400 group-hover/card:text-purple-300 transition-colors">
                                        <PenTool className="w-6 h-6" />
                                    </div>
                                    <Badge className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border-0">Action Needed</Badge>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Pending Quotes</p>
                                    <p className="text-3xl font-bold text-white mt-1">{activeQuotes}</p>
                                </div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group/card">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400 group-hover/card:text-emerald-300 transition-colors">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                    <Badge className="bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border-0">Secured</Badge>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Site Status</p>
                                    <p className="text-2xl font-bold text-white mt-1">Active</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {recentSuccesses.length > 0 && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 delay-200">
                        <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></span>
                            Recent Updates
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {recentSuccesses.map(q => (
                                <div key={q.id} className="relative overflow-hidden bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-green-200/50 dark:border-green-900/30 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all flex justify-between items-center group">
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500"></div>
                                    <div>
                                        <p className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                            <CheckCircle className="h-5 w-5 text-green-500" /> Payment Verified
                                        </p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                            Final payment for Quote <strong className="text-green-600 dark:text-green-400">#{q.id.substring(0, 6)}</strong> approved.
                                        </p>
                                    </div>
                                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                                        <CheckCircle className="h-6 w-6" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="animate-in fade-in slide-in-from-bottom-2 delay-500">
                    <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                        Quick Access
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button variant="outline" className="h-32 flex-col justify-center gap-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all group" onClick={() => setContactOpen(true)}>
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full group-hover:scale-110 transition-transform duration-300">
                                <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="font-medium text-slate-700 dark:text-slate-300">Support Center</span>
                        </Button>
                        <Button variant="outline" className="h-32 flex-col justify-center gap-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 hover:border-green-500/50 hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-all group" onClick={() => window.open(whatsappUrl, '_blank')}>
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full group-hover:scale-110 transition-transform duration-300">
                                <MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <span className="font-medium text-slate-700 dark:text-slate-300">WhatsApp Us</span>
                        </Button>
                        <Button variant="outline" className="h-32 flex-col justify-center gap-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 hover:border-purple-500/50 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all group" onClick={() => { setRequestForm({ description: '', address: '', preferredDate: '' }); setRequestQuoteOpen(true) }}>
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full group-hover:scale-110 transition-transform duration-300">
                                <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <span className="font-medium text-slate-700 dark:text-slate-300">Request a Quote</span>
                        </Button>
                        <Button variant="outline" className="h-32 flex-col justify-center gap-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 hover:border-amber-500/50 hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-all group" onClick={() => { setRequestForm({ description: '', address: client?.address || '', preferredDate: '' }); setRequestVisitOpen(true) }}>
                            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full group-hover:scale-110 transition-transform duration-300">
                                <MapPin className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                            </div>
                            <span className="font-medium text-slate-700 dark:text-slate-300">Request Site Visit</span>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative font-sans overflow-x-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-black opacity-80" />
            <div className="fixed -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="fixed top-40 -left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

            <header className="fixed top-0 left-0 right-0 glass-effect z-50 transition-all duration-300">
                <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="relative h-10 md:h-12 w-32 shrink-0">
                            <Image
                                src={settings.logoUrl || "/logo.png"}
                                alt={settings.companyName || "Global Security Solutions"}
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        <div className="hidden md:block truncate">
                            <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-none tracking-tight">Client Portal</h1>
                            <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-0.5 truncate">{settings.companyName || 'Global Security Solutions'}</p>
                        </div>
                    </div>
                    <div className="flex gap-2 md:gap-4 items-center shrink-0 flex-nowrap">
                        <Button variant="ghost" size="sm" className="hidden sm:flex text-slate-600 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/20 whitespace-nowrap" onClick={() => setContactOpen(true)}>
                            <HelpCircle className="mr-2 h-4 w-4" /> Help Center
                        </Button>
                        <div className="h-10 w-10 min-w-[40px] shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[2px] shadow-lg shadow-blue-500/20 flex-none">
                            <div className="h-full w-full rounded-full bg-white dark:bg-slate-950 flex items-center justify-center text-slate-800 dark:text-white font-bold text-xs">{client.name.substring(0, 2).toUpperCase()}</div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 sm:px-6 py-8 pt-24 pb-32 max-w-7xl relative z-10">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                    <div className="sticky top-20 z-40 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl py-2 -mx-4 px-4 md:mx-0 md:px-0 transition-all duration-300">
                        <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 dark:border-slate-800 shadow-sm w-full md:w-max flex overflow-x-auto no-scrollbar gap-1">
                            <TabsList className="bg-transparent gap-1 w-full flex justify-start md:justify-center">
                                <TabsTrigger value="overview" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-md transition-all font-medium text-slate-600 dark:text-slate-400 flex-1 md:flex-none">Overview</TabsTrigger>
                                <TabsTrigger value="quotations" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-md transition-all font-medium text-slate-600 dark:text-slate-400 flex-1 md:flex-none">Quotes</TabsTrigger>
                                <TabsTrigger value="proforma" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-md transition-all font-medium text-slate-600 dark:text-slate-400 flex-1 md:flex-none">Proforma</TabsTrigger>
                                <TabsTrigger value="invoices" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-md transition-all font-medium text-slate-600 dark:text-slate-400 flex-1 md:flex-none">Invoices</TabsTrigger>
                            </TabsList>
                        </div>
                    </div>

                    <TabsContent value="overview">
                        <DashboardOverview />
                    </TabsContent>

                    <TabsContent value="quotations" className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500">
                        {quotations
                            .filter(q => q.status === 'Sent' || q.status === 'Draft' || q.status === 'Rejected' || q.status === 'Pending Review')
                            .map((quotation) => (
                                <Card key={quotation.id} className="group relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300 shadow-sm hover:shadow-2xl rounded-3xl">
                                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className={`h-1 w-full ${getStatusColor(quotation.status)}`}></div>
                                    <CardHeader className="relative z-10 pb-2">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline" className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-none px-2 py-0.5 rounded-md">#{quotation.id.substring(0, 6)}</Badge>
                                                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{new Date(quotation.date_created).toLocaleDateString()}</span>
                                                </div>
                                                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Security System Quote</CardTitle>
                                            </div>
                                            <Badge className={cn("px-3 py-1 rounded-full text-xs font-semibold shadow-sm border-0 text-white", getStatusColor(quotation.status))}>{quotation.status}</Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="relative z-10 space-y-6 pt-2">
                                        <div className="flex justify-between items-end border-b border-slate-100 dark:border-slate-800/50 pb-4 border-dashed">
                                            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Estimated Total</span>
                                            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{formatCurrency(quotation.total_amount)}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <Button variant="outline" className="w-full h-11 border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 transition-all" onClick={() => generateQuotePDF({ ...quotation, clients: client }, settings)}>
                                                <Download className="mr-2 h-4 w-4" /> Download PDF
                                            </Button>
                                            {quotation.status === 'Sent' && (
                                                <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 group-hover:scale-[1.02] transition-transform" onClick={() => initiateAcceptance(quotation)}>Accept & Sign</Button>
                                            )}
                                        </div>
                                        {quotation.status === 'Sent' && (
                                            <div className="text-center pt-2">
                                                <button onClick={() => handleDecline(quotation)} className="text-xs text-red-400 hover:text-red-500 hover:underline font-medium transition-colors">Decline Quote</button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                    </TabsContent>

                    <TabsContent value="proforma" className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500">
                        {quotations
                            .filter(q => q.status === 'Accepted' || q.status === 'Approved')
                            .map((quotation) => (
                                <Card key={quotation.id} className="group relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-green-500/30 dark:hover:border-green-500/30 transition-all duration-300 shadow-sm hover:shadow-2xl rounded-3xl">
                                    <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="h-1 w-full bg-green-500"></div>
                                    <CardHeader className="relative z-10 pb-2">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Proforma Invoice</CardTitle>
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline" className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-none px-2 py-0.5 rounded-md">#{quotation.id.substring(0, 6)}</Badge>
                                                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Accepted: {new Date(quotation.accepted_at || quotation.date_created).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-0 shadow-sm rounded-full px-3 py-1">Active</Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="relative z-10 space-y-6 pt-2">
                                        <div className="flex justify-between items-end border-b border-slate-100 dark:border-slate-800/50 pb-4 border-dashed">
                                            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Value</span>
                                            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{formatCurrency(quotation.total_amount)}</span>
                                        </div>

                                        <div className={cn(
                                            "p-4 rounded-xl text-sm text-center border font-medium relative overflow-hidden",
                                            (quotation.status === 'Approved' || quotation.admin_approved)
                                                ? "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700"
                                                : "bg-amber-50 text-amber-800 border-amber-100 dark:bg-amber-900/10 dark:text-amber-400 dark:border-amber-900/20"
                                        )}>
                                            {(quotation.status === 'Approved' || quotation.admin_approved) ? (
                                                <>
                                                    {(() => {
                                                        const depositRatio = (quotation.payment_type === 'full' ? 100 : (quotation.deposit_percentage || 75)) / 100
                                                        const balance = quotation.total_amount * (1 - depositRatio)
                                                        return <p>Outstanding Balance: <strong className="ml-1 text-slate-900 dark:text-white">{formatCurrency(balance)}</strong></p>
                                                    })()}
                                                </>
                                            ) : (
                                                <div className="relative z-10">
                                                    <p className="opacity-80 text-xs uppercase tracking-wide mb-1">
                                                        {quotation.payment_proof ? "Payment Review Pending" : (quotation.payment_type === 'full' ? "Full Payment Required" : "Deposit Required")}
                                                    </p>
                                                    <strong className="block text-2xl tracking-tight">
                                                        {formatCurrency(quotation.total_amount * ((quotation.payment_type === 'full' ? 100 : (quotation.deposit_percentage || 75)) / 100))}
                                                    </strong>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-3 pt-2">
                                            <Button className="w-full h-11 border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 transition-all" variant="outline" onClick={() => generateQuotePDF({ ...quotation, clients: client }, settings)}>
                                                <Download className="mr-2 h-4 w-4" /> Download Proforma
                                            </Button>
                                            {quotation.payment_proof && !quotation.final_payment_proof && (
                                                <Button variant="ghost" className="w-full h-11 text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20" onClick={() => downloadProof(quotation.payment_proof!, `PaymentProof_${quotation.id.substring(0, 6)}`)}>
                                                    <CheckCircle className="mr-2 h-4 w-4" /> Deposit Proof Uploaded
                                                </Button>
                                            )}
                                            {(quotation.status === 'Approved' || quotation.admin_approved) && !quotation.final_payment_approved && (
                                                <>
                                                    {!quotation.final_payment_proof ? (
                                                        <Button className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 transition-transform" onClick={() => { setAcceptingQuote(quotation); setStep(4); }}>
                                                            <CreditCard className="mr-2 h-4 w-4" /> Complete Payment
                                                        </Button>
                                                    ) : (
                                                        <Button variant="ghost" className="w-full h-11 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20" onClick={() => downloadProof(quotation.final_payment_proof!, `FinalProof_${quotation.id.substring(0, 6)}`)}>
                                                            <CheckCircle className="mr-2 h-4 w-4" /> Final Proof Uploaded
                                                        </Button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                    </TabsContent>

                    <TabsContent value="invoices" className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500">
                        {invoices
                            .filter(inv => inv.status !== 'Draft')
                            .map((invoice) => (
                                <Card key={invoice.id} className="group relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-all duration-300 shadow-sm hover:shadow-2xl rounded-3xl">
                                    <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className={`h-1 w-full ${getStatusColor(invoice.status)}`}></div>
                                    <CardHeader className="relative z-10 pb-2">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 transition-transform duration-300">
                                                    <CreditCard className="w-6 h-6 text-slate-400 group-hover:text-orange-500 transition-colors" />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">Invoice #{invoice.id.substring(0, 6)}</CardTitle>
                                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">{new Date(invoice.date_created).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <Badge className={cn("px-3 py-1 rounded-full shadow-sm border-0 text-white", getStatusColor(invoice.status))}>{invoice.status}</Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="relative z-10 space-y-4 pt-4">
                                        <div className="flex justify-between items-center py-4 border-y border-dashed border-slate-100 dark:border-slate-800/50">
                                            <span className="text-slate-500 font-medium">Amount Due</span>
                                            <span className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{formatCurrency(invoice.total_amount)}</span>
                                        </div>
                                        <Button className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white shadow-lg transition-transform" onClick={() => generateInvoicePDF({ ...invoice, clients: client }, settings)}>
                                            <Download className="mr-2 h-4 w-4" /> Download Tax Invoice
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                    </TabsContent>
                </Tabs>
            </div>

            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center animate-in zoom-in duration-300">
                <MessageCircle className="h-7 w-7 fill-current" />
            </a>

            <Dialog open={step > 0} onOpenChange={(open: boolean) => !open && setStep(0)}>
                <DialogContent className="sm:max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200 dark:border-slate-800 shadow-2xl rounded-3xl overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                    <DialogHeader className="pt-6">
                        <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                            {step === 1 ? (
                                <>
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400"><PenTool className="h-5 w-5" /></div>
                                    Sign Acceptance
                                </>
                            ) : (
                                <>
                                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400"><CheckCircle className="h-5 w-5" /></div>
                                    Next Steps
                                </>
                            )}
                        </DialogTitle>
                        <DialogDescription className="text-slate-500 dark:text-slate-400 text-base mt-2">
                            {step === 1 ? 'Please sign below to accept this quotation and proceed to payment.' : 'Quotation accepted! Please proceed with the payment steps below.'}
                        </DialogDescription>
                    </DialogHeader>

                    {step === 1 && (
                        <div className="space-y-4">
                            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-inner bg-white"><SignaturePad onSave={handleSignatureSave} /></div>
                            <p className="text-xs text-muted-foreground text-center bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">By signing, you agree to the Terms & Conditions.</p>
                            <DialogFooter className="gap-2 sm:gap-0">
                                <Button variant="outline" onClick={() => setStep(0)}>Cancel</Button>
                                <Button onClick={submitAcceptance} disabled={!signature} className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg transition-all">Confirm & Sign</Button>
                            </DialogFooter>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-5 rounded-xl text-sm space-y-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 shadow-sm"><span className="font-bold text-lg">1</span></div>
                                    <p className="font-bold text-lg text-slate-900 dark:text-white">Banking Details</p>
                                </div>
                                <div className="grid grid-cols-[80px_1fr] gap-y-2 gap-x-4 pl-3 text-slate-600 dark:text-slate-300">
                                    <span className="text-muted-foreground font-medium text-right">Bank:</span> <span className="font-semibold text-slate-900 dark:text-white">{settings.bankName || 'FNB / RMB'}</span>
                                    <span className="text-muted-foreground font-medium text-right">Account:</span> <span className="font-semibold text-slate-900 dark:text-white font-mono">{settings.bankAccountNumber || '63182000223'}</span>
                                    <span className="text-muted-foreground font-medium text-right">Branch:</span> <span className="text-slate-900 dark:text-white">{settings.bankBranchCode || '250655'}</span>
                                    <span className="text-muted-foreground font-medium text-right pt-1">Ref:</span>
                                    <span className="font-mono bg-white dark:bg-black px-2 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200 select-all font-bold tracking-wide w-fit">{settings.bankReference || acceptingQuote?.id.substring(0, 6)}</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><span className="font-bold">2</span></div>
                                    <p className="font-semibold text-slate-800 dark:text-slate-200">Upload Proof of Payment</p>
                                </div>
                                <div className="pl-10">
                                    <p className="text-sm text-slate-500 mb-3">Please make a <strong>{acceptingQuote?.payment_type === 'full' ? 'Full Payment' : `${acceptingQuote?.deposit_percentage || 75}% deposit`} ({formatCurrency((acceptingQuote?.total_amount || 0) * ((acceptingQuote?.payment_type === 'full' ? 100 : (acceptingQuote?.deposit_percentage || 75)) / 100))})</strong> to secure your booking.</p>
                                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:bg-slate-50 transition-colors relative">
                                        <label htmlFor="proof-upload-initial" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                                            <Upload className="h-10 w-10 text-slate-300 mb-2" />
                                            <p className="text-sm font-medium text-slate-600">Click to upload Proof of Payment</p>
                                            <input id="proof-upload-initial" type="file" accept="image/*,application/pdf" className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" onChange={(e) => e.target.files?.[0] && submitFinalAcceptance(e.target.files[0])} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600"><Upload className="h-4 w-4" /></div>
                                    <p className="font-semibold text-slate-800 dark:text-slate-200">Upload Final Proof of Payment</p>
                                </div>
                                <div className="pl-10">
                                    <p className="text-sm text-slate-500 mb-3">Please upload the proof for your <strong>Outstanding Balance</strong>.</p>
                                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:bg-slate-50 transition-colors relative">
                                        <label htmlFor="proof-upload-final" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                                            <Upload className="h-10 w-10 text-slate-300 mb-2" />
                                            <p className="text-sm font-medium text-slate-600">Click to upload Final Proof</p>
                                            <input id="proof-upload-final" type="file" accept="image/*,application/pdf" className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.files?.[0] && submitFinalPaymentProof(e.target.files[0])} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="text-center py-8 space-y-4">
                            <div className="flex justify-center mb-6"><div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in duration-500"><CheckCircle className="h-12 w-12 text-green-600" /></div></div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Submission Received!</h3>
                            <p className="text-slate-500 max-w-xs mx-auto">Thank you! We have received your signature and payment proof. Our team will review your submission shortly.</p>
                            <Button onClick={() => setStep(0)} className="w-full mt-4">Return to Dashboard</Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={contactOpen} onOpenChange={setContactOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Contact Support</DialogTitle>
                        <DialogDescription>Need help? Reach out to us directly.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <a href={`tel:${companyPhone}`} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted transition-colors">
                            <div className="bg-primary/10 p-2 rounded-full"><Phone className="h-6 w-6 text-primary" /></div>
                            <div><p className="font-medium">Phone Support</p><p className="text-sm text-muted-foreground">{companyPhone}</p></div>
                        </a>
                        <a href={`mailto:${companyEmail}`} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted transition-colors">
                            <div className="bg-primary/10 p-2 rounded-full"><Mail className="h-6 w-6 text-primary" /></div>
                            <div><p className="font-medium">Email Support</p><p className="text-sm text-muted-foreground">{companyEmail}</p></div>
                        </a>
                    </div>
                    <DialogFooter><Button variant="ghost" onClick={() => setContactOpen(false)}>Close</Button></DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={requestQuoteOpen} onOpenChange={setRequestQuoteOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-purple-600" /> Request a Quote</DialogTitle>
                        <DialogDescription>Tell us what you need and we&apos;ll prepare a quote for you.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={async (e) => {
                        e.preventDefault()
                        if (!clientId) return
                        setRequestLoading(true)
                        try {
                            const { error: reqError } = await supabase.from('client_requests').insert([{
                                client_id: clientId,
                                type: 'quote',
                                description: requestForm.description,
                                preferred_date: requestForm.preferredDate || null,
                                status: 'pending'
                            }])
                            if (reqError) throw reqError
                            toast.success('Quote request submitted!')
                            setRequestQuoteOpen(false)
                        } catch (err: unknown) {
                            const message = err instanceof Error ? err.message : 'Failed to submit request'
                            toast.error(message)
                        } finally {
                            setRequestLoading(false)
                        }
                    }} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="quoteDesc">What do you need?</Label>
                            <Textarea id="quoteDesc" placeholder="e.g. CCTV installation..." value={requestForm.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setRequestForm(f => ({ ...f, description: e.target.value }))} rows={4} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="quoteDate">Preferred Date</Label>
                            <Input id="quoteDate" type="date" value={requestForm.preferredDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRequestForm(f => ({ ...f, preferredDate: e.target.value }))} />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="ghost" onClick={() => setRequestQuoteOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={requestLoading || !clientId} className="bg-purple-600 hover:bg-purple-700 text-white">
                                {requestLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />} Submit Request
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={requestVisitOpen} onOpenChange={setRequestVisitOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2"><MapPin className="h-5 w-5 text-amber-600" /> Request a Site Visit</DialogTitle>
                        <DialogDescription>Schedule a site assessment by our team.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={async (e) => {
                        e.preventDefault()
                        if (!clientId) return
                        setRequestLoading(true)
                        try {
                            const { error: reqError } = await supabase.from('client_requests').insert([{
                                client_id: clientId,
                                type: 'site_visit',
                                description: requestForm.description,
                                address: requestForm.address,
                                preferred_date: requestForm.preferredDate || null,
                                status: 'pending'
                            }])
                            if (reqError) throw reqError
                            toast.success('Site visit request submitted!')
                            setRequestVisitOpen(false)
                        } catch (err: unknown) {
                            const message = err instanceof Error ? err.message : 'Failed to submit request'
                            toast.error(message)
                        } finally {
                            setRequestLoading(false)
                        }
                    }} className="space-y-4">
                        <div className="space-y-2"><Label htmlFor="visitAddress">Site Address</Label><Input id="visitAddress" placeholder="123 Main Street..." value={requestForm.address} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRequestForm(f => ({ ...f, address: e.target.value }))} required /></div>
                        <div className="space-y-2"><Label htmlFor="visitDesc">Notes</Label><Textarea id="visitDesc" placeholder="e.g. Need assessment..." value={requestForm.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setRequestForm(f => ({ ...f, description: e.target.value }))} rows={3} required /></div>
                        <div className="space-y-2"><Label htmlFor="visitDate">Preferred Date</Label><Input id="visitDate" type="date" value={requestForm.preferredDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRequestForm(f => ({ ...f, preferredDate: e.target.value }))} /></div>
                        <DialogFooter>
                            <Button type="button" variant="ghost" onClick={() => setRequestVisitOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={requestLoading || !clientId} className="bg-amber-600 hover:bg-amber-700 text-white">
                                {requestLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />} Submit Request
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <InstallPrompt />
        </div>
    )
}
