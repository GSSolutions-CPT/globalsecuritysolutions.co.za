"use client"

import { useMemo, useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/portal/ui/button'
import {
    LayoutDashboard,
    Users,
    Banknote,
    Briefcase,
    PieChart,
    Settings,
    LogOut,
    Menu,
    X,
    Package,
    Inbox,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    User,
} from 'lucide-react'
import { useSettings } from '@/lib/portal/use-settings'
import { staffRoleCanAccess } from '@/lib/portal/permissions'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    const { signOut, user, portalAccess } = useAuth()
    const { settings } = useSettings()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isHydrated, setIsHydrated] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    // Hydration safe read of collapse state
    useEffect(() => {
        const stored = localStorage.getItem('gss_sidebar_collapsed')
        if (stored === 'true') {
            setIsCollapsed(true)
        }
        setIsHydrated(true)
    }, [])

    const toggleCollapse = () => {
        const nextState = !isCollapsed
        setIsCollapsed(nextState)
        localStorage.setItem('gss_sidebar_collapsed', String(nextState))
    }

    const isClientUser = portalAccess?.userType === 'client'
    const staffRole = portalAccess?.staffRole ?? null

    const navItems = useMemo(() => {
        const items = [
            { name: 'Dashboard', path: '/portal/dashboard', icon: LayoutDashboard },
            { name: 'Sales', path: '/portal/sales', icon: Banknote },
            { name: 'Clients', path: '/portal/clients', icon: Users },
            { name: 'Requests', path: '/portal/requests', icon: Inbox },
            { name: 'Products', path: '/portal/products', icon: Package },
            { name: 'Jobs', path: '/portal/jobs', icon: Briefcase },
            { name: 'Financials', path: '/portal/financials', icon: PieChart },
            { name: 'Settings', path: '/portal/settings', icon: Settings },
        ]

        if (!staffRole) return []

        return items.filter((item) => staffRoleCanAccess(item.path, staffRole))
    }, [staffRole])

    const handleSignOut = async () => {
        try {
            await signOut()
            router.push('/portal/login')
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    const isAuthPage =
        pathname === '/portal/login' ||
        pathname === '/portal/register' ||
        pathname === '/portal/register-client' ||
        pathname === '/portal/employee-setup' ||
        pathname.startsWith('/portal/profile-setup/') ||
        pathname === '/portal/auth/callback' ||
        pathname === '/portal/reset-password'

    const isClientPortalPage = pathname.startsWith('/portal/client-portal')

    if (isAuthPage || isClientPortalPage) {
        return (
            <div className="portal-theme-light min-h-screen bg-slate-50 text-foreground flex flex-col font-sans">
                <main className="flex-1 animate-fade-in text-foreground relative z-10">
                    {children}
                </main>
            </div>
        )
    }

    const currentActiveItem = navItems.find(item => pathname === item.path || pathname.startsWith(`${item.path}/`))

    return (
        <div className="portal-theme-light min-h-screen bg-slate-50 text-foreground flex font-sans">
            
            {/* Subtle dot grid background */}
            <div className="fixed inset-0 pointer-events-none z-0" style={{backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.4}} />

            {/* Sidebar - Desktop */}
            <aside 
                className={`hidden md:flex flex-col fixed top-0 bottom-0 left-0 z-40 bg-white border-r border-slate-200 shadow-sm sidebar-transition overflow-x-hidden ${
                    !isHydrated || !isCollapsed ? 'w-64' : 'w-20'
                }`}
            >
                {/* Brand Logo Header */}
                <div className="h-16 flex items-center px-5 border-b border-slate-100 gap-3">
                    <div className="flex-shrink-0 relative w-8 h-8 flex items-center justify-center">
                        <Image 
                            src={settings?.logoUrl || "/logo.png"} 
                            alt="GSS Hub Logo" 
                            width={32} 
                            height={32} 
                            className="object-contain" 
                        />
                    </div>
                    {(!isHydrated || !isCollapsed) && (
                        <span className="font-extrabold text-sm tracking-widest text-slate-800 truncate uppercase">
                            GSS HUB
                        </span>
                    )}
                </div>

                {/* Main Navigation Links */}
                <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto scrollbar-thin">
                    {!isClientUser && navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`)
                        const showLabel = !isHydrated || !isCollapsed

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`group flex items-center relative gap-3.5 px-3.5 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                    isActive
                                        ? 'bg-sky-50 text-sky-600 border border-sky-200'
                                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                                }`}
                                title={!showLabel ? item.name : undefined}
                            >
                                {/* Active indicator */}
                                {isActive && <div className="absolute left-0 top-1/4 h-1/2 w-[3px] bg-sky-500 rounded-r-full" />}
                                
                                <Icon className={`h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-sky-600' : 'text-slate-400 group-hover:text-slate-700'}`} />
                                
                                {showLabel && (
                                    <span className="truncate transition-opacity duration-300">
                                        {item.name}
                                    </span>
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* Sidebar Footer Account Details */}
                <div className="p-4 border-t border-slate-100 bg-slate-50">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                                <User className="h-5 w-5" />
                            </div>
                            {(!isHydrated || !isCollapsed) && (
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-sm font-bold text-slate-800 truncate">
                                        {user?.email?.split('@')[0]}
                                    </span>
                                    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider truncate">
                                        {isClientUser ? 'Customer' : staffRole ?? 'Staff'}
                                    </span>
                                </div>
                            )}
                        </div>

                        {(!isHydrated || !isCollapsed) && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleSignOut}
                                className="text-slate-400 hover:text-red-500 hover:bg-red-50 h-8 w-8 rounded-lg"
                                title="Sign Out"
                            >
                                <LogOut className="h-4.5 w-4.5" />
                            </Button>
                        )}
                    </div>

                    {/* Collapse Button */}
                    <button
                        onClick={toggleCollapse}
                        className="hidden md:flex mt-4 w-full h-8 items-center justify-center rounded-lg border border-slate-200 hover:border-sky-300 hover:bg-sky-50 text-slate-400 hover:text-sky-600 transition-colors"
                        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </button>
                </div>
            </aside>

            {/* Mobile Navigation Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-4">
                <Link href="/portal/dashboard" className="flex items-center gap-2">
                    <Image 
                        src={settings?.logoUrl || "/logo.png"} 
                        alt="GSS Hub Logo" 
                        width={28} 
                        height={28} 
                    />
                    <span className="font-extrabold text-sm tracking-widest text-slate-800 uppercase">
                        GSS HUB
                    </span>
                </Link>

                <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-500 hover:bg-slate-100"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
            </header>

            {/* Mobile Drawer Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
                    <aside className="w-72 h-full bg-white border-r border-slate-200 shadow-xl pt-20 px-4 flex flex-col justify-between pb-6 animate-in slide-in-from-left duration-250">
                        <nav className="space-y-1">
                            {!isClientUser && navItems.map((item) => {
                                const Icon = item.icon
                                const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`)

                                return (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-semibold transition-colors ${
                                            isActive
                                                ? 'bg-sky-50 text-sky-600 border border-sky-200'
                                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                                        }`}
                                    >
                                        <Icon className={`h-5 w-5 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                                        <span>{item.name}</span>
                                    </Link>
                                )
                            })}
                        </nav>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                                <div className="h-10 w-10 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                                    <User className="h-5 w-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-slate-800">
                                        {user?.email?.split('@')[0]}
                                    </span>
                                    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                                        {isClientUser ? 'Customer' : staffRole ?? 'Staff'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Link
                                    href="/"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex-1 flex items-center justify-center gap-2 border border-slate-200 hover:border-sky-300 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-900 h-11 bg-slate-50"
                                >
                                    <ExternalLink className="h-4 w-4" /> Website
                                </Link>
                                <Button
                                    variant="destructive"
                                    onClick={handleSignOut}
                                    className="flex-1 h-11 rounded-xl font-semibold gap-2"
                                >
                                    <LogOut className="h-4 w-4" /> Sign Out
                                </Button>
                            </div>
                        </div>
                    </aside>
                </div>
            )}

            {/* Main Application Container */}
            <div 
                className={`flex-1 flex flex-col min-w-0 sidebar-transition relative z-10 min-h-screen ${
                    isHydrated && !isCollapsed ? 'md:pl-64' : 'md:pl-20'
                } pt-16 md:pt-0`}
            >
                {/* Global Top Action Bar */}
                <header className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white/90 backdrop-blur-md hidden md:flex items-center justify-between px-6 md:px-8 shadow-sm">
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                            GSS HUB
                        </span>
                        <span className="text-slate-300 text-sm">/</span>
                        <span className="text-xs font-bold text-sky-600 tracking-wide">
                            {currentActiveItem?.name || 'CRM Portal'}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-sky-600 transition-colors px-3 py-1.5 rounded-lg border border-slate-200 hover:border-sky-300 bg-slate-50 font-semibold"
                            title="Back to public site"
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Public Website
                        </Link>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}