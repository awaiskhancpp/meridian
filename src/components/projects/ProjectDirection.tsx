import { Check } from 'lucide-react'
import { Container } from '@/components/ui'
import type { ProjectDetail } from './types'

export default function ProjectDirection({ project }: { project: ProjectDetail }) {
  return (
    <section className="bg-surface section-padding">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div className=" flex flex-col ">
            <p className="text-caption font-medium uppercase tracking-wider text-muted-foreground">
              Design direction
            </p>
            <h2 id="before-after-heading" className="mt-1 flex flex-wrap items-end gap-card">
              <span className="heading-2 text-foreground">The details carry</span>

              <span className="text-script leading-normal text-accent">the feeling.</span>
            </h2>
          </div>
          <div className="grid gap-px bg-surface sm:grid-cols-3">
            {project.highlights.map((highlight) => (
              <div
                key={highlight}
                className="bg-surface p-6 lg:p-8 flex flex-col items-center text-center"
              >
                <Check className="h-5 w-5 text-accent " />
                <p className="mt-12 text-body-lg font-bold uppercase leading-tight text-foreground">
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


