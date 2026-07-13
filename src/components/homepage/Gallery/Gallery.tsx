'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import siteData from '@/website.json'
import { Container } from '@/components/ui'

const { gallery } = siteData

/**
 * Gallery
 *
 * Width pattern (measured off the reference, not eyeballed):
 *   Row 1 columns run roughly 3 : 5 : 4
 *   Row 2 columns run roughly 5 : 4 : 3 — the SAME three widths, just
 *   cyclically shifted left by one column.
 *
 * Since 3 + 5 + 4 = 12, this maps exactly onto a standard 12-column grid
 * using plain `col-span-*` utilities — no `fr` values.
 *
 * Lightbox: clicking any cell opens a full-screen modal for that image,
 * with prev/next navigation across ALL 6 gallery items (not just within
 * a row) and a close (X) button — all lucide-react icons.
 *
 * Responsive reasoning for the modal:
 *   - Close/nav buttons are smaller and pulled closer to the edges on
 *     mobile (h-10, near-edge insets) to leave maximum room for the
 *     image on a small screen; slightly larger and more inset on sm+.
 *   - The image uses `object-contain` (not `object-cover`, unlike the
 *     grid thumbnails) — in a lightbox you want to see the WHOLE photo,
 *     not a cropped fill, regardless of its aspect ratio.
 *   - `max-h-[80vh]` leaves room for the caption below without needing
 *     the image itself to shrink to fit that text on short viewports.
 *   - Keyboard support (Escape / ArrowLeft / ArrowRight) covers desktop;
 *     the on-screen buttons cover touch. Body scroll is locked while
 *     open so the page behind the modal doesn't scroll on mobile.
 *   - Navigation wraps around (last → first, first → last) so there's
 *     never a dead-end button mid-gallery.
 */

type GalleryItem = { image: string; label: string }

function GalleryCell({
  image,
  label,
  spanClass,
  onOpen,
}: {
  image: string
  label: string
  spanClass: string
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${label} image`}
      className={`group relative block h-64 w-full overflow-hidden rounded-sm text-left sm:h-72 lg:h-80 ${spanClass}`}
    >
      <Image
        src={image}
        alt={label}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out lg:group-hover:scale-[1.02]"
      />

      {/* Gradient — confined to the bottom half of the cell */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(60,37,21,0.85)] to-transparent
        opacity-100 transition-opacity duration-500
        lg:opacity-0 lg:group-hover:opacity-100"
      />

      {/* Caption */}
      <div
        className="absolute inset-x-0 bottom-0 p-4 translate-y-0 opacity-100 blur-none transition-all duration-500 sm:p-5
        lg:translate-y-3 lg:opacity-0 lg:blur-sm lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-hover:blur-none"
      >
        <p className="text-sm font-medium text-white sm:text-base">{label}</p>
      </div>
    </button>
  )
}

function GalleryLightbox({
  items,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[]
  activeIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const item = items[activeIndex]

  // Lock background scroll while the modal is open
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [])

  // Keyboard: Escape closes, arrow keys navigate
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrev()
      if (event.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, onPrev, onNext])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.label}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#000]/70 p-3 sm:p-6"
    >
      {/* Close */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        aria-label="Close"
        className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Prev */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        aria-label="Previous image"
        className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6 sm:h-12 sm:w-12"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        aria-label="Next image"
        className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6 sm:h-12 sm:w-12"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
      </button>

      {/* Image — object-contain so the whole photo is visible, unlike the
          cropped object-cover thumbnails in the grid */}
      <div
        className="relative h-full max-h-[90vh] w-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.image}
          alt={item.label}
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
      </div>

      <p className="absolute bottom-3 left-1/2 max-w-[80vw] -translate-x-1/2 text-center text-sm text-white/80 sm:bottom-6">
        {item.label}
      </p>
    </div>
  )
}

export default function Gallery() {
  const items: GalleryItem[] = gallery.items
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const close = useCallback(() => setActiveIndex(null), [])
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length)),
    [items.length],
  )
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % items.length)),
    [items.length],
  )

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <Container>
        <div className="mb-8 flex items-end justify-between gap-6 lg:mb-10">
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.34em] text-dark-muted">
              <span className="h-px w-6 bg-dark-muted" aria-hidden="true" />
              {gallery.label}
            </p>

            <h2 id="gallery-heading" className="mt-2">
              <span className="block text-[clamp(2rem,3.6vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-dark">
                {gallery.heading}
              </span>
              <span className="block font-[family-name:var(--font-allura)] text-[clamp(2.2rem,3.6vw,3.2rem)] leading-none italic text-accent">
                {gallery.script}
              </span>
            </h2>
          </div>
        </div>

        {/* Row 1 — 3 : 5 : 4 (out of 12) on desktop */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          <GalleryCell
            image={items[0].image}
            label={items[0].label}
            spanClass="sm:col-span-1 lg:col-span-3"
            onOpen={() => setActiveIndex(0)}
          />
          <GalleryCell
            image={items[1].image}
            label={items[1].label}
            spanClass="sm:col-span-1 lg:col-span-5"
            onOpen={() => setActiveIndex(1)}
          />
          <GalleryCell
            image={items[2].image}
            label={items[2].label}
            spanClass="sm:col-span-2 lg:col-span-4"
            onOpen={() => setActiveIndex(2)}
          />
        </div>

        {/* Row 2 — 5 : 4 : 3, cyclically shifted from row 1 */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          <GalleryCell
            image={items[3].image}
            label={items[3].label}
            spanClass="sm:col-span-1 lg:col-span-5"
            onOpen={() => setActiveIndex(3)}
          />
          <GalleryCell
            image={items[4].image}
            label={items[4].label}
            spanClass="sm:col-span-1 lg:col-span-4"
            onOpen={() => setActiveIndex(4)}
          />
          <GalleryCell
            image={items[5].image}
            label={items[5].label}
            spanClass="sm:col-span-2 lg:col-span-3"
            onOpen={() => setActiveIndex(5)}
          />
        </div>
      </Container>

      {activeIndex !== null && (
        <GalleryLightbox
          items={items}
          activeIndex={activeIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  )
}
