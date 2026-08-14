'use client'

import React from 'react'

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
  const allCategories = [{ value: 'all', label: 'All' }, ...categories]

  return (
    <div
      className="flex flex-wrap gap-2 py-1"
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
              relative shrink-0 border px-5 py-2.5 text-xs font-semibold uppercase tracking-pill transition-all duration-200
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
  )
}
