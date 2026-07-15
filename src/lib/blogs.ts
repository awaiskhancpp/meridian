/**
 * Shared shape the blog card components render. Now a purely static
 * site (no CMS) — this describes the shape of each entry in
 * website.json's blogs.items array directly.
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
  readTimeMinutes?: number
}

/**
 * One label per category — kept 1:1 with the 8 service names in
 * website.json's services.items, since every blog post is themed
 * around one specific service (see website.json's blogs.items).
 */
export const CATEGORY_LABELS: Record<string, string> = {
  'kitchen-remodeling': 'Kitchen Remodeling',
  'bathroom-remodeling': 'Bathroom Remodeling',
  'whole-home-remodeling': 'Whole-Home Remodeling',
  'home-additions': 'Home Additions',
  'custom-cabinetry': 'Custom Cabinetry',
  flooring: 'Flooring',
  'design-consultation': 'Design Consultation',
  'project-planning': 'Project Planning',
}
