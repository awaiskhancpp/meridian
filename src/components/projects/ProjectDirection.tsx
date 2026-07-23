import { Check } from 'lucide-react'
import { Container } from '@/components/ui'
import type { ProjectDetail } from './types'

export default function ProjectDirection({ project }: { project: ProjectDetail }) {
  return (
    <section className="bg-cream py-10 lg:py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div className=" flex flex-col ">
            <p className="text-xs font-medium uppercase tracking-[0.34em] text-dark-muted">
              Design direction
            </p>
            <h2 id="before-after-heading" className="mt-1 flex flex-wrap items-end gap-3">
              <span className="heading-2 text-dark">The details carry</span>

              <span className="heading-script text-accent">the feeling.</span>
            </h2>
          </div>
          <div className="grid gap-px bg-white sm:grid-cols-3">
            {project.highlights.map((highlight) => (
              <div
                key={highlight}
                className="bg-cream p-6 lg:p-8 flex flex-col items-center text-center"
              >
                <Check className="h-5 w-5 text-accent " />
                <p className="mt-12 text-lg font-bold uppercase leading-tight text-dark">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
