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
                                className="block h-full bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-blue-600 hover:shadow-xl hover:-translate-y-1 transition-all group"
                            >
                                <div className="w-16 h-16 bg-blue-50 rounded-lg shadow-sm flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors p-3">
                                    {service.iconPath ? (
                                        <Image
                                            src={service.iconPath}
                                            alt={`${service.page} icon`}
                                            width={64}
                                            height={64}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 bg-blue-200 rounded-full" />
                                    )}
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
