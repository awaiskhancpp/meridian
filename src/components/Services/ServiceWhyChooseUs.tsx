import React from 'react'
import Image from 'next/image'
import { Button, Container } from '@/components/ui'
import { Check } from 'lucide-react'

interface WhyChooseUsData {
  heading: string
  script?: string
  image?: string
  contentHeading: string
  description: string
  missionTitle: string
  missionText: string
  stats: {
    value: string
    label: string
  }[]
  bullets: string[]
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
    <section aria-labelledby="why-choose-us-heading" className="py-10 lg:py-16">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="text-xs uppercase tracking-[0.34em] text-dark-muted">Why Choose Us</p>

          <h2 id="why-choose-us-heading" className="mt-1 text-center">
            <span className="block heading-2 text-dark">{data.heading}</span>

            <span className="mt-2 block heading-script text-accent">{data.script}</span>
          </h2>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start lg:gap-10">
          {/* ── Left: stats ── */}
          <div className="flex h-full flex-col justify-between gap-6 lg:gap-8 order-3 lg:order-1">
            {/* Grouping stats together so they sit at the top */}
            <div className="flex flex-col gap-4">
              {data.bullets.map((bullet, index) => (
                <div key={index} className="rounded-none flex gap-2 items-center">
                  <div className="rounded-full bg-accent ">
                    <Check className="text-white" />
                  </div>
                  <p className="  leading-none text-accent ">{bullet}</p>
                </div>
              ))}
            </div>

            {/* Button is now pushed to the bottom by justify-between */}
            <Button variant="outline" href="/#contact" className="rounded-none">
              Learn More
            </Button>
          </div>

          {/* ── Center: image ── */}
          <div className="relative h-full w-full overflow-hidden rounded-none aspect-[4/3] order-2 lg:order-2">
            {data.image && (
              <Image
                src={data.image}
                alt="Why choose us"
                fill
                className="object-cover"
                // sizes="(max-width: 1024px) 100vw, 33vw"
              />
            )}
          </div>

          {/* ── Right: heading, description, mission ── */}
          <div className="order-1 lg:order-3">
            <h3 className="mt-1 flex flex-wrap items-end gap-3 text-[clamp(1.9rem,3.8vw,3rem)] font-bold uppercase leading-[0.92] tracking-[-0.05em] text-dark">
              {data.contentHeading}
            </h3>

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
