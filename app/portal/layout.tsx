"use client"

import { AuthProvider } from '@/context/AuthContext'
import { SettingsProvider } from '@/lib/portal/use-settings'
import { CurrencyProvider } from '@/lib/portal/use-currency'
import PortalGuard from '@/components/portal/PortalGuard'
import PortalLayout from '@/components/portal/Layout'
import ErrorBoundary from '@/components/portal/ErrorBoundary'
import { Toaster } from 'sonner'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <PortalGuard>
                    <SettingsProvider>
                        <CurrencyProvider>
                            <PortalLayout>{children}</PortalLayout>
                            <Toaster
                                position="top-right"
                                toastOptions={{
                                    classNames: {
                                        toast: 'bg-card text-foreground border-border shadow-lg',
                                        success: 'border-brand-electric/30',
                                        error: 'border-destructive/30',
                                    },
                                }}
                            />
                        </CurrencyProvider>
                    </SettingsProvider>
                </PortalGuard>
            </AuthProvider>
        </ErrorBoundary>
    )
}