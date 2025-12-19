import Link from 'next/link'
import seoData from '@/app/data/seoData.json'
import { ArrowRight, Shield } from 'lucide-react'

export const metadata = {
    title: 'All Security Services | Global Security Solutions',
    description: 'Explore our full range of security services including Alarms, CCTV, Electric Fencing, and Access Control in Cape Town.',
}

// Helper to normalize string to slug (same as in [slug]/page.tsx)
const toSlug = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim()
}

export default function ServicesIndexPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">Our Security Services</h1>
                <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16">
                    Comprehensive security solutions for residential, commercial, and industrial properties.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {seoData.primaryServicePages.map((service) => (
                        <Link
                            key={service.page}
                            href={`/services/${toSlug(service.page)}`}
                            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all group"
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-600 transition-colors">
                                    <Shield className="w-5 h-5 text-blue-600 group-hover:text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{service.page}</h2>
                            </div>
                            <p className="text-slate-600 text-sm mb-4 line-clamp-3">{service.description}</p>
                            <span className="text-blue-600 font-semibold text-sm flex items-center">
                                View Service <ArrowRight className="w-4 h-4 ml-1" />
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Solutions by Sector</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {seoData.sectorSolutions.map((service) => (
                            <Link
                                key={service.page}
                                href={`/services/${toSlug(service.page)}`}
                                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all group"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-indigo-600 transition-colors">
                                        <Shield className="w-5 h-5 text-indigo-600 group-hover:text-white" />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{service.page}</h2>
                                </div>
                                <p className="text-slate-600 text-sm mb-4 line-clamp-3">{service.description}</p>
                                <span className="text-indigo-600 font-semibold text-sm flex items-center">
                                    View Solution <ArrowRight className="w-4 h-4 ml-1" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
