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
    const borderClass = opts.border ?? 'border-r border-border'

    if (field.type === 'text') {
      return (
        <div
          key={field.name}
          className={`flex flex-1 z-search flex-col justify-center gap-0.5 px-5 ${borderClass}`}
        >
          <label className="text-caption font-semibold uppercase tracking-wide text-muted-foreground">
            {field.label}
          </label>
          <input
            type="text"
            value={values[field.name] ?? ''}
            onChange={(e) => setValue(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="truncate bg-transparent text-body-sm text-foreground outline-none placeholder:text-muted-foreground/60"
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
        <span className="text-caption font-semibold uppercase tracking-wide text-muted-foreground">
          {field.label}
        </span>
        <button
          type="button"
          onClick={() => setOpenDropdown(isOpen ? null : field.name)}
          className="flex items-center gap-2 text-body-sm text-foreground outline-none"
        >
          <span className={`truncate ${selected ? 'text-foreground' : 'text-muted-foreground/70'}`}>
            {displayLabel}
          </span>
          <ChevronDown
            size={14}
            className={`ml-auto shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen ? (
          <>
            <div className="fixed inset-0 z-20" onClick={() => setOpenDropdown(null)} />
            <div className="absolute left-0 top-full z-overlay mt-2 w-full border border-border bg-background py-1 shadow-md">
              {field.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setValue(field.name, option)
                    setOpenDropdown(null)
                  }}
                  className={`z-overlay w-full px-4 py-2.5 text-left text-body-sm transition-colors hover:bg-surface ${
                    option === selected ? 'font-medium text-foreground' : 'text-muted-foreground'
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
    <div className="relative z-50 mx-auto w-full max-w-5xl border border-border bg-background shadow-lg">
      <form onSubmit={handleSubmit} role="search" aria-label="Search articles">
        <div className="hidden h-navbar items-stretch lg:flex">
          {fields.map((field) => renderField(field))}

          <button
            type="submit"
            className="flex shrink-0 items-center bg-accent px-9 text-body-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary"
          >
            Search
          </button>
        </div>

        <div className="flex flex-col gap-0 lg:hidden">
          {fields.map((field) =>
            renderField(field, { border: 'border-b border-border px-5 py-4' }),
          )}

          <button
            type="submit"
            className="flex items-center justify-center bg-accent px-8 py-4 text-body-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  )
}


