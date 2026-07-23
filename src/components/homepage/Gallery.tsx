'use client'

import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import { SectionHeading } from '@/components/ui'
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
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative w-full py-10 lg:py-16 overflow-hidden "
    >
      {/* Elegant Header Section */}
      <SectionHeading
        id="gallery-heading"
        label={gallery.label}
        heading={gallery.heading}
        script={gallery.script}
        maxWidth="max-w-3xl"
        labelClassName="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.34em] text-dark-muted"
        eyebrowLeading={<span className="h-5" aria-hidden="true" />}
      />

      {/* Main Carousel Wrapper */}
      <div className="relative w-full px-0 mt-8">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1.2}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2500,
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
          className="w-full !overflow-visible "
        >
          {gallery.items.map((slide, i) => (
            <SwiperSlide key={i} className="w-full ">
              {({ isActive }) => (
                <div
                  className={`relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden transition-all duration-500 ease-in-out ${
                    isActive ? 'scale-100 opacity-100 shadow-xl' : 'scale-90 opacity-100'
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
      </div>
    </section>
  )
}
