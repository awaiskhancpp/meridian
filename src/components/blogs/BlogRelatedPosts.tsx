'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import siteData from '@/website.json'
import { Button, Container } from '@/components/ui'

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
      className="bg-white py-16  lg:py-24"
    >
      <Container>
        {/* ── Header row: eyebrow + heading left, nav arrows right ── */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs uppercase tracking-[0.34em] text-dark-muted">{label}</p>
            </div>
            <h2 id="related-posts-heading" className="mt-1">
              <span className="block heading-2 text-dark">{heading}</span>
              <span className="block heading-script capitalize text-accent">{script}</span>
            </h2>
          </div>

          {/*
            Two-tone prev/next pair, matching the reference's dark +
            accent colour split. h-11 w-11 (44px) is a real touch target
            at every breakpoint — these buttons are the only way to move
            the carousel now, so they don't get smaller on mobile.
          */}
          <div className="flex flex-shrink-0 items-center gap-3">
            <button
              ref={prevRef}
              type="button"
              aria-label="Previous blog"
              className="swiper-nav-prev flex h-11 w-11 items-center justify-center rounded-full text-dark border border-dark transition-opacity duration-200 hover:opacity-85"
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
            // @ts-expect-error — Swiper's own types want these set before init
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
              <BlogFeatureCard card={b} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      {/*
        swiper-nav-prev / swiper-nav-next get Swiper's disabled state
        applied via swiper-button-disabled — Swiper adds/removes that
        class on the elements passed as prevEl/nextEl automatically, so
        no extra JS state is needed here to grey out an arrow at either
        end of the list.
      */}
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

type BlogItem = {
  title: string
  description: string
  image: string
  imageAlt: string
  href: string
}

function BlogFeatureCard({ card }: { card: BlogItem }) {
  return (
    <article className="group h-full">
      <a href={card.href} className="block">
        <div className="relative ">
          <div className="relative h-[28rem] overflow-hidden lg:h-[34rem]">
            <Image
              src={card.image}
              alt={card.imageAlt}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-overlay-card" />

            <div className="absolute inset-0 flex items-center justify-center p-6  opacity-0 pointer-events-none transition-all duration-500 ease-out group-hover:opacity-100">
              <div className="w-full translate-y-4 h-full border border-light-strong bg-white-overlay px-8 py-10 flex flex-col items-center justify-center text-center opacity-0 shadow-soft backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <h3 className="text-[clamp(1.5rem,2vw,2rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-dark">
                  {card.title}
                </h3>
                <p className="mt-5 text-sm leading-6 text-dark-muted">{card.description}</p>
                <Button variant="outline" className="mt-10 rounded-none">
                  Read More
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2">
          <h3 className="heading-card text-dark">{card.title}</h3>
        </div>
      </a>
    </article>
  )
}
