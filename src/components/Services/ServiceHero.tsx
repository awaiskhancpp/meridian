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
  ctaHref = '/#contact',
  label,
  statBoxes,
}: ServiceHeroProps) {
  return (
    <section aria-label={title} className="w-full">
      <div className="relative isolate h-[100vh] min-h-[500px] w-full lg:h-[92vh]">
        <Image
          src={image}
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover object-center"
        />

        {/* Gradient overlay - using theme colors */}
        <div className="absolute inset-0 bg-overlay-service-hero" />

        <Container className="relative flex h-full flex-col justify-center">
          <div className="max-w-3xl">
            {/* Main title */}
            <h1 className="text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em] text-white lg:text-[4.5rem]">
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/90 lg:text-xl">
                {subtitle}
              </p>
            )}

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

        {/* Notice we removed the outer <div className="max-w-5xl"> here */}
        {statBoxes && statBoxes.length > 0 && (
          <div className="hidden lg:block absolute bottom-0 left-0 right-0 translate-y-1/2">
            {/* Added max-w-5xl directly to the Container instead */}
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {statBoxes.map((statBox, index) => (
                  <div
                    key={index}
                    className="bg-white-high backdrop-blur-sm p-4 flex flex-col items-center justify-center gap-2 shadow-sm"
                  >
                    <div className="text-3xl font-black flex items-center text-accent lg:text-4xl">
                      {statBox.number}
                    </div>
                    <div className="flex flex-col items-center">
                      <h3 className="text-md font-bold text-dark uppercase tracking-wide">
                        {statBox.title}
                      </h3>
                      <p className="text-xs text-dark-muted leading-relaxed">
                        {statBox.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {statBoxes && statBoxes.length > 0 && (
        <div className="block lg:hidden py-4 bg-white">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {statBoxes.map((statBox, index) => (
                <div key={index} className="flex gap-3 bg-white p-6 shadow-lg">
                  <div className="flex items-center text-4xl font-black text-accent">
                    {statBox.number}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold uppercase text-dark">{statBox.title}</h3>

                    <p className="mt-2 text-sm text-dark-muted">{statBox.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </div>
      )}
    </section>
  )
}
