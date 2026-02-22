"use client"

import { Suspense } from 'react'
import PrivateRoute from '@/components/portal/PrivateRoute'
import Clients from '../pages-temp/Clients'

export default function ClientsPage() {
    return (
        <PrivateRoute>
            <Suspense fallback={<div className="p-8 animate-pulse text-muted-foreground">Loading...</div>}>
                <Clients />
            </Suspense>
        </PrivateRoute>
    )
}
