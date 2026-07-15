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

export const CATEGORY_LABELS: Record<string, string> = {
  'kitchen-remodeling': 'Kitchen Remodeling',
  'bathroom-remodeling': 'Bathroom Remodeling',
  'whole-home-remodeling': 'Whole-Home Remodeling',
  'design-tips': 'Design Tips',
  'materials-finishes': 'Materials & Finishes',
  'project-planning': 'Project Planning',
}
