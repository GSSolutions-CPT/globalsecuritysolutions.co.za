'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/portal/ui/card'
import { Button } from '@/components/portal/ui/button'
import { Badge } from '@/components/portal/ui/badge'
import { Textarea } from '@/components/portal/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/portal/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/portal/ui/dialog'
import { FileText, MapPin, Loader2, Inbox, ExternalLink, Mail, Phone } from 'lucide-react'
import { supabase } from '@/lib/portal/supabase'
import { toast } from 'sonner'
import { ClientRequest } from '@/types/crm'
import { cn } from '@/lib/portal/utils'
import { PageHeader } from '@/components/portal/PageHeader'
import { REQUEST_STATUS_COLORS } from '@/lib/portal/portal-theme'

export default function ClientRequestsPage() {
    const router = useRouter()
    const [requests, setRequests] = useState<ClientRequest[]>([])
    const [filterStatus, setFilterStatus] = useState<'all' | ClientRequest['status']>('pending')
    const [loading, setLoading] = useState(true)
    const [selectedRequest, setSelectedRequest] = useState<ClientRequest | null>(null)
    const [staffNotes, setStaffNotes] = useState('')
    const [updating, setUpdating] = useState(false)

    const fetchRequests = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('client_requests')
                .select(`
                    *,
                    clients (name, company, email, phone)
                `)
                .order('created_at', { ascending: false })

            if (error) throw error
            setRequests((data as ClientRequest[]) || [])
        } catch (error) {
            console.error('Error fetching client requests:', error)
            toast.error('Failed to load client requests')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchRequests()
    }, [fetchRequests])

    const updateRequestStatus = async (request: ClientRequest, status: ClientRequest['status']) => {
        setUpdating(true)
        try {
            const { error } = await supabase
                .from('client_requests')
                .update({
                    status,
                    staff_notes: staffNotes || request.staff_notes || null,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', request.id)

            if (error) throw error

            await supabase.from('activity_log').insert([{
                type: status === 'completed' ? 'Request Completed' : 'Request Updated',
                description: `${request.type === 'quote' ? 'Quote' : 'Site visit'} request for ${request.clients?.name || 'client'} marked as ${status.replace('_', ' ')}`,
                related_entity_id: request.client_id,
                related_entity_type: 'client',
            }])

            toast.success('Request updated')
            setSelectedRequest(null)
            setStaffNotes('')
            fetchRequests()
        } catch (error) {
            console.error('Error updating request:', error)
            toast.error('Failed to update request')
        } finally {
            setUpdating(false)
        }
    }

    const filteredRequests = requests.filter((request) =>
        filterStatus === 'all' ? true : request.status === filterStatus
    )

    const pendingCount = requests.filter((r) => r.status === 'pending').length

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <PageHeader
                title="Client Requests"
                description="Quote and site visit requests submitted from the client portal"
                badge={pendingCount > 0 ? (
                    <Badge className="bg-amber-500 text-white px-3 py-1">
                        {pendingCount} pending
                    </Badge>
                ) : undefined}
            />

            <div className="flex gap-3">
                <Select value={filterStatus} onValueChange={(value: string) => setFilterStatus(value as typeof filterStatus)}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Filter status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All requests</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_progress">In progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {filteredRequests.length === 0 ? (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                        <Inbox className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No client requests match this filter.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {filteredRequests.map((request) => (
                        <Card key={request.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                    <div className="flex items-start gap-3">
                                        <div className={cn(
                                            'h-10 w-10 rounded-full flex items-center justify-center shrink-0',
                                            request.type === 'quote'
                                                ? 'bg-brand-electric/15 text-brand-electric'
                                                : 'bg-brand-steel/20 text-brand-steel'
                                        )}>
                                            {request.type === 'quote' ? <FileText className="h-5 w-5" /> : <MapPin className="h-5 w-5" />}
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">
                                                {request.type === 'quote' ? 'Quote Request' : 'Site Visit Request'}
                                            </CardTitle>
                                            <CardDescription>
                                                {request.clients?.name}
                                                {request.clients?.company ? ` · ${request.clients.company}` : ''}
                                                {request.created_at ? ` · ${new Date(request.created_at).toLocaleString()}` : ''}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <Badge className={cn('text-white capitalize', REQUEST_STATUS_COLORS[request.status])}>
                                        {request.status.replace('_', ' ')}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-foreground">{request.description}</p>
                                {request.address && (
                                    <p className="text-sm text-muted-foreground">
                                        <span className="font-medium">Address:</span> {request.address}
                                    </p>
                                )}
                                {request.preferred_date && (
                                    <p className="text-sm text-muted-foreground">
                                        <span className="font-medium">Preferred date:</span> {new Date(request.preferred_date).toLocaleDateString()}
                                    </p>
                                )}
                                {(request.clients?.email || request.clients?.phone) && (
                                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                        {request.clients?.email && (
                                            <a href={`mailto:${request.clients.email}`} className="inline-flex items-center gap-1.5 hover:text-primary transition-colors">
                                                <Mail className="h-3.5 w-3.5" />
                                                {request.clients.email}
                                            </a>
                                        )}
                                        {request.clients?.phone && (
                                            <a href={`tel:${request.clients.phone}`} className="inline-flex items-center gap-1.5 hover:text-primary transition-colors">
                                                <Phone className="h-3.5 w-3.5" />
                                                {request.clients.phone}
                                            </a>
                                        )}
                                    </div>
                                )}
                                {request.staff_notes && (
                                    <p className="text-sm text-muted-foreground bg-muted/40 rounded-lg p-3">
                                        <span className="font-medium">Staff notes:</span> {request.staff_notes}
                                    </p>
                                )}
                                <div className="flex flex-wrap gap-2">
                                    <Button variant="outline" size="sm" onClick={() => router.push(`/portal/clients/${request.client_id}`)}>
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        View Client
                                    </Button>
                                    {request.status === 'pending' && (
                                        <Button size="sm" onClick={() => {
                                            setSelectedRequest(request)
                                            setStaffNotes(request.staff_notes || '')
                                        }}>
                                            Respond
                                        </Button>
                                    )}
                                    {request.status === 'in_progress' && (
                                        <Button size="sm" variant="outline" onClick={() => {
                                            setSelectedRequest(request)
                                            setStaffNotes(request.staff_notes || '')
                                        }}>
                                            Update
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <Dialog open={!!selectedRequest} onOpenChange={(open: boolean) => !open && setSelectedRequest(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Respond to Request</DialogTitle>
                        <DialogDescription>
                            Update the status and add internal notes for this client request.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedRequest && (
                        <div className="space-y-4 py-2">
                            <p className="text-sm bg-muted/40 rounded-lg p-3">{selectedRequest.description}</p>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Staff notes</label>
                                <Textarea
                                    value={staffNotes}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setStaffNotes(e.target.value)}
                                    placeholder="Add follow-up notes for your team..."
                                    rows={3}
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter className="flex-col sm:flex-row gap-2">
                        <Button
                            variant="ghost"
                            disabled={updating}
                            onClick={() => setSelectedRequest(null)}
                            className="sm:mr-auto"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="outline"
                            disabled={updating || !selectedRequest}
                            onClick={() => selectedRequest && updateRequestStatus(selectedRequest, 'in_progress')}
                        >
                            Mark In Progress
                        </Button>
                        <Button
                            disabled={updating || !selectedRequest}
                            onClick={() => selectedRequest && updateRequestStatus(selectedRequest, 'completed')}
                        >
                            {updating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                            Mark Completed
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}