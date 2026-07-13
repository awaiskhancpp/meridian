import React from 'react'

/**
 * Button
 * Uses semantic utility classes generated from builds.ts.
 *
 * The 'line' variant is a plain text link — uppercase label, arrow,
 * thin underline below — where the underline itself does a "liquid
 * wipe": a solid currentColor line slides in from the left on hover,
 * covering a muted, always-visible base underline. Plain CSS, no JS:
 * a single `:hover`-driven transition reverses automatically on mouse
 * leave, which is exactly the symmetrical slide-back-out wanted.
 *
 * The sweep sits in its own small `overflow-hidden` track (not the
 * whole button) so its `-100%` rest position is actually invisible,
 * without risking clipping the text or arrow sitting above it.
 */

type Variant = 'primary' | 'outline' | 'outline-light' | 'ghost' | 'line'
type Size = 'lg' | 'md' | 'sm'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: React.ReactNode
  href?: string
}

const sizeClasses: Record<Size, string> = {
  lg: 'btn-padding-lg text-base',
  md: 'btn-padding-md text-sm',
  sm: 'btn-padding-sm text-sm',
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent hover:bg-accent-hover text-white border border-transparent shadow-[0_12px_28px_rgba(60,37,21,0.14)]',
  outline:
    'bg-transparent border border-[rgba(60,37,21,0.22)] text-dark hover:bg-accent hover:text-white',
  'outline-light':
    'bg-transparent border border-white/70 text-white hover:bg-white hover:text-dark',
  ghost: 'bg-transparent border border-transparent text-dark hover:bg-[rgba(60,37,21,0.06)]',
  line: '', // handled entirely by LiquidUnderlineButton below
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 ' +
  'cursor-pointer focus-visible:outline-none focus-visible:ring-2 ring-accent/40 disabled:opacity-50 disabled:pointer-events-none'

const WIPE_EASE = 'cubic-bezier(.22,1,.36,1)'

function LiquidUnderlineButton({
  children,
  href,
  className = '',
  ...props
}: Omit<ButtonProps, 'variant' | 'size'>) {
  const wrapperClasses =
    'group relative inline-flex items-center gap-3 pb-2 text-sm font-semibold uppercase tracking-[0.18em] text-dark ' +
    className

  const content = (
    <>
      <span className="relative z-10 inline-flex">{children}</span>

      {/* Underline track — own overflow-hidden strip so the sweep's
          off-screen rest position is truly invisible without clipping
          the text/arrow above it */}
      <span className="absolute inset-x-0 bottom-0 h-px overflow-hidden" aria-hidden="true">
        {/* Base underline — muted, always visible at rest */}
        <span className="absolute inset-0 bg-current opacity-30" />

        {/* Sweep layer — solid currentColor, slides in on hover,
            plain CSS transition reverses automatically on leave */}
        <span
          className="absolute inset-0 -translate-x-full transform bg-current transition-transform group-hover:translate-x-0"
          style={{ transitionDuration: '350ms', transitionTimingFunction: WIPE_EASE }}
        />
      </span>
    </>
  )

  if (href) {
    return (
      <a href={href} className={wrapperClasses}>
        {content}
      </a>
    )
  }

  return (
    <button className={wrapperClasses} {...props}>
      {content}
    </button>
  )
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  href,
  ...props
}: ButtonProps) {
  if (variant === 'line') {
    return (
      <LiquidUnderlineButton href={href} className={className} {...props}>
        {children}
      </LiquidUnderlineButton>
    )
  }

  const classes = `${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
