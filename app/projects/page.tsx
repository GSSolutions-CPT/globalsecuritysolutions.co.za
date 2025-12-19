import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import seoData from '@/app/data/seoData.json'

const pageData = seoData.trustAndSupportPages.find(p => p.page === "Project Gallery")

export const metadata: Metadata = {
    title: pageData?.title || 'Project Gallery | Global Security Solutions',
    description: pageData?.description || 'View our recent security installations in Cape Town.',
}

export default function ProjectsPage() {
    const projects = [
        { title: "Chere Botha School", category: "Commercial", desc: "Access Control & Hikvision Installation" },
        { title: "35 on Rose", category: "HOA / Estate", desc: "Large-scale Security Upgrade" },
        { title: "Salus and Demos", category: "Residential", desc: "Premium Access Control System" },
        { title: "Durbanville Estate", category: "Residential", desc: "Electric Fencing & Alarms" },
        { title: "Blouberg Office Park", category: "Commercial", desc: "CCTV Surveillance Network" },
        { title: "Stellenbosch Farm", category: "Agricultural", desc: "Perimeter Beams & Monitoring" },
    ]

    return (
        <div className="min-h-screen bg-slate-50 py-12 md:py-20">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-600">Our Work</h1>
                <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16">
                    A showcase of our recent installations across the Western Cape.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((p, i) => (
                        <div key={i} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100">
                            <div className="aspect-video bg-slate-200 relative">
                                <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">Project Image</div>
                                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">{p.category}</div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{p.title}</h3>
                                <p className="text-slate-600">{p.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
