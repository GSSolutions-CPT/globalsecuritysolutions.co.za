"use client"

import { Suspense } from 'react'
import PrivateRoute from '@/components/portal/PrivateRoute'
import Contracts from '../pages-temp/Contracts'

export default function ContractsPage() {
    return (
        <PrivateRoute>
            <Suspense fallback={<div className="p-8 animate-pulse text-muted-foreground">Loading...</div>}>
                <Contracts />
            </Suspense>
        </PrivateRoute>
    )
}
