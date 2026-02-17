'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/utils/supabase/client'
import { Loader2, RefreshCw, Calendar, MapPin } from 'lucide-react'

interface Lead {
    id: string
    name: string
    email: string
    phone: string
    company: string
    address: string
    created_at: string
}

export function LeadsManager() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(false)

    const fetchLeads = useCallback(async () => {
        setLoading(true)
        const { data } = await supabase
            .from('clients')
            .select('*')
            .ilike('company', 'Website Inquiry%')
            .order('created_at', { ascending: false })

        if (data) setLeads(data as unknown as Lead[])
        setLoading(false)
    }, [])

    useEffect(() => {
        fetchLeads()
    }, [fetchLeads])

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Website Leads</h2>
                    <p className="text-slate-500">Inquiries from your contact form.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={fetchLeads}
                        className="flex items-center space-x-2 bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors font-medium shadow-sm"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                    </button>
                </div>
            </div>

            {loading && leads.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-2xl border border-slate-200">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-2" />
                    <p className="text-slate-500">Loading leads...</p>
                </div>
            ) : leads.length === 0 ? (
                <div className="text-center py-24 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-500">
                    No leads found yet.
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Client Details</th>
                                    <th className="px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-900">{lead.name}</div>
                                            <div className="text-xs text-slate-500 mt-1">
                                                <span className="block">{lead.email}</span>
                                                <span className="block">{lead.phone}</span>
                                                <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 font-medium text-[10px]">
                                                    {lead.company}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            <div className="flex items-center">
                                                <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                                                {lead.address || 'Not specified'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                                                {new Date(lead.created_at).toLocaleDateString()}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
