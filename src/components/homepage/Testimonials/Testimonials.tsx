'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import siteData from '@/website.json'
import { Container } from '@/components/ui'

const { testimonials } = siteData

/**
 * Testimonials
 *
 * Replaces the previous multi-card Swiper row entirely — this is a
 * single testimonial shown at a time (quote mark, quote, avatar + name +
 * role), with prev/next controls sitting under the heading on the left,
 * matching the reference exactly rather than a row of cards.
 *
 * Transition: no CSS keyframes file needed — prev/next briefly fades the
 * quote block out (150ms), swaps the underlying data, then fades it back
 * in. Pure React state + Tailwind's transition-opacity/translate
 * utilities, so it stays a plain component with no animation library.
 *
 * Responsive:
 *   - lg+    : 5fr/7fr two-column grid, matching the reference
 *   - sm/md  : stacks to a single column — heading/subheading/arrows
 *              first, quote block below (arrows staying near the
 *              heading rather than moving to sit under the quote,
 *              since that's their fixed relationship in the reference)
 *
 * The Google-reviews aggregate bar from the previous version is kept
 * below the whole block — it's independent trust-signal content, not
 * part of what's being replaced, just no longer crammed inside the
 * per-review cards.
 */
export default function Testimonials() {
  const items = testimonials.items
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  function goTo(getNextIndex: (current: number) => number) {
    setVisible(false)
    window.setTimeout(() => {
      setIndex(getNextIndex)
      setVisible(true)
    }, 150)
  }

  function prev() {
    goTo((i) => (i - 1 + items.length) % items.length)
  }

  function next() {
    goTo((i) => (i + 1) % items.length)
  }

  const item = items[index]

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-16">
          {/* Left: heading + subheading + prev/next */}
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-dark-muted">
              {testimonials.label}
            </p>

            <h2 id="testimonials-heading" className="mt-3">
              <span className="block text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
                {testimonials.heading}
              </span>
              <span className="block capitalize font-[family-name:var(--font-allura)] text-[clamp(2.1rem,4vw,3.5rem)] leading-none italic text-accent">
                {testimonials.script}
              </span>
            </h2>

            <p className="mt-5 max-w-[24rem] text-p text-dark-muted">{testimonials.subheading}</p>

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(60,37,21,0.2)] text-dark transition-colors hover:border-accent hover:text-accent"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(60,37,21,0.2)] text-dark transition-colors hover:border-accent hover:text-accent"
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Right: single quote, cross-fades between testimonials */}
          <div
            className={`transition-all duration-300 ease-out ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}
          >
            <Quote
              className="h-10 w-10 text-accent"
              fill="currentColor"
              strokeWidth={0}
              aria-hidden="true"
            />

            <p className="mt-4 max-w-2xl text-[clamp(1.4rem,2.6vw,2rem)] font-medium leading-snug text-dark">
              {item.body}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-bg-cream">
                <Image src={item.avatar} alt={item.author} fill className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold text-dark">{item.author}</p>
                <p className="text-sm text-dark-muted">{item.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Google Reviews aggregate — independent trust signal, kept from
            the previous version, not part of the per-review display */}
        {/* <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[rgba(60,37,21,0.1)] pt-6">
          <span className="text-sm font-semibold text-dark">{testimonials.rating.label}</span>
          <span className="text-sm text-dark-muted">
            {testimonials.rating.score} rating · {testimonials.rating.count} Google reviews
          </span>
        </div> */}
      </Container>
    </section>
  )
}
