'use client'

import React, { useState } from 'react'

type Faq = { question: string; answer: string }

function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-5 w-5 shrink-0 items-center justify-center" aria-hidden="true">
      <span className="absolute h-0.5 w-4 rounded-full bg-primary" />
      <span
        className={`absolute h-4 w-divider rounded-full bg-primary transition-transform duration-standard ${
          open ? 'scale-y-0' : 'scale-y-100'
        }`}
      />
    </span>
  )
}

export default function PostFaqs({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="mt-16 border-t border-border pt-10">
      <p className="text-card font-black uppercase tracking-wider text-muted-foreground">
        Frequently Asked Questions
      </p>

      <div className="mt-6 divide-y divide-border">
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
                <span className="text-body-lg font-bold text-foreground">{item.question}</span>
                <PlusMinusIcon open={open} />
              </button>

              {/* grid-template-rows 0fr Ã¢â€ â€™ 1fr Ã¢â‚¬â€ same smooth-height-without-
                  a-measured-ref technique already used elsewhere in this
                  project's accordions. */}
              <div
                className={`grid transition-accordion duration-standard ease-out ${
                  open ? 'rows-open' : 'rows-closed'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-5 text-body-lg leading-relaxed text-muted-foreground">{item.answer}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

