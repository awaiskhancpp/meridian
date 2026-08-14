'use client'

import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import siteData from '@/website.json'
import { Container, SectionHeading } from '@/components/ui'
import BlogCard from '@/components/blogs/BlogCard'

const { blogs } = siteData

export default function AboutBlogs() {
  const swiperRef = useRef<SwiperType | null>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  function updateEdgeState(swiper: SwiperType) {
    setAtStart(swiper.isBeginning)
    setAtEnd(swiper.isEnd)
  }

  return (
    <section id="blogs" aria-labelledby="blogs-heading" className="bg-page section-padding">
      <Container>
        <SectionHeading
          id="blogs-heading"
          label={blogs.label}
          heading={blogs.heading}
          script={blogs.script}
          subheading={blogs.subheading}
        />

        {/* 1 card on sm, 2 on md, 3 on lg+ â€” overflow-hidden on the wrapper
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
                <BlogCard card={b} titleTransform="uppercase" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  )
}
