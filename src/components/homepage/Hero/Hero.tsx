'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button, Container } from '@/components/ui'
import siteData from '@/website.json'
import { colors } from '@/builds'

const { hero } = siteData
const { form } = hero

/**
 * Hero
 *
 * Uses semantic utilities from theme.generated.css:
 *  - text-h1, text-p (responsive typography from builds.ts fontSize/lineHeight)
 *  - text-primary, text-secondary, text-muted
 *  - bg-accent, bg-accent-hover (steel blue from colors.accent/accentHover)
 *
 * Background: full-section photo (hero.backgroundImage) with a bgDeep/bgDark
 * gradient overlay on top for legibility.
 *
 * Layout:
 *  - lg   : photo fills the viewport. Heading card sits near the bottom of the
 *           photo, and the form is absolutely positioned so it overlaps the
 *           bottom edge of the photo (unchanged from the desktop design).
 *  - sm/md: photo is a shorter block just tall enough for the heading card.
 *           The form is NOT absolutely positioned here — it's a normal
 *           sibling block on a white background, below the photo entirely.
 */
export default function Hero() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="hero" aria-label="Hero" className="relative w-full">
      {/* ── Photo block — shorter on sm/md, full viewport on lg ─────────── */}
      <div className="relative w-full overflow-hidden h-[100svh] sm:min-h-[620px] lg:min-h-screen flex flex-col bg-white">
        {/* Background photo — only rendered when website.json actually has a path set */}
        {hero.backgroundImage ? (
          <Image
            src={hero.backgroundImage}
            alt=""
            fill
            priority
            aria-hidden="true"
            className="object-cover "
          />
        ) : null}

        {/* Content */}
        <div className="relative z-10 flex flex-col flex-1">
          {/* Navbar spacer — spacing.navH from builds.ts */}
          <div className="h-14 md:h-16 lg:h-[72px]" aria-hidden="true" />

          {/* Heading card — pinned to the bottom of the photo, extra pb on lg
              to leave room for the form that overlaps this block on lg only */}
          <div className="flex-1 flex flex-col justify-end px-0 pt-10 pb-4 md:pb-8 lg:pb-26">
            <Container>
              <div className="max-w-sm md:max-w-md lg:max-w-lg">
                <div
                  className={`rounded-2xl p-6 md:p-8 border border-white/10 backdrop-blur-sm `}
                  style={{ background: colors.glassBg }}
                >
                  {/* h1 — text-h1 utility (responsive fontSize.h1 + lineHeight.h1) */}
                  <h1 className="text-h1 text-primary mb-3 md:mb-4">{hero.heading}</h1>

                  {/* Body — text-p utility + text-secondary */}
                  <p className="text-p text-secondary max-w-xs md:max-w-sm mb-6">
                    {hero.subheading}
                  </p>

                  <Button
                    variant="outline"
                    size="md"
                    href={hero.cta.href}
                    className="font-medium tracking-wide"
                  >
                    {hero.cta.label}
                  </Button>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>

      {/* ── Form block ────────────────────────────────────────────────────
          sm/md: normal flow, white background, renders below the photo
          lg   : absolutely positioned, overlaps the bottom edge of the photo,
                 transparent wrapper (the form panel itself carries the dark
                 glass background there)
      */}
      <div className="relative py-2 md:py-2 lg:py-0 lg:absolute lg:inset-x-0 lg:bottom-0 lg:pb-2 z-10 bg-white lg:bg-transparent">
        <Container>
          {submitted ? (
            <div
              className={`flex items-center gap-3 rounded-2xl border border-white/10 backdrop-blur-md px-5 py-4 ${colors.bgCard}cc`}
              role="status"
            >
              {/* Checkmark — accent color */}
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${colors.accent}33`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={colors.accent}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <p className="text-primary text-sm font-medium">
                Message sent! An agent will be in touch within 24&nbsp;hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false)
                  setFormData({ name: '', email: '', phone: '', service: '' })
                }}
                className="ml-auto shrink-0 text-muted hover:text-primary text-xs underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 ring-accent/50"
              >
                Send again
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Quick contact form"
              className="rounded-2xl border border-white/10 backdrop-blur-md p-3 md:p-4"
              style={{ background: `${colors.bgCard}cc` }}
            >
              <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row gap-2 md:gap-3 lg:items-center">
                {/* Name */}
                <div className="flex flex-col gap-1 lg:flex-1 min-w-0">
                  <label htmlFor="hero-name" className="sr-only">
                    {form.fields.name.label}
                  </label>
                  <input
                    id="hero-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder={form.fields.name.placeholder}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-primary placeholder-muted outline-none focus:border-accent/60 focus:bg-white/10 transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1 lg:flex-1 min-w-0">
                  <label htmlFor="hero-email" className="sr-only">
                    {form.fields.email.label}
                  </label>
                  <input
                    id="hero-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder={form.fields.email.placeholder}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-primary placeholder-muted outline-none focus:border-accent/60 focus:bg-white/10 transition-colors"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1 lg:flex-1 min-w-0">
                  <label htmlFor="hero-phone" className="sr-only">
                    {form.fields.phone.label}
                  </label>
                  <input
                    id="hero-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder={form.fields.phone.placeholder}
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-primary placeholder-muted outline-none focus:border-accent/60 focus:bg-white/10 transition-colors"
                  />
                </div>

                {/* Service — options need EXPLICIT bg/text classes.
                    Native <option> elements ignore most parent styling and
                    colorScheme in some browsers, so without this they render
                    with a white background and only show text on hover
                    (the browser's own highlight state). */}
                <div className="flex flex-col gap-1 lg:flex-1 min-w-0">
                  <label htmlFor="hero-service" className="sr-only">
                    {form.fields.service.label}
                  </label>
                  <select
                    id="hero-service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-primary outline-none focus:border-accent/60 focus:bg-white/10 transition-colors appearance-none cursor-pointer"
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="" disabled className="bg-card text-muted">
                      {form.fields.service.placeholder}
                    </option>
                    {form.fields.service.options.map((opt) => (
                      <option key={opt} value={opt} className="bg-card text-primary">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit — bg-accent, bg-accent-hover */}
                <button
                  type="submit"
                  className="md:col-span-2 lg:col-span-1 shrink-0 rounded-full bg-accent hover:bg-accent-hover active:scale-95 text-primary font-semibold text-sm px-7 py-3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 ring-accent/60"
                >
                  {form.submit}
                </button>
              </div>
            </form>
          )}
        </Container>
      </div>
    </section>
  )
}
