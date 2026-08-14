import React from 'react'
import Image from 'next/image'
import siteData from '@/website.json'
import { Button, Container, SectionHeadingInline } from '@/components/ui'
import { ArrowUpRight } from 'lucide-react'

const { about } = siteData

/**
 * About
 *
 * Redesigned around the one idea worth taking from the reference: a
 * photo with a dark caption card breaking out over its edge, instead
 * of a plain contained photo with a separate avatar row floating
 * above it. Everything else Ã¢â‚¬â€ heading treatment, colors, button
 * style Ã¢â‚¬â€ stays on the site's existing tokens and conventions; this
 * is a layout reference, not a palette or type swap.
 *
 * Photo now goes FIRST in the grid (left at desktop), text second Ã¢â‚¬â€
 * the reference leads with the photo, the previous version had this
 * reversed (text-left, photo-right), which is why swapping the grid
 * children's order was the one structural change that mattered most.
 *
 * The overlapping caption card uses about.card (label/stat/subStat) Ã¢â‚¬â€
 * a big number + a punchy line of supporting copy, sitting completely
 * unused in the data until now. That's a much closer match to the
 * reference's tone (a short confident statement) than the avatar
 * stack + "Client Satisfaction" label originally placed here, which
 * read more like a review widget than a caption. The avatars still
 * have a home Ã¢â‚¬â€ the site's TrustSection component elsewhere already
 * covers that social-proof role, so this section doesn't need to
 * duplicate it.
 *
 * Responsive reasoning for the overlap itself: breaking a card outside
 * its photo's edges only makes sense once there's room to actually see
 * both the photo and the breakout without either getting clipped by
 * the viewport. Below lg, the card sits fully inset within the photo
 * (inset-x-4/6, bottom-4/6) Ã¢â‚¬â€ safe on any phone width, no risk of the
 * card's edge running past the screen. Only at lg+, where the column
 * itself has real width to spare, does it break outside the photo's
 * right and bottom edges for the more dramatic overlap effect.
 *
 * The text column has no explicit height of its own Ã¢â‚¬â€ CSS grid's
 * default `items: stretch` already makes it match the photo column's
 * height, and `flex flex-col justify-center` inside it then centers
 * the label/heading/subheading/CTA/stats stack vertically within that
 * space, so the composition balances against the photo without any
 * extra height-matching machinery.
 */

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-padding mt-10 ">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Ã¢â€â‚¬Ã¢â€â‚¬ Left (at lg): photo with overlapping trust card Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
          <div className="relative">
            <div className="relative ratio-landscape w-full overflow-hidden">
              <Image src={about.image} alt={about.heading} fill className="object-cover" />
            </div>

            {/* Inset on mobile/tablet (safe within the photo's own
                bounds, no viewport-edge risk); breaks outside the
                photo's right + bottom edge at lg where there's room
                to spare. max-w caps how wide the breakout can get on
                very wide columns. */}
            <div className="absolute inset-x-4 bottom-4 about-callout-right bg-dark p-3 sm:inset-x-6 sm:bottom-6 sm:p-6 lg:inset-x-auto lg:-right-6 lg:bottom-8 lg:left-6 lg:max-card-copy lg:p-7">
              <p className="text-xs font-medium uppercase tracking-label text-white-subtle">
                {about.card.label}
              </p>
              <p className="mt-3 text-4xl font-black leading-none text-accent-light">
                {about.card.stat}
              </p>
              <p className="mt-2 text-sm leading-snug text-white-strong">{about.card.subStat}</p>
            </div>
          </div>

          {/* Ã¢â€â‚¬Ã¢â€â‚¬ Right (at lg): heading, subheading, CTA, stats Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
          <div className="flex flex-col justify-center">
            <SectionHeadingInline
              id="about-heading"
              label={about.label}
              heading={about.heading}
              script={about.script}
              subheading={about.subheading}
              labelClassName="flex items-center gap-card text-xs font-medium uppercase tracking-eyebrow text-dark-muted"
            />

            <div className="mt-8">
              <Button variant="line" size="md" href={about.cta.href} className="max-w-fit">
                <span>{about.cta.label}</span> <ArrowUpRight size={20} />
              </Button>
            </div>

            {/* <div className="mt-10 max-about-stats bg-cream p-5">
              <p className="text-3xl font-black leading-none text-dark">{about.stats[1].value}</p>
              <p className="mt-2 text-sm text-dark-muted">{about.stats[1].label}</p>
            </div> */}
          </div>
        </div>
      </Container>
    </section>
  )
}
