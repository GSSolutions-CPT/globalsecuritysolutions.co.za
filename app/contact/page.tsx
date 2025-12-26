import { ContactForm } from '@/components/ContactForm'
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react'
import type { Metadata } from 'next'
import seoData from '@/app/data/seoData.json'

export const metadata: Metadata = {
    title: seoData.coreWebsitePages.find(p => p.page === 'Contact Us')?.title,
    description: seoData.coreWebsitePages.find(p => p.page === 'Contact Us')?.description,
}

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans">

            {/* Hero Section */}
            <section className="relative bg-slate-950 text-white py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950 z-10" />
                    {/* Abstract background pattern or image */}
                    <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20" />
                </div>

                <div className="container relative z-20 mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 backdrop-blur-sm">
                        <MessageSquare className="w-4 h-4" />
                        <span>We&apos;re Ready to Help</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
                        Get in Touch with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">The Experts</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
                        Whether you need a quick quote or a comprehensive security audit, our team is standing by to assist you.
                    </p>
                </div>
            </section>

            {/* Main Content Area */}
            <div className="relative z-30 -mt-20 pb-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                        {/* Contact Info Card */}
                        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden h-full">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-full -mr-16 -mt-16 z-0" />

                            <div className="relative z-10 space-y-10">
                                <div>
                                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Contact Details</h2>
                                    <p className="text-slate-500">Reach out to us directly through your preferred channel.</p>
                                </div>

                                <div className="space-y-8">
                                    <div className="flex items-start group">
                                        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-lg mb-1">Call or WhatsApp</h3>
                                            <p className="text-slate-500 text-sm mb-2">Mon-Fri, 8am - 5pm</p>
                                            <a href="https://wa.me/27629558559" className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors">062 955 8559</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start group">
                                        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-lg mb-1">Email Us</h3>
                                            <p className="text-slate-500 text-sm mb-2">For quotes & general queries</p>
                                            <a href="mailto:sales@globalsecuritysolutions.co.za" className="text-blue-600 hover:text-blue-800 font-medium block transition-colors">sales@globalsecuritysolutions.co.za</a>
                                            <a href="mailto:admin@globalsecuritysolutions.co.za" className="text-slate-600 hover:text-blue-800 font-medium block transition-colors mt-1">admin@globalsecuritysolutions.co.za</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start group">
                                        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-lg mb-1">Visit Our HQ</h3>
                                            <p className="text-slate-500 text-sm mb-2">Appointments recommended</p>
                                            <address className="not-italic text-slate-700 leading-relaxed">
                                                66 Robyn Rd, Langeberg Ridge,<br />
                                                Cape Town, 7550
                                            </address>
                                            <a
                                                href="https://www.google.com/maps/dir//66+Robyn+Rd,+Langeberg+Ridge,+Cape+Town,+7550"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block mt-3 text-sm font-bold text-blue-600 hover:underline"
                                            >
                                                Get Directions &rarr;
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-slate-100">
                                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-blue-500" />
                                        Operating Hours
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="block font-medium text-slate-900">Weekdays</span>
                                            <span className="text-slate-500">08:00 - 17:00</span>
                                        </div>
                                        <div>
                                            <span className="block font-medium text-slate-900">Weekends</span>
                                            <span className="text-slate-500">By Appointment / Emergency</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form Card */}
                        <div className="bg-slate-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-950/20 text-white relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500" />

                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold mb-2">Send us a Message</h2>
                                <p className="text-slate-400 mb-8">Fill in the form below and we&apos;ll get back to you within 24 hours.</p>

                                <div className="bg-white/5 p-1 rounded-2xl backdrop-blur-sm border border-white/10">
                                    <ContactForm />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Map Embed */}
                    <div className="mt-12 rounded-[2rem] overflow-hidden border border-slate-200 shadow-lg h-[400px] relative z-10 w-full bg-slate-100">
                        <iframe
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://maps.google.com/maps?q=Global+Security+Solutions,+66+Robyn+Rd,+Durbanville,+Cape+Town,+7550&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            className="grayscale hover:grayscale-0 transition-all duration-700"
                        ></iframe>
                    </div>

                </div>
            </div>
        </div>
    )
}
