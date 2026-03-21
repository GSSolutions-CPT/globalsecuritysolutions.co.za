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
        <ul className="w-full flex flex-col md:flex-row h-[500px] md:h-[400px] gap-3 md:gap-4 overflow-hidden m-0 p-0">
            {sectors.map((sector, index) => {
                const slug = sector.page.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()

                return (
                    <li 
                        key={`${sector.page}-${index}`} 
                        className={`list-none flex-1 group hover:grow-[6] transition-all duration-700 ease-in-out rounded-[2.5rem] cursor-pointer bg-brand-navy border border-brand-steel/20 shadow-[0_10px_30px_-15px_rgba(10,25,47,0.5)] hover:shadow-2xl hover:shadow-brand-electric/20 hover:border-brand-electric/60 relative overflow-hidden focus-within:ring-2 focus-within:ring-brand-electric focus-within:outline-none isolate`}
                    >
                        {/* Premium Number Watermark */}
                        <div className="absolute -bottom-10 -right-4 text-[150px] font-black text-white/[0.03] select-none pointer-events-none group-hover:scale-110 transition-transform duration-700 z-0 leading-none">
                            {String(index + 1).padStart(2, '0')}
                        </div>

                        {/* Hover Overlay Glow */}
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-electric/20 via-brand-navy/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
                        
                        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-brand-electric/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-duration-700 pointer-events-none z-0" />

                        <Link href={`/sectors/${slug}`} className="block w-full h-full relative z-10 focus:outline-none">
                            
                            {/* Collapsed State - Horizontal on Mobile, Native Vertical Text on Desktop */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none w-full h-full">
                                <h3 className="md:[writing-mode:vertical-rl] md:rotate-180 text-xl font-black uppercase tracking-widest text-brand-steel group-hover:text-brand-white transition-colors text-center px-4 py-6 whitespace-nowrap drop-shadow-md">
                                    {sector.page}
                                </h3>
                            </div>

                            {/* Expanded State */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-10 bg-brand-navy/30 backdrop-blur-md border-t border-white/5 mt-auto h-full">
                                
                                <div className="mb-auto transform transition-transform duration-700 group-hover:translate-y-0 translate-y-8 pt-4">
                                    <div className="bg-brand-white/10 p-4 rounded-3xl border border-brand-white/20 shadow-inner group-hover:rotate-[5deg] flex items-center justify-center relative overflow-hidden w-20 h-20 mb-8 inline-flex">
                                         <div className="absolute inset-0 bg-brand-electric/30 mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-md" />
                                        <div className="relative z-10 drop-shadow-[0_0_12px_rgba(0,229,255,0.8)] filter brightness-[1.2]">
                                            {getSectorIcon(sector.page)}
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-brand-white mb-3 drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] leading-none line-clamp-2 md:line-clamp-none">
                                        {sector.page}
                                    </h3>

                                    <div className="w-16 h-1.5 bg-brand-electric mb-5 rounded-full shadow-[0_0_15px_rgba(0,229,255,0.5)]" />
                                    
                                    <p className="text-brand-steel text-sm md:text-base font-medium max-w-[280px] drop-shadow leading-relaxed line-clamp-3 md:line-clamp-4">
                                        {sector.description}
                                    </p>
                                </div>
                                
                                <span className="mt-8 inline-flex items-center justify-center bg-brand-white text-brand-navy hover:bg-brand-electric hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] px-8 py-4 rounded-full font-black text-sm transition-all border border-transparent uppercase tracking-wider w-fit transform group-hover:translate-y-0 translate-y-8 duration-700 delay-100">
                                    View Sector <ArrowRight className="w-5 h-5 ml-2" />
                                </span>
                            </div>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}
