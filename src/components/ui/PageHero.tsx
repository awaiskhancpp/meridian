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
      <div className="relative isolate h-[60vh] min-h-[480px] w-full lg:h-[85vh]">
        <Image
          src={image}
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,24,18,0.38)_0%,rgba(34,24,18,0.18)_42%,rgba(34,24,18,0.74)_100%)]" />

        <Container className="relative z-10 flex h-full items-center justify-center pb-8 pt-24 sm:pb-10 sm:pt-28 lg:pb-12">
          <div className="flex w-full flex-col items-center justify-center text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.34em] text-white/70">
              {label}
            </p>

            <h1 className="max-w-[44rem]">
              <span className="text-[clamp(2.75rem,6.8vw,5.85rem)] font-bold uppercase leading-[0.9] tracking-[-0.06em] text-white">
                {heading}
              </span>{' '}
              <span className="font-[family-name:var(--font-allura)] capitalize text-[clamp(3.1rem,7vw,6.1rem)] leading-[0.82] text-cream">
                {script}
              </span>
            </h1>

            {subheading ? (
              <p className="mt-5 max-w-[28rem] text-sm leading-relaxed text-white/80 sm:text-[0.95rem]">
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
