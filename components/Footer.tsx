import Link from 'next/link'
import Image from 'next/image'
import { Shield, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

                    {/* Company Info */}
                    <div>
                        <div className="flex items-center space-x-2 mb-6">
                            <Image src="/logo.png" alt="Global Security Solutions Logo" width={40} height={40} className="w-10 h-10 object-contain" />
                            <span className="text-xl font-bold tracking-tight">Global Security Solutions</span>
                        </div>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            Your trusted partner for high-performance security systems in Cape Town. We specialize in alarms, CCTV, and electric fencing for homes and businesses.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 border-b border-blue-600 inline-block pb-2">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-slate-400 hover:text-blue-400 transition-colors">Home</Link></li>
                            <li><Link href="/about" className="text-slate-400 hover:text-blue-400 transition-colors">About Us</Link></li>
                            <li><Link href="/services" className="text-slate-400 hover:text-blue-400 transition-colors">Our Services</Link></li>
                            <li><Link href="/areas" className="text-slate-400 hover:text-blue-400 transition-colors">Service Areas</Link></li>
                            <li><Link href="/contact" className="text-slate-400 hover:text-blue-400 transition-colors">Get a Quote</Link></li>
                            <li><Link href="/blog" className="text-slate-400 hover:text-blue-400 transition-colors">Security Tips</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 border-b border-blue-600 inline-block pb-2">Our Services</h3>
                        <ul className="space-y-3">
                            <li><Link href="/services/alarm-systems" className="text-slate-400 hover:text-blue-400 transition-colors">Alarm Systems</Link></li>
                            <li><Link href="/services/cctv-surveillance" className="text-slate-400 hover:text-blue-400 transition-colors">CCTV Surveillance</Link></li>
                            <li><Link href="/services/access-control" className="text-slate-400 hover:text-blue-400 transition-colors">Access Control</Link></li>
                            <li><Link href="/services/electric-fencing" className="text-slate-400 hover:text-blue-400 transition-colors">Electric Fencing</Link></li>
                            <li><Link href="/services/gate-automation" className="text-slate-400 hover:text-blue-400 transition-colors">Gate Automation</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 border-b border-blue-600 inline-block pb-2">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                                <span className="text-slate-400">Servicing Durbanville, Blouberg, and the greater Western Cape.</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                                <a href="https://wa.me/27629558559" className="text-slate-400 hover:text-white">062 955 8559</a>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                                <a href="mailto:sales@globalsecuritysolutions.co.za" className="text-slate-400 hover:text-white truncate">sales@globalsecuritysolutions.co.za</a>
                            </li>
                            <li className="text-slate-500 text-sm mt-4">
                                <strong>General:</strong> admin@globalsecuritysolutions.co.za<br />
                                <strong>Owner:</strong> Kyle Cass / Rashaad Steyn
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Brands Trust Bar */}
                <div className="border-t border-slate-800 pt-8 pb-8 text-center">
                    <p className="text-slate-500 mb-4 text-sm uppercase tracking-widest font-semibold">Trusted Security Brands We Install</p>
                    <div className="flex flex-wrap justify-center gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Text placeholders for brands since we don't have images yet */}
                        <span className="text-xl font-bold text-white">HIKVISION</span>
                        <span className="text-xl font-bold text-white">IDS</span>
                        <span className="text-xl font-bold text-white">PARADOX</span>
                        <span className="text-xl font-bold text-white">AJAX</span>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 mt-8 text-center text-slate-500 text-sm">
                    <p>&copy; {currentYear} Global Security Solutions. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
