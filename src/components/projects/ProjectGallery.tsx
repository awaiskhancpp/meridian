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
    <section className="py-10 lg:py-16 bg-white">
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
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
            </div>
          ))}
        </div>
      </Container>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#000]/85 backdrop-blur-sm transition-opacity"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            className="absolute right-4 top-4 z-[60] p-3 text-white/70 transition-colors hover:text-white md:right-8 md:top-8"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <X size={36} strokeWidth={1.5} />
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-2 z-[60] p-3 text-white/70 transition-colors hover:text-white md:left-8"
            onClick={prevImage}
            aria-label="Previous image"
          >
            <ChevronLeft size={48} strokeWidth={1.5} />
          </button>

          {/* Next Button */}
          <button
            className="absolute right-2 z-[60] p-3 text-white/70 transition-colors hover:text-white md:right-8"
            onClick={nextImage}
            aria-label="Next image"
          >
            <ChevronRight size={48} strokeWidth={1.5} />
          </button>

          {/* Main Image */}
          <div className="relative h-[85vh] w-[90vw] md:h-[90vh] md:w-[85vw]">
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
