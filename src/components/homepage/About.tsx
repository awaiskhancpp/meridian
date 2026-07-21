import React from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui'
// Import your exact design tokens
import { colors, fontFamily, shadow, borderRadius, fontSize, lineHeight } from '@/builds'

interface OurStoryProps {
  label?: string
  heading?: string
  script?: string
  content?: React.ReactNode
  imageSrc?: string
  imageAlt?: string
}

export default function OurStory({
  label = 'Our Story',
  heading = 'Building With',
  script = 'Integrity',
  imageSrc = '/hero.webp', // Placeholder, update with your actual image
  imageAlt = 'Our remodeling team at work',
  content,
}: OurStoryProps) {
  return (
    <section
      aria-labelledby="our-story-heading"
      className="py-16 lg:py-24"
      style={{ backgroundColor: colors.bgCream }}
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* ── Left Column: Image ── */}
          {/* Using aspect-video (16:9) on mobile and aspect-[4/3] on desktop so it doesn't get too tall */}
          <div
            className="relative w-full aspect-video lg:aspect-[4/3] overflow-hidden"
            style={{
              boxShadow: shadow.lift,
              borderRadius: borderRadius.md,
              backgroundColor: colors.bgWhite,
            }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Subtle inner border matching your design system */}
            <div
              className="absolute inset-4 z-10 pointer-events-none"
              style={{
                border: `1px solid ${colors.borderLightStrong}`,
                borderRadius: borderRadius.sm,
              }}
            />
          </div>

          {/* ── Right Column: Text Content ── */}
          <div className="flex flex-col justify-center">
            <p
              className="text-xs uppercase tracking-[0.34em]"
              style={{ color: colors.textDarkMuted, fontFamily: fontFamily.sans }}
            >
              {label}
            </p>

            <h2 id="our-story-heading" className="mt-3">
              <span
                className="block uppercase tracking-[-0.05em]"
                style={{
                  color: colors.textDark,
                  fontFamily: fontFamily.sans,
                  fontSize: fontSize.h2.lg, // using your token size
                  fontWeight: 900,
                  lineHeight: lineHeight.h2,
                }}
              >
                {heading}
              </span>
              <span
                className="block capitalize mt-1"
                style={{
                  color: colors.accentLight,
                  fontFamily: fontFamily.script,
                  fontSize: fontSize.h1.lg, // making the script slightly larger
                  lineHeight: 1,
                }}
              >
                {script}
              </span>
            </h2>

            <div
              className="mt-8 space-y-5"
              style={{
                color: colors.textDarkMuted,
                fontFamily: fontFamily.sans,
                fontSize: fontSize.p.lg,
                lineHeight: lineHeight.p,
              }}
            >
              {content ? (
                content
              ) : (
                <>
                  <p>
                    It started with a simple belief: that a remodeling project shouldn't just change
                    a physical space; it should improve the way people live in it. For over a
                    decade, we have been turning houses into homes with unwavering attention to
                    detail and a commitment to honest craftsmanship.
                  </p>
                  <p>
                    We know that inviting contractors into your home is a big deal. That is why we
                    built this company on transparency, clear communication, and a genuine respect
                    for your time and property. From the first blueprint to the final walkthrough,
                    our team is there to ensure the vision you have in your head is exactly what you
                    see in front of you.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
