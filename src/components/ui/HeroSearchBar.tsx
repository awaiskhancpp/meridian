'use client'

import React, { useState } from 'react'
import { Container } from '@/components/ui'
import { ChevronDown, Search } from 'lucide-react'

/**
 * HeroSearchBar
 *
 * Config-driven: the set of fields is a prop, not something hardcoded
 * into the component. Every field (text input or select dropdown) is
 * described by a small object in the `fields` array and rendered by
 * ONE shared function for both the desktop single-row layout and the
 * mobile stacked layout — previously these were two separate blocks of
 * near-identical JSX, which meant adding a field meant editing it in
 * two places and risking the copies drifting apart. Now adding a field
 * anywhere that uses this component (this page or any other) is just
 * adding one entry to the `fields` array; both layouts pick it up
 * automatically.
 *
 * Values are collected into a single `Record<string, string>` keyed by
 * each field's `name`, so `onSearch` always receives every field's
 * current value regardless of how many fields were configured.
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
      /** Placeholder shown when nothing is selected — e.g. "All Categories" */
      placeholder?: string
    }

interface HeroSearchBarProps {
  /** Called with every field's current value, keyed by field name */
  onSearch?: (values: Record<string, string>) => void
  /** Field configuration — text inputs and/or select dropdowns, in order */
  fields?: SearchField[]
}

const DEFAULT_FIELDS: SearchField[] = [
  { type: 'text', name: 'title', label: 'Title', placeholder: 'Search by title…' },
  // { type: 'text', name: 'author', label: 'Author', placeholder: 'Search by author…' },
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

  // One field renderer shared by both layouts — this is what keeps
  // desktop/mobile from drifting apart when a field gets added later.
  function renderField(field: SearchField, opts: { border?: string } = {}) {
    const borderClass = opts.border ?? 'border-r border-white/20'

    if (field.type === 'text') {
      return (
        <div
          key={field.name}
          className={`flex flex-1 flex-col justify-center gap-0.5 px-6 ${borderClass}`}
        >
          <label className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white/60">
            {field.label}
          </label>
          <input
            type="text"
            value={values[field.name] ?? ''}
            onChange={(e) => setValue(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="bg-transparent text-sm text-white outline-none placeholder:text-white/50 truncate"
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
        className={`relative flex flex-1 flex-col justify-center gap-0.5 px-6 ${borderClass}`}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white/60">
          {field.label}
        </span>
        <button
          type="button"
          onClick={() => setOpenDropdown(isOpen ? null : field.name)}
          className="flex items-center gap-2 text-sm text-white outline-none"
        >
          <span className={`truncate ${selected ? 'text-white' : 'text-white/60'}`}>
            {displayLabel}
          </span>
          <ChevronDown
            size={14}
            className={`ml-auto shrink-0 text-white/60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-20" onClick={() => setOpenDropdown(null)} />
            <div className="absolute bottom-full left-0 z-30 mb-2 w-full border border-white/20 bg-[rgba(60,37,21,0.82)] py-1 shadow-xl backdrop-blur-md">
              {field.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setValue(field.name, option)
                    setOpenDropdown(null)
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-white/10 ${
                    option === selected ? 'text-white font-medium' : 'text-white/70'
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
    <div className="border max-w-5xl mx-auto border-white/20 bg-[rgba(60,37,21,0.82)] backdrop-blur-md">
      <Container>
        <form onSubmit={handleSubmit} role="search" aria-label="Search articles">
          {/* ── Desktop: single-row layout ─────────────────────────── */}
          <div className="hidden lg:flex items-stretch h-[72px]">
            {fields.map((field) => renderField(field))}

            <button
              type="submit"
              className="flex shrink-0 items-center gap-2.5 bg-transparent px-8 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/10"
            >
              <Search size={15} aria-hidden="true" />
              <span>Search</span>
            </button>
          </div>

          {/* ── Mobile/tablet: stacked layout ─────────────────────── */}
          <div className="flex flex-col gap-0 lg:hidden">
            {fields.map((field) =>
              renderField(field, { border: 'border-b border-white/20 px-5 py-4' }),
            )}

            <button
              type="submit"
              className="flex items-center justify-center gap-2.5 bg-[#3C2515] px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#433022]"
            >
              <Search size={15} aria-hidden="true" />
              <span>Search</span>
            </button>
          </div>
        </form>
      </Container>
    </div>
  )
}
