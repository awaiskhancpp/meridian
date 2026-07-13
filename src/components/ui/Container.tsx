import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

/**
 * Container
 * Centered max-width wrapper with responsive horizontal padding.
 */
export default function Container({ children, className = '', as: Tag = 'div' }: ContainerProps) {
  return <Tag className={`mx-auto w-full max-w-[1440px] px-4  ${className}`}>{children}</Tag>
}
