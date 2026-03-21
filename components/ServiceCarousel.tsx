'use client'

import Link from 'next/link'
import Image from 'next/image'

import { ArrowRight } from 'lucide-react'
import seoData from '@/app/data/seoData.json'

export function ServiceCarousel() {
    const services = seoData.primaryServicePages

    return (
        <ul className="w-full flex flex-col xl:flex-row h-[800px] md:h-[600px] xl:h-[400px] gap-3 md:gap-4 overflow-hidden m-0 p-0">
            {services.map((service, index) => {
                const slug = service.page.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()

                return (
                    <li 
                        key={`${service.page}-${index}`} 
                        className={`list-none flex-1 group hover:grow-[10] transition-all duration-700 ease-in-out rounded-[2rem] cursor-pointer bg-brand-navy border border-brand-steel/20 shadow-[0_10px_30px_-15px_rgba(10,25,47,0.5)] hover:shadow-[0_0_40px_rgba(0,229,255,0.2)] hover:border-brand-electric/60 relative overflow-hidden focus-within:ring-2 focus-within:ring-brand-electric focus-within:outline-none isolate`}
                    >
                        {/* Premium Number Watermark */}
                        <div className="absolute -bottom-10 -right-4 text-[120px] font-black text-white/[0.03] select-none pointer-events-none group-hover:scale-125 transition-transform duration-700 z-0 leading-none">
                            {String(index + 1).padStart(2, '0')}
                        </div>

                        {/* Hover Overlay Glow */}
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-electric/20 via-brand-navy/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
                        <div className="absolute top-0 right-0 w-full h-[150px] bg-brand-electric/10 blur-[50px] opacity-0 group-hover:opacity-100 transition-duration-700 pointer-events-none z-0" />

                        <Link href={`/services/${slug}`} className="block w-full h-full relative z-10 focus:outline-none">
                            
                            {/* Collapsed State */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none w-full h-full">
                                <h3 className="xl:[writing-mode:vertical-rl] xl:rotate-180 text-sm xl:text-lg font-black uppercase tracking-widest text-brand-steel group-hover:text-brand-white transition-colors text-center line-clamp-1 xl:line-clamp-none px-2 py-4 whitespace-nowrap">
                                    {service.page}
                                </h3>
                            </div>

                            {/* Expanded State */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8 bg-brand-navy/30 backdrop-blur-md border-t border-white/5 mt-auto h-full">
                                
                                <div className="mb-auto transform transition-transform duration-700 group-hover:translate-y-0 translate-y-8 pt-4">
                                    <div className="w-14 h-14 relative flex items-center justify-center bg-brand-white/10 rounded-2xl border border-brand-white/20 shadow-inner backdrop-blur-md mb-6 inline-flex">
                                        <div className="absolute inset-0 bg-brand-electric/30 mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl blur-md" />
                                        {service.iconPath ? (
                                            <Image
                                                src={service.iconPath}
                                                alt={`${service.page} icon`}
                                                width={28}
                                                height={28}
                                                className="object-contain filter drop-shadow-[0_0_12px_rgba(0,229,255,0.8)] relative z-10"
                                            />
                                        ) : (
                                            <div className="w-6 h-6 rounded-full bg-brand-electric/80 relative z-10 shadow-[0_0_15px_rgba(0,229,255,0.5)]" />
                                        )}
                                    </div>
                                    
                                    <h3 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-brand-white mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none line-clamp-2 sm:line-clamp-none">
                                        {service.page}
                                    </h3>
                                    
                                    <div className="w-12 h-1 bg-brand-electric mb-4 rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
                                    
                                    <p className="text-brand-steel text-xs md:text-sm font-medium max-w-[280px] drop-shadow leading-relaxed line-clamp-3 hidden sm:block">
                                        {service.description}
                                    </p>
                                </div>
                                
                                <span className="inline-flex mt-6 items-center justify-center bg-brand-white text-brand-navy hover:bg-brand-electric hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] px-6 py-3 rounded-full font-black text-xs transition-all w-fit uppercase tracking-wider relative transform group-hover:translate-y-0 translate-y-8 duration-700 delay-100">
                                    Explore <ArrowRight className="w-4 h-4 ml-2" />
                                </span>
                            </div>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

