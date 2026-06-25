"use client"

import { useState, useEffect, Suspense, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { StatCard } from '@/components/portal/StatCard'
import { Banknote, TrendingUp, Users, AlertCircle, Activity, FileText, Receipt, Briefcase, Package, FileSignature, Plus, UserPlus, Phone } from 'lucide-react'
import { supabase } from '@/lib/portal/supabase'
import { useCurrency } from '@/lib/portal/use-currency'
import FinancialCharts from '@/components/portal/FinancialCharts'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'
import {
    formatMonthLabel,
    formatPercentChange,
    getMonthSortKey,
    sortMonthlyChartData,
} from '@/lib/portal/chart-utils'

const getActivityConfig = (type: string) => {
    const t = (type || '').toLowerCase()
    if (t.includes('quote request')) return { icon: FileText, color: 'text-brand-electric', path: '/portal/requests' }
    if (t.includes('site visit')) return { icon: Briefcase, color: 'text-amber-500', path: '/portal/requests' }
    if (t.includes('callback request')) return { icon: Phone, color: 'text-brand-steel', path: '/portal/clients' }
    if (t.includes('request')) return { icon: FileText, color: 'text-brand-electric', path: '/portal/requests' }
    if (t.includes('quotation') || t.includes('quote')) return { icon: FileText, color: 'text-brand-electric', path: '/portal/sales' }
    if (t.includes('invoice')) return { icon: Receipt, color: 'text-brand-steel', path: '/portal/sales' }
    if (t.includes('payment')) return { icon: Banknote, color: 'text-brand-electric', path: '/portal/sales' }
    if (t.includes('job')) return { icon: Briefcase, color: 'text-brand-steel', path: '/portal/jobs' }
    if (t.includes('client')) return { icon: Users, color: 'text-brand-electric', path: '/portal/clients' }
    if (t.includes('purchase order') || t.includes('order')) return { icon: Package, color: 'text-brand-electric', path: '/portal/sales' }
    if (t.includes('contract')) return { icon: FileSignature, color: 'text-brand-steel', path: '/portal/contracts' }
    return { icon: Activity, color: 'text-brand-slate', path: '/portal/dashboard' }
}

export default function DashboardPage() {
    const router = useRouter()
    const { formatCurrency } = useCurrency()
    const { user } = useAuth()
    const [fetchError, setFetchError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [metrics, setMetrics] = useState({
        monthlyRevenue: 0,
        monthlyProfit: 0,
        newClients: 0,
        overdueInvoices: 0,
        revenueTrend: null as number | null,
        profitTrend: null as number | null,
    })
    interface Client { id: string; created_at: string; metadata?: Record<string, unknown>; name?: string; company?: string; email?: string; }
    interface Invoice { id: string; date_created: string; status: string; total_amount: string; profit_estimate: string; }
    interface Expense { id: string; date: string; amount: string; type?: string; }
    interface ActivityLog { id: string; type: string; description: string; timestamp: string; }
    interface MonthlyData { month: string; sortKey: string; revenue: number; profit: number; expenses: number; }

    const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([])
    const [expenseBreakdown, setExpenseBreakdown] = useState<{ name: string; value: number }[]>([])
    const [activities, setActivities] = useState<ActivityLog[]>([])
    const [viewMode, setViewMode] = useState<'cash_flow' | 'projected'>('cash_flow')
    const [rawInvoices, setRawInvoices] = useState<Invoice[]>([])
    const [rawExpenses, setRawExpenses] = useState<Expense[]>([])

    const fetchDashboardData = useCallback(async () => {
        setIsLoading(true)
        try {
            setFetchError(false)
            const now = new Date()
            const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

            // Limit fetches to the last 6 months of data for dashboard charts and metrics
            const sixMonthsAgoDate = new Date(now.getFullYear(), now.getMonth() - 5, 1)
            const sixMonthsAgoISO = sixMonthsAgoDate.toISOString()
            const sixMonthsAgoString = sixMonthsAgoISO.split('T')[0]

            // Fetch Data
            const [clientsRes, invoicesRes, expensesRes, activityLogRes] = await Promise.all([
                supabase.from('clients').select('id, created_at').gte('created_at', firstDayOfMonth),
                supabase.from('invoices').select('id, date_created, status, total_amount, profit_estimate').gte('date_created', sixMonthsAgoString).order('date_created', { ascending: false }).limit(200),
                supabase.from('expenses').select('id, date, amount, type').gte('date', sixMonthsAgoString).order('date', { ascending: false }).limit(200),
                supabase.from('activity_log').select('*').order('timestamp', { ascending: false }).limit(10),
            ])

            if (clientsRes.error) throw clientsRes.error
            if (invoicesRes.error) throw invoicesRes.error
            if (expensesRes.error) throw expensesRes.error
            if (activityLogRes.error) throw activityLogRes.error

            const clients = clientsRes.data as Client[]
            const invoices = invoicesRes.data as Invoice[]
            const expenses = expensesRes.data as Expense[]
            const activityLog = activityLogRes.data as ActivityLog[]

            // Store Raw Data
            setRawInvoices(invoices || [])
            setRawExpenses(expenses || [])
            setActivities(activityLog || [])

            // Calculate Non-Financial Metrics
            const newClients = clients?.length || 0
            const overdueInvoices = invoices?.filter((inv: Invoice) => inv.status === 'Overdue').length || 0

            setMetrics(prev => ({ ...prev, newClients, overdueInvoices }))

        } catch (error) {
            console.error('Error fetching dashboard data:', error)
            setFetchError(true)
            toast.error('Failed to load dashboard data. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }, [])

    // Recalculate Financials when ViewMode or Data changes
    useEffect(() => {
        const recalculateFinancials = () => {
            const now = new Date()
            const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

            // Define Status Filter based on View Mode
            // Cash Flow = Paid only
            // Projected = Paid + Sent + Overdue
            const targetStatuses = viewMode === 'cash_flow'
                ? ['Paid']
                : ['Paid', 'Sent', 'Overdue']

            // 1. Calculate Monthly Metrics
            const currentMonthInvoices = rawInvoices.filter(inv =>
                new Date(inv.date_created) >= new Date(firstDayOfMonth) &&
                inv.status !== 'Draft'
            )

            const monthlyRevenue = currentMonthInvoices
                .filter(inv => targetStatuses.includes(inv.status))
                .reduce((sum, inv) => sum + (parseFloat(inv.total_amount) || 0), 0)

            const monthlyProfit = currentMonthInvoices
                .filter(inv => targetStatuses.includes(inv.status))
                .reduce((sum, inv) => sum + (parseFloat(inv.profit_estimate) || 0), 0)

            const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
            const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999)

            const previousMonthInvoices = rawInvoices.filter(inv => {
                const invoiceDate = new Date(inv.date_created)
                return invoiceDate >= previousMonthStart &&
                    invoiceDate <= previousMonthEnd &&
                    inv.status !== 'Draft'
            })

            const previousMonthRevenue = previousMonthInvoices
                .filter(inv => targetStatuses.includes(inv.status))
                .reduce((sum, inv) => sum + (parseFloat(inv.total_amount) || 0), 0)

            const previousMonthProfit = previousMonthInvoices
                .filter(inv => targetStatuses.includes(inv.status))
                .reduce((sum, inv) => sum + (parseFloat(inv.profit_estimate) || 0), 0)

            // Calculate percent change
            const calculatePercentChange = (current: number, previous: number) => {
                if (previous === 0) return current > 0 ? 100 : 0
                return ((current - previous) / previous) * 100
            }

            setMetrics(prev => ({
                ...prev,
                monthlyRevenue,
                monthlyProfit,
                revenueTrend: calculatePercentChange(monthlyRevenue, previousMonthRevenue),
                profitTrend: calculatePercentChange(monthlyProfit, previousMonthProfit),
            }))

            // 2. Prepare Chart Data
            const data: Record<string, MonthlyData> = {}
            const expenseTypes: Record<string, number> = { job: 0, general: 0 }

            // Process Invoices for Charts
            rawInvoices.forEach(inv => {
                if (targetStatuses.includes(inv.status)) {
                    const sortKey = getMonthSortKey(inv.date_created)
                    if (!data[sortKey]) {
                        data[sortKey] = {
                            month: formatMonthLabel(inv.date_created),
                            sortKey,
                            revenue: 0,
                            profit: 0,
                            expenses: 0,
                        }
                    }
                    data[sortKey].revenue += parseFloat(inv.total_amount) || 0
                    data[sortKey].profit += parseFloat(inv.profit_estimate) || 0
                }
            })

            // Process Expenses (Independent of view mode, expenses are expenses)
            rawExpenses.forEach(exp => {
                const sortKey = getMonthSortKey(exp.date)
                if (!data[sortKey]) {
                    data[sortKey] = {
                        month: formatMonthLabel(exp.date),
                        sortKey,
                        revenue: 0,
                        profit: 0,
                        expenses: 0,
                    }
                }
                data[sortKey].expenses += parseFloat(exp.amount) || 0

                if (exp.type) {
                    expenseTypes[exp.type] = (expenseTypes[exp.type] || 0) + (parseFloat(exp.amount) || 0)
                }
            })

            const sortedData = sortMonthlyChartData(Object.values(data)).slice(-6)

            setMonthlyData(sortedData)
            setExpenseBreakdown([
                { name: 'Job Expenses', value: expenseTypes.job || 0 },
                { name: 'General Overhead', value: expenseTypes.general || 0 }
            ])
        }

        recalculateFinancials()
    }, [rawInvoices, rawExpenses, viewMode])

    // Fetch initial data on mount + real-time subscription
    useEffect(() => {
        const initData = async () => { await fetchDashboardData() }
        initData()

        const channel = supabase
            .channel('dashboard_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'invoices' }, () => {
                fetchDashboardData()
            })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'expenses' }, () => {
                fetchDashboardData()
            })
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'activity_log' }, () => {
                fetchDashboardData()
            })
            .subscribe()

        return () => { supabase.removeChannel(channel) }
    }, [fetchDashboardData])

    return (
        <div className="space-y-6">
            
            {/* Welcome Banner & Quick Actions */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white border border-slate-200 p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-sm animate-fade-in-up">
                
                {/* Decorative soft blobs */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-sky-100/80 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100/60 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                <div className="relative z-10 space-y-3">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
                            {(() => {
                                const hour = new Date().getHours()
                                const rawName = user?.email?.split('@')[0] || ''
                                const userName = rawName ? `, ${rawName.charAt(0).toUpperCase() + rawName.slice(1)}` : ''
                                if (hour < 12) return `Good Morning${userName} 👋`
                                if (hour < 18) return `Good Afternoon${userName} 👋`
                                return `Good Evening${userName} 👋`
                            })()}
                        </h2>
                        <p className="text-sm text-slate-500 font-medium mt-1">Here&apos;s the live overview of your security systems and operations.</p>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl w-fit border border-slate-200">
                        <button
                            onClick={() => setViewMode('cash_flow')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${viewMode === 'cash_flow' ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20' : 'text-slate-500 hover:text-slate-900 hover:bg-white'}`}
                        >
                            Cash Flow
                        </button>
                        <button
                            onClick={() => setViewMode('projected')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${viewMode === 'projected' ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20' : 'text-slate-500 hover:text-slate-900 hover:bg-white'}`}
                        >
                            Projected
                        </button>
                    </div>
                </div>

                <div className="relative z-10 flex flex-wrap gap-2.5 w-full lg:w-auto">
                    <button
                        onClick={() => router.push('/portal/sales/new')}
                        className="flex-1 lg:flex-initial flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-500/20 px-4 h-10 rounded-xl transition-all duration-200 text-xs font-bold active:scale-95 btn-tactile cursor-pointer"
                    >
                        <Plus className="h-4 w-4" /> Create Sale
                    </button>
                    <button
                        onClick={() => router.push('/portal/clients')}
                        className="flex-1 lg:flex-initial flex items-center justify-center gap-2 bg-white hover:bg-slate-50 hover:border-sky-300 border border-slate-200 text-slate-700 px-4 h-10 rounded-xl transition-all duration-200 text-xs font-bold active:scale-95 btn-tactile cursor-pointer"
                    >
                        <UserPlus className="h-4 w-4 text-sky-500" /> Add Client
                    </button>
                    <button
                        onClick={() => router.push('/portal/financials?action=new')}
                        className="flex-1 lg:flex-initial flex items-center justify-center gap-2 bg-white hover:bg-slate-50 hover:border-sky-300 border border-slate-200 text-slate-700 px-4 h-10 rounded-xl transition-all duration-200 text-xs font-bold active:scale-95 btn-tactile cursor-pointer"
                    >
                        <Receipt className="h-4 w-4 text-sky-500" /> Add Expense
                    </button>
                    <button
                        onClick={() => router.push('/portal/products')}
                        className="flex-1 lg:flex-initial flex items-center justify-center gap-2 bg-white hover:bg-slate-50 hover:border-sky-300 border border-slate-200 text-slate-700 px-4 h-10 rounded-xl transition-all duration-200 text-xs font-bold active:scale-95 btn-tactile cursor-pointer"
                    >
                        <Package className="h-4 w-4 text-sky-500" /> Add Product
                    </button>
                </div>
            </div>

            {fetchError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center justify-between text-red-400 text-xs font-medium">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <span>Failed to load latest dashboard statistics. Shown data might be cached or incomplete.</span>
                    </div>
                    <button
                        className="px-3.5 py-1.5 border border-red-500/30 rounded-lg text-xs hover:bg-red-500/10 transition-colors font-bold text-red-400 bg-transparent cursor-pointer"
                        onClick={fetchDashboardData}
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* KPIs */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    label="Monthly Revenue"
                    value={formatCurrency(metrics.monthlyRevenue)}
                    hint={formatPercentChange(metrics.revenueTrend)}
                    variant="primary"
                    icon={Banknote}
                />
                <StatCard
                    label="Est. Profit"
                    value={formatCurrency(metrics.monthlyProfit)}
                    hint={formatPercentChange(metrics.profitTrend)}
                    variant="success"
                    icon={TrendingUp}
                />
                <StatCard
                    label="New Clients"
                    value={`+${metrics.newClients}`}
                    hint="Joined this month"
                    variant="accent"
                    icon={Users}
                />
                <StatCard
                    label="Overdue Invoices"
                    value={metrics.overdueInvoices}
                    hint="Invoices require attention"
                    variant="warning"
                    icon={AlertCircle}
                />
            </div>

            {/* Charts & Activity */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                    <Suspense fallback={<div className="h-72 flex items-center justify-center text-xs text-slate-400 animate-pulse">Loading charts...</div>}>
                        <FinancialCharts monthlyData={monthlyData} expenseBreakdown={expenseBreakdown} showRevenueTrend />
                    </Suspense>
                </div>

                {/* Activity Feed */}
                <div className="col-span-3 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                        <div>
                            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                                Recent Activity
                                {activities.some(a =>
                                    (a.type === 'Quote Request' || a.type === 'Site Visit Request' || a.type === 'Callback Request') &&
                                    (Date.now() - new Date(a.timestamp).getTime() < 86400000)
                                ) && (
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                        </span>
                                    )}
                            </h3>
                            <p className="text-xs text-slate-500 mt-0.5">Latest actions across the system</p>
                        </div>
                    </div>
                    
                    <div className="flex-1 space-y-3 overflow-y-auto max-h-[360px] pr-1 scrollbar-thin">
                        {activities.map((activity, index) => {
                            const config = getActivityConfig(activity.type)
                            const Icon = config.icon

                            return (
                                <div
                                    key={activity.id || index}
                                    className="flex items-start p-3 rounded-xl border border-slate-100 hover:border-sky-200 hover:bg-sky-50/50 cursor-pointer transition-all duration-200 gap-3.5 group"
                                    onClick={() => router.push(config.path)}
                                >
                                    <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-sky-100 group-hover:text-sky-600 transition-colors mt-0.5">
                                        <Icon className={`h-4.5 w-4.5 ${config.color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-slate-800 truncate group-hover:text-sky-600 transition-colors">
                                            {activity.type}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-0.5 font-medium leading-relaxed">
                                            {activity.description}
                                        </p>
                                        <p className="text-[10px] text-slate-400 mt-1 font-mono">
                                            {new Date(activity.timestamp).toLocaleDateString()} at {new Date(activity.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                        {activities.length === 0 && (
                            <div className="h-48 flex items-center justify-center">
                                <p className="text-xs text-slate-500 font-medium">No recent system activity.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
