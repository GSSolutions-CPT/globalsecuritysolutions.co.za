import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, AtSign } from 'lucide-react'
import { BrandCarousel } from './BrandCarousel'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-slate-900 text-white pt-8 pb-4 border-t-4 border-blue-600 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 z-10"></div>
            {/* Light Leak */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">

                    {/* Company Info */}
                    <div>
                        <div className="mb-2">
                            <Image src="/nav-logo-final.png" alt="Global Security Solutions" width={240} height={80} className="h-12 w-auto object-contain" />
                        </div>
                        <p className="text-slate-300 mb-4 leading-relaxed text-xs">
                            Your trusted partner for high-performance security systems in Cape Town. We specialize in alarms, CCTV, and electric fencing.
                        </p>
                        <div className="flex space-x-3">
                            <a href="https://www.facebook.com/gssolutions.co.za/" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-all group" aria-label="Visit our Facebook Page">
                                <Facebook className="w-5 h-5 text-slate-300 group-hover:text-white" />
                            </a>
                            <a href="https://www.instagram.com/globalsecuritysolutions.co.za/" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-pink-600 w-10 h-10 rounded-full flex items-center justify-center transition-all group" aria-label="Visit our Instagram Profile">
                                <Instagram className="w-5 h-5 text-slate-300 group-hover:text-white" />
                            </a>
                            <a href="https://www.threads.net/@globalsecuritysolutions.co.za" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-black w-10 h-10 rounded-full flex items-center justify-center transition-all group" aria-label="Visit our Threads Profile">
                                <AtSign className="w-5 h-5 text-slate-300 group-hover:text-white" />
                            </a>
                            <a href="https://g.page/r/CekZuIweXZuaEBE" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-green-600 w-10 h-10 rounded-full flex items-center justify-center transition-all group" aria-label="Visit our Google Business Profile">
                                <MapPin className="w-5 h-5 text-slate-300 group-hover:text-white" />
                            </a>
                            <a href="https://www.linkedin.com/company/global-security-solutions-cape-town" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-all group" aria-label="Visit our LinkedIn Profile">
                                <Linkedin className="w-5 h-5 text-slate-300 group-hover:text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-base font-bold mb-2 border-b-2 border-blue-600 inline-block pb-1">Quick Links</h3>
                        <ul className="space-y-3 text-xs">
                            <li><Link href="/" className="text-slate-300 hover:text-blue-400 transition-colors flex items-center"><span className="w-1 h-1 bg-blue-600 rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>Home</Link></li>
                            <li><Link href="/about" className="text-slate-300 hover:text-blue-400 transition-colors flex items-center"><span className="w-1 h-1 bg-blue-600 rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>About Us</Link></li>
                            <li><Link href="/services" className="text-slate-300 hover:text-blue-400 transition-colors flex items-center"><span className="w-1 h-1 bg-blue-600 rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>All Services</Link></li>
                            <li><Link href="/areas" className="text-slate-300 hover:text-blue-400 transition-colors flex items-center"><span className="w-1 h-1 bg-blue-600 rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>Areas We Serve</Link></li>
                            <li><Link href="/projects" className="text-slate-300 hover:text-blue-400 transition-colors flex items-center"><span className="w-1 h-1 bg-blue-600 rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>Project Gallery</Link></li>
                            <li><Link href="/blog" className="text-slate-300 hover:text-blue-400 transition-colors flex items-center"><span className="w-1 h-1 bg-blue-600 rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>Security Blog</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-base font-bold mb-2 border-b-2 border-blue-600 inline-block pb-1">Our Expertise</h3>
                        <ul className="space-y-3 text-xs">
                            <li><Link href="/services/alarm-system-installation" className="text-slate-300 hover:text-blue-400 transition-colors">Alarm Systems</Link></li>
                            <li><Link href="/services/cctv-surveillance-systems" className="text-slate-300 hover:text-blue-400 transition-colors">CCTV Surveillance</Link></li>
                            <li><Link href="/services/access-control-solutions" className="text-slate-300 hover:text-blue-400 transition-colors">Access Control</Link></li>
                            <li><Link href="/services/electric-fence-installations" className="text-slate-300 hover:text-blue-400 transition-colors">Electric Fencing</Link></li>
                            <li><Link href="/load-shedding-security-solutions" className="text-slate-300 hover:text-blue-400 transition-colors">Load Shedding Solutions</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-base font-bold mb-2 border-b-2 border-blue-600 inline-block pb-1">Get In Touch</h3>
                        <ul className="space-y-3 text-xs">
                            <li className="flex items-start space-x-2.5">
                                <div className="bg-slate-800 p-1 rounded-lg shrink-0 text-blue-500">
                                    <MapPin className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-white font-bold leading-tight block mt-0.5">Servicing Durbanville, Blouberg, and the greater Western Cape.</span>
                            </li>
                            <li className="flex items-start space-x-2.5">
                                <div className="bg-slate-800 p-1 rounded-lg shrink-0 text-blue-500">
                                    <Phone className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                    <span className="text-slate-300 text-[10px] uppercase tracking-wider font-bold block mb-0.5">Call Us Now</span>
                                    <a href="https://wa.me/27629558559" className="text-base font-bold text-white hover:text-blue-400 transition-colors">062 955 8559</a>
                                </div>
                            </li>
                            <li className="flex items-start space-x-2.5">
                                <div className="bg-slate-800 p-1 rounded-lg shrink-0 text-blue-500">
                                    <Mail className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                    <span className="text-slate-300 text-[10px] uppercase tracking-wider font-bold block mb-0.5">Email Support</span>
                                    <a href="mailto:sales@globalsecuritysolutions.co.za" className="text-white font-bold hover:text-blue-400 transition-colors block">sales@globalsecuritysolutions.co.za</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Brands Trust Bar */}
                <div className="border-t border-slate-800 pt-4 pb-2">
                    <p className="text-center text-slate-300 text-[10px] mb-2 font-medium uppercase tracking-widest">Trusted By Leading Brands</p>
                    <BrandCarousel variant="footer" />
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-2 mt-2 flex flex-col md:flex-row justify-between items-center text-slate-500 text-[10px]">
                    <p>&copy; {currentYear} Global Security Solutions. All rights reserved.</p>
                    <div className="flex space-x-4 mt-3 md:mt-0">
                        <a href="/Privacy-Policy.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                        <Link href="/terms-of-service" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
                        <Link href="/sitemap.xml" className="hover:text-blue-400 transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
