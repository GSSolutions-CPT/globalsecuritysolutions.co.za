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

    // Vibrant, high-contrast color palette inspired by modern UI trends
    const vibrantColors = [
        "bg-[#E52D27]", // Bright Red
        "bg-[#F7CE46]", // Lemon Yellow
        "bg-[#2B9DF4]", // Vivid Blue
        "bg-[#46F7A8]", // Mint Green
        "bg-[#8B2BF4]", // Bright Purple
        "bg-[#F42B76]", // Hot Pink
    ];

    return (
        <ul className="w-full flex flex-col md:flex-row h-[500px] md:h-[300px] gap-2 overflow-hidden m-0 p-0">
            {sectors.map((sector, index) => {
                const slug = sector.page.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()
                const bgColor = vibrantColors[index % vibrantColors.length]

                return (
                    <li 
                        key={`${sector.page}-${index}`} 
                        className={`list-none relative flex-1 group hover:grow-[5] transition-all duration-500 ease-in-out overflow-hidden rounded-[2.5rem] cursor-pointer ${bgColor} shadow-lg`}
                    >
                        <Link href={`/sectors/${slug}`} className="block w-full h-full relative z-10">
                            
                            {/* Collapsed State - Horizontal on Mobile, Rotated Vertical on Desktop */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none p-4">
                                <h3 className="md:-rotate-90 md:whitespace-nowrap text-lg md:text-xl font-black uppercase tracking-tighter text-white drop-shadow-md text-center">
                                    {sector.page}
                                </h3>
                            </div>

                            {/* Expanded State */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center py-8 px-4 md:px-8 text-center bg-black/5">
                                {/* Filter to ensure the icon is white to contrast nicely with the vibrant background */}
                                <div className="mb-2 md:mb-4 transform transition-transform duration-500 group-hover:scale-110 drop-shadow-xl brightness-0 invert scale-75">
                                    {getSectorIcon(sector.page)}
                                </div>
                                
                                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white mb-2 drop-shadow-md">
                                    {sector.page}
                                </h3>
                                
                                <p className="text-white/95 text-[10px] md:text-xs font-medium max-w-[220px] md:max-w-[280px] mb-4 md:mb-6 drop-shadow leading-relaxed line-clamp-2 md:line-clamp-3">
                                    {sector.description}
                                </p>
                                
                                <span className="mt-auto md:mt-0 inline-flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-1.5 rounded-full font-bold text-xs transition-colors border border-white/20 shadow-lg">
                                    View Sector <ArrowRight className="w-4 h-4 ml-2" />
                                </span>
                            </div>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}
