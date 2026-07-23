'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'
import siteData from '@/website.json'
import { Button, Container, SectionHeading } from '@/components/ui'

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
    <section id="blogs" aria-labelledby="blogs-heading" className="bg-white py-10 lg:py-16">
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
                  <BlogFeatureCard card={b} />
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
            className="absolute left-2 top-[14rem] -translate-y-1/2 z-20 flex lg:hidden h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/50 text-dark/80 shadow-sm border border-subtle backdrop-blur-sm transition-all duration-300 enabled:hover:bg-white enabled:hover:text-dark enabled:hover:scale-105 disabled:opacity-20 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Right Control - Visible only below 'lg' with lower opacity */}
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            disabled={atEnd}
            aria-label="Next articles"
            className="absolute right-2 top-[14rem] -translate-y-1/2 z-20 flex lg:hidden h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/50 text-dark/80 shadow-sm border border-subtle backdrop-blur-sm transition-all duration-300 enabled:hover:bg-white enabled:hover:text-dark enabled:hover:scale-105 disabled:opacity-20 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      </Container>
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

export function BlogFeatureCard({ card }: { card: BlogItem }) {
  return (
    <article className="group h-full">
      <a href={card.href} className="block">
        <div className="relative">
          <div className="relative h-[28rem] overflow-hidden lg:h-[34rem]">
            <Image
              src={card.image}
              alt={card.imageAlt}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-overlay-card" />

            <div className="absolute inset-0 flex items-center justify-center p-6 opacity-0 pointer-events-none transition-all duration-500 ease-out group-hover:opacity-100">
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
