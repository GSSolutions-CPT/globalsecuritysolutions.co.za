'use client'

import Image from 'next/image'

const brands = [
    {
        name: 'AJAX',
        src: '/brand-ajax.png',
        footerSrc: '/brand-ajax-footer.png',
        url: 'https://ajax.systems',
        alt: 'AJAX wireless alarm systems for homes in Durbanville',
        footerAlt: 'Certified AJAX alarm system installers Cape Town'
    },
    {
        name: 'Axis',
        src: '/brand-axis.png',
        footerSrc: '/brand-axis-footer.png',
        url: 'https://www.axis.com',
        alt: 'Axis network security cameras for business surveillance',
        footerAlt: 'Axis Communications enterprise security cameras'
    },
    {
        name: 'CAME',
        src: '/brand-came.png',
        footerSrc: '/brand-came-footer.png',
        url: 'https://www.came.com',
        alt: 'CAME BPT intercom system repairs and upgrades',
        footerAlt: 'CAME BPT intercom system specialists Western Cape'
    },
    {
        name: 'Centurion',
        src: '/brand-centurion.png',
        footerSrc: '/brand-centurion-footer.png',
        url: 'https://www.centsys.co.za',
        alt: 'Centurion D5 Evo gate motor installation and repairs',
        footerAlt: 'Centurion gate motor repairs and new installations'
    },
    {
        name: 'Commax',
        src: '/brand-commax.png',
        footerSrc: '/brand-commax-footer.png',
        url: 'https://www.commax.com',
        alt: 'Commax smart video intercoms for estates',
        footerAlt: 'Commax home automation and intercom installers'
    },
    {
        name: 'Dahua',
        src: '/brand-dahua.png',
        footerSrc: '/brand-dahua-footer.png',
        url: 'https://www.dahuasecurity.com',
        alt: 'Dahua CCTV camera kits with remote phone viewing',
        footerAlt: 'Dahua AI surveillance cameras and recorders'
    },
    {
        name: 'DSC',
        src: '/brand-dsc.png',
        footerSrc: '/brand-dsc-footer.png',
        url: 'https://www.dsc.com',
        alt: 'DSC alarm panel battery replacement and servicing',
        footerAlt: 'DSC security system maintenance and support'
    },
    {
        name: 'EZVIZ',
        src: '/brand-ezviz.png',
        footerSrc: '/brand-ezviz-footer.png',
        url: 'https://www.ezviz.com',
        alt: 'EZVIZ wireless smart home security cameras',
        footerAlt: 'EZVIZ cloud cameras for home monitoring'
    },
    {
        name: 'Hanwha',
        src: '/brand-hanwha.png',
        footerSrc: '/brand-hanwha-footer.png',
        url: 'https://www.hanwhavision.com',
        alt: 'Hanwha Vision industrial surveillance solutions',
        footerAlt: 'Hanwha Vision intelligent video analytics'
    },
    {
        name: 'HID',
        src: '/brand-hid.png',
        footerSrc: '/brand-hid-footer.png',
        url: 'https://www.hidglobal.com',
        alt: 'HID Global proximity card readers and access control',
        footerAlt: 'HID Global secure access control solutions'
    },
    {
        name: 'Hikvision',
        src: '/brand-hikvision.png',
        footerSrc: '/brand-hikvision-footer.png',
        url: 'https://www.hikvision.com',
        alt: 'Hikvision ColorVu night vision camera installers',
        footerAlt: 'Hikvision authorized camera installers Cape Town'
    },
    {
        name: 'IDEMIA',
        src: '/brand-idemia.png',
        footerSrc: '/brand-idemia-footer.png',
        url: 'https://www.idemia.com',
        alt: 'IDEMIA biometric fingerprint readers for office security',
        footerAlt: 'IDEMIA contactless biometric readers'
    },
    {
        name: 'IDS',
        src: '/brand-ids.png',
        footerSrc: '/brand-ids-footer.png',
        url: 'https://www.idsprotect.co.za',
        alt: 'IDS X-Series alarm system programming and installation',
        footerAlt: 'IDS alarm system upgrades and battery replacements'
    },
    {
        name: 'Impro',
        src: '/brand-impro.png',
        footerSrc: '/brand-impro-footer.png',
        url: 'https://www.impro.net',
        alt: 'Impro access control portal management Western Cape',
        footerAlt: 'Impro Technologies access control distributors'
    },
    {
        name: 'Kocom',
        src: '/brand-kocom.png',
        footerSrc: '/brand-kocom-footer.png',
        url: 'http://www.kocom.com',
        alt: 'Kocom intercom handset replacement and repairs',
        footerAlt: 'Kocom residential intercom system repairs'
    },
    {
        name: 'Nemtek',
        src: '/brand-nemtek.png',
        footerSrc: '/brand-nemtek-footer.png',
        url: 'https://www.nemtek.com',
        alt: 'Nemtek electric fencing compliance certificates Cape Town',
        footerAlt: 'Nemtek electric fencing certified installers'
    },
    {
        name: 'Nice',
        src: '/brand-nice.png',
        footerSrc: '/brand-nice-footer.png',
        url: 'https://www.niceforyou.com',
        alt: 'Nice Hansa garage door motor automation and remotes',
        footerAlt: 'Nice gate automation and barrier systems'
    },
    {
        name: 'Optex',
        src: '/brand-optex.png',
        footerSrc: '/brand-optex-footer.png',
        url: 'https://www.optex-europe.com',
        alt: 'Optex outdoor beams and perimeter intrusion detection',
        footerAlt: 'Optex perimeter security sensors and beams'
    },
    {
        name: 'Paradox',
        src: '/brand-paradox.png',
        footerSrc: '/brand-paradox-footer.png',
        url: 'https://www.paradox.com',
        alt: 'Paradox MG5050 alarm installation experts Cape Town',
        footerAlt: 'Paradox security system authorized technicians'
    },
    {
        name: 'Paxton',
        src: '/brand-paxton.png',
        footerSrc: '/brand-paxton-footer.png',
        url: 'https://www.paxton-access.com',
        alt: 'Paxton Net2 access control system installers',
        footerAlt: 'Paxton smart access control integration'
    },
    {
        name: 'Texecom',
        src: '/brand-texecom.png',
        footerSrc: '/brand-texecom-footer.png',
        url: 'https://www.texe.com',
        alt: 'Texecom Premier Elite alarm system maintenance',
        footerAlt: 'Texecom alarm panel fault finding and repairs'
    },
    {
        name: 'TruVision',
        src: '/brand-truvision.png',
        footerSrc: '/brand-truvision-footer.png',
        url: 'https://www.firesecurityproducts.com',
        alt: 'TruVision NVR recording systems for CCTV',
        footerAlt: 'TruVision video surveillance management'
    },
    {
        name: 'Uniview',
        src: '/brand-unv.png',
        footerSrc: '/brand-unv-footer.png',
        url: 'https://www.uniview.com',
        alt: 'Uniview IP security cameras for retail stores',
        footerAlt: 'Uniview network camera systems for business'
    },
    {
        name: 'ViRDI',
        src: '/brand-virdi.png',
        footerSrc: '/brand-virdi-footer.png',
        url: 'https://www.virditech.co.za',
        alt: 'ViRDI biometric time and attendance solutions',
        footerAlt: 'ViRDI fingerprint and facial recognition tech'
    },
    {
        name: 'ZKTeco',
        src: '/brand-zkteco.png',
        footerSrc: '/brand-zkteco-footer.png',
        url: 'https://www.zkteco.co.za',
        alt: 'ZKTeco turnstiles and biometric access control systems',
        footerAlt: 'ZKTeco access control and time attendance systems'
    },
]

interface BrandCarouselProps {
    variant?: 'default' | 'footer'
}

export function BrandCarousel({ variant = 'default' }: BrandCarouselProps) {
    const containerClasses = variant === 'footer'
        ? "w-full overflow-hidden bg-transparent py-8 border-t border-slate-800"
        : "w-full overflow-hidden bg-white py-10"

    // Helper to get image classes based on variant and whether a custom footer source exists
    const getImageClasses = (hasFooterSrc: boolean) => {
        if (variant === 'footer') {
            // If we have a specific footer image, don't invert it (it's likely already light/gray).
            // Just apply opacity for hover effect.
            if (hasFooterSrc) {
                return "object-contain h-12 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
            }
            // Fallback for default images in footer: invert to make them white
            return "object-contain h-12 w-auto brightness-0 invert opacity-50 hover:opacity-100 transition-opacity duration-300"
        }
        return "object-contain h-12 w-auto"
    }

    const linkClasses = variant === 'footer'
        ? "mx-8 flex items-center justify-center transition-all duration-300 flex-shrink-0"
        : "mx-8 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 flex-shrink-0"

    const renderBrandItems = (keyPrefix: string) => (
        brands.map((brand, idx) => {
            const useCustomFooterSrc = variant === 'footer' && !!brand.footerSrc;
            const finalSrc = useCustomFooterSrc ? brand.footerSrc! : brand.src;
            const finalImageClasses = getImageClasses(useCustomFooterSrc);

            // Determine final Alt text
            const finalAlt = variant === 'footer'
                ? (brand.footerAlt || brand.alt || brand.name)
                : (brand.alt || brand.name);

            return (
                <a
                    key={`${keyPrefix}-${idx}`}
                    href={brand.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClasses}
                    title={brand.name}
                >
                    <div className="h-12 w-auto relative">
                        <Image
                            src={finalSrc}
                            alt={finalAlt}
                            width={150}
                            height={50}
                            className={finalImageClasses}
                            style={{ width: 'auto', height: '100%' }}
                        />
                    </div>
                </a>
            )
        })
    );

    return (
        <div className={containerClasses}>
            <div className="relative w-full flex">
                <div className="flex animate-scroll whitespace-nowrap min-w-full hover:[animation-play-state:paused]">
                    {renderBrandItems('b1')}
                    {renderBrandItems('b2')}
                </div>
            </div>
        </div>
    )
}
