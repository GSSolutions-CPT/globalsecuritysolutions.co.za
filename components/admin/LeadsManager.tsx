'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/utils/supabase/client'
import { Loader2, RefreshCw, Calendar, MapPin } from 'lucide-react'

interface Lead {
    id: string
    name: string        // Updated to match 'clients' table
    email: string       // Updated to match 'clients' table
    phone: string       // Updated to match 'clients' table
    company: string
    address: string     // Updated to match 'clients' table
    created_at: string
}

export function LeadsManager() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(false)
    const [searchQuery] = useState('')

    const fetchLeads = useCallback(async () => {
        setLoading(true)
        // FIX APPLIED: Fetching from 'clients' filtered by 'Website Inquiry'
        const { data } = await supabase
            .from('clients')
            .select('*')
            .ilike('company', 'Website Inquiry%')
            .order('created_at', { ascending: false })

        if (data) setLeads(data as unknown as Lead[])
        setLoading(false)
    }, [])

    useEffect(() => { fetchLeads() }, [fetchLeads])

    const filteredLeads = leads.filter(lead =>
        lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.address?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div><h2 className="text-2xl font-bold text-slate-900">Website Leads</h2><p className="text-slate-500">Inquiries from your contact form.</p></div>
                <div className="flex gap-2"><button onClick={fetchLeads} className="flex items-center space-x-2 bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors font-medium shadow-sm"><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /><span>Refresh</span></button></div>
            </div>
            {loading && leads.length === 0 ? (<div className="text-center py-24"><Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" /></div>) : (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead><tr className="bg-slate-50 border-b border-slate-200"><th className="px-6 py-4 font-bold text-slate-600 text-xs uppercase">Client Details</th><th className="px-6 py-4 font-bold text-slate-600 text-xs uppercase">Location</th><th className="px-6 py-4 font-bold text-slate-600 text-xs uppercase">Date</th></tr></thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-900">{lead.name}</div>
                                            <div className="flex flex-col text-sm text-slate-500 mt-1"><span className="flex items-center text-xs">{lead.email}</span><span className="flex items-center text-xs">{lead.phone}</span></div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600"><div className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-slate-400" />{lead.address || 'N/A'}</div></td>
                                        <td className="px-6 py-4 text-sm text-slate-600"><div className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-slate-400" />{new Date(lead.created_at).toLocaleDateString()}</div></td>
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
