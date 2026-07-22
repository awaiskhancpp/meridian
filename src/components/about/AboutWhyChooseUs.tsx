import React from 'react'
import siteData from '@/website.json'
import { Button, Container } from '@/components/ui'
import { Hammer, Clock, BadgeDollarSign, ClipboardCheck, ArrowUpRight } from 'lucide-react'

const { whyChooseUs } = siteData

// Consolidated feature array for easier mapping in a grid layout
const features = [
  {
    title: 'Master Craftsmanship',
    description:
      "Our skilled artisans deliver flawless finishes, treating your home's architecture with the utmost care and precision.",
    icon: Hammer,
  },
  {
    title: 'Reliable Timelines',
    description:
      'We respect your time. Our structured 5-step process ensures your remodel stays on schedule without unnecessary delays.',
    icon: Clock,
  },
  {
    title: 'Transparent Pricing',
    description:
      'No hidden fees or surprise change orders. We provide clear, written estimates before a single wall comes down.',
    icon: BadgeDollarSign,
  },
  {
    title: 'End-to-End Service',
    description:
      'From the initial design consultation to the final walkthrough, one dedicated team manages every detail of your project.',
    icon: ClipboardCheck,
  },
]

export default function AboutWhyChooseUs() {
  return (
    <section
      id="about-why-choose-us"
      aria-labelledby="about-why-choose-us-heading"
      className="relative overflow-hidden py-16 bg-white"
    >
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Context & CTA */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <p className="text-xs font-medium uppercase tracking-[0.34em] text-dark-muted">
              {whyChooseUs.label}
            </p>
            <h2 id="about-why-choose-us-heading" className="mt-4 text-dark">
              <span className="block text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em]">
                {whyChooseUs.heading}
              </span>
              <span className="block capitalize font-[family-name:var(--font-allura)] text-[clamp(2.1rem,4vw,3.5rem)] leading-none text-accent">
                {whyChooseUs.script}
              </span>
            </h2>
            <p className="mt-6 max-w-md text-p text-dark-muted leading-relaxed">
              {whyChooseUs.subheading}
            </p>

            <div className="mt-10 flex">
              <Button
                variant="outline"
                href="/contact"
                className="flex gap-2 rounded-none items-center group"
              >
                <span>Get a free Quote</span>
                <ArrowUpRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Button>
            </div>
          </div>

          {/* Right Column: 2x2 Feature Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col p-8 md:p-10 bg-white ring-1 ring-dark-soft overflow-hidden"
              >
                {/* Decorative animated top border */}
                {/* <div className="absolute top-0 left-0 w-full h-1 bg-decorative-terracotta scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" /> */}

                <div className="mb-6 text-decorative-terracotta transition-transform duration-300 group-hover:scale-110 origin-left">
                  <feature.icon className="w-10 h-10 text-dark" strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-bold text-dark mb-4">{feature.title}</h3>

                <p className="text-dark-muted text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
