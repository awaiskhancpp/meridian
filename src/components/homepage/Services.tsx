'use client'

import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import siteData from '@/website.json'
import { Container, SectionHeadingInline } from '@/components/ui'
import ServiceImageCard from '@/components/Services/ServiceImageCard'

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
              labelClassName="text-caption uppercase tracking-wider text-muted-foreground"
              headingMt="mt-1"
            />
          </div>

          <div className="flex items-center gap-card pt-1">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={atStart}
              aria-label="Previous services"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              disabled={atEnd}
              aria-label="Next services"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>

        <div className="border-t border-border" />

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
            {services.items.map((service) => {
              return (
                <SwiperSlide key={service.title} className="h-auto">
                  <ServiceImageCard
                    title={service.title}
                    image={service.image}
                    icon={service.icon}
                    href={`${service.href}`}
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </Container>
    </section>
  )
}


