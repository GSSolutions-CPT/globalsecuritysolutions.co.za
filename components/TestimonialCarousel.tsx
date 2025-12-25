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
            {/* The carousel container text-slate-600 mb-6 italic min-h-[80px] */}
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-scroll-slow hover:[animation-play-state:paused]">
                {/* Double the array for seamless looping */}
                {[...reviews, ...reviews].map((review, index) => (
                    <li key={index} className="flex-shrink-0 w-[400px]">
                        <div className="bg-white pt-10 pb-8 px-8 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.08)] h-full relative overflow-hidden flex flex-col border border-slate-50 mx-4">
                            {/* Dog Ear Accent - slightly smaller/different for testimonials */}
                            <div className="absolute top-0 left-0 w-16 h-16 bg-blue-500 rounded-br-[3rem] -translate-x-2 -translate-y-2 opacity-90" />
                            <Quote className="absolute top-4 left-4 w-6 h-6 text-white z-10" />

                            <div className="relative z-10 flex-grow">
                                <div className="flex text-yellow-400 mb-6 justify-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-current" />
                                    ))}
                                </div>
                                <p className="text-slate-600 mb-8 italic text-lg leading-relaxed text-center">&quot;{review.text}&quot;</p>
                            </div>

                            <div className="mt-auto border-t border-slate-100 pt-6 text-center">
                                <p className="font-bold text-slate-900 text-lg">{review.name}</p>
                                <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold">{review.location}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
