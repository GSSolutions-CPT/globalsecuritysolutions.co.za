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

export function SectorCarousel() {
    const sectors = seoData.sectorSolutions

    return (
        <ul className="w-full flex flex-col md:flex-row h-[500px] md:h-[300px] gap-2 md:gap-4 overflow-hidden m-0 p-0">
            {sectors.map((sector, index) => {
                const slug = sector.page.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()

                return (
                    <li 
                        key={`${sector.page}-${index}`} 
                        className={`list-none flex-1 group hover:grow-[5] transition-all duration-500 ease-in-out rounded-[2.5rem] cursor-pointer bg-brand-navy border border-brand-steel/20 shadow-[0_10px_30px_-15px_rgba(10,25,47,0.5)] hover:shadow-2xl hover:shadow-brand-electric/20 hover:border-brand-electric/50 relative overflow-hidden focus-within:ring-2 focus-within:ring-brand-electric focus-within:outline-none`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-electric/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

                        <Link href={`/sectors/${slug}`} className="block w-full h-full relative z-10 focus:outline-none">
                            
                            {/* Collapsed State - Horizontal on Mobile, Rotated Vertical on Desktop */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none p-4 w-full h-full">
                                <h3 className="md:-rotate-90 md:whitespace-nowrap text-lg md:text-xl font-black uppercase tracking-tighter text-brand-white group-hover:text-brand-electric transition-colors drop-shadow-md text-center line-clamp-1 md:line-clamp-none">
                                    {sector.page}
                                </h3>
                            </div>

                            {/* Expanded State */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center py-8 px-4 md:px-8 text-center bg-brand-navy/60 backdrop-blur-md">
                                
                                <div className="mb-2 md:mb-4 transform transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(0,229,255,0.5)] bg-brand-white/5 p-3 sm:p-4 rounded-full border border-brand-white/10 shadow-inner group-hover:rotate-6 flex items-center justify-center relative overflow-hidden">
                                     <div className="absolute inset-0 bg-brand-electric/20 mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                    {getSectorIcon(sector.page)}
                                </div>
                                
                                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-brand-white mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                    {sector.page}
                                </h3>
                                
                                <p className="text-brand-steel text-[10px] md:text-xs font-medium max-w-[220px] md:max-w-[280px] mb-4 md:mb-6 leading-relaxed line-clamp-2 md:line-clamp-3">
                                    {sector.description}
                                </p>
                                
                                <span className="mt-auto md:mt-0 inline-flex items-center justify-center bg-brand-white/10 hover:bg-brand-electric/20 text-brand-electric hover:text-brand-white px-5 py-2.5 rounded-full font-bold text-[10px] transition-colors border border-brand-electric/30 shadow-[0_0_15px_rgba(0,229,255,0.2)] uppercase tracking-wider">
                                    View Sector <ArrowRight className="w-3.5 h-3.5 ml-2" />
                                </span>
                            </div>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}
