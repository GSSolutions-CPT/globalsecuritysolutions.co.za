'use client'

import { motion, Variants } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageSquare, Facebook, Instagram, Linkedin } from 'lucide-react'
import dynamic from 'next/dynamic'
import { PageHero } from '@/components/PageHero'
import { Breadcrumbs } from '@/components/Breadcrumbs'

// Lazy load the heavy form component
const ContactForm = dynamic(() => import('@/components/ContactForm').then(mod => mod.ContactForm), { 
    ssr: false,
    loading: () => <div className="h-64 flex items-center justify-center text-brand-steel">Loading secure form...</div>
})

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
}

export function ContactClient() {
    return (
        <div className="flex flex-col min-h-screen bg-brand-white font-sans selection:bg-brand-electric selection:text-brand-navy">

            {/* Hero Section */}
            <PageHero
                badgeIcon={<MessageSquare className="w-3.5 h-3.5 text-brand-electric shadow-[0_0_10px_rgba(0,229,255,0.8)]" />}
                badgeText="We're Ready To Help"
                title={
                    <>
                        Get in Touch with <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electric to-brand-steel">The Experts</span>
                    </>
                }
                subtitle="Whether you need a rapid deployment quote or a comprehensive security audit, our specialized tactical team is standing by to assist you."
                bgImage="/page-heroes/contact-hero.jpg"
                pbClass="pb-48"
            />

            {/* Main Content Area */}
            <div className="relative z-30 -mt-32 pb-16">
                <div className="container mx-auto px-4 md:px-8">
                    <Breadcrumbs items={[{ label: 'Contact Us', href: '/contact' }]} />
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
                    >
                        {/* Contact Info Card */}
                        <motion.div variants={fadeInUp} className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-xl border border-brand-steel/10 relative overflow-hidden h-full group">
                            {/* Decorative Gradient Blobs */}
                            <div className="absolute -top-20 -right-20 w-60 h-60 bg-brand-electric/5 rounded-full blur-[80px] pointer-events-none" />
                            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-brand-steel/5 rounded-full blur-[60px] pointer-events-none" />

                            <div className="relative z-10 space-y-10">
                                <div>
                                    <h2 className="text-3xl font-black text-brand-navy mb-2 tracking-tighter">Contact Details</h2>
                                    <p className="text-brand-slate font-light text-sm md:text-base">Reach out directly through your preferred encrypted channel.</p>
                                </div>

                                <div className="space-y-6">
                                    {[
                                        { icon: Phone, title: "Call or WhatsApp", desc: "Mon-Fri, 8am - 5pm", link: "062 955 8559", href: "https://wa.me/27629558559" },
                                        { icon: Mail, title: "Email Kyle Cass", desc: "Direct owner enquiries & quotes", link: "Kyle@globalsecuritysolutions.co.za", href: "mailto:Kyle@globalsecuritysolutions.co.za" },
                                        { icon: Mail, title: "General Enquiries", desc: "Support, maintenance & scheduling", link: "info@globalsecuritysolutions.co.za", href: "mailto:info@globalsecuritysolutions.co.za" }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-start group/item">
                                            <div className="w-12 h-12 rounded-2xl bg-brand-electric/10 border border-brand-electric/20 text-brand-electric flex items-center justify-center shrink-0 mr-5 group-hover/item:bg-brand-electric group-hover/item:text-brand-white transition-all duration-300 shadow-sm">
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-brand-navy text-base mb-1 tracking-tight">{item.title}</h3>
                                                <p className="text-brand-slate text-xs mb-1 font-light">{item.desc}</p>
                                                <a href={item.href} className="text-sm font-bold text-brand-electric hover:text-brand-navy transition-colors">{item.link}</a>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="flex items-start group/item">
                                        <div className="w-12 h-12 rounded-2xl bg-brand-electric/10 border border-brand-electric/20 text-brand-electric flex items-center justify-center shrink-0 mr-5 group-hover/item:bg-brand-electric group-hover/item:text-brand-white transition-all duration-300 shadow-sm">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-brand-navy text-base mb-1 tracking-tight">Visit Our HQ</h3>
                                            <p className="text-brand-slate text-xs mb-1 font-light">Appointments highly recommended</p>
                                            <address className="not-italic text-brand-slate text-sm leading-relaxed mb-2 font-medium">
                                                66 Robyn Rd, Langeberg Ridge,<br />
                                                Cape Town, 7550
                                            </address>
                                            <a
                                                href="https://www.google.com/maps/dir//66+Robyn+Rd,+Langeberg+Ridge,+Cape+Town,+7550"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block text-xs font-bold text-brand-electric hover:text-brand-navy uppercase tracking-wider transition-colors"
                                            >
                                                Get Directions &rarr;
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-brand-steel/10">
                                    <h3 className="font-black text-brand-navy mb-4 flex items-center gap-2 tracking-tight text-lg">
                                        <Clock className="w-5 h-5 text-brand-electric" />
                                        Operating Hours
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 text-xs md:text-sm">
                                        <div className="bg-brand-navy/5 p-4 rounded-xl border border-brand-steel/10 shadow-sm">
                                            <span className="block font-black text-brand-navy tracking-widest uppercase text-[10px] mb-1">Weekdays</span>
                                            <span className="text-brand-electric font-bold">08:00 - 17:00</span>
                                        </div>
                                        <div className="bg-brand-navy/5 p-4 rounded-xl border border-brand-steel/10 shadow-sm">
                                            <span className="block font-black text-brand-navy tracking-widest uppercase text-[10px] mb-1">Weekends</span>
                                            <span className="text-brand-electric font-bold">Emergency Only</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form Card */}
                        <motion.div variants={fadeInUp} className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-xl border border-brand-steel/10 relative overflow-hidden h-full flex flex-col focus-within:ring-2 focus-within:ring-brand-electric focus-within:outline-none">
                            {/* Decorative Gradient Blobs */}
                            <div className="absolute -top-24 -left-24 w-56 h-56 bg-brand-electric/5 rounded-full blur-[80px] pointer-events-none" />
                            <div className="absolute -bottom-20 -right-20 w-52 h-52 bg-brand-steel/5 rounded-full blur-[60px] pointer-events-none" />

                            <div className="relative z-10 flex-grow">
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-3xl font-black text-brand-navy tracking-tighter">Send us a Message</h2>
                                    <span className="bg-brand-electric/15 border border-brand-electric/40 text-brand-electric text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,229,255,0.3)]">
                                        Online
                                    </span>
                                </div>
                                <p className="text-brand-slate mb-8 max-w-sm text-sm font-light">
                                    Initialize contact below and our tactical dispatch will respond <span className="text-brand-electric font-bold">within 24 hours</span>.
                                </p>

                                <div className="bg-brand-navy/5 p-4 rounded-[1.5rem] backdrop-blur-md border border-brand-steel/10 shadow-sm">
                                    <ContactForm />
                                </div>
                            </div>

                            {/* Social Footer inside Card */}
                            <div className="mt-8 pt-6 border-t border-brand-steel/10 text-center relative z-10">
                                <p className="text-brand-slate text-xs mb-4 font-black uppercase tracking-widest">Secure Comms Links</p>
                                <div className="flex justify-center gap-4">
                                    <a href="https://facebook.com/globalsecuritysolutions" className="p-3 bg-brand-navy/5 border border-brand-steel/10 rounded-xl text-brand-electric hover:bg-brand-electric hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"><Facebook className="w-4 h-4" /><span className="sr-only">Facebook</span></a>
                                    <a href="https://instagram.com/globalsecuritysolutions" className="p-3 bg-brand-navy/5 border border-brand-steel/10 rounded-xl text-brand-electric hover:bg-brand-electric hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"><Instagram className="w-4 h-4" /><span className="sr-only">Instagram</span></a>
                                    <a href="https://linkedin.com/company/global-security-solutions-cape-town" className="p-3 bg-brand-navy/5 border border-brand-steel/10 rounded-xl text-brand-electric hover:bg-brand-electric hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"><Linkedin className="w-4 h-4" /><span className="sr-only">LinkedIn</span></a>
                                </div>
                            </div>
                        </motion.div>

                    </motion.div>

                    {/* Map Embed */}
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mt-12 rounded-[2rem] overflow-hidden border border-brand-steel/10 shadow-xl h-[400px] md:h-[500px] relative z-10 w-full bg-white"
                    >
                        <iframe
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://maps.google.com/maps?q=Global+Security+Solutions,+66+Robyn+Rd,+Durbanville,+Cape+Town,+7550&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            className="grayscale hover:grayscale-0 transition-all duration-[1000ms]"
                        ></iframe>
                    </motion.div>

                </div>
            </div>
        </div>
    )
}
