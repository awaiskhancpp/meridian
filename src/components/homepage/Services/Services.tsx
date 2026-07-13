'use client'

import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
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
import { Container } from '@/components/ui'

const { services } = siteData

/**
 * Hand-drawn SVGs replaced with real lucide-react icons — one per service,
 * looked up by the `icon` key already in website.json rather than a long
 * if/else chain of custom paths.
 *
 * Cards 4/5/6 were rendering blank because their icon keys in website.json
 * ("plus-square", "cabinet") had no matching entry here — ServiceIcon
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
  return <Icon className="h-4 w-4" aria-hidden="true" />
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
    <section
      id="services"
      aria-labelledby="services-heading"
      className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <Container>
        <div className="flex items-end justify-between gap-4 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-dark-muted">{services.label}</p>
            <h2 id="services-heading" className="mt-1">
              <span className="block text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
                {services.heading}
              </span>
              <span className="block capitalize font-[family-name:var(--font-allura)] text-[clamp(2.1rem,4vw,3.5rem)] leading-none italic text-accent">
                {services.script}
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={atStart}
              aria-label="Previous services"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              disabled={atEnd}
              aria-label="Next services"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-900 transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>

        <div className="border-t border-neutral-200" />

        <div className="mt-8 overflow-hidden rounded-md">
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
            {services.items.map((service, index) => (
              <SwiperSlide key={service.title} className="h-auto">
                <div className="group flex h-full min-h-[28rem] flex-col bg-dark p-6 md:p-8">
                  <span className="text-sm font-medium text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="flex flex-1 items-center justify-center">
                    <ServiceIcon name={service.icon} />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white md:text-xl">{service.title}</h3>

                    {/* Description is hidden at rest — number, icon, and
                        title only. Revealed smoothly on hover via a
                        max-height + opacity transition (not display:none,
                        which can't be animated, and not height:auto,
                        which also can't be transitioned). max-h-0 → a
                        generous fixed cap gives the browser a real value
                        to interpolate between. */}
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="mt-3 text-sm leading-relaxed text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  )
}
