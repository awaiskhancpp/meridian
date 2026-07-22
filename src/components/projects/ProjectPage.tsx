import Image from 'next/image'
import Link from 'next/link'
import { projectStyles, uiClasses } from '@/builds'
import { getAllProjects } from '@/lib/projects'
import { Container } from '@/components/ui'

export default function ProjectPage() {
  return (
    <main className={uiClasses.section}>
      <Container>
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-16">
          <div>
            <p className={uiClasses.eyebrow}>Selected work</p>
            <h2 className={`mt-3 max-w-2xl ${uiClasses.headingLarge}`}>
              Built around how you live.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-dark-muted">
            Explore a few of the spaces we have shaped with care, clarity, and a close eye for the
            details that last.
          </p>
        </div>

        <div className={projectStyles.grid.wrapper}>
          {getAllProjects().map((project, index) => {
            const sizeClass =
              index === 0
                ? projectStyles.grid.first
                : index === 1
                  ? projectStyles.grid.second
                  : index < 4
                    ? projectStyles.grid.middle
                    : index === 4
                      ? projectStyles.grid.last
                      : projectStyles.grid.lastWide

            return (
              <article key={project.href} className={`group ${sizeClass}`}>
                <Link href={project.href} className="block">
                  <div className={projectStyles.card.image}>
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      className={uiClasses.mediaCoverTransition}
                    />
                    <div className={projectStyles.card.overlay} />
                    {/* Bottom-only hover caption — replaces the previous
                        whole-image centered panel. No description, no
                        button: the entire card is already the click
                        target via the outer Link. */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-overlay-card-caption px-6 pb-6 pt-14 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/75">
                        {project.category}
                      </p>
                      <h3 className="mt-2 text-[clamp(1.2rem,1.8vw,1.6rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em] text-white">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-4 text-[clamp(1.35rem,2vw,1.85rem)] font-bold uppercase leading-[0.95] tracking-[-0.05em] transition-all duration-300 group-hover:-translate-y-2 group-hover:opacity-0">
                    {project.title}
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </Container>
    </main>
  )
}
