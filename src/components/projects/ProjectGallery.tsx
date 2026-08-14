'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Container } from '@/components/ui'

interface ProjectGalleryProps {
  images: string[]
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  // Handle keyboard navigation for better UX
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === 'Escape') setSelectedIndex(null)
      if (e.key === 'ArrowRight') setSelectedIndex((prev) => (prev! + 1) % images.length)
      if (e.key === 'ArrowLeft')
        setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, images?.length])

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedIndex])

  if (!images || images.length === 0) return null

  const closeModal = () => setSelectedIndex(null)

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null))
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null))
  }

  return (
    <section className="section-padding bg-page">
      <Container>
        <div className="mb-10">
          <h2 className="text-2xl font-bold uppercase tracking-tight text-dark md:text-3xl">
            Project Gallery
          </h2>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="group relative aspect-square cursor-pointer overflow-hidden "
              onClick={() => setSelectedIndex(idx)}
            >
              <Image
                src={img}
                alt={`Project gallery image ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-transparent transition-colors duration-standard group-hover:bg-overlay-light" />
            </div>
          ))}
        </div>
      </Container>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-overlay-dark backdrop-blur-sm transition-opacity"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            className="absolute right-4 top-4 z-gallery p-3 text-white-subtle transition-colors hover:text-white md:right-8 md:top-8"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <X size={36} strokeWidth={1.5} />
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-2 z-gallery p-3 text-white-subtle transition-colors hover:text-white md:left-8"
            onClick={prevImage}
            aria-label="Previous image"
          >
            <ChevronLeft size={48} strokeWidth={1.5} />
          </button>

          {/* Next Button */}
          <button
            className="absolute right-2 z-gallery p-3 text-white-subtle transition-colors hover:text-white md:right-8"
            onClick={nextImage}
            aria-label="Next image"
          >
            <ChevronRight size={48} strokeWidth={1.5} />
          </button>

          {/* Main Image */}
          <div className="relative h-tall-section w-gallery md:h-gallery-lg md:w-gallery-lg">
            <Image
              src={images[selectedIndex]}
              alt={`Project image ${selectedIndex + 1}`}
              fill
              className="object-contain"
              quality={100}
              priority
            />
          </div>
        </div>
      )}
    </section>
  )
}
