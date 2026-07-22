import React from 'react'
import { Shield, FileText, Eye, Clock, Award, ArrowRight } from 'lucide-react'
import { Container, Button } from '@/components/ui'

interface StatItem {
  value: string
  label: string
}

interface TrustIndicator {
  icon: React.ElementType
  label: string
}

interface AboutTrustSectionProps {
  label?: string
  heading?: string
  script?: string
  stats?: StatItem[]
  ctaLabel?: string
  ctaHref?: string
  trustIndicators?: TrustIndicator[]
}

export default function AboutTrustSection({
  label = 'WHY HOMEOWNERS TRUST US',
  heading = 'NUMBERS THAT BACK UP',
  script = 'Every Promise We Make.',
  stats = [
    { value: '24h', label: 'Average response time' },
    { value: '10+', label: 'Years remodeling homes' },
    { value: '5-step', label: 'A defined process, every time' },
    { value: '100%', label: 'Estimates in writing' },
  ],
  ctaLabel = 'See What Clients Say',
  ctaHref = '/#testimonials',
  trustIndicators = [
    { icon: Shield, label: 'Licensed & Insured' },
    { icon: FileText, label: 'Written Contracts' },
    { icon: Eye, label: 'No Hidden Fees' },
    { icon: Clock, label: 'On-Time Guarantee' },
    { icon: Award, label: '10+ Years Experience' },
  ],
}: AboutTrustSectionProps) {
  return (
    <section aria-labelledby="trust-section-heading" className="py-16 lg:py-24 bg-white">
      <Container>
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.34em] text-dark-muted">{label}</p>

          <div className="w-16 h-px bg-dark-soft mx-auto my-4" />

          <h2 id="trust-section-heading">
            <span className="block text-[clamp(2rem,4vw,3.25rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-dark">
              {heading}
            </span>
            <span className="block capitalize font-[family-name:var(--font-allura)] text-[clamp(2.5rem,5vw,4rem)] leading-none text-accent mt-1">
              {script}
            </span>
          </h2>
        </div>

        {/* ── Stats Grid (Mobile: 2-cols | Desktop: 4-cols) ── */}
        {/* Uses gap-px bg-dark-soft to create clean 1px borders without overlap */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-dark-soft  ">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 flex flex-col items-center border border-dark-soft justify-center text-center min-h-[160px]"
            >
              <p className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-dark">
                {stat.value}
              </p>
              <p className="mt-2 text-xs sm:text-sm text-dark-muted font-medium max-w-[12rem] leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <div className="pt-6 ">
          <div className="flex items-center overflow-x-auto sm:flex-wrap sm:justify-center gap-6 sm:gap-8 no-scrollbar pb-2 sm:pb-0">
            {trustIndicators.map((item, idx) => {
              const IconComponent = item.icon
              return (
                <div key={idx} className="flex items-center gap-2.5 shrink-0">
                  <IconComponent className="h-4 w-4 text-dark-muted shrink-0" aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-dark-muted whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
        {/* ── Call to Action ── */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <Button
            variant="outline"
            size="md"
            href={ctaHref}
            className="rounded-none font-semibold text-xs uppercase tracking-wider"
          >
            {ctaLabel}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        {/* ── Trust Indicators Bar (Bottom Sub-bar) ── */}
      </Container>
    </section>
  )
}
