"use client"

import { Suspense } from 'react'
import PrivateRoute from '@/components/portal/PrivateRoute'
import Products from '../pages-temp/Products'

export default function ProductsPage() {
    return (
        <PrivateRoute>
            <Suspense fallback={<div className="p-8 animate-pulse text-muted-foreground">Loading...</div>}>
                <Products />
            </Suspense>
        </PrivateRoute>
    )
}
