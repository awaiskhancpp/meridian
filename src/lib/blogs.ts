import type { Blog, Media, User } from '@/payload-types'

/**
 * Shared shape the blog card components (BlogFeatureCard) render.
 * Payload's `image` upload field resolves to a full Media doc once
 * populated by the query (depth >= 1), so this pulls the actual URL
 * and alt text off of it rather than assuming a plain string.
 */
export type BlogCardData = {
  title: string
  description: string
  image: string
  imageAlt: string
  href: string
  author: string
  category: string
  datePosted: string
  slug: string
}

/**
 * Resolves a Blog's `author` relationship field to a display string.
 *
 * `author` is typed `number | User` — a raw ID when the query didn't
 * populate it (depth: 0), or a full User object when it did. Assigning
 * it directly into a field typed `string` (the previous bug) is a type
 * error either way, and even once populated, a raw numeric ID was never
 * something to display as-is.
 *
 * Users has no dedicated `name` field by default, so this prefers the
 * new optional `name` field and falls back to `email` when an author
 * hasn't set one — never shows a raw ID, and never throws if `author`
 * happens to be unpopulated (returns '' instead).
 */
export function getAuthorName(author: Blog['author']): string {
  if (typeof author !== 'object' || author === null) return ''
  const user = author as User
  return user.name || user.email || ''
}

export function toBlogCard(post: Blog): BlogCardData {
  const media = post.image as Media | number
  const imageUrl = typeof media === 'object' && media?.url ? media.url : ''
  const imageAlt = typeof media === 'object' && media?.alt ? media.alt : post.title

  return {
    title: post.title,
    description: post.description,
    image: imageUrl,
    imageAlt,
    href: `/blogs/${post.slug}`,
    author: getAuthorName(post.author),
    category: post.category,
    datePosted: post.datePosted,
    slug: post.slug,
  }
}

export const CATEGORY_LABELS: Record<string, string> = {
  'kitchen-remodeling': 'Kitchen Remodeling',
  'bathroom-remodeling': 'Bathroom Remodeling',
  'whole-home-remodeling': 'Whole-Home Remodeling',
  'design-tips': 'Design Tips',
  'materials-finishes': 'Materials & Finishes',
  'project-planning': 'Project Planning',
}
