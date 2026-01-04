'use client'

import Link from 'next/link'
import Image from 'next/image'

import { ArrowRight } from 'lucide-react'
import seoData from '@/app/data/seoData.json'

export function ServiceCarousel() {
    const services = seoData.primaryServicePages

    return (
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-scroll-slow hover:[animation-play-state:paused]">
                {[...services, ...services].map((service, index) => {
                    // Simplified toSlug logic
                    const slug = service.page.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()

                    return (
                        <li key={`${service.page}-${index}`} className="flex-shrink-0 w-[300px]">
                            <Link
                                href={`/services/${slug}`}
                                className="block h-full bg-white pt-12 pb-8 px-6 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.15)] hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden text-center"
                            >
                                {/* THE "APEX" BLUE DOG-EAR ACCENT */}
                                {/* This creates the blue shape at the top-left specific to the reference image */}
                                <div className="absolute top-0 left-0 w-24 h-24 bg-blue-600 rounded-br-[4rem] transition-transform duration-300 group-hover:scale-110 -translate-x-4 -translate-y-4 shadow-lg z-10" />

                                {/* Inner White Curve to refine the dog-ear shape if needed, or just let it be distinct */}
                                <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-blue-400/30 blur-sm z-20" />

                                <div className="relative z-10 flex flex-col items-center h-full">
                                    {/* Frameless Icon - Large & Clean */}
                                    <div className="w-24 h-24 mb-6 relative transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
                                        {service.iconPath ? (
                                            <Image
                                                src={service.iconPath}
                                                alt={`${service.page} icon`}
                                                fill
                                                className="object-contain drop-shadow-md"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-blue-100 rounded-full" />
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                                        {service.page}
                                    </h3>

                                    <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-3">
                                        {service.description}
                                    </p>

                                    {/* Minimalist Action */}
                                    <span className="mt-auto text-blue-600 font-bold text-sm flex items-center group-hover:underline decoration-2 underline-offset-4">
                                        View Details <ArrowRight className="w-4 h-4 ml-1" />
                                    </span>
                                </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
