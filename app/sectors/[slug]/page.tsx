import seoData from '@/app/data/seoData.json'
import { ContactForm } from '@/components/ContactForm'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { CheckCircle2, ShieldAlert, BadgeCheck, Smartphone, Zap, Clock, ArrowRight, Building, Home, Factory, Tractor, School, LayoutDashboard } from 'lucide-react'
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

// Find sector by slug
const getSector = (slug: string) => {
    return seoData.sectorSolutions.find(s => toSlug(s.page) === slug)
}

interface SectorData {
    page: string
    title: string
    description: string
    longDescription?: string
    iconPath?: string
    heroImage?: string
    brands?: string[]
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params
    const sector = getSector(params.slug)
    if (!sector) return {}

    return {
        title: sector.title,
        description: sector.description,
    }
}

export default async function SectorPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params
    const rawSector = getSector(params.slug)

    if (!rawSector) {
        notFound()
    }

    const sector = rawSector as SectorData

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans">

            {/* Hero Section */}
            <section className="relative bg-slate-950 text-white py-20 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-blue-900/0 z-10" />
                    <Image
                        src={sector.heroImage || "/hero-bg.jpg"}
                        alt={sector.title}
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                </div>

                <div className="container relative z-20 mx-auto px-4">
                    <div className="mb-8">
                        <Breadcrumbs items={[{ label: 'Sectors', href: '/sectors' }, { label: sector.page, href: '#' }]} />
                    </div>

                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Sector Specialist
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
                            {sector.page} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Security Solutions</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                            {sector.description}
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
                                <div className="w-20 h-20 bg-blue-50 rounded-2xl p-4 flex-shrink-0 border border-blue-100 flex items-center justify-center text-blue-600">
                                    {sector.page.includes('Residential') ? <Home className="w-10 h-10" /> :
                                        sector.page.includes('Commercial') ? <Building className="w-10 h-10" /> :
                                            sector.page.includes('Industrial') ? <Factory className="w-10 h-10" /> :
                                                sector.page.includes('Farm') ? <Tractor className="w-10 h-10" /> :
                                                    sector.page.includes('School') ? <School className="w-10 h-10" /> :
                                                        sector.page.includes('Estate') ? <LayoutDashboard className="w-10 h-10" /> :
                                                            <Building className="w-10 h-10" />}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Tailored for {sector.page}</h2>
                                    <p className="text-slate-600 text-lg leading-relaxed">
                                        {sector.longDescription || `Global Security Solutions understands the unique challenges of ${sector.page}. We provide customized security architectures that integrate seamlessly with your operations.`}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Problem / Solution Split */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
                                <div className="flex items-center gap-3 mb-4 text-red-700">
                                    <ShieldAlert className="w-6 h-6" />
                                    <h3 className="text-lg font-bold">Sector Risks</h3>
                                </div>
                                <p className="text-slate-700 leading-relaxed">
                                    Security threats in the <strong>{sector.page}</strong> sector are evolving. Criminals target vulnerabilities specific to this environment, from perimeter breaches to specialized asset theft.
                                </p>
                            </div>
                            <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
                                <div className="flex items-center gap-3 mb-4 text-emerald-700">
                                    <BadgeCheck className="w-6 h-6" />
                                    <h3 className="text-lg font-bold">Our Strategy</h3>
                                </div>
                                <p className="text-slate-700 leading-relaxed">
                                    We implement a threat-specific defense strategy. By combining physical barriers with intelligent monitoring, we create a secure environment optimized for {sector.page} operations.
                                </p>
                            </div>
                        </div>

                        {/* Feature Grid */}
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                                <span className="bg-blue-600 w-2 h-8 rounded-full mr-4"></span>
                                Why Choose Us
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { icon: Smartphone, title: "Remote Management", text: "Control multiple sites from a single dashboard." },
                                    { icon: Zap, title: "Power Redundancy", text: "Systems designed to withstand load shedding." },
                                    { icon: Clock, title: "Proactive Monitoring", text: "Early warning cues prevent incidents." },
                                    { icon: CheckCircle2, title: "Compliance Ready", text: "Installations meet all insurance and safety regulations." }
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
                                    <h3 className="text-xl font-bold mb-2">Sector-Specific Hardware</h3>
                                    <p className="text-slate-400 text-sm max-w-md">
                                        We use equipment proven to perform in this specific environment. For {toSlug(sector.page).replace(/-/g, ' ')}, we trust:
                                    </p>
                                </div>
                                <div className="flex gap-4 flex-wrap justify-center">
                                    {(sector.brands || ['Hikvision', 'Paradox', 'Nemtek', 'Centurion']).map((brand) => (
                                        <span key={brand} className="px-4 py-2 bg-white/10 rounded-lg text-sm font-bold backdrop-blur-sm border border-white/10">
                                            {brand}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-3xl text-white text-center">
                            <h3 className="text-2xl font-bold mb-4">Secure Your Environment Today</h3>
                            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
                                Don&apos;t wait for an incident. Contact our {sector.page} specialists for a comprehensive risk assessment.
                            </p>
                        </div>

                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-8">
                            <div className="bg-white p-6 rounded-[2rem] border border-blue-100 shadow-lg shadow-blue-500/5">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Get a Free Assessment</h3>
                                <p className="text-slate-500 text-sm mb-6">Expert security advice for your specific sector.</p>
                                <ContactForm />
                            </div>

                            {/* Other Sectors Links */}
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                                <h4 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-wider">Other Sectors</h4>
                                <ul className="space-y-3">
                                    {seoData.sectorSolutions
                                        .filter(s => s.page !== sector.page)
                                        .map(s => (
                                            <li key={s.page}>
                                                <Link href={`/sectors/${toSlug(s.page)}`} className="text-slate-600 hover:text-blue-600 text-sm flex items-center group transition-colors">
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
