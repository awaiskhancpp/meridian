import siteData from '@/website.json'

/**
 * Single source of truth for service data — website.json's services.items.
 * Both the listing page and the detail page read from this one place.
 */
export type StatBox = {
  number: string
  title: string
  description: string
}

export type BeforeAfterItem = {
  beforeImage: string
  afterImage: string
  beforeAlt: string
  afterAlt: string
  title?: string
  description?: string
}

export type ProcessStep = {
  title: string
  description: string
}

export type ServiceFaq = {
  question: string
  answer: string
}

export type ServiceCardData = {
  icon: string
  title: string
  description: string
  image: string
  startingPrice: string
  timeline: string
  badge: string | null
  slug: string
  href: string
  subtitle: string
  tagline: string
  statBoxes: StatBox[]
  beforeAfter?: BeforeAfterItem[]
  process?: { steps: ProcessStep[] }
  faqs?: ServiceFaq[]
}

export const PRICE_TIERS = ['Under $10k', '$10k–$50k', '$50k+'] as const
export type PriceTier = (typeof PRICE_TIERS)[number]

export function priceTierFor(startingPrice: string): PriceTier {
  if (startingPrice.toLowerCase() === 'free') return 'Under $10k'
  const numeric = Number(startingPrice.replace(/[^0-9.]/g, ''))
  if (!Number.isFinite(numeric) || numeric < 10000) return 'Under $10k'
  if (numeric <= 50000) return '$10k–$50k'
  return '$50k+'
}

export function getAllServices(): ServiceCardData[] {
  return siteData.services.items as ServiceCardData[]
}

export function getServiceBySlug(slug: string): ServiceCardData | undefined {
  return getAllServices().find((service) => service.slug === slug)
}
