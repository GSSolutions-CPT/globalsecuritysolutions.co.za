const fs = require('fs');
const path = require('path');

const pageFile = path.join(__dirname, 'app/page.tsx');
const clientFile = path.join(__dirname, 'app/HomeClient.tsx');

const content = fs.readFileSync(pageFile, 'utf8');
const lines = content.split('\n');

const imports = `import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ArrowRight, ShieldCheck, Zap, Settings, Command } from 'lucide-react'
import { motion, Variants } from 'framer-motion'
import { ServiceCarousel } from '@/components/ServiceCarousel'
import { SectorCarousel } from '@/components/SectorCarousel'

// Strongly deferred off main thread 
const ContactForm = dynamic(() => import('@/components/ContactForm').then(mod => mod.ContactForm), { ssr: false })
const TestimonialCarousel = dynamic(() => import('@/components/TestimonialCarousel').then(mod => mod.TestimonialCarousel), { ssr: false })
const BrandCarousel = dynamic(() => import('@/components/BrandCarousel').then(mod => mod.BrandCarousel))

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};`;

const body = lines.slice(39, 354).join('\n');

const clientCode = `"use client"

${imports}

export function HomeClient() {
  return (
    <>
${body}
    </>
  )
}
`;

const pageCode = `import { MarketingBanner } from '@/components/MarketingBanner'
import { HomeClient } from './HomeClient'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-brand-white selection:bg-brand-electric selection:text-brand-navy overflow-hidden">
      {/* SECTION 1: HERO HEADER - Instantly Server Rendered (LCP Core Web Vital) */}
      <MarketingBanner />

      {/* SECTION 2-7: Client Hydrated Interactive Layers */}
      <HomeClient />
    </div>
  )
}
`;

fs.writeFileSync(clientFile, clientCode);
fs.writeFileSync(pageFile, pageCode);
console.log('Successfully split page.tsx into SSR component and HomeClient.');
