import { Container } from '@/components/ui'
import type { ProjectDetail } from './types'

export default function ProjectBrief({ project }: { project: ProjectDetail }) {
  return (
    <section className="border-b border-subtle bg-surface-high section-padding">
      <Container>
        <div className="grid gap-12 lg:columns-project-brief lg:gap-24">
          <div>
            <p className="text-xs font-medium uppercase tracking-eyebrow text-dark-muted">
              The brief
            </p>
            <h2 className="mt-4 max-w-2xl type-project-brief font-black uppercase leading-heading tracking-heading-tight text-dark">
              A considered response to everyday life.
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-base leading-7 text-dark-muted">{project.story}</p>
            <div className="mt-10 grid grid-cols-1 border-y border-subtle sm:grid-cols-3">
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
    <div className="border-b border-subtle py-5 sm:border-b-0 sm:border-r sm:px-4 first:pl-0 last:border-r-0">
      <p className="type-metadata font-semibold uppercase tracking-loose text-dark-muted">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold leading-5 text-dark">{value}</p>
    </div>
  )
}
