'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase/client'
import { Loader2 } from 'lucide-react'

// Components
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminStats } from '@/components/admin/AdminStats'
import { BlogManager } from '@/components/admin/BlogManager'
import { ProjectManager } from '@/components/admin/ProjectManager'

type Tab = 'overview' | 'blog' | 'projects'

export default function AdminPage() {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [activeTab, setActiveTab] = useState<Tab>('overview')

    // Login State
    const [loginLoading, setLoginLoading] = useState(false)
    const [loginError, setLoginError] = useState('')
    const [checkingSession, setCheckingSession] = useState(true)

    // Stats State (fetched on mount)
    const [stats, setStats] = useState({ totalLeads: 0, totalPosts: 0, totalProjects: 0 })

    const fetchStats = async () => {
        // Parallel fetching for dashboard overview
        const results = await Promise.all([
            supabase.from('clients').select('*', { count: 'exact', head: true }).ilike('company', 'Website Inquiry%'),
            supabase.from('posts').select('*', { count: 'exact', head: true }),
            supabase.from('projects').select('*', { count: 'exact', head: true })
        ])

        const [leadsData, postsData, projectsData] = results

        setStats({
            totalLeads: leadsData.count || 0,
            totalPosts: postsData.count || 0,
            totalProjects: projectsData.count || 0
        })
    }

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setIsAuthenticated(!!session)
            setCheckingSession(false)
            if (session) fetchStats()
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session)
            if (session) fetchStats()
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoginLoading(true); setLoginError('')

        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            setLoginError(error.message)
            setLoginLoading(false)
        } else {
            setLoginLoading(false)
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
    }

    if (checkingSession) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-white">
                <Loader2 className="w-8 h-8 animate-spin text-brand-electric" />
            </div>
        )
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-steel/20 px-4">
                <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-brand-steel/40">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-brand-navy mb-2">Admin Portal</h1>
                        <p className="text-brand-steel">Global Security Solutions</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-brand-slate mb-1.5">Email Address</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3.5 border border-brand-steel/60 rounded-xl focus:ring-2 focus:ring-brand-electric outline-none transition-all" placeholder="admin@example.com" required />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-brand-slate mb-1.5">Password</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3.5 border border-brand-steel/60 rounded-xl focus:ring-2 focus:ring-brand-electric outline-none transition-all" placeholder="••••••••" required />
                        </div>
                        {loginError && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg font-medium">{loginError}</p>}
                        <button type="submit" disabled={loginLoading} className="w-full bg-brand-electric text-white font-bold py-3.5 rounded-xl hover:bg-brand-electric disabled:opacity-50 transition-all shadow-lg shadow-brand-navy/10">
                            {loginLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-brand-white font-sans">
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

            <main className="ml-64 p-8 lg:p-12">
                <div className="max-w-6xl mx-auto">
                    {/* Header for Dashboard View */}
                    {activeTab === 'overview' && (
                        <div className="mb-8">
                            <h1 className="text-3xl font-extrabold text-brand-navy mb-2">Welcome back, Admin</h1>
                            <p className="text-brand-steel">Here is an overview of your system activity.</p>
                        </div>
                    )}

                    {/* Content Area */}
                    {activeTab === 'overview' && <AdminStats stats={stats} />}
                    {activeTab === 'blog' && <BlogManager />}
                    {activeTab === 'projects' && <ProjectManager />}
                </div>
            </main>
        </div>
    )
}
