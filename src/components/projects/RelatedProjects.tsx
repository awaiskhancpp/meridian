import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Button, CategoryFilterPills, Container } from '@/components/ui'
import { getAllProjects } from '@/lib/projects'
import type { ProjectDetail } from './types'

export default function RelatedProjects({ project }: { project: ProjectDetail }) {
  const relatedProjects = getAllProjects()
    .filter((item) => item.href !== project.href)
    .slice(0, 3)

  return (
    <section className="py-10 lg:py-16">
      <Container>
        <div className="mb-10 flex items-end justify-between gap-6">
          <div className=" flex flex-col capitalize">
            <p className="text-xs font-medium uppercase tracking-[0.34em] text-dark-muted">
              Continue exploring
            </p>
            <h2 id="before-after-heading" className="mt-1 gap-3">
              <span className="block heading-2 text-dark">More of our</span>

              <span className="block heading-script text-accent">work.</span>
            </h2>
          </div>
          <Button
            variant="outline"
            size="lg"
            href="/projects"
            className="hidden  rounded-none items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent transition-colors hover:text-dark sm:inline-flex"
          >
            See all <ArrowUpRight size={16} />
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {relatedProjects.map((item) => (
            <Link key={item.href} href={item.href} className="group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-dark-muted">
                {item.category}
              </p>
              <h3 className="mt-2 text-xl font-bold uppercase leading-tight tracking-[-0.03em] text-dark">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
