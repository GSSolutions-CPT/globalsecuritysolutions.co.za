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
            <body className={cn("min-h-screen bg-slate-900 flex items-center justify-center font-sans antialiased", montserrat.variable)}>
                <div className="max-w-md w-full p-4">
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="p-8 text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 text-red-600 rounded-full mb-6">
                                <AlertOctagon className="w-10 h-10" />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">System Error</h1>
                            <p className="text-slate-600 mb-8">
                                A critical error occurred. Please try refreshing the application.
                            </p>

                            <button
                                onClick={() => reset()}
                                className="w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-bold transition-colors text-lg"
                            >
                                <RefreshCcw className="w-5 h-5 mr-2" />
                                Reload Application
                            </button>

                            {error.digest && (
                                <p className="mt-6 text-xs text-slate-400 font-mono bg-slate-50 p-2 rounded">Reference: {error.digest}</p>
                            )}
                        </div>
                        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                            <p className="text-xs text-slate-500">Global Security Solutions &copy; {new Date().getFullYear()}</p>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}
