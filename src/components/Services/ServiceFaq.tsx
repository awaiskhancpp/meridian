'use client'

import React, { useState } from 'react'
import type { ServiceFaq } from '@/lib/services'

/**
 * ServiceFaqs
 *
 * Matches the reference: a left column with a small "FAQ" eyebrow and
 * a bold two-line heading, a right column with an accordion list. The
 * currently-open item gets a subtle tinted background + border (bg
 * cream here, standing in for the reference's green tint, to match
 * this site's actual palette) so it visually separates itself from
 * the closed rows above and below it — the reference isn't just
 * showing/hiding an answer, it's highlighting which row is active.
 *
 * Same plus/minus icon + grid-template-rows 0fr->1fr height animation
 * already established in the homepage Faq.tsx and the blog post's
 * PostFaqs.tsx — kept consistent rather than inventing a third
 * accordion implementation. Not imported from either of those, since
 * both are wired to their own specific data source (siteData.faq,
 * a blog post's faqs) rather than an arbitrary ServiceFaq[] prop.
 *
 * Responsive: this reference is inherently a two-column layout (heading
 * pinned left, questions filling the wider right column) — collapsing
 * that to one column on mobile is straightforward since the heading
 * block is short and doesn't need to stay pinned once it's not sitting
 * beside a much taller accordion. Below lg: grid-cols-1, heading block
 * first, full-width accordion beneath — matching how Faq.tsx handles
 * the exact same left-heading/right-list shape at narrow widths. At
 * lg+: grid-cols-[0.85fr_1.15fr], heading left, accordion right, with
 * items-start so the (much shorter) heading column doesn't stretch to
 * match the accordion's height.
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

export default function ServiceFaqs({
  serviceTitle,
  faqs,
}: {
  serviceTitle: string
  faqs: ServiceFaq[]
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!faqs || faqs.length === 0) return null

  return (
    <section aria-labelledby="service-faq-heading" className="py-16 lg:py-24">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        {/* ── Left: eyebrow + heading ── */}
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            FAQ
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
          </p>
          <h2
            id="service-faq-heading"
            className="mt-4 text-[clamp(1.6rem,3.2vw,2.4rem)] font-black leading-[1.15] tracking-[-0.02em] text-dark"
          >
            Common Questions About {serviceTitle}
          </h2>
        </div>

        {/* ── Right: accordion ── */}
        <div className="flex flex-col gap-3">
          {faqs.map((item, index) => {
            const open = openIndex === index
            return (
              <div
                key={item.question}
                className={`rounded-none border px-5 py-4 transition-colors duration-300 sm:px-6 ${
                  open ? 'border-accent/30 bg-cream' : 'border-[rgba(60,37,21,0.12)] bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="text-sm font-semibold text-dark sm:text-base">
                    {item.question}
                  </span>
                  <PlusMinusIcon open={open} />
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pt-3 text-sm leading-relaxed text-dark-muted">{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
