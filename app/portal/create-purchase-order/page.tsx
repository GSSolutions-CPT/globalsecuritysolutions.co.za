"use client"

import { Suspense } from 'react'
import PrivateRoute from '@/components/portal/PrivateRoute'
import CreatePurchaseOrder from '../pages-temp/CreatePurchaseOrder'

export default function CreatePurchaseOrderPage() {
    return (
        <PrivateRoute>
            <Suspense fallback={<div className="p-8 animate-pulse text-muted-foreground">Loading...</div>}>
                <CreatePurchaseOrder />
            </Suspense>
        </PrivateRoute>
    )
}
