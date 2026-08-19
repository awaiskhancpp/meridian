import React from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui'

interface PageHeroProps {
  /** Section eyebrow label above the heading e.g. "Journal" */
  label: string
  /** Main sans heading e.g. "Notes from the" */
  heading: string
  /** Script accent line e.g. "studio." */
  script?: string
  /** Optional short subheading below the script */
  subheading?: string
  /** Background image path - defaults to hero.webp */
  image?: string
  /**
   * Optional form/search bar rendered below the hero on mobile/tablet
   * and overlaid on desktop.
   */
  formSlot?: React.ReactNode
}

export default function PageHero({
  label,
  heading,
  script,
  subheading,
  image = '/hero.webp',
  formSlot,
}: PageHeroProps) {
  return (
    <section aria-label={heading} className="w-full">
      <div className="relative isolate h-viewport-short min-h-120 w-full lg:h-viewport-page">
        <Image
          src={image}
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-hero-overlay" />

        <Container className="relative z-10 flex h-full items-center justify-center pb-8 pt-header sm:pb-10 sm:pt-28 lg:pb-12">
          <div className="flex w-full flex-col items-center justify-center text-center">
            <p className="mb-3 text-caption font-medium uppercase tracking-wider text-primary-foreground-subtle">
              {label}
            </p>

            <h1 className="max-w-4xl">
              <span className="heading-display text-primary-foreground">
                {heading}
              </span>{' '}
              <span className="mt-2 inline-block -translate-y-1 heading-display-script text-surface-foreground">
                {script}
              </span>
            </h1>

            {subheading ? (
              <p className={`mt-5 max-w-xl text-body-sm leading-body text-secondary-foreground`}>
                {subheading}
              </p>
            ) : null}
          </div>
        </Container>

        {formSlot ? (
          <div className="absolute inset-x-0 bottom-4 z-20 hidden px-4 lg:block">{formSlot}</div>
        ) : null}
      </div>

      {formSlot ? <div className="px-4 pt-4 lg:hidden">{formSlot}</div> : null}
    </section>
  )
}
