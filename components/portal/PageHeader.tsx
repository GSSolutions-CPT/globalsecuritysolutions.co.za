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
        <div className={cn('flex flex-col md:flex-row justify-between items-start md:items-center gap-4', className)}>
            <div>
                <h1 className={portalPageTitle}>{title}</h1>
                {description && <p className={portalPageSubtitle}>{description}</p>}
            </div>
            {(badge || actions) && (
                <div className="flex flex-wrap items-center gap-3">
                    {badge}
                    {actions}
                </div>
            )}
        </div>
    )
}