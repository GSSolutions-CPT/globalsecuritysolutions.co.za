"use client"

import { Suspense } from 'react'
import PrivateRoute from '@/components/portal/PrivateRoute'
import CreateSale from '../pages-temp/CreateSale'

export default function CreateSalePage() {
    return (
        <PrivateRoute>
            <Suspense fallback={<div className="p-8 animate-pulse text-muted-foreground">Loading...</div>}>
                <CreateSale />
            </Suspense>
        </PrivateRoute>
    )
}
