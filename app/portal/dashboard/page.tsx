"use client"

import { useState, useEffect, Suspense, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/portal/ui/card'
import { Banknote, TrendingUp, Users, AlertCircle, Activity, FileText, Receipt, Briefcase, Package, FileSignature, Plus, UserPlus, Phone } from 'lucide-react'
import { supabase } from '@/lib/portal/supabase'
import { useCurrency } from '@/lib/portal/use-currency'
import FinancialCharts from '@/components/portal/FinancialCharts'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'
import {
    calculatePercentChange,
    formatMonthLabel,
    formatPercentChange,
    getMonthSortKey,
    getTrendColor,
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
    return { icon: Activity, color: 'text-muted-foreground', path: '/portal/dashboard' }
}

export default function DashboardPage() {
    const router = useRouter()
    const { formatCurrency } = useCurrency()
    const { user } = useAuth()
    const [fetchError, setFetchError] = useState(false)
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
    interface ExpenseBreakdown { name: string; value: number; }

    const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([])
    const [expenseBreakdown, setExpenseBreakdown] = useState<ExpenseBreakdown[]>([])
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-brand-navy to-brand-navy p-6 rounded-2xl text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold tracking-tight mb-1">
                        {(() => {
                            const hour = new Date().getHours()
                            const userName = user?.email ? `, ${user.email.split('@')[0]}` : ''
                            if (hour < 12) return `Good Morning${userName} 👋`
                            if (hour < 18) return `Good Afternoon${userName} 👋`
                            return `Good Evening${userName} 👋`
                        })()}
                    </h2>
                    <p className="text-brand-steel/60">Here&apos;s your daily overview.</p>

                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-2 mt-4 bg-brand-navy/30 p-1 rounded-lg w-fit backdrop-blur-sm border border-white/10">
                        <button
                            onClick={() => setViewMode('cash_flow')}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${viewMode === 'cash_flow' ? 'bg-brand-steel text-white shadow-lg' : 'text-brand-steel hover:text-white hover:bg-white/5'}`}
                        >
                            Cash Flow
                        </button>
                        <button
                            onClick={() => setViewMode('projected')}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${viewMode === 'projected' ? 'bg-brand-electric text-white shadow-lg' : 'text-brand-steel hover:text-white hover:bg-white/5'}`}
                        >
                            Projected
                        </button>
                    </div>
                </div>
                <div className="relative z-10 flex flex-wrap gap-3">
                    <button
                        onClick={() => router.push('/portal/sales/new')}
                        className="flex items-center gap-2 bg-brand-electric hover:bg-brand-electric text-white shadow-lg shadow-brand-electric/20 px-4 py-2 rounded-lg transition-all text-sm font-medium"
                    >
                        <Plus className="h-4 w-4" /> Create New Sale
                    </button>
                    <button
                        onClick={() => router.push('/portal/clients')}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg transition-all border border-white/10 text-sm font-medium"
                    >
                        <UserPlus className="h-4 w-4" /> Add Client
                    </button>
                    <button
                        onClick={() => router.push('/portal/financials?action=new')}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg transition-all border border-white/10 text-sm font-medium"
                    >
                        <Receipt className="h-4 w-4" /> Add Expense
                    </button>
                    <button
                        onClick={() => router.push('/portal/products')}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg transition-all border border-white/10 text-sm font-medium"
                    >
                        <Package className="h-4 w-4" /> Add Product
                    </button>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-electric/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            </div>

            {fetchError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center justify-between text-red-500 text-sm">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5" />
                        <span>Failed to load latest dashboard statistics. Shown data might be cached or incomplete.</span>
                    </div>
                    <button
                        className="px-3 py-1.5 border border-red-500/30 rounded-lg text-xs hover:bg-red-500/10 transition-colors font-medium text-red-500 bg-transparent"
                        onClick={fetchDashboardData}
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* KPIs */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="hover:shadow-lg transition-all duration-300 border-none shadow-sm bg-gradient-to-br from-brand-electric/10 to-white dark:from-brand-navy dark:to-brand-navy dark:border dark:border-border">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-brand-electric/20 dark:bg-brand-navy/30 flex items-center justify-center">
                            <Banknote className="h-4 w-4 text-brand-electric dark:text-brand-electric" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">{formatCurrency(metrics.monthlyRevenue)}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            <span className={`font-medium ${getTrendColor(metrics.revenueTrend)}`}>
                                {formatPercentChange(metrics.revenueTrend)}
                            </span>
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-all duration-300 border-none shadow-sm bg-gradient-to-br from-emerald-50 to-white dark:from-brand-navy dark:to-brand-navy dark:border dark:border-border">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Est. Profit</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                            <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">{formatCurrency(metrics.monthlyProfit)}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            <span className={`font-medium ${getTrendColor(metrics.profitTrend)}`}>
                                {formatPercentChange(metrics.profitTrend)}
                            </span>
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-all duration-300 border-none shadow-sm bg-gradient-to-br from-purple-50 to-white dark:from-brand-navy dark:to-brand-navy dark:border dark:border-border">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">New Clients</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                            <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">+{metrics.newClients}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Joined this month
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-all duration-300 border-none shadow-sm bg-gradient-to-br from-orange-50 to-white dark:from-brand-navy dark:to-brand-navy dark:border dark:border-border">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                            <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">{metrics.overdueInvoices}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Invoices require attention
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                    <Suspense fallback={<div>Loading charts...</div>}>
                        <FinancialCharts monthlyData={monthlyData} expenseBreakdown={expenseBreakdown} showRevenueTrend />
                    </Suspense>
                </div>

                {/* Activity Feed */}
                <Card className="col-span-3 glass-effect tech-border bg-transparent">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            Recent Activity
                            {activities.some(a =>
                                (a.type === 'Quote Request' || a.type === 'Site Visit Request' || a.type === 'Callback Request') &&
                                (Date.now() - new Date(a.timestamp).getTime() < 86400000)
                            ) && (
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                                    </span>
                                )}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground/80">
                            Latest actions across the system
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {activities.map((activity, index) => {
                                const config = getActivityConfig(activity.type)
                                const Icon = config.icon

                                return (
                                    <div
                                        key={activity.id || index}
                                        className="flex items-center p-3 rounded-lg hover:bg-primary/5 border border-transparent hover:border-primary/20 cursor-pointer transition-all duration-200"
                                        onClick={() => router.push(config.path)}
                                    >
                                        <Icon className={`mr-4 h-4 w-4 ${config.color}`} />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none text-foreground">
                                                {activity.type}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {activity.description}
                                            </p>
                                            <p className="text-xs text-muted-foreground/60">
                                                {new Date(activity.timestamp).toLocaleDateString()} {new Date(activity.timestamp).toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                            {activities.length === 0 && (
                                <p className="text-sm text-muted-foreground">No recent activity.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
