import React from 'react'
import Image from 'next/image'
import siteData from '@/website.json'
import { Button, Container } from '@/components/ui'
import { ArrowUpRight, Plus } from 'lucide-react'

const { about } = siteData

/**
 * About
 *
 * Matches the reference layout:
 *   left  — label, heading, subheading, CTA (Button variant="line"),
 *           then a two-box stat row lower down
 *   right — an avatar-stack "trust" badge above a contained photo
 *           (NOT full-bleed/full-column-height like the previous
 *           design — just a normal rectangular image block)
 *
 * Deliberately square, not rounded, per request — no rounded-* classes
 * on the photo, stat boxes, or button. Avatar dots are the one
 * exception (rounded-full): that's their functional shape as circular
 * portrait thumbnails, not a "rounded corner" stylistic choice.
 *
 * Colors/typography stay on the site's existing tokens throughout
 * (text-dark, text-dark-muted, text-accent, bg-cream, the
 * heading+Allura-script pattern) rather than adopting the reference's
 * literal green/gray palette — this is a layout reference, not a
 * palette swap.
 *
 * The previous version's height-matching machinery (lg:items-stretch +
 * absolute-inset image fill to match a stretched grid row) is gone —
 * that existed specifically to make a full-height photo match the text
 * column's height. This photo is a normal contained block now, so
 * none of that complexity is needed anymore.
 */

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-8 lg:py-12 lg:mt-12">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-6">
          {/* ── Left: label, heading, subheading, CTA, stats ───────── */}
          <div className="flex flex-col">
            <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.34em] text-dark-muted">
              {about.label}
            </p>

            <h2 id="about-heading" className="mt-4">
              <span className="block heading-2 text-dark">
                {about.heading}
              </span>
              <span className="block heading-script capitalize text-accent">
                {about.script}
              </span>
            </h2>

            <p className="mt-4 max-w-[28rem] text-p text-dark-muted">{about.subheading}</p>

            <div className="mt-6">
              <Button variant="line" size="md" href={about.cta.href} className="max-w-fit">
                <span>{about.cta.label}</span> <ArrowUpRight size={20} />
              </Button>
            </div>

            {/* Two-box stat row — replaces the old floating stat card
                that used to sit on top of the photo */}
            <div className="mt-auto grid grid-cols-2 gap-4 pt-14 max-w-[24rem]">
              {about.stats.map((stat) => (
                <div key={stat.label} className="bg-cream p-5">
                  <p className="text-3xl font-black leading-none text-dark">{stat.value}</p>
                  <p className="mt-2 text-sm text-dark-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: avatar trust badge + contained photo ────────── */}
          <div className="flex flex-col">
            {/* Avatar stack + trust label */}
            <div className="flex items-center gap-3">
              <div className="flex items-center -space-x-3">
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
            </div>
            <p className="mt-3 text-sm font-medium text-dark">{about.trust.label}</p>

            {/* Contained photo — not full-bleed, no overlay cards */}
            <div className="relative mt-8 aspect-[16/11] w-full overflow-hidden">
              <Image src={about.image} alt={about.heading} fill className="object-cover" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
