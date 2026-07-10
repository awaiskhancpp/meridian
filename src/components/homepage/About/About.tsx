import React from 'react'
import Image from 'next/image'
import { Button, Container } from '@/components/ui'
import siteData from '@/website.json'
import { colors } from '@/builds'

const { about } = siteData

/**
 * About
 *
 * Genuine "About Us" section (company story + credibility facts), not a
 * features/why-choose-us pitch. Layout follows the reference design:
 *   left  — heading, subheading, CTA, a short list of monochrome fact/feature rows
 *   right — a photo with a single floating dark stat card over its top-left corner
 *
 * Typography — semantic utilities from theme.generated.css:
 *   text-h2   → fontSize.h2 + lineHeight.h2  (responsive)
 *   text-p    → fontSize.p  + lineHeight.p   (responsive)
 *
 * Colors — CSS custom properties via utility classes:
 *   text-black       → var(--color-black)      headings
 *   text-dark-slate  → var(--color-dark-slate) body copy
 *   bg-dark          → var(--color-bg-dark)    floating card surface
 *
 * Raw color values from builds.ts are used only in style= props for
 * opacity tints (icon-square bg, dividers) that aren't in the generated set.
 */

function FeatureIcon({ name }: { name: string }) {
  // Monochrome — matches the reference's simple dark-line-on-light-square icons
  const cls = 'w-5 h-5 text-black'

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
  return <span className="w-2 h-2 rounded-full bg-black" aria-hidden="true" />
}

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full bg-white py-20 md:py-28 lg:py-36"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ── Left column ──────────────────────────────────────────── */}
          <div className="flex flex-col gap-6">
            {/* h2 — text-h2 utility, black, two-line style like the reference */}
            <h2 id="about-heading" className="text-h2 text-black max-w-md">
              {about.heading}
            </h2>

            {/* body — text-p utility, dark-slate muted */}
            <p className={`text-p max-w-md ${colors.darkSlate}a6`}>{about.subheading}</p>

            {/* CTA */}
            <div>
              <Button
                variant="primary"
                size="md"
                href={about.cta.href}
                className="bg-black hover:bg-dark-slate text-white border-transparent"
              >
                {about.cta.label}
              </Button>
            </div>

            {/* Divider */}
            <div className={`w-16 h-px my-2 ${colors.darkSlate}26`} aria-hidden="true" />

            {/* Fact / feature rows — monochrome icon squares, not accent circles */}
            <ul className="flex flex-col gap-5" role="list">
              {about.features.map((feature) => (
                <li key={feature.title} className="flex items-start gap-4">
                  <span
                    className="shrink-0 mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${colors.darkSlate}0f` }}
                  >
                    <FeatureIcon name={feature.icon} />
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-black text-sm">{feature.title}</span>
                    <span
                      className="text-sm leading-relaxed"
                      style={{ color: `${colors.darkSlate}8c` }}
                    >
                      {feature.description}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right column: photo + single floating stat card ───────── */}
          {/* Right column */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[560px]">
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[32px]">
                <Image src={about.image} alt={about.heading} fill className="object-cover" />
              </div>

              {/* Floating Card */}
              <div className="absolute left-6 bottom-6 w-[320px] rounded-3xl bg-bg-dark border border-white/10 p-4 backdrop-blur-md">
                <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-secondary">
                  {about.card.label}
                </p>

                <p className="mb-2 text-4xl font-semibold text-primary">{about.card.stat}</p>

                <p className="mb-5 text-sm leading-relaxed text-secondary">{about.card.subStat}</p>

                <a
                  href="#agents"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-accent-light"
                >
                  {about.card.cta}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
