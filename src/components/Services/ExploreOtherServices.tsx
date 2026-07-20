'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
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

import { Container } from '@/components/ui'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'

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

/**
 * ExploreOtherServices
 *
 * Redesigned to match the reference layout: prev/next circular arrow
 * buttons (dark + accent, two-tone) replacing the dot pagination, and a
 * minimal card — photo, a circular icon badge straddling the photo/card
 * boundary, and a small floating white title strip — replacing the
 * previous full panel (description + "Learn More" button). Heading text
 * ("Explore Other" / "Services") is unchanged from before, per request;
 * only the layout changed.
 *
 * Nav buttons over dots, specifically: this section only ever needs to
 * move one card at a time and there's no benefit to showing "which slide
 * am I on" the way dots do for a hero carousel — the reference's arrow
 * pair is a more compact, more scannable control for a "browse sideways"
 * interaction, and matches what's actually in the reference image.
 *
 * Responsive reasoning:
 * - Breakpoints (1 / 2 / 3 slidesPerView at 0 / 640 / 1024) are
 *   unchanged — they already correctly matched the reference's 3-up
 *   desktop layout, so there was nothing to fix there.
 * - The arrow buttons are the ONLY way to navigate now (no dots
 *   fallback), so they're sized as a real touch target (44px) at every
 *   breakpoint rather than shrinking on mobile — usability of the
 *   primary control matters more than "mobile = smaller" here.
 * - Card aspect ratio (4/5, taller than the previous 4/3) holds at every
 *   breakpoint too: at 1-up on mobile a portrait card reads as a single
 *   strong photo rather than a wide letterboxed strip, and at 3-up
 *   desktop it matches the reference's proportions.
 */
export default function ExploreOtherServices({ currentSlug, services }: ExploreOtherServicesProps) {
  const otherServices = services.filter((service) => service.slug !== currentSlug)

  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)

  if (otherServices.length === 0) return null
  const label = 'What We Offer'
  const heading = 'Explore Other'
  const script = 'Services'

  return (
    <section aria-label="Explore Other Services" className="py-16 lg:py-24">
      <Container>
        {/* ── Header row: eyebrow + heading left, nav arrows right ── */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs uppercase tracking-[0.34em] text-dark-muted">{label}</p>
            </div>
            <h2 id="services-heading" className="mt-1">
              <span className="block text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
                {heading}
              </span>
              <span className="block capitalize font-[family-name:var(--font-allura)] text-[clamp(2.1rem,4vw,3.5rem)] leading-none italic text-accent">
                {script}
              </span>
            </h2>
          </div>

          {/*
            Two-tone prev/next pair, matching the reference's dark +
            accent colour split. h-11 w-11 (44px) is a real touch target
            at every breakpoint — these buttons are the only way to move
            the carousel now, so they don't get smaller on mobile.
            disabled: styling comes from Swiper's own
            swiper-button-disabled class, applied via the .swiper-nav
            selectors in the <style> block below.
          */}
          <div className="flex flex-shrink-0 items-center gap-3">
            <button
              ref={prevRef}
              type="button"
              aria-label="Previous service"
              className="swiper-nav-prev flex h-11 w-11 items-center justify-center rounded-full bg-dark text-white transition-opacity duration-200 hover:opacity-85"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              ref={nextRef}
              type="button"
              aria-label="Next service"
              className="swiper-nav-next flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white transition-opacity duration-200 hover:opacity-85"
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
          {otherServices.map((service) => {
            const Icon = service.icon && SERVICE_ICONS[service.icon]
            return (
              <SwiperSlide key={service.slug}>
                <Link href={`/services/${service.slug}`} className="group flex w-full">
                  {/*
                    Whole card is now just the photo — rounded-2xl on
                    THIS outer wrapper (not a separate content panel
                    below it), since the title card floats ON TOP of the
                    photo rather than sitting in its own space beneath it.
                  */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-none">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/*
                      Icon badge — circular now (was a square h-16 w-16),
                      positioned to straddle the photo/card boundary: its
                      own bottom half overlaps the white title card below
                      it via a negative margin trick — see the badge's
                      bottom offset (76px) lining up with roughly the
                      midpoint of the title card's own height.
                    */}

                    {/*
                      Floating title card — the reference shows a compact
                      white rounded rectangle inset from the photo's own
                      edges (not flush), containing only the title. No
                      description, no button: the whole card is already
                      the click target via the outer <Link>, so a
                      "Learn More" button was redundant with the card's
                      own affordance, and the reference itself doesn't
                      show one.
                    */}
                    <div className="absolute inset-x-4 bottom-4 z-[5] rounded-none bg-white px-5 py-5 shadow-card-strong transition-colors duration-300 group-hover:bg-accent">
                      {Icon && (
                        <div className="absolute bottom-[42px] left-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent ">
                          <Icon
                            className="h-6 w-6 text-white"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                        </div>
                      )}
                      <h3 className="text-base font-bold uppercase leading-snug tracking-wide text-dark transition-colors duration-300 group-hover:text-white sm:text-lg">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            )
          })}
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
