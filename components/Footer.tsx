'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, AtSign, Send, Check } from 'lucide-react'

export function Footer() {
    const currentYear = new Date().getFullYear()
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        if (email.trim()) {
            setSubscribed(true)
            setEmail('')
            setTimeout(() => setSubscribed(false), 3000)
        }
    }

    return (
        <footer className="bg-brand-navy text-brand-white pt-16 pb-8 relative overflow-hidden font-sans border-t border-brand-electric/20">
            {/* Striking Top Glow Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-electric/50 to-transparent opacity-70 z-10"></div>
            
            {/* Background Grid Accent */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-electric/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

            <div className="container mx-auto px-5 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* Column 1: Brand Info */}
                    <div className="flex flex-col space-y-4">
                        <Link href="/" className="inline-block w-fit">
                            <Image 
                                src="/nav-logo-final.png" 
                                alt="Global Security Solutions" 
                                width={200} 
                                height={60} 
                                className="h-10 w-auto object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]" 
                            />
                        </Link>
                        <p className="text-sm text-brand-slate leading-relaxed">
                            Owner-managed security system installations for residential estates, businesses, and homes across Cape Town and the Western Cape since 2015.
                        </p>
                        {/* Compact Trust Credentials */}
                        <div className="pt-2 text-xs text-brand-steel border-t border-white/5">
                            <span className="font-bold text-brand-electric">Kyle Cass</span> • Personal Supervision • Workmanship Guarantees
                        </div>
                    </div>

                    {/* Column 2: Navigation Links */}
                    <div>
                        <h3 className="text-sm font-black mb-4 text-brand-white uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-electric"></span>
                            Quick Links
                        </h3>
                        <ul className="space-y-2.5 text-sm font-medium">
                            <li><Link href="/" className="text-brand-slate hover:text-brand-electric hover:pl-1 transition-all duration-200 cursor-pointer">Home</Link></li>
                            <li><Link href="/about" className="text-brand-slate hover:text-brand-electric hover:pl-1 transition-all duration-200 cursor-pointer">About Us</Link></li>
                            <li><Link href="/services" className="text-brand-slate hover:text-brand-electric hover:pl-1 transition-all duration-200 cursor-pointer">All Services</Link></li>
                            <li><Link href="/projects" className="text-brand-slate hover:text-brand-electric hover:pl-1 transition-all duration-200 cursor-pointer">Project Gallery</Link></li>
                            <li><Link href="/blog" className="text-brand-slate hover:text-brand-electric hover:pl-1 transition-all duration-200 cursor-pointer">Security Blog</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div>
                        <h3 className="text-sm font-black mb-4 text-brand-white uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-electric"></span>
                            Contact Us
                        </h3>
                        <ul className="space-y-3.5 text-sm">
                            <li className="flex items-start gap-2.5">
                                <MapPin className="w-4 h-4 text-brand-electric shrink-0 mt-0.5" />
                                <span className="text-brand-slate">66 Robyn Rd, Langeberg Ridge, Cape Town 7550</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-brand-electric shrink-0" />
                                <a href="https://wa.me/27629558559" className="text-brand-slate hover:text-brand-electric transition-colors cursor-pointer">062 955 8559</a>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-brand-electric shrink-0" />
                                <a href="mailto:Kyle@globalsecuritysolutions.co.za" className="text-brand-slate hover:text-brand-electric transition-colors cursor-pointer truncate">Kyle@globalsecuritysolutions.co.za</a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter Signup */}
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-sm font-black mb-1 text-brand-white uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-electric"></span>
                            Newsletter
                        </h3>
                        <p className="text-sm text-brand-slate leading-relaxed">
                            Stay up to date with load shedding security hacks, technology trends, and safety tips.
                        </p>
                        <form onSubmit={handleSubscribe} className="relative flex items-center w-full">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full bg-white/5 border border-brand-steel/30 rounded-xl px-4 py-2.5 text-sm text-brand-white placeholder-brand-slate focus:outline-none focus:border-brand-electric focus:ring-1 focus:ring-brand-electric transition-all"
                            />
                            <button
                                type="submit"
                                aria-label="Subscribe"
                                className="absolute right-1.5 p-2 bg-brand-electric text-brand-navy rounded-lg hover:bg-brand-white hover:text-brand-navy transition-colors cursor-pointer flex items-center justify-center"
                            >
                                {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                            </button>
                        </form>
                        {subscribed && (
                            <span className="text-xs text-brand-electric font-semibold animate-fade-in-up">
                                Check your inbox soon!
                            </span>
                        )}
                    </div>

                </div>

                {/* Bottom Legals & Socials */}
                <div className="border-t border-white/10 pt-8 mt-4 flex flex-col md:flex-row justify-between items-center text-brand-slate text-xs font-medium gap-4">
                    <p className="order-2 md:order-1">&copy; {currentYear} Global Security Solutions. All rights reserved.</p>
                    
                    {/* Social links */}
                    <div className="flex space-x-3 order-1 md:order-2">
                        {[
                            { icon: Facebook, href: "https://www.facebook.com/gssolutions.co.za/", label: "Facebook" },
                            { icon: Instagram, href: "https://www.instagram.com/globalsecuritysolutions.co.za/", label: "Instagram" },
                            { icon: AtSign, href: "https://www.threads.net/@globalsecuritysolutions.co.za", label: "Threads" },
                            { icon: Linkedin, href: "https://www.linkedin.com/company/global-security-solutions-cape-town", label: "LinkedIn" }
                        ].map((social, idx) => (
                            <a 
                                key={idx}
                                href={social.href} 
                                target="_blank" 
                                aria-label={social.label}
                                rel="noopener noreferrer" 
                                className="block p-2 text-brand-slate hover:text-brand-electric transition-colors hover:scale-110 duration-200 cursor-pointer"
                            >
                                <social.icon className="w-4.5 h-4.5" />
                            </a>
                        ))}
                    </div>

                    {/* Legal Links */}
                    <div className="flex space-x-4 order-3">
                        <a href="/Privacy-Policy.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-brand-electric transition-colors cursor-pointer">Privacy Policy</a>
                        <Link href="/terms-of-service" className="hover:text-brand-electric transition-colors cursor-pointer">Terms of Service</Link>
                        <a href="/sitemap.xml" className="hover:text-brand-electric transition-colors cursor-pointer">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
