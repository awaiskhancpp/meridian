import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui'
import RichText, { extractHeadings } from '@/lib/richText'
import { CATEGORY_LABELS } from '@/lib/blogs'
// import PostFaqs from '@/components/blogs/PostFaqs'
import { TocSidebar, PostFaqs } from './index'

// Import the BlogPost type from your parent page
import type { BlogPost } from '@/app/blogs/[slug]/page'

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

// Receive the `post` prop passed down from page.tsx
export default function BlogPage({ post }: { post: BlogPost }) {
  const imageUrl = post.image
  const imgAlt = post.imageAlt || post.title
  const authorName = post.author
  const rawContent = post.content || ''

  const toc =
    post.tableOfContents && post.tableOfContents.length > 0
      ? post.tableOfContents.map((item) => ({ heading: item.heading, anchorId: item.anchorId }))
      : extractHeadings(rawContent)

  const categoryLabel =
    CATEGORY_LABELS[post.category as keyof typeof CATEGORY_LABELS] ?? post.category

  return (
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

        {/* Description */}
        {post.description && (
          <p className="mt-6 text-lg md:text-xl text-dark-muted leading-relaxed max-w-3xl">
            {post.description}
          </p>
        )}

        {/* Author / date / read time */}
        <div className="mt-6 flex items-center gap-3 border-b border-soft pb-6 text-sm text-dark-muted">
          <AuthorAvatar name={authorName} />
          <span className="font-medium text-dark">{authorName}</span>
          <span aria-hidden="true">·</span>
          <span>{formatDate(post.datePosted)}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readTimeMinutes ?? 1} min read</span>
        </div>
      </Container>

      {/* Cover image */}

      {/* Body + sticky ToC sidebar */}
      <Container className="!max-w-4xl">
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_15rem]">
          <div className="min-w-0">
            <RichText content={rawContent} />
            {imageUrl && (
              <div className="relative mt-4 aspect-video w-full overflow-hidden ">
                <Image src={imageUrl} alt={imgAlt} fill priority className="object-cover" />
              </div>
            )}
            {post.faqs && post.faqs.length > 0 && <PostFaqs faqs={post.faqs} />}
          </div>

          <TocSidebar toc={toc} />
        </div>
      </Container>
    </article>
  )
}
