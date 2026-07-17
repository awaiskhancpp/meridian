import React from 'react'
import { Container } from '@/components/ui'

interface WhyChooseUsData {
  heading: string
  script?: string
  description: string
  missionTitle: string
  missionText: string
  stats: {
    value: string
    label: string
  }[]
}

interface ServiceWhyChooseUsProps {
  data: WhyChooseUsData
}

/**
 * ServiceWhyChooseUs
 *
 * Displays why-choose-us content for a specific service, including
 * a heading, description, mission statement, and stats. Uses the
 * consistent heading pattern with label, heading, and script.
 *
 * Responsive: Single column on mobile, two-column layout on larger
 * screens with content on the left and stats on the right.
 */
export default function ServiceWhyChooseUs({ data }: ServiceWhyChooseUsProps) {
  return (
    <section aria-labelledby="why-choose-us-heading" className="py-16 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start lg:gap-16">
          <div className="flex flex-col gap-6 lg:gap-8">
            {data.stats.map((stat, index) => (
              <div key={index} className="rounded-none   p-6 lg:p-8">
                <p className="text-4xl font-black leading-none text-accent lg:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-semibold text-dark lg:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-dark-muted">Why Choose Us</p>

            <h2 id="why-choose-us-heading" className="mt-1 flex flex-wrap items-end gap-3">
              <span className="text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
                {data.heading}
              </span>

              <span className="font-[family-name:var(--font-allura)] text-[clamp(2.1rem,4vw,3.5rem)] italic leading-none text-accent">
                {data.script}
              </span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-dark-muted lg:text-lg">
              {data.description}
            </p>

            <div className="mt-10 rounded-none ">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                {data.missionTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-dark-muted lg:text-base">
                {data.missionText}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
