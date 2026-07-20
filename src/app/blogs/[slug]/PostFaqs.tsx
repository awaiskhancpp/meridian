'use client'

import React, { useState } from 'react'

type Faq = { question: string; answer: string }

// Same plus→minus icon as the site-wide Faq.tsx component, reused here
// so a per-post FAQ reads as the same design language, not a one-off.
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

export default function PostFaqs({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="mt-16 border-t border-soft pt-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dark-muted">
        Frequently Asked Questions
      </p>

      <div className="mt-6 divide-y divide-soft">
        {faqs.map((item, i) => {
          const open = openIndex === i
          return (
            <div key={item.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-sm font-semibold text-dark">{item.question}</span>
                <PlusMinusIcon open={open} />
              </button>

              {/* grid-template-rows 0fr → 1fr — same smooth-height-without-
                  a-measured-ref technique already used elsewhere in this
                  project's accordions. */}
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-5 text-sm leading-relaxed text-dark-muted">{item.answer}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
