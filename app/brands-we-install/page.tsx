import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import Image from 'next/image'
import { CheckCircle2, ShieldCheck } from 'lucide-react'
import { PageHero } from '@/components/PageHero'
import BrandsClient from './BrandsClient'

const ContactForm = dynamic(() => import('@/components/ContactForm').then(mod => mod.ContactForm), { 
    
    loading: () => <div className="h-[500px] w-full animate-pulse bg-brand-navy/5 rounded-2xl border border-brand-steel/10 flex items-center justify-center text-brand-steel">Loading secure form...</div>
});


export const metadata: Metadata = {
    title: 'Security Brands We Install | Hikvision, Paradox, Ajax & More',
    description: 'We are certified installers for world-leading security brands including Hikvision, Paradox, Ajax, Nemtek, and Centurion. Expert installation and support in Cape Town.',
    openGraph: {
        title: 'Certified Security Installers | Top Global Brands',
        description: 'Authorized installers for Hikvision, Paradox, Centurion, and more. Get professional installation for your home or business.',
        images: ['/brand-hikvision.png'], // Using a prominent brand logo or generic image
    }
}

// Fallback for missing brand images if any unique ones were in the carousel that I missed
// I will stick to the main ones verified in the carousel
const allBrands = [
    {
        name: 'AJAX',
        src: '/brand-ajax.png',
        url: 'https://ajax.systems',
        alt: 'AJAX wireless alarm systems for homes in Durbanville',
    },
    {
        name: 'Axis',
        src: '/brand-axis.png',
        url: 'https://www.axis.com',
        alt: 'Axis network security cameras',
    },
    {
        name: 'CAME',
        src: '/brand-came.png',
        url: 'https://www.came.com',
        alt: 'CAME BPT intercoms',
    },
    {
        name: 'Centurion',
        src: '/brand-centurion.png',
        url: 'https://www.centsys.co.za',
        alt: 'Centurion gate motors',
    },
    {
        name: 'Commax',
        src: '/brand-commax.png',
        url: 'https://www.commax.com',
        alt: 'Commax video intercoms',
    },
    {
        name: 'Dahua',
        src: '/brand-dahua.png',
        url: 'https://www.dahuasecurity.com',
        alt: 'Dahua CCTV cameras',
    },
    {
        name: 'DSC',
        src: '/brand-dsc.png',
        url: 'https://www.dsc.com',
        alt: 'DSC alarm panels',
    },
    {
        name: 'EZVIZ',
        src: '/brand-ezviz.png',
        url: 'https://www.ezviz.com',
        alt: 'EZVIZ smart home cameras',
    },
    {
        name: 'Hanwha',
        src: '/brand-hanwha.png',
        url: 'https://www.hanwhavision.com',
        alt: 'Hanwha Techwin cameras',
    },
    {
        name: 'HID',
        src: '/brand-hid.png',
        url: 'https://www.hidglobal.com',
        alt: 'HID access control',
    },
    {
        name: 'Hikvision',
        src: '/brand-hikvision.png',
        url: 'https://www.hikvision.com',
        alt: 'Hikvision CCTV systems',
    },
    {
        name: 'IDEMIA',
        src: '/brand-idemia.png',
        url: 'https://www.idemia.com',
        alt: 'IDEMIA biometrics',
    },
    {
        name: 'IDS',
        src: '/brand-ids.png',
        url: 'https://www.idsprotect.co.za',
        alt: 'IDS alarm systems',
    },
    {
        name: 'Impro',
        src: '/brand-impro.png',
        url: 'https://www.impro.net',
        alt: 'Impro access control',
    },
    {
        name: 'Kocom',
        src: '/brand-kocom.png',
        url: 'http://www.kocom.com',
        alt: 'Kocom intercoms',
    },
    {
        name: 'Nemtek',
        src: '/brand-nemtek.png',
        url: 'https://www.nemtek.com',
        alt: 'Nemtek electric fencing',
    },
    {
        name: 'Nice',
        src: '/brand-nice.png',
        url: 'https://www.niceforyou.com',
        alt: 'Nice gate automation',
    },
    {
        name: 'Optex',
        src: '/brand-optex.png',
        url: 'https://www.optex-europe.com',
        alt: 'Optex beams',
    },
    {
        name: 'Paradox',
        src: '/brand-paradox.png',
        url: 'https://www.paradox.com',
        alt: 'Paradox security systems',
    },
    {
        name: 'Paxton',
        src: '/brand-paxton.png',
        url: 'https://www.paxton-access.com',
        alt: 'Paxton access control',
    },
    {
        name: 'Texecom',
        src: '/brand-texecom.png',
        url: 'https://www.texe.com',
        alt: 'Texecom alarms',
    },
    {
        name: 'TruVision',
        src: '/brand-truvision.png',
        url: 'https://www.firesecurityproducts.com',
        alt: 'TruVision video',
    },
    {
        name: 'Uniview',
        src: '/brand-unv.png',
        url: 'https://www.uniview.com',
        alt: 'Uniview cameras',
    },
    {
        name: 'ViRDI',
        src: '/brand-virdi.png',
        url: 'https://www.virditech.co.za',
        alt: 'ViRDI biometrics',
    },
    {
        name: 'ZKTeco',
        src: '/brand-zkteco.png',
        url: 'https://www.zkteco.co.za',
        alt: 'ZKTeco access control',
    },
]

export default function BrandsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-brand-navy selection:bg-brand-electric selection:text-brand-navy">
            <PageHero
                align="center"
                badgeIcon={<ShieldCheck className="w-4 h-4" />}
                badgeText="Certified Partners"
                title="World-Class Security Brands"
                subtitle="We are certified installers for the industry's most trusted manufacturers. We do not compromise on quality, ensuring your security system is built to last."
                bgImage="/page-heroes/brands-hero.png"
                pbClass="pb-[200px]"
            />

            {/* Brands Grid - Extracted to Client Component for Framer Motion */}
            <div className="-mt-32 relative z-30 pb-24">
                <BrandsClient brands={allBrands} />
            </div>

            {/* Why Certified Matters */}
            <section className="py-24 bg-brand-navy border-t border-brand-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-electric/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black text-brand-white mb-10 tracking-tight">Why Choose a <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electric to-brand-electric filter drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]">Certified Installer?</span></h2>
                            <div className="space-y-8">
                                <div className="flex gap-6 items-start group">
                                    <div className="w-14 h-14 rounded-2xl bg-brand-electric/10 border border-brand-electric/30 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-electric/20 transition-all shadow-[0_0_15px_rgba(0,229,255,0.1)]">
                                        <CheckCircle2 className="w-7 h-7 text-brand-electric" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-brand-white mb-3">Valid Warranties</h3>
                                        <p className="text-brand-steel/80 leading-relaxed font-light">Manufacturer warranties are often strictly voided if equipment is installed by uncertified technicians. We protect your investment natively.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-start group">
                                    <div className="w-14 h-14 rounded-2xl bg-brand-electric/10 border border-brand-electric/30 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-electric/20 transition-all shadow-[0_0_15px_rgba(0,229,255,0.1)]">
                                        <ShieldCheck className="w-7 h-7 text-brand-electric" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-brand-white mb-3">Firmware Updates</h3>
                                        <p className="text-brand-steel/80 leading-relaxed font-light">Direct access to the latest manufacturer firmware and vital zero-day security patches to keep your localized system impenetrable.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-start group">
                                    <div className="w-14 h-14 rounded-2xl bg-brand-electric/10 border border-brand-electric/30 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-electric/20 transition-all shadow-[0_0_15px_rgba(0,229,255,0.1)]">
                                        <CheckCircle2 className="w-7 h-7 text-brand-electric" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-brand-white mb-3">Correct Configuration</h3>
                                        <p className="text-brand-steel/80 leading-relaxed font-light">We flawlessly configure enterprise-grade features like deep-learning false alarm filtering and localized AI neural engine analytics.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] ring-1 ring-brand-white/10 group">
                            <Image
                                src="/hero-bg.jpg" // Using existing image
                                alt="Technician working"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent" />
                            <div className="absolute bottom-10 left-10 right-10 text-brand-white">
                                <div className="w-10 h-1 bg-brand-electric mb-6" />
                                <p className="text-2xl font-medium tracking-wide">
                                    &quot;We don&apos;t just sell boxes. We architect resilient solutions using the world&apos;s premier technology.&quot;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-brand-navy relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-electric/5 via-transparent to-transparent opacity-50 pointer-events-none" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-brand-white mb-6 tracking-tight">Need a Specific Brand?</h2>
                        <p className="text-xl text-brand-steel/80 font-light">Whether you need a new Hikvision camera expansion or a battery for your Paradox alarm, we can source it.</p>
                    </div>
                    <div className="max-w-2xl mx-auto">
                        <ContactForm />
                    </div>
                </div>
            </section>
        </div>
    )
}
