import seoData from '@/app/data/seoData.json'
import { masterBusinessData } from '@/utils/generateSchema'
import { ContactForm } from '@/components/ContactForm'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { CheckCircle2, ShieldAlert, BadgeCheck, Smartphone, Zap, Clock, ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import Link from 'next/link'
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

interface ServiceData {
    page: string
    title: string
    description: string
    longDescription?: string
    iconPath?: string
    features?: string[]
    brands?: string[]
    heroImage?: string
    heroAlt?: string
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
    const rawService = getService(params.slug)

    if (!rawService) {
        notFound()
    }

    const service = rawService as ServiceData

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
            {/* Service Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": service.title,
                        "description": service.description,
                        "provider": {
                            ...masterBusinessData
                        },
                        "serviceType": service.page,
                        "areaServed": masterBusinessData.areaServed,
                        "brand": (service.brands || ['Hikvision', 'Paradox', 'Ajax', 'IDS']).map(brand => ({
                            "@type": "Brand",
                            "name": brand
                        }))
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
                                "name": "Services",
                                "item": "https://globalsecuritysolutions.co.za/services"
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": service.page,
                                "item": `https://globalsecuritysolutions.co.za/services/${toSlug(service.page)}`
                            }
                        ]
                    })
                }}
            />

            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "How long does installation take?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Most residential installations are completed within 1-2 days. We work neatly and clean up after ourselves."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Is there a warranty?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, we provide a 12-month workmanship guarantee alongside standard manufacturer warranties (typically 1-3 years)."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Can I upgrade my existing system?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Often yes. We can assess your current hardware and see if it can be integrated with newer smart modules or used as a base for expansion."
                                }
                            }
                        ]
                    })
                }}
            />

            {/* Hero Section */}
            <section className="relative bg-slate-950 text-white min-h-[60vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-blue-950/10 z-10" />
                    <Image
                        src={service.heroImage || "/hero-bg.jpg"}
                        alt={service.heroAlt || service.title}
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                </div>

                <div className="container relative z-20 mx-auto px-4">
                    <div className="mb-8">
                        <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: service.page, href: '#' }]} />
                    </div>

                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Professional Installation
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
                            {service.page} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">in Cape Town</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                            {service.description}
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16 -mt-10 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Intro Card */}
                        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-slate-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                                {service.iconPath && (
                                    <div className="w-20 h-20 bg-blue-50 rounded-2xl p-4 flex-shrink-0 border border-blue-100">
                                        <Image
                                            src={service.iconPath}
                                            alt={`${service.page} icon`}
                                            width={80}
                                            height={80}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                )}
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Secure Your Property Today</h2>
                                    <p className="text-slate-600 text-lg leading-relaxed">
                                        {service.longDescription || `Global Security Solutions is Cape Town's premier provider of ${service.page}. We combine cutting-edge technology with expert workmanship to ensure your property is never left vulnerable.`}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Problem / Solution Split */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
                                <div className="flex items-center gap-3 mb-4 text-red-700">
                                    <ShieldAlert className="w-6 h-6" />
                                    <h3 className="text-lg font-bold">The Risk</h3>
                                </div>
                                <p className="text-slate-700 leading-relaxed">
                                    Without reliable <strong>{service.page}</strong>, your property has blind spots. Criminals target easy access points and outdated systems, putting your assets and family at risk.
                                </p>
                            </div>
                            <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
                                <div className="flex items-center gap-3 mb-4 text-emerald-700">
                                    <BadgeCheck className="w-6 h-6" />
                                    <h3 className="text-lg font-bold">The Solution</h3>
                                </div>
                                <p className="text-slate-700 leading-relaxed">
                                    Our intelligent <strong>{service.page}</strong> acts as a proactive shield. We don&apos;t just record crime; we deter it with visible, high-tech barriers and instant alerts.
                                </p>
                            </div>
                        </div>

                        {/* Feature Grid */}
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                                <span className="bg-blue-600 w-2 h-8 rounded-full mr-4"></span>
                                Key Features
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { icon: Smartphone, title: "Mobile Control", text: "Arm, disarm, and view live feeds from your phone." },
                                    { icon: Zap, title: "Load Shedding Ready", text: "Systems stay online with robust battery backups." },
                                    { icon: Clock, title: "24/7 Monitoring", text: "Instant alerts to you and armed response." },
                                    { icon: CheckCircle2, title: "Certified Installers", text: "Fully accredited and insured installation team." }
                                ].map((feature, i) => (
                                    <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-blue-600">
                                            <feature.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">{feature.title}</h4>
                                            <p className="text-slate-500 text-sm">{feature.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Brands We Use */}
                        <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden">
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Trusted Brands Only</h3>
                                    <p className="text-slate-400 text-sm max-w-md">
                                        We refuse to install generic, unreliable hardware. For {toSlug(service.page).replace(/-/g, ' ')}, we use only:
                                    </p>
                                </div>
                                <div className="flex gap-4 flex-wrap justify-center">
                                    {(service.brands || ['Hikvision', 'Paradox', 'Ajax', 'IDS']).map((brand) => (
                                        <span key={brand} className="px-4 py-2 bg-white/10 rounded-lg text-sm font-bold backdrop-blur-sm border border-white/10">
                                            {brand}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="bg-slate-50 border-t border-slate-200 pt-12">
                            <h3 className="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h3>
                            <div className="space-y-4">
                                <div className="bg-white p-6 rounded-2xl border border-slate-200">
                                    <h4 className="font-bold text-slate-900 mb-2">How long does installation take?</h4>
                                    <p className="text-slate-600">Most residential installations are completed within 1-2 days. We work neatly and clean up after ourselves.</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-slate-200">
                                    <h4 className="font-bold text-slate-900 mb-2">Is there a warranty?</h4>
                                    <p className="text-slate-600">Yes, we provide a 12-month workmanship guarantee alongside standard manufacturer warranties (typically 1-3 years).</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-slate-200">
                                    <h4 className="font-bold text-slate-900 mb-2">Can I upgrade my existing system?</h4>
                                    <p className="text-slate-600">Often yes. We can assess your current hardware and see if it can be integrated with newer smart modules or used as a base for expansion.</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-8">
                            <div className="bg-white p-6 rounded-[2rem] border border-blue-100 shadow-lg shadow-blue-500/5">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Get a Free Quote</h3>
                                <p className="text-slate-500 text-sm mb-6">Fill in your details and we&apos;ll call you back shortly.</p>
                                <ContactForm />
                            </div>

                            {/* Other Services Links */}
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                                <h4 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-wider">Other Services</h4>
                                <ul className="space-y-3">
                                    {seoData.primaryServicePages
                                        .filter(s => s.page !== service.page)
                                        .slice(0, 5)
                                        .map(s => (
                                            <li key={s.page}>
                                                <Link href={`/services/${toSlug(s.page)}`} className="text-slate-600 hover:text-blue-600 text-sm flex items-center group transition-colors">
                                                    <ArrowRight className="w-4 h-4 mr-2 text-slate-300 group-hover:text-blue-600 transition-colors" />
                                                    {s.page}
                                                </Link>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
