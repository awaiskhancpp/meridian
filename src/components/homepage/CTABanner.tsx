'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui'
import { Button } from '@/components/ui'
import { ArrowUpRight } from 'lucide-react'

interface CTABannerProps {
  title?: string
  description?: string
  backgroundImage?: string
}

/**
 * CTABanner
 *
 * A call-to-action banner component for service detail pages.
 * Designed to encourage users to take the next step.
 *
 * Key design decisions:
 * - No rounded corners (as requested)
 * - Background image with overlay
 * - Left-aligned text
 * - Email input with validation
 * - Uses existing theme colors and typography
 * - Fully responsive
 */
export default function CTABanner({
  title = "Let's Build Something Amazing Together",
  description = 'Subscribe to our newsletter for the latest updates, tips, and exclusive offers.',
  backgroundImage = '/hero.webp',
}: CTABannerProps) {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setEmailError('Please enter your email')
      return
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address')
      return
    }

    setEmailError('')
    setIsSubmitted(true)
    // Handle form submission here
    setTimeout(() => {
      setIsSubmitted(false)
      setEmail('')
    }, 3000)
  }

  return (
    <section aria-label="Call to Action" className="relative section-padding">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src={backgroundImage} alt="" fill className="object-cover object-center" priority />
        {/* Dark overlay */}
        {/* Directional overlay */}
        <div className="absolute inset-0 bg-hero-overlay" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <h2 className="heading-2 text-primary-foreground">
            {title}
          </h2>

          <p className="mt-6 text-body-lg leading-relaxed text-secondary-foreground lg:text-body-lg">{description}</p>

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="max-w-xl">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setEmailError('')
                  }}
                  placeholder="Enter your email"
                  className="h-14 w-full rounded-none border border-border-inverse bg-background px-4 pr-36 text-accent placeholder:text-accent focus:border-accent focus:outline-none focus:ring-1 focus:ring-focus"
                />

                <button
                  type="submit"
                  className="absolute right-1 top-1 h-12 rounded-none bg-accent px-6 text-primary-foreground transition-colors duration-standard  hover:bg-primary hover:text-primary-foreground "
                >
                  Subscribe
                </button>
              </div>

              <div className="mt-2 h-5">
                <p
                  className={`text-body-sm ${
                    emailError
                      ? 'text-status-danger'
                      : isSubmitted
                        ? 'text-status-success'
                        : 'opacity-0'
                  }`}
                >
                  {emailError || (isSubmitted ? 'Thank you for subscribing!' : 'Placeholder')}
                </p>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </section>
  )
}

