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
                                className="block h-full bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                            >
                                {/* Decorative Corner Accent */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform group-hover:scale-110" />

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    {/* Icon Container */}
                                    <div className="w-20 h-20 bg-white rounded-2xl border-2 border-blue-100 shadow-sm flex items-center justify-center mb-6 group-hover:border-blue-600 group-hover:bg-blue-600 transition-all duration-300">
                                        {service.iconPath ? (
                                            <div className="w-10 h-10 relative">
                                                <Image
                                                    src={service.iconPath}
                                                    alt={`${service.page} icon`}
                                                    fill
                                                    className="object-contain brightness-100 group-hover:brightness-0 group-hover:invert transition-all"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-10 h-10 bg-blue-200 rounded-full" />
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                                        {service.page}
                                    </h3>

                                    <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-3">
                                        {service.description}
                                    </p>

                                    {/* Button-like link */}
                                    <span className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-blue-50 text-blue-700 font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        Learn More
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
