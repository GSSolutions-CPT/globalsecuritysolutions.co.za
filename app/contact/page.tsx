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
        <div className="bg-slate-50 min-h-screen py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Ready to secure your property? Get in touch with our expert team for a free quote and personalized security advice.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 h-fit">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Get In Touch</h2>
                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="bg-blue-100 p-3 rounded-full mr-4">
                                    <Phone className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Phone & WhatsApp</h3>
                                    <p className="text-slate-600 mb-1">Speak directly to an expert.</p>
                                    <a href="https://wa.me/27629558559" className="text-xl font-bold text-blue-600 hover:text-blue-800">062 955 8559</a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-blue-100 p-3 rounded-full mr-4">
                                    <Mail className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Email Us</h3>
                                    <p className="text-slate-600 mb-1">Sales & Queries</p>
                                    <a href="mailto:sales@globalsecuritysolutions.co.za" className="text-blue-600 hover:text-blue-800 font-medium block">sales@globalsecuritysolutions.co.za</a>
                                    <a href="mailto:admin@globalsecuritysolutions.co.za" className="text-blue-600 hover:text-blue-800 font-medium block">admin@globalsecuritysolutions.co.za</a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-blue-100 p-3 rounded-full mr-4">
                                    <MapPin className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Service Areas</h3>
                                    <p className="text-slate-600">
                                        We proudly serve the entire Western Cape, including Durbanville, Blouberg, Somerset West, Stellenbosch, and surrounding areas.
                                    </p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-2">Key Contacts</h3>
                                <ul className="text-slate-600 space-y-1">
                                    <li><strong>Kyle Cass:</strong> Owner</li>
                                    <li><strong>Rashaad Steyn:</strong> COO</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <ContactForm />
                </div>
            </div>
        </div>
    )
}
