import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Button, Container } from '@/components/ui'
import type { ProjectDetail } from './types'
import { uiClasses } from '@/builds'

export default function ProjectCTA({ project }: { project: ProjectDetail }) {
  return (
    <section className="relative isolate overflow-hidden bg-accent py-16 text-white lg:py-24">
      <Image src={project.image} alt="" fill className={uiClasses.mediaCover} />
      <div className={uiClasses.heroOverlay} />
      <Container className="relative z-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.34em] text-white/60">Your next chapter</p>
          <h2 className="mt-4 text-[clamp(2rem,4vw,4rem)] font-black uppercase leading-[0.9] tracking-[-0.05em]">Let’s shape a space around your life.</h2>
        </div>
        <Button variant="outline-light" href="/contact" className="shrink-0 rounded-none">Start a conversation <ArrowUpRight size={18} /></Button>
      </Container>
    </section>
  )
}
