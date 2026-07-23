import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import Navbar from '@/components/homepage/Navbar'
import Footer from '@/components/homepage/Footer'
import CTABanner from '@/components/homepage/CTABanner'
import { PageHero } from '@/components/ui'
import BlogRelatedPosts from '@/components/blogs/BlogRelatedPosts'

// Import your newly separated BlogPage component (Adjust path if needed)
import BlogPage from '@/components/blogs/BlogPage'
import websiteData from '@/website.json'

// Export the type so BlogPage can use it safely
export type BlogPost = (typeof websiteData.blogs.items)[0] & {
  content?: string
  tableOfContents?: { heading: string; anchorId: string }[]
  faqs?: any[]
  readTimeMinutes?: number
}

export async function generateStaticParams() {
  return websiteData.blogs.items.map((post) => ({ slug: post.slug }))
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const post = websiteData.blogs.items.find((p) => p.slug === slug)
  return post ? (post as BlogPost) : null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) return {}

  return {
    title: `${post.title} | Meridian Journal`,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Navbar />
      <PageHero label="" heading="" subheading="" image="/hero.webp" />

      {/* Pass the entire post object down to BlogPage */}
      <BlogPage post={post} />

      <BlogRelatedPosts />
      <CTABanner />
      <Footer />
    </main>
  )
}
