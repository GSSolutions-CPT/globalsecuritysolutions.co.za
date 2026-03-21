import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, AtSign, ChevronRight } from 'lucide-react'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-brand-navy text-brand-white pt-6 pb-2 relative overflow-hidden font-sans border-t border-brand-electric/20">
            {/* Striking Top Glow Effect */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-electric to-transparent opacity-50 z-10"></div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">

                    {/* Company Info & Contact */}
                    <div className="flex flex-col lg:col-span-1">
                        <div className="mb-4">
                            <Image src="/nav-logo-final.png" alt="Global Security Solutions" width={200} height={60} className="h-10 w-auto object-contain drop-shadow-lg" />
                        </div>
                        
                        <ul className="space-y-2 text-xs text-brand-steel">
                            <li className="flex items-center gap-2">
                                <MapPin className="w-3 h-3 text-brand-electric" />
                                <span>Durbanville & Western Cape</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-3 h-3 text-brand-electric" />
                                <a href="https://wa.me/27629558559" className="hover:text-brand-electric transition-colors">062 955 8559</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-3 h-3 text-brand-electric" />
                                <a href="mailto:sales@globalsecuritysolutions.co.za" className="hover:text-brand-electric transition-colors">sales@globalsecuritysolutions.co.za</a>
                            </li>
                        </ul>
                    </div>

                    {/* Links Column Wrapper */}
                    <div className="grid grid-cols-2 gap-4 lg:col-span-3">
                        {/* Quick Links */}
                        <div>
                            <h3 className="text-xs font-black mb-2 text-brand-white uppercase tracking-widest flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-electric"></span>
                                Quick Links
                            </h3>
                            <ul className="space-y-1 text-[10px] md:text-xs text-brand-slate font-medium">
                                <li><Link href="/" className="hover:text-brand-electric transition-colors">Home</Link></li>
                                <li><Link href="/about" className="hover:text-brand-electric transition-colors">About Us</Link></li>
                                <li><Link href="/services" className="hover:text-brand-electric transition-colors">All Services</Link></li>
                                <li><Link href="/projects" className="hover:text-brand-electric transition-colors">Project Gallery</Link></li>
                                <li><Link href="/blog" className="hover:text-brand-electric transition-colors">Security Blog</Link></li>
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className="text-xs font-black mb-2 text-brand-white uppercase tracking-widest flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-electric"></span>
                                Expertise
                            </h3>
                            <ul className="space-y-1 text-[10px] md:text-xs text-brand-slate font-medium">
                                <li><Link href="/services/alarm-system-installation" className="hover:text-brand-electric transition-colors">Alarm Systems</Link></li>
                                <li><Link href="/services/cctv-surveillance-systems" className="hover:text-brand-electric transition-colors">CCTV Surveillance</Link></li>
                                <li><Link href="/services/access-control-solutions" className="hover:text-brand-electric transition-colors">Access Control</Link></li>
                                <li><Link href="/services/electric-fence-installations" className="hover:text-brand-electric transition-colors">Electric Fencing</Link></li>
                                <li><Link href="/load-shedding-security-solutions" className="hover:text-brand-electric transition-colors">Load Shedding Ready</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-brand-white/10 pt-4 flex flex-col md:flex-row justify-between items-center text-brand-slate text-[10px] font-medium gap-4">
                    <p>&copy; {currentYear} Global Security Solutions. All rights reserved.</p>
                    
                    <div className="flex space-x-3">
                        {[
                            { icon: Facebook, href: "https://www.facebook.com/gssolutions.co.za/" },
                            { icon: Instagram, href: "https://www.instagram.com/globalsecuritysolutions.co.za/" },
                            { icon: AtSign, href: "https://www.threads.net/@globalsecuritysolutions.co.za" },
                            { icon: Linkedin, href: "https://www.linkedin.com/company/global-security-solutions-cape-town" }
                        ].map((social, idx) => (
                            <a 
                                key={idx}
                                href={social.href} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="hover:text-brand-electric transition-colors"
                            >
                                <social.icon className="w-3.5 h-3.5" />
                            </a>
                        ))}
                    </div>

                    <div className="flex space-x-4">
                        <a href="/Privacy-Policy.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-brand-electric transition-colors">Privacy</a>
                        <Link href="/terms-of-service" className="hover:text-brand-electric transition-colors">Terms</Link>
                        <Link href="/sitemap.xml" className="hover:text-brand-electric transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
