'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpRight,
  ChefHat,
  Bath,
  Home,
  HousePlus,
  ShelvingUnit,
  PencilLine,
  LayoutGrid,
  ClipboardList,
  type LucideIcon,
} from 'lucide-react'

import { Button, Container } from '@/components/ui'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

const SERVICE_ICONS: Record<string, LucideIcon> = {
  'chef-hat': ChefHat,
  bath: Bath,
  home: Home,
  'house-plus': HousePlus,
  'shelving-unit': ShelvingUnit,
  'pencil-line': PencilLine,
  'layout-grid': LayoutGrid,
  'clipboard-list': ClipboardList,
}

interface ServiceCard {
  title: string
  description: string
  image: string
  slug: string
  icon: string
}

interface ExploreOtherServicesProps {
  currentSlug: string
  services: ServiceCard[]
}

export default function ExploreOtherServices({ currentSlug, services }: ExploreOtherServicesProps) {
  const otherServices = services.filter((service) => service.slug !== currentSlug)

  if (otherServices.length === 0) return null
  const label = 'What We Offer'
  const heading = 'Explore Other'
  const script = 'Services'
  return (
    <section aria-label="Explore Other Services" className="py-16 lg:py-24">
      <Container>
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.34em] text-dark-muted">{label}</p>
          <h2 id="services-heading" className="mt-1">
            <span className="block text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
              {heading}
            </span>
            <span className="block capitalize font-[family-name:var(--font-allura)] text-[clamp(2.1rem,4vw,3.5rem)] leading-none italic text-accent">
              {script}
            </span>
          </h2>
        </div>

        <Swiper
          modules={[Pagination]}
          spaceBetween={24}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {otherServices.map((service) => (
            <SwiperSlide key={service.slug}>
              <Link href={`/services/${service.slug}`} className="group flex w-full">
                <div className="relative flex w-full flex-col border border-[rgba(60,37,21,0.12)] bg-white transition-all duration-300 hover:border-accent hover:shadow-lg">
                  <div className="relative aspect-[4/3]">
                    <div className="absolute inset-0 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Icon positioned half on image, half on content */}
                    {service.icon && SERVICE_ICONS[service.icon] && (
                      <div className="absolute bottom-0 left-6 translate-y-1/2 flex h-16 w-16 items-center justify-center bg-white shadow-lg z-10">
                        {React.createElement(SERVICE_ICONS[service.icon], {
                          className: 'h-8 w-8 text-accent',
                          strokeWidth: 1.5,
                        })}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6 pt-12">
                    <h3 className="text-xl font-bold uppercase tracking-wide text-dark transition-colors group-hover:text-accent">
                      {service.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-dark-muted">
                      {service.description}
                    </p>

                    <div className="mt-auto pt-6">
                      <Button
                        variant="outline"
                        className="rounded-none transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:border-accent"
                      >
                        <span>Learn More</span>
                        {/* <ArrowUpRight size={16} /> */}
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      {/* 
        The CSS below forces Swiper to behave like a standard stretching flex container.
        This prevents Swiper's internal scripts from making the cards uneven.
      */}
      <style>{`
      .swiper {
        padding-bottom: 56px;
        padding-right:2px;
      }

      /* Force the wrapper to stretch its children equally */
      .swiper-wrapper {
        align-items: stretch !important;
      }

      /* Override Swiper's default height:100% and allow flex properties to work */
      .swiper-slide {
        height: auto !important;
        display: flex !important;
      }

      .swiper-pagination-bullet {
        width: 10px;
        height: 10px;
        background: rgba(60, 37, 21, 0.3);
        opacity: 1;
        transition: all 0.3s ease;
      }

      .swiper-pagination-bullet-active {
        width: 28px;
        border-radius: 999px;
        background: var(--color-accent);
      }
    `}</style>
    </section>
  )
}
