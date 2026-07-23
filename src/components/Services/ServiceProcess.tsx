import React from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui'
import type { ProcessStep } from '@/lib/services'

interface ServiceProcessProps {
  label?: string
  heading?: string
  script?: string
  image: string
  steps: ProcessStep[]
}

/**
 * ServiceProcess
 *
 * COMPLETE redesign, not a re-skin — the previous version (and its
 * "fixed" pass) kept the same photo-left / content-right split that
 * About and ServiceFaq ALSO use on this exact page (both ~0.85/1.15
 * two-column splits). By the time a visitor reaches Process they've
 * already seen that skeleton twice, so a nicer badge treatment inside
 * the same box still reads as "the same section again."
 *
 * This version breaks the pattern structurally: it's the ONLY other
 * section on the page (besides ServiceHero) that goes full-bleed —
 * edge-to-edge, outside Container, a real photo behind everything —
 * instead of another bordered white box confined to Container's
 * max-width. That alone makes it read as a distinct "chapter break"
 * moment rather than another content block in the same rhythm.
 *
 * It deliberately echoes ServiceHero rather than inventing a new visual
 * language from scratch:
 * - Same gradient token (bg-overlay-service-hero) ServiceHero itself
 *   uses over its own photo — not a new bespoke overlay.
 * - Step numbers use the exact "big black accent numeral" treatment
 *   ServiceHero's own stat boxes use (text-3xl font-black text-accent),
 *   so the step count reads as a sibling of the hero's stat count, not
 *   an unrelated invention.
 * - The floating card material is bg-glass/border-glass — tokens that
 *   already exist in builds.ts (glassBg/glassBorder) but were unused
 *   anywhere in the codebase until now. This is the same "photo with
 *   floating translucent stat-like boxes" grammar ServiceHero already
 *   established with its own bg-white-high stat boxes, just carried
 *   through with the warmer glass token instead.
 *
 * The gradient is 90deg (left → right fade, darkest at the left edge),
 * not the site's diagonal hero gradient — chosen specifically because
 * the heading block sits at the left regardless of vertical position,
 * so legibility doesn't depend on getting a diagonal angle to line up
 * with content placement. The step cards are ~86% opaque glass, so
 * they carry their own contrast regardless of how much photo shows
 * through on the right side of the gradient.
 *
 * Responsive reasoning (this is the other real change, not just
 * fewer columns at each breakpoint):
 * - Mobile: steps are a horizontally swipeable, scroll-snapped row —
 *   NOT a vertical stack. A vertical stack of 4 cards over a full-bleed
 *   photo would force the photo panel to grow very tall on a phone.
 *   A horizontal row keeps the panel's height bounded to "one card row"
 *   at every breakpoint, and doubles as a natural "explore the
 *   sequence" swipe interaction — distinct from ExploreOtherServices'
 *   arrow-button carousel elsewhere on this same page, so two sections
 *   don't share the identical interaction pattern.
 * - sm+/lg+: the row becomes a static grid (2-up, then 4-up) — desktop
 *   has room to show all four steps at once, so scrolling would be an
 *   unnecessary interaction cost once there's space to avoid it.
 * - The -mx-4/px-4 pair on the mobile scroll row matches Container's
 *   own px-4 mobile padding exactly, so cards can bleed to the true
 *   screen edge (revealing a "peek" of the next card as a scroll
 *   affordance) without fighting Container's padding.
 */
export default function ServiceProcess({
  label = 'Our Process',
  heading = 'Our Simple',
  script = 'Process',
  image,
  steps,
}: ServiceProcessProps) {
  return (
    <section
      aria-labelledby="process-heading"
      className="relative w-full overflow-hidden bg-dark h-[96vh]"
    >
      <div className="relative h-full w-full ">
        <Image src={image} alt="" fill aria-hidden="true" className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-overlay-service-hero" />

        <Container className="relative flex h-full flex-col justify-center gap-12 py-10 lg:py-16">
          {/* ── Heading ── */}
          <div className="max-w-xl mx-auto flex flex-col text-center">
            <p className="text-xs uppercase tracking-[0.34em] text-white/70">{label}</p>
            <h2 id="process-heading" className="mt-2">
              <span className="block heading-2 text-white">{heading}</span>
              <span className="block heading-script text-cream">{script}</span>
            </h2>
          </div>

          {/* ── Steps Grid (Sat right below with gap-12 spacing) ── */}
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="w-[78vw] shrink-0 snap-start border border-glass bg-glass p-6 shadow-card backdrop-blur-sm sm:w-auto sm:shrink"
              >
                <span className="text-3xl font-black leading-none text-accent sm:text-4xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-base font-bold text-dark sm:text-lg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dark-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  )
}
