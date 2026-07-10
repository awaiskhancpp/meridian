'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import siteData from '@/website.json'
import { Button, Container } from '@/components/ui'

const { nav, brand } = siteData

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className="relative z-[var(--z-navbar)] px-2 pt-4  lg:pt-6">
      <Container className="relative">
        <div className="flex items-center justify-between gap-4 rounded-[28px] border border-[rgba(60,37,21,0.08)] bg-white px-5  shadow-[0_18px_48px_rgba(60,37,21,0.06)]">
          <a href="#hero" className="flex items-center gap-3 text-dark" aria-label={brand.name}>
            {nav.img ? (
              <Image src={nav.img} alt={brand.name} width={112} height={80} />
            ) : (
              <span className="text-base font-semibold tracking-[0.22em]">{brand.name}</span>
            )}
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex items-center gap-3 rounded-full border border-[rgba(60,37,21,0.14)] px-4 py-2 text-sm font-semibold tracking-[0.24em] text-accent transition-colors hover:bg-cream"
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span>{nav.menuLabel}</span>
            <span className="relative flex h-4 w-4 items-center justify-center" aria-hidden="true">
              <span
                className={`absolute h-0.5 w-4 rounded-full bg-current transition-transform duration-200 ${
                  menuOpen ? 'rotate-45' : '-translate-y-1.5'
                }`}
              />
              <span
                className={`absolute h-0.5 w-4 rounded-full bg-current transition-opacity duration-200 ${
                  menuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute h-0.5 w-4 rounded-full bg-current transition-transform duration-200 ${
                  menuOpen ? '-rotate-45' : 'translate-y-1.5'
                }`}
              />
            </span>
          </button>
        </div>

        <div
          id="main-menu"
          className={`absolute left-4 right-4 top-[calc(100%+0.75rem)] overflow-hidden rounded-[30px] border border-[rgba(60,37,21,0.08)] bg-white shadow-[0_28px_70px_rgba(60,37,21,0.12)] transition-all duration-300 ${
            menuOpen ? 'max-h-[60rem] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
          }`}
        >
          <div className="grid gap-3 lg:gap-6 p-5 sm:p-6 lg:grid-cols-[0.76fr_0.94fr_1.3fr] lg:p-8">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.34em] text-dark-muted">Navigate</p>
              <ul className="divide-y divide-[rgba(60,37,21,0.08)]" role="list">
                {nav.links.map((link, index) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-4 text-dark transition-colors hover:text-accent"
                    >
                      <span className="flex items-center gap-4 text-sm font-medium tracking-[0.16em] uppercase">
                        <span className="w-7 text-xs text-dark-muted">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="hidden lg:block max-w-[18ch] text-sm leading-relaxed text-dark-muted">
                Thoughtful remodeling for kitchens, baths, additions, and whole-home
                transformations.
              </p>
            </div>

            <div className="space-y-6 lg:border-x lg:border-[rgba(60,37,21,0.08)] lg:px-8">
              <p className="text-xs uppercase tracking-[0.34em] text-dark-muted">Our services</p>
              {/*
                grid-cols-2 by default: below lg, this section stacks to
                the full width of the menu card (the outer grid only
                switches to the 3-column split at lg:), so there's ample
                horizontal room to run services in two columns instead of
                one long vertical list — cuts the section's height roughly
                in half on phones/tablets.

                lg:grid-cols-1: at lg this section is squeezed into the
                narrower middle slot of the 3-col split (0.94fr) with
                larger text (text-xl), so it reverts to a single column
                there to avoid two columns wrapping awkwardly in that
                tighter space.
              */}
              <ul className="grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-1 lg:gap-4" role="list">
                {nav.services.map((service) => (
                  <li key={service}>
                    <a
                      href="#contact"
                      onClick={() => setMenuOpen(false)}
                      className="block text-lg tracking-[0.12em] text-dark transition-colors hover:text-accent sm:text-[1.2rem]"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>

              {/*
                Wrapped in its own flex container rather than centering
                the Button directly (e.g. mx-auto) — Button likely renders
                with its own internal display type (inline-flex is common
                for button components), and margin-auto centering only
                works reliably on block-level elements. A wrapping flex
                container with justify-center controls the Button's
                position regardless of whatever display type it renders
                internally, so this works no matter how Button itself is
                implemented.
              */}
              <div className="flex justify-center lg:justify-start">
                <Button variant="primary" size="md" href="#contact" className="w-fit">
                  Request a Quote
                </Button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="overflow-hidden rounded-[24px] border border-[rgba(60,37,21,0.08)] bg-cream">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={nav.services.length > 0 ? '/hero.webp' : '/hero.webp'}
                    alt=""
                    fill
                    aria-hidden="true"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-dark-muted">Latest work</p>
                  <p className="mt-2 text-sm text-dark">
                    Kitchens and baths designed to feel calm, practical, and refined.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}
