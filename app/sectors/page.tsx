import Link from 'next/link'
import seoData from '@/app/data/seoData.json'
import { ArrowRight, Shield } from 'lucide-react'

export const metadata = {
    title: 'Security Solutions by Sector | Global Security Solutions',
    description: 'Tailored security solutions for residential, commercial, industrial, and retail sectors in Cape Town.',
}

// Helper to normalize string to slug
const toSlug = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim()
}

export default function SectorsIndexPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-24 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="container relative mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Solutions by Sector</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Specialized security strategies designed for the unique challenges of your industry.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {seoData.sectorSolutions.map((service) => (
                        <Link
                            key={service.page}
                            href={`/services/${toSlug(service.page)}`}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
                        >
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-indigo-600 transition-colors duration-300">
                                    <Shield className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{service.page}</h2>
                            </div>
                            <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed">{service.description}</p>
                            <span className="text-indigo-600 font-bold text-sm flex items-center mt-auto uppercase tracking-wide">
                                View Solution <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                    ))}
                </div>

                {/* SEO Content Block */}
                <div className="mt-24 max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Tailored Security for Every Environment</h2>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        Security is not a "one size fits all" solution. The needs of a residential estate differ vastly from those of a high-risk industrial warehouse or a retail store.
                        That's why <strong>Global Security Solutions</strong> approaches every project with a fresh perspective, conducting a thorough risk assessment based on your specific sector's unique vulnerabilities.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                            <h3 className="font-bold text-indigo-900 mb-2">Residential Risks</h3>
                            <p className="text-slate-700 text-sm">Focus on perimeter early warning (beams/fencing) and family safety (panic buttons/safe zones).</p>
                        </div>
                        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                            <h3 className="font-bold text-indigo-900 mb-2">Commercial Risks</h3>
                            <p className="text-slate-700 text-sm">Focus on access control, staff attendance tracking, and high-definition surveillance for liability protection.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
