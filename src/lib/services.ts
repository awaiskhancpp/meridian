/**
 * Shared shape for the services listing page cards, mirroring how
 * lib/blogs.ts describes blog posts. Reads straight from
 * website.json's services.items — no CMS involved.
 */
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
