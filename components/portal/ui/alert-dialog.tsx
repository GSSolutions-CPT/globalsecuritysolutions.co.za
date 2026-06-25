// @ts-nocheck
'use client'

import React, { useCallback, useRef, useState } from 'react'
import { cn } from '@/lib/portal/utils'
import { Button } from '@/components/portal/ui/button'
import { AlertTriangle } from 'lucide-react'

// ─── Low-level AlertDialog primitives ────────────────────────────────────────

interface AlertDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    children: React.ReactNode
}

export function AlertDialog({ open, onOpenChange, children }: AlertDialogProps) {
    if (!open) return null
    return (
        <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onMouseDown={(e) => { if (e.target === e.currentTarget) onOpenChange(false) }}
        >
            {children}
        </div>
    )
}

export const AlertDialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            role="alertdialog"
            aria-modal="true"
            className={cn(
                'relative z-50 w-full max-w-md rounded-xl border border-border bg-background p-6 shadow-2xl',
                'animate-in fade-in-0 zoom-in-95 duration-200',
                className
            )}
            {...props}
        />
    )
)
AlertDialogContent.displayName = 'AlertDialogContent'

export const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('flex flex-col gap-2 mb-4', className)} {...props} />
)

export const AlertDialogTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn('text-base font-semibold leading-none tracking-tight text-foreground', className)} {...props} />
)

export const AlertDialogDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn('text-sm text-muted-foreground leading-relaxed', className)} {...props} />
)

export const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)} {...props} />
)

interface AlertDialogActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'ghost'
}

export const AlertDialogAction = React.forwardRef<HTMLButtonElement, AlertDialogActionProps>(
    ({ className, variant = 'destructive', children, ...props }, ref) => (
        <Button ref={ref} variant={variant} className={className} {...props}>
            {children}
        </Button>
    )
)
AlertDialogAction.displayName = 'AlertDialogAction'

export const AlertDialogCancel = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ className, children = 'Cancel', ...props }, ref) => (
        <Button ref={ref} variant="outline" className={className} {...props}>
            {children}
        </Button>
    )
)
AlertDialogCancel.displayName = 'AlertDialogCancel'

// ─── useConfirm hook ─────────────────────────────────────────────────────────
// Drop-in replacement for window.confirm() that renders a proper styled dialog.
//
// Usage:
//   const { confirm, ConfirmDialog } = useConfirm()
//   ...
//   const ok = await confirm({ title: 'Delete?', description: 'This cannot be undone.' })
//   if (!ok) return
//   ...
//   return <> {children} <ConfirmDialog /> </>

interface ConfirmOptions {
    title?: string
    description?: string
    confirmLabel?: string
    cancelLabel?: string
    variant?: 'destructive' | 'default'
    icon?: React.ReactNode
}

type ResolveFunc = (value: boolean) => void

export function useConfirm() {
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState<ConfirmOptions>({})
    const resolveRef = useRef<ResolveFunc | null>(null)

    const confirm = useCallback((opts: ConfirmOptions = {}): Promise<boolean> => {
        setOptions(opts)
        setOpen(true)
        return new Promise<boolean>((resolve) => {
            resolveRef.current = resolve
        })
    }, [])

    const handleConfirm = useCallback(() => {
        setOpen(false)
        resolveRef.current?.(true)
        resolveRef.current = null
    }, [])

    const handleCancel = useCallback(() => {
        setOpen(false)
        resolveRef.current?.(false)
        resolveRef.current = null
    }, [])

    const ConfirmDialog = useCallback(() => (
        <AlertDialog open={open} onOpenChange={(v) => { if (!v) handleCancel() }}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                            {options.icon ?? (
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10">
                                    <AlertTriangle className="h-4 w-4 text-destructive" />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <AlertDialogTitle>
                                {options.title ?? 'Are you sure?'}
                            </AlertDialogTitle>
                            {options.description && (
                                <AlertDialogDescription>
                                    {options.description}
                                </AlertDialogDescription>
                            )}
                        </div>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel}>
                        {options.cancelLabel ?? 'Cancel'}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        variant={options.variant ?? 'destructive'}
                        onClick={handleConfirm}
                    >
                        {options.confirmLabel ?? 'Confirm'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    ), [open, options, handleConfirm, handleCancel])

    return { confirm, ConfirmDialog }
}
