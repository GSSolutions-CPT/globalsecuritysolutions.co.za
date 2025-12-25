import { ContactForm } from '@/components/ContactForm'
import { Phone, Mail, MapPin } from 'lucide-react'
import type { Metadata } from 'next'
import seoData from '@/app/data/seoData.json'

export const metadata: Metadata = {
    title: seoData.coreWebsitePages.find(p => p.page === 'Contact Us')?.title,
    description: seoData.coreWebsitePages.find(p => p.page === 'Contact Us')?.description,
}

export default function ContactPage() {
    return (
        <div className="bg-slate-50 min-h-screen py-12 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="container relative mx-auto px-4">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Contact Us</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Ready to secure your property? Get in touch with our expert team for a free quote and personalized security advice.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-100 h-fit transition-all hover:shadow-xl">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8">Get In Touch</h2>
                        <div className="space-y-8">
                            <div className="flex items-start group">
                                <div className="bg-blue-50 p-3 rounded-xl mr-5 group-hover:bg-blue-600 transition-colors duration-300">
                                    <Phone className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg">Phone & WhatsApp</h3>
                                    <p className="text-slate-500 mb-1">Speak directly to an expert.</p>
                                    <a href="https://wa.me/27629558559" className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors">062 955 8559</a>
                                </div>
                            </div>

                            <div className="flex items-start group">
                                <div className="bg-blue-50 p-3 rounded-xl mr-5 group-hover:bg-blue-600 transition-colors duration-300">
                                    <Mail className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg">Email Us</h3>
                                    <p className="text-slate-500 mb-1">Sales & Queries</p>
                                    <a href="mailto:sales@globalsecuritysolutions.co.za" className="text-blue-600 hover:text-blue-800 font-medium block transition-colors">sales@globalsecuritysolutions.co.za</a>
                                    <a href="mailto:admin@globalsecuritysolutions.co.za" className="text-blue-600 hover:text-blue-800 font-medium block transition-colors">admin@globalsecuritysolutions.co.za</a>
                                </div>
                            </div>

                            <div className="flex items-start group">
                                <div className="bg-blue-50 p-3 rounded-xl mr-5 group-hover:bg-blue-600 transition-colors duration-300">
                                    <MapPin className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg">Service Areas</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        We proudly serve the entire Western Cape, including Durbanville, Blouberg, Somerset West, Stellenbosch, and surrounding areas.
                                    </p>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-3">Key Contacts</h3>
                                <ul className="text-slate-600 space-y-2">
                                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span><strong>Kyle Cass:</strong> <span className="ml-1 text-slate-500">Owner</span></li>
                                    <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span><strong>Rashaad Steyn:</strong> <span className="ml-1 text-slate-500">COO</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-100">
                        <ContactForm />
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="mt-12 w-full h-[450px] bg-slate-200 relative">
                <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://maps.google.com/maps?q=Global+Security+Solutions,+66+Robyn+Rd,+Durbanville,+Cape+Town,+7550&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="filter grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
                {/* Overlay card for context */}
                <div className="absolute bottom-6 left-6 bg-white p-6 rounded-xl shadow-lg border border-slate-100 hidden md:block max-w-xs">
                    <h3 className="font-bold text-slate-900 mb-1">Visit Our HQ</h3>
                    <p className="text-sm text-slate-600 mb-3">66 Robyn Rd, Langeberg Ridge, Cape Town, 7550</p>
                    <a
                        href="https://www.google.com/maps/dir//66+Robyn+Rd,+Langeberg+Ridge,+Cape+Town,+7550"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm font-bold hover:underline"
                    >
                        Get Directions &rarr;
                    </a>
                </div>
            </div>
        </div>
    )
}
