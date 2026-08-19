'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import siteData from '@/website.json'
import { Container } from '@/components/ui'
import { Button } from '@/components/ui'
import { ArrowUpRight } from 'lucide-react'

const { hero } = siteData

export default function Hero() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
  })

  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="hero" aria-label="Hero" className="w-full">
      <div className="relative isolate h-viewport w-full overflow-hidden">
        <Image
          src={hero.backgroundImage}
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="pointer-events-none absolute inset-x-0 bottom-32 h-px bg-primary-foreground-faint" />

                <Container className="relative flex h-full flex-col justify-between pt-24">
          <div className="flex justify-between gap-4" aria-hidden="true">
            <span className="text-caption font-medium uppercase tracking-wider text-primary-foreground opacity-0">
              {hero.eyebrow}
            </span>
          </div>

          <div className="">
            <h1 className="max-w-2xl text-primary-foreground">
              <span className="heading-display text-primary-foreground drop-shadow-hero">
                {hero.heading}{' '}
              </span>
              <span className="heading-display-script text-surface-foreground">
                {hero.script}
              </span>
            </h1>

            <div className="mt-8  lg:items-start pb-4 lg:pb-8">
              <div className="grid  grid-cols-1 gap-2 md:grid-cols-2">
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                  <p className="text-caption font-medium uppercase tracking-wider text-primary-foreground-subtle">
                    Start Your Project
                  </p>
                  <div className="max-w-xs text-body-sm leading-body text-secondary-foreground">
                    {hero.subheading}
                  </div>
                </div>
                <div className="inline-flex items-center gap-4  md:justify-self-end md:items-end">
                  <Button
                    variant="line"
                    href={hero.cta.href}
                    className="flex items-center gap-2 text-primary-foreground"
                  >
                    <span>{hero.cta.label}</span>
                    <ArrowUpRight size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
}
