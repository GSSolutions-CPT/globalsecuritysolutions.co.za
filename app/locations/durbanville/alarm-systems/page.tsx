import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ShieldAlert, BadgeCheck, ArrowRight } from 'lucide-react'
import { masterBusinessData } from '@/utils/generateSchema'

const ContactForm = dynamic(() => import('@/components/ContactForm').then(mod => mod.ContactForm), {
    loading: () => <div className="h-[500px] w-full animate-pulse bg-brand-navy/5 rounded-2xl border border-brand-steel/10 flex items-center justify-center text-brand-steel">Loading secure form...</div>
});

const toSlug = (text: string) => {
    return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()
}

export const metadata: Metadata = {
    title: 'Alarm Systems Durbanville | AJAX & Paradox Installations | Global Security Solutions',
    description: 'Upgrade your home security in Durbanville. We install wireless AJAX and Paradox alarm systems built to survive load shedding. Request a free security audit today.',
    alternates: {
        canonical: 'https://globalsecuritysolutions.co.za/locations/durbanville/alarm-systems'
    },
    openGraph: {
        title: 'Alarm Systems Durbanville | AJAX & Paradox Installations',
        description: 'Upgrade your home security in Durbanville. We install wireless AJAX and Paradox alarm systems built to survive load shedding. Request a free security audit today.',
        url: 'https://globalsecuritysolutions.co.za/locations/durbanville/alarm-systems',
        siteName: 'Global Security Solutions',
        images: [{
            url: '/services/heroes/alarm-system.png',
            width: 1200,
            height: 630,
            alt: 'Wireless Alarm System Installation in Durbanville',
        }],
        type: 'website',
    }
}

export default function DurbanvilleAlarmsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-brand-white font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": ["Service", "LocalBusiness"],
                        "name": "Global Security Solutions - Alarm Systems Durbanville",
                        "url": "https://globalsecuritysolutions.co.za/locations/durbanville/alarm-systems",
                        "telephone": "+27629558559",
                        "description": "Expert AJAX and Paradox wireless alarm system installations for homes and businesses across Durbanville.",
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
                            { "@type": "Brand", "name": "AJAX Systems" },
                            { "@type": "Brand", "name": "Paradox" },
                            { "@type": "Brand", "name": "IDS" }
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
                            "name": "Alarm Services",
                            "itemListElement": [
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Wireless Alarm Installations"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Alarm Load Shedding Battery Upgrades"
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
                                "item": "https://globalsecuritysolutions.co.za/areas/durbanville-security-services"
                            },
                            {
                                "@type": "ListItem",
                                "position": 4,
                                "name": "Alarm Systems",
                                "item": "https://globalsecuritysolutions.co.za/locations/durbanville/alarm-systems"
                            }
                        ]
                    })
                }}
            />

            <section className="relative bg-brand-navy text-white min-h-[60vh] pt-32 pb-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-brand-navy/20 z-10" />
                    <Image
                        src="/services/heroes/alarm-system.png"
                        alt="Professional AJAX wireless alarm system installation in a modern home in Durbanville"
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
                            { label: 'Alarm Systems', href: '#' }
                        ]} />
                    </div>

                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-electric/10 border border-brand-electric/20 text-brand-electric text-sm font-medium mb-6 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-brand-electric"></span>
                            Local Durbanville Experts
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
                            Wireless Alarm Systems <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electric to-brand-electric">in Durbanville</span>
                        </h1>
                        <p className="text-xl text-brand-steel/60 max-w-2xl leading-relaxed">
                            Upgrade your home security in Durbanville. We install wireless AJAX and Paradox alarm systems built to survive load shedding and provide precise perimeter warnings.
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
                                        src="/icons/alarm-system-installation.png"
                                        alt="Alarm icon"
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-contain filter brightness-0"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-brand-navy mb-4">Intelligent Protection That Bypasses the Grid</h2>
                                    <p className="text-brand-slate text-lg leading-relaxed">
                                        An outdated alarm is a liability. Global Security Solutions specializes in deploying rapid-response wireless and hybrid alarm systems for homes and businesses throughout Durbanville.
                                        <br/><br/>
                                        We install industry-leading Paradox and AJAX alarm control panels. These systems offer encrypted, unjammable wireless frequencies, meaning rapid installation without drilling and chasing wires through your walls. Crucially, every system includes high-capacity Lithium-Iron battery upgrades to outlast Eskom's load shedding.
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
                                    Without a robust battery-backed alarm system in Durbanville, load shedding instantly renders your property vulnerable. Outdated systems suffer from false triggers, desensitizing neighbors to real break-ins.
                                </p>
                            </div>
                            <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
                                <div className="flex items-center gap-3 mb-4 text-emerald-700">
                                    <BadgeCheck className="w-6 h-6" />
                                    <h3 className="text-lg font-bold">The Solution</h3>
                                </div>
                                <p className="text-brand-slate leading-relaxed">
                                    A smart, app-controlled wireless alarm acts as an active shield. Natively connected via Dual SIMs to armed response—independent of your home Wi-Fi—it guarantees your property is always armed and actively reporting.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-brand-navy mb-8 flex items-center">
                                <span className="bg-brand-electric w-2 h-8 rounded-full mr-4"></span>
                                Key Alarm System Features
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex gap-4 p-6 bg-white rounded-2xl border border-brand-steel/20 shadow-sm">
                                    <div className="bg-brand-electric/10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-brand-electric font-black">1</div>
                                    <div>
                                        <h4 className="font-bold text-brand-navy mb-1">AJAX & Paradox Experts</h4>
                                        <p className="text-brand-steel text-sm">We strictly install top-tier wireless systems that are unjammable and highly-encrypted.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-6 bg-white rounded-2xl border border-brand-steel/20 shadow-sm">
                                    <div className="bg-brand-electric/10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-brand-electric font-black">2</div>
                                    <div>
                                        <h4 className="font-bold text-brand-navy mb-1">Pet-Friendly Sensors</h4>
                                        <p className="text-brand-steel text-sm">Smart Passives (PIRs) are calibrated to ignore dogs and cats up to 25kg, universally preventing false alarms indoors.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-6 bg-white rounded-2xl border border-brand-steel/20 shadow-sm">
                                    <div className="bg-brand-electric/10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-brand-electric font-black">3</div>
                                    <div>
                                        <h4 className="font-bold text-brand-navy mb-1">Instant App Control</h4>
                                        <p className="text-brand-steel text-sm">Arm, disarm, or check battery status natively from your smartphone anywhere in the world.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-6 bg-white rounded-2xl border border-brand-steel/20 shadow-sm">
                                    <div className="bg-brand-electric/10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-brand-electric font-black">4</div>
                                    <div>
                                        <h4 className="font-bold text-brand-navy mb-1">Load Shedding Ready</h4>
                                        <p className="text-brand-steel text-sm">Deep-cycle Lithium-Iron battery pack installations ensure panels actively secure the house during blackouts.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-brand-navy text-white p-8 rounded-3xl relative overflow-hidden">
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Trusted Hardware Suppliers</h3>
                                    <p className="text-brand-steel text-sm max-w-md">
                                        For alarm systems in Durbanville, we rely exclusively on hardware built for South African conditions:
                                    </p>
                                </div>
                                <div className="flex gap-4 flex-wrap justify-center">
                                    {['AJAX Systems', 'Paradox', 'IDS'].map((brand) => (
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
                                <h3 className="text-xl font-bold text-brand-navy mb-2">Get an AJAX Alarm Quote</h3>
                                <p className="text-brand-steel text-sm mb-6">Drop your details and we&apos;ll schedule a free security review in Durbanville.</p>
                                <ContactForm />
                            </div>

                            <div className="bg-brand-white p-6 rounded-3xl border border-brand-steel/40">
                                <h4 className="font-bold text-brand-navy mb-4 uppercase text-xs tracking-wider">Other Local Services</h4>
                                <ul className="space-y-3">
                                    <li>
                                        <Link href="/locations/durbanville/cctv-installation" className="text-brand-slate hover:text-brand-electric text-sm flex items-center group transition-colors">
                                            <ArrowRight className="w-4 h-4 mr-2 text-brand-steel/60 group-hover:text-brand-electric transition-colors" />
                                            CCTV Installation
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
