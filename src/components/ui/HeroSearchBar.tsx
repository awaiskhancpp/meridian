'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * HeroSearchBar
 *
 * Config-driven — see each field's shape below. Field ORDER is decided
 * entirely by the caller's `fields` array (e.g. BlogsPageClient puts
 * Category + Sort first, Title last, right next to the Search
 * button) — this component just renders whatever order it's given.
 *
 * Previously wrapped its content in an extra <Container>, which
 * ADDS its own horizontal padding on top of the bar's own border —
 * that's what was reading as "extra padding on the sides." The bar is
 * already width-capped by its own max-w-5xl wrapper, so the nested
 * Container was redundant. Removed; fields now sit directly against
 * the bar's own edge padding (tightened from px-6 to px-5).
 *
 * Color: switched from a dark, translucent brown bar to a light one
 * (bg-white) with dark text and a solid dark "Search" button at the
 * end — matching the reference's light search bar + contrasting dark
 * CTA, rather than one uniform dark surface throughout.
 */

export type SearchField =
  | {
      type: 'text'
      name: string
      label: string
      placeholder?: string
    }
  | {
      type: 'select'
      name: string
      label: string
      options: string[]
      placeholder?: string
    }

interface HeroSearchBarProps {
  onSearch?: (values: Record<string, string>) => void
  fields?: SearchField[]
}

const DEFAULT_FIELDS: SearchField[] = [
  { type: 'text', name: 'title', label: 'Title', placeholder: 'Search by title…' },
  {
    type: 'select',
    name: 'sort',
    label: 'Sort',
    options: ['Latest', 'Oldest', 'A–Z'],
    placeholder: 'Latest',
  },
]

export default function HeroSearchBar({ onSearch, fields = DEFAULT_FIELDS }: HeroSearchBarProps) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  function setValue(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSearch?.(values)
  }

  // One field renderer shared by both layouts — keeps desktop/mobile
  // from drifting apart when a field gets added later.
  function renderField(field: SearchField, opts: { border?: string } = {}) {
    const borderClass = opts.border ?? 'border-r border-black/10'

    if (field.type === 'text') {
      return (
        <div
          key={field.name}
          className={`flex flex-1 flex-col justify-center gap-0.5 px-5 ${borderClass}`}
        >
          <label className="text-[10px] font-semibold uppercase tracking-[0.22em] text-dark-muted">
            {field.label}
          </label>
          <input
            type="text"
            value={values[field.name] ?? ''}
            onChange={(e) => setValue(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="truncate bg-transparent text-sm text-dark outline-none placeholder:text-dark-muted/60"
          />
        </div>
      )
    }

    // select
    const selected = values[field.name] ?? ''
    const isOpen = openDropdown === field.name
    const displayLabel = selected || field.placeholder || field.options[0]

    return (
      <div
        key={field.name}
        className={`relative flex flex-1 flex-col justify-center gap-0.5 px-5 ${borderClass}`}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-dark-muted">
          {field.label}
        </span>
        <button
          type="button"
          onClick={() => setOpenDropdown(isOpen ? null : field.name)}
          className="flex items-center gap-2 text-sm text-dark outline-none"
        >
          <span className={`truncate ${selected ? 'text-dark' : 'text-dark-muted/70'}`}>
            {displayLabel}
          </span>
          <ChevronDown
            size={14}
            className={`ml-auto shrink-0 text-dark-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-20" onClick={() => setOpenDropdown(null)} />
            <div className="absolute bottom-full left-0 z-30 mb-2 w-56 border border-black/10 bg-white py-1 shadow-xl">
              {field.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setValue(field.name, option)
                    setOpenDropdown(null)
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-cream ${
                    option === selected ? 'font-medium text-dark' : 'text-dark-muted'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
      <form onSubmit={handleSubmit} role="search" aria-label="Search articles">
        {/* ── Desktop: single-row layout ─────────────────────────── */}
        <div className="hidden items-stretch lg:flex h-[72px]">
          {fields.map((field) => renderField(field))}

          <button
            type="submit"
            className="flex shrink-0 items-center bg-[#2F2F2F] px-9 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#404040]"
          >
            Search
          </button>
        </div>

        {/* ── Mobile/tablet: stacked layout ─────────────────────── */}
        <div className="flex flex-col gap-0 lg:hidden">
          {fields.map((field) =>
            renderField(field, { border: 'border-b border-black/10 px-5 py-4' }),
          )}

          <button
            type="submit"
            className="flex items-center justify-center bg-dark px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-accent"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  )
}
