'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link' // 1. Add this import
import { ArrowUpRight } from 'lucide-react'
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
    children: nav.services.map((service) => ({
      label: service.name,
      href: service.href,
    })),
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

  const menuRef = useRef<HTMLDivElement>(null)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (menuRef.current?.contains(target)) return
      if (toggleButtonRef.current?.contains(target)) return
      setMobileOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
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
    ? 'border-b border-nav bg-nav shadow-navbar backdrop-blur-md'
    : 'border-transparent bg-transparent shadow-none backdrop-blur-none'

  const textClasses = scrolled ? 'text-dark' : 'text-white'
  const mutedTextClasses = scrolled ? 'text-dark-muted' : 'text-white/82'
  const hoverTextClasses = scrolled ? 'hover:text-accent' : 'hover:text-cream'

  /*
    CTA design: unified with Contact.tsx's "Send Request" button —
    same shape (rounded-sm), same ArrowUpRight icon, same border→fill
    hover interaction. The only thing that changes is which existing
    Button variant is used, based on what's behind the navbar:

      - scrolled (solid white bar)   -> 'outline'       (dark border/text,
                                          hover fills solid accent — this
                                          is exactly Contact's button)
      - unscrolled (transparent, over
        the hero photo)             -> 'outline-light'  (white border/text,
                                          hover fills solid white — the
                                          palette-inverted mirror of
                                          'outline', for a dark backdrop)

    Both variants already implement the identical interaction (border-only
    at rest, solid fill on hover) — swapping between them is the correct
    fix, rather than the previous approach of force-overriding one
    variant's colors with `!important` and disabling its hover fill,
    which is what made this button feel inconsistent with Contact's in
    the first place.
  */
  const ctaVariant = scrolled ? 'outline' : 'outline-light'

  return (
    <header
      className={`fixed inset-x-0 top-0 w-full z-[var(--z-navbar)] transition-all duration-300 ${surfaceClasses}`}
    >
      <Container className="relative">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className={`flex items-center gap-3 ${textClasses}`}
            aria-label={brand.name}
          >
            {nav.img ? (
              <Image src={nav.img} alt={brand.name} width={112} height={80} />
            ) : (
              <span className="text-base font-semibold tracking-[0.22em]">{brand.name}</span>
            )}
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label} className="group relative">
                  <Link
                    href="/services"
                    className={`flex items-center gap-1 text-sm font-medium tracking-[0.12em] transition-colors ${textClasses} ${hoverTextClasses}`}
                  >
                    {item.label}
                    <ChevronIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </Link>

                  <div className="invisible absolute left-1/2 top-full z-10 w-[220px] -translate-x-1/2 translate-y-2 border border-subtle bg-white p-2 opacity-0 shadow-card transition-all duration-200 group-hover:visible group-hover:translate-y-3 group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-dark-muted transition-colors hover:bg-cream hover:text-dark"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`whitespace-nowrap text-sm font-medium tracking-[0.12em] transition-colors ${textClasses} ${hoverTextClasses}`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <div className="hidden lg:inline-flex">
            <Button
              variant={ctaVariant}
              href="/contact"
              className="whitespace-nowrap rounded-none text-dark-muted text-sm font-medium tracking-[0.12em]"
            >
              <span>Request a Quote</span>
              <ArrowUpRight size={18} />
            </Button>
          </div>

          <button
            type="button"
            ref={toggleButtonRef}
            onClick={() => setMobileOpen((value) => !value)}
            className={`inline-flex items-center gap-3 rounded-full text-sm font-semibold tracking-[0.24em] transition-colors lg:hidden ${
              scrolled ? 'text-accent hover:bg-cream' : 'text-white hover:bg-white-ghost'
            }`}
            aria-expanded={mobileOpen}
            aria-controls="main-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span>{nav.menuLabel}</span>
            <span className="relative flex h-4 w-4 items-center justify-center" aria-hidden="true">
              <span
                className={`absolute h-0.5 w-4  bg-current transition-transform duration-200 ${
                  mobileOpen ? 'rotate-45' : '-translate-y-1.5'
                }`}
              />
              <span
                className={`absolute h-0.5 w-4 bg-current transition-opacity duration-200 ${
                  mobileOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute h-0.5 w-4  bg-current transition-transform duration-200 ${
                  mobileOpen ? '-rotate-45' : 'translate-y-1.5'
                }`}
              />
            </span>
          </button>
        </div>

        <div
          id="main-menu"
          ref={menuRef}
          className={`absolute left-4 right-4 top-[calc(100%+0.75rem)] overflow-hidden border border-subtle bg-white shadow-menu transition-all duration-300 lg:hidden ${
            mobileOpen ? 'max-h-[40rem] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col p-5 sm:p-6">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label} className="border-b border-subtle last:border-none">
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
                  className="border-b border-subtle py-4 text-sm font-medium uppercase tracking-[0.14em] text-dark transition-colors last:border-none hover:text-accent"
                >
                  {item.label}
                </a>
              ),
            )}

            <div className="mt-4" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" size="md" href="/contact" className="w-full rounded-sm">
                <span>Request a Quote</span>
                <ArrowUpRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}
