import { notFound } from 'next/navigation'
import Image from 'next/image'

import Navbar from '@/components/homepage/Navbar'
import Footer from '@/components/homepage/Footer'
import CTABanner from '@/components/homepage/CTABanner'
import BlogRelatedPosts from '@/components/blogs/BlogRelatedPosts'
import BlogPage from '@/components/blogs/BlogPage'
import websiteData from '@/website.json'

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
    <main className="min-h-screen bg-page">
      <Navbar />
      <div className="relative isolate h-page-hero min-h-page-hero w-full lg:h-tall-section">
        <Image
          src="/hero.webp"
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-overlay-hero" />
      </div>
      <BlogPage post={post} />

      <BlogRelatedPosts />
      <CTABanner />
      <Footer />
    </main>
  )
}
