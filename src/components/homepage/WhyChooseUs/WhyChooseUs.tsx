import React from 'react'
import Image from 'next/image'
import siteData from '@/website.json'
import { Container } from '@/components/ui'

const { whyChooseUs } = siteData

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-us-heading"
      className="px-4 pb-8 sm:px-6 lg:px-8 lg:pb-12"
    >
      <Container>
        <div className="rounded-[30px] bg-white p-6 shadow-[0_18px_48px_rgba(60,37,21,0.06)] lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-dark-muted">
                {whyChooseUs.label}
              </p>
              <h2 id="why-choose-us-heading" className="mt-1">
                <span className="block text-[clamp(2.2rem,4.8vw,4rem)] font-black uppercase leading-[0.94] tracking-[-0.04em] text-dark">
                  {whyChooseUs.heading}
                </span>
                <span className=" block font-[family-name:var(--font-allura)] text-[clamp(2.4rem,4.8vw,4rem)] leading-none italic text-accent">
                  {whyChooseUs.script}
                </span>
              </h2>
            </div>

            <div className="max-w-2xl">
              <p className="text-p text-dark-muted">{whyChooseUs.subheading}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                {whyChooseUs.highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[rgba(60,37,21,0.14)] bg-cream px-4 py-2 text-sm font-medium text-dark"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-4 lg:auto-rows-[190px]">
            <MetricCard value={whyChooseUs.stats[0].value} label={whyChooseUs.stats[0].label} />

            <ImageCard
              src="/hero.webp"
              label="Crafted with care"
              caption="Clean, modern spaces with a warm finish."
            />

            <MetricCard value={whyChooseUs.stats[1].value} label={whyChooseUs.stats[1].label} />

            <ImageCard
              src="/home-about.avif"
              label="Design support"
              caption="We help choose finishes and layouts."
            />

            <DecorativeCard />

            <MetricCard value={whyChooseUs.stats[2].value} label={whyChooseUs.stats[2].label} />

            <TextCard />

            <MetricCard value={whyChooseUs.stats[3].value} label={whyChooseUs.stats[3].label} />
          </div>
        </div>
      </Container>
    </section>
  )
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="relative flex overflow-hidden rounded-[26px] border border-[rgba(60,37,21,0.08)] bg-[#f6f2eb] p-6 shadow-[0_10px_24px_rgba(60,37,21,0.05)]">
      <div className="relative z-10 flex flex-1 flex-col justify-between">
        <p className="text-[clamp(2.4rem,4vw,4.2rem)] font-black leading-none tracking-[-0.08em] text-dark">
          {value}
        </p>
        <p className="max-w-[12ch] text-sm text-dark-muted">{label}</p>
      </div>
      <div
        className="absolute -right-6 -top-6 h-24 w-24 rounded-full border border-[rgba(60,37,21,0.08)]"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-5 left-10 h-16 w-16 rounded-full border border-[rgba(60,37,21,0.08)]"
        aria-hidden="true"
      />
    </div>
  )
}

function ImageCard({ src, label, caption }: { src: string; label: string; caption: string }) {
  return (
    <div className="overflow-hidden rounded-[26px] border border-[rgba(60,37,21,0.08)] bg-white shadow-[0_10px_24px_rgba(60,37,21,0.05)]">
      <div className="relative h-full min-h-[190px] w-full">
        <Image src={src} alt="" fill aria-hidden="true" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(60,37,21,0.05)_0%,rgba(60,37,21,0.3)_100%)]" />
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-[0.26em] text-dark-muted">{label}</p>
        <p className="mt-2 text-sm text-dark">{caption}</p>
      </div>
    </div>
  )
}

function DecorativeCard() {
  return (
    <div className="relative overflow-hidden rounded-[26px] border border-[rgba(60,37,21,0.08)] bg-white shadow-[0_10px_24px_rgba(60,37,21,0.05)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(60,37,21,0.05),transparent_28%),radial-gradient(circle_at_74%_66%,rgba(60,37,21,0.05),transparent_30%)]" />
      <div className="relative flex h-full items-end p-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.28em] text-dark-muted">Thoughtful process</p>
          <p className="max-w-[18ch] text-sm text-dark-muted">
            A calm workflow keeps the project organized from the first call to the final
            walkthrough.
          </p>
        </div>
      </div>
    </div>
  )
}

function TextCard() {
  return (
    <div className="rounded-[26px] border border-[rgba(60,37,21,0.08)] bg-cream p-6 shadow-[0_10px_24px_rgba(60,37,21,0.05)]">
      <p className="text-xs uppercase tracking-[0.28em] text-dark-muted">What you get</p>
      <ul className="mt-2 grid gap-2 text-sm text-dark" role="list">
        <li>Clear estimates and upfront scope conversations</li>
        <li>Regular updates so you always know what comes next</li>
        <li>Materials and finishes chosen with purpose</li>
      </ul>
    </div>
  )
}
