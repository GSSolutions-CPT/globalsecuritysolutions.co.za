import { LucideIcon } from 'lucide-react'
import { type StatCardVariant } from '@/lib/portal/portal-theme'
import { cn } from '@/lib/portal/utils'

interface StatCardProps {
    label: string
    value: React.ReactNode
    hint?: string
    variant?: StatCardVariant
    icon?: LucideIcon
    className?: string
}

// Map variants to specific glow borders and text styles
const VARIANT_CYBER_CLASSES: Record<StatCardVariant, { border: string; glow: string; text: string; iconBg: string }> = {
    primary: {
        border: 'border-brand-electric/20 focus-within:border-brand-electric/50',
        glow: 'hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] hover:border-brand-electric/40',
        text: 'text-brand-electric',
        iconBg: 'bg-brand-electric/10 text-brand-electric'
    },
    success: {
        border: 'border-emerald-500/20 focus-within:border-emerald-500/50',
        glow: 'hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:border-emerald-500/40',
        text: 'text-emerald-400',
        iconBg: 'bg-emerald-500/10 text-emerald-400'
    },
    warning: {
        border: 'border-amber-500/20 focus-within:border-amber-500/50',
        glow: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:border-amber-500/40',
        text: 'text-amber-400',
        iconBg: 'bg-amber-500/10 text-amber-400'
    },
    accent: {
        border: 'border-brand-steel/20 focus-within:border-brand-steel/50',
        glow: 'hover:shadow-[0_0_20px_rgba(70,130,180,0.15)] hover:border-brand-steel/40',
        text: 'text-brand-steel',
        iconBg: 'bg-brand-steel/10 text-brand-steel'
    }
}

export function StatCard({
    label,
    value,
    hint,
    variant = 'primary',
    icon: Icon,
    className,
}: StatCardProps) {
    const cyber = VARIANT_CYBER_CLASSES[variant]

    return (
        <div
            className={cn(
                'glass-panel relative rounded-xl p-6 overflow-hidden transition-all duration-300 transform hover:-translate-y-1',
                cyber.border,
                cyber.glow,
                className
            )}
        >
            {/* Top Indicator bar */}
            <div className={cn(
                "absolute top-0 left-0 right-0 h-[2px]",
                variant === 'primary' ? 'bg-brand-electric' :
                variant === 'success' ? 'bg-emerald-500' :
                variant === 'warning' ? 'bg-amber-500' : 'bg-brand-steel'
            )} />

            <div className="relative z-10 flex justify-between items-start">
                <div className="space-y-1">
                    <p className="text-brand-slate text-xs font-semibold uppercase tracking-wider">{label}</p>
                    <div className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{value}</div>
                    {hint && <p className="text-brand-slate/80 text-[11px] font-medium leading-normal mt-1.5">{hint}</p>}
                </div>

                {Icon && (
                    <div className={cn('p-3 rounded-xl transition-all duration-300', cyber.iconBg)}>
                        <Icon className="h-5 w-5" />
                    </div>
                )}
            </div>

            {/* Subtle background tech graphic overlay */}
            <div className="absolute right-0 bottom-0 opacity-[0.02] pointer-events-none transform translate-x-4 translate-y-4">
                {Icon && <Icon className="h-32 w-32" />}
            </div>
        </div>
    )
}