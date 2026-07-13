import React from 'react'
import Image from 'next/image'
import siteData from '@/website.json'
import { Container } from '@/components/ui'
import { ArrowUpRight } from 'lucide-react'

const { blogs } = siteData

export default function Blogs() {
  return (
    <section
      id="blogs"
      aria-labelledby="blogs-heading"
      className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.34em] text-dark-muted">
            {blogs.label}
          </p>
          <h2 id="blogs-heading" className="mt-4 text-dark">
            <span className="block text-[clamp(2.6rem,6vw,5rem)] font-black uppercase leading-[0.92] tracking-[-0.06em]">
              {blogs.heading}
            </span>
            <span className="block capitalize font-[family-name:var(--font-allura)] text-[clamp(3rem,6.8vw,5.8rem)] leading-none text-accent">
              {blogs.script}
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-p text-dark-muted">{blogs.subheading}</p>
        </div>

        {/* 13-column grid on xl: feature card spans 4, each secondary card
            spans 3 → 4 + 3 + 3 + 3 = 13. A plain 12-column grid can't fit
            this combination without two cards colliding on the same column. */}
        <div className="mt-12 grid gap-4 grid-cols-12">
          {blogs.items.map((b, i) => (
            <div className="col-span-12 lg:col-span-4 md:col-span-6" key={i}>
              <BlogFeatureCard card={b} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

type BlogItem = {
  title: string
  description: string
  image: string
  imageAlt: string
  href: string
}

function BlogFeatureCard({ card }: { card: BlogItem }) {
  return (
    <article className="group xl:col-start-1 xl:col-span-4 xl:row-span-2">
      <a href={card.href} className="block">
        <div className="relative overflow-hidden bg-[#f3ede3] shadow-[0_18px_48px_rgba(60,37,21,0.08)]">
          <div className="relative h-[28rem] overflow-hidden  lg:h-[28rem]">
            <Image
              src={card.image}
              alt={card.imageAlt}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(60,37,21,0.08)_0%,rgba(60,37,21,0.18)_100%)]" />

            <div className="absolute inset-0 flex items-center justify-center p-6 opacity-0 pointer-events-none transition-all duration-500 ease-out group-hover:opacity-100">
              <div className="max-w-[22rem] translate-y-4 border border-white/50 bg-white/90 px-8 py-10 text-center opacity-0 shadow-[0_18px_48px_rgba(60,37,21,0.08)] backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <h3 className="text-[clamp(2rem,4vw,3rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
                  {card.title}
                </h3>
                <p className="mt-5 text-sm leading-6 text-dark-muted">{card.description}</p>
                <span className="mt-8 inline-flex items-center gap-3 border-b border-dark/30 pb-2 text-sm font-medium uppercase tracking-[0.18em] text-dark transition-colors group-hover:border-accent group-hover:text-accent">
                  Read more
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowUpRight size={20} />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2">
          <h3 className="max-w-xs text-[clamp(1.35rem,2vw,1.85rem)] font-black uppercase leading-[0.95] tracking-[-0.05em] text-dark">
            {card.title}
          </h3>
        </div>
      </a>
    </article>
  )
}
