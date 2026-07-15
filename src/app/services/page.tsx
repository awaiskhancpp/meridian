import React from 'react'
import siteData from '@/website.json'
import ServicesPageClient from './ServicesPageClient'

const { services } = siteData

export const metadata = {
  title: 'Services | Meridian',
  description:
    'Kitchen, bath, and whole-home remodeling services — browse everything we offer, with pricing and typical timelines.',
}

/**
 * Services Page
 *
 * Static, same pattern as the blogs listing page — reads straight from
 * website.json's services.items (8 entries, one card each, so "total
 * cards = total services" is just rendering the full list with no
 * pagination needed) and hands it to ServicesPageClient for the
 * interactive search/filter/sort behavior.
 */
export default function ServicesPage() {
  return (
    <ServicesPageClient
      services={services.items}
      heroProps={{
        label: services.label,
        heading: services.heading,
        script: services.script,
      }}
    />
  )
}
