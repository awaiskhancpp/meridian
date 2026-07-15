'use client'

import React, { useMemo, useState } from 'react'
import Navbar from '@/components/homepage/Navbar/Navbar'
import Footer from '@/components/homepage/Footer/Footer'
import { BlogFeatureCard } from '@/components/homepage/Blogs/Blogs'
import { PageHero, HeroSearchBar, CategoryFilterPills, Container } from '@/components/ui'
import type { SearchField } from '@/components/ui'
import { CATEGORY_LABELS, type BlogCardData } from '@/lib/blogs'

/**
 * BlogsPageClient
 *
 * All the interactive parts of the /blogs page live here as one client
 * component: the search bar (title/author/sort), the category filter
 * pills, and the resulting grid. `posts` is fetched server-side in
 * page.tsx and passed in already-shaped for BlogFeatureCard — this
 * component only ever filters/sorts/re-renders that in-memory list,
 * it never re-fetches.
 *
 * Search + category are independent filters that combine (AND, not
 * OR): typing an author AND picking a category narrows by both at
 * once, matching how search bars + filter tabs behave together on
 * most listing pages.
 */

const SEARCH_FIELDS: SearchField[] = [
  { type: 'text', name: 'title', label: 'Title', placeholder: 'Search by title…' },
  {
    type: 'select',
    name: 'Category',
    label: 'Category',
    placeholder: 'Search by author…',
    options: [
      'Kitchen Remodeling',
      'Bathroom Remodeling',
      'Whole-Home Remodeling',
      'Design Tips',
      'Materials & Finishes',
      'Project Planning',
    ],
  },
  {
    type: 'select',
    name: 'sort',
    label: 'Sort',
    options: ['Latest', 'Oldest', 'A–Z'],
    placeholder: 'Latest',
  },
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
      if (sort === 'A–Z') return a.title.localeCompare(b.title)
      const dateA = new Date(a.datePosted).getTime()
      const dateB = new Date(b.datePosted).getTime()
      return sort === 'Oldest' ? dateA - dateB : dateB - dateA
    })

    return result
  }, [posts, search, category])

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        label={heroProps.label}
        heading={heroProps.heading}
        script={heroProps.script}
        subheading={heroProps.subheading}
        image="/hero.webp"
        formSlot={<HeroSearchBar fields={SEARCH_FIELDS} onSearch={setSearch} />}
      />

      <section aria-label="All articles" className="py-16 lg:py-24">
        <Container>
          <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.34em] text-dark-muted">
                {heroProps.label}
              </p>
              <h2 className="mt-2 text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
                All Articles
              </h2>
            </div>
            <p className="text-sm text-dark-muted">
              {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
            </p>
          </div>

          {/* <div className="mb-10">
            <CategoryFilterPills
              categories={categoriesPresent}
              active={category}
              onChange={setCategory}
            />
          </div> */}

          {filtered.length === 0 ? (
            <p className="py-16 text-center text-sm text-dark-muted">
              No articles match your search. Try clearing a filter.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
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
