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
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <Image src={project.image} alt="" fill priority className="object-cover object-center" />
      <div className="absolute inset-0 bg-overlay-service-hero" />

      <Container className="relative z-10 flex min-h-[100svh] items-end pb-12 pt-28 lg:pb-16">
        <div className="max-w-4xl text-white">
          <p className="text-xs font-medium uppercase tracking-[0.34em] text-white-subtle">
            {project.eyebrow}
          </p>

          <h1 className="mt-4 max-w-4xl text-[clamp(2.75rem,7vw,6.4rem)] font-black uppercase leading-[0.88] tracking-[-0.06em]">
            {project.title}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-secondary line-clamp-2 lg:text-lg">
            {project.intro}
          </p>
        </div>
      </Container>
    </section>
  )
}
