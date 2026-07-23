import React from 'react'
import Image from 'next/image'
import siteData from '@/website.json'
import { Container } from '@/components/ui'

const { brand } = siteData

const footerLinks = [
  { label: 'About us', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Services', href: '#hero' },
  { label: 'Why choose us', href: '#why-choose-us' },
  { label: 'Our Projects', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'Pinterest', href: '#' },
  { label: 'Behance', href: '#' },
  { label: 'LinkedIn', href: '#' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
]

export default function Footer() {
  return (
    <footer id="footer" className=" ">
      <Container>
        <div className="mx-auto w-full py-8 ">
          <div className="grid grid-cols-1 gap-8 px-5 py-6 backdrop-blur-sm sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-6">
            {/* Brand Section */}
            <div className="space-y-4 lg:col-span-3">
              <div className="text-xl font-semibold tracking-[0.18em] text-dark">
                <Image src="/logo.png" alt="" width={120} height={100} />
              </div>
              <p className="max-w-sm text-sm leading-6 text-dark-muted">
                Warm, practical remodeling for kitchens, baths, and whole-home updates with a calm
                process and a finished result that feels lived in from day one.
              </p>
            </div>

            {/* Menu Section */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 md:grid-cols-3 lg:col-span-9 lg:gap-x-8">
              <div className="flex flex-col gap-2 lg:flex-row lg:gap-4">
                <p className="text-xs font-normal uppercase tracking-[0.28em] text-dark-muted ">
                  Menu
                </p>
                <div className="mt-2 grid content-start gap-2 lg:mt-0 lg:gap-2">
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
              <div className="flex flex-col gap-2 lg:flex-row lg:gap-4">
                <p className=" text-xs font-normal uppercase tracking-[0.28em] text-dark-muted">
                  Follow us
                </p>
                <div className="mt-2 grid content-start items-start gap-2 lg:mt-0 lg:gap-2">
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
              <div className="flex flex-col gap-3 sm:col-span-2 md:col-span-1 lg:flex-row lg:gap-2">
                <p className="text-xs font-normal uppercase tracking-[0.28em] text-dark-muted">
                  Contacts
                </p>
                <div className="mt-0 grid content-start text-sm  leading-6 text-dark">
                  <p className="max-w-[10rem] leading-[1.2]">
                    734 University Ave. Suite 205 San Diego, CA 92103
                  </p>

                  <a
                    href="mailto:hello@meridian.studio"
                    className="font-medium hover:text-accent  whitespace-nowrap"
                  >
                    hello@meridian.studio
                  </a>
                  <a
                    href="tel:+6193154591"
                    className="font-medium hover:text-accent whitespace-nowrap"
                  >
                    (619) 315-4591
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-center md:justify-between gap-2 border-t border-subtle px-5 pt-6 text-center text-xs text-dark-muted md:flex-row md:gap-3">
            <div className="flex flex-col md:flex-row gap-2">
              <p>© 2026 MERIDIAN. All rights reserved.</p>
              <span className="hidden md:inline text-border-strong">|</span>
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
            {/* <span className="hidden md:inline text-border-strong">|</span> */}
            <div className="flex items-center gap-3">
              {legalLinks.map((item, i) => (
                <React.Fragment key={item.label}>
                  {i > 0 && <span className="text-border-strong">|</span>}
                  <a href={item.href} className="transition-colors hover:text-accent">
                    {item.label}
                  </a>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
