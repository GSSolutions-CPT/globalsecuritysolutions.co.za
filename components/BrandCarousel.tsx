'use client'

import Image from 'next/image'

const brands = [
    { name: 'AJAX', src: '/brand-ajax.png', url: 'https://ajax.systems' },
    { name: 'Axis', src: '/brand-axis.png', url: 'https://www.axis.com' },
    { name: 'CAME', src: '/brand-came.png', url: 'https://www.came.com' },
    { name: 'Centurion', src: '/brand-centurion.png', url: 'https://www.centsys.co.za' },
    { name: 'Commax', src: '/brand-commax.png', url: 'https://www.commax.com' },
    { name: 'Dahua', src: '/brand-dahua.png', url: 'https://www.dahuasecurity.com' },
    { name: 'DSC', src: '/brand-dsc.png', url: 'https://www.dsc.com' },
    { name: 'EZVIZ', src: '/brand-ezviz.png', url: 'https://www.ezviz.com' },
    { name: 'Hanwha', src: '/brand-hanwha.png', url: 'https://www.hanwhavision.com' },
    { name: 'HID', src: '/brand-hid.png', url: 'https://www.hidglobal.com' },
    { name: 'Hikvision', src: '/brand-hikvision.png', url: 'https://www.hikvision.com' },
    { name: 'IDEMIA', src: '/brand-idemia.png', url: 'https://www.idemia.com' },
    { name: 'IDS', src: '/brand-ids.png', url: 'https://www.idsprotect.co.za' },
    { name: 'Impro', src: '/brand-impro.png', url: 'https://www.impro.net' },
    { name: 'Kocom', src: '/brand-kocom.png', url: 'http://www.kocom.com' },
    { name: 'Nemtek', src: '/brand-nemtek.png', url: 'https://www.nemtek.com' },
    { name: 'Nice', src: '/brand-nice.png', url: 'https://www.niceforyou.com' },
    { name: 'Optex', src: '/brand-optex.png', url: 'https://www.optex-europe.com' },
    { name: 'Paradox', src: '/brand-paradox.png', url: 'https://www.paradox.com' },
    { name: 'Paxton', src: '/brand-paxton.png', url: 'https://www.paxton-access.com' },
    { name: 'Texecom', src: '/brand-texecom.png', url: 'https://www.texe.com' },
    { name: 'TruVision', src: '/brand-truvision.png', url: 'https://www.firesecurityproducts.com' },
    { name: 'Uniview', src: '/brand-unv.png', url: 'https://www.uniview.com' },
    { name: 'ViRDI', src: '/brand-virdi.png', url: 'https://www.virditech.co.za' },
    { name: 'ZKTeco', src: '/brand-zkteco.png', url: 'https://www.zkteco.co.za' },
]

interface BrandCarouselProps {
    variant?: 'default' | 'footer'
}

export function BrandCarousel({ variant = 'default' }: BrandCarouselProps) {
    const containerClasses = variant === 'footer'
        ? "w-full overflow-hidden bg-transparent py-8 border-t border-slate-800"
        : "w-full overflow-hidden bg-white py-10"

    const imageClasses = variant === 'footer'
        ? "object-contain h-12 w-auto brightness-0 invert opacity-50 hover:opacity-100 transition-opacity duration-300"
        : "object-contain h-12 w-auto"

    const linkClasses = variant === 'footer'
        ? "mx-8 flex items-center justify-center transition-all duration-300 flex-shrink-0"
        : "mx-8 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 flex-shrink-0"

    return (
        <div className={containerClasses}>
            <div className="relative w-full flex">
                <div className="flex animate-scroll whitespace-nowrap min-w-full hover:[animation-play-state:paused]">
                    {/* First Loop */}
                    {brands.map((brand, idx) => (
                        <a
                            key={`b1-${idx}`}
                            href={brand.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClasses}
                            title={brand.name}
                        >
                            <div className="h-12 w-auto relative">
                                <Image
                                    src={brand.src}
                                    alt={brand.name}
                                    width={150}
                                    height={50}
                                    className={imageClasses}
                                    style={{ width: 'auto', height: '100%' }}
                                />
                            </div>
                        </a>
                    ))}
                    {/* Duplicate Loop for seamless scroll */}
                    {brands.map((brand, idx) => (
                        <a
                            key={`b2-${idx}`}
                            href={brand.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClasses}
                            title={brand.name}
                        >
                            <div className="h-12 w-auto relative">
                                <Image
                                    src={brand.src}
                                    alt={brand.name}
                                    width={150}
                                    height={50}
                                    className={imageClasses}
                                    style={{ width: 'auto', height: '100%' }}
                                />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
