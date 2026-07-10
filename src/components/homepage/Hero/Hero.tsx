'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import siteData from '@/website.json'
import { Button, Container } from '@/components/ui'

const { hero, brand } = siteData

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
    <section id="hero" aria-label="Hero" className="px-4 pb-8 pt-4 sm:px-6 lg:px-8 lg:pb-10">
      <Container>
        <div className="overflow-hidden rounded-[36px] border border-[rgba(255,255,255,0.12)] bg-deep shadow-[0_36px_100px_rgba(60,37,21,0.22)]">
          <div className="relative isolate min-h-[34rem] sm:min-h-[40rem] lg:min-h-[44rem]">
            <Image
              src={hero.backgroundImage}
              alt=""
              fill
              priority
              aria-hidden="true"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(29,18,11,0.35)_0%,rgba(60,37,21,0.62)_55%,rgba(60,37,21,0.82)_100%)]" />

            <div className="relative flex min-h-[34rem] flex-col justify-end px-5 py-6 sm:min-h-[40rem] sm:px-8 sm:py-8 lg:min-h-[44rem] lg:px-10 lg:py-10">
              <div className="max-w-[38rem] rounded-[30px] border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.14)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-md sm:p-5">
                <p className="text-xs uppercase tracking-[0.34em] text-cream/90">{brand.tagline}</p>

                <h1 className="mt-2 text-white">
                  <span className="block text-[clamp(2.8rem,7vw,5.9rem)] font-bold uppercase leading-[0.88] tracking-[-0.04em]">
                    {hero.heading}
                  </span>
                  <span className="mt-1 block font-[family-name:var(--font-allura)] text-[clamp(3rem,7.2vw,5.8rem)] leading-none italic text-cream">
                    {hero.script}
                  </span>
                </h1>

                <p className="mt-4 max-w-[32rem] text-p text-[rgba(255,255,255,0.88)]">
                  {hero.subheading}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={hero.cta.href}
                    className="inline-flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.22)] px-5 py-3 text-sm font-semibold tracking-[0.16em] text-cream transition-colors hover:border-[rgba(255,255,255,0.45)] hover:bg-[rgba(255,255,255,0.08)]"
                  >
                    {hero.cta.label}
                  </a>
                  <a
                    href="#about"
                    className="inline-flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.22)] px-5 py-3 text-sm font-semibold tracking-[0.16em] text-cream transition-colors hover:border-[rgba(255,255,255,0.45)] hover:bg-[rgba(255,255,255,0.08)]"
                  >
                    Learn About Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 rounded-[28px] border border-[rgba(60,37,21,0.08)] bg-white px-4 py-4 shadow-[0_18px_48px_rgba(60,37,21,0.08)] sm:px-6">
          {submitted ? (
            <div className="flex flex-wrap items-center gap-3 rounded-[22px] border border-[rgba(60,37,21,0.08)] bg-cream px-5 py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
                ✓
              </span>
              <p className="text-sm font-medium text-dark">
                Thanks. We received your request and will follow up shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false)
                  setFormData({ name: '', email: '', phone: '', service: '' })
                }}
                className="ml-auto text-sm font-medium text-dark-muted underline underline-offset-4 transition-colors hover:text-dark"
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-end"
            >
              <Field
                id="hero-name"
                label={hero.form.fields.name.label}
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={hero.form.fields.name.placeholder}
              />
              <Field
                id="hero-email"
                label={hero.form.fields.email.label}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={hero.form.fields.email.placeholder}
              />
              <Field
                id="hero-phone"
                label={hero.form.fields.phone.label}
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder={hero.form.fields.phone.placeholder}
              />
              <div className="min-w-0">
                <label
                  htmlFor="hero-service"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-dark-muted"
                >
                  {hero.form.fields.service.label}
                </label>
                <div className="relative">
                  <select
                    id="hero-service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="h-12 w-full appearance-none rounded-full border border-[rgba(60,37,21,0.18)] bg-[rgba(60,37,21,0.03)] px-4 pr-10 text-sm text-dark outline-none transition-colors placeholder:text-dark-muted focus:border-accent"
                  >
                    <option value="" disabled>
                      {hero.form.fields.service.placeholder}
                    </option>
                    {hero.form.fields.service.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-dark-muted"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[rgba(60,37,21,0.18)] bg-accent px-6 text-sm font-semibold tracking-[0.18em] text-white transition-colors hover:bg-accent-hover"
              >
                {hero.form.submit}
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
}

function Field({ id, label, ...props }: FieldProps) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-dark-muted"
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="h-12 w-full rounded-full border border-[rgba(60,37,21,0.18)] bg-[rgba(60,37,21,0.03)] px-4 text-sm text-dark outline-none transition-colors placeholder:text-dark-muted focus:border-accent"
      />
    </div>
  )
}
