import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ShieldAlert, BadgeCheck, ArrowRight } from 'lucide-react'
import { masterBusinessData } from '@/utils/generateSchema'
import seoData from '@/app/data/seoData.json'

const ContactForm = dynamic(() => import('@/components/ContactForm').then(mod => mod.ContactForm), {
    loading: () => <div className="h-[500px] w-full animate-pulse bg-brand-navy/5 rounded-2xl border border-brand-steel/10 flex items-center justify-center text-brand-steel">Loading secure form...</div>
});

const toSlug = (text: string) => {
    return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()
}

export const metadata: Metadata = {
    title: 'CCTV Installation Durbanville | Hikvision Camera Systems | Global Security Solutions',
    description: 'Protect your Durbanville property with HD CCTV. We install AI-powered Hikvision AcuSense cameras with mobile viewing and battery backups. Get a free quote.',
    alternates: {
        canonical: 'https://globalsecuritysolutions.co.za/locations/durbanville/cctv-installation'
    },
    openGraph: {
        title: 'CCTV Installation Durbanville | Hikvision Camera Systems',
        description: 'Protect your Durbanville property with HD CCTV. We install AI-powered Hikvision AcuSense cameras with mobile viewing and battery backups. Get a free quote.',
        url: 'https://globalsecuritysolutions.co.za/locations/durbanville/cctv-installation',
        siteName: 'Global Security Solutions',
        images: [{
            url: '/services/heroes/cctv.jpg',
            width: 1200,
            height: 630,
            alt: 'CCTV Installation in Durbanville',
        }],
        type: 'website',
    }
}

export default function DurbanvilleCCTVPage() {
    return (
        <div className="flex flex-col min-h-screen bg-brand-white font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": ["Service", "LocalBusiness"],
                        "name": "Global Security Solutions - CCTV Installation Durbanville",
                        "url": "https://globalsecuritysolutions.co.za/locations/durbanville/cctv-installation",
                        "telephone": "+27629558559",
                        "description": "Expert Hikvision CCTV installation and camera repairs for homes and commercial businesses in Durbanville.",
                        "image": "https://globalsecuritysolutions.co.za/logo.png",
                        "areaServed": {
                            "@type": "City",
                            "name": "Durbanville",
                            "containedInPlace": {
                                "@type": "AdministrativeArea",
                                "name": "Western Cape"
                            }
                        },
                        "brand": [
                            { "@type": "Brand", "name": "Hikvision" },
                            { "@type": "Brand", "name": "Dahua" }
                        ],
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Cape Town",
                            "addressRegion": "Western Cape",
                            "addressCountry": "ZA"
                        },
                        "isAcceptingNewPatients": "false",
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "CCTV Services",
                            "itemListElement": [
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Hikvision AI Camera Installation"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Surveillance Battery Backup Integrations"
                                    }
                                }
                            ]
                        }
                    })
                }}
            />

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
                                "name": "Locations",
                                "item": "https://globalsecuritysolutions.co.za/areas"
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": "Durbanville",
                                "item": "https://globalsecuritysecuritysolutions.co.za/areas/durbanville-security-services"
                            },
                            {
                                "@type": "ListItem",
                                "position": 4,
                                "name": "CCTV Installation",
                                "item": "https://globalsecuritysolutions.co.za/locations/durbanville/cctv-installation"
                            }
                        ]
                    })
                }}
            />

            <section className="relative bg-brand-navy text-white min-h-[60vh] pt-32 pb-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-brand-navy/20 z-10" />
                    <Image
                        src="/services/heroes/cctv.jpg"
                        alt="High-definition IP CCTV camera monitoring a Durbanville property perimeter"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                </div>

                <div className="container relative z-20 mx-auto px-4">
                    <div className="mb-8">
                        <Breadcrumbs items={[
                            { label: 'Locations', href: '/areas' },
                            { label: 'Durbanville', href: '/areas/durbanville-security-services' },
                            { label: 'CCTV Installation', href: '#' }
                        ]} />
                    </div>

                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-electric/10 border border-brand-electric/20 text-brand-electric text-sm font-medium mb-6 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-brand-electric"></span>
                            Local Durbanville Experts
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
                            HD CCTV Installation & Repairs <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electric to-brand-electric">in Durbanville</span>
                        </h1>
                        <p className="text-xl text-brand-steel/60 max-w-2xl leading-relaxed">
                            Protect your Durbanville property with HD CCTV. We install AI-powered Hikvision AcuSense cameras with mobile viewing and heavy-duty load shedding backups.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-6 -mt-10 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-brand-steel/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-electric/10 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                                <div className="w-20 h-20 bg-brand-electric/10 rounded-2xl p-4 flex-shrink-0 border border-brand-electric/20">
                                    <Image
                                        src="/icons/cctv-surveillance-systems.png"
                                        alt="CCTV icon"
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-contain filter brightness-0"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-brand-navy mb-4">Proactive Surveillance for the Northern Suburbs</h2>
                                    <p className="text-brand-slate text-lg leading-relaxed">
                                        Property crime and opportunistic theft in the Northern Suburbs require proactive visibility. We install, upgrade, and repair high-definition CCTV systems for residential estates and commercial businesses across Durbanville. 
                                        <br/><br/>
                                        Whether you need a 4-camera Hikvision dome setup for a townhouse near Durbanville CBD or a long-range PTZ surveillance network for a wine estate along the Tygerberg hills, our systems are built with heavy-duty power backups to guarantee uninterrupted recording during stage 6 load shedding.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
                                <div className="flex items-center gap-3 mb-4 text-red-700">
                                    <ShieldAlert className="w-6 h-6" />
                                    <h3 className="text-lg font-bold">The Risk</h3>
                                </div>
                                <p className="text-brand-slate leading-relaxed">
                                    Relying on outdated, grainy analog camera footage renders post-incident investigations useless. Without proactive alerts, a break-in often goes entirely unnoticed until the morning, leaving your Durbanville property vulnerable.
                                </p>
                            </div>
                            <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
                                <div className="flex items-center gap-3 mb-4 text-emerald-700">
                                    <BadgeCheck className="w-6 h-6" />
                                    <h3 className="text-lg font-bold">The Solution</h3>
                                </div>
                                <p className="text-brand-slate leading-relaxed">
                                    We deploy AI-powered smart cameras that serve as active deterrents. With built-in strobe lights, sirens, and instant line-crossing push notifications natively on your mobile phone, intruders are warned off before they even breach a door.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-brand-navy mb-8 flex items-center">
                                <span className="bg-brand-electric w-2 h-8 rounded-full mr-4"></span>
                                Key CCTV Features
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex gap-4 p-6 bg-white rounded-2xl border border-brand-steel/20 shadow-sm">
                                    <div className="bg-brand-electric/10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-brand-electric font-black">1</div>
                                    <div>
                                        <h4 className="font-bold text-brand-navy mb-1">Hikvision AcuSense AI</h4>
                                        <p className="text-brand-steel text-sm">Distinguishes between humans, vehicles, and pets—drastically reducing false alarms triggered by wind or animals.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-6 bg-white rounded-2xl border border-brand-steel/20 shadow-sm">
                                    <div className="bg-brand-electric/10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-brand-electric font-black">2</div>
                                    <div>
                                        <h4 className="font-bold text-brand-navy mb-1">ColorVu Night Vision</h4>
                                        <p className="text-brand-steel text-sm">Capture full-color, ultra-HD 4K footage even in the dead of night, providing superior evidence.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-6 bg-white rounded-2xl border border-brand-steel/20 shadow-sm">
                                    <div className="bg-brand-electric/10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-brand-electric font-black">3</div>
                                    <div>
                                        <h4 className="font-bold text-brand-navy mb-1">Remote Mobile Access</h4>
                                        <p className="text-brand-steel text-sm">View live and recorded camera feeds securely from anywhere in the world on your smartphone.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-6 bg-white rounded-2xl border border-brand-steel/20 shadow-sm">
                                    <div className="bg-brand-electric/10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-brand-electric font-black">4</div>
                                    <div>
                                        <h4 className="font-bold text-brand-navy mb-1">Load Shedding Resilient</h4>
                                        <p className="text-brand-steel text-sm">Heavy-duty power backups ensure DVR/NVRs and cameras stay actively recording during outages.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-brand-navy text-white p-8 rounded-3xl relative overflow-hidden">
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Trusted CCTV Brands</h3>
                                    <p className="text-brand-steel text-sm max-w-md">
                                        We refuse to install generic, unreliable hardware in Durbanville. We exclusively use:
                                    </p>
                                </div>
                                <div className="flex gap-4 flex-wrap justify-center">
                                    {['Hikvision', 'Dahua', 'Uniview', 'Provision-ISR'].map((brand) => (
                                        <span key={brand} className="px-4 py-2 bg-white/10 rounded-lg text-sm font-bold backdrop-blur-sm border border-white/10">
                                            {brand}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-8">
                            <div className="bg-white p-6 rounded-[2rem] border border-brand-electric/20 shadow-lg shadow-brand-electric/5">
                                <h3 className="text-xl font-bold text-brand-navy mb-2">Request a Free CCTV Audit in Durbanville</h3>
                                <p className="text-brand-steel text-sm mb-6">Fill in your details and we&apos;ll schedule a local site visit shortly.</p>
                                <ContactForm />
                            </div>

                            <div className="bg-brand-white p-6 rounded-3xl border border-brand-steel/40">
                                <h4 className="font-bold text-brand-navy mb-4 uppercase text-xs tracking-wider">Other Local Services</h4>
                                <ul className="space-y-3">
                                    <li>
                                        <Link href="/locations/durbanville/alarm-systems" className="text-brand-slate hover:text-brand-electric text-sm flex items-center group transition-colors">
                                            <ArrowRight className="w-4 h-4 mr-2 text-brand-steel/60 group-hover:text-brand-electric transition-colors" />
                                            Alarm Systems
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/locations/durbanville/access-control" className="text-brand-slate hover:text-brand-electric text-sm flex items-center group transition-colors">
                                            <ArrowRight className="w-4 h-4 mr-2 text-brand-steel/60 group-hover:text-brand-electric transition-colors" />
                                            Biometric Access Control
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
