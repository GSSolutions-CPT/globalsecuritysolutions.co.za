import type { Metadata } from 'next'
import Link from 'next/link'
import {
    ArrowLeft,
    Mail,
    Phone,
    Globe,
    Shield,
    CreditCard,
    Lock,
    Wrench,
    FileText,
    AlertCircle,
    CheckCircle2,
    Calendar,
    Scale
} from 'lucide-react'

export const metadata: Metadata = {
    title: 'Terms and Conditions | Global Security Solutions',
    description: 'Terms and conditions governing the provision and installation of security systems by Global Security Solutions.',
}

export default function TermsOfServicePage() {
    return (
        <div className="bg-slate-50 min-h-screen pb-20 font-sans">
            {/* Header */}
            <div className="bg-slate-900 py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                {/* Decorative Gradients */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <Link href="/" className="inline-flex items-center text-blue-400 hover:text-white mb-8 transition-colors text-sm font-semibold tracking-wide uppercase">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                        Terms and <span className="text-blue-500">Conditions</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Agreement governing the provision and installation of premium security systems.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20 max-w-5xl">
                <div className="bg-white p-8 md:p-16 rounded-[2rem] shadow-xl border border-slate-100">
                    {/* Introduction */}
                    <div className="mb-12 border-b border-slate-100 pb-12">
                        <p className="text-lg text-slate-600 leading-loose">
                            These Terms and Conditions (&quot;Agreement&quot;) govern the provision and installation of security systems and related services (&quot;Services&quot;) by <strong className="text-slate-900">Global Security Solutions</strong> (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) to the customer (&quot;you,&quot; &quot;your&quot;). This Agreement, together with the official Quotation provided, constitutes the entire contract between both parties.
                        </p>
                    </div>

                    {/* Section 1: Scope */}
                    <div className="mb-12">
                        <SectionHeader number="1" title="Scope of Services" icon={<FileText className="w-5 h-5 text-blue-600" />} />
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            We agree to supply and install the security equipment (&quot;System&quot;) as specified in the signed Quotation at the address provided (&quot;Site&quot;). The scope includes the physical installation of components, system configuration, basic user training upon handover, and any other services explicitly detailed in the Quotation. Services may include, but are not limited to:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "Intruder Detection and Alarm Systems",
                                "CCTV Surveillance Systems",
                                "Access Control and Intercom Systems",
                                "Electric Fencing and Perimeter Security",
                                "Gate and Garage Automation",
                                "Smart Home and System Integration"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <CheckCircle2 className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                                    <span className="text-slate-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 2: Specs */}
                    <div className="mb-12">
                        <SectionHeader number="2" title="System Specifications" icon={<Wrench className="w-5 h-5 text-blue-600" />} />
                        <p className="text-slate-600 leading-relaxed">
                            The make, model, quantity, and specific capabilities of all System components will be detailed in the formal Quotation. We reserve the right to propose a substitution of components with items of equal or superior quality and specification if the quoted items become unavailable. Such a substitution will only be made subject to your prior written approval.
                        </p>
                    </div>

                    {/* Section 3: Installation */}
                    <div className="mb-12">
                        <SectionHeader number="3" title="Installation Procedures" icon={<Calendar className="w-5 h-5 text-blue-600" />} />
                        <div className="space-y-6">
                            <Clause number="3.1" title="Site Access" text="You shall provide us with safe, unimpeded access to the Site during agreed-upon working hours to perform the installation." />
                            <Clause number="3.2" title="Customer Obligations" text="You are responsible for ensuring the Site is ready for installation, including providing a stable 230V AC power supply at designated points. You must inform us of any concealed utilities (e.g., water pipes, electrical wiring) or structural peculiarities. We are not liable for damages to unmarked or undisclosed utilities." />
                            <Clause number="3.3" title="Timeline" text="The installation timeline provided is an estimate. We will make every reasonable effort to meet these dates but are not liable for delays caused by factors beyond our control (e.g., adverse weather, supplier delays, or changes requested by you)." />
                            <Clause number="3.4" title="Completion & Handover" text="Installation is deemed complete upon successful system testing and demonstration. Your acceptance of the system is confirmed by signing our job completion form or by using the system after handover." />
                        </div>
                    </div>

                    {/* Section 4: Warranties */}
                    <div className="mb-12">
                        <SectionHeader number="4" title="Warranties" icon={<Shield className="w-5 h-5 text-blue-600" />} />
                        <div className="space-y-6">
                            <Clause number="4.1" title="Workmanship" text="We provide a 12-month warranty on our installation workmanship from the date of completion. This covers faults directly resulting from our installation process." />
                            <Clause number="4.2" title="Equipment" text="All new equipment is covered by the manufacturer's warranty, the terms and duration of which vary by product. We will facilitate warranty claims on your behalf, but the manufacturer holds the final decision on repair or replacement." />

                            <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
                                <h4 className="flex items-center text-amber-900 font-bold mb-4">
                                    <AlertCircle className="w-5 h-5 mr-2" />
                                    4.3. Exclusions
                                </h4>
                                <p className="text-amber-800 mb-2 text-sm">This warranty does not cover faults arising from:</p>
                                <ul className="space-y-2">
                                    {[
                                        "Misuse, neglect, or tampering by any person other than our authorized technicians.",
                                        "Acts of God, power surges, lightning, fire, flood, or other external forces.",
                                        "Failure of third-party services required for system operation (e.g., internet connection, armed response).",
                                        "Consumable items (e.g., batteries, fuses)."
                                    ].map((exclusion, i) => (
                                        <li key={i} className="flex items-start text-amber-800 text-sm">
                                            <span className="mr-2 mt-1.5 w-1 h-1 bg-amber-500 rounded-full flex-shrink-0" />
                                            {exclusion}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Section 5: Payment */}
                    <div className="mb-12">
                        <SectionHeader number="5" title="Payment Terms" icon={<CreditCard className="w-5 h-5 text-blue-600" />} />
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h5 className="text-blue-600 font-bold text-lg mb-1">5.1. Deposit</h5>
                                    <p className="text-slate-600 text-sm">A deposit of 75% of the total quoted price is required upon acceptance of the Quotation to secure equipment and scheduling.</p>
                                </div>
                                <div>
                                    <h5 className="text-indigo-600 font-bold text-lg mb-1">5.2. Final Payment</h5>
                                    <p className="text-slate-600 text-sm">The outstanding balance of 25% is due upon completion of the installation and successful handover.</p>
                                </div>
                            </div>
                            <div className="space-y-4 pt-6 border-t border-slate-200">
                                <Clause number="5.3" title="Ownership" text="All equipment remains the property of Global Security Solutions until the full, outstanding balance is paid. We reserve the right to enter the Site and remove the System in the event of non-payment." highlight />
                                <Clause number="5.4" title="Late Payments" text="We reserve the right to charge interest on all overdue accounts at the maximum rate permissible by law, alternatively at prime plus 5% (as charged by our bankers), calculated daily and compounded monthly from the due date until the date of full payment." />
                            </div>
                        </div>
                    </div>

                    {/* Section 6: Privacy */}
                    <div className="mb-12">
                        <SectionHeader number="6" title="Data Privacy" icon={<Lock className="w-5 h-5 text-blue-600" />} />
                        <div className="space-y-6">
                            <Clause number="6.1" title="Compliance" text="We handle your personal information in compliance with the Protection of Personal Information Act (POPIA) of South Africa. Your data is used solely for the purposes of providing our Services, billing, and communication." />
                            <Clause number="6.2" title="System Data" text="You are the legal &quot;Data Controller&quot; for all data captured and stored by your System (e.g., CCTV footage, access logs). You are solely responsible for its lawful use and management." />
                            <Clause number="6.3" title="Remote Access" text="For maintenance or troubleshooting, we may require remote access to your System. This will only be done with your explicit consent for each instance, which may be provided verbally, via email, or through an official support request." />
                        </div>
                    </div>

                    {/* Section 7: Maintenance */}
                    <div className="mb-12">
                        <SectionHeader number="7" title="Maintenance & Support" icon={<Wrench className="w-5 h-5 text-blue-600" />} />
                        <div className="space-y-6">
                            <Clause number="7.1" title="Post-Warranty Service" text="Service calls or repairs requested after the warranty period will be chargeable at our standard rates." />
                            <Clause number="7.2" title="Maintenance Contracts" text="We offer optional Maintenance Contracts for ongoing preventative care and priority support. The terms of these contracts are outlined in a separate agreement." />
                            <Clause number="7.3" title="Call-Outs" text="A standard call-out fee is applicable for all on-site support requests outside of a valid workmanship warranty claim." />
                        </div>
                    </div>

                    {/* Section 8: Liability */}
                    <div className="mb-12">
                        <SectionHeader number="8" title="Limitation of Liability" icon={<Scale className="w-5 h-5 text-blue-600" />} />
                        <div className="space-y-6">
                            <Clause number="8.1" title="No Guarantee" text="You acknowledge that a security system is a deterrent and does not offer a guarantee against burglary, loss, or harm. Global Security Solutions is not an insurer." />
                            <Clause number="8.2" title="Indemnity" text="We shall not be liable for any direct, indirect, or consequential loss or damage suffered by you or any third party, including loss of property, injury, or loss of life, arising from system failure, non-performance, or any breach of this Agreement, except in the case of our gross negligence." />
                            <Clause number="8.3" title="Maximum Liability" text="In any event, our total liability under this Agreement shall be limited to the total value paid by you for the Services outlined in the relevant Quotation." />
                        </div>
                    </div>

                    {/* Section 9: Termination */}
                    <div className="mb-12">
                        <SectionHeader number="9" title="Termination" />
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 space-y-6">
                            <Clause number="9.1" title="By You" text="You may terminate this Agreement by providing written notice. Upon termination: The 75% initial deposit is non-refundable and will be retained by us to cover administrative costs and equipment stocking. If termination occurs after work has commenced, you will be liable for the cost of all work performed and non-returnable equipment ordered up to the date of termination. Any such costs incurred in excess of the retained deposit will be invoiced and become immediately due." />
                            <Clause number="9.2" title="By Us" text="We may terminate this Agreement with immediate effect if you fail to make payment as per the terms or breach any other material clause of this Agreement." />
                        </div>
                    </div>

                    {/* Section 10: General */}
                    <div className="mb-16">
                        <SectionHeader number="10" title="General" />
                        <div className="space-y-6">
                            <Clause number="10.1" title="Governing Law" text="This Agreement shall be governed by and interpreted in accordance with the laws of the Republic of South Africa." />
                            <Clause number="10.2" title="Dispute Resolution" text="Should any dispute arise, both parties agree to first attempt to resolve it amicably through negotiation. If unresolved, the matter will be subject to the jurisdiction of the Cape Town courts." />
                            <Clause number="10.3" title="Entire Agreement" text="This document and the associated Quotation represent the entire agreement between the parties and supersede all prior communications. Any amendments must be made in writing and signed by both parties." />
                        </div>
                    </div>

                    {/* Footer / Signature Block */}
                    <div className="bg-blue-600 p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center text-white shadow-lg shadow-blue-200">
                        <div className="mb-6 md:mb-0">
                            <h4 className="text-xl font-bold mb-2">Global Security Solutions</h4>
                            <p className="text-blue-100 text-sm opacity-90">Terms Accepted upon Quotation Approval</p>
                        </div>
                        <div className="space-y-3">
                            <a href="https://globalsecuritysolutions.co.za" target="_blank" rel="noopener noreferrer" className="flex items-center text-white/90 hover:text-white transition-colors bg-blue-700/50 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm">
                                <Globe className="w-4 h-4 mr-2" />
                                globalsecuritysolutions.co.za
                            </a>
                            <a href="mailto:Kyle@GlobalSecuritySolutions.co.za" className="flex items-center text-white/90 hover:text-white transition-colors bg-blue-700/50 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm">
                                <Mail className="w-4 h-4 mr-2" />
                                Kyle@GlobalSecuritySolutions.co.za
                            </a>
                            <a href="tel:+27629558559" className="flex items-center text-white/90 hover:text-white transition-colors bg-blue-700/50 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm">
                                <Phone className="w-4 h-4 mr-2" />
                                062 955 8559
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

// Helper Components for Cleaner Code
function SectionHeader({ number, title, icon }: { number: string; title: string, icon?: React.ReactNode }) {
    return (
        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <span className="bg-blue-50 text-blue-600 w-10 h-10 flex items-center justify-center rounded-lg text-lg font-bold mr-4 border border-blue-100 shadow-sm">
                {number}
            </span>
            <span className="flex-grow">{title}</span>
            {icon && <div className="hidden md:block opacity-20">{icon}</div>}
        </h3>
    )
}

function Clause({ number, title, text, highlight = false }: { number: string; title: string; text: string; highlight?: boolean }) {
    return (
        <div className={`leading-relaxed ${highlight ? 'text-slate-800' : 'text-slate-600'}`}>
            <strong className={`block mb-1 ${highlight ? 'text-blue-900' : 'text-slate-900'}`}>{number} {title}:</strong>
            <span className="text-sm md:text-base">{text}</span>
        </div>
    )
}
