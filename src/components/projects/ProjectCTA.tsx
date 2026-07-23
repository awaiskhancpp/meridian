import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Button, Container } from '@/components/ui'
import type { ProjectDetail } from './types'

export default function ProjectCTA({ project }: { project: ProjectDetail }) {
  return (
    <section className="relative isolate overflow-hidden bg-accent py-10 text-white lg:py-16">
      <Image src={project.image} alt="" fill className="object-cover object-center" />
      <div className="absolute inset-0 bg-overlay-service-hero" />

      {/* 
        FIX: Changed sm:items-end to sm:items-center. 
        This keeps the side-by-side layout but vertically centers the button with the text.
      */}
      <Container className="relative z-10 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <h2 className="mt-4 text-[clamp(2rem,4vw,4rem)] font-black uppercase leading-[0.9] tracking-[-0.05em]">
            Let’s shape a space around your life.
          </h2>
        </div>
        <div className="flex justify-center">
          <Button variant="outline-light" href="/contact" className="shrink-0 rounded-none">
            Start a conversation <ArrowUpRight size={18} />
          </Button>
        </div>
      </Container>
    </section>
  )
}
