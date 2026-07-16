import React from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui'
import { Button } from '@/components/ui'
import { ArrowUpRight } from 'lucide-react'

interface StatBox {
  number: string
  title: string
  description: string
}

interface ServiceHeroProps {
  /** Main heading for the service */
  title: string
  /** Subtitle/description below the title */
  subtitle?: string
  /** Small tagline (e.g., "AFFORDABLE, RELIABLE, AND BUILT TO LAST") */
  tagline?: string
  /** Background image path */
  image: string
  /** CTA button label */
  ctaLabel?: string
  /** CTA button href */
  ctaHref?: string
  /** Optional section label above title */
  label?: string
  /** Stat boxes to display at the bottom of hero */
  statBoxes?: StatBox[]
}

/**
 * ServiceHero
 *
 * A hero component for service detail pages. Designed to be dynamic and
 * reusable across different services. Accepts all content as props so the
 * same component can render different services with different content.
 *
 * Key design decisions:
 * - No rounded corners (as requested)
 * - Uses existing theme tokens from builds.ts
 * - Fully responsive with proper breakpoints
 * - Content-driven via props for flexibility
 * - Maintains visual consistency with existing site theme
 */
export default function ServiceHero({
  title,
  subtitle,
  tagline,
  image,
  ctaLabel = 'Schedule a Consultation',
  ctaHref = '#contact',
  label,
  statBoxes,
}: ServiceHeroProps) {
  return (
    <section aria-label={title} className="w-full">
      <div className="relative isolate h-[70vh] min-h-[500px] w-full lg:h-[92vh]">
        {/* Background image */}
        <Image
          src={image}
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover object-center"
        />

        {/* Gradient overlay - using theme colors */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,24,18,0.45)_0%,rgba(34,24,18,0.25)_40%,rgba(34,24,18,0.70)_100%)]" />

        <Container className="relative flex h-full flex-col justify-center">
          <div className="max-w-3xl">
            {/* Optional label */}
            {/* {label && (
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.34em] text-white/70">
                {label}
              </p>
            )} */}

            {/* Main title */}
            <h1 className="text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em] text-white lg:text-[4.5rem]">
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 lg:text-xl">
                {subtitle}
              </p>
            )}

            {/* Tagline */}
            {/* {tagline && (
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                {tagline}
              </p>
            )} */}

            {/* CTA Button */}
            {ctaLabel && ctaHref && (
              <div className="mt-8">
                <Button
                  variant="line"
                  href={ctaHref}
                  className="text-white flex items-center gap-2"
                >
                  <span>{ctaLabel}</span>
                  <ArrowUpRight size={18} />
                </Button>
              </div>
            )}
          </div>
        </Container>

        {/* Stat Boxes - positioned half-in/half-out at bottom of hero */}
        {statBoxes && statBoxes.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-1/2">
            <Container>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {statBoxes.map((statBox, index) => (
                  <div
                    key={index}
                    className="bg-white/95 backdrop-blur-sm p-6 shadow-lg flex gap-3"
                  >
                    <div className="text-4xl font-black flex items-center text-accent lg:text-5xl">
                      {statBox.number}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="mt-2 text-lg font-bold text-dark uppercase tracking-wide">
                        {statBox.title}
                      </h3>
                      <p className="mt-2 text-sm text-dark-muted leading-relaxed">
                        {statBox.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        )}
      </div>
    </section>
  )
}
