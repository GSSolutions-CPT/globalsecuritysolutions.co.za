import React from 'react'
import { Metadata } from 'next'
import { CheckCircle2 } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'
import seoData from '@/app/data/seoData.json'

const pageData = seoData.trustAndSupportPages.find(p => p.page === "Free Security Audit")

export const metadata: Metadata = {
    title: pageData?.title || 'Free Security Audit | Global Security Solutions',
    description: pageData?.description || 'Book a free security assessment.',
}

export default function FreeAuditPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <div className="bg-slate-900 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Free Security Audit</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Identify vulnerabilities in your home or business security before they become a problem.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">What Our Audit Covers</h2>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-1" />
                                    <span className="text-slate-700">Perimeter weakness analysis (fences, walls, gates)</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-1" />
                                    <span className="text-slate-700">Blind spot checks for CCTV coverage</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-1" />
                                    <span className="text-slate-700">Alarm system functionality and sensor placement</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-1" />
                                    <span className="text-slate-700">Access control and entry point security</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-1" />
                                    <span className="text-slate-700">Lighting and visibility assessment</span>
                                </li>
                            </ul>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            Our security experts have years of experience in the Cape Town security landscape. We know exactly what criminals look for. Let us help you stay one step ahead.
                        </p>
                    </div>
                    <div>
                        <ContactForm />
                    </div>
                </div>

                {/* SEO Content: How It Works */}
                <div className="mt-12 border-t border-slate-200 pt-16">
                    <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">How The Audit Process Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                            <h3 className="text-xl font-bold mb-2">Book Your Slot</h3>
                            <p className="text-slate-600">Fill in the form or call us. We'll schedule a time that suits you.</p>
                        </div>
                        <div className="p-6">
                            <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                            <h3 className="text-xl font-bold mb-2">On-Site Assessment</h3>
                            <p className="text-slate-600">Our technician walks through your property, identifying risks and measuring perimeters.</p>
                        </div>
                        <div className="p-6">
                            <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                            <h3 className="text-xl font-bold mb-2">Detailed Proposal</h3>
                            <p className="text-slate-600">You receive a comprehensive quote and security plan, with no obligation to buy.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
