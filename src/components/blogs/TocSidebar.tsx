'use client'

import React from 'react'

type TocItem = { heading: string; anchorId: string }

export default function TocSidebar({ toc }: { toc: TocItem[] }) {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const target = document.getElementById(targetId)
    if (!target) return

    // Calculate position with an offset for spacing (112px matches your scroll-mt-28)
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - 112
    const startPosition = window.scrollY
    const distance = targetPosition - startPosition

    // Set your desired speed here (800ms gives a very elegant, slow glide)
    const duration = 800
    let start: number | null = null

    // Easing function for a natural slow-down effect
    const ease = (t: number, b: number, c: number, d: number) => {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t + b
      t--
      return (-c / 2) * (t * (t - 2) - 1) + b
    }

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime
      const timeElapsed = currentTime - start
      const run = ease(timeElapsed, startPosition, distance, duration)
      window.scrollTo(0, run)
      if (timeElapsed < duration) requestAnimationFrame(animation)
    }

    requestAnimationFrame(animation)
  }

  if (!toc || toc.length === 0) return null

  return (
    <aside className="order-first lg:order-last">
      <div className="lg:sticky lg:top-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dark-muted">Contents</p>
        <ul className="mt-4 space-y-3 border-l border-muted text-sm">
          {toc.map((item) => (
            <li key={item.anchorId}>
              <a
                href={`#${item.anchorId}`}
                onClick={(e) => handleScroll(e, item.anchorId)}
                className="-ml-px block border-l-2 border-transparent pl-4 text-dark-muted transition-colors hover:border-accent hover:text-accent"
              >
                {item.heading}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
