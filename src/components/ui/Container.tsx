import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export default function Container({ children, className = '', as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-content px-4 md:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  )
}
