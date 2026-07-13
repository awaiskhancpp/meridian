import React from 'react'
import siteData from '@/website.json'
import { Container } from '@/components/ui'

const { brand } = siteData

const footerLinks = [
  { label: 'About us', href: '#about' },
  { label: 'Services', href: '#hero' },
  { label: 'Why choose us', href: '#why-choose-us' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'Pinterest', href: '#' },
  { label: 'Behance', href: '#' },
  { label: 'LinkedIn', href: '#' },
]

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#f3ede3]">
      <Container>
        <div className="mx-auto w-full  py-8  lg:py-10">
          <div className="grid gap-8 px-5 py-6 backdrop-blur-sm sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-8">
            {/* Brand Section */}
            <div className="space-y-4 col-span-3">
              <div className="text-xl font-semibold tracking-[0.18em] text-dark">{brand.name}</div>
              <p className="max-w-sm text-sm leading-6 text-dark-muted">
                Warm, practical remodeling for kitchens, baths, and whole-home updates with a calm
                process and a finished result that feels lived in from day one.
              </p>
            </div>

            {/* Menu Section */}
            <div className="col-span-9 grid grid-cols-2 md:grid-cols-3">
              <div className="flex gap-2 lg:gap-0 flex-col md:flex-row">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-dark-muted min-w-[5rem] shrink-0">
                  Menu
                </p>
                <div className="mt-2 lg:mt-0 grid gap-3">
                  {footerLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-sm font-medium uppercase whitespace-nowrap tracking-[0.14em] text-dark transition-colors hover:text-accent"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Follow Us Section */}
              <div className="flex gap-2 lg:gap-4 flex-col md:flex-row">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-dark-muted min-w-[5rem] shrink-0">
                  Follow us
                </p>
                <div className="mt-2 lg:mt-0 grid gap-3 items-start">
                  {socialLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-sm font-medium uppercase tracking-[0.14em] text-dark transition-colors hover:text-accent"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact Section */}
              <div className="mt-4 md:mt-0 lg:gap-4 flex gap-2 flex-col md:flex-row">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-dark-muted min-w-[5rem] shrink-0">
                  Contact
                </p>
                <div className="mt-2 lg:mt-0 grid gap-3 text-sm leading-6 text-dark">
                  <p className="whitespace-nowrap">123 Artisan Lane</p>
                  <p className="whitespace-nowrap">New York, NY 10001</p>
                  <a
                    href="mailto:hello@renova.studio"
                    className="font-medium hover:text-accent whitespace-nowrap"
                  >
                    hello@renova.studio
                  </a>
                  <a
                    href="tel:+12125551234"
                    className="font-medium hover:text-accent whitespace-nowrap"
                  >
                    +1 (212) 555-1234
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-2 border-t border-[rgba(60,37,21,0.08)] px-5 pt-6 text-center text-xs text-dark-muted md:flex-row md:gap-3">
            <p>© 2026 KINETIC. All rights reserved.</p>
            <span className="hidden md:inline text-[rgba(60,37,21,0.2)]">|</span>
            <p>
              Designed and Developed by{' '}
              <a
                href="https://1realtour.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-dark transition-colors hover:text-accent"
              >
                1REALTOUR
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
