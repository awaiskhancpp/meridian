import React from 'react'
import Image from 'next/image'
import siteData from '@/website.json'
import { Button, Container } from '@/components/ui'
import { ArrowUpRight } from 'lucide-react'

const { about } = siteData

/**
 * About
 *
 * Previously this forced `lg:h-screen` (exactly one viewport) with
 * vh-blended clamps to try to guarantee no overflow. That's dropped —
 * the section now just sizes naturally to its content, with generous
 * padding (`lg:py-12`) as breathing room, so overall height ends up a
 * little more than the content actually needs rather than being pinned
 * to an arbitrary "= 100vh" target.
 *
 * `lg:items-stretch` on the grid still makes both columns match
 * whichever is naturally taller (usually the text column), and the
 * image still needs to fill that stretched height rather than being
 * governed by its own aspect-ratio. Getting a child to actually fill a
 * grid-stretched parent's height via `h-full` requires every ancestor
 * in between to have a genuinely definite height too — percentage
 * heights silently fall back to `auto` against an indefinite parent.
 * Rather than chain h-full through multiple nested divs (fragile — one
 * div in the chain missing it breaks everything below), the image
 * wrapper is `lg:absolute lg:inset-0` instead: it fills its stretched
 * grid-item parent exactly by pinning to all four edges, sidestepping
 * percentage-resolution entirely.
 *
 * TWO floating cards sit on top of the photo, not one — a small badge
 * pill near the top (icon + short label, e.g. "Free Estimate") and the
 * larger stat card at the bottom-left (label/stat/subStat/cta). Both
 * share the same dark-glass treatment (bg-[rgba(60,37,21,0.82)] +
 * backdrop-blur-md) so they read as one consistent overlay language,
 * just two different sizes for two different jobs — quick trust signal
 * vs. a fuller stat callout.
 */

function FeatureIcon({
  name,
  className = 'h-4 w-4 text-dark',
}: {
  name: string
  className?: string
}) {
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
        className={className}
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
        className={className}
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
        className={className}
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  }

  if (name === 'clock') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15.5 14" />
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
      className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12 lg:mt-12"
    >
      <Container>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-stretch lg:gap-6">
          <div className="order-2 flex flex-col lg:order-1 lg:justify-center">
            <p className="text-xs font-medium uppercase tracking-[0.34em] text-dark-muted">
              {about.label}
            </p>

            <h2 id="about-heading" className="mt-1">
              <span className="block text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
                {about.heading}
              </span>
              <span className="block capitalize font-[family-name:var(--font-allura)] text-[clamp(2.1rem,4vw,3.5rem)] leading-none italic text-accent">
                {about.script}
              </span>
            </h2>

            <p className="mt-3 max-w-[28rem] text-p text-dark-muted">{about.subheading}</p>

            <div className="mt-6 w-full max-w-[34rem]">
              <div className="grid gap-3">
                {about.features.map((feature) => (
                  <div
                    key={feature.title}
                    className="border-b border-[rgba(60,37,21,0.12)] pb-3 last:border-none"
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
            <div className="mt-5">
              <Button variant="line" size="md" href={about.cta.href} className="max-w-fit">
                <span>{about.cta.label}</span> <ArrowUpRight size={20} />
              </Button>
            </div>
          </div>

          {/* This div is the grid item — `lg:items-stretch` on the grid
              gives it a real computed height matching the text column,
              natively via CSS Grid (not via percentage resolution). */}
          <div className="relative order-1 min-h-[20rem] lg:order-2 lg:min-h-0">
            {/* lg:absolute lg:inset-0 — fills the grid-stretched parent
                above exactly, without relying on h-full percentage
                chains through nested divs. Mobile/tablet keep the
                aspect-ratio-driven sizing since there's no stretched
                row to match there. */}
            <div className="overflow-hidden lg:absolute lg:inset-0">
              <div className="relative aspect-[4/5] w-full lg:aspect-auto lg:h-full">
                <Image src={about.image} alt={about.heading} fill className="object-cover" />
              </div>
            </div>

            {/* Small top badge — the piece that was missing. Deliberately
                minimal: icon + one short label, no stat, no cta — its job
                is a quick trust signal you register in passing, not
                something you stop and read. */}
            <div className="absolute left-4 bottom-4 sm:left-6 w-[15rem] z-10 flex items-center gap-2  bg-[rgba(60,37,21,0.82)] px-4 py-2 text-white backdrop-blur-md">
              <span className="text-sm font-semibold tracking-[0.14em]">{about.badge.label}</span>
              <span className="ml-auto flex h-6 w-6 items-center justify-between rounded-full ">
                <a href="/#gallery">
                  <ArrowUpRight />
                </a>
              </span>
            </div>

            <div className="absolute left-4 bottom-15 max-w-[15rem]  bg-[rgba(60,37,21,0.82)] p-4 text-white  backdrop-blur-md sm:left-6 sm:bottom-15">
              <p className="text-xs uppercase tracking-[0.28em] text-[rgba(255,255,255,0.72)]">
                {about.card.label}
              </p>
              <p className="mt-3 text-4xl font-black leading-none">{about.card.stat}</p>
              <p className="mt-3 text-sm leading-relaxed uppercase text-[rgba(255,255,255,0.82)]">
                {about.card.subStat}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
