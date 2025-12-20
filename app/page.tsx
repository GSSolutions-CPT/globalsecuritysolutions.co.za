import Link from 'next/link'
import Image from 'next/image'
import { Shield, CheckCircle2, Star, ArrowRight, Video, Lock, Zap, Smartphone, Key, Settings } from 'lucide-react'
import { ServiceCard } from '@/components/ServiceCard'
import { ContactForm } from '@/components/ContactForm'
import { BrandCarousel } from '@/components/BrandCarousel'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* SECTION 1: HERO HEADER */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-32 overflow-hidden">
        {/* Background Image Placeholder - In real app, use next/image with a real photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.png"
            alt="Global Security Solutions Technician"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-blue-900/40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" data-aos="fade-up">
              Expert Security System Installations in Cape Town.
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl" data-aos="fade-up" data-aos-delay="100">
              Trusted by homeowners and businesses for Alarms, CCTV, and Electric Fencing.
              We provide professional, owner-managed security solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="200">
              <Link
                href="/contact"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg text-center transition-colors shadow-lg shadow-red-900/20"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/projects"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white px-8 py-4 rounded-lg font-bold text-lg text-center transition-colors"
              >
                View Our Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TRUST BAR */}
      <div className="bg-white border-b border-slate-200">
        <div className="text-center pt-8">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Trusted Brands We Install</p>
        </div>
        <BrandCarousel />
      </div>

      {/* SECTION 3: CORE SERVICES GRID */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Comprehensive Security Solutions</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              From residential homes to industrial estates, we cover all aspects of electronic security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <ServiceCard
              title="Alarm Systems"
              description="Smart, wireless, and wired alarm systems to detect intruders instantly."
              icon={Shield}
              href="/services/alarm-system-installation"
            />
            <ServiceCard
              title="CCTV Surveillance"
              description="High-definition cameras with remote viewing on your smartphone."
              icon={Video}
              href="/services/cctv-surveillance-systems"
            />
            <ServiceCard
              title="Electric Fencing"
              description="Certified electric fence installations for perimeter protection."
              icon={Zap} // Using Zap for electricity
              href="/services/electric-fence-installations"
            />
            <ServiceCard
              title="Access Control"
              description="Biometric and keycard systems to manage who enters your property."
              icon={Key}
              href="/services/access-control-solutions"
            />
            <ServiceCard
              title="Gate Automation"
              description="Reliable gate and garage motors for convenient and safe access."
              icon={Settings}
              href="/services/gate-and-garage-automation"
            />
            <ServiceCard
              title="Smart Home"
              description="Integrate your security with your smart home ecosystem."
              icon={Smartphone}
              href="/services/smart-home-automation"
            />
          </div>

          <div className="text-center">
            <Link
              href="/services"
              className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 text-lg group"
            >
              View All Services <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY US? */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
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
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
              <h3 className="text-2xl font-bold mb-6 border-b border-slate-600 pb-4">Our Guarantee</h3>
              <p className="mb-6 text-slate-300">
                "We believe in doing it right the first time. That's why we offer comprehensive warranties on all hardware and a 12-month workmanship guarantee.""
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4 font-bold text-xl">KC</div>
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
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-16">What Our Clients Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Review 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
              <div className="flex text-yellow-500 mb-4">
                <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-slate-600 mb-6 italic">"Excellent service from Kyle and the team. They installed our CCTV system quickly and neatly. The app viewing works perfectly!"</p>
              <p className="font-bold text-slate-900">- Sarah J., Durbanville</p>
            </div>
            {/* Review 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
              <div className="flex text-yellow-500 mb-4">
                <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-slate-600 mb-6 italic">"Professional advice and great workmanship. The electric fence upgrade has given us real peace of mind."</p>
              <p className="font-bold text-slate-900">- Michael R., Table View</p>
            </div>
            {/* Review 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
              <div className="flex text-yellow-500 mb-4">
                <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-slate-600 mb-6 italic">"Highly recommend Global Security Solutions. Rashaad managed the project efficiently and the team was very respectful."</p>
              <p className="font-bold text-slate-900">- David K., Constantia</p>
            </div>
          </div>

          {/* Featured Project Teaser */}
          <div className="bg-blue-600 rounded-2xl overflow-hidden shadow-2xl">
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
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors inline-block"
                  >
                    View Case Study
                  </Link>
                </div>
              </div>
              <div className="bg-blue-800 min-h-[300px] relative">
                <div className="absolute inset-0 flex items-center justify-center text-blue-400 font-bold text-2xl">
                  Project Image Placeholder
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CTA / PRE-FOOTER */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ready to Secure Your Property?</h2>
              <p className="text-xl text-slate-600">Get a free, no-obligation quote today.</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

    </div>
  )
}
