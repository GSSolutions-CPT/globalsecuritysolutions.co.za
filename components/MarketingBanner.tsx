import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const MarketingBanner = () => {
    return (
        <div className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-slate-950">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-blue-950/10 z-10" />
                {/* We use a high-quality abstract tech/security background or existing hero image */}
                <Image
                    src="/hero-bg.jpg"
                    alt="Security Solutions Cape Town"
                    fill
                    priority={true}
                    quality={90}
                    sizes="100vw"
                    className="object-cover opacity-90 transform scale-105 hover:scale-110 transition-transform duration-[20s]"
                />
            </div>

            <div className="container mx-auto px-4 relative z-20">
                <div className="max-w-4xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 backdrop-blur-sm animate-fade-in-up">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Cape Town&apos;s #1 Rated Installer
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.05] tracking-tight animate-fade-in-up delay-100">
                        Premium Security <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">System Installations.</span>
                    </h1>

                    {/* Sub-text */}
                    <p className="text-xl md:text-2xl text-slate-300/90 mb-10 max-w-2xl leading-relaxed animate-fade-in-up delay-200">
                        We secure Cape Town homes and businesses with AI-powered CCTV, smart alarms, and off-grid power solutions.
                        <span className="block mt-2 text-slate-400 text-lg">Over 10 years of experience and 500+ satisfied clients.</span>
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
                        <Link
                            href="/free-security-audit"
                            className="inline-flex h-14 items-center justify-center rounded-full bg-blue-600 px-8 text-base font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:scale-105 hover:shadow-blue-600/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                        >
                            Get Free Audit
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex h-14 items-center justify-center rounded-full border border-slate-700 bg-white/5 px-8 text-base font-bold text-white transition-all hover:bg-white/10 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                        >
                            View Services
                        </Link>
                    </div>
                </div>
            </div>

            {/* Floating Trust Badge */}
            <div className="hidden lg:block absolute bottom-12 right-12 z-20 animate-fade-in-left delay-500">
                <div className="glass-panel p-6 rounded-2xl border border-white/10 flex items-center gap-5 max-w-xs backdrop-blur-md bg-slate-900/60">
                    <div className="bg-green-500/20 p-3 rounded-full border border-green-500/30">
                        <ShieldCheck className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                        <div className="text-white font-bold text-lg leading-tight">Expert Installation</div>
                        <div className="text-slate-400 text-sm">Certified Technicians</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
