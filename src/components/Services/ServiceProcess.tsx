import React from 'react'
import Image from 'next/image'
import { Phone } from 'lucide-react'
import siteData from '@/website.json'
import { Container } from '@/components/ui'
import type { ProcessStep } from '@/lib/services'

const { sitePhone } = siteData

interface ServiceProcessProps {
  label?: string
  heading?: string
  script?: string
  image: string
  steps: ProcessStep[]
}

/**
 * ServiceProcess
 *
 * Matches the reference layout: heading + phone CTA + photo on the
 * left, a vertical stack of numbered step cards on the right — but
 * every service passes its OWN `steps`, not a shared global process.
 * A physical remodel (Kitchen, Flooring) has a demolition/installation
 * step; a consultation service (Design Consultation, Project Planning)
 * has a "handoff" step instead, since there's no physical work to
 * install. See website.json's per-service `process.steps`.
 *
 * rounded-none throughout (photo, phone button, step cards) — matches
 * the "no rounded corners" convention already established across every
 * other component in this Services folder (see TrustSection.tsx's own
 * comments), not the reference's slightly-rounded cards.
 *
 * Responsive: single column below lg — heading/phone/photo first, then
 * the step stack below, matching natural reading order. At lg+, the two
 * columns sit side by side like the reference, with the left column
 * narrower (lg:grid-cols-[0.85fr_1.15fr]) so the step cards get more
 * room to breathe than the reference's roughly-even split, since each
 * step's description here runs a full sentence or two rather than the
 * reference's shorter copy.
 */
export default function ServiceProcess({
  label = 'Our Process',
  heading = 'Our Simple',
  script = 'Process',
  image,
  steps,
}: ServiceProcessProps) {
  return (
    <section aria-labelledby="process-heading" className="py-16">
      <Container>
        <div>
          <p className="text-xs uppercase tracking-[0.34em] text-dark-muted">{label}</p>
          <h2 id="process-heading" className="mt-1 flex flex-wrap items-end gap-3">
            <span className="text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
              {heading}
            </span>

            <span className="font-[family-name:var(--font-allura)] text-[clamp(2.1rem,4vw,3.5rem)] leading-none text-accent">
              {script}
            </span>
          </h2>

          {/* <a
            href={sitePhone.href}
            className="mt-4 inline-flex items-center gap-2 rounded-none border border-dark bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            <Phone size={16} strokeWidth={2} aria-hidden="true" />
            {sitePhone.display}
          </a> */}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-stretch ">
          {/* ── Left: heading + phone CTA + photo ── */}
          <div>
            <div className="relative h-full min-h-[400px] overflow-hidden rounded-none">
              <Image
                src={image}
                alt="Project in progress"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>

          {/* ── Right: numbered step stack ── */}
          <div className="flex flex-col gap-4">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="flex items-start justify-between gap-6 rounded-none border border-muted bg-white p-6 shadow-sm"
              >
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-dark sm:text-lg">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-dark-muted">{step.description}</p>
                </div>

                <span
                  className="shrink-0 text-3xl font-black leading-none text-dark sm:text-4xl"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
