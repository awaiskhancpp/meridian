import Link from 'next/link'
import { ArrowUpRight, Home } from 'lucide-react'
import { Navbar, Footer } from '@/components/homepage'
import { Button, Container } from '@/components/ui'

export const metadata = {
  title: 'Page Not Found | Meridian',
  description: 'The page you are looking for could not be found.',
}

/**
 * NotFoundPage (app/not-found.tsx)
 *
 * Next.js renders this automatically for any unmatched route, and it's
 * also what notFound() from next/navigation triggers on demand. It sits
 * inside the root layout, so fonts/global styles are already in place â€”
 * this file only needs its own content.
 *
 * Navbar is `fixed`, and unscrolled it renders white text (it's designed
 * to sit over a dark hero photo). Since this page has no hero image, the
 * hero-style section itself is given a dark warm background so the
 * unscrolled navbar text stays readable â€” same visual contract every
 * other page satisfies with a photo instead.
 */

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Service Areas', href: '/areas' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Contact', href: '/#contact' },
]

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section
        aria-label="Page not found"
        className="relative isolate flex min-h-viewport w-full items-center overflow-hidden bg-primary"
      >
        {/* Oversized decorative numeral, sized in vw so it scales with the
            viewport instead of overflowing on small screens; the section's
            overflow-hidden keeps it from ever causing horizontal scroll. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center heading-display text-primary-foreground-muted"
        >
          404
        </span>

        <div className="pointer-events-none absolute inset-0 bg-radial" />
        <div className="pointer-events-none absolute inset-x-0 bottom-24 h-px bg-primary-foreground-faint sm:bottom-28 lg:bottom-32" />

        <Container className="relative z-10 flex flex-col items-center pb-20 pt-28 text-center sm:pt-32 lg:pt-36">
          <p className="mb-4 text-caption font-medium uppercase tracking-wider text-primary-foreground-subtle">
            Error 404
          </p>

          <h1 className="max-w-4xl">
            <span className="heading-1 text-primary-foreground drop-shadow-hero">
              Page Not
            </span>{' '}
            <span className="heading-display-script text-surface-foreground">
              Found.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-body-sm leading-body text-secondary-foreground">
            The page you&apos;re looking for may have been moved, renamed, or never existed.
            Let&apos;s get you back on track.
          </p>

          <div className="mt-9 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
            <Button
              href="/"
              variant="outline-light"
              size="md"
              className="w-full sm:w-auto rounded-none"
            >
              <Home size={16} aria-hidden="true" />
              <span>Back to home</span>
            </Button>
            <Button href="/#contact" variant="line" className="text-primary-foreground">
              <span>Contact us</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </Button>
          </div>

          <nav
            aria-label="Quick links"
            className="mt-12 flex w-full max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-border-inverse pt-8"
          >
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-caption font-medium uppercase tracking-wider text-primary-foreground-subtle transition-colors hover:text-surface-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
