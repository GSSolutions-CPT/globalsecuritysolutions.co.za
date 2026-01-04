import { ArrowLeft, ArrowRight, Camera } from 'lucide-react'
import Link from "next/link";
// import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
import seoData from '@/app/data/seoData.json'
import type { Metadata } from 'next'

// Revalidate every minute
export const revalidate = 60

const pageData = seoData.trustAndSupportPages.find(p => p.page === "Project Gallery")

export const metadata: Metadata = {
    title: pageData?.title || 'Project Gallery | Global Security Solutions',
    description: pageData?.description || 'View our recent security installations in Cape Town.',
}


// Static Projects Data (Overrides DB for showcase purity)

const STATIC_PROJECTS = [
    {
        id: "est-01",
        title: "Sunset Ridge Estate Perimeter",
        category: "Residential Estate",
        image_url: "/assets/images/project_estate_perimeter_v1.png",
        description: "Complete perimeter overhaul for a 50-unit estate in Constantia. We installed an 18-zone Nemtek electric fence integrated with thermal perimeter cameras for night-time breach detection.",
    },
    {
        id: "com-02",
        title: "Century City Access Control",
        category: "Commercial Park",
        image_url: "/assets/images/project_commercial_park_v1.png",
        description: "Implemented a seamless access control solution for a high-traffic business park. Features include License Plate Recognition (LPR) cameras synced with boom gates and facial recognition for walk-in access.",
    },
    {
        id: "res-03",
        title: "Clifton Luxury Villa Integration",
        category: "High-End Residential",
        image_url: "/assets/images/project_luxury_home_alarm_v1.png",
        description: "A discreet yet impenetrable security layer for a seaside villa. We combined exterior strip beams with a Paradox Insight alarm system, allowing the owner to visually verify alarms from their phone instantly.",
    }
]

export default function ProjectsPage() {
    // We use static data for the overhaul to ensure quality presentation
    const projects = STATIC_PROJECTS

    return (
        <div className="bg-slate-50 min-h-screen font-sans">

            {/* Premium Hero Section */}
            <section className="relative bg-slate-950 text-white py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950 z-10" />
                    <Image
                        src="/hero-bg.jpg"
                        alt="Security Installations"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                </div>

                <div className="container relative z-20 mx-auto px-4 text-center">
                    <Link href="/" className="inline-flex items-center text-blue-400 hover:text-white mb-8 transition-colors text-sm font-semibold tracking-wide uppercase">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>

                    <h1
                        className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight"
                        data-aos="fade-up"
                    >
                        Our Work
                    </h1>
                    <p
                        className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        Explore our portfolio of precision security installations across Cape Town&apos;s residential and commercial sectors.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-20 relative z-30 pb-24">

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, i) => (
                        <div
                            key={project.id}
                            data-aos="fade-up"
                            data-aos-delay={i * 100}
                            className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 h-full flex flex-col"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                                <Image
                                    src={project.image_url}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            <div className="p-6 md:p-8 flex flex-col flex-grow">
                                <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
                                    {project.category}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                    {project.title}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA / Standards */}
                <div className="mt-20 lg:mt-32 max-w-5xl mx-auto bg-blue-600 rounded-[2.5rem] p-8 md:p-16 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32" />

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Installation Excellence</h2>
                        <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
                            Every project in this gallery represents our commitment to neat cabling, strategic camera positioning, and robust system integration.
                            We don&apos;t just install; we engineer peace of mind.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            Start Your Project
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
