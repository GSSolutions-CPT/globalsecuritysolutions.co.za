'use client'

import Link from 'next/link'
import Image from 'next/image'

import { ArrowRight } from 'lucide-react'
import seoData from '@/app/data/seoData.json'

export function ServiceGrid() {
    const services = seoData.primaryServicePages

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => {
                // Simplified toSlug logic
                const slug = service.page.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()

                return (
                    <Link
                        key={`${service.page}-${index}`}
                        href={`/services/${slug}`}
                        className="group relative flex flex-col items-center text-center bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >
                        {/* Hover Accent */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                        {/* Icon */}
                        <div className="w-16 h-16 mb-6 relative transition-transform duration-300 group-hover:scale-110">
                            {service.iconPath ? (
                                <Image
                                    src={service.iconPath}
                                    alt={`${service.page} icon`}
                                    fill
                                    className="object-contain"
                                />
                            ) : (
                                <div className="w-full h-full bg-blue-100 rounded-full" />
                            )}
                        </div>

                        {/* Text */}
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {service.page}
                        </h3>
                        <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-2">
                            {service.description}
                        </p>

                        {/* Link CTA */}
                        {/* Link CTA */}
                        <div className="mt-auto inline-flex items-center justify-center text-blue-600 text-sm font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            Learn More <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}
