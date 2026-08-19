import React from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui'
import siteData from '@/website.json'

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
  imageSrc = '/hero.webp',
  imageAlt = 'Our remodeling team at work',
  content,
}: OurStoryProps) {
  const { about } = siteData

  return (
    <section aria-labelledby="our-story-heading" className="section-padding">
      <Container>
        {/* Changed lg:items-center to lg:items-stretch */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10">
          {/* â”€â”€ Left Column: Image â”€â”€ */}
          {/* Removed aspect ratios, added lg:h-full to fill the stretched grid cell */}
          <div className="relative w-full min-h-72 lg:h-full overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* â”€â”€ Right Column: Text Content â”€â”€ */}
          <div className="flex flex-col justify-center py-4">
            <p className="text-caption uppercase tracking-wider text-muted-foreground">{label}</p>

            <h2 id="our-story-heading" className="mt-3">
              <span className="block heading-2 text-foreground">{heading}</span>
              <span className="block text-script capitalize leading-normal text-accent mt-1">{script}</span>
            </h2>

            <div className="mt-8 space-y-5 text-body leading-relaxed text-muted-foreground">
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

            <div className="mt-auto grid grid-cols-2  pt-14 max-w-lg">
              {about.stats.map((stat) => (
                <div key={stat.label} className=" ">
                  <p className="heading-2 text-foreground">{stat.value}</p>
                  <p className="mt-2 text-body-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
