import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { ServiceCardData } from '@/lib/services'

/**
 * ServiceGridCard
 *
 * Same card shape as the reference property cards: image with a pill
 * badge in the corner, then a title + price row, then a subtitle line
 * (timeline, standing in for the reference's address line) —
 * structurally identical to BlogGridCard, just services-flavored
 * (price instead of date, timeline instead of author).
 */
export default function ServiceGridCard({ service }: { service: ServiceCardData }) {
  return (
    <Link href={service.href} className="group block">
      <div className="relative aspect-[4/3] w-full overflow-hidden ">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {service.badge && (
          <span className="absolute right-3 top-3 rounded-full bg-dark/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
            {service.badge}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-snug text-dark transition-colors group-hover:text-accent">
          {service.title}
        </h3>
        <span className="shrink-0 whitespace-nowrap text-sm font-semibold text-dark">
          {service.startingPrice === 'Free' ? 'Free' : `From ${service.startingPrice}`}
        </span>
      </div>

      <p className="mt-1.5 line-clamp-2 text-sm text-dark-muted">{service.description}</p>
      <p className="mt-2 text-xs text-dark-muted/70">Typical timeline: {service.timeline}</p>
    </Link>
  )
}
