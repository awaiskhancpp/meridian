'use client'

import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Category {
  value: string
  label: string
}

interface CategoryFilterPillsProps {
  categories: Category[]
  active: string | null
  onChange: (value: string | null) => void
}

export default function CategoryFilterPills({
  categories,
  active,
  onChange,
}: CategoryFilterPillsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = 200
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  const allCategories = [{ value: 'all', label: 'All' }, ...categories]

  return (
    <div className="relative">
      {/* Fade indicators for scroll hint */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-white to-transparent sm:hidden" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-white to-transparent sm:hidden" />

      {/* Scroll buttons (mobile only) */}
      <button
        type="button"
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 z-20 -translate-y-1/2 sm:hidden flex h-8 w-8 items-center justify-center border border-strong bg-white text-dark-muted hover:text-accent transition-colors"
        aria-label="Scroll categories left"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 z-20 -translate-y-1/2 sm:hidden flex h-8 w-8 items-center justify-center border border-strong bg-white text-dark-muted hover:text-accent transition-colors"
        aria-label="Scroll categories right"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Pills container */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide py-1 px-8 sm:px-0 sm:flex-wrap sm:overflow-visible"
        role="tablist"
        aria-label="Filter projects by category"
      >
        {allCategories.map((cat) => {
          const isActive = active === cat.value || (cat.value === 'all' && active === null)
          return (
            <button
              key={cat.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(cat.value === 'all' ? null : cat.value)}
              className={`
                relative shrink-0 border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200
                ${
                  isActive
                    ? 'border-accent bg-accent text-white'
                    : 'border-strong text-dark-muted hover:border-accent hover:text-accent'
                }
              `}
            >
              {cat.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
