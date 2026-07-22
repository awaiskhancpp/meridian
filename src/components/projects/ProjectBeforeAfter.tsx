import BeforeAfter from '@/components/Services/BeforeAfter'
import type { ProjectDetail } from './types'

export default function ProjectBeforeAfter({ project }: { project: ProjectDetail }) {
  return (
    <BeforeAfter
      label="The transformation"
      heading="Before &"
      script="After"
      subheading="Drag the divider to see how the space changed from the starting point to the finished result."
      items={project.beforeAfter.map((item) => ({ ...item }))}
    />
  )
}
