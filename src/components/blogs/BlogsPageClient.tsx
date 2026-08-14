'use client'

import React, { useMemo, useState } from 'react'
import Navbar from '@/components/homepage/Navbar'
import Footer from '@/components/homepage/Footer'
import { BlogFeatureCard } from '@/components/homepage/Blogs'
import { PageHero, HeroSearchBar, Container } from '@/components/ui'
import type { SearchField } from '@/components/ui'
import { CATEGORY_LABELS, type BlogCardData } from '@/lib/blogs'

const SEARCH_FIELDS: SearchField[] = [
  {
    type: 'select',
    name: 'Category',
    label: 'Category',
    placeholder: 'Search by Categoryâ€¦',
    options: [
      'Kitchen Remodeling',
      'Bathroom Remodeling',
      'Whole-Home Remodeling',
      'Home Additions',
      'Custom Cabinetry',
      'Flooring',
      'Design Consultation',
      'Project Planning',
    ],
  },
  {
    type: 'select',
    name: 'sort',
    label: 'Sort',
    options: ['Latest', 'Oldest', 'Aâ€“Z'],
    placeholder: 'Latest',
  },
  { type: 'text', name: 'title', label: 'Title', placeholder: 'Search by titleâ€¦' },
]

export default function BlogsPageClient({
  posts,
  heroProps,
}: {
  posts: BlogCardData[]
  heroProps: { label: string; heading: string; script: string; subheading?: string }
}) {
  const [search, setSearch] = useState<Record<string, string>>({})
  const [category, setCategory] = useState<string | null>(null)

  const categoriesPresent = useMemo(() => {
    const values = Array.from(new Set(posts.map((p) => p.category)))
    return values.map((value) => ({ value, label: CATEGORY_LABELS[value] ?? value }))
  }, [posts])

  const filtered = useMemo(() => {
    let result = posts

    if (category) {
      result = result.filter((p) => p.category === category)
    }

    const titleQuery = search.title?.trim().toLowerCase()
    if (titleQuery) {
      result = result.filter((p) => p.title.toLowerCase().includes(titleQuery))
    }

    const authorQuery = search.author?.trim().toLowerCase()
    if (authorQuery) {
      result = result.filter((p) => p.author.toLowerCase().includes(authorQuery))
    }

    const sort = search.sort || 'Latest'
    result = [...result].sort((a, b) => {
      if (sort === 'Aâ€“Z') return a.title.localeCompare(b.title)
      const dateA = new Date(a.datePosted).getTime()
      const dateB = new Date(b.datePosted).getTime()
      return sort === 'Oldest' ? dateA - dateB : dateB - dateA
    })

    return result
  }, [posts, search, category])

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      <div className="relative z-10">
        <PageHero
          label={heroProps.label}
          heading={heroProps.heading}
          script={heroProps.script}
          subheading={heroProps.subheading}
          image="/hero.webp"
          formSlot={<HeroSearchBar fields={SEARCH_FIELDS} onSearch={setSearch} />}
        />
      </div>

      <section aria-label="All articles" className="section-padding">
        <Container>
          <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-eyebrow text-dark-muted">
                {heroProps.label}
              </p>
              <h2 className="mt-2 heading-2 text-dark">All Articles</h2>
            </div>
            <p className="text-sm text-dark-muted">
              {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
            </p>
          </div>

          {filtered.length === 0 ? (
            <p className="py-16 text-center text-sm text-dark-muted">
              No articles match your search. Try clearing a filter.
            </p>
          ) : (
            <div className="z-10 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <BlogFeatureCard key={post.slug} card={post} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <Footer />
    </main>
  )
}
