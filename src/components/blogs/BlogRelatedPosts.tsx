'use client'

import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import siteData from '@/website.json'
import { Container } from '@/components/ui'
import BlogCard from './BlogCard'

const { blogs } = siteData

export default function BlogRelatedPosts() {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)

  const label = 'Journal'
  const heading = 'Explore More'
  const script = 'Blogs'

  return (
    <section
      id="related-posts"
      aria-labelledby="related-posts-heading"
      className="bg-background section-space"
    >
      <Container>
        {/* Ã¢â€â‚¬Ã¢â€â‚¬ Header row: eyebrow + heading left, nav arrows right Ã¢â€â‚¬Ã¢â€â‚¬ */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-caption uppercase tracking-wider text-muted-foreground">{label}</p>
            </div>
            <h2 id="related-posts-heading" className="mt-1">
              <span className="block heading-2 text-foreground">{heading}</span>
              <span className="block text-script capitalize leading-normal text-accent mt-2">{script}</span>
            </h2>
          </div>
          <div className="flex flex-shrink-0 items-center gap-card">
            <button
              ref={prevRef}
              type="button"
              aria-label="Previous blog"
              className="swiper-nav-prev flex h-11 w-11 items-center justify-center rounded-full text-foreground border border-border-strong transition-opacity duration-200 hover:opacity-85"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              ref={nextRef}
              type="button"
              aria-label="Next blog"
              className="swiper-nav-next flex h-11 w-11 items-center justify-center rounded-full  text-accent border border-accent transition-opacity duration-200 hover:opacity-85"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          onSwiper={setSwiperInstance}
          onBeforeInit={(swiper) => {
            // @ts-expect-error
            swiper.params.navigation.prevEl = prevRef.current
            // @ts-expect-error
            swiper.params.navigation.nextEl = nextRef.current
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {blogs.items.map((b, i) => (
            <SwiperSlide key={i} className="h-auto">
              <BlogCard card={b} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      <style>{`
      .swiper {
        padding-right: 2px;
      }

      .swiper-wrapper {
        align-items: stretch !important;
      }

      .swiper-slide {
        height: auto !important;
        display: flex !important;
      }

      .swiper-button-disabled {
        opacity: 0.35;
        pointer-events: none;
      }
    `}</style>
    </section>
  )
}

