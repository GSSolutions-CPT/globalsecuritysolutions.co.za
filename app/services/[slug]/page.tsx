import seoData from '@/app/data/seoData.json'
import { ContactForm } from '@/components/ContactForm'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
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
                    <Link href="/services" className="text-slate-400 hover:text-white flex items-center mb-4 text-sm font-semibold">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Services
                    </Link>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{service.page}</h1>
                    <p className="mt-4 text-xl text-slate-300 max-w-3xl">{service.description}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 prose max-w-none">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Professional {service.page} in Cape Town</h2>
                            <p className="text-lg text-slate-700 leading-relaxed mb-6">
                                Global Security Solutions offers premium <strong>{service.page}</strong> services tailored to your specific requirements.
                                Whether you need a solution for a residential home, a commercial office, or an industrial estate, our team is ready to assist.
                            </p>

                            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Our Service Benefits</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 mt-0.5 shrink-0" />
                                    <span><strong>Expert Installation:</strong> Done by certified technicians.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 mt-0.5 shrink-0" />
                                    <span><strong>Leading Brands:</strong> We use Hikvision, IDS, Paradox, and AJAX.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 mt-0.5 shrink-0" />
                                    <span><strong>Warranty & Support:</strong> Comprehensive after-sales service.</span>
                                </li>
                            </ul>

                            <p className="mt-8">
                                Don't compromise on safety. Get a professional assessment for your <strong>{service.page}</strong> needs today.
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
