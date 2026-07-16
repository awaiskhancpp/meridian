import React from 'react'
import Image from 'next/image'
import siteData from '@/website.json'
import { Button, Container } from '@/components/ui'
import { ArrowUpRight, Plus } from 'lucide-react'

const { about } = siteData

/**
 * About
 *
 * Column assignment (this is the part that was backwards before):
 *   left  — About Us label, avatar-stack "Client Satisfaction" trust
 *           badge, then a two-box stat row pushed to the bottom
 *   right — heading, subheading, CTA (Button variant="line"), then the
 *           contained photo below it
 *
 * Deliberately square, not rounded — no rounded-* on the photo, stat
 * boxes, or button. Avatar dots stay rounded-full since that's their
 * functional shape as circular portrait thumbnails, not a corner-radius
 * stylistic choice.
 *
 * Colors/typography stay on the site's existing tokens throughout
 * (text-dark, text-dark-muted, text-accent, bg-cream, bg-accent, the
 * heading+Allura-script pattern) — this is a layout reference, not a
 * palette swap.
 */
export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-8 lg:py-12 lg:mt-12">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-10">
          {/* ── Left: label, trust badge, stats ─────────────────────── */}
          <div className="flex flex-col">
            <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.34em] text-dark-muted">
              <span className="h-px w-6 bg-[rgba(60,37,21,0.3)]" aria-hidden="true" />
              {about.label}
              <span className="h-px w-6 bg-[rgba(60,37,21,0.3)]" aria-hidden="true" />
            </p>

            {/* Avatar stack + trust label */}
            <div className="mt-6 flex items-center -space-x-3">
              {about.trust.avatars.map((avatar, i) => (
                <div
                  key={i}
                  className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-white bg-bg-cream"
                >
                  <Image src={avatar} alt="" fill className="object-cover" />
                </div>
              ))}
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-accent text-white">
                <Plus className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-3 text-sm font-medium text-dark">{about.trust.label}</p>

            {/* Two-box stat row — pushed to the bottom of the column */}
            <div className="mt-auto grid max-w-[24rem] grid-cols-2 gap-4 pt-14">
              {about.stats.map((stat) => (
                <div key={stat.label} className="bg-cream p-5">
                  <p className="text-3xl font-black leading-none text-dark">{stat.value}</p>
                  <p className="mt-2 text-sm text-dark-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: heading, subheading, CTA, photo ──────────────── */}
          <div className="flex flex-col">
            <h2 id="about-heading">
              <span className="inline-block text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
                {about.heading}
              </span>
              <span className="inline-block ml-2 capitalize font-[family-name:var(--font-allura)] text-[clamp(2.1rem,4vw,3.5rem)] leading-none italic text-accent">
                {about.script}
              </span>
            </h2>

            <p className="mt-4 max-w-[32rem] text-p text-dark-muted">{about.subheading}</p>

            <div className="mt-6">
              <Button variant="line" size="md" href={about.cta.href} className="max-w-fit">
                <span>{about.cta.label}</span> <ArrowUpRight size={20} />
              </Button>
            </div>

            {/* Contained photo — not full-bleed, no overlay cards */}
            <div className="relative mt-8 aspect-[21/9] w-full overflow-hidden">
              <Image src={about.image} alt={about.heading} fill className="object-cover" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
