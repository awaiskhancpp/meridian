'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import siteData from '@/website.json'
import { Button, Container } from '@/components/ui'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'

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
    <section id="blogs" aria-labelledby="blogs-heading" className="bg-white py-16  lg:py-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.34em] text-dark-muted">
            {blogs.label}
          </p>
          <h2 id="blogs-heading" className="mt-4 text-dark">
            <span className="block text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em]">
              {blogs.heading}
            </span>
            <span className="block capitalize font-[family-name:var(--font-allura)] text-[clamp(2.1rem,4vw,3.5rem)] leading-none text-accent">
              {blogs.script}
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-p text-dark-muted">{blogs.subheading}</p>
        </div>

        {/* 1 card on sm, 2 on md, 3 on lg+ — overflow-hidden on the wrapper
            (not the Swiper itself) clips the peek of any partial next
            slide cleanly at the container edge. */}
        <div className="mt-12 overflow-hidden">
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
            {blogs.items.map((b, i) => (
              <SwiperSlide key={i} className="h-auto">
                <BlogFeatureCard card={b} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Prev / Next controls — same wired-to-swiperRef pattern used in
            Testimonials.tsx, dimmed + non-interactive at either edge */}
        {/* <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={atStart}
            aria-label="Previous articles"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(60,37,21,0.2)] text-dark-muted transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            disabled={atEnd}
            aria-label="Next articles"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(60,37,21,0.2)] text-dark-muted transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div> */}
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
        <div className="relative overflow-hidden ">
          <div className="relative h-[28rem] overflow-hidden lg:h-[34rem]">
            <Image
              src={card.image}
              alt={card.imageAlt}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(60,37,21,0.08)_0%,rgba(60,37,21,0.18)_100%)]" />

            <div className="absolute inset-0 flex items-center justify-center p-6  opacity-0 pointer-events-none transition-all duration-500 ease-out group-hover:opacity-100">
              <div className="w-full translate-y-4 h-full  border border-white/50 bg-white/90 px-8 py-10 flex flex-col items-center justify-center text-center opacity-0 shadow-[0_18px_48px_rgba(60,37,21,0.08)] backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <h3 className="text-[clamp(1.5rem,2vw,2rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-dark">
                  {card.title}
                </h3>
                <p className="mt-5 text-sm leading-6 text-dark-muted">{card.description}</p>
                <Button variant="outline" className="mt-10 rounded-none">
                  Read More
                </Button>
                {/* <span className="mt-8 inline-flex items-center gap-3 border-b border-dark/30 pb-2 text-sm font-medium uppercase tracking-[0.18em] text-dark transition-colors group-hover:border-accent group-hover:text-accent">
                  Read more
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowUpRight size={20} />
                  </span>
                </span> */}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2">
          <h3 className=" text-[clamp(1.35rem,2vw,1.85rem)] font-bold uppercase leading-[0.95] tracking-[-0.05em] text-dark">
            {card.title}
          </h3>
        </div>
      </a>
    </article>
  )
}
