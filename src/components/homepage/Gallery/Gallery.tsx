'use client'

import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import siteData from '@/website.json'
const { gallery } = siteData
interface GalleryItem {
  id: string
  image: string
  alt: string
}

// Curated high-end design items reflecting your website's content
const galleryData: GalleryItem[] = [
  {
    id: '1',
    image: '/images/hero', // Replace with your actual public folder paths
    alt: 'Minimalist spa lounge with curved architecture',
  },
  {
    id: '2',
    image: '/images/gallery-bathroom.jpg',
    alt: 'Modern aesthetic bathroom design with premium tiling',
  },
  {
    id: '3',
    image: '/images/gallery-living.jpg',
    alt: 'Luxury architectural living space',
  },
]

export default function Gallery() {
  return (
    <section className="relative w-full py-16 overflow-hidden bg-[#FAFAFA]">
      {/* Elegant Header Section */}
      <div className="mx-auto max-w-3xl text-center">
        <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.34em] text-dark-muted">
          <span className="h-5" aria-hidden="true" />
          {gallery.label}
        </p>
        <h2 id="process-heading" className="mt-4">
          <span className="block text-[clamp(2.4rem,5vw,4.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
            {gallery.heading}
          </span>
          <span className="block font-[family-name:var(--font-allura)] capitalize text-[clamp(2.8rem,5.6vw,4.8rem)] leading-none text-accent">
            {gallery.script}
          </span>
        </h2>
        {/* <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-dark-muted">
            {gallery.subheading}
          </p> */}
      </div>

      {/* Main Carousel Wrapper */}
      <div className="relative w-full px-0 mt-4">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          slidesPerView={1.2}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.4,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 1.6,
              spaceBetween: 32,
            },
            1440: {
              slidesPerView: 1.8,
              spaceBetween: 40,
            },
          }}
          className="w-full !overflow-visible"
        >
          {gallery.items.map((slide, i) => (
            <SwiperSlide key={i} className="w-full">
              {({ isActive }) => (
                <div
                  className={`relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden transition-all duration-500 ease-in-out ${
                    isActive ? 'scale-100 opacity-100 shadow-xl' : 'scale-90 opacity-40 blur-[1px]'
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 80vw, 70vw"
                    priority={isActive}
                    className="object-cover"
                  />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Elements anchored to the edges of the screen */}
        <button
          className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm text-neutral-800 shadow-md transition-all hover:bg-white hover:scale-105 active:scale-95 disabled:opacity-0"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm text-neutral-800 shadow-md transition-all hover:bg-white hover:scale-105 active:scale-95 disabled:opacity-0"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  )
}
