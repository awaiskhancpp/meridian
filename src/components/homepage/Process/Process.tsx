'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Container } from '@/components/ui'
import siteData from '@/website.json'
import { Check } from 'lucide-react'

const { process: processData } = siteData

/**
 * Process Section
 *
 * Smooth scroll-driven card progression with:
 * - Extended section height to ensure all cards complete
 * - requestAnimationFrame for 60fps smooth updates
 * - Easing functions for natural transitions
 * - Progress bar that completes when last card is fully active
 */

// Smooth easing function for natural transitions
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export default function Process() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const rafRef = useRef<number>(1)

  useEffect(() => {
    let ticking = false

    const updateScrollProgress = () => {
      if (!sectionRef.current) {
        ticking = false
        return
      }

      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      /**
       * Calculate scroll progress (0 → 1)
       *
       * Start: When section top hits 70% down viewport
       * End: When section bottom is 30% up viewport
       *
       * This ensures:
       * - First card activates smoothly when entering
       * - Last card completes fully before leaving viewport
       * - Progress bar reaches 100% before next section
       */
      const sectionTop = rect.top
      const sectionBottom = rect.bottom
      const sectionHeight = rect.height

      const startTrigger = viewportHeight * 0.7
      const endTrigger = viewportHeight * 0.3

      // Total scroll range from start to finish
      const scrollRange = sectionHeight + (startTrigger - endTrigger)

      // Current progress through that range
      const rawProgress = (startTrigger - sectionTop) / scrollRange

      // Clamp between 0 and 1
      const clampedProgress = Math.max(0, Math.min(1, rawProgress))

      setScrollProgress(clampedProgress)
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(updateScrollProgress)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateScrollProgress() // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  const numSteps = processData.steps.length

  /**
   * Calculate card activation level (0 → 1)
   *
   * Each card has:
   * - Entry phase: fades in
   * - Active phase: fully visible
   * - Exit phase: fades out
   *
   * Phases overlap slightly for smooth transitions
   */
  const getCardActivation = (index: number): number => {
    const stepSize = 1 / numSteps
    const cardCenter = (index + 0.5) * stepSize

    // Distance from card's center point
    const distance = Math.abs(scrollProgress - cardCenter)

    // Activation range (card is active within ±40% of its window)
    const activationRange = stepSize * 0.6

    if (distance > activationRange) {
      return 0
    }

    // Calculate activation with smooth easing
    const rawActivation = 1 - distance / activationRange
    return easeInOutCubic(rawActivation)
  }

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative bg-white"
      style={{
        // Extended height ensures smooth completion
        // Each card needs space to fully activate/deactivate
        minHeight: '300vh',
      }}
    >
      {/* Sticky container stays in viewport */}
      <div className="sticky top-0 left-0 w-full h-screen flex items-center py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* LEFT: Card stack */}
            <div className="flex flex-col gap-6">
              {processData.steps.map((step, idx) => {
                const activation = getCardActivation(idx)
                const isActive = activation > 0.5

                return (
                  <div
                    key={idx}
                    className={`rounded-2xl p-8 ${
                      isActive ? 'bg-[#3c2515] shadow-xl' : 'bg-[#f4efe8] shadow-md'
                    }`}
                    style={{
                      opacity: 0.3 + activation * 0.7,
                      transform: `scale(${0.96 + activation * 0.04})`,
                      transition: 'background-color 0.6s ease, box-shadow 0.6s ease',
                    }}
                  >
                    <div
                      className={`text-3xl font-black mb-4 tracking-tight transition-colors duration-600 ${
                        isActive ? 'text-white/20' : 'text-[#c28b6e]'
                      }`}
                    >
                      {(idx + 1).toString().padStart(2, '0')}
                    </div>

                    <h3
                      className={`text-xl font-bold mb-4 transition-colors duration-600 ${
                        isActive ? 'text-white' : 'text-dark'
                      }`}
                    >
                      {step.title}
                    </h3>

                    <div
                      className="overflow-hidden"
                      style={{
                        maxHeight: `${activation * 200}px`,
                        opacity: activation,
                        transition: 'max-height 0.6s ease, opacity 0.6s ease',
                      }}
                    >
                      <p
                        className={`text-sm leading-relaxed ${isActive ? 'text-white/85' : 'text-dark-muted'}`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CENTER: Progress indicator */}
            <div className="hidden lg:flex relative h-[500px] w-12 flex-col items-center justify-start py-4">
              {/* Track */}
              <div className="absolute top-0 bottom-0 w-0.5 bg-[#f4efe8]" />

              {/* Fill */}
              <div
                className="absolute top-0 w-0.5 bg-[#3c2515]"
                style={{
                  height: `${scrollProgress * 100}%`,
                  transition: 'none', // No transition - driven by scroll
                }}
              />

              {/* Checkmark indicator */}
              <div
                className="absolute w-8 h-8 rounded-full bg-[#3c2515] text-white flex items-center justify-center z-10 ring-4 ring-white shadow-sm"
                style={{
                  top: `${scrollProgress * 100}%`,
                  transform: 'translateY(-50%)',
                  transition: 'none', // No transition - driven by scroll
                }}
              >
                <Check size={16} strokeWidth={3} />
              </div>
            </div>

            {/* RIGHT: Sticky heading */}
            <div className="flex flex-col items-start">
              <p className="text-xs font-medium uppercase tracking-[0.34em] text-dark-muted mb-4">
                {processData.label}
              </p>

              <h2 className="mb-6 leading-[0.9]">
                <span className="block text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
                  {processData.heading}
                </span>
                <span className="block capitalize font-[family-name:var(--font-allura)] text-[clamp(2.1rem,4vw,3.5rem)] leading-none italic text-accent">
                  {processData.script}
                </span>
              </h2>

              <p className="text-p text-dark-muted leading-relaxed max-w-sm">
                {processData.subheading}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
