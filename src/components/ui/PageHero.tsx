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
  /** Background image path — defaults to hero.webp */
  image?: string
  /**
   * Optional form/search bar rendered at the bottom of the hero.
   * Pass any React node — typically a <HeroSearchBar /> or similar.
   * Renders in a full-width strip pinned to the bottom of the hero above the gradient fade.
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
      <div className="relative isolate h-[60vh] min-h-[480px] w-full  lg:h-[85vh]">
        {/* Background image */}
        <Image
          src={image}
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover object-center"
        />

        {/* Gradient overlay — identical to homepage Hero */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,24,18,0.38)_0%,rgba(34,24,18,0.18)_42%,rgba(34,24,18,0.74)_100%)]" />

        {/* Horizontal rule near the bottom */}
        {/* <div className="pointer-events-none absolute inset-x-0 bottom-24 h-px bg-white/20 sm:bottom-26 lg:bottom-32" /> */}

        <Container className="relative mx-auto flex h-full flex-col pb-8 pt-24 justify-center items-center sm:pb-10 sm:pt-28 lg:pb-12">
          {/* Eyebrow */}
          <div className="flex w-full flex-col justify-center items-center text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.34em] text-white/70">
              {label}
            </p>

            {/* Heading */}
            <h1 className="max-w-[44rem]">
              <span className="text-[clamp(2.75rem,6.8vw,5.85rem)] font-bold uppercase leading-[0.9] tracking-[-0.06em] text-white">
                {heading}
              </span>{' '}
              <span className="font-[family-name:var(--font-allura)] capitalize text-[clamp(3.1rem,7vw,6.1rem)] leading-[0.82] text-cream">
                {' '}
                {script}
              </span>
            </h1>
          </div>

          {/* {subheading && (
            <p className="mt-5 max-w-[28rem] text-sm leading-relaxed text-white/80 sm:text-[0.95rem]">
              {subheading}
            </p>
          )} */}
        </Container>

        {/* Form slot — pinned to bottom of hero, full width, above the gradient */}
        {formSlot && <div className="absolute bottom-4 left-0 right-0 z-10">{formSlot}</div>}
      </div>
    </section>
  )
}
