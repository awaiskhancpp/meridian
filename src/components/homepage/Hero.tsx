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
      <div className="relative isolate h-full-viewport w-full overflow-hidden 2xl:h-full-viewport">
        <Image
          src={hero.backgroundImage}
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-overlay-hero" />
        <div className="pointer-events-none absolute inset-x-0 bottom-38 h-px bg-white-faint sm:bottom-26 lg:bottom-30" />

        <Container className="relative flex h-full flex-col justify-between hero-content-padding">
          <div className="flex justify-between gap-4" aria-hidden="true">
            <span className="type-eyebrow font-medium uppercase tracking-label text-white opacity-0">
              {hero.eyebrow}
            </span>
          </div>

          <div className="">
            <h1 className="max-hero text-white">
              <span className="type-hero-display font-bold uppercase leading-hero tracking-heading-subtle text-white drop-shadow-text-hero">
                {hero.heading}{' '}
              </span>
              <span className="font-script capitalize type-hero-script leading-script text-cream">
                {hero.script}
              </span>
            </h1>

            <div className="mt-8  lg:items-start pb-4 lg:pb-8">
              <div className="grid  grid-cols-1 gap-2 md:grid-cols-2">
                <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                  <p className="text-xs font-medium uppercase tracking-label text-white-subtle">
                    Start Your Project
                  </p>
                  <div className="max-w-narrow-copy text-sm leading-6 text-secondary sm:type-body">
                    {hero.subheading}
                  </div>
                </div>
                <div className="inline-flex items-center gap-4  md:justify-self-end md:items-end">
                  <Button
                    variant="line"
                    href={hero.cta.href}
                    className="flex items-center gap-2 text-white"
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
