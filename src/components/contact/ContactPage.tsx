import React from 'react'
import siteData from '@/website.json'
import { Button, Container } from '@/components/ui'
import { CTABanner } from '../homepage'

// const { company } = siteData;

export default function ContactPage() {
  // Shared classes for all input fields to ensure consistency
  const inputStyles =
    'w-full px-4 py-3 bg-transparent border border-divider rounded-none text-dark placeholder:text-dark-muted focus:outline-none focus:border-dark focus:ring-1 focus:ring-dark transition-colors'

  return (
    <section className="pt-16 ">
      <Container className="pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
          {/* LEFT COLUMN: Contact Information */}
          <div className="flex flex-col justify-center">
            <p className="text-xs font-medium uppercase tracking-[0.34em] text-dark-muted mb-2">
              Get In Touch
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-dark mb-6">
              Let's Build Something <br />
              <span className="font-[family-name:var(--font-allura)] text-5xl md:text-6xl text-accent font-normal capitalize">
                Amazing Together.
              </span>
            </h2>
            <p className="text-base text-dark-muted leading-relaxed mb-10 max-w-md">
              Whether you are ready to start your project or just have a few questions, our team is
              here to help. Reach out to us using the details below or fill out the form.
            </p>

            <div className="space-y-8">
              {/* Phone Block */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white border border-divider rounded-full text-accent mr-6">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-dark mb-1">
                    Call Us
                  </h4>
                  <p className="text-dark-muted">{'(555) 123-4567'}</p>
                </div>
              </div>

              {/* Email Block */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white border border-divider rounded-full text-accent mr-6">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-dark mb-1">
                    Email Us
                  </h4>
                  <p className="text-dark-muted">{'info@example.com'}</p>
                </div>
              </div>

              {/* Address Block */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white border border-divider rounded-full text-accent mr-6">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-dark mb-1">
                    Office Location
                  </h4>
                  <p className="text-dark-muted">{'123 Builders Lane, Suite 100'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Form */}
          <div className="bg-white px-8 py-8 shadow-sm border border-divider rounded-none">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-xs font-bold text-dark uppercase tracking-wider mb-2"
                  >
                    First Name
                  </label>
                  <input type="text" id="firstName" className={inputStyles} placeholder="John" />
                </div>
                {/* Last Name */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-xs font-bold text-dark uppercase tracking-wider mb-2"
                  >
                    Last Name
                  </label>
                  <input type="text" id="lastName" className={inputStyles} placeholder="Doe" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold text-dark uppercase tracking-wider mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={inputStyles}
                    placeholder="john@example.com"
                  />
                </div>
                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-bold text-dark uppercase tracking-wider mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className={inputStyles}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label
                  htmlFor="service"
                  className="block text-xs font-bold text-dark uppercase tracking-wider mb-2"
                >
                  Service of Interest
                </label>
                <div className="relative">
                  <select id="service" className={`${inputStyles} appearance-none cursor-pointer`}>
                    <option value="null" disabled selected>
                      Select a service...
                    </option>
                    <option value="kitchen">Kitchen Remodel</option>
                    <option value="bathroom">Bathroom Remodel</option>
                    <option value="addition">Home Addition</option>
                    <option value="custom">Custom Build</option>
                    <option value="other">Other</option>
                  </select>
                  {/* Custom Dropdown Chevron */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-dark">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-bold text-dark uppercase tracking-wider mb-2"
                >
                  Project Details
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className={`${inputStyles} resize-none`}
                  placeholder="Tell us a bit about your vision..."
                ></textarea>
              </div>

              {/* Submit Action */}
              <Button
                variant="outline"
                className="w-full py-4 text-sm tracking-wider uppercase rounded-none mt-2"
                type="submit"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </Container>
      <CTABanner />
    </section>
  )
}
