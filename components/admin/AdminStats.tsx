'use client'

import { Users, FileText, Briefcase, TrendingUp } from 'lucide-react'

interface AdminStatsProps {
    stats: {
        totalLeads: number
        totalPosts: number
        totalProjects: number
    }
}

export function AdminStats({ stats }: AdminStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                            <Users className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" /> Active
                        </span>
                    </div>
                    <div className="text-3xl font-extrabold text-slate-900 mb-1">{stats.totalLeads}</div>
                    <div className="text-sm text-slate-500 font-medium">Total Leads Captured</div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
                            <FileText className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="text-3xl font-extrabold text-slate-900 mb-1">{stats.totalPosts}</div>
                    <div className="text-sm text-slate-500 font-medium">Published Blog Posts</div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-100 rounded-xl text-green-600">
                            <Briefcase className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="text-3xl font-extrabold text-slate-900 mb-1">{stats.totalProjects}</div>
                    <div className="text-sm text-slate-500 font-medium">Projects in Gallery</div>
                </div>
            </div>
        </div>
    )
}
