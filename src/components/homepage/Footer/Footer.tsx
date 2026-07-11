import React from 'react'
import siteData from '@/website.json'

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
    <footer id="footer" className="w-full border-t border-[rgba(60,37,21,0.08)] bg-bg-cream">
      <div className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-8 border border-[rgba(60,37,21,0.08)] bg-[rgba(255,255,255,0.42)] px-5 py-6 backdrop-blur-sm sm:px-6 lg:grid-cols-[1.1fr_0.8fr_0.8fr_1fr] lg:gap-10 lg:px-8 lg:py-8">
          <div className="space-y-4">
            <div className="text-xl font-semibold tracking-[0.18em] text-dark">{brand.name}</div>
            <p className="max-w-sm text-sm leading-6 text-dark-muted">
              Warm, practical remodeling for kitchens, baths, and whole-home updates with a calm
              process and a finished result that feels lived in from day one.
            </p>
          </div>

          <div className="grid grid-cols-2">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-dark-muted">
              Menu
            </p>
            <div className="mt-2 lg:mt-0  grid gap-3">
              {footerLinks.map((item) => (
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

          <div className="grid grid-cols-2">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-dark-muted">
              Follow us
            </p>
            <div className="mt-2 lg:mt-0  grid gap-3 items-start">
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

          <div className="grid grid-cols-2">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-dark-muted">
              Contact
            </p>
            <div className="mt-2 lg:mt-0 grid gap-3 text-sm leading-6 text-dark">
              <p>123 Artisan Lane</p>
              <p>New York, NY 10001</p>
              <a href="mailto:hello@renova.studio" className="font-medium hover:text-accent">
                hello@renova.studio
              </a>
              <a href="tel:+12125551234" className="font-medium hover:text-accent">
                +1 (212) 555-1234
              </a>
            </div>
          </div>
        </div>

        {/* <div className="mt-6 border-t border-[rgba(60,37,21,0.08)] pt-4">
          <p className="font-[family-name:var(--font-allura)] text-[clamp(2.4rem,5vw,5rem)] leading-none text-accent/20">
            GET IN TOUCH - GET IN TOUCH - GET IN TOUCH
          </p>
        </div> */}
      </div>
    </footer>
  )
}
