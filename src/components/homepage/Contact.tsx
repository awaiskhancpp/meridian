'use client'

import React, { useState } from 'react'
import siteData from '@/website.json'
import { Button, Container } from '@/components/ui'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import Image from 'next/image'
const { contact } = siteData

const AVAILABLE_SERVICES = [
  'Kitchen Remodeling',
  'Bathroom Remodeling',
  'Whole-Home Remodeling',
  'Home Additions',
  'Custom Cabinetry',
  'Flooring',
  'Design Consultation',
  'Project Planning',
  'Other',
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [formData, setFormData] = useState<{
    name: string
    phone: string
    email: string
    message: string
    service: string
  }>({
    name: '',
    phone: '',
    email: '',
    message: '',
    service: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  function handleServiceSelect(service: string) {
    setFormData((prev) => ({
      ...prev,
      service: prev.service === service ? '' : service,
    }))
    setIsDropdownOpen(false)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setServerError(null)
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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

  const commonClass =
    'w-full border-0 border-b border-border-inverse bg-transparent px-0 pb-2 text-body-sm text-primary-foreground outline-none placeholder:text-primary-foreground-muted focus:border-accent  focus:ring-0'

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative flex min-h-screen items-center section-padding"
    >
      {/* FULL WIDTH BACKGROUND IMAGE */}
      <Image src="/hero.webp" alt="" fill className="absolute inset-0 z-0 object-cover" />

      {/* OVERLAY */}
      <div className="absolute inset-0 z-0 bg-image-overlay" />

      <Container className="relative z-10 w-full">
        {/* RESPONSIVE CARD */}
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 bg-panel p-8 shadow-lg sm:p-12">
          {/* TOP: Heading Section (Centered) */}
          <div className="flex flex-col items-center text-center">
            <p className="text-caption uppercase tracking-wider text-primary-foreground-subtle">{contact.label}</p>
            <h2 id="contact-heading" className="mt-2">
              <span className="block heading-2 text-primary-foreground">{contact.heading}</span>
              <span className="text-script capitalize leading-normal text-primary-foreground">{contact.script}</span>
            </h2>
          </div>

          {/* BOTTOM: Form Section */}
          <div className="w-full">
            {submitted ? (
              <div className="flex h-form-success flex-col items-center justify-center rounded-none border border-border-inverse bg-primary-foreground p-6 backdrop-blur-sm">
                <p className="text-body-sm font-medium text-primary-foreground">
                  Thanks. Your message is in, and we will be in touch soon.
                </p>
                <br />
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: '', phone: '', email: '', message: '', service: '' })
                  }}
                  className="mt-4 text-body-sm font-semibold tracking-wider text-primary-foreground underline underline-offset-4 hover:text-accent"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="grid gap-8">
                {/* 2x2 GRID FOR TOP FIELDS */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <UnderlineField
                    id="contact-name"
                    label={contact.fields.name.label}
                    name="name"
                    placeholder={contact.fields.name.placeholder}
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <UnderlineField
                    id="contact-phone"
                    label={contact.fields.phone.label}
                    name="phone"
                    placeholder={contact.fields.phone.placeholder}
                    value={formData.phone}
                    onChange={handleChange}
                  />

                  <UnderlineField
                    id="contact-email"
                    label={contact.fields.email.label}
                    name="email"
                    type="email"
                    placeholder={contact.fields.email.placeholder}
                    value={formData.email}
                    onChange={handleChange}
                  />

                  {/* SERVICE DROPDOWN — single-select */}
                  <div className="relative grid gap-field">
                    <span className="text-caption uppercase tracking-wide text-primary-foreground">
                      Service of Interest
                    </span>

                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`${commonClass} flex h-12 w-full cursor-pointer items-center justify-between text-left`}
                    >
                      <span
                        className={`min-w-0 flex-1 truncate pr-4 ${
                          formData.service ? 'text-primary-foreground' : 'text-primary-foreground-muted'
                        }`}
                      >
                        {formData.service || 'Select a service...'}
                      </span>

                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-primary-foreground-muted transition-transform duration-standard ${
                          isDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu Container */}
                    {isDropdownOpen && (
                      <>
                        {/* Invisible backdrop to close dropdown when clicking outside */}
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setIsDropdownOpen(false)}
                        />

                        <div
                          role="listbox"
                          aria-label="Service of interest"
                          // Added classes to hide scrollbar across all major browsers
                          className="absolute left-0 top-full z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-none border border-border-inverse bg-primary py-2 shadow-lg scrollbar-hide"
                        >
                          {AVAILABLE_SERVICES.map((service) => {
                            const isSelected = formData.service === service

                            return (
                              <div
                                key={service}
                                role="option"
                                aria-selected={isSelected}
                                onClick={() => handleServiceSelect(service)}
                                className="flex cursor-pointer items-center gap-field px-4 py-3 transition-colors hover:bg-primary-foreground"
                              >
                                <span className="text-body-sm text-primary-foreground">{service}</span>
                              </div>
                            )
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* TEXTAREA AT THE END */}
                <UnderlineField
                  id="contact-message"
                  label={contact.fields.message.label}
                  name="message"
                  as="textarea"
                  rows={2}
                  placeholder={contact.fields.message.placeholder}
                  value={formData.message}
                  onChange={handleChange}
                />

                <div className="flex flex-col items-center gap-field">
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
                    className="max-w-fit rounded-none border-border-inverse text-primary-foreground hover:!bg-background hover:!text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? 'Sending…' : contact.submit}</span>
                    <ArrowUpRight size={20} />
                  </Button>
                </div>
              </form>
            )}
          </div>
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
}: FieldProps) {
  const commonClass =
    'w-full border-0 border-b border-border-inverse bg-transparent px-0 pb-2 text-body-sm text-primary-foreground outline-none placeholder:text-primary-foreground-muted focus:border-border-inverse focus:ring-0'

  return (
    <label htmlFor={id} className="grid gap-field">
      <span className="text-caption uppercase tracking-wide text-primary-foreground">{label}</span>
      {as === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
                          className={`${commonClass} min-h-36 resize-none rounded-none`}
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
