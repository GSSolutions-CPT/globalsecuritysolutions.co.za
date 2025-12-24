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
            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="container relative mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">About Global Security Solutions</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Your trusted security partners in the Western Cape. We are dedicated to protecting what matters most to you.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-24">
                    <div className="prose prose-lg text-slate-600">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">Our Mission</h2>
                        <p className="leading-relaxed mb-6">
                            To provide high-performance security solutions that combine reliability, advanced technology, and expert workmanship.
                            We believe that every home and business deserves a security system that just works, 24/7.
                        </p>
                        <p className="leading-relaxed">
                            Founded on the principles of integrity and customer service, Global Security Solutions deals directly with top brands like Hikvision, IDS, Paradox, and AJAX to ensure you get the best equipment on the market.
                        </p>
                    </div>
                    <div className="bg-white p-10 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.15)] hover:-translate-y-2 transition-all duration-300 border border-slate-100">
                        <div className="flex items-start space-x-6 mb-8 group">
                            <div className="bg-blue-50 p-4 rounded-xl group-hover:bg-blue-600 transition-colors duration-300">
                                <Shield className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Certified Experts</h3>
                                <p className="text-slate-600">Professional, accredited installation teams.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-6 mb-8 group">
                            <div className="bg-blue-50 p-4 rounded-xl group-hover:bg-blue-600 transition-colors duration-300">
                                <Users className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Owner Managed</h3>
                                <p className="text-slate-600">Direct hands-on supervision for every project.</p>
                            </div>
                        </div>
                        <div className="space-y-3 pt-6 border-t border-slate-100">
                            <p className="font-semibold text-slate-900 uppercase tracking-wide text-sm">Leadership Team</p>
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                <span className="font-medium text-slate-700">Kyle Cass (Owner)</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                <span className="font-medium text-slate-700">Rashaad Steyn (COO)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-3xl p-12 md:p-16 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10 text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 tracking-tight">Why We Are Different</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1">
                                <h3 className="text-xl font-bold mb-4 text-blue-400">Quality First</h3>
                                <p className="text-slate-300 leading-relaxed">We never compromise on the quality of hardware or cabling. Your security depends on it.</p>
                            </div>
                            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1">
                                <h3 className="text-xl font-bold mb-4 text-blue-400">Rapid Response</h3>
                                <p className="text-slate-300 leading-relaxed">Our team is agile and responsive, ensuring your installation or repair happens on time.</p>
                            </div>
                            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1">
                                <h3 className="text-xl font-bold mb-4 text-blue-400">Customer Education</h3>
                                <p className="text-slate-300 leading-relaxed">We take the time to teach you how to use your new system effectively.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
