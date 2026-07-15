import React from 'react'

import siteData from '@/website.json'
import BlogsPageClient from './BlogsPageClient'

const { blogs } = siteData

export const metadata = {
  title: 'Journal | Meridian',
  description:
    'Short reflections on materials, light, rooms, and the small choices that make a space feel calm and complete.',
}

/**
 * Blogs Page (Server Component)
 *
 * Fetches every blog post from Payload (depth: 1 so `image` resolves to
 * a full Media doc with a usable url, not just an id) and hands the
 * mapped, plain-object list to BlogsPageClient, which owns all the
 * interactive search/filter/sort behavior. The fetch itself has to
 * happen here rather than in the client component — Payload's local
 * API needs server context, and there's no reason to re-fetch on every
 * filter change anyway since filtering is just narrowing an in-memory
 * list.
 */
export default async function BlogsPage() {
  return (
    <BlogsPageClient
      posts={blogs.items}
      heroProps={{
        label: blogs.label,
        heading: blogs.heading,
        script: blogs.script,
        subheading: blogs.subheading,
      }}
    />
  )
}
