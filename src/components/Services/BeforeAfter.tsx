import React from 'react'
import { Container } from '@/components/ui'
import { Button } from '@/components/ui'
import BeforeAfterSlider from './BeforeAfterSlider'

interface BeforeAfterItem {
  beforeImage: string
  afterImage: string
  beforeAlt: string
  afterAlt: string
  title?: string
  description?: string
}

interface BeforeAfterProps {
  label?: string
  heading?: string
  script?: string
  subheading?: string
  items?: BeforeAfterItem[]
  ctaLabel?: string
  ctaHref?: string
}

export default function BeforeAfter({
  label = 'Before & After',
  heading = 'Before &',
  script = 'After',
  subheading = 'See the transformation of our projects. From outdated spaces to modern, functional designs.',
  items = [],
  ctaLabel = 'View All Before & After',
  ctaHref = '#gallery',
}: BeforeAfterProps) {
  return (
    <section aria-label="Before and After" className="py-16 ">
      <Container>
        {/* Header — label/heading on the left, "View All" CTA on the
            right, matching the reference layout */}
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.34em] text-dark-muted">
              {/* <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" /> */}
              {label}
            </p>
            <h2 id="before-after-heading" className="mt-1 flex flex-wrap items-end gap-3">
              <span className="text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
                {heading}
              </span>

              <span className="font-[family-name:var(--font-allura)] text-[clamp(2.1rem,4vw,3.5rem)]  leading-none text-accent">
                {script}
              </span>
            </h2>
            {subheading && (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-dark-muted">
                {subheading}
              </p>
            )}
          </div>
        </div>

        {/* Grid of draggable comparison sliders — 2 per row on desktop,
            matching the reference. Each item is ONE interactive widget,
            not two separate before/after images. */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
          {items.map((item, index) => (
            <div key={index}>
              <BeforeAfterSlider
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
                beforeAlt={item.beforeAlt}
                afterAlt={item.afterAlt}
              />

              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-dark">Before</span>
                <span className="text-lg font-bold text-dark">After</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
