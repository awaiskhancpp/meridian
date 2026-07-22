import React from 'react'
import { Container } from '@/components/ui'
import { Hammer, Handshake, HardHat, Target } from 'lucide-react'

export default function CoreValues() {
  const values = [
    {
      title: 'Excellence in Execution',
      description:
        'We uphold the highest standards in craftsmanship, planning, and delivery — ensuring every project is completed with precision, durability, and pride.',
      icon: <Hammer />,
    },
    {
      title: 'Safety First, Always',
      description:
        'Safety is non-negotiable. From daily site checks to OSHA-compliant protocols, we protect every worker, client, and community we serve.',
      icon: <HardHat />,
    },
    {
      title: 'Integrity & Transparency',
      description:
        'No hidden costs, no broken promises. We believe in honest communication, clear contracts, and doing the right thing — even when no one is watching.',
      icon: <Handshake />,
    },
    {
      title: 'Sustainable Progress',
      description:
        'We build for the future — using eco-conscious materials, efficient methods, and long-term thinking to reduce impact and increase value.',
      icon: <Target />,
    },
  ]

  return (
    <section aria-labelledby="values-heading" className="py-16 ">
      <Container>
        {/* ── Header ── */}
        <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-20">
          <p className="text-xs uppercase tracking-[0.34em] text-dark-muted mb-4">Our Values</p>
          <h2 id="values-heading">
            <span className="block text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
              Core Values That Guide
            </span>
            <span className="block capitalize font-[family-name:var(--font-allura)] text-[clamp(2.1rem,4vw,3.5rem)] leading-none text-accent mt-3">
              Every Project & Partnership
            </span>
          </h2>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="rounded-none border border-[#3C2515]/15 bg-white p-6  flex flex-col "
            >
              {/* Sharp, square icon container matching your hard edges */}
              <div className="w-14 h-14 rounded-none bg-dark text-white flex items-center justify-center mb-8 shrink-0">
                {value.icon}
              </div>

              <h3 className="text-lg font-bold uppercase tracking-wide text-dark mb-4 pr-2 leading-snug">
                {value.title}
              </h3>

              <p className="text-sm leading-relaxed text-dark-muted flex-grow">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
