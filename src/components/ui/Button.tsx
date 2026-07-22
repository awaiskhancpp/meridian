import React from 'react'
import { buttonClasses } from '@/builds'

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

const sizeClasses: Record<Size, string> = buttonClasses.sizes

const variantClasses: Record<Variant, string> = {
  primary: buttonClasses.variants.primary,
  outline: buttonClasses.variants.outline,
  'outline-light': buttonClasses.variants.outlineLight,
  ghost: buttonClasses.variants.ghost,
  line: '', // handled entirely by LiquidUnderlineButton below
}

const base = buttonClasses.base

function LiquidUnderlineButton({
  children,
  href,
  className = '',
  ...props
}: Omit<ButtonProps, 'variant' | 'size'>) {
  const wrapperClasses = `${buttonClasses.line} ${className}`

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
        <span className={buttonClasses.lineSweep} />
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
