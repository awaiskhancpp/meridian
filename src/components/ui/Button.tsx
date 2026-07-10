import React from 'react'

/**
 * Button
 * Uses semantic utility classes from theme.generated.css
 * All color/spacing values come from builds.ts → generator → CSS utilities
 */

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'lg' | 'md' | 'sm'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: React.ReactNode
  href?: string
}

// Padding comes from btn-padding-* utilities (buttonPadding in builds.ts)
const sizeClasses: Record<Size, string> = {
  lg: 'btn-padding-lg text-base',
  md: 'btn-padding-md text-sm',
  sm: 'btn-padding-sm text-sm',
}

// Colors come from semantic utilities (bg-accent, etc.) generated from builds.ts
const variantClasses: Record<Variant, string> = {
  primary: 'bg-accent hover:bg-accent-hover text-primary border border-transparent',
  outline: 'bg-transparent border border-white text-primary hover:bg-white/10',
  ghost: 'bg-transparent border border-transparent text-primary hover:bg-white/10',
}

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-full ' +
  'transition-colors duration-200 cursor-pointer ' +
  'focus-visible:outline-none focus-visible:ring-2 ring-accent/50 ' +
  'disabled:opacity-50 disabled:pointer-events-none'

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  href,
  ...props
}: ButtonProps) {
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
