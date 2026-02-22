'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export function ConditionalHeader() {
  const pathname = usePathname()
  if (pathname?.startsWith('/portal')) return null
  return <Header />
}

export function ConditionalFooter() {
  const pathname = usePathname()
  if (pathname?.startsWith('/portal')) return null
  return <Footer />
}

export function ConditionalWhatsApp() {
  const pathname = usePathname()
  if (pathname?.startsWith('/portal')) return null
  return <WhatsAppButton />
}
