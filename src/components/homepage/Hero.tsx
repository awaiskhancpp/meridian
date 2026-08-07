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
      <div className="relative isolate h-[100svh] w-full overflow-hidden 2xl:h-[100svh]">
        <Image
          src={hero.backgroundImage}
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-overlay-hero" />
        <div className="pointer-events-none absolute inset-x-0 bottom-24 h-px bg-white-faint sm:bottom-26 lg:bottom-32" />

        <Container className="relative flex h-full flex-col justify-between pt-24 sm:pt-28 lg:pt-32 2xl:pt-24">
          <div className="flex justify-between gap-4" aria-hidden="true">
            <span className="text-[0.68rem] font-medium uppercase tracking-label text-white opacity-0">
              {hero.eyebrow}
            </span>
          </div>

          <div className="max-w-[1440px] pb-8 sm:pb-10 lg:pb-12">
            <h1 className="max-w-[40rem] text-white">
              <span className="text-[clamp(2.75rem,6.8vw,5.85rem)] font-bold uppercase leading-[0.9] tracking-heading-subtle text-white drop-shadow-text-hero">
                {hero.heading}{' '}
              </span>
              <span className="font-family-script capitalize text-[clamp(3.1rem,7vw,6.1rem)] leading-[0.82] text-cream">
                {hero.script}
              </span>
            </h1>

            <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="grid max-w-[44rem] grid-cols-1 lg:grid-cols-2">
                <p className="text-xs font-medium uppercase tracking-label text-white-subtle">
                  Start Your Project
                </p>
                <div className="text-sm leading-6 text-secondary max-w-[260px] sm:text-[0.95rem]">
                  {hero.subheading}
                </div>
              </div>

              <div className="inline-flex items-center gap-x-2 md:gap-x-4 gap-y-4 lg:justify-center">
                <Button
                  variant="line"
                  href={hero.cta.href}
                  className="text-white flex gap-2 items-center"
                >
                  <span>{hero.cta.label}</span>
                  <ArrowUpRight size={20} />
                </Button>
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
