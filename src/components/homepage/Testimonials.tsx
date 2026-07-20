'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import siteData from '@/website.json'
import { Container } from '@/components/ui'

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
    <section id="testimonials" aria-labelledby="testimonials-heading" className="py-16 lg:py-24">
      <Container>
        {/* Centered heading */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.34em] text-dark-muted">
            {testimonials.label}
          </p>

          <h2 id="testimonials-heading" className="mt-3">
            <span className="block text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
              {testimonials.heading}
            </span>
            <span className="block font-[family-name:var(--font-allura)] text-[clamp(2.1rem,4vw,3.5rem)] italic leading-none text-accent capitalize">
              {testimonials.script}
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-p text-dark-muted">{testimonials.subheading}</p>
        </div>

        {/* Testimonial card with nav buttons on sides */}
        {/* Added max-w-4xl and mx-auto to bring arrows closer on lg screens */}
        <div className="mx-auto mt-14 flex max-w-4xl items-center justify-center gap-4 lg:gap-8">
          {/* Left nav */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(60,37,21,0.2)] text-dark transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>

          {/* Testimonial content */}
          {/* Added min-heights and flex-col to prevent jumping up and down */}
          <div
            className={`flex min-h-[360px] flex-1 flex-col justify-center transition-all duration-300 ease-out  md:min-h-[240px] lg:min-h-[320px] ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}
          >
            <Quote
              className="mx-auto h-10 w-10 text-accent"
              fill="currentColor"
              strokeWidth={0}
              aria-hidden="true"
            />

            <p className="mt-4 text-center text-[clamp(1.2rem,2.2vw,1.75rem)] font-medium leading-snug text-dark">
              {item.body}
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-cream">
                <Image src={item.avatar} alt={item.author} fill className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold text-dark">{item.author}</p>
                <p className="text-sm text-dark-muted">{item.role}</p>
              </div>
            </div>
          </div>

          {/* Right nav */}
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(60,37,21,0.2)] text-dark transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </Container>
    </section>
  )
}
