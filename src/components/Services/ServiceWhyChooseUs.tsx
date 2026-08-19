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
    <section aria-labelledby="why-choose-us-heading" className="section-padding lg:mb-16 mb-10">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="text-caption uppercase tracking-wider text-muted-foreground">Why Choose Us</p>

          <h2 id="why-choose-us-heading" className="mt-1 text-center">
            <span className="block heading-2 text-foreground">{data.heading}</span>

            <span className="mt-2 block heading-script text-accent">{data.script}</span>
          </h2>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start lg:gap-10">
          {/* Ã¢â€â‚¬Ã¢â€â‚¬ Left: stats Ã¢â€â‚¬Ã¢â€â‚¬ */}
          <div className="flex h-full flex-col justify-between gap-6 lg:gap-8 order-3 lg:order-1">
            {/* Grouping stats together so they sit at the top */}
            <div className="flex flex-col gap-4">
              {data.bullets.map((bullet, index) => (
                <div key={index} className="flex items-center gap-card">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent">
                    <Check className="text-primary-foreground" size={16} strokeWidth={3} />
                  </div>
                  <p className="text-accent">{bullet}</p>
                </div>
              ))}
            </div>

            {/* Button is now pushed to the bottom by justify-between */}
            <Button variant="outline" href="/#contact" className="rounded-none">
              Learn More
            </Button>
          </div>

          {/* Ã¢â€â‚¬Ã¢â€â‚¬ Center: image Ã¢â€â‚¬Ã¢â€â‚¬ */}
          <div className="relative h-full w-full overflow-hidden rounded-none aspect-landscape order-2 lg:order-2">
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

          {/* Ã¢â€â‚¬Ã¢â€â‚¬ Right: heading, description, mission Ã¢â€â‚¬Ã¢â€â‚¬ */}
          <div className="order-1 lg:order-3">
            <h3 className="mt-1 flex flex-wrap items-end gap-3 text-subheading font-bold uppercase leading-tight tracking-tight text-foreground">
              {data.contentHeading}
            </h3>

            <p className="mt-6 text-body leading-relaxed text-muted-foreground lg:text-body-lg">
              {data.description}
            </p>

            <div className="mt-10 rounded-none ">
              <h3 className="text-body-sm font-bold uppercase tracking-wider text-accent">
                {data.missionTitle}
              </h3>
              <p className="mt-3 text-body-sm leading-relaxed text-muted-foreground lg:text-body">
                {data.missionText}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}



