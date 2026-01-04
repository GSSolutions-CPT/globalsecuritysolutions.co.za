'use client'

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from 'lucide-react';
import seoData from "@/app/data/seoData.json";

const getSectorIcon = (sector: string) => {
    switch (sector) {
        case 'Residential Security':
            return <Image src="/icons/residential-security.png" alt={sector} width={80} height={80} className="w-16 h-16 object-contain" />
        case 'Commercial Security':
            return <Image src="/icons/commercial-security.png" alt={sector} width={80} height={80} className="w-16 h-16 object-contain" />
        case 'Industrial Security':
            return <Image src="/icons/industrial-security.png" alt={sector} width={80} height={80} className="w-16 h-16 object-contain" />
        case 'Estate Security Management':
            return <Image src="/icons/estate-security.png" alt={sector} width={80} height={80} className="w-16 h-16 object-contain" />
        case 'Farm Security Systems':
            return <Image src="/icons/farm-security-v2.png" alt={sector} width={80} height={80} className="w-16 h-16 object-contain" />
        case 'Schools & Education':
            return <Image src="/icons/education-security.png" alt={sector} width={80} height={80} className="w-16 h-16 object-contain" />
        default:
            return <Image src="/icons/commercial-security.png" alt={sector} width={80} height={80} className="w-16 h-16 object-contain" />
    }
}

export function SectorGrid() {
    const sectors = seoData.sectorSolutions

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((service, index) => {
                // Simplified toSlug logic
                const slug = service.page.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()

                return (
                    <Link
                        key={`${service.page}-${index}`}
                        href={`/sectors/${slug}`}
                        className="group relative flex flex-col items-center text-center bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-300"
                    >
                        {/* Icon Container */}
                        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-900/50 transition-all duration-300 shadow-lg shadow-black/20">
                            {getSectorIcon(service.page)}
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                            {service.page}
                        </h3>

                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            {service.description}
                        </p>

                        <span className="mt-auto inline-flex items-center text-indigo-400 font-bold text-sm group-hover:text-indigo-300">
                            Explore Sector <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>
                )
            })}
        </div>
    )
}
