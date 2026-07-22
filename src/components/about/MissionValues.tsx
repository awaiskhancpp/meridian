import React from 'react'
import { Container } from '@/components/ui'

export default function MissionValues() {
  return (
    <section aria-labelledby="mission-heading" className="py-16  bg-card">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.34em] mb-4 text-muted font-sans">
            Our Philosophy
          </p>
          <h2 id="mission-heading">
            <span className="block uppercase tracking-[-0.05em] text-primary font-sans text-[clamp(2.125rem,3vw,2.75rem)] font-black leading-[1.1]">
              Driven by
            </span>
            <span className="block capitalize mt-1 text-accentLight font-script text-[clamp(2.75rem,4vw,3.5rem)] leading-none">
              Excellence
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ── Mission Card ── */}
          <div className="p-8 lg:p-12 relative overflow-hidden bg-deep rounded-lg shadow-card border border-soft">
            <h3 className="mb-4 text-primary font-sans text-[clamp(1.625rem,2vw,2rem)] font-bold">
              Our Mission
            </h3>
            <p className="text-secondary font-sans text-base lg:text-lg leading-[1.6]">
              To elevate the standard of home remodeling by delivering unparalleled craftsmanship,
              transparent communication, and innovative design. We strive to turn every client's
              vision into a reality that enhances their daily life and adds lasting value to their
              home.
            </p>
          </div>

          {/* ── Vision Card ── */}
          <div className="p-8 lg:p-12 relative overflow-hidden bg-deep rounded-lg shadow-card border border-soft">
            <h3 className="mb-4 text-primary font-sans text-[clamp(1.625rem,2vw,2rem)] font-bold">
              Our Vision
            </h3>
            <p className="text-secondary font-sans text-base lg:text-lg leading-[1.6]">
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
