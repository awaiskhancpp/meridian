'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getAllProjects } from '@/lib/projects'
import { Container } from '@/components/ui'
import { CategoryFilterPills } from '../ui'

// Extract unique categories from projects
const CATEGORIES = [
  { value: 'kitchen-remodeling', label: 'Kitchen' },
  { value: 'bathroom-remodeling', label: 'Bathroom' },
  { value: 'whole-home-remodeling', label: 'Whole-Home' },
  { value: 'custom-cabinetry', label: 'Custom Cabinetry' },
  { value: 'home-additions', label: 'Additions' },
  { value: 'flooring', label: 'Flooring' },
  { value: 'design-consultation', label: 'Design Consultation' },
  { value: 'project-planning', label: 'Project Planning' },
]

export default function ProjectPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const allProjects = getAllProjects()

  const filteredProjects = useMemo(() => {
    if (!activeCategory) return allProjects
    return allProjects.filter(
      (p) => p.category?.toLowerCase().replace(/\s+/g, '-') === activeCategory,
    )
  }, [activeCategory, allProjects])

  return (
    <main className="section-padding">
      <Container>
        {/* Header row */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:mb-10">
          <div>
            <p className="text-caption font-medium uppercase tracking-wider text-muted-foreground">
              Selected work
            </p>
            <h2 className="mt-3 max-w-2xl heading-2 text-foreground">
              Built around how you live.
            </h2>
          </div>
          <p className="max-w-sm text-body-sm leading-6 text-muted-foreground">
            Explore a few of the spaces we have shaped with care, clarity, and a close eye for the
            details that last.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-10 lg:mb-14">
          <CategoryFilterPills
            categories={CATEGORIES}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {filteredProjects.map((project, index) => {
            const isLargeCard = index % 4 === 0 || index % 4 === 3
            const sizeClass = isLargeCard ? 'lg:col-span-2' : 'lg:col-span-1'

            return (
              <article key={project.href} className={`group ${sizeClass}`}>
                <Link href={project.href} className="block">
                  <div className="relative h-media overflow-hidden lg:h-media-lg">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-overlay-card" />

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full transform-gpu bg-card-bottom px-6 pb-6 pt-14 opacity-0 transition-all duration-700 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-caption font-medium uppercase tracking-wider text-primary-foreground-subtle">
                        {project.category}
                      </p>
                      <h3 className="mt-2 heading-3 text-primary-foreground text-balance line-clamp-2">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-4 heading-3 transform-gpu transition-all duration-700 ease-in-out group-hover:-translate-y-2 group-hover:opacity-0 text-balance line-clamp-2">
                    {project.title}
                  </div>
                </Link>
              </article>
            )
          })}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-body-sm uppercase tracking-wide text-muted-foreground">
              No projects in this category yet.
            </p>
          </div>
        )}
      </Container>
    </main>
  )
}
