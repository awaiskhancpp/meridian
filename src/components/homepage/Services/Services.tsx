import React from 'react'
import siteData from '@/website.json'
import { Container } from '@/components/ui'

const { services } = siteData

function ServiceIcon({ name }: { name: string }) {
  const cls = 'h-14 w-14 md:h-16 md:w-16 text-dark'

  if (name === 'faucet') {
    // Kitchen faucet — matches "Kitchen Remodeling"
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cls}
        aria-hidden="true"
      >
        <path d="M5 12V8a4 4 0 0 1 4-4h2" />
        <path d="M11 4v6" />
        <path d="M11 10h6a2 2 0 0 1 2 2v1" />
        <path d="M19 13v3" />
        <path d="M6 15h10" />
        <path d="M7 15v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2" />
      </svg>
    )
  }

  if (name === 'bath') {
    // Bathtub — matches "Bathroom Remodeling"
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cls}
        aria-hidden="true"
      >
        <path d="M4 12V6a2 2 0 0 1 2-2 2 2 0 0 1 2 2v6" />
        <path d="M3 12h18" />
        <path d="M4 12v3a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-3" />
        <path d="M7 19v2" />
        <path d="M17 19v2" />
      </svg>
    )
  }

  if (name === 'home') {
    // House with an addition — matches "Whole-Home Remodeling"
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cls}
        aria-hidden="true"
      >
        <path d="M4 11l7-6 7 6" />
        <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
        <path d="M10 20v-5h4v5" />
        <path d="M17 8V5h2v2" />
      </svg>
    )
  }

  return null
}

// Decorative only — not wired to a working carousel, since all three
// services already render at once on every breakpoint. Rendered as
// non-interactive so they don't imply functionality that isn't there.
function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      {direction === 'left' ? (
        <path d="M19 12H5M11 6l-6 6 6 6" />
      ) : (
        <path d="M5 12h14M13 6l6 6-6 6" />
      )}
    </svg>
  )
}

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className=" px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <Container>
        {/* Header row — label + a real h2 (heading/script), same two-part
            pattern as About and WhyChooseUs, just missing before */}
        <div className="flex items-end justify-between gap-4 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-dark-muted">{services.label}</p>
            <h2 id="services-heading" className="mt-1">
              <span className="block text-[clamp(2.2rem,4.8vw,4rem)] font-black uppercase leading-[0.94] tracking-[-0.04em] text-dark">
                {services.heading}
              </span>
              <span className="block font-[family-name:var(--font-allura)] text-[clamp(2.4rem,4.8vw,4rem)] leading-none italic text-accent">
                {services.script}
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 pt-1" aria-hidden="true">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-500">
              <ArrowIcon direction="left" />
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-900">
              <ArrowIcon direction="right" />
            </span>
          </div>
        </div>

        <div className="border-t border-neutral-200" />

        <div className="mt-8 grid grid-cols-1 gap-1 overflow-hidden rounded-md sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((service, index) => (
            <div key={service.title} className="flex min-h-[22rem] flex-col bg-bg-cream p-6 md:p-8">
              <span className="text-sm font-medium text-dark-muted">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="flex flex-1 items-center justify-center">
                <ServiceIcon name={service.icon} />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-dark md:text-xl">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-dark-muted">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
