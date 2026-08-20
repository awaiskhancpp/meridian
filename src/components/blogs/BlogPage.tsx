import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui'
import RichText, { extractHeadings } from '@/lib/richText'
import { CATEGORY_LABELS } from '@/lib/blogs'
import { TocSidebar, PostFaqs } from './index'
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
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-caption font-semibold text-primary-foreground"
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
      <Container className="!max-w-6xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex items-center gap-2 text-caption uppercase tracking-wider text-muted-foreground"
        >
          <Link href="/blogs" className="transition-colors hover:text-accent">
            Journal
          </Link>
          <span aria-hidden="true">·</span>
          <span className="text-foreground">{categoryLabel}</span>
        </nav>

        {/* Title */}
        <h1 className="heading-2 text-foreground">{post.title}</h1>

        {/* Description */}
        {/* {post.description && (
          <p className="mt-6 text-body-lg md:text-card text-muted-foreground leading-relaxed max-w-3xl">
            {post.description}
          </p>
        )} */}

        {/* Author / date / read time */}
        <div className="mt-6 flex items-center gap-card border-b border-border pb-6 text-body-sm text-muted-foreground">
          <AuthorAvatar name={authorName} />
          <span className="font-medium text-foreground">{authorName}</span>
          <span aria-hidden="true">·</span>
          <span>{formatDate(post.datePosted)}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readTimeMinutes ?? 1} min read</span>
        </div>
      </Container>

      <Container className="!max-w-6xl">
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-8 min-w-0">
            <RichText content={rawContent} />
            {imageUrl && (
              <div className="relative mt-4 aspect-video w-full overflow-hidden ">
                <Image src={imageUrl} alt={imgAlt} fill priority className="object-cover" />
              </div>
            )}
            {post.faqs && post.faqs.length > 0 && <PostFaqs faqs={post.faqs} />}
          </div>

          <div className="order-1 lg:order-2 lg:col-span-4">
            <TocSidebar toc={toc} />
          </div>
        </div>
      </Container>
    </article>
  )
}
