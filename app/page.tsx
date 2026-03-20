"use client"

import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ArrowRight, ShieldCheck, Zap, Settings } from 'lucide-react'
import { motion } from 'framer-motion'
import { MarketingBanner } from '@/components/MarketingBanner'

import { ServiceCarousel } from '@/components/ServiceCarousel'
import { SectorCarousel } from '@/components/SectorCarousel'

// Critical LCP Optimization: Lazy load heavy interactive components below the fold
const ContactForm = dynamic(() => import('@/components/ContactForm').then(mod => mod.ContactForm))
const TestimonialCarousel = dynamic(() => import('@/components/TestimonialCarousel').then(mod => mod.TestimonialCarousel))
const BrandCarousel = dynamic(() => import('@/components/BrandCarousel').then(mod => mod.BrandCarousel))

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 selection:bg-blue-600 selection:text-white overflow-hidden">

      {/* SECTION 1: HERO HEADER */}
      <MarketingBanner />

      {/* Stats Section - Moved up for Instant Credibility */}
      <section className="relative py-12 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 overflow-hidden shadow-inner">
        {/* Subtle animated background shapes */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl mix-blend-overlay -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl mix-blend-overlay translate-y-1/2 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white"
          >
            {[
              { stat: "10+", label: "Years Experience" },
              { stat: "500+", label: "Installations" },
              { stat: "100%", label: "Quality Guaranteed" },
              { stat: "24/7", label: "Support" }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <div className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tighter drop-shadow-md">{item.stat}</div>
                <div className="text-blue-100 text-xs md:text-sm uppercase tracking-[0.15em] font-semibold">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trusted By Carousel */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4 text-center">
          <motion.p 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em] mb-10"
          >
            Trusted by Cape Town&apos;s Leading Brands
          </motion.p>
          <BrandCarousel />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 relative bg-slate-50 isolate">
        {/* Advanced Background blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[100px] opacity-60 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[100px] opacity-60 translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="container mx-auto relative z-10 px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center md:mb-20 mb-16"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-100 text-blue-700 font-bold text-sm tracking-widest uppercase mb-6 shadow-sm border border-blue-200/50">Our Expertise</span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight drop-shadow-sm">
              Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Security Solutions</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed md:text-xl">
              Equipping your premises with state-of-the-art defenses. From perimeter fencing to intelligent alarm integration, we secure your peace of mind.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <ServiceCarousel />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-20 text-center"
          >
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-slate-900 rounded-full hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/20 active:scale-95 transition-all group"
            >
              Explore All Services
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Sector Focus - Dark Theme Interstitial */}
      <section className="py-32 bg-slate-950 text-white relative isolate overflow-hidden">
        {/* Deep immersive backgrounds */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 mix-blend-overlay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[800px] bg-gradient-to-b from-indigo-900/20 via-blue-900/10 to-transparent blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Tailored to Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Environment</span></h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
              Security needs differ vastly between a quiet residential estate and a bustling industrial park. We architect tailored risk assessments for every sector.
            </p>
          </motion.div>

          {/* Since SectorCarousel is likely a client component, wrapping it safely */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <SectorCarousel />
          </motion.div>
        </div>
      </section>

      {/* Why Us - Bento Grid Style */}
      <section className="py-32 bg-white relative isolate">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center md:mb-20 mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">Why Choose Global Security?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl">
              Beyond the hardware, it&apos;s our meticulous process and dedicated people that set us apart.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Settings,
                bgClass: "bg-blue-50",
                textClass: "text-blue-600",
                title: "Owner Managed",
                desc: "Kyle Cass personally oversees projects, ensuring direct accountability and consistent premium quality standards on every job."
              },
              {
                icon: ShieldCheck,
                bgClass: "bg-indigo-50",
                textClass: "text-indigo-600",
                title: "Certified Experts",
                desc: "Our team is certified by leading brands like Hikvision, Ajax, Paradox, and Nemtek, ensuring full warranty compliance and flawless integrations."
              },
              {
                icon: Zap,
                bgClass: "bg-cyan-50",
                textClass: "text-cyan-600",
                title: "Always Online",
                desc: "We design with South African realities in mind. Advanced battery backups ensure your security stays online even when the grid fails."
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-slate-100 transition-all duration-300"
              >
                <div className={`w-16 h-16 ${feature.bgClass} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.textClass}`} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials & Project Feature */}
      <section className="py-32 bg-slate-50 relative isolate overflow-hidden">
        {/* Subtle top border decorative element */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        
        <div className="container mx-auto px-4 md:px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold text-center text-slate-900 mb-20 tracking-tight"
          >
            What Our Clients Say
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-32"
          >
            <TestimonialCarousel />
          </motion.div>

          {/* Featured Case Study Card */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative group"
          >
            {/* Animated Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
            
            <div className="grid grid-cols-1 lg:grid-cols-5 relative z-10">
              <div className="p-10 lg:p-16 xl:p-20 flex flex-col justify-center lg:col-span-2">
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-bold uppercase tracking-widest mb-6 w-fit ring-1 ring-blue-400/30">
                  Featured Project
                </span>
                <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">Chere Botha School</h3>
                <p className="text-slate-300 mb-10 text-lg md:text-xl leading-relaxed">
                  A massive security overhaul ensuring total safety for students and staff. Features include IP CCTV, biometric access control, and rapid response alarm integration.
                </p>
                <div>
                  <Link
                    href="/projects"
                    className="inline-flex items-center text-slate-900 bg-white px-8 py-4 rounded-full font-bold hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all w-fit"
                  >
                    View Gallery
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
              <div className="relative h-[300px] md:h-[400px] lg:h-auto lg:col-span-3 bg-white/5 backdrop-blur-sm overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent z-10 hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 lg:hidden" />
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                  className="w-full h-full relative p-8"
                >
                  <Image
                    src="/projects/chere-botha-1.png"
                    alt="Chere Botha Installation"
                    fill
                    className="object-contain p-4 lg:p-12 filter drop-shadow-2xl"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-32 bg-white relative overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">Ready to Upgrade Your Security?</h2>
              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">Get a free, detailed risk assessment and quote tailored to your exact needs.</p>
            </div>
            <div className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgb(0,0,0,0.06)] border border-slate-100 p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
