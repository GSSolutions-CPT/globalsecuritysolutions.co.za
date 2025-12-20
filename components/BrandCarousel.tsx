'use client'

import Image from 'next/image'

const brands = [
    { name: 'AJAX', src: '/brand-ajax.png', footerSrc: '/brand-ajax-footer.png', url: 'https://ajax.systems' },
    { name: 'Axis', src: '/brand-axis.png', footerSrc: '/brand-axis-footer.png', url: 'https://www.axis.com' },
    { name: 'CAME', src: '/brand-came.png', footerSrc: '/brand-came-footer.png', url: 'https://www.came.com' },
    { name: 'Centurion', src: '/brand-centurion.png', footerSrc: '/brand-centurion-footer.png', url: 'https://www.centsys.co.za' },
    { name: 'Commax', src: '/brand-commax.png', footerSrc: '/brand-commax-footer.png', url: 'https://www.commax.com' },
    { name: 'Dahua', src: '/brand-dahua.png', footerSrc: '/brand-dahua-footer.png', url: 'https://www.dahuasecurity.com' },
    { name: 'DSC', src: '/brand-dsc.png', footerSrc: '/brand-dsc-footer.png', url: 'https://www.dsc.com' },
    { name: 'EZVIZ', src: '/brand-ezviz.png', footerSrc: '/brand-ezviz-footer.png', url: 'https://www.ezviz.com' },
    { name: 'Hanwha', src: '/brand-hanwha.png', footerSrc: '/brand-hanwha-footer.png', url: 'https://www.hanwhavision.com' },
    { name: 'HID', src: '/brand-hid.png', footerSrc: '/brand-hid-footer.png', url: 'https://www.hidglobal.com' },
    { name: 'Hikvision', src: '/brand-hikvision.png', footerSrc: '/brand-hikvision-footer.png', url: 'https://www.hikvision.com' },
    { name: 'IDEMIA', src: '/brand-idemia.png', footerSrc: '/brand-idemia-footer.png', url: 'https://www.idemia.com' },
    { name: 'IDS', src: '/brand-ids.png', footerSrc: '/brand-ids-footer.png', url: 'https://www.idsprotect.co.za' },
    { name: 'Impro', src: '/brand-impro.png', footerSrc: '/brand-impro-footer.png', url: 'https://www.impro.net' },
    { name: 'Kocom', src: '/brand-kocom.png', footerSrc: '/brand-kocom-footer.png', url: 'http://www.kocom.com' },
    { name: 'Nemtek', src: '/brand-nemtek.png', footerSrc: '/brand-nemtek-footer.png', url: 'https://www.nemtek.com' },
    { name: 'Nice', src: '/brand-nice.png', footerSrc: '/brand-nice-footer.png', url: 'https://www.niceforyou.com' },
    { name: 'Optex', src: '/brand-optex.png', footerSrc: '/brand-optex-footer.png', url: 'https://www.optex-europe.com' },
    { name: 'Paradox', src: '/brand-paradox.png', footerSrc: '/brand-paradox-footer.png', url: 'https://www.paradox.com' },
    { name: 'Paxton', src: '/brand-paxton.png', footerSrc: '/brand-paxton-footer.png', url: 'https://www.paxton-access.com' },
    { name: 'Texecom', src: '/brand-texecom.png', footerSrc: '/brand-texecom-footer.png', url: 'https://www.texe.com' },
    { name: 'TruVision', src: '/brand-truvision.png', footerSrc: '/brand-truvision-footer.png', url: 'https://www.firesecurityproducts.com' },
    { name: 'Uniview', src: '/brand-unv.png', footerSrc: '/brand-unv-footer.png', url: 'https://www.uniview.com' },
    { name: 'ViRDI', src: '/brand-virdi.png', footerSrc: '/brand-virdi-footer.png', url: 'https://www.virditech.co.za' },
    { name: 'ZKTeco', src: '/brand-zkteco.png', footerSrc: '/brand-zkteco-footer.png', url: 'https://www.zkteco.co.za' },
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
                            alt={brand.name}
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
