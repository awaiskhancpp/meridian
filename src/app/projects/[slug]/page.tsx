import { notFound } from 'next/navigation'
import { getAllProjects, getProjectBySlug } from '@/lib/projects'
import ProjectDetailPage from '@/components/projects/ProjectDetailPage'

interface ProjectDetailRouteProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.href.split('/').pop()! }))
}

export async function generateMetadata({ params }: ProjectDetailRouteProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  return project
    ? { title: `${project.title} | Meridian`, description: project.intro }
    : { title: 'Project not found | Meridian' }
}

export default async function ProjectDetailRoute({ params }: ProjectDetailRouteProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) notFound()

  return <ProjectDetailPage project={project} />
}
