'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShieldCheck, Zap, Settings } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'
import { MarketingBanner } from '@/components/MarketingBanner'
import { BrandCarousel } from '@/components/BrandCarousel'
import { ServiceCarousel } from '@/components/ServiceCarousel'
import { SectorCarousel } from '@/components/SectorCarousel'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans">

      {/* SECTION 1: HERO HEADER */}
      <MarketingBanner />

      {/* Trusted By Carousel - Clean & Minimal */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-8">Trusted by Cape Town&apos;s Leading Brands</p>
          <BrandCarousel />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="container mx-auto relative z-10 px-4 md:px-6">
          <div className="text-center md:mb-16 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Comprehensive <span className="text-blue-600">Security Solutions</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              We don&apos;t just install hardware; we architect complete security layers that integrate seamlessly into your lifestyle.
            </p>
          </div>

          <ServiceCarousel />

          <div className="mt-24 text-center">
            <Link
              href="/services"
              className="inline-flex items-center text-slate-900 font-bold hover:text-blue-600 text-lg group transition-colors"
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sector Focus - Dark Theme Interstitial */}
      <section className="py-24 bg-slate-900 text-white relative isolate">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Tailored to Your <span className="text-indigo-400">Environment</span></h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Security needs differ vastly between a quiet residential estate and a bustling industrial park. We specialize in sector-specific risk assessments and solutions.
              </p>
            </div>
            <div className="flex gap-4 overflow-hidden mask-fade-right">
              {/* Abstract visual representations could go here */}
            </div>
          </div>

          <SectorCarousel />
        </div>
      </section>

      {/* Why Us - Bento Grid Style */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Why Choose Global Security?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Beyond the hardware, it&apos;s our process and people that set us apart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-lg transition-shadow group">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Settings className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Owner Managed</h3>
              <p className="text-slate-600 leading-relaxed">
                Kyle Cass personally oversees projects, ensuring direct accountability and consistent quality standards on every job.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-lg transition-shadow group">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Certified Experts</h3>
              <p className="text-slate-600 leading-relaxed">
                Our team is certified by leading brands like Hikvision, Ajax, Paradox, and Nemtek.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-lg transition-shadow group">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Load Shedding Ready</h3>
              <p className="text-slate-600 leading-relaxed">
                We design with South African realities in mind. Your security stays online even when the grid goes down.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white divide-x divide-blue-500/50">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10+</div>
              <div className="text-blue-50 text-sm uppercase tracking-wider font-semibold">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-blue-50 text-sm uppercase tracking-wider font-semibold">Installations</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
              <div className="text-blue-50 text-sm uppercase tracking-wider font-semibold">Quality Guaranteed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-blue-50 text-sm uppercase tracking-wider font-semibold">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & Project Feature */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-slate-900 mb-16">What Our Clients Say</h2>

          <div className="mb-24">
            <TestimonialCarousel />
          </div>

          {/* Featured Case Study Card */}
          <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="p-12 lg:p-16 flex flex-col justify-center relative z-10 lg:col-span-2">
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/20 text-blue-400 text-sm font-bold uppercase tracking-widest mb-6 w-fit">
                  Featured Project
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Chere Botha School</h3>
                <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                  A massive security upgrade ensuring the safety of students and staff. Included IP CCTV, biometric access control, and integrated alarm response.
                </p>
                <div>
                  <Link
                    href="/projects"
                    className="inline-flex items-center bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors"
                  >
                    View Project Gallery
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] lg:h-auto bg-white lg:col-span-3">
                <Image
                  src="/projects/chere-botha-1.png"
                  alt="Chere Botha Installation"
                  fill
                  className="object-contain p-4"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-slate-900 via-transparent to-transparent lg:hidden" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Ready to Upgrade Your Security?</h2>
              <p className="text-xl text-slate-600">Get a free, detailed risk assessment and quote tailored to your needs.</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

    </div>
  )
}
