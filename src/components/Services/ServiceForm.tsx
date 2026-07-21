'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui'
import { ArrowUpRight } from 'lucide-react'

/**
 * ServiceForm
 *
 * Same underline-field form language as homepage Contact.tsx — dark
 * panel, borderless inputs with a bottom rule, ArrowUpRight submit
 * button, same /api/contact endpoint (no new backend route needed).
 * UnderlineField is duplicated here rather than imported from
 * Contact.tsx, same reasoning as ServiceFaqs duplicating its
 * plus/minus icon rather than importing from the homepage Faq: this
 * component is wired to its own props (serviceTitle, heading text),
 * not Contact.tsx's siteData.contact source, so sharing the file would
 * mean threading unrelated data through it for no real benefit.
 *
 * No "service" dropdown — Contact.tsx has one because a visitor could
 * be asking about anything; here the visitor is already ON a specific
 * service's page, so which service they're asking about is already
 * known. It's shown back to them as a plain label instead of an
 * editable field, so it still reads as confirmation ("yes, this
 * request is about Kitchen Remodeling") without a redundant control.
 *
 * bg-dark (a solid color token from builds.ts), not a full-bleed photo
 * like Contact.tsx's hero-image background — this section sits
 * between several other sections on the service page rather than
 * being its own dedicated full-viewport moment, so a plain dark panel
 * keeps it substantial without competing with CTABanner's photo
 * treatment elsewhere on the same page. rounded-none throughout,
 * matching the no-rounded-corners convention already established
 * across this Services folder.
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
    // e.preventDefault()
    // setServerError(null)
    // setIsSubmitting(true)
    // try {
    //   const res = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ ...formData, service: serviceTitle }),
    //   })
    //   const data = await res.json()
    //   if (!res.ok) {
    //     setServerError(data.error ?? 'Something went wrong. Please try again.')
    //     return
    //   }
    //   setSubmitted(true)
    // } catch {
    //   setServerError('Network error. Please check your connection and try again.')
    // } finally {
    //   setIsSubmitting(false)
    // }
  }

  return (
    <section aria-labelledby="service-form-heading" className=" py-16 ">
      <div className="mx-auto grid w-full max-w-5xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16 lg:px-8">
        {/* ── Left: heading ── */}
        <div>
          <p className="text-xs uppercase tracking-[0.34em] text-accent">{label}</p>
          <h2
            id="service-form-heading"
            className="mt-3 text-[clamp(1.8rem,3.6vw,2.6rem)] font-black uppercase leading-[0.98] tracking-[-0.03em] text-accent"
          >
            {heading}
            <br />
            {serviceTitle}
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-accent">{subheading}</p>
        </div>

        {/* ── Right: form ── */}
        <div className="w-full rounded-none border border-light-soft bg-panel-dark p-6 shadow-lift sm:p-8">
          {submitted ? (
            <div className="flex min-h-[20rem] flex-col items-center justify-center text-center">
              <p className="text-sm font-medium text-white">
                Thanks. Your request for {serviceTitle} is in, and we'll be in touch soon.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false)
                  setFormData({ name: '', phone: '', email: '', message: '' })
                }}
                className="mt-4 text-sm font-semibold tracking-[0.12em] text-white underline underline-offset-4 hover:text-accent"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid gap-6">
              <p className="text-xs uppercase tracking-[0.22em] text-white/60">
                Requesting: <span className="text-white">{serviceTitle}</span>
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

              <div className="flex flex-col items-start gap-3">
                {serverError && (
                  <p className="text-sm text-red-300" role="alert">
                    {serverError}
                  </p>
                )}
                <Button
                  variant="outline"
                  size="md"
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-none border-light-muted text-white hover:!bg-white hover:!text-dark disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Sending…' : 'Send Request'}</span>
                  <ArrowUpRight size={20} />
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
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
    'w-full border-0 border-b border-light-muted bg-transparent px-0 pb-2 text-sm text-white outline-none placeholder:text-white/60 focus:border-accent focus:ring-0'

  return (
    <label htmlFor={id} className={`grid gap-3 ${className}`}>
      <span className="text-xs uppercase tracking-[0.22em] text-white">{label}</span>
      {as === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${commonClass} min-h-[7rem] resize-none rounded-none`}
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
