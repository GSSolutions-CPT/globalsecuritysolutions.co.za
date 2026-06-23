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
        border: 'border-sky-100 focus-within:border-sky-400',
        glow: 'hover:shadow-md hover:border-sky-300',
        text: 'text-sky-600',
        iconBg: 'bg-sky-50 text-sky-600'
    },
    success: {
        border: 'border-emerald-100 focus-within:border-emerald-400',
        glow: 'hover:shadow-md hover:border-emerald-300',
        text: 'text-emerald-600',
        iconBg: 'bg-emerald-50 text-emerald-600'
    },
    warning: {
        border: 'border-amber-100 focus-within:border-amber-400',
        glow: 'hover:shadow-md hover:border-amber-300',
        text: 'text-amber-600',
        iconBg: 'bg-amber-50 text-amber-600'
    },
    accent: {
        border: 'border-slate-100 focus-within:border-slate-300',
        glow: 'hover:shadow-md hover:border-slate-200',
        text: 'text-slate-600',
        iconBg: 'bg-slate-50 text-slate-600'
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
                'bg-white relative rounded-xl p-6 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 border shadow-sm',
                cyber.border,
                cyber.glow,
                className
            )}
        >
            {/* Top Indicator bar */}
            <div className={cn(
                "absolute top-0 left-0 right-0 h-[3px] rounded-t-xl",
                variant === 'primary' ? 'bg-sky-500' :
                variant === 'success' ? 'bg-emerald-500' :
                variant === 'warning' ? 'bg-amber-500' : 'bg-slate-400'
            )} />

            <div className="relative z-10 flex justify-between items-start">
                <div className="space-y-1">
                    <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{label}</p>
                    <div className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{value}</div>
                    {hint && <p className="text-slate-400 text-[11px] font-medium leading-normal mt-1.5">{hint}</p>}
                </div>

                {Icon && (
                    <div className={cn('p-3 rounded-xl transition-all duration-300', cyber.iconBg)}>
                        <Icon className="h-5 w-5" />
                    </div>
                )}
            </div>

            {/* Subtle background icon overlay */}
            <div className="absolute right-0 bottom-0 opacity-[0.04] pointer-events-none transform translate-x-4 translate-y-4">
                {Icon && <Icon className="h-32 w-32" />}
            </div>
        </div>
    )
}