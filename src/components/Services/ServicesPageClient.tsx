'use client'
import React, { useMemo, useState } from 'react'
import Navbar from '@/components/homepage/Navbar'
import Footer from '@/components/homepage/Footer'
import { PageHero, Container } from '@/components/ui'
import { priceTierFor, type ServiceCardData } from '@/lib/services'
import ServiceImageCard from './ServiceImageCard'

function numericPrice(startingPrice: string): number {
  if (startingPrice.toLowerCase() === 'free') return 0
  const n = Number(startingPrice.replace(/[^0-9.]/g, ''))
  return Number.isFinite(n) ? n : 0
}

export default function ServicesPageClient({
  services,
  heroProps,
}: {
  services: ServiceCardData[]
  heroProps: { label: string; heading: string; script: string; subheading?: string }
}) {
  const [search, setSearch] = useState<Record<string, string>>({})

  const filtered = useMemo(() => {
    let result = services

    if (search.priceRange) {
      result = result.filter((s) => priceTierFor(s.startingPrice) === search.priceRange)
    }

    const titleQuery = search.title?.trim().toLowerCase()
    if (titleQuery) {
      result = result.filter((s) => s.title.toLowerCase().includes(titleQuery))
    }

    const sort = search.sort || 'Popular'
    result = [...result].sort((a, b) => {
      if (sort === 'A–Z') return a.title.localeCompare(b.title)
      if (sort === 'Price: Low to High')
        return numericPrice(a.startingPrice) - numericPrice(b.startingPrice)
      if (sort === 'Price: High to Low')
        return numericPrice(b.startingPrice) - numericPrice(a.startingPrice)
      // "Popular" Ã¢â‚¬â€ badged services first (Most Popular, Free Consultation, etc.), original order otherwise
      return (b.badge ? 1 : 0) - (a.badge ? 1 : 0)
    })

    return result
  }, [services, search])

  return (
    <main className="min-h-screen bg-page">
      <Navbar />

      <PageHero
        label={heroProps.label}
        heading={heroProps.heading}
        script={heroProps.script}
        subheading={heroProps.subheading}
        image="/hero.webp"
      />

      <section aria-label="All services" className="section-padding">
        <Container>
          <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-eyebrow text-dark-muted">
                {heroProps.label}
              </p>
              <h2 className="mt-1 heading-2 text-dark">All Services</h2>
            </div>
            <p className="text-sm text-dark-muted">
              {filtered.length} {filtered.length === 1 ? 'service' : 'services'}
            </p>
          </div>

          {filtered.length === 0 ? (
            <p className="py-16 text-center text-sm text-dark-muted">
              No services match your search. Try clearing a filter.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((service) => (
                <ServiceImageCard
                  key={service.slug}
                  title={service.title}
                  image={service.image}
                  icon={service.icon}
                  href={`/services/${service.slug}`}
                />
              ))}
            </div>
          )}
        </Container>
      </section>

      <Footer />
    </main>
  )
}
