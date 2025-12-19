import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'AI Security Advisor | Global Security Solutions',
    description: 'Get custom security advice tailored to your property specifics using our AI-powered advisor tool.',
}

export default function AIAdvisorPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-20 flex items-center justify-center">
            <div className="text-center max-w-2xl px-4">
                <h1 className="text-4xl font-bold text-slate-900 mb-6">AI Security Advisor</h1>
                <p className="text-xl text-slate-600 mb-8">
                    Our intelligent security assessment tool is currently being upgraded to provide even more accurate recommendations.
                </p>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    <p className="text-slate-800 font-semibold mb-4">In the meantime, request a manual assessment from our experts:</p>
                    <a href="/contact" className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
                        Get Expert Advice
                    </a>
                </div>
            </div>
        </div>
    )
}
