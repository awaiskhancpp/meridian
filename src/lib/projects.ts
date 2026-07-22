import siteData from '@/website.json'

export type ProjectBeforeAfter = {
  beforeImage: string
  afterImage: string
  beforeAlt: string
  afterAlt: string
}

export type Project = {
  title: string
  category: string
  description: string
  image: string
  gallery: string[]
  imageAlt: string
  href: string
  eyebrow: string
  intro: string
  scope: string
  timeline: string
  result: string
  story: string
  highlights: string[]
  beforeAfter: ProjectBeforeAfter[]
}

export type ProjectsPageData = {
  hero: { label: string; heading: string; script: string; subheading: string }
  items: Project[]
}

export function getProjectsPageData(): ProjectsPageData {
  return siteData.projects as ProjectsPageData
}

export function getAllProjects(): Project[] {
  return getProjectsPageData().items
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.href === `/projects/${slug}`)
}
