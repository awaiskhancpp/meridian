import React from 'react'
import siteData from '@/website.json'
import { Container } from '@/components/ui'
import { IFrame } from '@/components/ui/IFrame'
const { map } = siteData

export default function Map() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(map.address)}&output=embed`

  return (
    <section id="map" aria-labelledby="map-heading" className="section-padding section-margin-bottom">
      <Container>
        <div className="mb-8">
          <p className="text-xs uppercase tracking-eyebrow text-dark-muted">{map.label}</p>
          <h2 id="map-heading" className="mt-1">
            <span className="block heading-2 text-dark">{map.heading}</span>
          </h2>
          <p className="mt-3 text-sm text-dark-muted">{map.address}</p>
        </div>
        <IFrame mapSrc={mapSrc} address={map.address} />
      </Container>
    </section>
  )
}
