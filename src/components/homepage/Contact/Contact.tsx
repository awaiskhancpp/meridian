'use client'

import React, { useState } from 'react'
import siteData from '@/website.json'
import { Button, Container } from '@/components/ui'
import { ArrowUpRight } from 'lucide-react'

const { contact } = siteData

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className=" pb-10  lg:pb-14">
      <Container>
        <div className="rounded-[30px] bg-white p-6 ">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-dark-muted">{contact.label}</p>
              <h2 id="contact-heading" className="mt-1">
                <span className="block text-[clamp(2.8rem,7vw,5.4rem)] font-black uppercase leading-[0.9] tracking-[-0.05em] text-dark">
                  {contact.heading}
                </span>
                <span className=" font-[family-name:var(--font-allura)] capitalize text-[clamp(3rem,6vw,4.8rem)] leading-none italic text-accent">
                  {contact.script}
                </span>
              </h2>
              <p className="mt-6 max-w-md text-p text-dark-muted">{contact.subheading}</p>
            </div>

            <div>
              {submitted ? (
                <div className="rounded-[24px] border h-[437px] border-[rgba(60,37,21,0.08)] flex justify-center items-center flex-col bg-cream p-6">
                  <p className="text-sm font-medium text-dark">
                    Thanks. Your message is in, and we will be in touch soon.
                  </p>
                  <br />
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: '', phone: '', email: '', message: '' })
                    }}
                    className="mt-4 text-sm font-semibold tracking-[0.12em] text-dark underline underline-offset-4 hover:text-accent"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="grid gap-6">
                  <UnderlineField
                    id="contact-name"
                    label={contact.fields.name.label}
                    name="name"
                    placeholder={contact.fields.name.placeholder}
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <div className="grid gap-6 sm:grid-cols-2">
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
                  </div>

                  <UnderlineField
                    id="contact-message"
                    label={contact.fields.message.label}
                    name="message"
                    as="textarea"
                    rows={3}
                    placeholder={contact.fields.message.placeholder}
                    value={formData.message}
                    onChange={handleChange}
                  />

                  <Button
                    variant="outline"
                    size="md"
                    type="submit"
                    className="max-w-fit rounded-sm"
                  >
                    <span>{contact.submit}</span>
                    <ArrowUpRight size={20} />
                  </Button>
                </form>
              )}
            </div>
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
