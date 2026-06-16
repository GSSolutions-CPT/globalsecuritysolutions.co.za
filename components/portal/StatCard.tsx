import { LucideIcon } from 'lucide-react'
import { STAT_CARD_VARIANTS, type StatCardVariant } from '@/lib/portal/portal-theme'
import { cn } from '@/lib/portal/utils'

interface StatCardProps {
    label: string
    value: React.ReactNode
    hint?: string
    variant?: StatCardVariant
    icon?: LucideIcon
    className?: string
}

export function StatCard({
    label,
    value,
    hint,
    variant = 'primary',
    icon: Icon,
    className,
}: StatCardProps) {
    return (
        <div
            className={cn(
                'rounded-xl p-6 text-white shadow-lg relative overflow-hidden',
                STAT_CARD_VARIANTS[variant],
                className
            )}
        >
            <div className="relative z-10">
                <p className="text-white/80 text-sm font-medium">{label}</p>
                <div className="text-3xl font-bold mt-1">{value}</div>
                {hint && <p className="text-white/70 text-xs mt-2">{hint}</p>}
            </div>
            {Icon && (
                <Icon className="absolute right-[-10px] bottom-[-10px] h-24 w-24 text-white opacity-10 rotate-12 pointer-events-none" />
            )}
        </div>
    )
}