import React from 'react'
import { Metadata } from 'next'
import { Shield, Check } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'
import seoData from '@/app/data/seoData.json'

const pageData = seoData.trustAndSupportPages.find(p => p.page === "Brands We Install")

export const metadata: Metadata = {
  title: pageData?.title || 'Brands We Install | Global Security Solutions',
  description: pageData?.description || 'We install top security brands like Hikvision, IDS, and Ajax.',
}

export default function BrandsPage() {
  const brands = [
      { name: 'Hikvision', desc: 'World leader in CCTV and video surveillance.', features: ['High Definition', 'Night Vision', 'Remote Viewing'] },
      { name: 'AJAX Systems', desc: 'Award-winning wireless alarm systems for modern homes.', features: ['Wireless', 'App Control', 'Long Battery Life'] },
      { name: 'IDS', desc: 'Robust and reliable alarm systems made in South Africa.', features: ['Local Support', 'Industrial Grade', 'Reliable'] },
      { name: 'Paradox', desc: 'Advanced security systems for complex installations.', features: ['Scalable', 'Touchscreens', 'Integration'] },
      { name: 'Centurion Systems', desc: 'The gold standard in gate and garage automation.', features: ['Fast', 'Battery Backup', 'Secure'] },
      { name: 'Nemtek', desc: 'Innovative electric fencing products.', features: ['Compliance', 'Durability', 'High Voltage'] }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Brands We Trust & Install</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                We only use highest quality, proven technology to secure your property.
            </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {brands.map((brand) => (
                <div key={brand.name} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                    <div className="flex items-center mb-4">
                        <Shield className="w-8 h-8 text-blue-600 mr-3" />
                        <h3 className="text-xl font-bold text-slate-900">{brand.name}</h3>
                    </div>
                    <p className="text-slate-600 mb-4 h-12">{brand.desc}</p>
                    <ul className="space-y-2">
                        {brand.features.map(f => (
                            <li key={f} className="flex items-center text-sm text-slate-500">
                                <Check className="w-4 h-4 text-green-500 mr-2" /> {f}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>

        <div className="max-w-3xl mx-auto">
             <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 text-center mb-12">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Certified Installers</h2>
                <p className="text-blue-800 mb-0">
                    Our team is fully trained and certified to install and maintain all the brands we supply. 
                    This ensures your warranty remains valid and your system performs optimally.
                </p>
            </div>
            <ContactForm />
        </div>
      </div>
    </div>
  )
}
