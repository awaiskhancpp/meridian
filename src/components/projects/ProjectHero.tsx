import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Container } from '@/components/ui'
import { responsiveTypography, uiClasses } from '@/builds'
import type { ProjectDetail } from './types'

/**
 * ProjectHero
 *
 * Updated to utilize a full 100svh viewport height. Using svh (small viewport height)
 * ensures perfect edge-to-edge rendering on mobile devices where the dynamic URL bar
 * can sometimes cause 100vh to overflow and trigger a scrollbar.
 */
export default function ProjectHero({ project }: { project: ProjectDetail }) {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <Image src={project.image} alt="" fill priority className={uiClasses.mediaCover} />
      <div className={uiClasses.heroOverlay} />

      <Container className="relative z-10 flex min-h-[100svh] items-end pb-12 pt-28 lg:pb-16">
        <div className="max-w-4xl text-white">
          <Link
            href="/projects"
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/75 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} /> Back to projects
          </Link>

          <p className={uiClasses.eyebrowLight}>{project.eyebrow}</p>

          <h1 className={`mt-4 max-w-4xl ${responsiveTypography.hero.projectHero}`}>
            {project.title}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 line-clamp-2 lg:text-lg">
            {project.intro}
          </p>
        </div>
      </Container>
    </section>
  )
}
