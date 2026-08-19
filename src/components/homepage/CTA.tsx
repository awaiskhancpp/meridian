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
    <section className="relative section-padding bg-background ">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="heading-2 text-foreground">
              {title}
            </h2>

            <p className="mt-4 text-body sm:text-body-lg leading-relaxed text-muted-foreground max-w-xl">
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
                  className="h-14 w-full rounded-none border border-accent bg-background px-4 pr-36 text-body-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-focus transition-colors"
                />

                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 rounded-none bg-accent px-6 text-caption font-semibold uppercase tracking-widest text-primary-foreground transition-colors duration-standard hover:bg-primary"
                >
                  Subscribe
                </button>
              </div>

              {/* Form Feedback */}
              <div className="mt-2 min-h-status">
                <p
                  className={`text-caption font-medium transition-opacity duration-200 ${
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

