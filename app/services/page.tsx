import Link from 'next/link'
import Image from 'next/image'
import seoData from '@/app/data/seoData.json'
import { ArrowRight } from 'lucide-react'

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
        <div className="min-h-screen bg-slate-50 py-24 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl opacity-60 -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container relative mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Our Security Services</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Comprehensive security solutions for residential, commercial, and industrial properties.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {seoData.primaryServicePages.map((service) => (
                        <Link
                            key={service.page}
                            href={`/services/${toSlug(service.page)}`}
                            className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center relative overflow-hidden"
                        >
                            {/* Decorative Corner Accent */}
                            <div className="absolute top-0 left-0 w-24 h-24 bg-blue-50 rounded-br-[4rem] -ml-8 -mt-8 transition-transform group-hover:scale-110" />

                            <div className="relative z-10 flex flex-col items-center w-full h-full">
                                <div className="w-24 h-24 bg-white rounded-2xl border-2 border-blue-100 shadow-sm flex items-center justify-center mb-6 group-hover:border-blue-600 group-hover:bg-blue-600 transition-all duration-300">
                                    {service.iconPath ? (
                                        <div className="w-12 h-12 relative">
                                            <Image
                                                src={service.iconPath}
                                                alt={`${service.page} icon`}
                                                fill
                                                className="object-contain brightness-100 group-hover:brightness-0 group-hover:invert transition-all"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 bg-blue-200 rounded-full" />
                                    )}
                                </div>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                                    {service.page}
                                </h2>

                                <p className="text-slate-600 text-sm mb-8 leading-relaxed flex-grow">
                                    {service.description}
                                </p>

                                <span className="mt-auto inline-flex items-center justify-center px-8 py-3 rounded-full bg-blue-600 text-white font-bold text-sm shadow-md group-hover:bg-blue-700 transition-all">
                                    View Service
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* SEO Content Block */}
                <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="prose prose-lg text-slate-600">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Professional Security Matters</h2>
                        <p>
                            In today's world, a basic lock and key are no longer enough. Criminals are becoming more sophisticated, and your security measures need to stay one step ahead.
                            Investing in professional <strong>electronic security systems</strong> is not just about protecting assets; it's about peace of mind for your family and staff.
                        </p>
                        <p>
                            At Global Security Solutions, we believe in a multi-layered approach. By combining <strong>early warning systems</strong> (like outdoor beams and electric fencing) with <strong>active monitoring</strong> (CCTV and alarms), you create a formidable barrier that deters crime before it happens.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="text-xl font-bold text-slate-900 mb-6">Common Questions</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm mb-1">What is the best security system for a home?</h4>
                                <p className="text-slate-600 text-sm">A layered approach is best. We recommend starting with a perimeter electric fence or beams, followed by an internal alarm system and CCTV for verification.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm mb-1">Do you install during load shedding?</h4>
                                <p className="text-slate-600 text-sm">Yes, we can continue most installations during power cuts. We also specialize in battery backup solutions to keep your security running when the grid fails.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
