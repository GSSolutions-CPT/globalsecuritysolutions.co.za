import React from 'react'
import { Metadata } from 'next'
import { Battery, Zap, Sun } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'
import seoData from '@/app/data/seoData.json'

const pageData = seoData.trustAndSupportPages.find(p => p.page === "Load Shedding Security Solutions")

export const metadata: Metadata = {
    title: pageData?.title || 'Load Shedding Security | Battery Backups Cape Town',
    description: pageData?.description || 'Keep your security running during power outages.',
}

export default function LoadSheddingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <div className="bg-slate-900 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Load Shedding Security Solutions</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Don't let power outages compromise your safety. We keep your systems running 24/7.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 text-center">
                        <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Battery className="w-8 h-8 text-yellow-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Battery Backups</h3>
                        <p className="text-slate-600">High-capacity batteries for alarms and electric fences to last through 4-hour stages.</p>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 text-center">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Sun className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Solar Power</h3>
                        <p className="text-slate-600">Solar panels specifically for electric gates and perimeter security, independent of the grid.</p>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 text-center">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Zap className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Inverter Integration</h3>
                        <p className="text-slate-600">Seamless integration of your CCTV and security hub into your existing inverter system.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="prose max-w-none text-slate-700">
                        <h2 className="text-2xl font-bold text-slate-900">Why Security Fails During Load Shedding</h2>
                        <p>
                            Standard batteries in alarms and gate motors are designed for occasional outages, not daily cycling.
                            Frequent load shedding drains these batteries faster than they can recharge, leading to system failure
                            and creating opportunities for criminals.
                        </p>
                        <h3 className="text-xl font-bold text-slate-900">Our Solution</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Lithium-Iron Phosphate (LiFePO4) batteries with longer lifespans.</li>
                            <li>External power supply units for expanded backup time.</li>
                            <li>Solar charging kits for gate motors and electric fences.</li>
                        </ul>
                    </div>
                    <div>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
