import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Target, Zap } from 'lucide-react'
import seoData from '../data/seoData.json'
import { ContactForm } from '@/components/ContactForm'

const toSlug = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim()
}

const getSectorIcon = (sector: string) => {
    switch (sector) {
        case 'Residential Security':
            return <Image src="/icons/residential-security.png" alt={sector} width={80} height={80} className="w-20 h-20 object-contain mb-6 group-hover:scale-110 transition-transform duration-300" />
        case 'Commercial Security':
            return <Image src="/icons/commercial-security.png" alt="Commercial" width={64} height={64} className="w-16 h-16 object-contain mb-6 group-hover:scale-110 transition-transform duration-300" />
        case 'Industrial Security':
            return <Image src="/icons/industrial-security.png" alt="Industrial" width={64} height={64} className="w-16 h-16 object-contain mb-6 group-hover:scale-110 transition-transform duration-300" />
        case 'Estate Security Management':
            return <Image src="/icons/estate-security.png" alt={sector} width={80} height={80} className="w-20 h-20 object-contain mb-6 group-hover:scale-110 transition-transform duration-300" />
        case 'Farm Security Systems':
            return <Image src="/icons/farm-security-v2.png" alt={sector} width={80} height={80} className="w-20 h-20 object-contain mb-6 group-hover:scale-110 transition-transform duration-300" />
        case 'Schools & Education':
            return <Image src="/icons/education-security.png" alt={sector} width={80} height={80} className="w-20 h-20 object-contain mb-6 group-hover:scale-110 transition-transform duration-300" />
        default:
            return <Image src="/icons/commercial-security.png" alt={sector} width={80} height={80} className="w-20 h-20 object-contain mb-6 group-hover:scale-110 transition-transform duration-300" />
    }
}

export const metadata = {
    title: 'Security Sectors | Global Security Solutions',
    description: 'Specialized security solutions for residential, commercial, industrial, agricultural, and estate sectors in Cape Town.',
}

export default function SectorsPage() {
    const sectors = [
        "Residential Security",
        "Commercial Security",
        "Industrial Security",
        "Farm Security Systems",
        "Estate Security Management",
        "Schools & Education"
    ]

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans">

            {/* Hero Section */}
            <section className="relative bg-slate-950 text-white min-h-[60vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-blue-950/10 z-10" />
                    <Image
                        src="/page-heroes/sectors-hero.png"
                        alt="Security Solutions"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                </div>

                <div className="container relative z-20 mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 backdrop-blur-sm">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Industry Specific Solutions</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
                        Security Tailored to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Your Environment</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
                        We understand that a farm requires different protection than a retail store.
                        Our sector-specific approach ensures you get the exact defense architecture your property needs.
                    </p>
                </div>
            </section>

            {/* Main Content Area */}
            <div className="container mx-auto px-4 py-20">

                {/* Sector Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                    {sectors.map((sector, index) => {
                        const slug = toSlug(sector)
                        const seoItem = seoData.sectorSolutions.find(item =>
                            item.page === sector ||
                            item.title.includes(sector) ||
                            (sector.includes('Commercial') && item.page.includes('Commercial')) ||
                            (sector.includes('Farms') && item.page.includes('Farm')) ||
                            (sector.includes('Estates') && item.page.includes('Estate')) ||
                            (sector.includes('Schools') && item.page.includes('Schools'))
                        )

                        return (
                            <Link
                                key={index}
                                href={`/sectors/${slug}`}
                                className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group border border-slate-100 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500" />

                                <div className="relative z-10 w-full flex flex-col items-center">
                                    {getSectorIcon(sector)}

                                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                                        {sector}
                                    </h3>

                                    <p className="text-slate-600 mb-8 text-sm leading-relaxed line-clamp-3">
                                        {seoItem ? seoItem.description : 'Specialized protection for this sector.'}
                                    </p>

                                    <span className="mt-auto inline-flex items-center text-blue-600 font-bold uppercase tracking-wider text-xs bg-blue-50 px-6 py-3 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        Explore Solutions <ArrowRight className="w-4 h-4 ml-2" />
                                    </span>
                                </div>
                            </Link>
                        )
                    })}
                </div>

                {/* Why Specialization Matters */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
                            Why One Size <span className="text-blue-600">Doesn&apos;t</span> Fit All
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Generic security companies install the same kit everywhere. We know that risk profiles differ fundamentally between sectors. Our specialized approach means:
                        </p>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                                    <Target className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">Focused Risk Assessment</h4>
                                    <p className="text-slate-600 text-sm">We look for sector-specific vulnerabilities that others miss.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">Optimized Hardware</h4>
                                    <p className="text-slate-600 text-sm">Industrial sites need ruggedized gear; homes need aesthetics. We choose accordingly.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/30 rounded-full blur-3xl" />
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-6">Ready for an Expert Opinion?</h3>
                            <p className="text-slate-300 mb-8">
                                Stop guessing with your security. Get a professional assessment tailored to your industry.
                            </p>
                            <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
