import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/homepage/Navbar'
import Footer from '@/components/homepage/Footer'
import { Container, PageHero } from '@/components/ui'
import RichText, { extractHeadings } from '@/lib/richText'
import { CATEGORY_LABELS } from '@/lib/blogs'
import PostFaqs from './PostFaqs'

// 1. Import your static JSON data
import websiteData from '@/website.json' // Update this path if website.json is located elsewhere

// 2. Define the expected structure based on your JSON + optional page fields
type BlogPost = (typeof websiteData.blogs.items)[0] & {
  content?: string
  tableOfContents?: { heading: string; anchorId: string }[]
  faqs?: any[]
  readTimeMinutes?: number
}

// 3. Generate static routes directly from the JSON array
export async function generateStaticParams() {
  return websiteData.blogs.items.map((post) => ({ slug: post.slug }))
}

// 4. Fetch the post locally from the imported JSON
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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function AuthorAvatar({ name }: { name: string }) {
  const initial = name.trim().charAt(0).toUpperCase()
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white"
      aria-hidden="true"
    >
      {initial}
    </span>
  )
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  // 5. Simplified Media - Since it's from JSON, it's always a string now
  const imageUrl = post.image
  const imageAlt = post.imageAlt || post.title

  // 6. Simplified Author - Directly a string in JSON, no helper needed
  const authorName = post.author

  // 7. Fallback content logic for TOC (since content isn't in JSON yet)
  const rawContent = post.content || ''
  const toc =
    post.tableOfContents && post.tableOfContents.length > 0
      ? post.tableOfContents.map((item) => ({ heading: item.heading, anchorId: item.anchorId }))
      : extractHeadings(rawContent)

  // 8. Safely handle the category label
  const categoryLabel =
    CATEGORY_LABELS[post.category as keyof typeof CATEGORY_LABELS] ?? post.category

  return (
    <main className="min-h-screen scroll-smooth bg-white">
      <Navbar />
      <PageHero
        label=""
        heading=""
        subheading="Read our latest insights and stories"
        image="/hero.webp"
      />

      <article className="pt-12 lg:pt-16">
        <Container className="!max-w-4xl">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-dark-muted"
          >
            <Link href="/blogs" className="transition-colors hover:text-accent">
              Journal
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-dark">{categoryLabel}</span>
          </nav>

          {/* Title */}
          <h1 className="text-[clamp(2rem,4.5vw,3.2rem)] font-black uppercase leading-[0.98] tracking-[-0.04em] text-dark">
            {post.title}
          </h1>

          {/* Author / date / read time */}
          <div className="mt-6 flex items-center gap-3 border-b border-[rgba(60,37,21,0.1)] pb-6 text-sm text-dark-muted">
            <AuthorAvatar name={authorName} />
            <span className="font-medium text-dark">{authorName}</span>
            <span aria-hidden="true">·</span>
            <span>{formatDate(post.datePosted)}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTimeMinutes ?? 1} min read</span>
          </div>
        </Container>

        {/* Cover image */}
        {imageUrl && (
          <Container className="!max-w-4xl">
            <div className="relative mt-8 aspect-video w-full overflow-hidden ">
              <Image src={imageUrl} alt={imageAlt} fill priority className="object-cover" />
            </div>
          </Container>
        )}

        {/* Body + sticky ToC sidebar */}
        <Container className="!max-w-4xl">
          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_15rem]">
            <div className="min-w-0">
              {/* Note: Content will be blank until added to website.json */}
              <RichText content={rawContent} />

              {/* Per-post FAQ */}
              {post.faqs && post.faqs.length > 0 && <PostFaqs faqs={post.faqs} />}
            </div>

            {/* Sidebar */}
            {toc.length > 0 && (
              <aside className="order-first lg:order-last">
                <div className="lg:sticky lg:top-28">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dark-muted">
                    Contents
                  </p>
                  <ul className="mt-4 space-y-3 border-l border-[rgba(60,37,21,0.12)] text-sm">
                    {toc.map((item) => (
                      <li key={item.anchorId}>
                        <a
                          href={`#${item.anchorId}`}
                          className="-ml-px block border-l-2 border-transparent pl-4 text-dark-muted transition-colors hover:border-accent hover:text-accent"
                        >
                          {item.heading}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            )}
          </div>
        </Container>
      </article>

      <div className="mt-20">
        <Footer />
      </div>
    </main>
  )
}
