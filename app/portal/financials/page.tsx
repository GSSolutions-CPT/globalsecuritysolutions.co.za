"use client"

import { Suspense } from 'react'
import PrivateRoute from '@/components/portal/PrivateRoute'
import Financials from '../pages-temp/Financials'

export default function FinancialsPage() {
    return (
        <PrivateRoute>
            <Suspense fallback={<div className="p-8 animate-pulse text-muted-foreground">Loading...</div>}>
                <Financials />
            </Suspense>
        </PrivateRoute>
    )
}
