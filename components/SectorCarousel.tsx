'use client'

import Link from 'next/link'
import { ArrowRight, Home, Building2, Factory, Tractor, Users2, Building } from 'lucide-react'
import seoData from '@/app/data/seoData.json'

// Mapping icon names to Lucide icons 
const getIcon = (pageName: string) => {
    if (pageName.includes('Residential')) return Home
    if (pageName.includes('Commercial')) return Building2
    if (pageName.includes('Industrial')) return Factory
    if (pageName.includes('Farm')) return Tractor
    if (pageName.includes('Estate')) return Users2
    return Building
}

export function SectorCarousel() {
    const sectors = seoData.sectorSolutions

    return (
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            {/* Duplicating the list 4 times to ensure enough content for smooth scrolling since there are only 5 items */}
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-scroll-slow hover:[animation-play-state:paused]">
                {[...sectors, ...sectors, ...sectors, ...sectors].map((service, index) => {
                    const Icon = getIcon(service.page)
                    // Simplified toSlug logic
                    const slug = service.page.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()

                    return (
                        <li key={`${service.page}-${index}`} className="flex-shrink-0 w-[300px]">
                            <Link
                                href={`/services/${slug}`}
                                className="block h-full bg-white p-6 rounded-xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all group"
                            >
                                <div className="w-12 h-12 bg-indigo-50 rounded-lg shadow-sm flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors">
                                    <Icon className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                    {service.page}
                                </h3>
                                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                                    {service.description}
                                </p>
                                <span className="text-indigo-600 font-bold text-sm flex items-center">
                                    View Sector <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
