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
      <div className="relative isolate h-[100svh] w-full overflow-hidden 2xl:h-[92svh]">
        <Image
          src={hero.backgroundImage}
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,24,18,0.38)_0%,rgba(34,24,18,0.18)_42%,rgba(34,24,18,0.74)_100%)]" />

        {/* <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" />
        <div className="pointer-events-none absolute inset-x-0 top-14 h-px bg-white/10 sm:top-16" />
        <div className="pointer-events-none absolute inset-y-0 left-24 hidden w-px bg-white/10 md:block" />
        <div className="pointer-events-none absolute inset-y-0 left-[42rem] hidden w-px bg-white/10 xl:block" />
        <div className="pointer-events-none absolute inset-y-0 right-6 hidden w-px bg-white/20 lg:block" /> */}
        <div className="pointer-events-none absolute inset-x-0 bottom-24 h-px bg-white/20 sm:bottom-26 lg:bottom-32" />

        <Container className="relative flex h-full flex-col justify-between pt-24 sm:pt-28 lg:pt-32 2xl:pt-24">
          <div className="flex justify-between gap-4" aria-hidden="true">
            <span className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-white/0">
              {hero.eyebrow}
            </span>
          </div>

          <div className="max-w-7xl pb-8 sm:pb-10 lg:pb-12">
            <h1 className="max-w-[40rem] text-white">
              <span className="text-[clamp(2.75rem,6.8vw,5.85rem)] font-bold uppercase leading-[0.9] tracking-[-0.06em] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.18)]">
                {hero.heading}{' '}
              </span>
              <span className="font-[family-name:var(--font-allura)] capitalize text-[clamp(3.1rem,7vw,6.1rem)] leading-[0.82] text-cream">
                {hero.script}
              </span>
            </h1>

            <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="grid max-w-[44rem] grid-cols-1 lg:grid-cols-2">
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/80">
                  About us
                </p>
                <div className="text-sm leading-6 text-white/85 max-w-[260px] sm:text-[0.95rem]">
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

      <Container className="mt-2">
        <div className="border border-[rgba(60,37,21,0.12)] bg-white px-4 py-5 shadow-[0_18px_48px_rgba(60,37,21,0.06)] sm:px-6 lg:px-8">
          {submitted ? (
            <div className="flex flex-wrap items-center gap-3 border-b border-[rgba(60,37,21,0.12)] pb-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
                OK
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
              className="grid gap-4  md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto]"
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
                    className="h-12 w-full appearance-none border-0 border-b border-[rgba(60,37,21,0.2)] bg-transparent px-0 pr-8 text-sm text-dark outline-none transition-colors placeholder:text-dark-muted focus:border-accent focus:ring-0"
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
                    className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-dark-muted"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-none border px-2 py-1 border-dark px-0 text-left text-sm font-semibold cursor-pointer uppercase tracking-[0.18em] text-dark transition-colors hover:border-accent hover:text-accent md:col-span-2 xl:col-span-1"
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

function HeroLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group inline-flex min-w-[11rem] items-center justify-between gap-6 border-b border-white/35 pb-2 text-sm font-medium uppercase tracking-[0.18em] text-white transition-colors hover:border-white hover:text-cream sm:min-w-[12rem]"
    >
      <span>{children}</span>
      <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
        -&gt;
      </span>
    </a>
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
        className="h-12 w-full border-0 border-b border-[rgba(60,37,21,0.2)] bg-transparent px-0 text-sm text-dark outline-none transition-colors placeholder:text-dark-muted focus:border-accent focus:ring-0"
      />
    </div>
  )
}
