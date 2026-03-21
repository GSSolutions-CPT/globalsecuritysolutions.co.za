'use client'

import { LayoutDashboard, FileText, Briefcase, LogOut, ShieldCheck } from 'lucide-react'

type Tab = 'overview' | 'blog' | 'projects'

interface AdminSidebarProps {
    activeTab: Tab
    setActiveTab: (tab: Tab) => void
    onLogout: () => void
}

export function AdminSidebar({ activeTab, setActiveTab, onLogout }: AdminSidebarProps) {
    const menuItems = [
        { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },

        { id: 'blog', label: 'Blog Posts', icon: FileText },
        { id: 'projects', label: 'Project Gallery', icon: Briefcase },
    ] as const

    return (
        <aside className="w-64 bg-brand-navy text-white min-h-screen fixed left-0 top-0 flex flex-col z-50">
            {/* Logo Area */}
            <div className="p-6 border-b border-brand-navy flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-electric rounded-xl flex items-center justify-center shadow-lg shadow-brand-navy/50">
                    <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="font-bold text-lg leading-none">GSS Admin</h1>
                    <span className="text-xs text-brand-steel">Command Center v2.0</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 mt-4">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === item.id
                            ? 'bg-brand-electric text-white shadow-lg shadow-brand-navy/20 font-bold'
                            : 'text-brand-steel hover:bg-brand-navy hover:text-white'
                            }`}
                    >
                        <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : 'text-brand-steel group-hover:text-white'}`} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-brand-navy">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-bold">Sign Out</span>
                </button>
            </div>
        </aside>
    )
}
