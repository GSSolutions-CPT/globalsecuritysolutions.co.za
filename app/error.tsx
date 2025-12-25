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
        <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center p-4">
            <div className="text-center max-w-lg bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-full mb-6">
                    <AlertTriangle className="w-8 h-8" />
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong!</h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                    We encountered an unexpected error. Our security team has been notified.
                    Please try refreshing the page or return home.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95"
                    >
                        <RefreshCcw className="w-4 h-4 mr-2" />
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-full font-bold transition-all active:scale-95"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Go Home
                    </Link>
                </div>
                {error.digest && (
                    <p className="mt-8 text-xs text-slate-400 font-mono">Error ID: {error.digest}</p>
                )}
            </div>
        </div>
    )
}
