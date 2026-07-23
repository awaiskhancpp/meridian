'use client'

import { Container } from '../ui'
import { useState } from 'react'

interface CTABannerProps {
  title?: string
  description?: string
}

export default function CTA({
  title = "Let's Build Something Amazing Together",
  description = 'Subscribe to our newsletter for the latest updates, tips, and exclusive offers.',
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

    setTimeout(() => {
      setIsSubmitted(false)
      setEmail('')
    }, 3000)
  }

  return (
    <section className="relative py-10 lg:py-16 bg-white ">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-dark">
              {title}
            </h2>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-dark-muted max-w-xl">
              {description}
            </p>
          </div>

          {/* Form */}
          <div className="lg:col-span-5 w-full">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="relative flex items-center w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setEmailError('')
                  }}
                  placeholder="Enter your email"
                  className="h-14 w-full rounded-none border border-accent-light bg-white px-4 pr-36 text-sm text-dark placeholder:text-dark-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                />

                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 rounded-none bg-accent px-6 text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-dark"
                >
                  Subscribe
                </button>
              </div>

              {/* Form Feedback */}
              <div className="mt-2 min-h-[1.25rem]">
                <p
                  className={`text-xs font-medium transition-opacity duration-200 ${
                    emailError
                      ? 'text-status-danger opacity-100'
                      : isSubmitted
                        ? 'text-status-success opacity-100'
                        : 'opacity-0'
                  }`}
                >
                  {emailError || (isSubmitted ? 'Thank you for subscribing!' : 'Placeholder')}
                </p>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}
