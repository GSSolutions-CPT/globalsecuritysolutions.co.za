import type { Metadata } from 'next'
import seoData from '@/app/data/seoData.json'
import { Shield, Users, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
    title: seoData.coreWebsitePages.find(p => p.page === 'About Us')?.title,
    description: seoData.coreWebsitePages.find(p => p.page === 'About Us')?.description,
}

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <section className="bg-slate-900 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">About Global Security Solutions</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Your trusted security partners in the Western Cape. We are dedicated to protecting what matters most to you.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
                        <p className="text-lg text-slate-700 leading-relaxed mb-6">
                            To provide high-performance security solutions that combine reliability, advanced technology, and expert workmanship.
                            We believe that every home and business deserves a security system that just works, 24/7.
                        </p>
                        <p className="text-lg text-slate-700 leading-relaxed">
                            Founded on the principles of integrity and customer service, Global Security Solutions deals directly with top brands like Hikvision, IDS, Paradox, and AJAX to ensure you get the best equipment on the market.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                        <div className="flex items-center space-x-4 mb-6">
                            <Shield className="w-12 h-12 text-blue-600" />
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Certified Experts</h3>
                                <p className="text-slate-600">Professional Installation</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 mb-6">
                            <Users className="w-12 h-12 text-blue-600" />
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Owner Managed</h3>
                                <p className="text-slate-600">Hands-on supervision</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="font-semibold text-slate-900">Leadership:</p>
                            <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                <span>Kyle Cass (Owner)</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                <span>Rashaad Steyn (COO)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-900 rounded-2xl p-12 text-white text-center">
                    <h2 className="text-3xl font-bold mb-6">Why We Are Different</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-3 text-blue-200">Quality First</h3>
                            <p className="text-blue-100">We never compromise on the quality of hardware or cabling. Your security depends on it.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-3 text-blue-200">Rapid Response</h3>
                            <p className="text-blue-100">Our team is agile and responsive, ensuring your installation or repair happens on time.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-3 text-blue-200">Customer Education</h3>
                            <p className="text-blue-100">We take the time to teach you how to use your new system effectively.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
