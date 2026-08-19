'use client'

import React, { useState } from 'react'
import { Button, Container } from '@/components/ui'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

/**
 * ServiceForm
 *
 * Same underline-field form language as homepage Contact.tsx — dark
 * panel, borderless inputs with a bottom rule, ArrowUpRight submit
 * button, same /api/contact endpoint.
 *
 * Left-column color hierarchy: text-accent and text-foreground are the
 * SAME hex (#3C2515) — using text-accent for the eyebrow label AND
 * the subheading paragraph meant they rendered in the exact same
 * full-strength color as the giant heading, with zero tonal contrast
 * between "quiet label," "loud heading," and "quiet supporting text."
 * Every other section in this codebase (Faq.tsx, Process.tsx,
 * Blogs.tsx, Testimonials.tsx) uses text-muted-foreground (#6F513D — a
 * genuinely different, softer shade) for exactly the label + body-copy
 * roles, reserving the strong color for the heading only. Matched
 * that convention here instead.
 */

interface ServiceFormProps {
  serviceTitle: string
  label?: string
  heading?: string
  script?: string
  subheading?: string
}

export default function ServiceForm({
  serviceTitle,
  label = 'Get In Touch',
  heading = 'Request a Quote For',
  subheading = "Tell us a bit about your project and we'll follow up within one business day.",
}: ServiceFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setServerError(null)
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, service: serviceTitle }),
      })

      const data = await res.json()

      if (!res.ok) {
        setServerError(data.error ?? 'Something went wrong. Please try again.')
        return
      }

      setSubmitted(true)
    } catch {
      setServerError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section aria-labelledby="service-form-heading" className="relative section-padding">
      <Image src="/hero.webp" alt="" fill className="absolute inset-0 z-0 object-cover" />

      {/* OVERLAY */}
      <div className="absolute inset-0 z-0 bg-overlay-strong" />

      {/* ADDED relative z-10 HERE */}
      <Container className="relative z-10 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        {/* ── Left: heading ── */}
        <div className="col-span-6">
          <p className="text-caption uppercase tracking-wider text-primary-foreground">{label}</p>
          <h2
            id="service-form-heading"
            className="mt-3 heading-form text-primary-foreground"
          >
            {heading}
            <br />
            {serviceTitle}
          </h2>
          <p className="mt-4 max-w-sm text-body-sm leading-relaxed text-secondary-foreground">{subheading}</p>
        </div>

        <div className="col-span-6 w-full rounded-none border border-border-inverse bg-panel p-6 shadow-sm sm:p-8">
          {submitted ? (
            <div className="flex min-h-form-success flex-col items-center justify-center text-center">
              <p className="text-body-sm font-medium text-primary-foreground">
                Thanks. Your request for {serviceTitle} is in, and we'll be in touch soon.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false)
                  setFormData({ name: '', phone: '', email: '', message: '' })
                }}
                className="mt-4 text-body-sm font-semibold tracking-wider text-primary-foreground underline underline-offset-4 hover:text-accent"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid gap-6">
              <p className="text-caption uppercase tracking-wide text-primary-foreground-muted">
                Requesting: <span className="text-primary-foreground">{serviceTitle}</span>
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                <UnderlineField
                  id="service-form-name"
                  label="Name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <UnderlineField
                  id="service-form-phone"
                  label="Phone"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <UnderlineField
                  id="service-form-email"
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="sm:col-span-2"
                />
              </div>

              <UnderlineField
                id="service-form-message"
                label="Message"
                name="message"
                as="textarea"
                rows={3}
                placeholder={`Tell us about your ${serviceTitle.toLowerCase()} project`}
                value={formData.message}
                onChange={handleChange}
              />

              <div className="flex flex-col items-start gap-field">
                {serverError && (
                  <p className="text-body-sm text-status-danger" role="alert">
                    {serverError}
                  </p>
                )}
                <Button
                  variant="outline"
                  size="md"
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-none border-border-inverse text-primary-foreground hover:!bg-primary-foreground-high hover:!text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Sending…' : 'Send Request'}</span>
                  <ArrowUpRight size={20} />
                </Button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}

type FieldProps = {
  id: string
  label: string
  name: string
  placeholder: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  type?: string
  as?: 'input' | 'textarea'
  rows?: number
  className?: string
}

function UnderlineField({
  id,
  label,
  name,
  placeholder,
  value,
  onChange,
  type = 'text',
  as = 'input',
  rows = 1,
  className = '',
}: FieldProps) {
  const commonClass =
    'w-full border-0 border-b border-border-inverse bg-transparent px-0 pb-2 text-body-sm text-primary-foreground outline-none placeholder:text-primary-foreground-muted focus:border-border-inverse focus:ring-0'

  return (
    <label htmlFor={id} className={`grid gap-field ${className}`}>
      <span className="text-caption uppercase tracking-wide text-primary-foreground">{label}</span>
      {as === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${commonClass} min-h-28 resize-none rounded-none`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${commonClass} h-12`}
        />
      )}
    </label>
  )
}
