import { ShieldCheck } from 'lucide-react';

export const MarketingBanner = () => {
    return (
        <div
            className="relative w-full flex items-center justify-center overflow-hidden"
            style={{
                background: 'linear-gradient(to right, #0f172a, #1e3a8a)',
                minHeight: '600px' // Ensure enough height for visual impact
            }}
        >
            <div className="container mx-auto px-4 text-center relative z-10">

                {/* Main Heading */}
                <h1
                    className="font-bold text-white mb-4 leading-tight"
                    style={{
                        fontSize: '60px',
                        fontFamily: 'sans-serif'
                    }}
                >
                    Global Security Solutions
                </h1>

                {/* Sub-text */}
                <p
                    className="mb-8 font-light"
                    style={{
                        fontSize: '32px',
                        color: '#94a3b8' // Light Blue/Grey (Tailwind slate-400 approx)
                    }}
                >
                    Cape Town&apos;s Trusted Installers
                </p>

            </div>

            {/* Badge - Bottom Right */}
            <div className="absolute bottom-8 right-8 z-20">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 flex items-center gap-3 shadow-lg">
                    <ShieldCheck className="w-8 h-8 text-green-400" />
                    <div className="text-left">
                        <div className="text-white font-bold text-sm uppercase tracking-wider">Verified</div>
                        <div className="text-white font-bold text-lg">24/7 Support</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
