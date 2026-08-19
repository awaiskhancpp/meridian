import React from 'react'
import { Container } from '@/components/ui'

export default function MissionValues() {
  return (
    <section aria-labelledby="mission-heading" className="section-padding bg-card">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-caption uppercase tracking-wider mb-4 text-muted-foreground">Our Philosophy</p>
          <h2 id="mission-heading">
            <span className="block heading-2 text-primary-foreground">
              Driven by
            </span>
            <span className="block capitalize mt-1 text-accent font-script text-script leading-normal">
              Excellence
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* â”€â”€ Mission Card â”€â”€ */}
          <div className="card-featured relative overflow-hidden">
            <h3 className="mb-4 text-primary-foreground text-subheading font-bold">
              Our Mission
            </h3>
            <p className="text-secondary-foreground text-body lg:text-body-lg leading-body">
              To elevate the standard of home remodeling by delivering unparalleled craftsmanship,
              transparent communication, and innovative design. We strive to turn every client's
              vision into a reality that enhances their daily life and adds lasting value to their
              home.
            </p>
          </div>

          {/* â”€â”€ Vision Card â”€â”€ */}
          <div className="card-featured relative overflow-hidden">
            <h3 className="mb-4 text-primary-foreground text-subheading font-bold">
              Our Vision
            </h3>
            <p className="text-secondary-foreground text-body lg:text-body-lg leading-body">
              To be the most trusted and sought-after remodeling partner in our community, known for
              our integrity, our creative problem-solving, and the enduring quality of the spaces we
              build.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
