import Link from 'next/link'
import seoData from '@/app/data/seoData.json'
import { Building2, ArrowRight } from "lucide-react";

// Helper to normalize string to slug
const toSlug = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim()
}

export const metadata = {
    title: 'Security Solutions by Sector | Global Security Solutions',
    description: 'Tailored security solutions for residential, commercial, industrial, and retail sectors in Cape Town.',
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {seoData.sectorSolutions.map((sector) => (
                        <Link
                            key={sector.page}
                            href={`/sectors/${toSlug(sector.page)}`}
                            className="bg-white pt-12 pb-8 px-6 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.15)] hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden text-center flex flex-col items-center h-full border border-slate-50"
                        >
                            {/* APEX DOG-EAR ACCENT */}
                            <div className="absolute top-0 left-0 w-24 h-24 bg-indigo-600 rounded-br-[4rem] transition-transform duration-300 group-hover:scale-110 -translate-x-4 -translate-y-4 shadow-lg z-10" />

                            <div className="relative z-10 flex flex-col items-center h-full w-full">
                                <div className="w-24 h-24 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                                    <Building2 className="w-12 h-12" />
                                </div>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                                    {sector.page}
                                </h2>

                                <p className="text-slate-600 text-sm mb-8 leading-relaxed flex-grow">
                                    {sector.description}
                                </p>

                                <span className="mt-auto text-indigo-600 font-bold text-sm flex items-center group-hover:underline decoration-2 underline-offset-4">
                                    View Details <ArrowRight className="w-4 h-4 ml-1" />
                                </span>
                            </div>
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
