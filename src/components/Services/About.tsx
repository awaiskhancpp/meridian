import React from 'react'

interface AboutProps {
  title: string
  description: string
}

/**
 * About (service detail page)
 *
 * Was a literal placeholder — `<div>ABout us Section</div>` — not wired
 * to any real content. Now renders the actual service's own title +
 * description, passed down from ServicePage.
 */
export default function About({ title, description }: AboutProps) {
  return (
    <div className="max-w-3xl">
      <h2 className="mb-6 text-3xl font-bold text-dark">About {title}</h2>
      <p className="leading-relaxed text-dark-muted">{description}</p>
    </div>
  )
}
