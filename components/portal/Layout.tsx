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
    FileSignature,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    ShoppingCart,
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
            { name: 'Contracts', path: '/portal/contracts', icon: FileSignature },
            { name: 'Clients', path: '/portal/clients', icon: Users },
            { name: 'Requests', path: '/portal/requests', icon: Inbox },
            { name: 'Products', path: '/portal/products', icon: Package },
            { name: 'Purchase Orders', path: '/portal/purchase-orders', icon: ShoppingCart },
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
            <div className="min-h-screen bg-[#020617] text-foreground flex flex-col font-sans selection:bg-brand-electric/20 selection:text-brand-electric">
                <main className="flex-1 animate-fade-in text-foreground relative z-10">
                    {children}
                </main>
            </div>
        )
    }

    const currentActiveItem = navItems.find(item => pathname === item.path || pathname.startsWith(`${item.path}/`))

    return (
        <div className="min-h-screen bg-[#020617] text-foreground flex font-sans selection:bg-brand-electric/20 selection:text-brand-electric">
            
            {/* Tech grid scanlines background overlay */}
            <div className="fixed inset-0 tech-grid-bg pointer-events-none z-0 opacity-70" />

            {/* Sidebar - Desktop */}
            <aside 
                className={`hidden md:flex flex-col fixed top-0 bottom-0 left-0 z-40 bg-brand-navy/70 border-r border-white/10 backdrop-blur-xl sidebar-transition overflow-x-hidden ${
                    !isHydrated || !isCollapsed ? 'w-64' : 'w-20'
                }`}
            >
                {/* Brand Logo Header */}
                <div className="h-16 flex items-center px-5 border-b border-white/5 gap-3">
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
                        <span className="font-extrabold text-sm tracking-widest bg-gradient-to-r from-white to-brand-steel/80 bg-clip-text text-transparent truncate font-mono uppercase">
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
                                        ? 'bg-brand-electric/10 text-brand-electric border border-brand-electric/20 shadow-[0_0_15px_rgba(0,229,255,0.08)]'
                                        : 'text-brand-slate hover:text-white hover:bg-white/5'
                                }`}
                                title={!showLabel ? item.name : undefined}
                            >
                                {/* Active Neon Dot/Line Marker */}
                                {isActive && <div className="active-marker" />}
                                
                                <Icon className={`h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-brand-electric' : 'text-brand-slate group-hover:text-white'}`} />
                                
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
                <div className="p-4 border-t border-white/5 bg-black/10">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-brand-electric/10 border border-brand-electric/20 flex items-center justify-center text-brand-electric">
                                <User className="h-5 w-5" />
                            </div>
                            {(!isHydrated || !isCollapsed) && (
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-sm font-bold text-white truncate">
                                        {user?.email?.split('@')[0]}
                                    </span>
                                    <span className="text-[10px] text-brand-slate font-semibold uppercase tracking-wider truncate">
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
                                className="text-brand-slate hover:text-destructive hover:bg-destructive/10 h-8 w-8 rounded-lg"
                                title="Sign Out"
                            >
                                <LogOut className="h-4.5 w-4.5" />
                            </Button>
                        )}
                    </div>

                    {/* Collapse Button */}
                    <button
                        onClick={toggleCollapse}
                        className="hidden md:flex mt-4 w-full h-8 items-center justify-center rounded-lg border border-white/5 hover:border-brand-electric/20 hover:bg-white/5 text-brand-slate hover:text-white transition-colors"
                        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </button>
                </div>
            </aside>

            {/* Mobile Navigation Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-brand-navy/80 border-b border-white/10 backdrop-blur-xl flex items-center justify-between px-4">
                <Link href="/portal/dashboard" className="flex items-center gap-2">
                    <Image 
                        src={settings?.logoUrl || "/logo.png"} 
                        alt="GSS Hub Logo" 
                        width={28} 
                        height={28} 
                    />
                    <span className="font-extrabold text-sm tracking-widest text-white uppercase font-mono">
                        GSS HUB
                    </span>
                </Link>

                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/5"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
            </header>

            {/* Mobile Drawer Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <aside className="w-72 h-full bg-[#0a192f] border-r border-white/10 pt-20 px-4 flex flex-col justify-between pb-6 animate-in slide-in-from-left duration-250">
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
                                                ? 'bg-brand-electric/10 text-brand-electric border border-brand-electric/25'
                                                : 'text-brand-slate hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span>{item.name}</span>
                                    </Link>
                                )
                            })}
                        </nav>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-black/20 rounded-xl">
                                <div className="h-10 w-10 rounded-lg bg-brand-electric/10 flex items-center justify-center text-brand-electric">
                                    <User className="h-5 w-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-white">
                                        {user?.email?.split('@')[0]}
                                    </span>
                                    <span className="text-[10px] text-brand-slate font-semibold uppercase tracking-wider">
                                        {isClientUser ? 'Customer' : staffRole ?? 'Staff'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Link
                                    href="/"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex-1 flex items-center justify-center gap-2 border border-white/5 hover:border-brand-electric/20 rounded-xl text-sm font-semibold text-brand-slate hover:text-white h-11 bg-white/5"
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
                <header className="sticky top-0 z-30 h-16 border-b border-white/5 bg-brand-navy/30 backdrop-blur-md hidden md:flex items-center justify-between px-6 md:px-8">
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-brand-slate font-mono uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                            GSS HUB
                        </span>
                        <span className="text-brand-slate/40 text-sm">/</span>
                        <span className="text-xs font-bold text-brand-electric tracking-wide font-sans">
                            {currentActiveItem?.name || 'CRM Portal'}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="flex items-center gap-1.5 text-xs text-brand-slate hover:text-brand-electric transition-colors px-3 py-1.5 rounded-lg border border-white/5 hover:border-brand-electric/20 bg-white/5 font-semibold"
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