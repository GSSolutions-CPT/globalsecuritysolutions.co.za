import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="text-center max-w-lg">
                <h1 className="text-9xl font-bold text-slate-200 mb-4">404</h1>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Page Not Found</h2>
                <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-blue-500/30 hover:scale-105"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Go to Homepage
                    </Link>
                    <Link
                        href="/services"
                        className="inline-flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-8 py-3 rounded-full font-bold transition-all hover:border-blue-300"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        View Services
                    </Link>
                </div>
            </div>
        </div>
    )
}
