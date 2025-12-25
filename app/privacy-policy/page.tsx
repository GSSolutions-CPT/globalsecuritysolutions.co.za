import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Privacy Policy | Global Security Solutions',
    description: 'How we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Header */}
            <div className="bg-slate-900 py-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <Link href="/" className="inline-flex items-center text-blue-400 hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
                    <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                        Your privacy is important to us. Here is how we protect your data.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100 prose prose-lg prose-slate max-w-none">
                    <p className="lead">
                        Global Security Solutions is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or use our services.
                    </p>

                    <h3>1. Information We Collect</h3>
                    <p>
                        We may collect personal information such as your name, email address, phone number, and physical address when you:
                    </p>
                    <ul>
                        <li>Request a quote or consultation.</li>
                        <li>Contact us via email or phone.</li>
                        <li>Subscribe to our newsletter (if applicable).</li>
                    </ul>

                    <h3>2. How We Use Your Information</h3>
                    <p>
                        We use the information we collect to:
                    </p>
                    <ul>
                        <li>Provide, operate, and maintain our services.</li>
                        <li>Communicate with you regarding appointments, quotes, and installations.</li>
                        <li>Improve our website and customer service.</li>
                        <li>Comply with legal obligations.</li>
                    </ul>

                    <h3>3. Data Sharing</h3>
                    <p>
                        We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties, except as described below:
                    </p>
                    <ul>
                        <li><strong>Service Providers:</strong> We may share data with trusted third parties who assist us in operating our website or conducting our business (e.g., payment processors, CRM tools), so long as those parties agree to keep this information confidential.</li>
                        <li><strong>Legal Requirements:</strong> We may disclose your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others&apos; rights, property, or safety.</li>
                    </ul>

                    <h3>4. Security</h3>
                    <p>
                        We implement a variety of security measures to maintain the safety of your personal information. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure.
                    </p>

                    <h3>5. Cookies</h3>
                    <p>
                        Our website may use cookies to enhance your experience. You can choose to disable cookies through your individual browser options.
                    </p>

                    <h3>6. Third-Party Links</h3>
                    <p>
                        Our website may contain links to third-party sites. We have no responsibility or liability for the content and activities of these linked sites.
                    </p>

                    <h3>7. Contact Us</h3>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at:<br />
                        <strong>Email:</strong> <a href="mailto:info@globalsecuritysolutions.co.za" className="text-blue-600 hover:underline">info@globalsecuritysolutions.co.za</a>
                    </p>

                    <hr className="my-8" />

                    <p className="text-sm text-slate-500">
                        Last Updated: December 2025
                    </p>
                </div>
            </div>
        </div>
    )
}
