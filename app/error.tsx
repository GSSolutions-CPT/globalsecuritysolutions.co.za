'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="min-h-[70vh] bg-brand-white flex items-center justify-center p-4">
            <div className="text-center max-w-lg bg-white p-8 rounded-2xl shadow-sm border border-brand-steel/20">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-full mb-6">
                    <AlertTriangle className="w-8 h-8" />
                </div>

                <h2 className="text-2xl font-bold text-brand-navy mb-2">Something went wrong!</h2>
                <p className="text-brand-slate mb-8 leading-relaxed">
                    We encountered an unexpected error. Our security team has been notified.
                    Please try refreshing the page or return home.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="inline-flex items-center justify-center bg-brand-electric hover:bg-brand-electric text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-brand-electric/25 active:scale-95"
                    >
                        <RefreshCcw className="w-4 h-4 mr-2" />
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center bg-brand-steel/20 hover:bg-brand-steel/40 text-brand-slate px-6 py-3 rounded-full font-bold transition-all active:scale-95"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Go Home
                    </Link>
                </div>
                {error.digest && (
                    <p className="mt-8 text-xs text-brand-steel font-mono">Error ID: {error.digest}</p>
                )}
            </div>
        </div>
    )
}
