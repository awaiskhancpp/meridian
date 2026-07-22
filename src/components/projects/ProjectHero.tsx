import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Container } from '@/components/ui'
import { responsiveTypography, uiClasses } from '@/builds'
import type { ProjectDetail } from './types'

/**
 * ProjectHero
 *
 * Previously min-h-[82vh] on both the section AND the inner Container,
 * combined with pt-32/pb-16-24 padding and a heading capped at 6.4rem,
 * left too little slack: min-height is a floor, not a ceiling, so once
 * a two-line title + intro paragraph needed more room than 82vh minus
 * padding allowed, the section legitimately grew past 100vh — that's
 * what was actually being screenshotted, not a rendering glitch.
 *
 * Fix is headroom, not a hard cap (max-height + overflow-hidden would
 * just clip long titles instead of fixing the overflow): a lower vh
 * floor, trimmed padding, and a smaller heading ceiling (4.75rem
 * instead of 6.4rem) all comfortably fit under one viewport even for
 * a two-line title, on both a short laptop window and a tall phone.
 * line-clamp-2 on the intro is a defensive cap for whatever length a
 * future project's intro text ends up being, since this is
 * data-driven from website.json per project.
 */
export default function ProjectHero({ project }: { project: ProjectDetail }) {
  return (
    <section className="relative isolate min-h-[60vh] overflow-hidden lg:min-h-[600px]">
      <Image src={project.image} alt="" fill priority className={uiClasses.mediaCover} />
      <div className={uiClasses.heroOverlay} />
      <Container className="relative z-10 flex min-h-[60vh] items-end pb-12 pt-28 lg:min-h-[600px] lg:pb-16">
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
