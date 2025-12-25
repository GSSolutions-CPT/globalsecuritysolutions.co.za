import React from 'react'
import { Metadata } from 'next'
import { ShieldCheck, Wrench, PhoneCall } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'
import seoData from '@/app/data/seoData.json'

const pageData = seoData.trustAndSupportPages.find(p => p.page === "Warranty and Support")

export const metadata: Metadata = {
    title: pageData?.title || 'Warranty and Support | Global Security Solutions',
    description: pageData?.description || 'Learn about our installation warranties and after-sales support.',
}

export default function WarrantyPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <div className="bg-slate-900 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Warranty & Support</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Our commitment to your security doesn&apos;t end after installation.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 text-center">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">1-Year Installation Warranty</h3>
                        <p className="text-slate-600">We guarantee our workmanship. If any installation fault occurs within 12 months, we fix it for free.</p>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 text-center">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Wrench className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Manufacturer Warranty</h3>
                        <p className="text-slate-600">All hardware comes with full manufacturer warranties, ranging from 1 to 5 years depending on the brand.</p>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 text-center">
                        <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <PhoneCall className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Lifetime Support</h3>
                        <p className="text-slate-600">As a GSS client, you get lifetime phone support for basic troubleshooting and system advice.</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden mb-10">
                    <div className="p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Maintenance Contracts</h2>
                        <p className="text-slate-600 mb-6 text-lg">
                            Prevention is better than cure. Our maintenance contracts ensure your security system is always fully operational.
                            Regular checks prevent false alarms and ensure your battery backups are ready for load shedding.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 bg-slate-50 p-4 rounded-lg">
                                <h4 className="font-bold text-slate-900 mb-2">Basic Maintenance</h4>
                                <p className="text-sm text-slate-500">Annual system checkup and battery testing.</p>
                            </div>
                            <div className="flex-1 bg-slate-50 p-4 rounded-lg">
                                <h4 className="font-bold text-slate-900 mb-2">Comprehensive</h4>
                                <p className="text-sm text-slate-500">Quarterly inspections, cleaning, and priority call-outs.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-xl mx-auto">
                    <h3 className="text-2xl font-bold text-center mb-8">Request Support or Service</h3>
                    <ContactForm />
                </div>
            </div>
        </div>
    )
}
