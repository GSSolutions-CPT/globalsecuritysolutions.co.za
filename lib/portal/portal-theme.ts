import type { ClientRequest } from '@/types/crm'

/** Page chrome — portal uses a dark navy shell (see globals.css :root) */
export const portalPageTitle =
    'text-3xl font-extrabold tracking-tight text-slate-900'

export const portalPageSubtitle = 'text-slate-500 mt-1 font-medium'

/** Auth pages render on a light card; keep navy gradient there */
export const authPageTitle =
    'text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-navy to-brand-slate'

export const STAT_CARD_VARIANTS = {
    primary: 'bg-gradient-to-br from-brand-electric to-brand-steel',
    accent: 'bg-gradient-to-br from-brand-navy to-brand-slate/90',
    success: 'bg-gradient-to-br from-brand-steel to-brand-navy',
    warning: 'bg-gradient-to-br from-amber-500 to-amber-600',
} as const

export type StatCardVariant = keyof typeof STAT_CARD_VARIANTS

export const REQUEST_STATUS_COLORS: Record<ClientRequest['status'], string> = {
    pending: 'bg-amber-500',
    in_progress: 'bg-brand-electric text-brand-navy',
    completed: 'bg-brand-steel',
    cancelled: 'bg-muted-foreground',
}

export const QUOTATION_STATUS_COLORS: Record<string, string> = {
    Draft: 'bg-muted-foreground',
    Sent: 'bg-brand-steel',
    Approved: 'bg-brand-electric text-brand-navy',
    Accepted: 'bg-brand-electric text-brand-navy',
    Converted: 'bg-brand-steel',
    Paid: 'bg-brand-steel',
    Overdue: 'bg-destructive',
    Cancelled: 'bg-muted-foreground',
    'Pending Review': 'bg-amber-500',
}

export const JOB_STATUS_COLORS: Record<string, string> = {
    Pending: 'bg-amber-500',
    'In Progress': 'bg-brand-electric text-brand-navy',
    Completed: 'bg-brand-steel',
    Cancelled: 'bg-destructive',
}