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
    <section className="section-padding section-margin-bottom">
      <Container>
        <div className="mb-10 flex items-end justify-between gap-6">
          <div className=" flex flex-col capitalize">
            <p className="text-caption font-medium uppercase tracking-wider text-muted-foreground">
              Continue exploring
            </p>
            <h2 id="before-after-heading" className="mt-1 gap-card">
              <span className="block heading-2 text-foreground">More of our</span>

              <span className="block heading-script text-accent">work.</span>
            </h2>
          </div>
          <Button
            variant="outline"
            size="lg"
            href="/projects"
            className="hidden  rounded-none items-center gap-2 text-caption font-semibold uppercase tracking-wider text-accent transition-colors hover:text-foreground sm:inline-flex"
          >
            See all <ArrowUpRight size={16} />
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {relatedProjects.map((item) => (
            <Link key={item.href} href={item.href} className="group">
              <div className="relative aspect-landscape overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-caption font-medium uppercase tracking-wider text-muted-foreground">
                {item.category}
              </p>
              <h3 className="mt-2 text-card font-bold uppercase leading-tight tracking-tight text-foreground">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}



