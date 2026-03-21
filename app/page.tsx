import { MarketingBanner } from '@/components/MarketingBanner'
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
