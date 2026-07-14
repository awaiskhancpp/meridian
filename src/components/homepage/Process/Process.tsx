'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Container } from '@/components/ui'
import siteData from '@/website.json'
import { Check } from 'lucide-react'

const { process: processData } = siteData

/**
 * Process Section
 *
 * LEFT: Scrollable container showing 1.5 cards with smooth scroll-synced activation
 * CENTER: Progress line that moves as you scroll through cards
 * RIGHT: Sticky heading
 *
 * Uses Intersection Observer for smooth activation detection
 */
export default function Process() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [containerScrollProgress, setContainerScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // Smooth scroll progress tracking with RAF
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let rafId: number
    let ticking = false

    const updateProgress = () => {
      if (!container) return

      const { scrollTop, scrollHeight, clientHeight } = container
      const maxScroll = scrollHeight - clientHeight

      if (maxScroll > 0) {
        const progress = scrollTop / maxScroll
        setContainerScrollProgress(progress)
      }

      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(updateProgress)
        ticking = true
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    updateProgress()

    return () => {
      container.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Intersection Observer for active card detection
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find card with highest intersection ratio near top of container
        let maxRatio = 0
        let maxIndex = 0

        entries.forEach((entry) => {
          const index = cardRefs.current.indexOf(entry.target as HTMLDivElement)
          if (index !== -1 && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            maxIndex = index
          }
        })

        if (maxRatio > 0.3) {
          setActiveIndex(maxIndex)
        }
      },
      {
        root: container,
        rootMargin: '-20% 0px -60% 0px', // Focus on top portion of container
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      },
    )

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="process" className="py-16 lg:py-32 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* LEFT: Scrollable container (1.5 cards visible) */}
          <div className="relative">
            {/* Fade mask at bottom */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              }}
            />

            <div
              ref={containerRef}
              className="h-[420px] overflow-y-auto pr-4 scrollbar-hide"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <div className="flex flex-col gap-6 pb-[200px]">
                {processData.steps.map((step, idx) => {
                  const isActive = activeIndex === idx
                  const isPast = idx < activeIndex
                  const isFuture = idx > activeIndex

                  return (
                    <div
                      key={idx}
                      ref={(el) => {
                        cardRefs.current[idx] = el
                      }}
                      className={`rounded-2xl p-8 transition-all duration-700 ease-in-out ${
                        isActive ? 'bg-[#3c2515] shadow-xl' : 'bg-[#f4efe8] shadow-md'
                      }`}
                      style={{
                        opacity: isActive ? 1 : isFuture ? 0.5 : 0.3,
                        transform: `scale(${isActive ? 1 : 0.97})`,
                      }}
                    >
                      <div
                        className={`text-3xl font-black mb-4 tracking-tight transition-colors duration-700 ${
                          isActive ? 'text-white/20' : 'text-[#c28b6e]'
                        }`}
                      >
                        {(idx + 1).toString().padStart(2, '0')}
                      </div>

                      <h3
                        className={`text-xl font-bold mb-4 transition-colors duration-700 ${
                          isActive ? 'text-white' : 'text-dark'
                        }`}
                      >
                        {step.title}
                      </h3>

                      {/* Description expands smoothly using grid-rows */}
                      <div
                        className={`grid transition-all duration-700 ease-in-out ${
                          isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p
                            className={`text-sm leading-relaxed transition-opacity duration-700 ${
                              isActive ? 'text-white/85 opacity-100' : 'text-transparent opacity-0'
                            }`}
                          >
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* CENTER: Progress line */}
          <div className="hidden lg:flex relative h-[420px] w-12 flex-col items-center justify-start py-4">
            {/* Track */}
            <div className="absolute top-0 bottom-0 w-0.5 bg-[#f4efe8]" />

            {/* Fill (driven by scroll, no transition) */}
            <div
              className="absolute top-0 w-0.5 bg-[#3c2515]"
              style={{
                height: `${containerScrollProgress * 100}%`,
              }}
            />

            {/* Checkmark indicator */}
            <div
              className="absolute w-8 h-8 rounded-full bg-[#3c2515] text-white flex items-center justify-center z-10 ring-4 ring-white shadow-sm"
              style={{
                top: `${containerScrollProgress * 100}%`,
                transform: 'translateY(-50%)',
              }}
            >
              <Check size={16} strokeWidth={3} />
            </div>
          </div>

          {/* RIGHT: Sticky heading */}
          <div className="flex flex-col items-start lg:sticky lg:top-32">
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

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
