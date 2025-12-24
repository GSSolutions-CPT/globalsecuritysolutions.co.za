import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
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

    return (
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            {/* Duplicating the list 4 times to ensure enough content for smooth scrolling since there are only 5 items */}
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-scroll-slow hover:[animation-play-state:paused]">
                {[...sectors, ...sectors, ...sectors, ...sectors].map((service, index) => {
                    // Simplified toSlug logic
                    const slug = service.page.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()

                    return (
                        <li key={`${service.page}-${index}`} className="flex-shrink-0 w-[300px]">
                            <Link
                                href={`/sectors/${slug}`}
                                className="block h-full bg-white pt-12 pb-8 px-6 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.15)] hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden text-center flex flex-col items-center border border-slate-50"
                            >
                                {/* APEX DOG-EAR ACCENT */}
                                <div className="absolute top-0 left-0 w-20 h-20 bg-indigo-600 rounded-br-[3.5rem] transition-transform duration-300 group-hover:scale-110 -translate-x-4 -translate-y-4 shadow-lg z-10" />

                                <div className="relative z-10 flex flex-col items-center h-full w-full">
                                    <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                                        {getSectorIcon(service.page)}
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                                        {service.page}
                                    </h3>

                                    <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-3">
                                        {service.description}
                                    </p>

                                    <span className="mt-auto text-indigo-600 font-bold text-sm flex items-center group-hover:underline decoration-2 underline-offset-4">
                                        View Sector <ArrowRight className="w-4 h-4 ml-1" />
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
