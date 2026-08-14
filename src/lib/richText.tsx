import React from 'react'

/**
 * richText.tsx
 *
 * Rewritten for a purely static site. This component now takes raw HTML strings
 * (authored in your JSON file or Markdown converted to HTML), applies your
 * exact custom theme tokens using Tailwind arbitrary variants, and automatically
 * injects `id` attributes into headings so the sidebar ToC can link to them.
 */

// â”€â”€ Utility Functions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€ Render Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/**
 * The Tailwind classes applied to the wrapper div to style nested raw HTML.
 * This exactly matches the design rhythm, spacing, and colors of your
 * previous Lexical setup (text-dark, accent borders, etc.).
 */
export default function RichText({ content }: { content: string | undefined }) {
  if (!content) return null

  // Prep the HTML by automatically injecting header IDs for the ToC
  const htmlWithIds = injectHeadingIds(content)

  return (
    <div
      className="richtext"
      dangerouslySetInnerHTML={{ __html: htmlWithIds }}
    />
  )
}
