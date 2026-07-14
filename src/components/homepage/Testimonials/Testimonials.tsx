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
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
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
            <span className="block capitalize font-[family-name:var(--font-allura)] text-[clamp(2.1rem,4vw,3.5rem)] leading-none italic text-accent">
              {testimonials.script}
            </span>
          </h2>

          <p className="mt-5 text-p text-dark-muted max-w-xl mx-auto">{testimonials.subheading}</p>
        </div>

        {/* Testimonial card with nav buttons on sides */}
        <div className="mt-14 flex items-center gap-4 lg:gap-8">
          {/* Left nav */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="shrink-0 flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(60,37,21,0.2)] text-dark transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>

          {/* Testimonial content */}
          <div
            className={`flex-1 max-w-6xl mx-auto transition-all duration-300 ease-out ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}
          >
            <Quote
              className="h-10 w-10 text-accent mx-auto"
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
            className="shrink-0 flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(60,37,21,0.2)] text-dark transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </Container>
    </section>
  )
}
