"use client"

import { Suspense } from 'react'
import PrivateRoute from '@/components/portal/PrivateRoute'
import Settings from '../pages-temp/Settings'

export default function SettingsPage() {
    return (
        <PrivateRoute>
            <Suspense fallback={<div className="p-8 animate-pulse text-muted-foreground">Loading...</div>}>
                <Settings />
            </Suspense>
        </PrivateRoute>
    )
}
