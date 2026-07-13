import React from 'react'
import Image from 'next/image'
import siteData from '@/website.json'
import { Container } from '@/components/ui'
import { Hammer, Clock, BadgeDollarSign, ClipboardCheck } from 'lucide-react'

const { whyChooseUs } = siteData

// Custom generated content adapted for the symmetrical layout
const featuresLeft = [
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
]

const featuresRight = [
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

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-us-heading"
      className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24 bg-white"
    >
      {/* Subtle Background Decoration matching the reference's depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(60,37,21,0.03)_0%,transparent_70%)] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        {/* Header Section */}
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.34em] text-dark-muted">
            {whyChooseUs.label}
          </p>
          <h2 id="blogs-heading" className="mt-4 text-dark">
            <span className="block text-[clamp(2.6rem,6vw,5rem)] font-black uppercase leading-[0.92] tracking-[-0.06em]">
              {whyChooseUs.heading}
            </span>
            <span className="block capitalize font-[family-name:var(--font-allura)] text-[clamp(3rem,6.8vw,5.8rem)] leading-none text-accent">
              {whyChooseUs.script}
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-p text-dark-muted">{whyChooseUs.subheading}</p>
        </div>

        {/* 3-Column Content Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 mt-6">
          {/* Left Column Features */}
          <div className="flex flex-col w-full sm:max-w-md lg:w-1/3 gap-12 order-2 lg:order-1">
            {featuresLeft.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="mb-5 text-[#c28b6e] transition-transform duration-300 group-hover:-translate-y-1">
                  <feature.icon className="w-10 h-10 text-dark" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">{feature.title}</h3>
                <p className="text-dark-muted text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Center Column Image with Offset Background */}
          <div className="w-full sm:max-w-md lg:w-1/3 relative flex justify-center order-1 lg:order-2 mb-8 lg:mb-0">
            {/* Offset Decorative Box */}
            <div className="absolute top-10 -right-6 w-full h-[95%] bg-[#f6f2eb] border border-[rgba(60,37,21,0.08)] shadow-sm -z-10 hidden sm:block" />

            <div className="relative w-full aspect-[4/5] overflow-hidden shadow-2xl ring-1 ring-black/5">
              <Image
                src="/hero.webp"
                alt="Detailed interior remodeling craftsmanship"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Subtle overlay to match the warm finish of the site */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
            </div>
          </div>

          {/* Right Column Features */}
          <div className="flex flex-col w-full sm:max-w-md lg:w-1/3 gap-12 order-3 lg:order-3">
            {featuresRight.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="mb-5 text-[#c28b6e] transition-transform duration-300 group-hover:-translate-y-1">
                  <feature.icon className="w-10 h-10 text-dark" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">{feature.title}</h3>
                <p className="text-dark-muted text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
