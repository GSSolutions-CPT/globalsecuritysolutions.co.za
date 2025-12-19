import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Frequently Asked Questions | Global Security Solutions',
    description: 'Common questions about security system installations, warranties, and repairs.',
}

export default function FAQPage() {
    const faqs = [
        { q: "Do you offer free quotes?", a: "Yes, we offer obligation-free security assessments and quotes for all new installations." },
        { q: "What brands do you install?", a: "We specialize in Hikvision, IDS, Paradox, and AJAX systems, among others." },
        { q: "Do you provide COC for electric fencing?", a: "Absolutely. All our electric fence installations come with a Certificate of Compliance." },
        { q: "How long does an installation take?", a: "Most residential installations are completed within 1-2 days, depending on complexity." },
    ]

    return (
        <div className="min-h-screen bg-slate-50 py-20">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h1>
                <div className="space-y-6">
                    {faqs.map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{item.q}</h3>
                            <p className="text-slate-600">{item.a}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <p className="text-slate-600 mb-4">Have another question?</p>
                    <a href="/contact" className="text-blue-600 font-bold hover:underline">Contact Us</a>
                </div>
            </div>
        </div>
    )
}
