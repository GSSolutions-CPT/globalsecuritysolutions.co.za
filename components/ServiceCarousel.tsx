'use client'

import Link from 'next/link'
import { ArrowRight, Shield, Video, Lock, Zap, Smartphone, Key, Settings, Hammer, Wrench, Menu, Siren, Radio, Truck } from 'lucide-react'
import seoData from '@/app/data/seoData.json'

// Mapping icon names to Lucide icons 
// Since seoData doesn't store the icon component itself, we need to map based on the page name or add a mapping
const getIcon = (pageName: string) => {
    if (pageName.includes('Alarm')) return Shield
    if (pageName.includes('CCTV')) return Video
    if (pageName.includes('Access')) return Key
    if (pageName.includes('Intercom')) return Radio
    if (pageName.includes('Fence')) return Zap
    if (pageName.includes('Perimeter')) return Siren
    if (pageName.includes('Gate')) return Settings
    if (pageName.includes('Vehicle')) return Truck
    if (pageName.includes('Smart')) return Smartphone
    if (pageName.includes('Integration')) return Menu
    if (pageName.includes('Repairs')) return Hammer
    if (pageName.includes('Maintenance')) return Wrench
    return Shield
}

export function ServiceCarousel() {
    const services = seoData.primaryServicePages

    return (
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-scroll-slow hover:[animation-play-state:paused]">
                {[...services, ...services].map((service, index) => {
                    const Icon = getIcon(service.page)
                    // Simplified toSlug logic
                    const slug = service.page.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()

                    return (
                        <li key={`${service.page}-${index}`} className="flex-shrink-0 w-[300px]">
                            <Link
                                href={`/services/${slug}`}
                                className="block h-full bg-slate-50 p-6 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group"
                            >
                                <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                                    <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {service.page}
                                </h3>
                                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                                    {service.description}
                                </p>
                                <span className="text-blue-600 font-bold text-sm flex items-center">
                                    Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
