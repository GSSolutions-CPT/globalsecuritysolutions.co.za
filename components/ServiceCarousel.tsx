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
                                className="block h-full bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.1)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
                            >
                                {/* Decorative Gradient Blobs */}
                                <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full transition-transform duration-500 group-hover:scale-150" />
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-[4rem] -mr-4 -mt-4 transition-all duration-500 group-hover:bg-blue-600 group-hover:w-full group-hover:h-full group-hover:rounded-none group-hover:opacity-100" />

                                {/* Hover Background Reveal - Subtle Blue Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                                <div className="relative z-10 flex flex-col items-center text-center h-full">
                                    {/* Icon Container */}
                                    <div className="w-20 h-20 bg-white rounded-2xl border border-slate-100 shadow-md flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-500 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        {service.iconPath ? (
                                            <div className="w-10 h-10 relative z-10">
                                                <Image
                                                    src={service.iconPath}
                                                    alt={`${service.page} icon`}
                                                    fill
                                                    className="object-contain transition-transform duration-500 group-hover:rotate-3"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-10 h-10 bg-blue-200 rounded-full z-10" />
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-white transition-colors duration-300">
                                        {service.page}
                                    </h3>

                                    <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-3 group-hover:text-blue-100 transition-colors duration-300">
                                        {service.description}
                                    </p>

                                    {/* Button-like link */}
                                    <span className="mt-auto inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-slate-50 text-blue-700 font-bold text-sm group-hover:bg-white group-hover:text-blue-700 transition-all duration-300 shadow-sm">
                                        Learn More
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
