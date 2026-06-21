'use client'

import { Star, Quote } from "lucide-react";

const reviews = [
    {
        name: "Sarah J.",
        location: "Durbanville",
        text: "Excellent service from Kyle and the team. They installed our CCTV system quickly and neatly. The app viewing works perfectly!",
    },
    {
        name: "Michael R.",
        location: "Table View",
        text: "Professional advice and great workmanship. The electric fence upgrade has given us real peace of mind.",
    },
    {
        name: "David K.",
        location: "Constantia",
        text: "Highly recommend Global Security Solutions. Rashaad managed the project efficiently and the team was very respectful.",
    },
    {
        name: "Jenny L.",
        location: "Century City",
        text: "The CCTV clarity is amazing. Caught a suspicious incident the very next day. Thanks GSS for the quick install!",
    },
    {
        name: "Ryan M.",
        location: "Sea Point",
        text: "Fastest gate motor repair in Cape Town. Called at 8am, fixed by 10am. Super impressed with the urgency.",
    },
    {
        name: "Thomas B.",
        location: "Somerset West",
        text: "Love the deeper sense of security with the new outdoor beams. Great team, very polite and cleaned up after themselves.",
    },
    {
        name: "Amanda P.",
        location: "Claremont",
        text: "Clean installation, no wires showing. These guys are perfectionists. My husband plays with the alarm app all day!",
    },
    {
        name: "Justin V.",
        location: "Montague Gardens",
        text: "Upgraded our business access control. Seamless transition for our staff and the biometric readers work every time.",
    },
    {
        name: "Patricia N.",
        location: "Fish Hoek",
        text: "Friendly, knowledgeable, and on time. Rare to find this level of service in the security industry these days.",
    },
    {
        name: "Sameer A.",
        location: "Athlone",
        text: "The app control for my alarm is a game changer. I can open the gate for deliveries from my office. So convenient.",
    },
    {
        name: "Francois D.",
        location: "Bellville",
        text: "Best quote we received and the quality exceeded expectations. The Hikvision cameras are crystal clear at night.",
    },
    {
        name: "HOA Chairman",
        location: "Hout Bay",
        text: "They secured our entire estate perimeter. Professional from start to finish. The residents are feeling much safer.",
    }
]

export function TestimonialCarousel() {
    return (
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            {/* The carousel container */}
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-scroll-slow hover:[animation-play-state:paused]">
                {/* Double the array for seamless looping */}
                {[...reviews, ...reviews].map((review, index) => {
                    const initials = review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("");

                    return (
                        <li key={index} className="flex-shrink-0 w-[320px] py-4">
                            <div className="glass-card-light pt-8 pb-6 px-6 rounded-3xl h-full relative overflow-hidden flex flex-col border border-brand-steel/10 mx-2 hover:border-brand-electric/40 hover:shadow-[0_10px_35px_rgba(0,229,255,0.06)] hover:-translate-y-1 duration-300 transition-all select-none">
                                {/* Subtle Quote Icon in Background */}
                                <Quote className="absolute right-4 top-4 w-12 h-12 text-brand-steel/5 pointer-events-none" />

                                <div className="relative z-10 flex-grow">
                                    <div className="flex text-amber-400 mb-4 justify-start gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-brand-slate mb-6 italic text-sm leading-relaxed text-left">&quot;{review.text}&quot;</p>
                                </div>

                                <div className="mt-auto border-t border-brand-steel/10 pt-4 flex items-center gap-3">
                                    {/* Styled Avatar Circle */}
                                    <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center text-brand-electric font-black text-xs border border-brand-electric/20 shrink-0">
                                        {initials}
                                    </div>
                                    <div>
                                        <p className="font-bold text-brand-navy text-sm leading-none mb-1">{review.name}</p>
                                        <p className="text-brand-steel text-[10px] uppercase tracking-wider font-semibold leading-none">{review.location}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

