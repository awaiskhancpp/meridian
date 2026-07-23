'use client'

import React, { useState } from 'react'
import siteData from '@/website.json'
import { Container, SectionHeading } from '@/components/ui'

const { faq } = siteData

/*
  Plus → minus icon, built as two overlapping strokes rather than swapping
  between two separate SVGs. The vertical stroke scales to 0 on the y-axis
  when open, leaving only the horizontal stroke — a "minus" — with a
  smooth transition between the two states instead of an abrupt icon swap.
  Hand-rolled to match this codebase's existing convention: no icon
  library is installed anywhere in this project (see FeatureIcon in
  About.tsx), every icon here is inline SVG.
*/
function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-5 w-5 shrink-0 items-center justify-center" aria-hidden="true">
      <span className="absolute h-0.5 w-4 rounded-full bg-dark" />
      <span
        className={`absolute h-4 w-0.5 rounded-full bg-dark transition-transform duration-300 ${
          open ? 'scale-y-0' : 'scale-y-100'
        }`}
      />
    </span>
  )
}

export default function FAQ() {
  // First item open by default, matching the reference screenshot.
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-8 lg:py-16">
      <Container>
        {/*
          Responsive reasoning:
          Mobile/tablet (<lg): plain `grid` with no column count defaults
          to a single stacked column — heading block first, then the full
          accordion list beneath it, full width. There's no room for a
          genuine two-column split once the question text needs to wrap
          on a narrow screen, and stacking keeps both halves legible.

          Desktop (lg+): grid-cols-[0.85fr_1.15fr] — the accordion column
          gets more width than the heading column, matching the reference
          image's proportions (heading block is narrower than the card
          list). lg:items-start (implicit — no items-center anywhere)
          keeps the heading pinned to the top of its column rather than
          vertically centering against the taller accordion list, exactly
          like the reference screenshot where the left column doesn't
          stretch to match the right column's height.
        */}
        <div className="grid gap-8 lg:grid-cols-1 lg:gap-16">
          {/* ── Left: heading + subheading ──────────────────────── */}
          <div>
            <SectionHeading
              id="faq-heading"
              label={faq.label}
              heading={faq.heading}
              script={faq.script}
              subheading={faq.subheading}
            />
          </div>

          {/* ── Right: accordion list ────────────────────────────── */}
          <div className="flex flex-col gap-3 ">
            {faq.items.map((item, index) => {
              const open = openIndex === index
              return (
                <div
                  key={item.question}
                  className={`overflow-hidden  transition-colors duration-300 border-b border-dark/10 last:border-none `}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : index)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-5 py-2 text-left sm:px-6 sm:py-3"
                  >
                    <span className="text-md font-semibold text-dark sm:text-lg">
                      {item.question}
                    </span>
                    <PlusMinusIcon open={open} />
                  </button>

                  {/*
                    grid-template-rows 0fr → 1fr trick: animates height
                    smoothly without needing a JS-measured scrollHeight ref.
                    The inner div's overflow-hidden is what actually clips
                    content during the transition; the outer grid row is
                    what's being animated between "doesn't exist" (0fr) and
                    "exactly fits content" (1fr).
                  */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-dark-muted sm:px-6 sm:pb-6">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
