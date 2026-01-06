import Link from 'next/link'
import Image from 'next/image'
import seoData from '@/app/data/seoData.json'
import { ArrowRight, CheckCircle2, Search, FileText, Wrench, HeadphonesIcon } from 'lucide-react'

export const metadata = {
    title: 'All Security Services | Global Security Solutions',
    description: 'Explore our full range of security services including Alarms, CCTV, Electric Fencing, and Access Control in Cape Town.',
}

// Helper to normalize string to slug (same as in [slug]/page.tsx)
const toSlug = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim()
}

export default function ServicesIndexPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">

            {/* Hero Section */}
            {/* Hero Section */}
            <section className="relative bg-slate-950 text-white min-h-[60vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-blue-950/10 z-10" />
                    <Image
                        src="/page-heroes/services-hero.png"
                        alt="Security Services"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                </div>

                <div className="container relative z-20 mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 backdrop-blur-sm mx-auto">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span>Complete Protection</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
                        World-Class <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Security Services</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
                        From residential homes to industrial estates, we design systems that protect what matters most.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-20">
                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {seoData.primaryServicePages.map((service) => (
                        <Link
                            key={service.page}
                            href={`/services/${toSlug(service.page)}`}
                            className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col items-center text-center h-full"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-blue-50 transition-colors" />

                            <div className="w-16 h-16 mb-6 relative mx-auto">
                                {service.iconPath ? (
                                    <Image
                                        src={service.iconPath}
                                        alt={`${service.page} icon`}
                                        fill
                                        className="object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-blue-100 rounded-full" />
                                )}
                            </div>

                            <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                {service.page}
                            </h2>

                            <p className="text-slate-600 text-sm mb-8 leading-relaxed flex-grow">
                                {service.description}
                            </p>

                            <span className="inline-flex items-center text-slate-900 font-bold text-sm bg-slate-100 px-4 py-2 rounded-full w-fit group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                Learn More
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Process Section */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Our Workflow</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900">How We Work</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: Search, title: "1. Assessment", text: "We visit your site to identify vulnerabilities." },
                            { icon: FileText, title: "2. Design", text: "We propose a tailored solution and quote." },
                            { icon: Wrench, title: "3. Installation", text: "Our certified team installs neatly and efficiently." },
                            { icon: HeadphonesIcon, title: "4. Support", text: "We provide training and ongoing maintenance." }
                        ].map((step, i) => (
                            <div key={i} className="text-center relative">
                                {/* Connector Line (Desktop) */}
                                {i < 3 && (
                                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-slate-100 -z-10" />
                                )}
                                <div className="w-16 h-16 mx-auto bg-white border border-slate-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm z-10 relative">
                                    <step.icon className="w-8 h-8 text-slate-700" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                                <p className="text-slate-500 text-sm">{step.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content Block */}
                <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Why Professional Security Matters</h2>
                            <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                                In today&apos;s world, off-the-shelf solutions aren&apos;t enough. Criminals are sophisticated, and your defense needs to be stronger.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center text-slate-300">
                                    <CheckCircle2 className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                                    <span>Layered defense (Perimeter + Internal)</span>
                                </li>
                                <li className="flex items-center text-slate-300">
                                    <CheckCircle2 className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                                    <span>Professional grade, tamper-proof hardware</span>
                                </li>
                                <li className="flex items-center text-slate-300">
                                    <CheckCircle2 className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                                    <span>Integration with armed response</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-6">Common Questions</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-blue-400 text-sm mb-2">What is the best system for a home?</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">A layered approach. Start with perimeter beams or electric fencing, followed by an internal alarm and CCTV verification.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-blue-400 text-sm mb-2">Do you install during load shedding?</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">Yes. We also specialize in solar and battery backup solutions to ensure your security never goes offline.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
