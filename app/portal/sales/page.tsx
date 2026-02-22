"use client"

import { Suspense } from 'react'
import PrivateRoute from '@/components/portal/PrivateRoute'
import Sales from '../pages-temp/Sales'

export default function SalesPage() {
    return (
        <PrivateRoute>
            <Suspense fallback={<div className="p-8 animate-pulse text-muted-foreground">Loading...</div>}>
                <Sales />
            </Suspense>
        </PrivateRoute>
    )
}
