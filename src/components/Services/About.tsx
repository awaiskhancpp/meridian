import React from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { StatBox } from '@/lib/services'
import { Button } from '../ui'

/**
 * About (service detail page)
 *
 * Matches the reference: a small bordered badge, a bold multi-line
 * mission-style heading, a photo on the left, and on the right a
 * paragraph followed by a 2x2 grid of stat boxes, then a CTA button.
 *
 * Every service supplies its OWN heading/description/stats — this
 * isn't one shared About block, it's `tagline` + `description` +
 * `statBoxes` pulled straight off the current service (see
 * lib/services.ts's ServiceCardData). A physical remodel service and
 * a consultation service will show entirely different copy and stats
 * here, same as ServiceProcess does for its steps.
 *
 * rounded-none throughout (image, badge, CTA) — kept consistent with
 * the "no rounded corners" convention already established in this
 * services folder (see ServiceProcess.tsx's own comments), rather
 * than copying the reference's rounded pill badge/button literally.
 */

interface AboutProps {
  label?: string
  heading?: string
  script?: string
  description: string
  image: string
  imageAlt?: string
  statBoxes: StatBox[]
  ctaLabel?: string
  ctaHref?: string
}

export default function About({
  label = 'About Us',
  heading = 'About',
  script = 'Us',
  description,
  image,
  imageAlt = '',
  statBoxes,
  ctaLabel = "Let's Build Together",
  ctaHref = '#contact',
}: AboutProps) {
  return (
    <section aria-labelledby="service-about-heading">
      <p className="text-xs uppercase tracking-[0.34em] text-dark-muted">{label}</p>
      <h2 id="service-about-heading" className="mt-1">
        <span className="block text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
          {heading}
        </span>
        <span className="block capitalize font-[family-name:var(--font-allura)] text-[clamp(2.1rem,4vw,3.5rem)] leading-none italic text-accent">
          {script}
        </span>
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-12">
        {/* ── Left: photo ── */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-none sm:aspect-[4/3]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            // sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        </div>

        {/* ── Right: description, stat grid, CTA ── */}
        <div>
          <p className="text-sm leading-relaxed text-dark-muted sm:text-base">{description}</p>

          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6">
            {statBoxes.map((stat) => (
              <div key={stat.title}>
                <p className="text-2xl font-black leading-none text-dark sm:text-3xl">
                  {stat.title}
                </p>
                <p className="mt-2 text-sm text-dark-muted">{stat.description}</p>
              </div>
            ))}
          </div>

          <Button
            href={ctaHref}
            variant="outline"
            className="mt-10 inline-flex items-center gap-2 rounded-none px-6 py-3.5 text-sm font-semibold transition-colors duration-300"
          >
            {ctaLabel}
            <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}
