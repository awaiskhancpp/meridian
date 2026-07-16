import React from 'react'
import Image from 'next/image'
import { Star, Zap, Box, Feather, Circle, Hexagon, type LucideIcon } from 'lucide-react'
import siteData from '@/website.json'
import { Button, Container } from '@/components/ui'

const { trustHero } = siteData

const PARTNER_ICONS: Record<string, LucideIcon> = {
  zap: Zap,
  box: Box,
  feather: Feather,
  circle: Circle,
  hexagon: Hexagon,
}

interface RatingProps {
  score: string
  reviewCount: string
}

interface CtaProps {
  label: string
  href: string
}

interface TrustSectionProps {
  rating?: RatingProps
  heading?: string
  script?: string
  description?: string
  ctaPrimary?: CtaProps
  ctaSecondary?: CtaProps
  googleRating?: { score: string; label: string }
  statHighlight?: { score: string; label: string }
  avatars?: string[]
  avatarCountBadge?: string
  image?: string
  partners?: { name: string; icon: string }[]
}

/**
 * TrustSection (service detail page)
 *
 * Card content is centered (description + CTA row) to match the
 * reference — only the bottom stat row (Google rating / stat highlight
 * + avatars) stays left-aligned, which is how the reference has it too.
 * The card itself needs its own bg-cream + border since it has no
 * ambient background otherwise — that had gotten dropped in a previous
 * edit, which is also why it looked visually flat/undefined before.
 *
 * Key design decisions (same as the rest of this folder):
 * - No rounded corners — rounded-none override on Button, square photo
 *   and card containers.
 * - Theme tokens throughout; gold star color is the one deliberate
 *   exception (rating gold is a convention independent of brand
 *   palette).
 *
 * NOTE: trustHero.partners in website.json are placeholder
 * names/icons, not real client logos or press mentions.
 */
export default function TrustSection({
  rating = trustHero.rating,
  heading = trustHero.heading,
  script = trustHero.script,
  description = trustHero.description,
  ctaPrimary = trustHero.ctaPrimary,
  ctaSecondary = trustHero.ctaSecondary,
  googleRating = trustHero.googleRating,
  statHighlight = trustHero.statHighlight,
  avatars = trustHero.avatars,
  avatarCountBadge = trustHero.avatarCountBadge,
  image = trustHero.image,
  partners = trustHero.partners,
}: TrustSectionProps) {
  return (
    <section aria-labelledby="trust-section-heading" className="py-16 lg:py-24">
      <Container>
        {/* Rating strip */}
        <div className="flex items-center justify-center gap-2 text-sm">
          <div className="flex gap-0.5" aria-label={`${rating.score} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-[#FBBC05] text-[#FBBC05]" aria-hidden="true" />
            ))}
          </div>
          <span className="font-semibold text-dark">{rating.score}</span>
          <span className="text-dark-muted">({rating.reviewCount} reviews)</span>
        </div>

        {/* Heading */}
        <h2 id="trust-section-heading" className="mt-4 text-center">
          <span className="block text-[clamp(2.2rem,5.4vw,3.8rem)] font-black uppercase leading-[0.98] tracking-[-0.03em] text-dark">
            {heading}
          </span>
          <span className="block font-[family-name:var(--font-allura)] text-[clamp(2.4rem,5.4vw,4rem)] italic leading-tight text-accent">
            {script}
          </span>
        </h2>

        {/* Card + photo */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col items-center gap-8 p-8">
            <p className="text-center text-p text-dark-muted">{description}</p>

            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="primary" size="md" href={ctaPrimary.href} className="rounded-none">
                {ctaPrimary.label}
              </Button>
              <Button variant="outline" size="md" href={ctaSecondary.href} className="rounded-none">
                {ctaSecondary.label}
              </Button>
            </div>

            <div className="mt-auto  w-full grid grid-cols-2 justify-center items-center gap-8 pt-4">
              {/* Google rating */}
              <div>
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <p className="mt-2 flex items-center gap-1 text-sm font-semibold text-dark">
                  {googleRating.score}
                  <Star className="h-3.5 w-3.5 fill-[#FBBC05] text-[#FBBC05]" aria-hidden="true" />
                </p>
                <p className="text-xs text-dark-muted">{googleRating.label}</p>
              </div>

              {/* Stat + avatar stack */}
              <div>
                <p className="text-3xl font-black leading-none text-dark">{statHighlight.score}</p>
                <p className="mt-1 text-sm text-dark-muted">{statHighlight.label}</p>
                <div className="mt-2 flex items-center -space-x-3">
                  {avatars.map((avatar) => (
                    <div
                      key={avatar}
                      className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-cream bg-bg-cream"
                    >
                      <Image src={avatar} alt="" fill className="object-cover" />
                    </div>
                  ))}
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-cream bg-accent text-[10px] font-semibold text-white">
                    {avatarCountBadge}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[18rem] w-full overflow-hidden border border-[rgba(60,37,21,0.12)] lg:min-h-0">
            <Image src={image} alt="" fill className="object-cover" />
          </div>
        </div>

        {/* Partner / press logo row — placeholders, see file comment */}
        {/* <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {partners.map((partner) => {
            const Icon = PARTNER_ICONS[partner.icon]
            return (
              <div key={partner.name} className="flex items-center gap-2 text-dark-muted">
                {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
                <span className="text-sm font-semibold">{partner.name}</span>
              </div>
            )
          })}
        </div> */}
      </Container>
    </section>
  )
}
