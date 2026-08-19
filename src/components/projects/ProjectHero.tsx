import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Container } from '@/components/ui'
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
    <section className="relative isolate min-h-viewport overflow-hidden">
      <Image src={project.image} alt="" fill priority className="object-cover object-center" />
      <div className="absolute inset-0 bg-service-hero-overlay" />

      <Container className="relative z-10 flex min-h-viewport items-end pb-12 pt-28 lg:pb-16">
        <div className="max-w-4xl text-primary-foreground">
          <p className="text-caption font-medium uppercase tracking-wider text-primary-foreground-subtle">
            {project.eyebrow}
          </p>

          <h1 className="mt-4 max-w-4xl heading-display text-primary-foreground">
            {project.title}
          </h1>

          <p className="mt-5 max-w-2xl text-body leading-7 text-secondary-foreground line-clamp-2 lg:text-body-lg">
            {project.intro}
          </p>
        </div>
      </Container>
    </section>
  )
}
