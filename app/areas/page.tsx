import Link from 'next/link'
import Image from 'next/image'
import locationData from '@/app/data/locationData.json'
import { MapPin, ArrowRight, Navigation } from 'lucide-react'

export const metadata = {
    title: 'Service Areas | Global Security Solutions',
    description: 'We provide expert security installations across the Western Cape. Find your area to learn more about our local services.',
}

export default function AreasIndexPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">

            {/* Hero Section */}
            <section className="relative bg-slate-950 text-white py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950 z-10" />
                    <Image
                        src="/page-heroes/areas-hero.png"
                        alt="Western Cape Service Areas"
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                </div>

                <div className="container relative z-20 mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 backdrop-blur-sm">
                        <Navigation className="w-4 h-4" />
                        <span>Western Cape Coverage</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
                        Security Where <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">You Need It</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
                        From the Atlantic Seaboard to the Winelands. We bring expert security installations to your doorstep.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="relative z-30 -mt-20 pb-20">
                <div className="container mx-auto px-4">

                    {/* Areas Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
                        {locationData.map((location) => (
                            <Link
                                key={location.slug}
                                href={`/areas/${location.slug}`}
                                className="group relative bg-white p-6 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 hover:border-blue-500 hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-colors group-hover:bg-blue-600/10" />

                                <div className="relative z-10 flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{location.suburb}</h3>
                                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">View Services</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors -rotate-45 group-hover:rotate-0" />
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="bg-slate-900 rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold mb-6">Don&apos;t See Your Area?</h2>
                            <p className="text-slate-400 mb-8 text-lg">
                                We likely still service your location. Our teams operate throughout the greater Cape Town metropolitan area and surrounding Winelands.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-blue-600/20"
                            >
                                Contact Our Team
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
