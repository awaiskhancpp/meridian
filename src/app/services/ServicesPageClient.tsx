'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import Navbar from '@/components/homepage/Navbar'
import Footer from '@/components/homepage/Footer'
import ServiceGridCard from '@/components/homepage/ServiceGridCard'
import { PageHero, HeroSearchBar, Container } from '@/components/ui'
import type { SearchField } from '@/components/ui'
import { PRICE_TIERS, priceTierFor, type ServiceCardData } from '@/lib/services'
import {
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChefHat,
  Bath,
  Home,
  HousePlus,
  ShelvingUnit,
  PencilLine,
  LayoutGrid,
  ClipboardList,
  type LucideIcon,
} from 'lucide-react'

/**
 * ServicesPageClient
 *
 * Same field-order convention as the blogs page: Price Range and Sort
 * sit on the left, Title sits last, right next to the Search button
 * (the "search side").
 */
const SERVICE_ICONS: Record<string, LucideIcon> = {
  'chef-hat': ChefHat,
  bath: Bath,
  home: Home,
  'house-plus': HousePlus,
  'shelving-unit': ShelvingUnit,
  'pencil-line': PencilLine,
  'layout-grid': LayoutGrid,
  'clipboard-list': ClipboardList,
}

const SEARCH_FIELDS: SearchField[] = [
  {
    type: 'select',
    name: 'priceRange',
    label: 'Price Range',
    placeholder: 'Any Price',
    options: [...PRICE_TIERS],
  },
  {
    type: 'select',
    name: 'sort',
    label: 'Sort',
    options: ['Popular', 'Price: Low to High', 'Price: High to Low', 'A–Z'],
    placeholder: 'Popular',
  },
  { type: 'text', name: 'title', label: 'Service', placeholder: 'Search services…' },
]

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
      // "Popular" — badged services first (Most Popular, Free Consultation, etc.), original order otherwise
      return (b.badge ? 1 : 0) - (a.badge ? 1 : 0)
    })

    return result
  }, [services, search])

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        label={heroProps.label}
        heading={heroProps.heading}
        script={heroProps.script}
        subheading={heroProps.subheading}
        image="/hero.webp"
        // formSlot={<HeroSearchBar fields={SEARCH_FIELDS} onSearch={setSearch} />}
      />

      <section aria-label="All services" className="py-16 lg:py-20">
        <Container>
          <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.34em] text-dark-muted">
                {heroProps.label}
              </p>
              <h2 className="mt-2 text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
                All Services
              </h2>
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
              {filtered.map((service, i) => {
                const Icon = service.icon && SERVICE_ICONS[service.icon]
                return (
                  <Link key={i} href={`/services/${service.slug}`} className="group flex w-full">
                    {/*
                    Whole card is now just the photo — rounded-2xl on
                    THIS outer wrapper (not a separate content panel
                    below it), since the title card floats ON TOP of the
                    photo rather than sitting in its own space beneath it.
                  */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-none">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-4 bottom-4 bg-dark px-5 pb-5 pt-9 shadow-card-strong transition-colors duration-300">
                        {Icon && (
                          <div className="absolute -top-7 left-5 flex h-14 w-14 items-center justify-center rounded-full bg-white">
                            <Icon
                              className="h-7 w-7 text-accent"
                              strokeWidth={1.5}
                              aria-hidden="true"
                            />
                          </div>
                        )}
                        <h3 className="text-base font-bold uppercase leading-snug tracking-wide text-white sm:text-lg">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </Container>
      </section>

      <Footer />
    </main>
  )
}
