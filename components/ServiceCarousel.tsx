'use client'

import Link from 'next/link'
import Image from 'next/image'

import { ArrowRight } from 'lucide-react'
import seoData from '@/app/data/seoData.json'

export function ServiceCarousel() {
    const services = seoData.primaryServicePages

    // Expanded vibrant palette for 12 items
    const vibrantColors = [
        "bg-[#FF3B30]", // Red
        "bg-[#FF9500]", // Orange
        "bg-[#FFCC00]", // Yellow
        "bg-[#4CD964]", // Green
        "bg-[#5AC8FA]", // Light Blue
        "bg-[#007AFF]", // Blue
        "bg-[#5856D6]", // Purple
        "bg-[#FF2D55]", // Pink
        "bg-[#E52D27]", // Crimson
        "bg-[#46F7A8]", // Mint
        "bg-[#8B2BF4]", // Bright Violet
        "bg-[#F7CE46]"  // Sunflower
    ];

    return (
        <ul className="w-full flex flex-col xl:flex-row h-[800px] md:h-[600px] xl:h-[300px] gap-2 overflow-hidden m-0 p-0">
            {services.map((service, index) => {
                const slug = service.page.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()
                const bgColor = vibrantColors[index % vibrantColors.length]

                return (
                    <li 
                        key={`${service.page}-${index}`} 
                        className={`list-none relative flex-1 group hover:grow-[8] transition-all duration-500 ease-in-out overflow-hidden rounded-[2rem] cursor-pointer ${bgColor} shadow-lg`}
                    >
                        <Link href={`/services/${slug}`} className="block w-full h-full relative z-10">
                            
                            <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none p-2">
                                <h3 className="xl:-rotate-90 xl:whitespace-nowrap text-sm xl:text-lg font-black uppercase tracking-tighter text-white drop-shadow-md text-center line-clamp-1 xl:line-clamp-none">
                                    {service.page}
                                </h3>
                            </div>

                            {/* Expanded State */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center py-4 px-3 md:px-6 text-center bg-black/5">
                                <div className="mb-2 transform transition-transform duration-500 group-hover:scale-110 drop-shadow-xl w-10 h-10 relative">
                                    {service.iconPath ? (
                                        <Image
                                            src={service.iconPath}
                                            alt={`${service.page} icon`}
                                            fill
                                            className="object-contain"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-white/20 rounded-full" />
                                    )}
                                </div>
                                
                                <h3 className="text-sm md:text-xl font-black uppercase tracking-tighter text-white mb-2 max-w-[90%] drop-shadow-md">
                                    {service.page}
                                </h3>
                                
                                <p className="text-white/95 text-[10px] md:text-xs font-medium max-w-[200px] md:max-w-sm mb-3 drop-shadow leading-relaxed line-clamp-2 md:line-clamp-3 hidden sm:block">
                                    {service.description}
                                </p>
                                
                                <span className="mt-auto sm:mt-0 inline-flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-1.5 rounded-full font-bold text-[10px] transition-colors border border-white/20 shadow-lg">
                                    Details <ArrowRight className="w-4 h-4 ml-2" />
                                </span>
                            </div>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

