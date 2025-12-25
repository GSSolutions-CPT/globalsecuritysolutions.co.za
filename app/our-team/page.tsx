import React from 'react'
import { Metadata } from 'next'
import { Users, User, ShieldCheck } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'
import seoData from '@/app/data/seoData.json'

const pageData = seoData.trustAndSupportPages.find(p => p.page === "Our Team")

export const metadata: Metadata = {
    title: pageData?.title || 'Our Team | Global Security Solutions',
    description: pageData?.description || 'Meet the experts behind Global Security Solutions.',
}

export default function TeamPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <div className="bg-slate-900 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Meet The Team</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Dedicated security professionals committed to your safety.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10 max-w-4xl mx-auto">
                    {/* Kyle */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 flex flex-col md:flex-row">
                        <div className="bg-slate-200 w-full md:w-1/3 min-h-[200px] flex items-center justify-center">
                            <User className="w-16 h-16 text-slate-400" />
                        </div>
                        <div className="p-6 md:w-2/3">
                            <h2 className="text-2xl font-bold text-slate-900">Kyle Cass</h2>
                            <p className="text-blue-600 font-semibold mb-3">Owner</p>
                            <p className="text-slate-600 mb-4">
                                With extensive experience in the security industry, Kyle leads the team with a focus on technical excellence and customer satisfaction.
                            </p>
                            <a href="mailto:kyle@globalsecuritysolutions.co.za" className="text-sm font-semibold text-blue-600 hover:underline">kyle@globalsecuritysolutions.co.za</a>
                        </div>
                    </div>

                    {/* Rashaad */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 flex flex-col md:flex-row">
                        <div className="bg-slate-200 w-full md:w-1/3 min-h-[200px] flex items-center justify-center">
                            <User className="w-16 h-16 text-slate-400" />
                        </div>
                        <div className="p-6 md:w-2/3">
                            <h2 className="text-2xl font-bold text-slate-900">Rashaad Steyn</h2>
                            <p className="text-blue-600 font-semibold mb-3">COO</p>
                            <p className="text-slate-600 mb-4">
                                Rashaad ensures smooth operations and efficient project delivery, making sure every installation meets our high standards.
                            </p>
                            <a href="mailto:rashaad@globalsecuritysolutions.co.za" className="text-sm font-semibold text-blue-600 hover:underline">rashaad@globalsecuritysolutions.co.za</a>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center max-w-3xl mx-auto mb-10">
                    <h3 className="text-2xl font-bold mb-6">Why Work With Us?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <ShieldCheck className="w-10 h-10 text-green-500 mx-auto mb-3" />
                            <h4 className="font-bold">Vetted Staff</h4>
                            <p className="text-sm text-slate-500">All our installers are background checked and verified.</p>
                        </div>
                        <div>
                            <Users className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                            <h4 className="font-bold">Local Experts</h4>
                            <p className="text-sm text-slate-500">We know the Cape Town area and its specific security challenges.</p>
                        </div>
                        <div>
                            <ShieldCheck className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                            <h4 className="font-bold">Certified</h4>
                            <p className="text-sm text-slate-500">Accredited installers for all major security brands.</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-xl mx-auto">
                    <ContactForm />
                </div>
            </div>
        </div>
    )
}
