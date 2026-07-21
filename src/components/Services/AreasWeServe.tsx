import React from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui'
import { IFrame } from '@/components/ui'
import { MapPin } from 'lucide-react'

interface Area {
  title: string
  description: string
  image: string
  imageAlt: string
}

interface AreasWeServeProps {
  label?: string
  heading?: string
  script?: string
  subheading?: string
  areas?: Area[]
  mapSrc?: string
}

/**
 * AreasWeServe
 *
 * A section displaying service areas with locations list and map.
 * Designed for service detail pages to show geographic coverage.
 *
 * Key design decisions:
 * - No rounded corners (as requested)
 * - Split layout: areas list on left, map on right
 * - Responsive: stacks on mobile, side-by-side on desktop
 * - Uses existing theme colors and typography
 * - Data fetched from website.json
 * - Uses IFrame component for map
 */
export default function AreasWeServe({
  label = 'Service Areas',
  heading = 'Areas We',
  script = 'Serve',
  subheading = 'We provide professional remodeling services across multiple communities. Find your area below.',
  areas = [],
  mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d215846.8394237353!2d-122.43563249999999!3d47.7567685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490528c7f9c2c39%3A0x1234567890abcdef!2sSeattle%2C%20WA!5e0!3m2!1sen!2sus!4v1234567890',
}: AreasWeServeProps) {
  return (
    <section aria-label="Service Areas" className="py-16 ">
      <Container>
        {/* Header */}
        <div className="max-w-2xl mx-auto flex flex-col justify-center items-center">
          <p className="text-xs uppercase tracking-[0.34em] text-dark-muted">{label}</p>
          <h2 id="services-heading" className="mt-1 text-center">
            <span className="block text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
              {heading}
            </span>
            <span className="block capitalize font-[family-name:var(--font-allura)] text-[clamp(2.1rem,4vw,3.5rem)] leading-none text-accent">
              {script}
            </span>
          </h2>
        </div>
        {/* <div className="mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.34em] text-dark-muted">{label}</p>
          <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em] text-dark lg:text-[3.5rem]">
            {heading}{' '}
            <span className="font-[family-name:var(--font-allura)] capitalize text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[0.82] text-accent">
              {script}
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-dark-muted lg:text-lg">
            {subheading}
          </p>
        </div> */}

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-8  mt-6">
          {/* Areas List */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {areas.map((area, index) => (
                <span
                  key={index}
                  className="flex flex-col justify-center items-center gap-1  text-accent px-3 py-2"
                >
                  <MapPin />
                  <h3 className="text-lg font-bold uppercase tracking-wide ">{area.title}</h3>
                </span>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="">
            <IFrame mapSrc={mapSrc} />
          </div>
        </div>
      </Container>
    </section>
  )
}
