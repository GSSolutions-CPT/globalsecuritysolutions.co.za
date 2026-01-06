import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'

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
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-20 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/page-heroes/brands-hero.png"
                        alt="World-Class Security Brands"
                        fill
                        className="object-cover opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-slate-900/90" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/20 text-blue-400 text-sm font-bold uppercase tracking-widest mb-6">
                        Certified Partners
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        World-Class <span className="text-blue-500">Security Brands</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        We are certified installers for the industry's most trusted manufacturers.
                        We do not compromise on quality, ensuring your security system is built to last.
                    </p>
                </div>
            </section>

            {/* Brands Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                        {allBrands.map((brand, idx) => (
                            <div
                                key={idx}
                                className="group flex items-center justify-center p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 relative"
                            >
                                {/* Hover Overlay Link */}
                                <Link
                                    href={brand.url}
                                    target="_blank"
                                    rel="nofollow noopener"
                                    className="absolute inset-0 z-20"
                                    aria-label={`Visit ${brand.name} website`}
                                />

                                <div className="relative h-16 w-full grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100">
                                    <Image
                                        src={brand.src}
                                        alt={brand.alt}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Certified Matters */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Why Choose a <span className="text-blue-600">Certified Installer?</span></h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">Valid Warranties</h3>
                                        <p className="text-slate-600">Manufacturer warranties are often void if equipment is installed by uncertified technicians.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">Firmware Updates</h3>
                                        <p className="text-slate-600">Access to the latest firmware and security patches to keep your system safe from cyber threats.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">Correct Configuration</h3>
                                        <p className="text-slate-600">We configure advanced features like false alarm filtering and AI analytics correctly.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/hero-bg.jpg" // Using existing image
                                alt="Technician working"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-blue-900/50" />
                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <p className="text-lg font-bold border-l-4 border-yellow-400 pl-4">
                                    "We don't just sell boxes. We design solutions using the world's best technology."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Need a Specific Brand?</h2>
                        <p className="text-xl text-slate-600">Whether you need a new Hikvision camera or a battery for your Paradox alarm, we can help.</p>
                    </div>
                    <div className="max-w-2xl mx-auto">
                        <ContactForm />
                    </div>
                </div>
            </section>
        </div>
    )
}
