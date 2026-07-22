import React from 'react'
import siteData from '@/website.json'
import { Button, Container } from '@/components/ui'

const { whyChooseUs } = siteData

export default function AboutTrustSection() {
  return (
    <section aria-labelledby="about-trust-heading" className="bg-white py-16 ">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.34em] text-dark-muted">
            Why Homeowners Trust Us
          </p>
          <h2 id="about-trust-heading" className="mt-4">
            <span className="block text-h2 font-black uppercase tracking-tight text-dark mb-2">
              Numbers That Back Up
            </span>
            {/* Kept your Allura logic, just mapped it safely to your theme sizing */}
            <span className="block font-[family-name:var(--font-allura)] text-5xl md:text-6xl text-accent font-normal capitalize">
              Every Promise We Make.
            </span>
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-y-10 divide-divider sm:grid-cols-4 sm:divide-x border-y border-divider py-10">
          {whyChooseUs.stats.map((stat) => (
            <div key={stat.label} className="px-4 text-center">
              <p className="text-4xl md:text-5xl font-black text-dark mb-2">{stat.value}</p>
              <p className="mx-auto text-sm leading-snug text-dark-muted uppercase tracking-wider font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center">
          <Button
            variant="outline"
            href="#testimonials"
            className="rounded-none border-dark text-dark hover:bg-dark hover:text-white"
          >
            See What Clients Say
          </Button>
        </div>
      </Container>
    </section>
  )
}
