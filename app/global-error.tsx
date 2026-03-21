'use client'

import { Montserrat } from "next/font/google"
import "./globals.css"
import { AlertOctagon, RefreshCcw } from 'lucide-react'
import { cn } from "@/utils/cn"

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" })

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html lang="en">
            <body className={cn("min-h-screen bg-brand-navy flex items-center justify-center font-sans antialiased", montserrat.variable)}>
                <div className="max-w-md w-full p-4">
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="p-8 text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 text-red-600 rounded-full mb-6">
                                <AlertOctagon className="w-10 h-10" />
                            </div>
                            <h1 className="text-3xl font-bold text-brand-navy mb-2">System Error</h1>
                            <p className="text-brand-slate mb-8">
                                A critical error occurred. Please try refreshing the application.
                            </p>

                            <button
                                onClick={() => reset()}
                                className="w-full inline-flex items-center justify-center bg-brand-electric hover:bg-brand-electric text-white px-6 py-4 rounded-xl font-bold transition-colors text-lg"
                            >
                                <RefreshCcw className="w-5 h-5 mr-2" />
                                Reload Application
                            </button>

                            {error.digest && (
                                <p className="mt-6 text-xs text-brand-steel font-mono bg-brand-white p-2 rounded">Reference: {error.digest}</p>
                            )}
                        </div>
                        <div className="bg-brand-white p-4 text-center border-t border-brand-steel/20">
                            <p className="text-xs text-brand-steel">Global Security Solutions &copy; {new Date().getFullYear()}</p>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}
