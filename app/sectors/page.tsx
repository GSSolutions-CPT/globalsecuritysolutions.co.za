import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import seoData from '../data/seoData.json'

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
            return <Image src="/icons/residential-security.png" alt={sector} width={80} height={80} className="w-20 h-20 object-contain mb-6" />
        case 'Commercial & Industrial':
            return <div className="flex gap-2 justify-center mb-6">
                <Image src="/icons/commercial-security.png" alt="Commercial" width={64} height={64} className="w-16 h-16 object-contain" />
                <Image src="/icons/industrial-security.png" alt="Industrial" width={64} height={64} className="w-16 h-16 object-contain" />
            </div>
        case 'HOA & Estates':
            return <Image src="/icons/estate-security.png" alt={sector} width={80} height={80} className="w-20 h-20 object-contain mb-6" />
        case 'Farms & Agricultural':
            return <Image src="/icons/farm-security-v2.png" alt={sector} width={80} height={80} className="w-20 h-20 object-contain mb-6" />
        case 'Schools & Education':
            return <Image src="/icons/education-security.png" alt={sector} width={80} height={80} className="w-20 h-20 object-contain mb-6" />
        case 'Retail & Shopping Malls':
            // Reuse Commercial for Retail if no specific retail icon
            return <Image src="/icons/commercial-security.png" alt={sector} width={80} height={80} className="w-20 h-20 object-contain mb-6" />
        default:
            return <Image src="/icons/commercial-security.png" alt={sector} width={80} height={80} className="w-20 h-20 object-contain mb-6" />
    }
}

export const metadata = {
    title: 'Security Sectors | Global Security Solutions',
    description: 'Specialized security solutions for residential, commercial, industrial, agricultural, and estate sectors in Cape Town.',
}

export default function SectorsPage() {
    const sectors = [
        "Residential Security",
        "Commercial & Industrial",
        "HOA & Estates",
        "Farms & Agricultural",
        "Schools & Education",
        "Retail & Shopping Malls"
    ]

    return (
        <div className="min-h-screen bg-slate-50 py-20">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Sectors We Serve</h1>
                    <p className="text-xl text-slate-600">
                        Tailored security strategies for every environment, from private homes to large-scale industrial operations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sectors.map((sector, index) => {
                        const slug = toSlug(sector)
                        // Find matching SEO data for description
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
                                href={`/services#${slug}`}
                                className="bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group border border-slate-50"
                            >
                                {/* Blue Dog Ear */}
                                <div className="absolute top-0 left-0 w-16 h-16 bg-blue-600 rounded-br-[3rem] z-0 transition-transform group-hover:scale-110" />

                                <div className="relative z-10 w-full flex flex-col items-center">
                                    {getSectorIcon(sector)}

                                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                        {sector}
                                    </h3>

                                    <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                                        {seoItem ? seoItem.description.substring(0, 100) + '...' : 'Specialized protection for this sector.'}
                                    </p>

                                    <span className="inline-flex items-center text-blue-600 font-bold uppercase tracking-wider text-xs bg-blue-50 px-4 py-2 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        View Solutions <ArrowRight className="w-4 h-4 ml-2" />
                                    </span>
                                </div>
                            </Link>
                        )
                    })}
                </div>

                {/* SEO Content Block */}
                <div className="mt-24 max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Tailored Security for Every Environment</h2>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        Security is not a "one size fits all" solution. The needs of a residential estate differ vastly from those of a high-risk industrial warehouse or a retail store.
                        That's why <strong>Global Security Solutions</strong> approaches every project with a fresh perspective, conducting a thorough risk assessment based on your specific sector's unique vulnerabilities.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                            <h3 className="font-bold text-indigo-900 mb-2">Residential Risks</h3>
                            <p className="text-slate-700 text-sm">Focus on perimeter early warning (beams/fencing) and family safety (panic buttons/safe zones).</p>
                        </div>
                        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                            <h3 className="font-bold text-indigo-900 mb-2">Commercial Risks</h3>
                            <p className="text-slate-700 text-sm">Focus on access control, staff attendance tracking, and high-definition surveillance for liability protection.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
