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
        { q: "Will my alarm work during load shedding?", a: "Yes, provided your battery backup is healthy. We can also install expanded battery packs or solar solutions to last through stage 6." },
        { q: "Can I view CCTV on my phone?", a: "Yes, all our IP and HD-TVI camera systems can be linked to a mobile app for 24/7 remote viewing from anywhere." },
        { q: "Do you do repairs on existing systems?", a: "Yes, we repair and upgrade existing alarms, electric fences, and gate motors, even if we didn't install them originally." },
        { q: "Are your installations insurance compliant?", a: "Yes, our installations meet SAIDSA standards and we provide the necessary certification for your insurance provider." },
    ]

    return (
        <div className="min-h-screen bg-slate-50 py-24">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h1>
                <div className="space-y-6">
                    {faqs.map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-100">
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
