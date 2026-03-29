import dynamic from 'next/dynamic'
import locationData from '@/app/data/locationData.json'
import seoData from '@/app/data/seoData.json'
import { masterBusinessData } from '@/utils/generateSchema'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, MapPin, ShieldCheck, CheckCircle2, Siren, Cctv, Zap, KeyRound } from 'lucide-react'
import type { Metadata } from 'next'

const ContactForm = dynamic(() => import('@/components/ContactForm').then(mod => mod.ContactForm), { 
    
    loading: () => <div className="h-[500px] w-full animate-pulse bg-brand-navy/5 rounded-2xl border border-brand-steel/10 flex items-center justify-center text-brand-steel">Loading secure form...</div>
});

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

export default async function AreaPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params
    const location = getLocation(params.slug)

    if (!location) {
        notFound()
    }

    return (
        <div className="flex flex-col min-h-screen bg-brand-white font-sans">
            {/* Localized Business Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        ...masterBusinessData,
                        "areaServed": {
                            "@type": "City",
                            "name": location.suburb
                        },
                        "url": `https://globalsecuritysolutions.co.za/areas/${location.slug}`,
                        "description": location.description
                    })
                }}
            />

            {/* Breadcrumb Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https://globalsecuritysolutions.co.za"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Areas",
                                "item": "https://globalsecuritysolutions.co.za/areas"
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": location.suburb,
                                "item": `https://globalsecuritysolutions.co.za/areas/${location.slug}`
                            }
                        ]
                    })
                }}
            />

            {/* Dynamic Hero Section */}
            <section className="relative bg-brand-navy text-white min-h-[60vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={location.heroImage || '/hero-bg.jpg'}
                        alt={location.heroAlt || `Security services in ${location.suburb}`}
                        fill
                        className="object-cover opacity-60"
                        priority
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/60 to-brand-navy/10 z-10" />
                </div>

                <div className="container relative z-20 mx-auto px-4 py-12 lg:py-0">
                    <Link href="/areas" className="inline-flex items-center text-brand-electric hover:text-white mb-8 transition-colors text-sm font-semibold tracking-wide uppercase">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Areas
                    </Link>

                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-electric/10 border border-brand-electric/20 text-brand-electric text-sm font-medium mb-6 backdrop-blur-sm">
                            <MapPin className="w-4 h-4" />
                            <span>Serving {location.suburb} & Surrounds</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                            {location.h1}
                        </h1>
                        <p className="text-xl text-brand-steel max-w-2xl leading-relaxed">
                            {location.description}
                        </p>
                    </div>
                </div>
            </section>

            <div className="relative z-30 -mt-8 pb-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">

                            {/* Local Insight Card */}
                            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-brand-steel/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-electric/10 rounded-bl-full -mr-16 -mt-6" />
                                <div className="relative z-10">
                                    <h2 className="text-2xl font-bold text-brand-navy mb-6 flex items-center">
                                        <ShieldCheck className="w-6 h-6 text-brand-electric mr-3" />
                                        Security in {location.suburb}
                                    </h2>
                                    <p className="text-lg text-brand-slate leading-relaxed mb-6 italic border-l-4 border-brand-electric pl-6 bg-brand-white py-4 rounded-r-xl">
                                        &quot;{location.localContent}&quot;
                                    </p>
                                    <p className="text-brand-slate leading-relaxed overflow-hidden py-1">
                                        Global Security Solutions understands these unique challenges. We don&apos;t offer cookie-cutter systems; we design localized defense strategies that withstand the specific environmental and crime-trend factors of {location.suburb}.
                                    </p>
                                </div>
                            </div>

                            {/* Service Grid */}
                            <div>
                                <h3 className="text-2xl font-bold text-brand-navy mb-8">Our Services in {location.suburb}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-start p-6 bg-white rounded-2xl shadow-sm border border-brand-steel/20 hover:border-brand-electric/40 transition-colors">
                                        <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 mr-4">
                                            <Siren className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-navy mb-1">Smart Alarms</h4>
                                            <p className="text-sm text-brand-steel">Wireless detection & app control.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start p-6 bg-white rounded-2xl shadow-sm border border-brand-steel/20 hover:border-brand-electric/40 transition-colors">
                                        <div className="w-12 h-12 rounded-xl bg-brand-electric/10 text-brand-electric flex items-center justify-center shrink-0 mr-4">
                                            <Cctv className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-navy mb-1">CCTV Systems</h4>
                                            <p className="text-sm text-brand-steel">HD night vision & remote viewing.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start p-6 bg-white rounded-2xl shadow-sm border border-brand-steel/20 hover:border-brand-electric/40 transition-colors">
                                        <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0 mr-4">
                                            <Zap className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-navy mb-1">Electric Fencing</h4>
                                            <p className="text-sm text-brand-steel">COC certified perimeter defense.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start p-6 bg-white rounded-2xl shadow-sm border border-brand-steel/20 hover:border-brand-electric/40 transition-colors">
                                        <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0 mr-4">
                                            <KeyRound className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-navy mb-1">Gate Automation</h4>
                                            <p className="text-sm text-brand-steel">Fast motors & anti-theft cages.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SEO Content Block */}
                            <div className="prose max-w-none text-brand-slate">
                                <h3 className="text-xl font-bold text-brand-navy">Why Residents Trust Us</h3>
                                <p>
                                    Whether you live in a freestanding home, a complex, or manage a business premises in <strong>{location.suburb}</strong>, security is non-negotiable.
                                    Criminals often target properties with visible vulnerabilities. Our team provides rapid response installations tailored to the architectural style and risk profile of {location.suburb}.
                                </p>
                                <ul className="space-y-2 mt-4 not-prose">
                                    <li className="flex items-center text-brand-slate">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                                        Local technical support teams
                                    </li>
                                    <li className="flex items-center text-brand-slate">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                                        Knowledge of local crime trends
                                    </li>
                                    <li className="flex items-center text-brand-slate">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                                        Rapid installation turnaround
                                    </li>
                                </ul>
                            </div>

                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-brand-navy text-white p-8 rounded-[2.5rem] sticky top-24 shadow-2xl">
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-2">Get a Quote</h3>
                                    <p className="text-brand-steel text-sm">
                                        Book a technician for your {location.suburb} property today.
                                    </p>
                                </div>
                                <ContactForm />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
