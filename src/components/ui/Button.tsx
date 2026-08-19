import React from 'react'

/**
 * Button
 * Uses semantic utility classes generated from builds.ts.
 *
 * The 'line' variant is a plain text link â€” uppercase label, arrow,
 * thin underline below â€” where the underline itself does a "liquid
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
  lg: 'px-8 py-3.5 text-body',
  md: 'px-6 py-2.5 text-body-sm',
  sm: 'px-4 py-2 text-body-sm',
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-accent hover:bg-primary-hover text-primary-foreground border border-transparent shadow-sm',
  outline: 'bg-transparent border border-border-strong text-foreground hover:bg-accent hover:text-primary-foreground',
  'outline-light':
    'bg-transparent border border-border-inverse-strong text-primary-foreground hover:bg-surface hover:text-foreground',
  ghost: 'bg-transparent border border-transparent text-foreground hover:bg-overlay-soft',
  line: '', // unreachable â€” Button() branches to LiquidUnderlineButton before this lookup
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 ring-focus/40 disabled:opacity-50 disabled:pointer-events-none'

function LiquidUnderlineButton({
  children,
  href,
  className = '',
  ...props
}: Omit<ButtonProps, 'variant' | 'size'>) {
  const wrapperClasses = `group relative inline-flex items-center gap-card pb-2 text-body-sm font-semibold uppercase tracking-wider text-foreground ${className}`

  const content = (
    <>
      <span className="relative z-10 inline-flex">{children}</span>

      {/* Underline track â€” own overflow-hidden strip so the sweep's
          off-screen rest position is truly invisible without clipping
          the text/arrow above it */}
      <span className="absolute inset-x-0 bottom-0 h-px overflow-hidden" aria-hidden="true">
        {/* Base underline â€” muted, always visible at rest */}
        <span className="absolute inset-0 bg-current opacity-30" />

        {/* Sweep layer â€” solid currentColor, slides in on hover,
            plain CSS transition reverses automatically on leave */}
        <span className="absolute inset-0 -translate-x-full transform bg-current transition-transform duration-button ease-button group-hover:translate-x-0" />
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


