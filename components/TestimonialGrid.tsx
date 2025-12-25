'use client'

import { Star } from 'lucide-react'

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

export function TestimonialGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {reviews.map((review, index) => (
                <div
                    key={index}
                    className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                    data-aos="fade-up"
                    data-aos-delay={index * 50} // Stifled fade-in effect
                >
                    <div className="flex text-yellow-500 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                    </div>
                    <p className="text-slate-600 mb-6 italic min-h-[80px]">&quot;{review.text}&quot;</p>
                    <div>
                        <p className="font-bold text-slate-900">- {review.name}</p>
                        <p className="text-sm text-slate-400">{review.location}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
