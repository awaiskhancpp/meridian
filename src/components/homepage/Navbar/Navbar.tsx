'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import siteData from '@/website.json'
import { Button, Container } from '@/components/ui'

const { nav, brand } = siteData

type SimpleNavItem = { label: string; href: string; children?: never }
type DropdownNavItem = { label: string; href?: never; children: { label: string; href: string }[] }
type NavItem = SimpleNavItem | DropdownNavItem

const homeLink = nav.links.find((l) => l.label === 'Home')!
const serviceAreasLink = nav.links.find((l) => l.label === 'Service Areas')!
const remainingLinks = nav.links.filter((l) => l.label !== 'Home' && l.label !== 'Service Areas')

const NAV_ITEMS: NavItem[] = [
  homeLink,
  serviceAreasLink,
  {
    label: 'Services',
    children: nav.services.map((service) => ({ label: service, href: '#contact' })),
  },
  ...remainingLinks,
]

function ChevronIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) setMobileServicesOpen(false)
  }, [mobileOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const surfaceClasses = scrolled
    ? 'border-[rgba(60,37,21,0.08)] bg-white/95 shadow-[0_18px_48px_rgba(60,37,21,0.06)] backdrop-blur-md'
    : 'border-transparent bg-transparent shadow-none backdrop-blur-none'

  const textClasses = scrolled ? 'text-dark' : 'text-white'
  const mutedTextClasses = scrolled ? 'text-dark-muted' : 'text-white/82'
  const hoverTextClasses = scrolled ? 'hover:text-accent' : 'hover:text-cream'
  const borderClasses = scrolled ? 'border border-dark-muted ' : 'border border-white'

  return (
    <header className="fixed top-0 inset-x-0 z-[var(--z-navbar)] pt-4 lg:pt-6">
      <Container className="relative">
        <div
          className={`flex items-center justify-between gap-4 rounded-[28px] border px-5 py-2 transition-all duration-300 ${surfaceClasses}`}
        >
          <a
            href="#hero"
            className={`flex items-center gap-3 ${textClasses}`}
            aria-label={brand.name}
          >
            {nav.img ? (
              <Image src={nav.img} alt={brand.name} width={112} height={80} />
            ) : (
              <span className="text-base font-semibold tracking-[0.22em]">{brand.name}</span>
            )}
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label} className="group relative">
                  <button
                    type="button"
                    className={`flex items-center gap-1 text-sm font-medium tracking-[0.12em] transition-colors ${textClasses} ${hoverTextClasses}`}
                  >
                    {item.label}
                    <ChevronIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </button>

                  <div className="invisible absolute left-1/2 top-full z-10 w-[220px] -translate-x-1/2 translate-y-2 rounded-[20px] border border-[rgba(60,37,21,0.08)] bg-white p-2 opacity-0 shadow-[0_18px_48px_rgba(60,37,21,0.1)] transition-all duration-200 group-hover:visible group-hover:translate-y-3 group-hover:opacity-100">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block rounded-[12px] px-3 py-2 text-sm text-dark-muted transition-colors hover:bg-cream hover:text-dark"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className={`whitespace-nowrap text-sm font-medium tracking-[0.12em] transition-colors ${textClasses} ${hoverTextClasses}`}
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>

          {/* Desktop-only CTA — wrapped in a div carrying the hidden/lg:inline-flex
              toggle. Button's own base classes always include "inline-flex"
              (see Button.tsx), so passing "hidden lg:inline-flex" straight into
              Button's className competes with that base class on the SAME
              element for the same CSS property (display). Which one wins isn't
              determined by class order in the HTML — it's whatever order
              Tailwind happens to emit them in the compiled stylesheet — so
              "hidden" was silently losing below lg. Putting the toggle on a
              wrapper element sidesteps the conflict entirely. */}
          <div className="hidden lg:inline-flex">
            <Button
              variant="line"
              href="#contact"
              className={`whitespace-nowrap text-sm  font-medium tracking-[0.12em] transition-colors ${textClasses} ${hoverTextClasses}`}
            >
              Request a Quote
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className={`inline-flex items-center gap-3 rounded-full border  text-sm font-semibold tracking-[0.24em] transition-colors lg:hidden ${
              scrolled
                ? 'border-[rgba(60,37,21,0.14)] text-accent hover:bg-cream'
                : 'border-white/30 text-white hover:bg-white/10'
            }`}
            aria-expanded={mobileOpen}
            aria-controls="main-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span>{nav.menuLabel}</span>
            <span className="relative flex h-4 w-4 items-center justify-center" aria-hidden="true">
              <span
                className={`absolute h-0.5 w-4 rounded-full bg-current transition-transform duration-200 ${
                  mobileOpen ? 'rotate-45' : '-translate-y-1.5'
                }`}
              />
              <span
                className={`absolute h-0.5 w-4 rounded-full bg-current transition-opacity duration-200 ${
                  mobileOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute h-0.5 w-4 rounded-full bg-current transition-transform duration-200 ${
                  mobileOpen ? '-rotate-45' : 'translate-y-1.5'
                }`}
              />
            </span>
          </button>
        </div>

        <div
          id="main-menu"
          className={`absolute left-4 right-4 top-[calc(100%+0.75rem)] overflow-hidden rounded-[30px] border border-[rgba(60,37,21,0.08)] bg-white shadow-[0_28px_70px_rgba(60,37,21,0.12)] transition-all duration-300 lg:hidden ${
            mobileOpen ? 'max-h-[40rem] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col p-5 sm:p-6">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="border-b border-[rgba(60,37,21,0.08)] last:border-none"
                >
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((value) => !value)}
                    aria-expanded={mobileServicesOpen}
                    className="flex w-full items-center justify-between py-4 text-sm font-medium uppercase tracking-[0.14em] text-dark transition-colors hover:text-accent"
                  >
                    {item.label}
                    <ChevronIcon
                      className={`h-4 w-4 transition-transform duration-300 ${
                        mobileServicesOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-[max-height] duration-300 ease-out ${
                      mobileServicesOpen ? 'max-h-[24rem]' : 'max-h-0'
                    }`}
                  >
                    <div className="flex flex-col gap-1 pb-4 pl-3">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="py-2 text-sm text-dark-muted transition-colors hover:text-accent"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-[rgba(60,37,21,0.08)] py-4 text-sm font-medium uppercase tracking-[0.14em] text-dark transition-colors last:border-none hover:text-accent"
                >
                  {item.label}
                </a>
              ),
            )}

            <div className="mt-4" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" size="md" href="#contact" className="w-full">
                Request a Quote
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}
