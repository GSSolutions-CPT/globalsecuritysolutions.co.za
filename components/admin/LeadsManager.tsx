'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/utils/supabase/client'
import { Loader2, Image as ImageIcon, Briefcase, RefreshCw, Calendar, MapPin, Search } from 'lucide-react'

// Define Lead Interface
interface Lead {
    id: string
    client_name: string
    email_address: string
    phone_number: string
    service_requested: string
    suburb_location: string
    created_at: string
}

export function LeadsManager() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    // Fetch Leads
    const fetchLeads = useCallback(async () => {
        setLoading(true)
        const { data } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false })

        if (data) setLeads(data)
        setLoading(false)
    }, [])

    // Initial Fetch
    useEffect(() => {
        // eslint-disable-next-line
        fetchLeads()
    }, [fetchLeads])

    // Filter Leads
    const filteredLeads = leads.filter(lead =>
        lead.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email_address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.suburb_location?.toLowerCase().includes(searchQuery.toLowerCase())
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
                                    <th className="px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Service</th>
                                    <th className="px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-900">{lead.client_name}</div>
                                            <div className="flex flex-col text-sm text-slate-500 mt-1 space-y-0.5">
                                                <span className="flex items-center text-xs"><ImageIcon className="w-3 h-3 mr-1.5 opacity-70" /> {lead.email_address}</span>
                                                <span className="flex items-center text-xs"><Briefcase className="w-3 h-3 mr-1.5 opacity-70" /> {lead.phone_number}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100">
                                                {lead.service_requested || 'General Inquiry'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            <div className="flex items-center">
                                                <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                                                {lead.suburb_location || 'Cape Town'}
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
