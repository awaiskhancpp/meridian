import React from 'react'
import siteData from '@/website.json'
import { Container } from '@/components/ui'
import { IFrame } from '@/components/ui/IFrame'
const { map } = siteData

/**
 * Map
 *
 * Google Maps embed via the plain `output=embed` query format — this
 * works with just an address, no API key required, unlike the
 * `maps/embed/v1/...` endpoint which needs one. Good enough for a
 * "here's where we are" section; swap to the API-key'd embed endpoint
 * later if this ever needs custom pins/styling.
 */
export default function Map() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(map.address)}&output=embed`

  return (
    <section id="map" aria-labelledby="map-heading" className="py-16 lg:py-24">
      <Container>
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.34em] text-dark-muted">{map.label}</p>
          <h2 id="map-heading" className="mt-1">
            <span className="block text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
              {map.heading}
            </span>
          </h2>
          <p className="mt-3 text-sm text-dark-muted">{map.address}</p>
        </div>
        <IFrame mapSrc={mapSrc} address={map.address} />
        {/* <div className="h-[24rem] w-full overflow-hidden  border border-[rgba(60,37,21,0.1)] lg:h-[30rem]">
          <iframe
            title={`${map.address} on Google Maps`}
            src={mapSrc}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div> */}
      </Container>
    </section>
  )
}
