'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import siteData from '@/website.json'
import { Container, SectionHeading } from '@/components/ui'

const { testimonials } = siteData

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
    <section id="testimonials" aria-labelledby="testimonials-heading" className="section-padding">
      <Container>
        {/* Centered heading */}
        <SectionHeading
          id="testimonials-heading"
          label={testimonials.label}
          heading={testimonials.heading}
          script={testimonials.script}
          subheading={testimonials.subheading}
          maxWidth=""
          labelClassName="text-caption uppercase tracking-wider text-muted-foreground"
          headingMt="mt-3"
          subheadingClassName="mx-auto mt-5 max-w-xl text-body text-muted-foreground"
        />

        {/* Testimonial card with nav buttons on sides */}
        {/* Added max-w-4xl and mx-auto to bring arrows closer on lg screens */}
        <div className="mx-auto mt-14 flex max-w-4xl items-center justify-center gap-4 lg:gap-8">
          {/* Left nav */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-strong text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowLeft className="icon-sm" aria-hidden="true" />
          </button>

          {/* Testimonial content */}
          {/* Added min-heights and flex-col to prevent jumping up and down */}
          <div
            className={`flex min-h-96 flex-1 flex-col justify-center transition-all duration-standard ease-out md:min-h-60 lg:min-h-80 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}
          >
            <Quote
              className="mx-auto h-10 w-10 text-accent"
              fill="currentColor"
              strokeWidth={0}
              aria-hidden="true"
            />

            <p className="mt-4 text-center text-body-lg font-medium text-foreground">{item.body}</p>

            <div className="mt-8 flex items-center justify-center gap-card">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-surface">
                <Image src={item.avatar} alt={item.author} fill className="object-cover" />
              </div>
              <div>
                <p className="text-body-sm font-semibold text-foreground">{item.author}</p>
                <p className="text-body-sm text-muted-foreground">{item.role}</p>
              </div>
            </div>
          </div>

          {/* Right nav */}
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-strong text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowRight className="icon-sm" aria-hidden="true" />
          </button>
        </div>
      </Container>
    </section>
  )
}



