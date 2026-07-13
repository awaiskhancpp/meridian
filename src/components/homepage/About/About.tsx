import React from 'react'
import Image from 'next/image'
import siteData from '@/website.json'
import { Button, Container } from '@/components/ui'

const { about } = siteData

/**
 * About
 *
 * lg+: capped at exactly one viewport (`lg:h-screen`), vertically centered,
 * so the section never spills past the fold on desktop. To make that
 * actually hold (not just hope it fits):
 *   - Heading/script clamps blend vw AND vh (`clamp(min, Xvw + Yvh, max)`),
 *     so they shrink on short-but-wide windows, not just narrow ones.
 *   - Vertical rhythm (margins, feature-list gaps) is tightened at lg.
 *   - The image switches from a fixed aspect-ratio to `lg:h-full`, so it
 *     always exactly matches whatever height the left column's content
 *     leaves available, instead of dictating its own height via aspect
 *     ratio (that was the main overflow source — a 4:5 ratio on a wide
 *     column can easily demand more height than the viewport has).
 *
 * Not attempted: guaranteeing a fit for arbitrarily long feature
 * descriptions on very short windows without either shrinking text to
 * near-illegible sizes or truncating real copy. This targets comfortable
 * fit on typical laptop/desktop viewport heights; unusually long copy or
 * an unusually short window may still need to overflow.
 *
 * Mobile/tablet are intentionally left as a normal scrollable stack —
 * "fit in one screen" isn't a reasonable expectation once everything is
 * stacked vertically.
 */

function FeatureIcon({ name }: { name: string }) {
  const cls = 'h-4 w-4 text-dark'

  if (name === 'layers') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cls}
        aria-hidden="true"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    )
  }

  if (name === 'chart') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cls}
        aria-hidden="true"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    )
  }

  if (name === 'shield') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cls}
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  }

  return <span className="h-2 w-2 rounded-full bg-dark" aria-hidden="true" />
}

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="px-4 py-8 sm:px-6 lg:h-screen lg:px-8 lg:py-6"
    >
      <Container className="lg:h-full">
        <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-2 lg:items-stretch lg:gap-6">
          <div className="order-2 flex flex-col lg:order-1 lg:h-full lg:justify-center">
            <p className="text-xs uppercase tracking-[0.32em] text-dark-muted">{about.label}</p>

            <h2 id="about-heading" className="mt-1">
              <span className="block text-[clamp(2.2rem,3vw+2vh,4.4rem)] font-black uppercase leading-[0.88] tracking-[-0.04em] text-dark">
                {about.heading}
              </span>
              <span className="block font-[family-name:var(--font-allura)] text-[clamp(2.2rem,2.6vw+2vh,4rem)] leading-none italic text-accent">
                {about.script}
              </span>
            </h2>

            <p className="mt-2 max-w-[28rem] text-p text-dark-muted lg:mt-3">{about.subheading}</p>

            <div className="mt-4 lg:mt-5">
              <Button variant="line" size="md" href={about.cta.href} className="max-w-fit">
                {about.cta.label}
              </Button>
            </div>

            <div className="mt-6 w-full max-w-[34rem]">
              <div className="grid gap-2 lg:gap-2.5">
                {about.features.map((feature) => (
                  <div
                    key={feature.title}
                    className="border-b border-[rgba(60,37,21,0.12)] pb-2 last:border-none lg:pb-2.5"
                  >
                    <div className="flex items-start gap-2">
                      <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(60,37,21,0.14)] bg-white">
                        <FeatureIcon name={feature.icon} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-dark">{feature.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-dark-muted">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 lg:h-full">
            <div className="h-full overflow-hidden rounded-sm bg-cream shadow-[0_18px_48px_rgba(60,37,21,0.08)]">
              <div className="relative aspect-[4/5] w-full lg:aspect-auto lg:h-full">
                <Image src={about.image} alt={about.heading} fill className="object-cover" />
              </div>
            </div>

            <div className="absolute left-4 bottom-4 max-w-[15rem] rounded-sm bg-[rgba(60,37,21,0.82)] p-4 text-white shadow-[0_18px_48px_rgba(0,0,0,0.18)] backdrop-blur-md sm:left-6 sm:bottom-6">
              <p className="text-xs uppercase tracking-[0.28em] text-[rgba(255,255,255,0.72)]">
                {about.card.label}
              </p>
              <p className="mt-3 text-4xl font-black leading-none">{about.card.stat}</p>
              <p className="mt-3 text-sm leading-relaxed uppercase text-[rgba(255,255,255,0.82)]">
                {about.card.subStat}
              </p>
              <a
                href={about.cta.href}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.14em] text-white transition-colors hover:text-cream"
              >
                {about.card.cta}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
