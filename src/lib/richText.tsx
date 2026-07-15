import React from 'react'

/**
 * richText.tsx
 *
 * Rewritten for a purely static site. This component now takes raw HTML strings
 * (authored in your JSON file or Markdown converted to HTML), applies your
 * exact custom theme tokens using Tailwind arbitrary variants, and automatically
 * injects `id` attributes into headings so the sidebar ToC can link to them.
 */

// ── Utility Functions ──────────────────────────────────────────────────

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

/**
 * Strips HTML tags to count words for read-time estimation.
 */
export function estimateReadTimeMinutes(htmlContent: string | undefined): number {
  if (!htmlContent) return 1
  const textContent = htmlContent.replace(/<[^>]+>/g, ' ')
  const words = textContent.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

/**
 * Finds all h2 and h3 tags in the HTML string to generate the Table of Contents.
 */
export function extractHeadings(
  htmlContent: string | undefined,
): { heading: string; anchorId: string }[] {
  if (!htmlContent) return []

  const headings: { heading: string; anchorId: string }[] = []
  // Matches <h2>...</h2> or <h3 class="...">...</h3>
  const regex = /<(h[23])[^>]*>(.*?)<\/\1>/gi

  let match
  while ((match = regex.exec(htmlContent)) !== null) {
    // Strip any nested tags (like <strong>) from inside the heading text
    const text = match[2].replace(/<[^>]+>/g, '').trim()
    if (text) {
      headings.push({ heading: text, anchorId: slugify(text) })
    }
  }

  return headings
}

/**
 * Automatically injects id="slugified-title" into h2 and h3 tags
 * so the ToC links can actually scroll to them.
 */
function injectHeadingIds(html: string): string {
  if (!html) return ''
  return html.replace(/<(h[23])([^>]*)>(.*?)<\/\1>/gi, (match, tag, attrs, content) => {
    // If an ID was already manually provided in the HTML, don't overwrite it
    if (attrs.includes('id=')) return match
    const id = slugify(content.replace(/<[^>]+>/g, ''))
    return `<${tag}${attrs} id="${id}">${content}</${tag}>`
  })
}

// ── Render Component ──────────────────────────────────────────────────

/**
 * The Tailwind classes applied to the wrapper div to style nested raw HTML.
 * This exactly matches the design rhythm, spacing, and colors of your
 * previous Lexical setup (text-dark, accent borders, etc.).
 */
const richTextStyles = `
  [&_p]:mb-5 [&_p]:text-[0.95rem] [&_p]:leading-relaxed [&_p]:text-dark-muted
  
  [&_h1]:mt-14 [&_h1]:mb-5 [&_h1]:scroll-mt-28 [&_h1]:text-3xl [&_h1]:font-black [&_h1]:uppercase [&_h1]:tracking-[-0.03em] [&_h1]:text-dark md:[&_h1]:text-4xl [&_h1]:leading-tight [&_h1]:border-l-4 [&_h1]:border-accent [&_h1]:pl-4
  
  [&_h2]:mt-14 [&_h2]:mb-5 [&_h2]:scroll-mt-28 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:uppercase [&_h2]:tracking-[-0.03em] [&_h2]:text-dark md:[&_h2]:text-[1.9rem] [&_h2]:leading-tight [&_h2]:border-l-4 [&_h2]:border-accent [&_h2]:pl-4
  
  [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:scroll-mt-28 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-dark md:[&_h3]:text-2xl [&_h3]:leading-tight [&_h3]:border-l-2 [&_h3]:border-accent/60 [&_h3]:pl-3
  
  [&_h4]:mt-8 [&_h4]:mb-3 [&_h4]:scroll-mt-28 [&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-dark [&_h4]:leading-tight [&_h4]:border-l-2 [&_h4]:border-accent/40 [&_h4]:pl-3
  
  [&_ul]:mb-6 [&_ul]:ml-1 [&_ul]:space-y-2.5 [&_ul]:text-[0.95rem] [&_ul]:leading-relaxed [&_ul]:text-dark-muted [&_ul]:list-disc [&_ul]:pl-5
  
  [&_ol]:mb-6 [&_ol]:ml-1 [&_ol]:space-y-2.5 [&_ol]:text-[0.95rem] [&_ol]:leading-relaxed [&_ol]:text-dark-muted [&_ol]:list-decimal [&_ol]:pl-5
  
  [&_li]:pl-1
  
  [&_blockquote]:mb-6 [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-dark-muted
  
  [&_a]:text-accent [&_a]:underline [&_a]:decoration-accent/40 [&_a]:underline-offset-2 hover:[&_a]:decoration-accent [&_a]:transition-colors
  
  [&_code]:rounded [&_code]:bg-cream [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:text-dark
  
  [&_hr]:my-10 [&_hr]:border-t [&_hr]:border-[rgba(60,37,21,0.12)]
`

export default function RichText({ content }: { content: string | undefined }) {
  if (!content) return null

  // Prep the HTML by automatically injecting header IDs for the ToC
  const htmlWithIds = injectHeadingIds(content)

  return (
    <div
      className={`richtext ${richTextStyles}`}
      dangerouslySetInnerHTML={{ __html: htmlWithIds }}
    />
  )
}
