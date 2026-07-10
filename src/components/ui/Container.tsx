import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

/**
 * Container
 * Centered max-width wrapper with responsive horizontal padding.
 * max-w-7xl = 1280px — matches lg design width.
 */
export default function Container({ children, className = '', as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-7xl px-5 md:px-10 lg:px-20 ${className}`}>{children}</Tag>
  )
}
