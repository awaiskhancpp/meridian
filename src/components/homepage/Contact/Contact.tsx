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

  // Single-select now — picking a service replaces whatever was picked
  // before (there's only ever one, not an array), and the dropdown
  // closes immediately since there's nothing further to add. Clicking
  // the already-selected service again clears it, so there's still a
  // way to get back to "nothing selected" without a separate clear button.
  function handleServiceSelect(service: string) {
    setFormData((prev) => ({
      ...prev,
      service: prev.service === service ? '' : service,
    }))
    setIsDropdownOpen(false)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  const commonClass =
    'w-full border-0 border-b border-[rgba(60,37,21,0.32)] bg-transparent px-0 pb-2 text-sm text-dark outline-none placeholder:text-dark-muted focus:border-accent focus:ring-0'

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative flex min-h-[90vh] items-center py-16 lg:py-26"
    >
      {/* FULL WIDTH BACKGROUND IMAGE */}
      <Image src="/hero.webp" alt="" fill className="absolute inset-0 z-0 object-cover" />

      {/* OVERLAY */}
      <div className="absolute inset-0 z-0 bg-[#4A3424]/40" />

      <Container className="relative z-10 w-full">
        {/* RESPONSIVE CARD */}
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 bg-white  p-8 ">
          {/* TOP: Heading Section (Centered) */}
          <div className="flex flex-col items-center text-center">
            <p className="text-xs uppercase tracking-[0.34em] text-dark-muted">{contact.label}</p>
            <h2 id="contact-heading" className="mt-2">
              <span className="block text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
                {contact.heading}
              </span>
              <span className="font-[family-name:var(--font-allura)] capitalize text-[clamp(2.1rem,4vw,3.5rem)] leading-none italic text-accent">
                {contact.script}
              </span>
            </h2>
          </div>

          {/* BOTTOM: Form Section */}
          <div className="w-full">
            {submitted ? (
              <div className="flex h-[437px] flex-col items-center justify-center rounded-[24px] border border-[rgba(60,37,21,0.08)] bg-cream p-6">
                <p className="text-sm font-medium text-dark">
                  Thanks. Your message is in, and we will be in touch soon.
                </p>
                <br />
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: '', phone: '', email: '', message: '', service: '' })
                  }}
                  className="mt-4 text-sm font-semibold tracking-[0.12em] text-dark underline underline-offset-4 hover:text-accent"
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
                  <div className="relative grid gap-3">
                    <span className="text-xs uppercase tracking-[0.22em] text-dark-muted">
                      Service of Interest
                    </span>

                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`${commonClass} flex h-12 w-full cursor-pointer items-center justify-between text-left`}
                    >
                      <span
                        className={`flex-1 min-w-0 truncate pr-4 ${
                          formData.service ? 'text-dark' : 'text-dark-muted'
                        }`}
                      >
                        {formData.service || 'Select a service...'}
                      </span>

                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-dark-muted transition-transform duration-300 ${
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
                          className="absolute left-0 top-full z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-none border border-[rgba(60,37,21,0.1)] bg-white py-2 shadow-xl"
                        >
                          {AVAILABLE_SERVICES.map((service) => {
                            const isSelected = formData.service === service

                            return (
                              <div
                                key={service}
                                role="option"
                                aria-selected={isSelected}
                                onClick={() => handleServiceSelect(service)}
                                className="flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-[#f4efe8]"
                              >
                                <span className="text-sm text-dark">{service}</span>
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

                <Button
                  variant="outline"
                  size="md"
                  type="submit"
                  className="max-w-fit rounded-none text-dark-muted"
                >
                  <span>{contact.submit}</span>
                  <ArrowUpRight size={20} />
                </Button>
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
    'w-full border-0 border-b border-[rgba(60,37,21,0.32)] bg-transparent px-0 pb-2 text-sm text-dark outline-none placeholder:text-dark-muted focus:border-accent focus:ring-0'

  return (
    <label htmlFor={id} className="grid gap-3">
      <span className="text-xs uppercase tracking-[0.22em] text-dark-muted">{label}</span>
      {as === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${commonClass} min-h-[9rem] resize-none rounded-none`}
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
