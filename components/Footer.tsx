import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, AtSign, ChevronRight } from 'lucide-react'
import { BrandCarousel } from './BrandCarousel'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-brand-navy text-brand-white pt-6 pb-6 relative overflow-hidden font-sans border-t border-brand-electric/20 selection:bg-brand-electric selection:text-brand-navy">
            {/* Striking Top Glow Effect */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-electric to-transparent opacity-80 z-10 shadow-[0_0_15px_rgba(0,229,255,1)]"></div>
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-brand-electric/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-6">

                    {/* Company Info */}
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <Image src="/nav-logo-final.png" alt="Global Security Solutions" width={240} height={80} className="h-14 w-auto object-contain drop-shadow-lg" />
                        </div>
                        <p className="text-brand-steel mb-8 leading-relaxed text-sm md:text-base font-medium">
                            Your trusted partner for high-performance security systems in Cape Town. We specialize in AI CCTV, biometric alarms, and off-grid electric fencing.
                        </p>
                        <div className="flex space-x-4 mt-auto">
                            {[
                                { icon: Facebook, href: "https://www.facebook.com/gssolutions.co.za/", label: "Facebook" },
                                { icon: Instagram, href: "https://www.instagram.com/globalsecuritysolutions.co.za/", label: "Instagram" },
                                { icon: AtSign, href: "https://www.threads.net/@globalsecuritysolutions.co.za", label: "Threads" },
                                { icon: MapPin, href: "https://g.page/r/CekZuIweXZuaEBE", label: "Google Business" },
                                { icon: Linkedin, href: "https://www.linkedin.com/company/global-security-solutions-cape-town", label: "LinkedIn" }
                            ].map((social, idx) => (
                                <a 
                                    key={idx}
                                    href={social.href} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="bg-brand-white/5 border border-brand-white/10 hover:border-brand-electric hover:bg-brand-electric/10 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group" 
                                    aria-label={`Visit our ${social.label} Profile`}
                                >
                                    <social.icon className="w-5 h-5 text-brand-steel group-hover:text-brand-electric transition-colors duration-300" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Column Wrapper */}
                    <div className="grid grid-cols-2 gap-8 lg:col-span-2">
                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-black mb-6 text-brand-white uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-brand-electric shadow-[0_0_10px_rgba(0,229,255,0.8)]"></span>
                                Quick Links
                            </h3>
                            <ul className="space-y-4 text-sm font-medium">
                                {[
                                    { name: "Home", href: "/" },
                                    { name: "About Us", href: "/about" },
                                    { name: "All Services", href: "/services" },
                                    { name: "Areas We Serve", href: "/areas" },
                                    { name: "Project Gallery", href: "/projects" },
                                    { name: "Security Blog", href: "/blog" }
                                ].map((link, idx) => (
                                    <li key={idx}>
                                        <Link href={link.href} className="text-brand-slate hover:text-brand-white transition-colors duration-300 flex items-center group">
                                            <ChevronRight className="w-4 h-4 text-brand-electric opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-1" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className="text-lg font-black mb-6 text-brand-white uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-brand-electric shadow-[0_0_10px_rgba(0,229,255,0.8)]"></span>
                                Our Expertise
                            </h3>
                            <ul className="space-y-4 text-sm font-medium">
                                {[
                                    { name: "Alarm Systems", href: "/services/alarm-system-installation" },
                                    { name: "CCTV Surveillance", href: "/services/cctv-surveillance-systems" },
                                    { name: "Access Control", href: "/services/access-control-solutions" },
                                    { name: "Electric Fencing", href: "/services/electric-fence-installations" },
                                    { name: "Load Shedding Ready", href: "/load-shedding-security-solutions" }
                                ].map((service, idx) => (
                                    <li key={idx}>
                                        <Link href={service.href} className="text-brand-slate hover:text-brand-white transition-colors duration-300 flex items-center group">
                                            <ChevronRight className="w-4 h-4 text-brand-electric opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 mr-1" />
                                            {service.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Highlighted Contact Block */}
                    <div className="bg-brand-white/5 border border-brand-electric/30 rounded-3xl p-6 relative group overflow-hidden shadow-2xl shadow-brand-navy/50 self-start">
                        {/* Hover Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-electric/10 via-transparent to-brand-steel/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
                        
                        <h3 className="text-lg font-black mb-6 text-brand-white uppercase tracking-widest relative z-10 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-brand-electric shadow-[0_0_10px_rgba(0,229,255,0.8)] animate-pulse"></span>
                            Get In Touch
                        </h3>
                        <ul className="space-y-6 text-sm relative z-10">
                            <li className="flex items-start gap-4">
                                <div className="bg-brand-electric/10 border border-brand-electric/30 p-2.5 rounded-xl shrink-0 text-brand-electric shadow-inner">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div className="pt-1">
                                    <span className="text-brand-white font-medium leading-relaxed block">Servicing Durbanville, Blouberg, and the greater Western Cape.</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="bg-brand-electric/10 border border-brand-electric/30 p-2.5 rounded-xl shrink-0 text-brand-electric shadow-inner">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div className="pt-1">
                                    <span className="text-brand-steel text-[10px] uppercase tracking-widest font-bold block mb-1">Call Us Now</span>
                                    <a href="https://wa.me/27629558559" className="text-xl font-black text-brand-white hover:text-brand-electric transition-colors drop-shadow-sm">062 955 8559</a>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="bg-brand-electric/10 border border-brand-electric/30 p-2.5 rounded-xl shrink-0 text-brand-electric shadow-inner">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div className="pt-1">
                                    <span className="text-brand-steel text-[10px] uppercase tracking-widest font-bold block mb-1">Email Support</span>
                                    <a href="mailto:sales@globalsecuritysolutions.co.za" className="text-brand-white font-medium hover:text-brand-electric transition-colors block text-sm">sales@globalsecuritysolutions.co.za</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Brands Trust Bar */}
                <div className="border-t border-brand-white/10 pt-8 pb-4">
                    <p className="text-center text-brand-slate text-[10px] mb-4 font-bold uppercase tracking-[0.3em]">Trusted By Leading Industry Brands</p>
                    <div className="opacity-70 grayscale hover:grayscale-0 transition-all duration-700">
                        <BrandCarousel variant="footer" />
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-brand-white/10 pt-6 mt-2 flex flex-col md:flex-row justify-between items-center text-brand-slate text-xs font-medium">
                    <p className="mb-4 md:mb-0">&copy; {currentYear} Global Security Solutions. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <a href="/Privacy-Policy.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-brand-electric transition-colors">Privacy Policy</a>
                        <Link href="/terms-of-service" className="hover:text-brand-electric transition-colors">Terms of Service</Link>
                        <Link href="/sitemap.xml" className="hover:text-brand-electric transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
