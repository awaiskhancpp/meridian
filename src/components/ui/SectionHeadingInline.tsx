import React from 'react'

/**
 * SectionHeadingInline — Type 2: left-aligned header.
 *
 * Used by About and Services — the two sections whose heading sits
 * INSIDE another layout (About: left column of a two-column grid with
 * a photo; Services: a flex row sharing space with carousel arrow
 * buttons), so centering it or forcing a max-width wrapper around it
 * would fight the layout it's actually embedded in. Same eyebrow ->
 * two-span h2 skeleton as SectionHeading, just without the
 * mx-auto/text-center/max-width wrapper — left alone to size to its
 * parent instead.
 *
 * Subheading is optional and unstyled-by-default beyond the shared
 * text-p/text-dark-muted treatment, since About's subheading uses a
 * fixed max-w-[28rem] with no auto-centering while Services renders no
 * subheading at all.
 */

interface SectionHeadingInlineProps {
  id: string
  label: string
  heading: string
  script: string
  subheading?: string
  labelClassName?: string
  headingMt?: string
  subheadingClassName?: string
}

export default function SectionHeadingInline({
  id,
  label,
  heading,
  script,
  subheading,
  labelClassName = 'text-xs uppercase tracking-[0.34em] text-dark-muted',
  headingMt = 'mt-1',
  subheadingClassName = 'mt-4 max-w-[28rem] text-p text-dark-muted',
}: SectionHeadingInlineProps) {
  return (
    <>
      <p className={labelClassName}>{label}</p>
      <h2 id={id} className={headingMt}>
        <span className="block heading-2 text-dark">{heading}</span>
        <span className="block heading-script capitalize text-accent">{script}</span>
      </h2>
      {subheading && <p className={subheadingClassName}>{subheading}</p>}
    </>
  )
}
