import siteData from '@/website.json'

/**
 * Single source of truth for service data — website.json's services.items.
 * Both the listing page and the detail page read from this one place now.
 * Previously the detail page (app/services/[slug]/page.tsx) had its own
 * separate, hand-maintained copy of this same data hardcoded inline, only
 * covering 5 of the 8 real services — the other 3 silently fell back to a
 * generic placeholder. That duplicate copy is gone; everything reads from
 * here.
 */
export type StatBox = {
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
  /** Only present for services with a physical result to show —
   *  Design Consultation and Project Planning have no beforeAfter
   *  array, since there's nothing physical to compare. */
  beforeAfter?: BeforeAfterItem[]
  /** Every service has its own process — a physical remodel (Kitchen,
   *  Flooring) includes a demolition/installation step; a consultation
   *  service (Design Consultation, Project Planning) doesn't, since
   *  there's no physical work to install. */
  process?: { steps: ProcessStep[] }
}

export const PRICE_TIERS = ['Under $10k', '$10k–$50k', '$50k+'] as const
export type PriceTier = (typeof PRICE_TIERS)[number]

/** Buckets a service's startingPrice string ("$18,000", "Free") into
 *  one of PRICE_TIERS, for the Price Range filter on the search bar. */
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

/** Looks up a single service by slug — used by the [slug] detail page.
 *  Returns undefined for an unknown slug so the page can 404 properly
 *  instead of silently rendering a generic placeholder for a typo'd
 *  or removed slug. */
export function getServiceBySlug(slug: string): ServiceCardData | undefined {
  return getAllServices().find((service) => service.slug === slug)
}
