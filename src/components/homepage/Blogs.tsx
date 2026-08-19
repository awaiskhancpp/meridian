'use client'

import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'
import siteData from '@/website.json'
import { Container, SectionHeading } from '@/components/ui'
import BlogCard from '@/components/blogs/BlogCard'

const { blogs } = siteData

export default function Blogs() {
  const swiperRef = useRef<SwiperType | null>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  function updateEdgeState(swiper: SwiperType) {
    setAtStart(swiper.isBeginning)
    setAtEnd(swiper.isEnd)
  }

  return (
    <section id="blogs" aria-labelledby="blogs-heading" className="bg-background section-padding">
      <Container>
        <SectionHeading
          id="blogs-heading"
          label={blogs.label}
          heading={blogs.heading}
          script={blogs.script}
          subheading={blogs.subheading}
        />

        {/* Relative wrapper allowing overlay controls to anchor to the edges */}
        <div className="relative mt-12">
          {/* Swiper track */}
          <div className="overflow-hidden">
            <Swiper
              onSwiper={(s) => {
                swiperRef.current = s
                updateEdgeState(s)
              }}
              onSlideChange={updateEdgeState}
              onResize={updateEdgeState}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
            >
              {/* Only display the first 3 blog items */}
              {blogs.items.slice(0, 3).map((b, i) => (
                <SwiperSlide key={i} className="h-auto">
                  <BlogCard card={b} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Left Control - Visible only below 'lg' with lower opacity */}
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={atStart}
            aria-label="Previous articles"
            className="absolute left-2 top-56 -translate-y-1/2 z-20 flex lg:hidden h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-surface-muted text-muted-foreground shadow-sm border border-border backdrop-blur-sm transition-all duration-standard enabled:hover:bg-background enabled:hover:text-foreground enabled:hover:scale-105 disabled:opacity-20 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Right Control - Visible only below 'lg' with lower opacity */}
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            disabled={atEnd}
            aria-label="Next articles"
            className="absolute right-2 top-56 -translate-y-1/2 z-20 flex lg:hidden h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-surface-muted text-muted-foreground shadow-sm border border-border backdrop-blur-sm transition-all duration-standard enabled:hover:bg-background enabled:hover:text-foreground enabled:hover:scale-105 disabled:opacity-20 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      </Container>
    </section>
  )
}


