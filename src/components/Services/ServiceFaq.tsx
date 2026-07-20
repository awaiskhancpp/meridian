'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Phone } from 'lucide-react'
import type { ServiceFaq } from '@/lib/services'
import { Button } from '@/components/ui'
import siteData from '@/website.json'

/**
 * ServiceFaqs
 *
 * Left column redesigned to match the reference: previously just the
 * eyebrow + heading, with nothing below it. Added the "Still Have You
 * Any Question?" contact card — avatar cluster, short supporting line,
 * and a phone-number pill button — sitting underneath the heading in
 * the same column, matching the reference's composition exactly.
 *
 * Avatar cluster reuses the SAME pattern TrustSection.tsx already
 * established elsewhere on a service page (-space-x-3 overlapping
 * circles, border-2 border-cream, a trailing count badge) rather than
 * inventing a second version of the same idea. avatars/avatarCountBadge
 * are read from siteData.trustHero — the same source TrustSection
 * itself uses — so this card and the trust section can never show
 * different people or a different count by accident.
 *
 * Phone number is NOT hardcoded — it's pulled from siteData.sitePhone
 * (display + tel: href), the same global field this codebase already
 * uses elsewhere for "Call Us Now" style CTAs, so updating the real
 * number in one place updates it here too.
 *
 * Card tint uses bg-cream/border-accent — this site's own palette
 * standing in for the reference's green-tinted card, consistent with
 * how the open-accordion-row tint below already substitutes cream for
 * the reference's green for the same reason.
 *
 * Right column (accordion) is unchanged from before — plus/minus icon,
 * grid-template-rows 0fr→1fr height animation, tinted active row — all
 * already matched the reference and didn't need touching.
 *
 * Responsive reasoning:
 * - The existing lg: breakpoint split (grid-cols-1 below lg,
 *   grid-cols-[0.85fr_1.15fr] at lg+) is unchanged — it already
 *   correctly matches the reference's two-column shape at desktop
 *   widths and stacks cleanly below that.
 * - Below lg, the new contact card sits in normal document flow between
 *   the heading and the accordion (heading → card → accordion, all
 *   full-width, stacked) — nothing extra needed, since the card's own
 *   internal layout (avatars, text, button) is already narrow enough to
 *   read fine at any width without its own breakpoint overrides.
 * - At lg+, the card naturally inherits the left column's ~0.85fr
 *   width alongside the heading above it — no separate width class
 *   needed on the card itself, it just fills whatever the grid track
 *   gives it, same as the heading does.
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
  label = 'FAQ',
  heading = 'What homeowners',
  script = 'ask us.',
  faqs,
}: {
  label?: string
  heading?: string
  script?: string
  faqs: ServiceFaq[]
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const { avatars, avatarCountBadge } = siteData.trustHero
  const { display: phoneDisplay, href: phoneHref } = siteData.sitePhone

  if (!faqs || faqs.length === 0) return null

  return (
    <section aria-labelledby="service-faq-heading" className="py-16 lg:py-24">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        {/* ── Left: eyebrow + heading + contact card ── */}
        <div>
          <p className="text-xs uppercase tracking-[0.34em] text-dark-muted">{label}</p>
          <h2 id="service-faq-heading" className="mt-1">
            <span className="block text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
              {heading}
            </span>
            <span className="block capitalize font-[family-name:var(--font-allura)] text-[clamp(2.1rem,4vw,3.5rem)] leading-none italic text-accent">
              {script}
            </span>
          </h2>

          {/* ── Contact card — new ── */}
          <div className="mt-8 rounded-2xl border border-accent/25 bg-cream p-6">
            <div className="flex items-center -space-x-3">
              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-cream bg-white"
                >
                  <Image src={avatar} alt="" fill className="object-cover" />
                </div>
              ))}
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-cream bg-accent text-[10px] font-semibold text-white">
                {avatarCountBadge}
              </span>
            </div>

            <p className="mt-4 text-base font-bold text-dark">Still have a question?</p>
            <p className="mt-1 text-sm leading-relaxed text-dark-muted">
              We&apos;re ready to help — reach out and a real person will get back to you.
            </p>

            <Button
              variant="primary"
              size="md"
              href={phoneHref}
              className="mt-5 w-full rounded-full sm:w-auto"
            >
              <Phone size={15} strokeWidth={2} aria-hidden="true" />
              <span>{phoneDisplay}</span>
            </Button>
          </div>
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
