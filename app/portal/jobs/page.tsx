'use client'

import { cn } from '@/lib/portal/utils'

import { useState, useEffect, Suspense, lazy, useCallback } from 'react'
import { Card, CardContent } from '@/components/portal/ui/card'
import { Button } from '@/components/portal/ui/button'
import { Input } from '@/components/portal/ui/input'
import { Label } from '@/components/portal/ui/label'
import { Textarea } from '@/components/portal/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/portal/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/portal/ui/dialog'
import { Badge } from '@/components/portal/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/portal/ui/tabs'
import { Plus, Search, Calendar as CalendarIcon, Clock, List as ListIcon, Kanban, Pencil, Trash2, Loader2, CheckCircle, Activity, Upload, FileText, Image as ImageIcon } from 'lucide-react'
import { supabase } from '@/lib/portal/supabase'
import { toast } from 'sonner'
import { useConfirm } from '@/components/portal/ui/alert-dialog'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Client, Job, Quotation, JobAttachment } from '@/types/crm'
import { PRIVATE_STORAGE_BUCKETS, deleteStorageFile, uploadPrivateFile } from '@/lib/portal/storage'
import { StorageImage } from '@/components/portal/StorageImage'
import { getPageRange, getTotalPages } from '@/lib/portal/pagination'
import { PaginationBar } from '@/components/portal/PaginationBar'
import { PageHeader } from '@/components/portal/PageHeader'
import { StatCard } from '@/components/portal/StatCard'
import { JOB_STATUS_COLORS } from '@/lib/portal/portal-theme'

// Lazy load heavy components
const JobBoard = lazy(() => import('./JobBoard'))
const JobCalendar = lazy(() => import('./JobCalendar'))

function JobsContent() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { confirm, ConfirmDialog } = useConfirm()
    const [jobs, setJobs] = useState<Job[]>([])
    const [clients, setClients] = useState<Client[]>([])
    const [quotations, setQuotations] = useState<Quotation[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [editingJob, setEditingJob] = useState<Job | null>(null)
    const [viewMode, setViewMode] = useState('list') // list, board, calendar
    const [attachments, setAttachments] = useState<JobAttachment[]>([])
    const [isUploading, setIsUploading] = useState(false)
    const [activeTab, setActiveTab] = useState('details')
    const [jobsPage, setJobsPage] = useState(0)
    const [jobsCount, setJobsCount] = useState(0)
    const [jobStats, setJobStats] = useState<Pick<Job, 'status'>[]>([])
    const [formData, setFormData] = useState({
        client_id: '',
        quotation_id: '',
        assigned_technicians: '',
        scheduled_datetime: '',
        scheduled_end_datetime: '',
        notes: '',
        status: 'Pending'
    })

    // Calculate Stats
    const activeJobs = jobStats.filter(j => ['Pending', 'In Progress'].includes(j.status || '')).length
    const completedJobs = jobStats.filter(j => j.status === 'Completed').length
    const pendingJobs = jobStats.filter(j => j.status === 'Pending').length

    const fetchJobStats = useCallback(async () => {
        try {
            const { data, error } = await supabase.from('jobs').select('status')
            if (error) throw error
            setJobStats((data as Pick<Job, 'status'>[]) || [])
        } catch (error) {
            console.error('Error fetching job stats:', error)
        }
    }, [])

    const fetchJobs = useCallback(async (page = jobsPage, mode = viewMode) => {
        try {
            if (mode === 'list') {
                const { from, to } = getPageRange(page)
                const { data, error, count } = await supabase
                    .from('jobs')
                    .select(`
          *,
          clients (name, company),
          quotations (id, payment_proof)
        `, { count: 'exact' })
                    .order('created_at', { ascending: false })
                    .range(from, to)

                if (error) throw error
                setJobs((data as Job[]) || [])
                setJobsCount(count || 0)
            } else {
                const { data, error } = await supabase
                    .from('jobs')
                    .select(`
          *,
          clients (name, company),
          quotations (id, payment_proof)
        `)
                    .order('created_at', { ascending: false })

                if (error) throw error
                setJobs((data as Job[]) || [])
            }
        } catch (error) {
            console.error('Error fetching jobs:', error)
        }
    }, [jobsPage, viewMode])

    const fetchClients = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('clients')
                .select('id, name, company')
                .order('name', { ascending: true })

            if (error) throw error
            setClients((data as Client[]) || [])
        } catch (error) {
            console.error('Error fetching clients:', error)
        }
    }, [])

    const fetchQuotations = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('quotations')
                .select('id, client_id')
                .in('status', ['Approved', 'Accepted'])

            if (error) throw error
            setQuotations((data as Quotation[]) || [])
        } catch (error) {
            console.error('Error fetching quotations:', error)
        }
    }, [])

    useEffect(() => {
        fetchJobStats()
        fetchClients()
        fetchQuotations()
    }, [fetchJobStats, fetchClients, fetchQuotations])

    useEffect(() => {
        fetchJobs(jobsPage, viewMode)
    }, [jobsPage, viewMode, fetchJobs])

    useEffect(() => {
        const fromQuoteId =
            searchParams.get('fromQuote') ||
            searchParams.get('quoteId') ||
            (searchParams.get('createFromQuote') === 'true' ? searchParams.get('quoteId') : null)

        if (fromQuoteId) {
            const fetchAndPrefill = async () => {
                try {
                    const { data: quote, error } = await supabase
                        .from('quotations')
                        .select('id, client_id')
                        .eq('id', fromQuoteId)
                        .single()

                    if (error || !quote) {
                        console.error('Could not find quotation:', error)
                        toast.error('Quotation not found')
                        return
                    }

                    setViewMode('board')
                    setFormData(prev => ({
                        ...prev,
                        client_id: quote.client_id,
                        quotation_id: quote.id,
                        notes: `Job for Quotation #${quote.id.substring(0, 6)}`,
                        status: 'Pending'
                    }))
                    setIsDialogOpen(true)
                } catch (err) {
                    console.error('Error fetching quotation for job creation:', err)
                }
            }
            fetchAndPrefill()
            router.replace(pathname)
        }
    }, [searchParams, router, pathname])

    const fetchAttachments = async (jobId: string) => {
        try {
            const { data, error } = await supabase
                .from('job_attachments')
                .select('*')
                .eq('job_id', jobId)
                .order('created_at', { ascending: false })

            if (error) throw error
            setAttachments((data as JobAttachment[]) || [])
        } catch (error) {
            console.error('Error fetching attachments:', error)
        }
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return
        if (!editingJob) {
            toast.error('Please save the job before adding attachments')
            return
        }

        setIsUploading(true)
        const toastId = toast.loading('Uploading files...')

        try {
            for (const file of Array.from(files)) {
                const fileExt = file.name.split('.').pop()
                const fileName = `${editingJob.id}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`

                const storedPath = await uploadPrivateFile(PRIVATE_STORAGE_BUCKETS.JOB_ATTACHMENTS, fileName, file)

                const { error: dbError } = await supabase
                    .from('job_attachments')
                    .insert([{
                        job_id: editingJob.id,
                        file_url: storedPath,
                        file_type: file.type,
                        file_name: file.name,
                        description: ''
                    }])

                if (dbError) throw dbError
            }

            toast.success('Files uploaded successfully', { id: toastId })
            fetchAttachments(editingJob.id!)
        } catch (error) {
            console.error('Error uploading files:', error)
            toast.error('Failed to upload files', { id: toastId })
        } finally {
            setIsUploading(false)
            e.target.value = ''
        }
    }

    const handleDeleteAttachment = async (attachment: JobAttachment) => {
        const ok = await confirm({
            title: 'Delete Attachment',
            description: 'Are you sure you want to delete this attachment? This action cannot be undone.',
            confirmLabel: 'Delete',
            variant: 'destructive'
        })
        if (!ok) return

        try {
            await deleteStorageFile(PRIVATE_STORAGE_BUCKETS.JOB_ATTACHMENTS, attachment.file_url)

            const { error: dbError } = await supabase
                .from('job_attachments')
                .delete()
                .eq('id', attachment.id)

            if (dbError) throw dbError

            toast.success('Attachment deleted')
            if (editingJob?.id) fetchAttachments(editingJob.id)
        } catch (error) {
            console.error('Error deleting attachment:', error)
            toast.error('Failed to delete attachment')
        }
    }

    const handleUpdateAttachmentDescription = async (attachmentId: string, description: string) => {
        try {
            const { error } = await supabase
                .from('job_attachments')
                .update({ description })
                .eq('id', attachmentId)

            if (error) throw error

            setAttachments(prev => prev.map(a => a.id === attachmentId ? { ...a, description } : a))
        } catch (error) {
            console.error('Error updating description:', error)
            toast.error('Failed to save description')
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const technicians = formData.assigned_technicians.split(',').map(t => t.trim())

            const quotationId =
                formData.quotation_id && formData.quotation_id !== 'none'
                    ? formData.quotation_id
                    : null

            const jobPayload = {
                client_id: formData.client_id,
                quotation_id: quotationId,
                assigned_technicians: technicians,
                scheduled_datetime: formData.scheduled_datetime || null,
                notes: formData.notes,
                status: formData.status
            }

            if (editingJob) {
                const { error } = await supabase
                    .from('jobs')
                    .update(jobPayload)
                    .eq('id', editingJob.id)

                if (error) throw error

                await supabase.from('activity_log').insert([{
                    type: 'Job Updated',
                    description: `Job updated for client`,
                    related_entity_id: editingJob.id,
                    related_entity_type: 'job'
                }])
                toast.success('Job updated successfully')
            } else {
                const { data: newJob, error } = await supabase
                    .from('jobs')
                    .insert([jobPayload])
                    .select()
                    .single()

                if (error) throw error

                await supabase.from('activity_log').insert([{
                    type: 'Job Created',
                    description: `New job created for client`,
                    related_entity_id: newJob?.id,
                    related_entity_type: 'job'
                }])

                if (formData.scheduled_datetime) {
                    await supabase.from('calendar_events').insert([{
                        event_type: 'Job',
                        title: `Job scheduled`,
                        datetime: formData.scheduled_datetime,
                        end_datetime: formData.scheduled_end_datetime,
                        related_entity_id: newJob?.id,
                        related_entity_type: 'job'
                    }])
                }
                toast.success('Job created successfully')
            }

            setIsDialogOpen(false)
            setEditingJob(null)
            setFormData({
                client_id: '',
                quotation_id: '',
                assigned_technicians: '',
                scheduled_datetime: '',
                scheduled_end_datetime: '',
                notes: '',
                status: 'Pending'
            })
            fetchJobs(jobsPage, viewMode)
            fetchJobStats()
        } catch (error) {
            console.error('Error saving job:', error)
            toast.error('Failed to save job')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteJob = async (job: Job) => {
        const ok = await confirm({
            title: 'Delete Job',
            description: `Delete this job for ${job.clients?.name || 'this client'}? This cannot be undone.`,
            confirmLabel: 'Delete',
            variant: 'destructive'
        })
        if (!ok) return

        const toastId = toast.loading('Deleting job...')
        try {
            const { error: attachmentsError } = await supabase
                .from('job_attachments')
                .delete()
                .eq('job_id', job.id)

            if (attachmentsError) throw attachmentsError

            await supabase
                .from('calendar_events')
                .delete()
                .eq('related_entity_id', job.id)
                .eq('related_entity_type', 'job')

            const { error } = await supabase
                .from('jobs')
                .delete()
                .eq('id', job.id)

            if (error) throw error

            await supabase.from('activity_log').insert([{
                type: 'Job Deleted',
                description: `Job deleted for ${job.clients?.name || 'client'}`,
                related_entity_id: job.id,
                related_entity_type: 'job'
            }])

            toast.success('Job deleted', { id: toastId })
            fetchJobs(jobsPage, viewMode)
            fetchJobStats()
        } catch (error) {
            console.error('Error deleting job:', error)
            toast.error('Failed to delete job', { id: toastId })
        }
    }

    const handleEdit = (job: Job) => {
        setEditingJob(job)
        setFormData({
            client_id: job.client_id!,
            quotation_id: job.quotation_id || '',
            assigned_technicians: job.assigned_technicians ? job.assigned_technicians.join(', ') : '',
            scheduled_datetime: job.scheduled_datetime || '',
            scheduled_end_datetime: '',
            notes: job.notes || '',
            status: job.status!
        })
        setIsDialogOpen(true)
        fetchAttachments(job.id!)
    }

    const updateJobStatus = async (jobId: string, newStatus: string) => {
        try {
            setJobs(jobs.map(j => j.id === jobId ? { ...j, status: newStatus } : j));

            const { error } = await supabase
                .from('jobs')
                .update({ status: newStatus, updated_at: new Date().toISOString() })
                .eq('id', jobId)

            if (error) throw error

            await supabase.from('activity_log').insert([{
                type: 'Job Status Updated',
                description: `Job status changed to ${newStatus}`,
                related_entity_id: jobId,
                related_entity_type: 'job'
            }])

            if (newStatus === 'Completed') {
                const job = jobs.find(j => j.id === jobId)
                if (job && job.quotation_id) {
                    const shouldInvoice = await confirm({
                        title: 'Job Completed',
                        description: 'Job completed! Do you want to generate a Tax Invoice from the linked quotation?',
                        confirmLabel: 'Generate Invoice',
                        cancelLabel: 'Later',
                        variant: 'default'
                    })
                    if (shouldInvoice) {
                        const toastId = toast.loading('Generating invoice...')
                        try {
                            const { data: existingInvoice, error: existingError } = await supabase
                                .from('invoices')
                                .select('id')
                                .eq('quotation_id', job.quotation_id)
                                .maybeSingle()

                            if (existingError) throw existingError
                            if (existingInvoice) {
                                toast.info('An invoice already exists for this quotation.', { id: toastId })
                                return
                            }

                            const { data: quote, error: quoteError } = await supabase
                                .from('quotations')
                                .select('*, quotation_lines(*)')
                                .eq('id', job.quotation_id)
                                .single()

                            if (quoteError) throw quoteError

                            const { data: invoiceData, error: invoiceError } = await supabase
                                .from('invoices')
                                .insert([{
                                    client_id: quote.client_id,
                                    quotation_id: quote.id,
                                    status: 'Draft',
                                    date_created: new Date().toISOString(),
                                    due_date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
                                    total_amount: quote.total_amount,
                                    vat_applicable: quote.vat_applicable,
                                    trade_subtotal: quote.trade_subtotal,
                                    profit_estimate: quote.profit_estimate,
                                    metadata: { ...quote.metadata, generated_from_job: jobId }
                                }])
                                .select()
                                .single()

                            if (invoiceError) throw invoiceError

                            if (quote.quotation_lines && quote.quotation_lines.length > 0) {
                                const invoiceLines = quote.quotation_lines.map((line: { product_id: string; quantity: number; unit_price: number; line_total: number; cost_price?: number }) => ({
                                    invoice_id: invoiceData.id,
                                    product_id: line.product_id,
                                    quantity: line.quantity,
                                    unit_price: line.unit_price,
                                    line_total: line.line_total,
                                    cost_price: line.cost_price || 0
                                }))

                                const { error: linesError } = await supabase
                                    .from('invoice_lines')
                                    .insert(invoiceLines)

                                if (linesError) throw linesError
                            }

                            const { error: statusError } = await supabase
                                .from('quotations')
                                .update({ status: 'Converted', updated_at: new Date().toISOString() })
                                .eq('id', quote.id)

                            if (statusError) throw statusError

                            await supabase.from('activity_log').insert([{
                                type: 'Quotation Converted',
                                description: `Quotation converted to invoice from completed job`,
                                related_entity_id: quote.id,
                                related_entity_type: 'quotation'
                            }])

                            toast.success('Tax Invoice generated successfully!', { id: toastId })
                        } catch (invError) {
                            console.error('Invoice generation failed:', invError)
                            toast.error('Failed to generate invoice', { id: toastId })
                        }
                    }
                }
            }

            fetchJobs(jobsPage, viewMode)
            fetchJobStats()
        } catch (error) {
            console.error('Error updating job status:', error)
            fetchJobs(jobsPage, viewMode)
            fetchJobStats()
        }
    }

    const filteredJobs = jobs.filter(job => {
        const matchesSearch =
            job.clients?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.notes?.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = filterStatus === 'all' || job.status === filterStatus

        return matchesSearch && matchesStatus
    })

    const getStatusColor = (status: string) => JOB_STATUS_COLORS[status] || 'bg-muted-foreground'

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <PageHeader
                title="Jobs"
                description="Schedule installations, track progress, and manage site attachments"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard label="Active Jobs" value={activeJobs} hint="Currently in progress or pending" variant="primary" icon={Activity} />
                <StatCard label="Completed Jobs" value={completedJobs} hint="Successfully delivered" variant="success" icon={CheckCircle} />
                <StatCard label="Pending Start" value={pendingJobs} hint="Awaiting action" variant="warning" icon={Clock} />
            </div>

            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
                <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full xl:w-auto">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search jobs..."
                            value={searchTerm}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-brand-white dark:bg-brand-navy border-brand-steel/40 dark:border-brand-navy text-slate-900 dark:text-slate-100"
                        />
                    </div>

                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Tabs value={viewMode} onValueChange={setViewMode} className="w-full sm:w-auto">
                        <TabsList className="grid w-full grid-cols-3 sm:w-[300px]">
                            <TabsTrigger value="list">
                                <ListIcon className="h-4 w-4 mr-2" />
                                List
                            </TabsTrigger>
                            <TabsTrigger value="board">
                                <Kanban className="h-4 w-4 mr-2" />
                                Board
                            </TabsTrigger>
                            <TabsTrigger value="calendar">
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                Calendar
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <Dialog
                        open={isDialogOpen}
                        onOpenChange={(open: boolean) => {
                            setIsDialogOpen(open)
                            if (!open) {
                                setEditingJob(null)
                                setAttachments([])
                                setActiveTab('details')
                                setFormData({
                                    client_id: '',
                                    quotation_id: '',
                                    assigned_technicians: '',
                                    scheduled_datetime: '',
                                    scheduled_end_datetime: '',
                                    notes: '',
                                    status: 'Pending'
                                })
                            }
                        }}
                    >
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Create Job
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[800px] h-[90vh] sm:h-auto overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>{editingJob ? 'Edit Job' : 'Create New Job'}</DialogTitle>
                                <DialogDescription>
                                    {activeTab === 'details' ? 'Schedule a new job or work order' : 'Manage job photos and documents'}
                                </DialogDescription>
                            </DialogHeader>

                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-2 mb-4">
                                    <TabsTrigger value="details">Job Details</TabsTrigger>
                                    <TabsTrigger value="attachments">
                                        Attachments
                                        {attachments.length > 0 && (
                                            <span className="ml-2 bg-primary/10 text-primary px-1.5 py-0.5 rounded-full text-xs font-semibold">
                                                {attachments.length}
                                            </span>
                                        )}
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="details">
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="client_id">Client *</Label>
                                                <Select
                                                    value={formData.client_id}
                                                    onValueChange={(value: string) => setFormData({ ...formData, client_id: value })}
                                                    required
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a client" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {clients.map((client) => (
                                                            <SelectItem key={client.id} value={client.id!}>
                                                                {client.name} {client.company && `(${client.company})`}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="quotation_id">Related Quotation (Optional)</Label>
                                                <Select
                                                    value={formData.quotation_id || 'none'}
                                                    onValueChange={(value: string) => setFormData({
                                                        ...formData,
                                                        quotation_id: value === 'none' ? '' : value,
                                                    })}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a quotation" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="none">None</SelectItem>
                                                        {quotations
                                                            .filter(q => q.client_id === formData.client_id)
                                                            .map((quotation) => (
                                                                <SelectItem key={quotation.id} value={quotation.id!}>
                                                                    Quotation {quotation.id?.substring(0, 8)}
                                                                </SelectItem>
                                                            ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="assigned_technicians">Assigned Technicians</Label>
                                                <Input
                                                    id="assigned_technicians"
                                                    placeholder="Enter names separated by commas"
                                                    value={formData.assigned_technicians}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, assigned_technicians: e.target.value })}
                                                />
                                                <p className="text-xs text-muted-foreground">
                                                    Example: John Doe, Jane Smith
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="scheduled_datetime">Scheduled Date & Time Start</Label>
                                                    <Input
                                                        id="scheduled_datetime"
                                                        type="datetime-local"
                                                        value={formData.scheduled_datetime}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, scheduled_datetime: e.target.value })}
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="scheduled_end_datetime">Scheduled Date & Time End</Label>
                                                    <Input
                                                        id="scheduled_end_datetime"
                                                        type="datetime-local"
                                                        value={formData.scheduled_end_datetime}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, scheduled_end_datetime: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="notes">Notes</Label>
                                                <Textarea
                                                    id="notes"
                                                    value={formData.notes}
                                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                                    rows={3}
                                                    placeholder="Job details, requirements, etc."
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button type="submit" disabled={isLoading}>
                                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                {editingJob ? 'Update Job' : 'Create Job'}
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </TabsContent>

                                <TabsContent value="attachments" className="min-h-[300px]">
                                    <div className="space-y-4 py-4">
                                        <div className="flex justify-between items-center bg-muted/40 p-4 rounded-lg border border-border">
                                            <div>
                                                <h3 className="text-sm font-medium">Job Documentation</h3>
                                                <p className="text-xs text-muted-foreground mt-1">Upload photos of work done, serial numbers, etc.</p>
                                            </div>
                                            <div>
                                                <input
                                                    type="file"
                                                    id="file-upload"
                                                    multiple
                                                    accept="image/*,application/pdf"
                                                    className="hidden"
                                                    onChange={handleFileUpload}
                                                    disabled={isUploading || !editingJob}
                                                />
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    onClick={() => document.getElementById('file-upload')?.click()}
                                                    disabled={isUploading || !editingJob}
                                                >
                                                    {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                                                    Upload Files
                                                </Button>
                                            </div>
                                        </div>

                                        {!editingJob ? (
                                            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground bg-muted/20 rounded-lg border-2 border-dashed border-muted">
                                                <FileText className="h-10 w-10 mb-3 opacity-20" />
                                                <p>Please save the job first to add attachments.</p>
                                            </div>
                                        ) : attachments.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground bg-muted/20 rounded-lg border-2 border-dashed border-muted">
                                                <ImageIcon className="h-10 w-10 mb-3 opacity-20" />
                                                <p>No attachments yet.</p>
                                                <p className="text-xs mt-1">Upload photos to document your work.</p>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
                                                {attachments.map((file) => (
                                                    <div key={file.id} className="group relative border border-border rounded-lg p-3 bg-card hover:shadow-md transition-all">
                                                        <div className="aspect-video bg-muted rounded-md mb-3 overflow-hidden flex items-center justify-center relative border border-border/50">
                                                            {file.file_type?.startsWith('image/') ? (
                                                                <StorageImage
                                                                    bucket={PRIVATE_STORAGE_BUCKETS.JOB_ATTACHMENTS}
                                                                    storedValue={file.file_url}
                                                                    alt={file.file_name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <FileText className="h-10 w-10 text-muted-foreground" />
                                                            )}
                                                            <Button
                                                                variant="destructive"
                                                                size="icon"
                                                                className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                                                onClick={() => handleDeleteAttachment(file)}
                                                            >
                                                                <Trash2 className="h-3.5 w-3.5" />
                                                            </Button>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <p className="text-xs font-medium truncate text-foreground" title={file.file_name}>{file.file_name}</p>
                                                            <Input
                                                                placeholder="Description / Serial No."
                                                                className="h-8 text-xs bg-background"
                                                                value={file.description || ''}
                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                    const newDescription = e.target.value;
                                                                    setAttachments(prev => prev.map(a => a.id === file.id ? { ...a, description: newDescription } : a));
                                                                }}
                                                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleUpdateAttachmentDescription(file.id!, e.target.value)}
                                                            />
                                                            <p className="text-[10px] text-muted-foreground text-right">{new Date(file.created_at!).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Card className="border-0 shadow-lg bg-white/50 dark:bg-brand-navy/50 backdrop-blur-sm">
                <CardContent className="p-0">
                    <Suspense fallback={
                        <div className="flex items-center justify-center h-[400px]">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    }>
                        {viewMode === 'list' && (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs uppercase bg-brand-white dark:bg-brand-navy/50 text-muted-foreground border-b border-brand-steel/20 dark:border-brand-navy">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold">Client</th>
                                            <th className="px-6 py-4 font-semibold">Scheduled</th>
                                            <th className="px-6 py-4 font-semibold">Technicians</th>
                                            <th className="px-6 py-4 font-semibold">Status</th>
                                            <th className="px-6 py-4 font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-brand-steel/20 dark:divide-brand-navy">
                                        {filteredJobs.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground italic">
                                                    No jobs found matching your criteria.
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredJobs.map((job) => (
                                                <tr key={job.id} className="hover:bg-brand-white/50 dark:hover:bg-brand-navy/30 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="font-medium text-brand-navy dark:text-brand-steel/20">{job.clients?.name}</div>
                                                        <div className="text-xs text-muted-foreground">{job.clients?.company}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-muted-foreground">
                                                        {job.scheduled_datetime ? (
                                                            <div className="flex items-center gap-2">
                                                                <CalendarIcon className="h-3.5 w-3.5" />
                                                                {new Date(job.scheduled_datetime).toLocaleDateString()} at {new Date(job.scheduled_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </div>
                                                        ) : 'Not scheduled'}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex -space-x-2">
                                                            {job.assigned_technicians?.map((tech, i) => (
                                                                <div key={i} className="h-8 w-8 rounded-full bg-primary/10 border-2 border-white dark:border-brand-navy flex items-center justify-center text-[10px] font-bold text-primary" title={tech}>
                                                                    {tech.split(' ').map(n => n[0]).join('')}
                                                                </div>
                                                            ))}
                                                            {(!job.assigned_technicians || job.assigned_technicians.length === 0) && (
                                                                <span className="text-xs text-muted-foreground italic">None assigned</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Badge className={cn("rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider", getStatusColor(job.status || ''))}>
                                                            {job.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => handleEdit(job)}>
                                                                <Pencil className="h-4 w-4" />
                                                            </Button>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-600" onClick={() => handleDeleteJob(job)}>
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                                {viewMode === 'list' && (
                                    <PaginationBar
                                        page={jobsPage}
                                        totalPages={getTotalPages(jobsCount)}
                                        totalCount={jobsCount}
                                        onPageChange={setJobsPage}
                                    />
                                )}
                            </div>
                        )}
                        {viewMode === 'board' && <JobBoard jobs={jobs} onStatusChange={updateJobStatus} />}
                        {viewMode === 'calendar' && <JobCalendar />}
                    </Suspense>
                </CardContent>
            </Card>
            <ConfirmDialog />
        </div>
    )
}

export default function JobsPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        }>
            <JobsContent />
        </Suspense>
    )
}
