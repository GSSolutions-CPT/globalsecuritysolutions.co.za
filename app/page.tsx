'use client'

import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, Star, ArrowRight } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'
import { BrandCarousel } from '@/components/BrandCarousel'
import { ServiceCarousel } from '@/components/ServiceCarousel'
import { SectorCarousel } from '@/components/SectorCarousel'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* SECTION 1: HERO HEADER */}
      <section className="relative bg-slate-900 text-white py-24 lg:py-32 overflow-hidden min-h-[600px] flex items-center">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Security Technician overlooking Cape Town"
            fill
            className="object-cover object-right"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-3xl">
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-lg"
              data-aos="fade-up"
            >
              Secure Your World with <span className="text-blue-400 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">Confidence</span>
            </h1>
            <p
              className="text-xl md:text-2xl mb-8 text-slate-200 font-light"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Premium alarms, CCTV, and perimeter protection for Cape Town's finest homes and businesses.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1"
              >
                Get a Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg transition-all"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Carousel Section */}
      <section className="py-10 bg-slate-50 border-b border-slate-200">
        <div className="container px-4 md:px-6 mb-6 text-center">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Trusted By Leading Brands</p>
        </div>
        <BrandCarousel />
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />

        <div className="container relative px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Comprehensive <span className="text-blue-600">Security Solutions</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              From residential homes to industrial estates, we cover all aspects of electronic security with precision and care.
            </p>
          </div>

          <div className="mb-24">
            <ServiceCarousel />
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Solutions by <span className="text-indigo-600">Sector</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Specialized security strategies tailored for your specific environment.
            </p>
          </div>

          <div className="mb-24">
            <SectorCarousel />
          </div>

          <div className="text-center mt-16">
            <Link
              href="/services"
              className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 text-lg group"
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY US - Dark Mode Stats */}
      <section className="py-24 bg-slate-900 text-white relative">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-16">
            <div className="p-6">
              <div className="text-5xl font-bold text-blue-400 mb-2">10+</div>
              <div className="text-xl font-semibold mb-2">Years Experience</div>
              <div className="text-slate-400">Serving Cape Town with pride.</div>
            </div>
            <div className="p-6 border-y md:border-y-0 md:border-x border-slate-800">
              <div className="text-5xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-xl font-semibold mb-2">Installations</div>
              <div className="text-slate-400">Homes & businesses secured.</div>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-xl font-semibold mb-2">Support</div>
              <div className="text-slate-400">Always there when you need us.</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Cape Town Chooses Global Security Solutions.</h2>
              <p className="text-slate-300 text-lg mb-8">
                We don't just install systems; we build trust. Our owner-managed approach ensures that every job meets our high standards of quality and reliability.
              </p>

              <ul className="space-y-6">
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mr-4 mt-1" />
                  <div>
                    <h3 className="font-bold text-xl">Owner-Managed</h3>
                    <p className="text-slate-400">Personal supervision and accountability on every project.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mr-4 mt-1" />
                  <div>
                    <h3 className="font-bold text-xl">Certified Installers</h3>
                    <p className="text-slate-400">Accredited by major brands like PSIRA, Hikvision, and Ajax.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mr-4 mt-1" />
                  <div>
                    <h3 className="font-bold text-xl">Load Shedding Ready</h3>
                    <p className="text-slate-400">Systems designed to keep running when the power goes out.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Image / Feature block */}
            <div className="bg-slate-800 p-8 rounded-[2rem] border border-slate-700">
              <h3 className="text-2xl font-bold mb-6 border-b border-slate-600 pb-4">Our Guarantee</h3>
              <p className="mb-6 text-slate-300">
                "We believe in doing it right the first time. That's why we offer comprehensive warranties on all hardware and a 12-month workmanship guarantee."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4 font-bold text-xl text-white">KC</div>
                <div>
                  <p className="font-bold">Kyle Cass</p>
                  <p className="text-sm text-slate-400">Owner, Global Security Solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: SOCIAL PROOF */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-16">What Our Clients Say</h2>

          <TestimonialCarousel />

          {/* Featured Project Teaser */}
          <div className="bg-blue-600 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 text-white flex flex-col justify-center">
                <span className="text-blue-200 font-bold uppercase tracking-widest mb-2">Featured Project</span>
                <h3 className="text-3xl font-bold mb-4">Chere Botha School</h3>
                <p className="text-blue-100 mb-8 text-lg">
                  A comprehensive security upgrade including access control, perimeter security, and high-definition surveillance for a safe learning environment.
                </p>
                <div>
                  <Link
                    href="/projects"
                    className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors inline-block"
                  >
                    View Case Study
                  </Link>
                </div>
              </div>
              <div className="bg-blue-800 relative h-full min-h-[400px] flex items-center justify-center p-4">
                <div className="relative h-full w-full rounded-lg overflow-hidden">
                  <Image
                    src="/projects/chere-botha-1.png"
                    alt="Chere Botha Installation"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CTA / PRE-FOOTER */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ready to Secure Your Property?</h2>
              <p className="text-xl text-slate-600">Get a free, no-obligation quoted today.</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

    </div>
  )
}
