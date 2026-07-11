import React from 'react'

/**
 * Button
 * Uses semantic utility classes generated from builds.ts.
 */

type Variant = 'primary' | 'outline' | 'ghost' | 'line'
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
  ghost: 'bg-transparent border border-transparent text-dark hover:bg-[rgba(60,37,21,0.06)]',
  line: 'group relative inline-flex items-center gap-8 rounded-none border-0 bg-transparent px-0 py-0 text-dark shadow-none',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 ' +
  'cursor-pointer focus-visible:outline-none focus-visible:ring-2 ring-accent/40 disabled:opacity-50 disabled:pointer-events-none'

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  href,
  ...props
}: ButtonProps) {
  const classes = `${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`

  if (variant === 'line') {
    const lineClasses =
      'group relative inline-flex items-center gap-8 pb-2 text-sm font-semibold uppercase tracking-[0.18em] text-dark transition-colors duration-300 ' +
      "after:absolute after:inset-x-0 after:bottom-0 after:block after:h-px after:content-[''] after:bg-current after:transition-transform after:duration-300 after:origin-left " +
      'hover:after:scale-x-[1.06] hover:text-accent'

    if (href) {
      return (
        <a href={href} className={`${lineClasses} ${className}`}>
          <span>{children}</span>
          <span
            className="inline-flex translate-x-0 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </a>
      )
    }

    return (
      <button className={`${lineClasses} ${className}`} {...props}>
        <span>{children}</span>
        <span
          className="inline-flex translate-x-0 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        >
          →
        </span>
      </button>
    )
  }

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
