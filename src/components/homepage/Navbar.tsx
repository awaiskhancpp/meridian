'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import siteData from '@/website.json'
import { Button, Container } from '@/components/ui'
import { getAllProjects } from '@/lib/projects'

const { nav, brand } = siteData

type SimpleNavItem = { label: string; href: string; children?: never }
type DropdownNavItem = {
  label: string
  href?: string
  children: { label: string; href: string }[]
  seeMore?: { label: string; href: string }
}
type NavItem = SimpleNavItem | DropdownNavItem

const homeLink = nav.links.find((l) => l.label === 'Home')!
const serviceAreasLink = nav.links.find((l) => l.label === 'Service Areas')!
const remainingLinks = nav.links.filter(
  (l) => l.label !== 'Home' && l.label !== 'Service Areas' && l.label !== 'Projects',
)

const NAV_ITEMS: NavItem[] = [
  homeLink,
  serviceAreasLink,
  {
    label: 'Services',
    href: '/services',
    children: nav.services.map((service) => ({
      label: service.name,
      href: service.href,
    })),
  },
  {
    label: 'Projects',
    href: '/projects',
    children: getAllProjects()
      .slice(0, 6)
      .map((project) => ({ label: project.title, href: project.href })),
    seeMore: { label: 'See all projects', href: '/projects' },
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
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    // Prevent body scroll when full-screen menu is open
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = 'unset'
    }
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
    if (!mobileOpen) setOpenMobileDropdown(null)
  }, [mobileOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // FIX 1: The header must become solid white (bg-nav) if scrolled OR if the mobile menu is open.
  const isSolid = scrolled || mobileOpen

  const surfaceClasses = isSolid
    ? 'border-b border-nav bg-nav shadow-navbar backdrop-blur-md'
    : 'border-transparent bg-transparent shadow-none backdrop-blur-none'

  const textClasses = isSolid ? 'text-dark' : 'text-white'
  const hoverTextClasses = isSolid ? 'hover:text-accent' : 'hover:text-cream'
  const ctaVariant = isSolid ? 'outline' : 'outline-light'

  return (
    <header
      className={`fixed inset-x-0 top-0 w-full z-[var(--z-navbar)] transition-all duration-300 ${surfaceClasses}`}
    >
      {/* Container wraps ONLY the top navbar area now */}
      <Container className="relative">
        <div className="flex items-center justify-between gap-4 py-3 lg:py-0">
          <Link
            href="/"
            className={`flex items-center gap-3 p-1 ${textClasses}`}
            aria-label={brand.name}
          >
            {nav.img ? (
              <Image src={nav.img} alt={brand.name} width={70} height={70} />
            ) : (
              <span className="text-base font-semibold tracking-[0.22em]">{brand.name}</span>
            )}
          </Link>

          <nav className="hidden items-center gap-8 lg:flex h-full">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label} className="group relative py-8">
                  <Link
                    href={item.href ?? '#'}
                    className={`flex items-center gap-1 text-sm font-medium tracking-[0.12em] transition-colors ${textClasses} ${hoverTextClasses}`}
                  >
                    {item.label}
                    <ChevronIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </Link>

                  <div className="invisible absolute left-1/2 top-[85%] z-10 w-[220px] -translate-x-1/2 translate-y-2 border border-subtle bg-white p-2 opacity-0 shadow-card transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-dark-muted transition-colors hover:bg-cream hover:text-dark"
                      >
                        {child.label}
                      </Link>
                    ))}
                    {item.seeMore ? (
                      <Link
                        href={item.seeMore.href}
                        className="mt-1 block border-t border-subtle px-3 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent transition-colors hover:bg-cream"
                      >
                        {item.seeMore.label}
                      </Link>
                    ) : null}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`whitespace-nowrap text-sm font-medium tracking-[0.12em] transition-colors py-8 ${textClasses} ${hoverTextClasses}`}
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
            className={`inline-flex items-center gap-3 rounded-none text-sm font-semibold tracking-[0.24em] transition-colors lg:hidden ${
              isSolid ? 'text-accent hover:bg-cream' : 'text-white hover:bg-white-ghost'
            }`}
            aria-expanded={mobileOpen}
            aria-controls="main-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span>{nav.menuLabel}</span>
            <span className="relative flex h-4 w-4 items-center justify-center" aria-hidden="true">
              <span
                className={`absolute h-0.5 w-4 bg-current transition-transform duration-200 ${
                  mobileOpen ? 'rotate-45' : '-translate-y-1.5'
                }`}
              />
              <span
                className={`absolute h-0.5 w-4 bg-current transition-opacity duration-200 ${
                  mobileOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute h-0.5 w-4 bg-current transition-transform duration-200 ${
                  mobileOpen ? '-rotate-45' : 'translate-y-1.5'
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      {/* FIX 2 & 3: Menu moved outside Container for edge-to-edge width, using 100dvh for height */}
      <div
        id="main-menu"
        ref={menuRef}
        className={`absolute left-0 right-0 top-full w-full overflow-y-auto bg-white border-t border-subtle transition-all duration-300 ease-in-out lg:hidden ${
          mobileOpen
            ? 'h-[calc(100dvh-100%)] opacity-100'
            : 'h-0 opacity-0 pointer-events-none border-transparent'
        }`}
      >
        <Container>
          {/* pb-32 gives breathing room at the bottom so the last item isn't glued to the phone's edge */}
          <div className="flex flex-col py-6 pb-32">
            {NAV_ITEMS.map((item) => {
              const isDropdownOpen = openMobileDropdown === item.label

              return item.children ? (
                <div key={item.label} className="border-b border-subtle last:border-none">
                  <button
                    type="button"
                    onClick={() => setOpenMobileDropdown(isDropdownOpen ? null : item.label)}
                    aria-expanded={isDropdownOpen}
                    className="flex w-full items-center justify-between py-5 text-sm font-medium uppercase tracking-[0.14em] text-dark transition-colors hover:text-accent"
                  >
                    {item.label}
                    <ChevronIcon
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-[max-height] duration-300 ease-out ${
                      isDropdownOpen ? 'max-h-[30rem]' : 'max-h-0'
                    }`}
                  >
                    <div className="flex flex-col gap-1 pb-5 pl-4 border-l border-subtle ml-2 mb-2">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="py-2.5 text-sm text-dark-muted transition-colors hover:text-accent"
                        >
                          {child.label}
                        </a>
                      ))}
                      {item.seeMore ? (
                        <a
                          href={item.seeMore.href}
                          onClick={() => setMobileOpen(false)}
                          className="mt-2 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent"
                        >
                          {item.seeMore.label}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-subtle py-5 text-sm font-medium uppercase tracking-[0.14em] text-dark transition-colors last:border-none hover:text-accent"
                >
                  {item.label}
                </a>
              )
            })}

            <div className="mt-8" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" size="md" href="/contact" className="w-full rounded-none">
                <span>Request a Quote</span>
                <ArrowUpRight size={18} />
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </header>
  )
}
