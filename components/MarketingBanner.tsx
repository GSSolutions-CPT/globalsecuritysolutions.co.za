import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const MarketingBanner = () => {
    return (
        <div className="relative w-full pt-32 pb-16 lg:pt-40 lg:pb-24 flex items-center overflow-hidden bg-brand-navy">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/60 to-brand-navy/10 z-10" />
                {/* We use a high-quality abstract tech/security background or existing hero image */}
                <Image
                    src="/hero-bg-v2.png"
                    alt="Security Solutions Cape Town"
                    fill
                    priority={true}
                    fetchPriority="high"
                    quality={75}
                    sizes="100vw"
                    className="object-cover opacity-90 transform scale-105 hover:scale-110 transition-transform duration-[20s]"
                />
            </div>

            <div className="container mx-auto px-4 relative z-20">
                <div className="max-w-4xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-electric/10 border border-brand-electric/20 text-brand-electric text-sm font-medium mb-4 backdrop-blur-sm animate-fade-in-up">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-electric opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-electric"></span>
                        </span>
                        Cape Town&apos;s #1 Rated Installer
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-[1.05] tracking-tight animate-fade-in-up delay-100">
                        Premium Security <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electric to-brand-electric">System Installations.</span>
                    </h1>

                    {/* Sub-text */}
                    <p className="text-lg md:text-xl text-brand-steel/60/90 mb-6 max-w-2xl leading-relaxed animate-fade-in-up delay-200">
                        We secure Cape Town homes and businesses with AI-powered CCTV, smart alarms, and off-grid power solutions.
                        <span className="block mt-1 text-brand-steel text-sm">Over 10 years of experience and 500+ satisfied clients.</span>
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
                        <Link
                            href="/free-security-audit"
                            className="inline-flex h-12 items-center justify-center rounded-full bg-brand-electric px-6 text-sm font-black text-brand-navy shadow-lg shadow-brand-electric/25 transition-all hover:bg-brand-electric hover:scale-105 hover:shadow-brand-electric/40 focus:outline-none focus:ring-2 focus:ring-brand-electric focus:ring-offset-2 focus:ring-offset-brand-navy"
                        >
                            Get Free Audit
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex h-12 items-center justify-center rounded-full border border-brand-slate bg-white/5 px-6 text-sm font-bold text-brand-white transition-all hover:bg-white/10 hover:border-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-steel focus:ring-offset-2 focus:ring-offset-brand-navy"
                        >
                            View Services
                        </Link>
                    </div>
                </div>
            </div>

            {/* Floating Trust Badge */}
            <div className="hidden lg:block absolute bottom-12 right-12 z-20 animate-fade-in-left delay-500">
                <div className="glass-panel p-6 rounded-2xl border border-white/10 flex items-center gap-5 max-w-xs backdrop-blur-md bg-brand-navy/60">
                    <div className="bg-green-500/20 p-3 rounded-full border border-green-500/30">
                        <ShieldCheck className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                        <div className="text-white font-bold text-lg leading-tight">Expert Installation</div>
                        <div className="text-brand-steel text-sm">Certified Technicians</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
