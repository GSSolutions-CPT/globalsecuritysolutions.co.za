import locationData from '@/app/data/locationData.json'
import seoData from '@/app/data/seoData.json'
import { ContactForm } from '@/components/ContactForm'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

// Helper to find location
const getLocation = (slug: string) => {
    return locationData.find(l => l.slug === slug)
}

// Helper to normalize string to slug
const toSlug = (text: string) => {
    return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params
    const location = getLocation(params.slug)

    // Try to find exact match in seoData for superior SEO title/description
    const seoItem = seoData.serviceAreaPages.find(p => toSlug(p.page) === params.slug) ||
        seoData.serviceAreaPages.find(p => p.page.toLowerCase().includes(location?.suburb.toLowerCase() || ''))

    if (seoItem) {
        return {
            title: seoItem.title,
            description: seoItem.description
        }
    }

    if (!location) return {}

    return {
        title: location.h1,
        description: location.description,
    }
}

// Ensure params are correctly awaited in Next.js 15+ compatible way if needed, strict TS might complain about params type.
// But current type { params: { slug: string } } is standard.

export default async function AreaPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params
    const location = getLocation(params.slug)

    if (!location) {
        notFound()
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <div className="bg-slate-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <Link href="/areas" className="text-slate-400 hover:text-white flex items-center mb-4 text-sm font-semibold">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Areas
                    </Link>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{location.h1}</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 prose max-w-none">
                            <p className="text-lg text-slate-700 leading-relaxed mb-6">
                                <strong>{location.description}</strong>
                            </p>
                            <p className="text-slate-600 mb-6">
                                {/* @ts-ignore */}
                                {location.localContent}
                            </p>
                            <p>
                                At <strong>Global Security Solutions</strong>, we understand the specific security challenges faced by residents and businesses in <strong>{location.suburb}</strong>.
                                Our team of certified technicians provides rapid response and expert installation of:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-4 text-slate-700">
                                <li><strong>Alarm Systems:</strong> Smart detection and 24/7 monitoring compatibility.</li>
                                <li><strong>CCTV Surveillance:</strong> HD cameras with remote viewing on your phone.</li>
                                <li><strong>Electric Fencing:</strong> COC-certified perimeter protection.</li>
                                <li><strong>Access Control:</strong> Secure entry for homes and complexes.</li>
                            </ul>
                            <p className="mt-6">
                                Protect your property in {location.suburb} today. Contact us for a free security assessment.
                            </p>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
                            <h3 className="text-xl font-bold text-blue-900 mb-2">Why Choose Us in {location.suburb}?</h3>
                            <p className="text-blue-800">
                                We have a dedicated team servicing the {location.suburb} area, ensuring fast turnaround times for installations and repairs.
                                Our local presence means we understand the specific crime trends in your neighborhood and can advise on the best perimeter protection strategies.
                            </p>
                        </div>

                        {/* SEO Content Block: Area Specifics */}
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Security Services in {location.suburb}</h3>
                            <p className="text-slate-700 leading-relaxed mb-6">
                                Whether you live in a freestanding home, a complex, or manage a business premises in <strong>{location.suburb}</strong>, security is a top priority.
                                Criminals often target properties with visible vulnerabilities such as low walls, dark corners, or outdated alarm systems.
                            </p>
                            <p className="text-slate-700 leading-relaxed mb-6">
                                Global Security Solutions offers a comprehensive audit of your property. We don't just sell products; we design a layered security solution that fits your lifestyle and budget.
                            </p>
                            <h4 className="text-lg font-bold text-slate-900 mb-2">Our Local Services Include:</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-700 mb-8">
                                <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> CCTV Camera Installation</li>
                                <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> Wireless Alarm Systems</li>
                                <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> Electric Fencing COC</li>
                                <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> Gate Motor Repairs</li>
                                <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> Intercom Systems</li>
                                <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> Battery Backups</li>
                            </ul>
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
