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
interface Highlight {
  title: string
  description: string
}
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
  highlights: Highlight[]
}

export default function ServiceAbout({
  label = 'About Us',
  heading = 'Renovating for',
  script = 'Genrations',
  description,
  image,
  imageAlt = '',
  statBoxes,
  ctaLabel = "Let's Build Together",
  ctaHref = '/#contact',
  highlights,
}: AboutProps) {
  return (
    <section aria-labelledby="service-about-heading" className="section-padding">
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch ">
        {/* ── Left: photo ── */}
        <div className="relative aspect-portrait w-full overflow-hidden rounded-none sm:aspect-landscape">
          <Image
            src={image}
            alt={imageAlt}
            fill
            // sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        </div>

        {/* ── Right: description, stat grid, CTA ── */}
        <div className="flex h-full flex-col justify-center items-start">
          <p className="text-caption uppercase tracking-wider text-muted-foreground">{label}</p>
          <h2 id="service-about-heading" className="mt-1">
            <span className="heading-2 text-foreground">{heading}</span>
            <span className="ml-2 heading-script capitalize text-accent">{script}</span>
          </h2>
          <p className="text-body-sm leading-relaxed text-muted-foreground sm:text-body">{description}</p>

          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 ">
            {highlights.map((t, i) => (
              <div key={i}>
                <p className="highlight-title text-foreground">{t.title}</p>
                <p className="mt-2 text-body-sm text-muted-foreground">{t.description}</p>
              </div>
            ))}
          </div>

          <Button
            href={ctaHref}
            variant="outline"
            className="mt-10 inline-flex items-center gap-2 rounded-none px-6 py-3.5 text-body-sm font-semibold transition-colors duration-standard"
          >
            {ctaLabel}
            <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}

