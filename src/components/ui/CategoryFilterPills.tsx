'use client'

import React from 'react'

/**
 * CategoryFilterPills
 *
 * The category filter, relocated out of the search bar's dropdown (see
 * HeroSearchBar — that dropdown is now a "Sort" filter instead) into
 * its own row of pill buttons above the post grid. Category and sort
 * are conceptually different kinds of filtering — sort reorders the
 * same set of results, category narrows which results are in the set
 * at all — so giving them separate, differently-shaped UI (a dropdown
 * for one, tabs for the other) reflects that difference instead of
 * treating them as interchangeable slots in the same search bar.
 */
export default function CategoryFilterPills({
  categories,
  active,
  onChange,
}: {
  categories: { value: string; label: string }[]
  active: string | null
  onChange: (value: string | null) => void
}) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
      <button
        type="button"
        role="tab"
        aria-selected={active === null}
        onClick={() => onChange(null)}
        className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
          active === null
            ? 'border-accent bg-accent text-white'
            : 'border-strong text-dark-muted hover:border-accent hover:text-accent'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.value}
          type="button"
          role="tab"
          aria-selected={active === cat.value}
          onClick={() => onChange(cat.value)}
          className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
            active === cat.value
              ? 'border-accent bg-accent text-white'
              : 'border-strong text-dark-muted hover:border-accent hover:text-accent'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
