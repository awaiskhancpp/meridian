import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Navbar from '@/components/homepage/Navbar/Navbar'
import Footer from '@/components/homepage/Footer/Footer'
import { Container } from '@/components/ui'
import RichText, { extractHeadings } from '@/lib/richText'
import { CATEGORY_LABELS, getAuthorName } from '@/lib/blogs'
import type { Media } from '@/payload-types'
import PostFaqs from './PostFaqs'

/**
 * Single blog post page — matches the reference layout:
 *   breadcrumb -> title -> author/date/read-time row -> cover image ->
 *   two-column body (rich text + sticky "Contents" sidebar) -> FAQ
 *   accordion at the bottom.
 *
 * The sidebar ToC prefers the post's manually-curated
 * `tableOfContents` field; if that's empty, it falls back to
 * auto-extracting h2/h3 headings straight from the rich text so a
 * post never ships with an empty/missing ToC just because an editor
 * skipped that field.
 */

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({ collection: 'blogs', limit: 200, depth: 0 })
  return docs.map((post) => ({ slug: post.slug }))
}

async function getPost(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'blogs',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  return docs[0] ?? null
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

  const media = post.image as Media | number
  const imageUrl = typeof media === 'object' ? media?.url : undefined
  const imageAlt = typeof media === 'object' ? (media?.alt ?? post.title) : post.title

  // FIX: post.author is `number | User` (a relationship field), never a
  // plain string — passing it directly into AuthorAvatar/the byline span
  // (both expecting `string`) was the source of the reported error.
  // getAuthorName resolves it to the author's display name (falling back
  // to email, then to '' if somehow unpopulated) in one place shared
  // with the blog card helper, so both usages stay in sync.
  const authorName = getAuthorName(post.author)

  const toc =
    post.tableOfContents && post.tableOfContents.length > 0
      ? post.tableOfContents.map((item) => ({ heading: item.heading, anchorId: item.anchorId }))
      : extractHeadings(post.content)

  const categoryLabel = CATEGORY_LABELS[post.category] ?? post.category

  return (
    <main className="min-h-screen scroll-smooth bg-white">
      <Navbar />

      <article className="pt-28 lg:pt-36">
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
              <RichText content={post.content} />

              {/* Per-post FAQ — sits inside the body column (not full
                  section width) since it's tied to THIS post's content,
                  not a site-wide section. Only renders when the post
                  actually has FAQs. */}
              {post.faqs && post.faqs.length > 0 && <PostFaqs faqs={post.faqs} />}
            </div>

            {/* Sidebar — sticky on lg+, sits inline above the body on
                smaller screens where there's no room for a true side
                rail without squeezing the reading column too narrow. */}
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
