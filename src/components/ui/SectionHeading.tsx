import React from 'react'

/**
 * SectionHeading — Type 1: centered promo header.
 *
 * Used by WhyChooseUs, Process, Testimonials, Gallery, Blogs, and Faq —
 * six near-identical blocks (eyebrow label -> two-span h2 -> optional
 * subheading, centered, mx-auto max-width) that had quietly drifted
 * from each other through copy-paste: some had font-medium on the
 * label, some didn't; margins ranged mt-3/mt-4, mt-5/mt-6; max-widths
 * ranged max-w-3xl/max-w-4xl and max-w-xl/max-w-2xl. None of that drift
 * looked intentional, but rather than silently "fixing" it by picking
 * one value everywhere (which would change rendered output), every
 * difference is preserved as a prop with the majority value as the
 * default — so migrating a section to this component changes zero
 * pixels; only actually-shared structure gets deduplicated.
 *
 * Three of the six original sections (WhyChooseUs, Gallery, Faq) had
 * copy-pasted `id` values from OTHER sections' headings — e.g. Faq's
 * <h2> had id="blogs-heading". That's invalid HTML (duplicate ids) and
 * breaks aria-labelledby for whichever section didn't get its own id.
 * `id` is now a required prop specifically so that mistake can't
 * happen silently again — every usage site has to state its own id.
 */

interface SectionHeadingProps {
  id: string
  label: string
  heading: string
  script: string
  subheading?: string
  maxWidth?: string
  labelClassName?: string
  headingMt?: string
  subheadingClassName?: string
  eyebrowLeading?: React.ReactNode
}

export default function SectionHeading({
  id,
  label,
  heading,
  script,
  subheading,
  maxWidth = 'max-w-4xl',
  labelClassName = 'text-xs font-medium uppercase tracking-[0.34em] text-dark-muted',
  headingMt = 'mt-1',
  subheadingClassName = 'mx-auto mt-6 max-w-2xl text-p text-dark-muted',
  eyebrowLeading,
}: SectionHeadingProps) {
  return (
    <div className={`mx-auto ${maxWidth} text-center`}>
      <p className={labelClassName}>
        {eyebrowLeading}
        {label}
      </p>
      <h2 id={id} className={headingMt}>
        <span className="block heading-2 text-dark">{heading}</span>
        <span className="block heading-script capitalize text-accent">{script}</span>
      </h2>
      {subheading && <p className={subheadingClassName}>{subheading}</p>}
    </div>
  )
}
