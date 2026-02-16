'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/utils/supabase/client'
import { Loader2, Briefcase, RefreshCw, Calendar, MapPin, Search, Mail, Phone } from 'lucide-react'

// FIXED: Interface now matches the 'clients' table columns in Supabase.
// The old interface referenced non-existent columns from a 'leads' table.
interface WebsiteLead {
    id: string
    name: string
    email: string
    phone: string
    company: string
    address: string
    created_at: string
}

export function LeadsManager() {
    const [leads, setLeads] = useState<WebsiteLead[]>([])
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    // FIXED: Fetch from 'clients' table, filtered by company = 'Website Inquiry'.
    // This ensures only website contact form submissions appear here,
    // not the entire CRM client base.
    const fetchLeads = useCallback(async () => {
        setLoading(true)
        const { data } = await supabase
            .from('clients')
            .select('id, name, email, phone, company, address, created_at')
            .eq('company', 'Website Inquiry')
            .order('created_at', { ascending: false })

        if (data) setLeads(data)
        setLoading(false)
    }, [])

    // Initial Fetch
    useEffect(() => {
        fetchLeads()
    }, [fetchLeads])

    // Filter Leads by search query
    const filteredLeads = leads.filter(lead =>
        lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.address?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Leads Management</h2>
                    <p className="text-slate-500">Track and manage your incoming quote requests.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={fetchLeads}
                        className="flex items-center space-x-2 bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors font-medium shadow-sm"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                    </button>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search leads..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                        />
                    </div>
                </div>
            </div>

            {loading && leads.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-slate-200">
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
                                    <th className="px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-900">{lead.name}</div>
                                            <div className="text-xs text-slate-500 mt-1">
                                                <span className="inline-block px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 font-medium">
                                                    {lead.company || 'Website Inquiry'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col text-sm text-slate-600 space-y-1">
                                                <span className="flex items-center text-xs">
                                                    <Mail className="w-3 h-3 mr-1.5 opacity-70" /> {lead.email}
                                                </span>
                                                <span className="flex items-center text-xs">
                                                    <Phone className="w-3 h-3 mr-1.5 opacity-70" /> {lead.phone || '—'}
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
