import { portalPageSubtitle, portalPageTitle } from '@/lib/portal/portal-theme'
import { cn } from '@/lib/portal/utils'

interface PageHeaderProps {
    title: string
    description?: string
    badge?: React.ReactNode
    actions?: React.ReactNode
    className?: string
}

export function PageHeader({ title, description, badge, actions, className }: PageHeaderProps) {
    return (
        <div className={cn('flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 mb-6 border-b border-white/5 animate-fade-in-up', className)}>
            <div className="relative pl-4">
                {/* Cyber Left Accent Bar */}
                <div className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-brand-electric rounded-full shadow-[0_0_8px_#00e5ff]" />
                
                <h1 className={cn(portalPageTitle, "text-2xl md:text-3xl tracking-tight font-extrabold font-sans")}>
                    {title}
                </h1>
                {description && (
                    <p className={cn(portalPageSubtitle, "text-xs md:text-sm text-brand-slate mt-1 font-medium")}>
                        {description}
                    </p>
                )}
            </div>
            {(badge || actions) && (
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
                    {badge}
                    {actions && (
                        <div className="flex flex-wrap items-center gap-2">
                            {actions}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}