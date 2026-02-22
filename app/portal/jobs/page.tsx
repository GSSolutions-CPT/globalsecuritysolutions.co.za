"use client"

import { Suspense } from 'react'
import PrivateRoute from '@/components/portal/PrivateRoute'
import Jobs from '../pages-temp/Jobs'

export default function JobsPage() {
    return (
        <PrivateRoute>
            <Suspense fallback={<div className="p-8 animate-pulse text-muted-foreground">Loading...</div>}>
                <Jobs />
            </Suspense>
        </PrivateRoute>
    )
}
