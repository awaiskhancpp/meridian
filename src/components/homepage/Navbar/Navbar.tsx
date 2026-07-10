'use client'

import React, { useState, useEffect } from 'react'
import { Button, Container } from '@/components/ui'
import siteData from '@/website.json'
import { colors } from '@/builds'
import Image from 'next/image'
const { nav, brand } = siteData

/**
 * Navbar
 *
 * Colors — semantic utilities + CSS vars from theme.generated.css:
 *   text-primary    → var(--color-text-primary)   #ffffff
 *   text-secondary  → var(--color-text-secondary) #a8bcc8  link text
 *   bg-dark         → var(--color-bg-dark)         scrolled bg base
 *
 * Raw colors.* values used only in style= for rgba opacity tints
 * (glass bg, border) that need specific alpha not covered by utilities.
 *
 * z-index: var(--z-navbar) = 50 (from builds.ts → @theme)
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[var(--z-navbar)] transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}
    >
      <Container>
        <nav
          className={`flex items-center justify-between rounded-full px-5 border backdrop-blur-md transition-colors duration-300 `}
          style={{
            borderColor: colors.navBorder,
            background: scrolled ? colors.navBg : colors.glassBg,
          }}
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Brand name */}
          {/* <a
            href="#hero"
            aria-label={`${brand.name} – go to homepage`}
            className="text-primary text-base font-semibold tracking-[0.18em] uppercase select-none"
          >
            {brand.name}
          </a> */}
          <Image src={nav.img} alt="" width={100} height={80} />

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {nav.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="px-4 py-1.5 rounded-full text-sm text-secondary hover:text-primary hover:bg-white/10 transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              href={nav.cta.href}
              className="tracking-wide text-xs uppercase"
            >
              {nav.cta.label}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`block w-5 h-0.5 bg-white rounded transition-transform duration-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span
              className={`block w-5 h-0.5 bg-white rounded transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-5 h-0.5 bg-white rounded transition-transform duration-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </button>
        </nav>

        {/* Mobile dropdown */}
        <div
          id="mobile-menu"
          className={`md:hidden mt-2 rounded-2xl border backdrop-blur-md overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
          style={{
            borderColor: colors.navBorder,
            background: colors.navBg,
          }}
        >
          <ul className="flex flex-col py-3" role="list">
            {nav.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-6 py-3 text-sm text-secondary hover:text-primary hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="px-6 pt-3 pb-2">
              <Button
                variant="outline"
                size="sm"
                href={nav.cta.href}
                className="w-full justify-center"
              >
                {nav.cta.label}
              </Button>
            </li>
          </ul>
        </div>
      </Container>
    </header>
  )
}
