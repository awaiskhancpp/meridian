import React from 'react'
import { Container, SectionHeading } from '@/components/ui'
import { Hammer, Handshake, HardHat, Target } from 'lucide-react'

export default function CoreValues() {
  const values = [
    {
      title: 'Excellence in Execution',
      description:
        'We uphold the highest standards in craftsmanship, planning, and delivery — ensuring every project is completed with precision, durability, and pride.',
      icon: <Hammer />,
    },
    {
      title: 'Safety First, Always',
      description:
        'Safety is non-negotiable. From daily site checks to OSHA-compliant protocols, we protect every worker, client, and community we serve.',
      icon: <HardHat />,
    },
    {
      title: 'Integrity & Transparency',
      description:
        'No hidden costs, no broken promises. We believe in honest communication, clear contracts, and doing the right thing — even when no one is watching.',
      icon: <Handshake />,
    },
    {
      title: 'Sustainable Progress',
      description:
        'We build for the future — using eco-conscious materials, efficient methods, and long-term thinking to reduce impact and increase value.',
      icon: <Target />,
    },
  ]

  return (
    <section aria-labelledby="values-heading" className="section-padding">
      <Container>
        <div className="mb-16 lg:mb-20">
          <SectionHeading
            id="values-heading"
            label="Our Values"
            heading="Core Values That Guide"
            script="Every Project & Partnership"
          />
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {values.map((value, index) => (
            <div
              key={index}
              className="card flex flex-col"
            >
              {/* Sharp, square icon container matching your hard edges */}
              <div className="w-14 h-14 rounded-none bg-primary text-primary-foreground flex items-center justify-center mb-8 shrink-0">
                {value.icon}
              </div>

              <h3 className="heading-3 mb-4 text-foreground">
                {value.title}
              </h3>

              <p className="text-body-sm leading-relaxed text-muted-foreground flex-grow">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
