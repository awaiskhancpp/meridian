'use client'

import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import Link from 'next/link'
import Image from 'next/image'
import 'swiper/css'
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
import siteData from '@/website.json'
import { Container, SectionHeadingInline } from '@/components/ui'

const { services } = siteData

/**
 * Hand-drawn SVGs replaced with real lucide-react icons Ã¢â‚¬â€ one per service,
 * looked up by the `icon` key already in website.json rather than a long
 * if/else chain of custom paths.
 *
 * Cards 4/5/6 were rendering blank because their icon keys in website.json
 * ("plus-square", "cabinet") had no matching entry here Ã¢â‚¬â€ ServiceIcon
 * silently returns null for any key it doesn't recognize. Fixed both
 * sides: website.json now uses "house-plus" / "shelving-unit" /
 * "pencil-line", matching the map below exactly.
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
  return (
    <Icon className="h-20 w-20 text-white md:h-24 md:w-24" strokeWidth={1.25} aria-hidden="true" />
  )
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight
  return <Icon className="icon-sm" aria-hidden="true" />
}

export default function Services() {
  const swiperRef = useRef<SwiperType | null>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  function updateEdgeState(swiper: SwiperType) {
    setAtStart(swiper.isBeginning)
    setAtEnd(swiper.isEnd)
  }

  return (
    <section id="services" aria-labelledby="services-heading" className="section-padding">
      <Container>
        <div className="flex items-end justify-between gap-4 pb-6">
          <div>
            <SectionHeadingInline
              id="services-heading"
              label={services.label}
              heading={services.heading}
              script={services.script}
              labelClassName="text-xs uppercase tracking-eyebrow text-dark-muted"
              headingMt="mt-1"
            />
          </div>

          <div className="flex items-center gap-card pt-1">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={atStart}
              aria-label="Previous services"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-subtle text-dark-muted transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              disabled={atEnd}
              aria-label="Next services"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-subtle text-dark transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>

        <div className="border-t border-subtle" />

        <div className="mt-8 overflow-hidden ">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper
              updateEdgeState(swiper)
            }}
            onSlideChange={updateEdgeState}
            onResize={updateEdgeState}
            spaceBetween={4}
            slidesPerView={1}
            wrapperClass="items-stretch"
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 4 },
              1024: { slidesPerView: 3, spaceBetween: 4 },
            }}
          >
            {services.items.map((service, index) => {
              const Icon = service.icon && SERVICE_ICONS[service.icon]
              return (
                <SwiperSlide key={service.title} className="h-auto">
                  <Link
                    key={index}
                    href={`/services/${service.href}`}
                    className="group flex w-full"
                  >
                    <div className="relative ratio-portrait w-full overflow-hidden rounded-none">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-4 bottom-4 bg-dark px-5 pb-5 pt-9 shadow-card-strong transition-colors duration-standard">
                        {Icon && (
                          <div className="absolute -top-7 left-5 flex h-14 w-14 items-center justify-center rounded-full bg-surface">
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
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </Container>
    </section>
  )
}

