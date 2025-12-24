import seoData from '@/app/data/seoData.json'
import { ContactForm } from '@/components/ContactForm'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { Metadata } from 'next'

// Helper to normalize string to slug
const toSlug = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-')     // Replace spaces with -
        .trim()
}

// Find service by slug
const getService = (slug: string) => {
    return seoData.primaryServicePages.find(s => toSlug(s.page) === slug) ||
        seoData.sectorSolutions.find(s => toSlug(s.page) === slug)
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params
    const service = getService(params.slug)
    if (!service) return {}

    return {
        title: service.title,
        description: service.description,
    }
}

export default async function ServicePage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params
    const service = getService(params.slug)

    if (!service) {
        notFound()
    }

    // Generate generic content based on the service title and description for now.
    // In a real app we'd likely have more specific content or MDX.

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <div className="bg-slate-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="mb-4">
                        <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: service.page, href: '#' }]} />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 prose max-w-none">
                            <div className="flex items-center gap-4 mb-4">
                                {/* @ts-ignore */}
                                {service.iconPath && (
                                    <div className="w-16 h-16 bg-blue-50 rounded-lg p-3 flex-shrink-0">
                                        <Image
                                            /* @ts-ignore */
                                            src={service.iconPath}
                                            /* @ts-ignore */
                                            alt={`${service.page} icon`}
                                            width={64}
                                            height={64}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                )}
                                <h1 className="text-3xl font-bold text-slate-900 m-0">{service.page} Cape Town</h1>
                            </div>
                            <p className="text-slate-500 mb-8 border-b border-slate-100 pb-8 text-lg">
                                {/* @ts-ignore */}
                                {service.longDescription || `Professional ${service.page} installations and repairs in the Western Cape.`}
                            </p>

                            {/* The Problem */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center">
                                    Are you concerned about your security?
                                </h2>
                                <p className="text-lg text-slate-700 leading-relaxed">
                                    Without a proper <strong>{service.page}</strong>, your property leaves gaps that criminals can exploit.
                                    Whether it's unmonitored blind spots, easy access points, or outdated hardware, these vulnerabilities put your family or business at risk.
                                </p>
                            </div>

                            {/* The Solution */}
                            <div className="mb-10 bg-blue-50 p-6 rounded-xl border border-blue-100">
                                <h2 className="text-2xl font-bold text-blue-900 mb-4">The Solution: Global Security Solutions</h2>
                                <p className="text-lg text-slate-800 leading-relaxed max-w-none">
                                    We install high-performance <strong>{service.page}</strong> designed for the unique challenges of Cape Town.
                                    Our systems act as a proactive deterrent, ensuring that threats are detected and stopped before they cause harm.
                                </p>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Key Features & Benefits</h3>
                            <ul className="space-y-4 mb-10">
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 mt-0.5 shrink-0" />
                                    <span><strong>Remote Mobile Control:</strong> Manage your {service.page.toLowerCase()} directly from your smartphone, anywhere in the world.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 mt-0.5 shrink-0" />
                                    <span><strong>Proactive Alerts:</strong> Instant notifications sent to you and our control room if any breach is detected.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 mt-0.5 shrink-0" />
                                    <span><strong>Load Shedding Backup:</strong> Our systems are linked to battery backups to stay online during power cuts.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 mt-0.5 shrink-0" />
                                    <span><strong>Certified Installation:</strong> Fully compliant with insurance and safety regulations in South Africa.</span>
                                </li>
                            </ul>

                            {/* SEO Content Block: FAQ */}
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-10">
                                <h3 className="text-xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h3>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm mb-1">How long does installation take?</h4>
                                        <p className="text-slate-600 text-sm">Most residential installations are completed within 1-2 days. Larger commercial projects may take longer depending on complexity.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm mb-1">Do you offer warranties?</h4>
                                        <p className="text-slate-600 text-sm">Yes, we provide a 1-year workmanship guarantee and full manufacturer warranties on all hardware (Hikvision, IDS, Paradox, etc.).</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm mb-1">Can I view my cameras on my phone?</h4>
                                        <p className="text-slate-600 text-sm">Absolutely. All our modern CCTV and alarm systems can be linked to a mobile app for remote viewing and control.</p>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Brands We Use</h3>
                            <p className="text-slate-600 mb-6">
                                We don't cut corners on hardware. For <strong>{service.page}</strong>, we trust only the industry leaders like Hikvision, IDS, Paradox, and Nemtek to ensure reliability when you need it most.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
