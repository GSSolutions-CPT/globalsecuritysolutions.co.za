"use client"

import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ArrowRight, ShieldCheck, Zap, Settings, Command } from 'lucide-react'
import { motion, Variants } from 'framer-motion'
import { MarketingBanner } from '@/components/MarketingBanner'

import { ServiceCarousel } from '@/components/ServiceCarousel'
import { SectorCarousel } from '@/components/SectorCarousel'

// Lazy load heavy interactive components below the fold
const ContactForm = dynamic(() => import('@/components/ContactForm').then(mod => mod.ContactForm))
const TestimonialCarousel = dynamic(() => import('@/components/TestimonialCarousel').then(mod => mod.TestimonialCarousel))
const BrandCarousel = dynamic(() => import('@/components/BrandCarousel').then(mod => mod.BrandCarousel))

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-brand-white selection:bg-brand-electric selection:text-brand-navy overflow-hidden">

      {/* SECTION 1: HERO HEADER */}
      <MarketingBanner />

      {/* Stats Section - High Contrast Navy & Electric Blue */}
      <section className="relative py-12 lg:py-6 bg-brand-navy overflow-hidden">
        {/* Dynamic Electric Blue Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-electric/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-steel/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12 text-center text-brand-white"
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
                className="relative p-6 rounded-2xl bg-brand-white/5 border border-brand-steel/30 backdrop-blur-md shadow-[0_0_20px_rgba(0,229,255,0.05)] hover:border-brand-electric/50 hover:bg-brand-white/10 transition-all duration-500 group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-brand-electric/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="text-3xl lg:text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-br from-brand-white to-brand-electric drop-shadow-lg tracking-tighter">
                  {item.stat}
                </div>
                <div className="text-brand-steel text-xs lg:text-sm uppercase tracking-[0.1em] font-bold">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trusted By Carousel - Clean White & Slate */}
      <section className="py-12 bg-brand-white border-b border-brand-slate/20 relative">
        <div className="container mx-auto px-4 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs lg:text-sm font-bold text-brand-slate uppercase tracking-[0.3em] mb-12 flex items-center justify-center gap-4"
          >
            <span className="w-12 h-px bg-brand-slate/30" />
            Trusted by Cape Town&apos;s Leading Brands
            <span className="w-12 h-px bg-brand-slate/30" />
          </motion.p>
          <div className="opacity-80 grayscale hover:grayscale-0 transition-all duration-700">
            <BrandCarousel />
          </div>
        </div>
      </section>

      {/* Services Section - Steel & White Elegance */}
      <section className="py-6 relative bg-brand-white isolate overflow-hidden">
        {/* Abstract Steel & Electric Backgrounds */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-steel/5 rounded-full blur-[150px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-electric/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] mix-blend-multiply" />

        <div className="container mx-auto relative z-10 px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center md:mb-8 mb-6"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-navy text-brand-electric font-bold text-xs lg:text-sm tracking-[0.2em] uppercase mb-8 shadow-xl shadow-brand-navy/10 border border-brand-electric/20 backdrop-blur-md">
              <Command className="w-4 h-4" />
              Our Expertise
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-brand-navy mb-4 tracking-tighter leading-tight drop-shadow-sm">
              Comprehensive <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electric to-brand-steel">Security Solutions</span>
            </h2>
            <p className="text-brand-slate max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium">
              Equipping your premises with state-of-the-art defenses. From perimeter fencing to intelligent alarm integration, we secure your peace of mind.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Elegant framing for the carousel */}
            <div className="absolute -inset-4 bg-gradient-to-b from-brand-white to-transparent opacity-50 blur-xl -z-10 rounded-[3rem]" />
            <ServiceCarousel />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-brand-navy bg-brand-electric rounded-full hover:bg-brand-navy hover:text-brand-electric hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] active:scale-95 transition-all duration-300 group ring-4 ring-brand-electric/20"
            >
              Explore All Services
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Sector Focus - Ultra Premium Dark Theme */}
      <section className="py-6 bg-brand-navy text-brand-white relative isolate overflow-hidden">
        {/* Deep immersive gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-[#061020] to-brand-navy" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-brand-electric/10 blur-[150px] pointer-events-none mix-blend-screen" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter">
              Tailored to Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electric to-brand-steel drop-shadow-[0_0_30px_rgba(0,229,255,0.3)]">Environment</span>
            </h2>
            <p className="text-brand-steel max-w-3xl mx-auto text-sm md:text-base leading-relaxed font-light">
              Security needs differ vastly between a quiet residential estate and a bustling industrial park. We architect highly specific risk assessments for every sector.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <SectorCarousel />
          </motion.div>
        </div>
      </section>

      {/* Why Us - Bento Grid with Brand Colors */}
      <section className="py-6 bg-brand-white relative isolate border-b border-brand-slate/10">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center md:mb-8 mb-6"
          >
            <h2 className="text-3xl md:text-5xl font-black text-brand-navy mb-4 tracking-tighter">Why Global Security?</h2>
            <p className="text-brand-slate max-w-2xl mx-auto text-sm md:text-base font-medium">
              Beyond the hardware, it&apos;s our meticulous process and dedicated people that set us completely apart.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
          >
            {[
              {
                icon: Settings,
                title: "Owner Managed",
                desc: "Kyle Cass personally oversees projects, ensuring direct accountability and consistent premium quality standards on every job."
              },
              {
                icon: ShieldCheck,
                title: "Certified Experts",
                desc: "Our team is certified by leading brands like Hikvision, Ajax, Paradox, and Nemtek, ensuring full warranty compliance and flawless integrations."
              },
              {
                icon: Zap,
                title: "Always Online",
                desc: "We design with South African realities in mind. Advanced battery backups ensure your security stays online even when the grid fails."
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -12 }}
                className="group relative bg-brand-navy rounded-[1.5rem] p-6 lg:p-8 shadow-2xl shadow-brand-navy/10 border border-brand-steel/20 hover:border-brand-electric/50 transition-all duration-500 overflow-hidden"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-electric/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-12 h-12 bg-brand-white/10 backdrop-blur-md border border-brand-white/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-inner">
                  <feature.icon className="w-6 h-6 text-brand-electric" />
                </div>
                <h3 className="text-xl font-bold text-brand-white mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-brand-steel leading-relaxed text-sm md:text-base font-light">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials & Project Feature */}
      <section className="py-6 bg-brand-white relative isolate overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-center text-brand-navy mb-8 tracking-tighter"
          >
            Client <span className="text-brand-slate">Outcomes</span>
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <TestimonialCarousel />
          </motion.div>

          {/* Featured Case Study Card - Striking Highlight */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="bg-brand-navy rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(10,25,47,0.5)] relative group ring-1 ring-white/10 hover:ring-brand-electric/40 transition-all duration-500"
          >
            {/* Animated Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-electric/20 via-transparent to-brand-steel/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20 mix-blend-overlay" />
            
            <div className="grid grid-cols-1 lg:grid-cols-5 relative z-10">
              <div className="p-8 lg:p-12 flex flex-col justify-center lg:col-span-2">
                <span className="inline-block px-4 py-1.5 rounded-full bg-brand-electric/10 text-brand-electric text-xs font-black uppercase tracking-[0.2em] mb-4 w-fit ring-1 ring-brand-electric/30 backdrop-blur-md">
                  Featured Project
                </span>
                <h3 className="text-2xl md:text-4xl font-black text-brand-white mb-4 leading-tight tracking-tighter">Chere Botha School</h3>
                <p className="text-brand-steel mb-8 text-sm md:text-base leading-relaxed font-light">
                  A massive security overhaul ensuring total safety for students and staff. Features include IP CCTV, biometric access control, and rapid response alarm integration.
                </p>
                <div>
                  <Link
                    href="/projects"
                    className="inline-flex items-center text-brand-navy bg-brand-electric px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-white hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:scale-105 active:scale-95 transition-all w-fit"
                  >
                    View Gallery
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] lg:h-auto lg:col-span-3 bg-brand-white/5 backdrop-blur-xl overflow-hidden flex items-center justify-center border-l border-white/5">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-transparent to-transparent z-10 hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent z-10 lg:hidden" />
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                  className="w-full h-full relative p-8"
                >
                  <Image
                    src="/projects/chere-botha-1.png"
                    alt="Chere Botha Installation"
                    fill
                    className="object-contain p-4 lg:p-12 filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA - Massive Impact */}
      <section id="contact" className="py-6 lg:py-8 bg-brand-navy relative overflow-hidden isolate">
        {/* Soft background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[800px] bg-brand-electric/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 mix-blend-overlay" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-6 lg:mb-8">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-white mb-8 tracking-tighter leading-tight drop-shadow-2xl">
                Ready to Upgrade <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electric to-brand-steel">Your Security?</span>
              </h2>
              <p className="text-xl md:text-3xl text-brand-steel max-w-3xl mx-auto font-light leading-relaxed">
                Get a completely free, detailed risk assessment and quote tailored to your exact needs.
              </p>
            </div>
            <div className="bg-brand-white rounded-[2.5rem] lg:rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-brand-slate/20 p-8 md:p-16 relative overflow-hidden ring-4 ring-brand-white/10">
              <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-brand-electric to-brand-navy" />
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
