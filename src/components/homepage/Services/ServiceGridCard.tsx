import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { ServiceCardData } from '@/lib/services'
import {
  ChefHat,
  Bath,
  Home,
  HousePlus,
  ShelvingUnit,
  PencilLine,
  Compass,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  type LucideIcon,
} from 'lucide-react'
/**
 * ServiceGridCard
 *
 * Same card shape as the reference property cards: image with a pill
 * badge in the corner, then a title + price row, then a subtitle line
 * (timeline, standing in for the reference's address line) —
 * structurally identical to BlogGridCard, just services-flavored
 * (price instead of date, timeline instead of author).
 */
const SERVICE_ICONS: Record<string, LucideIcon> = {
  'chef-hat': ChefHat,
  'layout-grid': LayoutGrid,
  bath: Bath,
  home: Home,
  'house-plus': HousePlus,
  'shelving-unit': ShelvingUnit,
  'pencil-line': PencilLine,
  compass: Compass,
  'clipboard-list': ClipboardList,
}
function ServiceIcon({ name }: { name: string }) {
  const Icon = SERVICE_ICONS[name]
  if (!Icon) return null
  return <Icon className="h-4 w-4 text-white md:h-8 md:w-8" strokeWidth={1.25} aria-hidden="true" />
}
export default function ServiceGridCard({ service }: { service: ServiceCardData }) {
  return (
    <Link href={service.href} className="group block h-[28rem]  lg:h-[34rem] bg-white p-4">
      <div className="relative aspect-[4/5] w-full  ">
        <Image
          src={service.image}
          alt={service.title}
          fill
          //   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        {service.icon && (
          <span className="absolute right-3 top-3 rounded-full bg-dark/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
            <ServiceIcon name={service.icon} />
          </span>
        )}
      </div>

      {/* <div className="mt-4 flex items-start justify-between gap-3"> */}
      <h3 className="mt-2 text-[clamp(1rem,2vw,1.5rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-dark">
        {service.title}
      </h3>
      {/* </div> */}

      {/* <p className="mt-1.5 line-clamp-2 text-sm text-dark-muted">{service.description}</p>
      <p className="mt-2 text-xs text-dark-muted/70">Typical timeline: {service.timeline}</p> */}
    </Link>
  )
}
