import React from 'react'
import Image from 'next/image'
import { Container, SectionHeading } from '@/components/ui'
import siteData from '@/website.json'

const { process: processData } = siteData

/*
  Photography paths, one per step — see the accompanying prompts for what
  to generate/shoot for each. File names match the step order in
  website.json (processData.steps[0] → discovery.jpg, etc.); if you
  reorder steps in the JSON, keep this array in the same order or the
  images will pair with the wrong step.
*/
const stepImages = ['/discovery.png', '/design.png', '/build.png', '/handoff.png']

/* ─────────────────────────────────────────────
   Process Section
───────────────────────────────────────────── */
export default function Process() {
  return (
    <section id="process" aria-labelledby="process-heading" className="py-16 lg:py-24 bg-white">
      <Container>
        {/* Centered heading */}
        <SectionHeading
          id="process-heading"
          label={processData.label}
          heading={processData.heading}
          script={processData.script}
          subheading={processData.subheading}
        />

        {/* Step cards */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processData.steps.map((step, idx) => (
            <div
              key={idx}
              className="relative flex flex-col border border-soft bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              {/*
                Badge + line share one flex row now, instead of the badge
                being a standalone element with a separately-positioned
                line elsewhere in the card. `gap-2` is the only space
                between them, so the line visually starts exactly at the
                badge's edge ("attached"), and `flex-1` makes it stretch
                to fill whatever's left of the row — i.e. to the card's
                own right edge — rather than needing a manually-guessed
                width or position to reach "the end of the card."
              */}
              <div className="mb-5 flex items-center gap-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div
                  className="h-0 flex-1 border-t border-dashed border-divider-strong"
                  aria-hidden="true"
                />
              </div>

              {/* Title */}
              <h3 className="mb-3 text-base font-bold leading-snug text-dark">{step.title}</h3>

              {/* Description */}
              <p className="flex-1 text-sm leading-relaxed text-dark-muted">{step.description}</p>

              {/* Photo — replaces the previous inline SVG illustration.
                  aspect-[280/160] matches the old SVG viewBox's proportions
                  so the card's overall shape doesn't jump when this swaps in. */}
              <div className="relative mt-6 aspect-[280/160] w-full overflow-hidden  ">
                <Image
                  src={stepImages[idx] ?? stepImages[stepImages.length - 1]}
                  alt={step.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
