'use client'

import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import siteData from '@/website.json'
import { Container } from '@/components/ui'

const { testimonials } = siteData

// ─── Star icon ────────────────────────────────────────────────────
function StarIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="#FBBC05"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

// ─── Google "G" icon — full-colour SVG, no icon lib needed ────────
function GoogleIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Google Reviews"
      role="img"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

// ─── Arrow icon ───────────────────────────────────────────────────
function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      {direction === 'left' ? (
        <path d="M19 12H5M11 6l-6 6 6 6" />
      ) : (
        <path d="M5 12h14M13 6l6 6-6 6" />
      )}
    </svg>
  )
}

// ─── Single testimonial card ──────────────────────────────────────
function TestimonialCard({
  stars,
  body,
  author,
  date,
}: {
  stars: number
  body: string
  author: string
  date: string
}) {
  return (
    <div className="flex h-full flex-col rounded-sm border min-h-[282px] md:min-h-[290px] lg:min-h-[313px] border-[rgba(60,37,21,0.07)] bg-cream p-6 shadow-[0_4px_28px_rgba(60,37,21,0.06)] md:p-7">
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-0.5" aria-label={`${stars} out of 5 stars`}>
          {Array.from({ length: stars }).map((_, i) => (
            <StarIcon key={i} />
          ))}
        </div>
        <div
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-[rgba(60,37,21,0.08)] bg-white px-2 py-0.5"
          title="Verified Google Review"
        >
          <GoogleIcon className="h-3.5 w-3.5" />
          <span className="text-[10px] font-medium tracking-wide text-dark-muted">Google</span>
        </div>
      </div>

      {/* flex-1 so all cards in a stretched row end up the same height
          regardless of individual review length — this only actually
          works because the Swiper wrapper below explicitly stretches
          (see wrapperClass="items-stretch") */}
      <p className="mt-5 flex-1 text-sm leading-relaxed text-dark-muted">{body}</p>

      <div className="mt-6 border-t border-[rgba(60,37,21,0.08)] pt-4">
        <p className="text-sm font-semibold text-dark">{author}</p>
        <p className="mt-0.5 text-xs text-dark-muted">{date}</p>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────
export default function Testimonials() {
  const swiperRef = useRef<SwiperType | null>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  function updateEdgeState(swiper: SwiperType) {
    setAtStart(swiper.isBeginning)
    setAtEnd(swiper.isEnd)
  }

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-dark-muted">
              {testimonials.label}
            </p>

            <h2 id="testimonials-heading" className="mt-1">
              <span className="block text-[clamp(2rem,3.4vw,3rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-dark">
                {testimonials.heading}
              </span>
              <span className="block font-[family-name:var(--font-allura)] text-[clamp(2.2rem,3.4vw,3rem)] leading-none italic text-accent">
                {testimonials.script}
              </span>
            </h2>

            <p className="mt-4 max-w-[28rem] text-p text-dark-muted">{testimonials.subheading}</p>
          </div>

          {/* Right: Swiper carousel.
              -mr-8 sm:-mr-10 lg:-mr-12 — the card sits inside TWO layers
              of right padding: the section's own (px-4 → 1rem / sm:px-6
              → 1.5rem / lg:px-8 → 2rem) plus Container's fixed px-4
              (1rem). Combined: 2rem at base, 2.5rem at sm, 3rem at lg —
              exactly what -mr-8, sm:-mr-10, and lg:-mr-12 cancel at each
              breakpoint. Previously this was reset to lg:mr-0, which
              re-introduced the same gap at desktop that had already been
              fixed at base/sm — the bleed needs to apply at every
              breakpoint, not just below lg. */}
          <div className="-mr-8 overflow-hidden sm:-mr-10 lg:-mr-12">
            <Swiper
              onSwiper={(s) => {
                swiperRef.current = s
                updateEdgeState(s)
              }}
              onSlideChange={updateEdgeState}
              onResize={updateEdgeState}
              spaceBetween={16}
              slidesPerView={1.08}
              // Forces align-items: stretch on .swiper-wrapper explicitly,
              // rather than relying on flexbox's unstated default — that's
              // what actually makes every visible slide match the tallest
              // one in view. TestimonialCard's own h-full only has
              // something to fill once this is guaranteed.
              wrapperClass="items-stretch"
              breakpoints={{
                480: { slidesPerView: 1.4, spaceBetween: 16 },
                768: { slidesPerView: 1.8, spaceBetween: 20 },
                1024: { slidesPerView: 1.65, spaceBetween: 20 },
              }}
            >
              {testimonials.items.map((item) => (
                <SwiperSlide key={item.author} className="h-auto">
                  <TestimonialCard
                    stars={item.stars}
                    body={item.body}
                    author={item.author}
                    date={item.date}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(60,37,21,0.1)] pt-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <div className="flex items-center gap-2">
              <GoogleIcon className="h-5 w-5" />
              <span className="text-sm font-semibold text-dark">Google Reviews</span>
            </div>

            <div className="flex gap-0.5" aria-label="4.9 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>

            <span className="text-sm font-semibold text-dark">{testimonials.rating.label}</span>

            <span className="text-sm text-dark-muted">
              {testimonials.rating.score} rating · {testimonials.rating.count} reviews
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={atStart}
              aria-label="Previous testimonials"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(60,37,21,0.2)] text-dark-muted transition-all duration-200 hover:border-[rgba(60,37,21,0.4)] hover:text-dark disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              disabled={atEnd}
              aria-label="Next testimonials"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(60,37,21,0.2)] text-dark transition-all duration-200 hover:border-[rgba(60,37,21,0.4)] disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
