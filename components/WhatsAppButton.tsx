'use client'

import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/27629558559"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_0_40px_rgba(37,211,102,0.7)] hover:bg-[#20bd5a] transition-all duration-300 hover:scale-110 hover:-translate-y-1 flex items-center justify-center group border border-[#25D366]/50 ring-2 ring-transparent hover:ring-[#25D366]/30 backdrop-blur-sm"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="w-8 h-8 drop-shadow-md" strokeWidth={2.5} />
            <span className="absolute right-full mr-4 bg-brand-navy border border-brand-steel/30 text-brand-white px-4 py-2 rounded-xl shadow-2xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 whitespace-nowrap hidden md:block pointer-events-none">
                Chat with an Expert
                {/* Arrow pointing right */}
                <span className="absolute top-1/2 -mt-1.5 -right-1.5 w-3 h-3 bg-brand-navy border-t border-r border-brand-steel/30 rotate-45" />
            </span>
            
            {/* Subtle Pulse Ring */}
            <span className="absolute inset-0 rounded-full border-2 border-[#25D366] opacity-0 group-hover:animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none" />
        </a>
    )
}
