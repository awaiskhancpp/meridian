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
 * COMPLETE redesign, not a re-skin Ã¢â‚¬â€ the previous version (and its
 * "fixed" pass) kept the same photo-left / content-right split that
 * About and ServiceFaq ALSO use on this exact page (both ~0.85/1.15
 * two-column splits). By the time a visitor reaches Process they've
 * already seen that skeleton twice, so a nicer badge treatment inside
 * the same box still reads as "the same section again."
 *
 * This version breaks the pattern structurally: it's the ONLY other
 * section on the page (besides ServiceHero) that goes full-bleed Ã¢â‚¬â€
 * edge-to-edge, outside Container, a real photo behind everything Ã¢â‚¬â€
 * instead of another bordered white box confined to Container's
 * max-width. That alone makes it read as a distinct "chapter break"
 * moment rather than another content block in the same rhythm.
 *
 * It deliberately echoes ServiceHero rather than inventing a new visual
 * language from scratch:
 * - Same gradient token (bg-hero-overlay) ServiceHero itself
 *   uses over its own photo Ã¢â‚¬â€ not a new bespoke overlay.
 * - Step numbers use the exact "big black accent numeral" treatment
 *   ServiceHero's own stat boxes use (heading-2 font-black text-accent),
 *   so the step count reads as a sibling of the hero's stat count, not
 *   an unrelated invention.
 * - The floating card material is bg-glass/border-border-inverse Ã¢â‚¬â€ tokens that
 *   already exist in builds.ts (glassBg/glassBorder) but were unused
 *   anywhere in the codebase until now. This is the same "photo with
 *   floating translucent stat-like boxes" grammar ServiceHero already
 *   established with its own bg-background stat boxes, just carried
 *   through with the warmer glass token instead.
 *
 * The gradient is 90deg (left Ã¢â€ â€™ right fade, darkest at the left edge),
 * not the site's diagonal hero gradient Ã¢â‚¬â€ chosen specifically because
 * the heading block sits at the left regardless of vertical position,
 * so legibility doesn't depend on getting a diagonal angle to line up
 * with content placement. The step cards are ~86% opaque glass, so
 * they carry their own contrast regardless of how much photo shows
 * through on the right side of the gradient.
 *
 * Responsive reasoning:
 * - Mobile: single-column stack Ã¢â‚¬â€ one step per row.
 * - sm: 2-up grid; lg: 4-up grid when there is room to show every step at once.
 * - min-h-process on mobile lets the section grow with stacked cards instead of
 *   clipping them inside a fixed viewport-height panel.
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
      className="relative w-full overflow-hidden bg-background  lg:h-viewport"
    >
      <div className="relative h-full w-full ">
        <Image src={image} alt="" fill aria-hidden="true" className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-hero-overlay" />

        <Container className="relative flex h-full flex-col justify-center gap-12 section-padding">
          <div className="max-w-xl mx-auto flex flex-col text-center">
            <p className="text-caption uppercase tracking-wider text-primary-foreground-subtle">{label}</p>
            <h2 id="process-heading" className="mt-2">
              <span className="block heading-2 text-primary-foreground">{heading}</span>
              <span className="block heading-script text-surface-foreground">{script}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="card-muted backdrop-blur-sm"
              >
                <span className="heading-2 text-accent sm:heading-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-body font-bold text-foreground sm:text-body-lg">{step.title}</h3>
                <p className="mt-2 text-body-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  )
}
