"use client"

import { useMemo, useState } from 'react'
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
    ShoppingCart,
} from 'lucide-react'
import { useSettings } from '@/lib/portal/use-settings'
import { staffRoleCanAccess } from '@/lib/portal/permissions'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    const { signOut, user, portalAccess } = useAuth()
    const { settings } = useSettings()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

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
            { name: 'Jobs', path: '/portal/jobs', icon: Briefcase },
            { name: 'Financials', path: '/portal/financials', icon: PieChart },
            { name: 'Purchase Orders', path: '/portal/purchase-orders', icon: ShoppingCart },
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
            <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20">
                <main className="flex-1 animate-fade-in text-foreground">
                    {children}
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20">
            <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/portal/dashboard" className="flex items-center gap-2.5 group">
                        <Image src={settings?.logoUrl || "/logo.png"} alt="GSS Hub" width={32} height={32} className="h-8 w-auto" />
                        <span className="hidden sm:block font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                            GSS Hub
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1">
                        {!isClientUser && navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`)
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 
                      ${isActive
                                            ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_12px_rgba(0,229,255,0.15)]'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="flex items-center gap-2">
                        <Link
                            href="/"
                            className="hidden lg:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-white/5"
                            title="Back to website"
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Website
                        </Link>
                        <div className="hidden md:flex items-center gap-2 pr-4 border-r border-white/10 mr-4">
                            <div className="flex flex-col items-end">
                                <span className="text-sm font-medium leading-none text-foreground">{user?.email?.split('@')[0]}</span>
                                <span className="text-[10px] text-muted-foreground">
                                    {isClientUser ? 'Customer' : staffRole ?? 'Staff'}
                                </span>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleSignOut}
                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 hidden md:flex"
                            title="Sign Out"
                        >
                            <LogOut className="h-5 w-5" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
            </header>

            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-20 px-4 animate-in slide-in-from-top-10 fade-in duration-200">
                    <nav className="flex flex-col gap-2">
                        {!isClientUser && navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`)
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors
                      ${isActive
                                            ? 'bg-primary/10 text-primary border border-primary/20'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                                        }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    {item.name}
                                </Link>
                            )
                        })}
                        <Link
                            href="/"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 mt-4"
                        >
                            <ExternalLink className="h-5 w-5" />
                            Back to Website
                        </Link>
                        <Button
                            variant="destructive"
                            className="mt-4 w-full gap-2"
                            onClick={handleSignOut}
                        >
                            <LogOut className="h-4 w-4" /> Sign Out
                        </Button>
                    </nav>
                </div>
            )}

            <main className="flex-1 container mx-auto p-4 md:py-8 animate-fade-in text-foreground">
                {children}
            </main>
        </div>
    )
}