import { Footer, Navbar } from '@/components/homepage'
import ProjectPage from '@/components/projects/ProjectPage'
import { PageHero } from '@/components/ui'

export default function Projects() {
  return (
    <div>
      <Navbar />
      <PageHero label="" heading="Our" script="Projects" />
      <ProjectPage />
      <Footer />
    </div>
  )
}
