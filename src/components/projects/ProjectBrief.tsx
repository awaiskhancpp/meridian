import { Container } from '@/components/ui'
import type { ProjectDetail } from './types'

export default function ProjectBrief({ project }: { project: ProjectDetail }) {
  return (
    <section className="border-b border-subtle bg-white py-10 lg:py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.34em] text-dark-muted">
              The brief
            </p>
            <h2 className="mt-4 max-w-2xl text-[clamp(2rem,4vw,3.5rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
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
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-dark-muted">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold leading-5 text-dark">{value}</p>
    </div>
  )
}
