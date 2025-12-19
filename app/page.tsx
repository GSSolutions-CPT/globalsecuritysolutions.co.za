import Link from "next/link";
import { ServiceCard } from "@/components/ServiceCard";
import { ContactForm } from "@/components/ContactForm";
import { Shield, Camera, Lock, Zap, CheckCircle2, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/50 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center z-0 opacity-30"
          style={{ backgroundImage: 'url("/hero-bg.jpg")' }} // Placeholder
        />

        <div className="container mx-auto px-4 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                High-Performance <span className="text-blue-500 bg-clip-text">Security Installations</span> Cape Town
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl">
                Expert alarms, CCTV, and electric fencing. Trusted by homes and businesses across the Western Cape.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold text-center shadow-lg transition-all transform hover:scale-105"
                >
                  Get a Free Quote
                </Link>
                <Link
                  href="/services"
                  className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-bold text-center backdrop-blur-sm transition-all border border-white/20"
                >
                  View Services
                </Link>
              </div>
            </div>
            <div data-aos="fade-left" className="hidden lg:block">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Core Security Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We provide comprehensive security solutions tailored to your specific needs, using only top-tier brands like Hikvision, IDS, and Paradox.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div data-aos="fade-up" data-aos-delay="0">
              <ServiceCard
                title="Alarm Systems"
                description="Professional installation of AJAX, IDS, and Paradox alarm systems for 24/7 intrusion detection."
                href="/services/alarm-systems"
                icon={Shield}
              />
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <ServiceCard
                title="CCTV Surveillance"
                description="High-definition camera systems with remote viewing capabilities to monitor your property from anywhere."
                href="/services/cctv-surveillance"
                icon={Camera}
              />
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <ServiceCard
                title="Access Control"
                description="Advanced biometric and keypad access control solutions for secure and convenient entry management."
                href="/services/access-control"
                icon={Lock}
              />
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <ServiceCard
                title="Electric Fencing"
                description="COC-compliant electric fencing installations to secure your perimeter and deter intruders effectively."
                href="/services/electric-fencing"
                icon={Zap}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2>
              <p className="text-slate-600 max-w-xl">
                We take pride in our workmanship. Here are a few of our recent installations in Cape Town.
              </p>
            </div>
            <Link href="/projects" className="text-blue-600 font-bold hover:text-blue-800 flex items-center mt-4 md:mt-0">
              View All Projects <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Chere Botha School */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg" data-aos="fade-up">
              <div className="aspect-video bg-slate-200 relative">
                {/* Placeholder for project image */}
                <div className="absolute inset-0 bg-slate-800/10 flex items-center justify-center text-slate-400">Project Image</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-1">Chere Botha School</h3>
                <p className="text-slate-300 text-sm">Access Control & Hikvision Installation</p>
              </div>
            </div>

            {/* 35 on Rose */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="100">
              <div className="aspect-video bg-slate-200 relative">
                <div className="absolute inset-0 bg-slate-800/10 flex items-center justify-center text-slate-400">Project Image</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-1">35 on Rose</h3>
                <p className="text-slate-300 text-sm">Large-scale HOA Security Upgrade</p>
              </div>
            </div>

            {/* Salus and Demos */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="200">
              <div className="aspect-video bg-slate-200 relative">
                <div className="absolute inset-0 bg-slate-800/10 flex items-center justify-center text-slate-400">Project Image</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-1">Salus & Demos</h3>
                <p className="text-slate-300 text-sm">Premium Residential Access Control</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Why Choose Global Security Solutions?</h2>
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4 mt-1 bg-green-100 p-2 rounded-full h-fit">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800">Expert Workmanship</h4>
                    <p className="text-slate-600">Our team consists of certified technicians with years of experience in complex installations.</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4 mt-1 bg-green-100 p-2 rounded-full h-fit">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800">Top-Tier Brands</h4>
                    <p className="text-slate-600">We only install trusted brands like Hikvision, IDS, Paradox, and AJAX to ensure reliability.</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4 mt-1 bg-green-100 p-2 rounded-full h-fit">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800">Personalized Service</h4>
                    <p className="text-slate-600">Owned by Kyle Cass and Rashaad Steyn, we pride ourselves on direct, hands-on management.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative" data-aos="fade-left">
              {/* Mobile version of contact form for small screens appeared in hero, but here maybe an image or stats? 
                    Actually, let's put a nice image or graphic here. 
                */}
              <div className="rounded-2xl bg-blue-900 text-white p-10 shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-4">Ready to Secure Your Property?</h3>
                  <p className="mb-8 text-blue-100">Get a comprehensive security audit and a custom quote tailored to your budget.</p>
                  <Link href="/contact" className="block w-full py-4 bg-white text-blue-900 font-bold text-center rounded-lg hover:bg-blue-50 transition-colors">
                    Contact Us Today
                  </Link>
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-10">
                  <Shield className="w-64 h-64" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Contact Form Section (visible only on mobile if not in hero) - actually Hero has it hidden on mobile? 
          Hero code: <div data-aos="fade-left" className="hidden lg:block"><ContactForm /></div> 
          So we need a Contact Form visible on mobile somewhere.
      */}
      <section className="py-12 bg-white lg:hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
          <ContactForm />
        </div>
      </section>

    </div>
  );
}
