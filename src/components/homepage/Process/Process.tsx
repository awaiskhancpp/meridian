'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui'
import siteData from '@/website.json'

const { process: processData } = siteData

/**
 * Process Section
 *
 * Tab-based process walkthrough with heading on right, steps on left.
 * Each step reveals its title, description, and image when selected.
 * Clean, minimal design matching the reference layout.
 */
export default function Process() {
  const [activeStep, setActiveStep] = useState(0)
  const currentStep = processData.steps[activeStep]

  return (
    <section id="process" aria-labelledby="process-heading" className="relative  py-16  lg:py-24 ">
      <Container>
        {/* Header Section - Right Aligned */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12">
          <div className="lg:max-w-md">
            <p className="text-xs font-medium uppercase tracking-[0.34em] text-dark-muted">
              {processData.label}
            </p>
            <h2 id="process-heading" className="text-dark">
              <span className="block mt-3 text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em]">
                {processData.heading}
              </span>
              <span className="block capitalize font-[family-name:var(--font-allura)] text-[clamp(2.1rem,4vw,3.5rem)] leading-none italic text-accent">
                {processData.script}
              </span>
            </h2>
            <p className="mt-4 text-p text-dark-muted lg:ml-auto">{processData.subheading}</p>
          </div>
        </div>

        {/* Step Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-[rgba(60,37,21,0.12)] pb-4">
          {processData.steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 ${
                activeStep === idx
                  ? 'text-dark border-b-2 border-dark'
                  : 'text-dark-muted hover:text-dark'
              }`}
              aria-current={activeStep === idx ? 'step' : undefined}
            >
              Step {idx + 1}
            </button>
          ))}
        </div>

        {/* Active Step Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12  items-center px-8">
          {/* Left: Title & Description */}
          <div className="col-span-7 order-2 lg:order-1">
            <h3 className="text-[clamp(1rem,2.5vw,2rem)] font-bold uppercase tracking-tight text-dark mb-6 leading-tight">
              {currentStep.title}
            </h3>
            <p className="text-p text-dark-muted leading-relaxed max-w-lg">
              {currentStep.description}
            </p>
          </div>

          {/* Right: Image */}
          <div className="col-span-5 order-1 lg:order-2">
            <div className="relative h-[260px] w-full overflow-hidden bg-white/50">
              <Image
                src={currentStep.image}
                alt={currentStep.title}
                fill
                className="object-cover transition-opacity duration-500"
                key={activeStep} // Force re-render on step change for smooth transition
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
