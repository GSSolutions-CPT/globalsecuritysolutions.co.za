'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/portal/ui/card'
import { Button } from '@/components/portal/ui/button'
import { Input } from '@/components/portal/ui/input'
import { Search, Building2, Users, Mail, Phone, MapPin, Pencil, Trash2, ExternalLink, Plus } from 'lucide-react'
import { supabase } from '@/lib/portal/supabase'
import { shareLink } from '@/lib/portal/share-utils'
import { toast } from 'sonner'
import { ClientDialog } from '@/components/portal/ClientDialog'
import { Client } from '@/types/crm'
import { useRouter } from 'next/navigation'
import { getPageRange, getTotalPages } from '@/lib/portal/pagination'
import { PaginationBar } from '@/components/portal/PaginationBar'
import { PageHeader } from '@/components/portal/PageHeader'
import { StatCard } from '@/components/portal/StatCard'
import { useConfirm } from '@/components/portal/ui/alert-dialog'

export default function ClientsPage() {
    const router = useRouter()
    const { confirm, ConfirmDialog } = useConfirm()
    const [clients, setClients] = useState<Client[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingClient, setEditingClient] = useState<Client | null>(null)
    const [clientsPage, setClientsPage] = useState(0)
    const [clientsCount, setClientsCount] = useState(0)
    const [clientStats, setClientStats] = useState<Pick<Client, 'created_at' | 'metadata'>[]>([])

    // Calculate Stats
    const activeStats = clientStats.filter(c => {
        const metadata = c.metadata as Record<string, unknown> | undefined
        return metadata?.status !== 'archived'
    })
    const totalClients = activeStats.length
    const newThisMonth = activeStats.filter(c => {
        if (!c.created_at) return false
        const clientDate = new Date(c.created_at)
        const now = new Date()
        return clientDate.getMonth() === now.getMonth() && clientDate.getFullYear() === now.getFullYear()
    }).length

    const fetchClientStats = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('clients')
                .select('created_at, metadata')
                .or('metadata->>status.is.null,metadata->>status.neq.archived')
            if (error) throw error
            setClientStats((data as Pick<Client, 'created_at' | 'metadata'>[]) || [])
        } catch (error) {
            console.error('Error fetching client stats:', error)
        }
    }, [])

    const fetchClients = useCallback(async (page = clientsPage) => {
        try {
            const { from, to } = getPageRange(page)
            const { data, error, count } = await supabase
                .from('clients')
                .select('*', { count: 'exact' })
                .or('metadata->>status.is.null,metadata->>status.neq.archived')
                .order('created_at', { ascending: false })
                .range(from, to)

            if (error) throw error

            setClients((data || []) as Client[])
            setClientsCount(count || 0)
        } catch (error) {
            console.error('Error fetching clients:', error)
        }
    }, [clientsPage])

    useEffect(() => {
        fetchClientStats()
    }, [fetchClientStats])

    useEffect(() => {
        fetchClients(clientsPage)
    }, [clientsPage, fetchClients])

    const handleEdit = (client: Client) => {
        setEditingClient(client)
        setIsDialogOpen(true)
    }

    const handleDelete = async (id: string) => {
        const ok = await confirm({
            title: 'Delete Client',
            description: 'This will permanently delete this client and all related CRM data. This action cannot be undone.',
            confirmLabel: 'Delete',
            variant: 'destructive'
        })
        if (!ok) return

        const toastId = toast.loading('Deleting client...')

        try {
            const res = await fetch(`/api/portal/client/delete?clientId=${encodeURIComponent(id)}`, {
                method: 'DELETE',
            })

            const payload = await res.json()
            if (!res.ok) {
                throw new Error(payload?.error || 'Delete failed')
            }

            toast.success('Client deleted', { id: toastId })
            fetchClients(clientsPage)
            fetchClientStats()
        } catch (error) {
            console.error('Error deleting client:', error)
            toast.error(error instanceof Error ? error.message : 'Error deleting client.', { id: toastId })
        }
    }

    const filteredClients = clients.filter(client => {
        const term = searchTerm.toLowerCase()
        return (
            (client.name || '').toLowerCase().includes(term) ||
            (client.company || '').toLowerCase().includes(term) ||
            (client.email || '').toLowerCase().includes(term)
        )
    })

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <PageHeader
                title="Clients"
                description="Manage customer profiles, contact details, and portal access"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatCard label="Total Clients" value={totalClients} hint="Active database" variant="primary" icon={Users} />
                <StatCard label="New This Month" value={`+${newThisMonth}`} hint="Growing your network" variant="success" icon={Building2} />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search clients..."
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <ClientDialog
                    open={isDialogOpen}
                    onOpenChange={(open: boolean) => {
                        setIsDialogOpen(open)
                        if (!open) setEditingClient(null)
                    }}
                    clientToEdit={editingClient}
                    onSuccess={() => {
                        fetchClients(clientsPage)
                        fetchClientStats()
                        setIsDialogOpen(false)
                        setEditingClient(null)
                    }}
                    trigger={
                        <Button className="ssh-button-gradient shadow-md hover:shadow-lg transition-all">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Client
                        </Button>
                    }
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClients.map((client) => (
                    <Card key={client.id} className="group hover:shadow-xl transition-all duration-300 border-none shadow-sm bg-gradient-to-br from-white to-brand-white dark:from-brand-navy dark:to-brand-navy dark:border dark:border-border overflow-hidden relative cursor-pointer" onClick={() => router.push(`/portal/clients/${client.id}`)}>
                        <div className="absolute top-0 left-0 w-1 h-full bg-brand-electric"></div>
                        <CardHeader className="pb-3 pl-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg text-foreground">{client.name}</CardTitle>
                                    {client.company && (
                                        <CardDescription className="flex items-center gap-2 font-medium text-brand-steel mt-1">
                                            <Building2 className="h-3.5 w-3.5" />
                                            {client.company}
                                        </CardDescription>
                                    )}
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-brand-electric hover:bg-brand-electric/10" onClick={(e: React.MouseEvent) => {
                                        e.stopPropagation()
                                        handleEdit(client)
                                    }}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-50" onClick={(e: React.MouseEvent) => {
                                        e.stopPropagation()
                                        handleDelete(client.id)
                                    }}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pl-6">
                            <div className="space-y-3 text-sm">
                                {client.email && (
                                    <div className="flex items-center gap-2 text-muted-foreground group-hover:text-brand-slate dark:group-hover:text-brand-steel transition-colors">
                                        <div className="bg-brand-steel/20 dark:bg-brand-navy p-1.5 rounded-full">
                                            <Mail className="h-3.5 w-3.5 text-brand-steel" />
                                        </div>
                                        <span className="truncate">{client.email}</span>
                                    </div>
                                )}
                                {client.phone && (
                                    <div className="flex items-center gap-2 text-muted-foreground group-hover:text-brand-slate dark:group-hover:text-brand-steel transition-colors">
                                        <div className="bg-brand-steel/20 dark:bg-brand-navy p-1.5 rounded-full">
                                            <Phone className="h-3.5 w-3.5 text-brand-steel" />
                                        </div>
                                        <span>{client.phone}</span>
                                    </div>
                                )}
                                {client.address && (
                                    <div className="flex items-center gap-2 text-muted-foreground group-hover:text-brand-slate dark:group-hover:text-brand-steel transition-colors">
                                        <div className="bg-brand-steel/20 dark:bg-brand-navy p-1.5 rounded-full">
                                            <MapPin className="h-3.5 w-3.5 text-brand-steel" />
                                        </div>
                                        <span className="truncate">{client.address}</span>
                                    </div>
                                )}

                                <div className="pt-4 mt-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="w-full border-brand-steel/40 dark:border-brand-navy hover:bg-brand-white dark:hover:bg-brand-navy group-hover:border-brand-electric/40 dark:group-hover:border-brand-navy/50 transition-colors"
                                        onClick={(e: React.MouseEvent) => {
                                            e.stopPropagation()
                                            const portalLink = `${window.location.origin}/portal?client=${client.id}`
                                            shareLink('GSS Client Portal', 'Access your client portal here:', portalLink)
                                        }}
                                    >
                                        <ExternalLink className="mr-2 h-4 w-4 text-brand-electric" />
                                        Share Portal Link
                                    </Button>
                                </div>
                                <div className="text-[10px] text-center text-muted-foreground/50 pt-1">
                                    Added {client.created_at ? new Date(client.created_at).toLocaleDateString() : 'N/A'}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <PaginationBar
                page={clientsPage}
                totalPages={getTotalPages(clientsCount)}
                totalCount={clientsCount}
                onPageChange={setClientsPage}
            />
            {filteredClients.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground bg-brand-white dark:bg-brand-navy/50 rounded-2xl border-2 border-dashed border-brand-steel/40 dark:border-brand-navy">
                    <div className="bg-brand-electric/20 dark:bg-brand-navy/30 p-4 rounded-full mb-4">
                        <Users className="h-8 w-8 text-brand-electric" />
                    </div>
                    <h3 className="text-lg font-medium text-brand-navy dark:text-brand-steel/40">
                        {searchTerm ? 'No matching clients' : 'No clients yet'}
                    </h3>
                    <p className="mb-6 max-w-sm text-center">
                        {searchTerm ? 'Try adjusting your search terms.' : 'Add your first client to start creating quotes and invoices.'}
                    </p>
                    {!searchTerm && (
                        <Button onClick={() => setIsDialogOpen(true)} className="ssh-button-gradient">
                            Add First Client
                        </Button>
                    )}
                </div>
            )}
            <ConfirmDialog />
        </div>
    )
}
