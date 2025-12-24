import Link from 'next/link'
import Image from 'next/image'
import { Shield, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react'
import { BrandCarousel } from './BrandCarousel'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-slate-900 text-white pt-12 pb-6 border-t-4 border-blue-600 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 z-10"></div>
            {/* Light Leak */}
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

                    {/* Company Info */}
                    <div>
                        <div className="mb-4">
                            <Image src="/nav-logo-final.png" alt="Global Security Solutions" width={240} height={80} className="h-16 w-auto object-contain" />
                        </div>
                        <p className="text-slate-400 mb-6 leading-relaxed text-sm">
                            Your trusted partner for high-performance security systems in Cape Town. We specialize in alarms, CCTV, and electric fencing.
                        </p>
                        <div className="flex space-x-3">
                            <a href="#" className="bg-slate-800 p-2 rounded-full text-slate-400 hover:text-white hover:bg-blue-600 transition-all group">
                                <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="https://www.instagram.com/globalsecuritysolutions.co.za" target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-2 rounded-full text-slate-400 hover:text-white hover:bg-pink-600 transition-all group">
                                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 border-b-2 border-blue-600 inline-block pb-1">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>Home</Link></li>
                            <li><Link href="/about" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>About Us</Link></li>
                            <li><Link href="/services" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>All Services</Link></li>
                            <li><Link href="/areas" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>Areas We Serve</Link></li>
                            <li><Link href="/projects" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>Project Gallery</Link></li>
                            <li><Link href="/blog" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>Security Blog</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 border-b-2 border-blue-600 inline-block pb-1">Our Expertise</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/services/alarm-system-installation" className="text-slate-400 hover:text-blue-400 transition-colors">Alarm Systems</Link></li>
                            <li><Link href="/services/cctv-surveillance-systems" className="text-slate-400 hover:text-blue-400 transition-colors">CCTV Surveillance</Link></li>
                            <li><Link href="/services/access-control-solutions" className="text-slate-400 hover:text-blue-400 transition-colors">Access Control</Link></li>
                            <li><Link href="/services/electric-fence-installations" className="text-slate-400 hover:text-blue-400 transition-colors">Electric Fencing</Link></li>
                            <li><Link href="/load-shedding-security-solutions" className="text-slate-400 hover:text-blue-400 transition-colors">Load Shedding Solutions</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 border-b-2 border-blue-600 inline-block pb-1">Get In Touch</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start space-x-3">
                                <div className="bg-slate-800 p-1.5 rounded-lg shrink-0 text-blue-500">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <span className="text-slate-400 leading-tight block mt-1">Servicing Durbanville, Blouberg, and the greater Western Cape.</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <div className="bg-slate-800 p-1.5 rounded-lg shrink-0 text-blue-500">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="text-slate-500 text-xs uppercase tracking-wider font-bold block mb-0.5">Call Us Now</span>
                                    <a href="https://wa.me/27629558559" className="text-lg font-bold text-white hover:text-blue-400 transition-colors">062 955 8559</a>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <div className="bg-slate-800 p-1.5 rounded-lg shrink-0 text-blue-500">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="text-slate-500 text-xs uppercase tracking-wider font-bold block mb-0.5">Email Support</span>
                                    <a href="mailto:sales@globalsecuritysolutions.co.za" className="text-slate-400 hover:text-white transition-colors block">sales@globalsecuritysolutions.co.za</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Brands Trust Bar */}
                <div className="border-t border-slate-800 pt-8 pb-6">
                    <p className="text-center text-slate-500 text-xs mb-4 font-medium uppercase tracking-widest">Trusted By Leading Brands</p>
                    <BrandCarousel variant="footer" />
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs">
                    <p>&copy; {currentYear} Global Security Solutions. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
                        <Link href="/terms-of-service" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
                        <Link href="/sitemap.xml" className="hover:text-blue-400 transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
