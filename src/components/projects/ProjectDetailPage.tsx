import { Footer, Navbar } from '@/components/homepage'
import ProjectBeforeAfter from './ProjectBeforeAfter'
import ProjectBrief from './ProjectBrief'
import ProjectCTA from './ProjectCTA'
import ProjectDirection from './ProjectDirection'
import ProjectHero from './ProjectHero'
import RelatedProjects from './RelatedProjects'
import type { ProjectDetail } from './types'
import ProjectGallery from './ProjectGallery'

export default function ProjectDetailPage({ project }: { project: ProjectDetail }) {
  return (
    <div className="bg-white">
      <Navbar />
      <ProjectHero project={project} />
      {/* <ProjectBrief project={project} /> */}
      <ProjectGallery images={project.gallery} />
      <ProjectBeforeAfter project={project} />
      {/* <ProjectDirection project={project} /> */}
      <RelatedProjects project={project} />
      <ProjectCTA project={project} />
      <Footer />
    </div>
  )
}
