"use client"

import { AuthProvider } from '@/context/AuthContext'
import { SettingsProvider } from '@/lib/portal/use-settings'
import { CurrencyProvider } from '@/lib/portal/use-currency'
import PortalLayout from '@/components/portal/Layout'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <SettingsProvider>
                <CurrencyProvider>
                    <PortalLayout>{children}</PortalLayout>
                </CurrencyProvider>
            </SettingsProvider>
        </AuthProvider>
    )
}
