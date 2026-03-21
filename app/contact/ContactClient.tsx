'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageSquare, Facebook, Instagram, Linkedin } from 'lucide-react'
import dynamic from 'next/dynamic'
import { PageHero } from '@/components/PageHero'

// Lazy load the heavy form component
const ContactForm = dynamic(() => import('@/components/ContactForm').then(mod => mod.ContactForm), { 
    ssr: false,
    loading: () => <div className="h-64 flex items-center justify-center text-brand-steel">Loading secure form...</div>
})

const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
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
                bgImage="/page-heroes/contact-hero.png"
                pbClass="pb-48"
            />

            {/* Main Content Area */}
            <div className="relative z-30 -mt-32 pb-16">
                <div className="container mx-auto px-4 md:px-8">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
                    >
                        {/* Contact Info Card */}
                        <motion.div variants={fadeInUp} className="bg-brand-navy p-8 md:p-12 rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(10,25,47,0.5)] border border-brand-steel/20 relative overflow-hidden h-full group">
                            {/* Decorative Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-electric/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-electric/10 rounded-full blur-[100px] pointer-events-none" />
                            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

                            <div className="relative z-10 space-y-10">
                                <div>
                                    <h2 className="text-3xl font-black text-brand-white mb-2 tracking-tighter">Contact Details</h2>
                                    <p className="text-brand-steel font-light text-sm md:text-base">Reach out directly through your preferred encrypted channel.</p>
                                </div>

                                <div className="space-y-6">
                                    {[
                                        { icon: Phone, title: "Call or WhatsApp", desc: "Mon-Fri, 8am - 5pm", link: "062 955 8559", href: "https://wa.me/27629558559" },
                                        { icon: Mail, title: "Email Headquarters", desc: "For quotes & rapid tactical queries", link: "sales@globalsecuritysolutions.co.za", href: "mailto:sales@globalsecuritysolutions.co.za" },
                                        { icon: Mail, title: "Administration", desc: "Accounts & vendor relations", link: "admin@globalsecuritysolutions.co.za", href: "mailto:admin@globalsecuritysolutions.co.za" }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-start group/item">
                                            <div className="w-12 h-12 rounded-2xl bg-brand-white/5 border border-brand-steel/10 text-brand-electric flex items-center justify-center shrink-0 mr-5 group-hover/item:bg-brand-electric group-hover/item:text-brand-navy transition-all duration-300 shadow-inner">
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-brand-white text-base mb-1 tracking-tight">{item.title}</h3>
                                                <p className="text-brand-steel text-xs mb-1 font-light">{item.desc}</p>
                                                <a href={item.href} className="text-sm font-bold text-brand-electric hover:text-brand-white transition-colors">{item.link}</a>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="flex items-start group/item">
                                        <div className="w-12 h-12 rounded-2xl bg-brand-white/5 border border-brand-steel/10 text-brand-electric flex items-center justify-center shrink-0 mr-5 group-hover/item:bg-brand-electric group-hover/item:text-brand-navy transition-all duration-300 shadow-inner">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-brand-white text-base mb-1 tracking-tight">Visit Our HQ</h3>
                                            <p className="text-brand-steel text-xs mb-1 font-light">Appointments highly recommended</p>
                                            <address className="not-italic text-brand-slate text-sm leading-relaxed mb-2 font-medium">
                                                66 Robyn Rd, Langeberg Ridge,<br />
                                                Cape Town, 7550
                                            </address>
                                            <a
                                                href="https://www.google.com/maps/dir//66+Robyn+Rd,+Langeberg+Ridge,+Cape+Town,+7550"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block text-xs font-bold text-brand-electric hover:text-brand-white uppercase tracking-wider transition-colors"
                                            >
                                                Get Directions &rarr;
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-brand-steel/20">
                                    <h3 className="font-black text-brand-white mb-4 flex items-center gap-2 tracking-tight text-lg">
                                        <Clock className="w-5 h-5 text-brand-electric" />
                                        Operating Hours
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 text-xs md:text-sm">
                                        <div className="bg-brand-white/5 p-4 rounded-xl border border-brand-white/10 shadow-inner">
                                            <span className="block font-black text-brand-white tracking-widest uppercase text-[10px] mb-1">Weekdays</span>
                                            <span className="text-brand-electric font-bold">08:00 - 17:00</span>
                                        </div>
                                        <div className="bg-brand-white/5 p-4 rounded-xl border border-brand-white/10 shadow-inner">
                                            <span className="block font-black text-brand-white tracking-widest uppercase text-[10px] mb-1">Weekends</span>
                                            <span className="text-brand-electric font-bold">Emergency Only</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form Card */}
                        <motion.div variants={fadeInUp} className="bg-brand-navy p-8 md:p-12 rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(10,25,47,0.5)] border border-brand-steel/20 relative overflow-hidden h-full flex flex-col focus-within:ring-2 focus-within:ring-brand-electric focus-within:outline-none">
                            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                                <MessageSquare className="w-32 h-32 text-brand-electric" />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-full bg-brand-electric/5 blur-[100px] pointer-events-none mix-blend-screen" />
                            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

                            <div className="relative z-10 flex-grow">
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-3xl font-black text-brand-white tracking-tighter drop-shadow-md">Send us a Message</h2>
                                    <span className="bg-brand-electric/20 border border-brand-electric/50 text-brand-electric text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,229,255,0.4)]">
                                        Online
                                    </span>
                                </div>
                                <p className="text-brand-steel mb-8 max-w-sm text-sm font-light">
                                    Initialize contact below and our tactical dispatch will respond <span className="text-brand-electric font-bold">within 24 hours</span>.
                                </p>

                                <div className="bg-brand-white/5 p-4 rounded-[1.5rem] backdrop-blur-md border border-brand-steel/10 shadow-inner">
                                    <ContactForm />
                                </div>
                            </div>

                            {/* Social Footer inside Card */}
                            <div className="mt-8 pt-6 border-t border-brand-steel/20 text-center relative z-10">
                                <p className="text-brand-steel text-xs mb-4 font-black uppercase tracking-widest">Secure Comms Links</p>
                                <div className="flex justify-center gap-4">
                                    <a href="https://facebook.com/globalsecuritysolutions" className="p-3 bg-brand-white/5 border border-brand-white/10 rounded-xl text-brand-electric hover:bg-brand-electric hover:text-brand-navy transition-all duration-300 hover:scale-110 shadow-inner"><Facebook className="w-4 h-4" /><span className="sr-only">Facebook</span></a>
                                    <a href="https://instagram.com/globalsecuritysolutions" className="p-3 bg-brand-white/5 border border-brand-white/10 rounded-xl text-brand-electric hover:bg-brand-electric hover:text-brand-navy transition-all duration-300 hover:scale-110 shadow-inner"><Instagram className="w-4 h-4" /><span className="sr-only">Instagram</span></a>
                                    <a href="https://linkedin.com/company/global-security-solutions-cape-town" className="p-3 bg-brand-white/5 border border-brand-white/10 rounded-xl text-brand-electric hover:bg-brand-electric hover:text-brand-navy transition-all duration-300 hover:scale-110 shadow-inner"><Linkedin className="w-4 h-4" /><span className="sr-only">LinkedIn</span></a>
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
                        className="mt-12 rounded-[2rem] overflow-hidden border border-brand-steel/20 shadow-[0_20px_50px_-15px_rgba(10,25,47,0.5)] h-[400px] md:h-[500px] relative z-10 w-full bg-brand-navy"
                    >
                        {/* Interactive overlay to prevent accidental scrolling on mobile */}
                        <div className="absolute inset-0 bg-brand-navy/10 pointer-events-none mix-blend-overlay z-10" />
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
