'use client'

import Link from 'next/link'
import Image from 'next/image'

import { ArrowRight } from 'lucide-react'
import seoData from '@/app/data/seoData.json'

export function ServiceCarousel() {
    const services = seoData.primaryServicePages

    return (
        <ul className="w-full flex flex-col xl:flex-row h-[800px] md:h-[600px] xl:h-[300px] gap-2 md:gap-4 overflow-hidden m-0 p-0">
            {services.map((service, index) => {
                const slug = service.page.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()

                return (
                    <li 
                        key={`${service.page}-${index}`} 
                        className={`list-none flex-1 group hover:grow-[8] transition-all duration-500 ease-in-out rounded-[2rem] cursor-pointer bg-brand-navy border border-brand-steel/20 shadow-[0_10px_30px_-15px_rgba(10,25,47,0.5)] hover:shadow-2xl hover:shadow-brand-electric/20 hover:border-brand-electric/50 relative overflow-hidden focus-within:ring-2 focus-within:ring-brand-electric focus-within:outline-none`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-electric/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

                        <Link href={`/services/${slug}`} className="block w-full h-full relative z-10 focus:outline-none">
                            
                            {/* Collapsed State */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none p-2 w-full h-full">
                                <h3 className="xl:-rotate-90 xl:whitespace-nowrap text-sm xl:text-lg font-black uppercase tracking-tighter text-brand-white group-hover:text-brand-electric transition-colors drop-shadow-md text-center line-clamp-1 xl:line-clamp-none">
                                    {service.page}
                                </h3>
                            </div>

                            {/* Expanded State */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center py-4 px-3 md:px-6 text-center bg-brand-navy/60 backdrop-blur-md">
                                <div className="mb-2 transform transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(0,229,255,0.5)] w-12 h-12 relative flex items-center justify-center bg-brand-white/5 rounded-xl border border-brand-white/10 shadow-inner group-hover:-rotate-3">
                                    <div className="absolute inset-0 bg-brand-electric/20 mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
                                    {service.iconPath ? (
                                        <Image
                                            src={service.iconPath}
                                            alt={`${service.page} icon`}
                                            width={24}
                                            height={24}
                                            className="object-contain filter drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"
                                        />
                                    ) : (
                                        <div className="w-6 h-6 rounded-full bg-brand-electric/50" />
                                    )}
                                </div>
                                
                                <h3 className="text-sm md:text-xl font-black uppercase tracking-tighter text-brand-white mb-2 max-w-[90%] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                    {service.page}
                                </h3>
                                
                                <p className="text-brand-steel text-[10px] md:text-xs font-medium max-w-[200px] md:max-w-sm mb-3 drop-shadow leading-relaxed line-clamp-2 md:line-clamp-3 hidden sm:block">
                                    {service.description}
                                </p>
                                
                                <span className="mt-auto sm:mt-0 inline-flex items-center justify-center bg-brand-white/10 hover:bg-brand-electric/20 text-brand-electric hover:text-brand-white px-4 py-1.5 rounded-full font-bold text-[10px] transition-colors border border-brand-electric/30 shadow-[0_0_10px_rgba(0,229,255,0.2)] uppercase tracking-wider">
                                    Details <ArrowRight className="w-3.5 h-3.5 ml-2" />
                                </span>
                            </div>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

