import React from 'react'
import { uiClasses } from '@/builds'

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
  return (
    <Tag className={`${uiClasses.container} ${className}`}>
      {children}
    </Tag>
  )
}
