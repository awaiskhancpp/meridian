'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeAlt: string
  afterAlt: string
}

/**
 * BeforeAfterSlider
 *
 * A single draggable comparison widget — one "after" photo underneath,
 * one "before" photo on top clipped via clip-path to reveal only the
 * portion left of the handle's position. Dragging the handle (or
 * clicking/dragging anywhere on the image) moves that clip boundary.
 *
 * Pointer capture (setPointerCapture on the container, which is what
 * received pointerdown) is what lets a fast drag keep working even if
 * the cursor momentarily leaves the image bounds — without it, moving
 * the mouse quickly during a drag can "lose" the element and the slider
 * stops responding until the next pointerdown.
 *
 * Keyboard: the handle is a real `role="slider"` element, focusable,
 * with ArrowLeft/ArrowRight nudging the position — not just a
 * mouse/touch-only interaction.
 */
export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)

  function updateFromClientX(clientX: number) {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    setDragging(true)
    containerRef.current?.setPointerCapture(e.pointerId)
    updateFromClientX(e.clientX)
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) return
    updateFromClientX(e.clientX)
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    setDragging(false)
    containerRef.current?.releasePointerCapture(e.pointerId)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 3))
    if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 3))
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full touch-none select-none overflow-hidden border border-muted"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* After — full image, underneath */}
      <Image src={afterImage} alt={afterAlt} fill className="pointer-events-none object-cover" />

      {/* Before — clipped to reveal only up to `position`% from the left */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image src={beforeImage} alt={beforeAlt} fill className="object-cover" />
      </div>

      {/* Divider line */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white"
        style={{ left: `${position}%` }}
      />

      {/* Handle — dragging is handled by the container's pointer events
          above (so grabbing anywhere on the image works, not just this
          circle), but this is the focusable element for keyboard control */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Drag to compare before and after"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={handleKeyDown}
        className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white text-dark shadow-card outline-none focus-visible:ring-2 focus-visible:ring-accent"
        style={{ left: `${position}%` }}
      >
        <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
      </div>
    </div>
  )
}
