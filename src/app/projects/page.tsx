import { Footer, Navbar } from '@/components/homepage'
import ProjectPage from '@/components/projects/ProjectPage'
import { PageHero } from '@/components/ui'
import { getProjectsPageData } from '@/lib/projects'

export default function Projects() {
  return (
    <div>
      <Navbar />
      <PageHero {...getProjectsPageData().hero} />
      <ProjectPage />
      <Footer />
    </div>
  )
}
