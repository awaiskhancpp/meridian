'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

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
  { type: 'text', name: 'title', label: 'Title', placeholder: 'Search by title...' },
  {
    type: 'select',
    name: 'sort',
    label: 'Sort',
    options: ['Latest', 'Oldest', 'A-Z'],
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

  function renderField(field: SearchField, opts: { border?: string } = {}) {
    const borderClass = opts.border ?? 'border-r border-subtle'

    if (field.type === 'text') {
      return (
        <div
          key={field.name}
          className={`flex flex-1 z-[800] flex-col justify-center gap-0.5 px-5 ${borderClass}`}
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

        {isOpen ? (
          <>
            <div className="fixed inset-0 z-20" onClick={() => setOpenDropdown(null)} />
            <div className="absolute left-0 top-full z-[999] mt-2 w-full border border-subtle bg-white py-1 shadow-card">
              {field.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setValue(field.name, option)
                    setOpenDropdown(null)
                  }}
                  className={`z-[999] w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-cream ${
                    option === selected ? 'font-medium text-dark' : 'text-dark-muted'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : null}
      </div>
    )
  }

  return (
    <div className="relative z-50 mx-auto w-full max-w-5xl border border-subtle bg-white shadow-lift">
      <form onSubmit={handleSubmit} role="search" aria-label="Search articles">
        <div className="hidden h-[72px] items-stretch lg:flex">
          {fields.map((field) => renderField(field))}

          <button
            type="submit"
            className="flex shrink-0 items-center bg-dark-muted px-9 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-dark"
          >
            Search
          </button>
        </div>

        <div className="flex flex-col gap-0 lg:hidden">
          {fields.map((field) =>
            renderField(field, { border: 'border-b border-subtle px-5 py-4' }),
          )}

          <button
            type="submit"
            className="flex items-center justify-center bg-dark-muted px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-accent"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  )
}
