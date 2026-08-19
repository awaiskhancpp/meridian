import { Container } from '@/components/ui'
import type { ProjectDetail } from './types'

export default function ProjectBrief({ project }: { project: ProjectDetail }) {
  return (
    <section className="border-b border-border bg-background section-padding">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="text-caption font-medium uppercase tracking-wider text-muted-foreground">
              The brief
            </p>
            <h2 className="mt-4 max-w-2xl heading-2 text-foreground">
              A considered response to everyday life.
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-body leading-7 text-muted-foreground">{project.story}</p>
            <div className="mt-10 grid grid-cols-1 border-y border-border sm:grid-cols-3">
              <ProjectMetric label="Scope" value={project.scope} />
              <ProjectMetric label="Timeline" value={project.timeline} />
              <ProjectMetric label="Result" value={project.result} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function ProjectMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border py-5 sm:border-b-0 sm:border-r sm:px-4 first:pl-0 last:border-r-0">
      <p className="text-caption font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-body-sm font-semibold leading-5 text-foreground">{value}</p>
    </div>
  )
}

