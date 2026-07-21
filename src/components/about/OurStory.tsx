import React from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui' // Reusing your existing Container component

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
    <section aria-labelledby="our-story-heading" className="py-16">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
          {/* ── Left Column: Image ── */}
          <div className="relative w-full aspect-video lg:aspect-[4/3] overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              //   sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* <div className="absolute inset-4 border border-white/20 z-10 pointer-events-none" /> */}
          </div>

          {/* ── Right Column: Text Content ── */}
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.34em] text-dark-muted">{label}</p>

            <h2 id="our-story-heading" className="mt-3">
              <span className="block text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
                {heading}
              </span>
              <span className="block capitalize font-[family-name:var(--font-allura)] text-[clamp(2.1rem,4vw,3.5rem)] leading-none text-accent mt-1">
                {script}
              </span>
            </h2>

            {/* Default story text if no children/content prop is provided */}
            <div className="mt-8 space-y-5 text-base leading-relaxed text-dark-muted">
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
