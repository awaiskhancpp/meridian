import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { ElementType } from 'react'
/**
 * richText.tsx
 *
 * Payload's lexicalEditor() stores content as a Lexical JSON tree, not
 * HTML — so "make Tailwind classes act on the rich text" means walking
 * that tree ourselves and applying classes node-by-node, rather than
 * dropping a blob of CMS-authored HTML into `dangerouslySetInnerHTML`
 * (which Tailwind can't reach into anyway). This file is that walker,
 * plus two small utilities that operate on the same tree: a heading
 * slugifier (so headings get stable anchor ids the sidebar ToC can
 * link to) and a read-time estimator (word count / 200wpm).
 *
 * Styling is adapted from the reference screenshot's hierarchy and
 * spacing rhythm, but recolored to this project's actual theme tokens
 * (text-dark / text-dark-muted / accent / bg-cream) rather than the
 * reference's dark background — this site is a light-theme template,
 * so matching the reference's literal black background and white text
 * would clash with every other section on the page.
 */

// ── Minimal structural types for the pieces of the Lexical tree we
// actually render. Payload's own generated types don't export a
// convenient per-node-type shape, so this is intentionally loose
// (children/fields vary by node type) rather than fighting the real
// LexicalNode union.
type LexicalNode = {
  type: string
  tag?: string // heading level: 'h1'..'h6'
  listType?: 'bullet' | 'number'
  format?: number | string
  text?: string
  url?: string
  fields?: { url?: string; newTab?: boolean }
  relationTo?: string
  value?:
    { url?: string; alt?: string; width?: number; height?: number; filename?: string } | number
  children?: LexicalNode[]
}

export type LexicalContent = { root: LexicalNode } | null | undefined

const TEXT_FORMAT = {
  BOLD: 1,
  ITALIC: 2,
  STRIKETHROUGH: 4,
  UNDERLINE: 8,
  CODE: 16,
}

// ── Plain-text extraction — used by both the slugifier and the
// read-time estimator, so heading ids and word counts are always
// derived from the exact same text. ──────────────────────────────────
function extractText(node: LexicalNode | undefined): string {
  if (!node) return ''
  if (node.type === 'text') return node.text ?? ''
  if (!node.children) return ''
  return node.children.map(extractText).join('')
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

export function estimateReadTimeMinutes(content: LexicalContent): number {
  if (!content?.root) return 1
  const text = extractText(content.root)
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

/**
 * A "pseudo-heading": a paragraph whose content starts with a bold run
 * followed by regular continuation text in the SAME paragraph — e.g.
 * "**Introduction** Renovating a kitchen in a Seattle home often
 * means..." typed as one paragraph rather than an actual Heading block.
 *
 * Deliberately excluded:
 *   - paragraphs inside a list item ("**Widen Windows:** If your
 *     budget allows...") — those are emphasized list labels, not
 *     section headings, and must not end up promoted or in the ToC.
 *   - a paragraph that's ENTIRELY bold (no non-bold continuation) —
 *     that's a callout/emphasis, not a "Label: content" heading.
 *
 * This is a heuristic, not a certainty — a paragraph like "**Note:**
 * always confirm pricing first" at the top level would also match.
 * The correct long-term fix for new content is authoring real Heading
 * blocks in the editor; this exists as a safety net for content that
 * already uses the bold-lead-in pattern instead.
 */
function getBoldLeadIn(node: LexicalNode, insideListItem: boolean): string | null {
  if (insideListItem) return null
  if (node.type !== 'paragraph' || !node.children || node.children.length < 2) return null

  const [first, ...rest] = node.children
  if (first.type !== 'text') return null

  const firstFormat = typeof first.format === 'number' ? first.format : 0
  const isBold = (firstFormat & TEXT_FORMAT.BOLD) !== 0
  const label = first.text?.trim()
  if (!isBold || !label) return null

  const hasNonBoldContinuation = rest.some((child) => {
    if (child.type !== 'text') return true // links, etc. count as continuation
    const format = typeof child.format === 'number' ? child.format : 0
    return (format & TEXT_FORMAT.BOLD) === 0 && (child.text ?? '').trim().length > 0
  })
  if (!hasNonBoldContinuation) return null

  return label.replace(/:$/, '')
}

/** Walks the whole tree once, assigning each heading node a stable,
 *  de-duplicated anchor id — shared by both extractHeadings() (below)
 *  and RichText's own heading rendering, so the sidebar ToC's links and
 *  the actual ids on the page can never drift out of sync.
 *
 *  Without de-duplication, two headings with identical text (e.g. two
 *  "Overview" sections) would both slugify to the same id, and a ToC
 *  link to the second one would just jump to the first. */
function computeHeadingIdMap(root: LexicalNode): Map<LexicalNode, string> {
  const seenCounts = new Map<string, number>()
  const idMap = new Map<LexicalNode, string>()

  function nextId(base: string): string {
    const count = seenCounts.get(base) ?? 0
    seenCounts.set(base, count + 1)
    return count === 0 ? base : `${base}-${count + 1}`
  }

  function walk(node: LexicalNode, insideListItem: boolean) {
    if (node.type === 'heading' && node.tag) {
      const text = extractText(node)
      if (text) idMap.set(node, nextId(slugify(text)))
    } else {
      const leadIn = getBoldLeadIn(node, insideListItem)
      if (leadIn) idMap.set(node, nextId(slugify(leadIn)))
    }
    const nextInsideListItem = insideListItem || node.type === 'listitem'
    node.children?.forEach((child) => walk(child, nextInsideListItem))
  }

  walk(root, false)
  return idMap
}

/** Walks the tree collecting {heading, anchorId} for every h2/h3 — a
 *  fallback ToC generator for posts that didn't fill in the manual
 *  tableOfContents field on the collection. Ids come from
 *  computeHeadingIdMap so they exactly match what RichText renders,
 *  including the same de-duplication for repeated heading text. */
export function extractHeadings(content: LexicalContent): { heading: string; anchorId: string }[] {
  if (!content?.root) return []
  const idMap = computeHeadingIdMap(content.root)
  const out: { heading: string; anchorId: string }[] = []

  function walk(node: LexicalNode) {
    if (node.type === 'heading' && (node.tag === 'h2' || node.tag === 'h3')) {
      const text = extractText(node)
      const anchorId = idMap.get(node)
      if (text && anchorId) out.push({ heading: text, anchorId })
    }
    node.children?.forEach(walk)
  }

  walk(content.root)
  return out
}

// ── Inline text-node renderer — wraps a single text leaf in the
// correct nested tags based on its format bitmask. ──────────────────
function renderText(node: LexicalNode, key: React.Key) {
  let el: React.ReactNode = node.text
  const format = typeof node.format === 'number' ? node.format : 0

  if (format & TEXT_FORMAT.CODE) {
    el = (
      <code className="rounded bg-cream px-1.5 py-0.5 font-mono text-[0.9em] text-dark">{el}</code>
    )
  }
  if (format & TEXT_FORMAT.UNDERLINE) el = <u>{el}</u>
  if (format & TEXT_FORMAT.STRIKETHROUGH) el = <s>{el}</s>
  if (format & TEXT_FORMAT.ITALIC) el = <em>{el}</em>
  if (format & TEXT_FORMAT.BOLD) el = <strong className="font-semibold text-dark">{el}</strong>

  return <React.Fragment key={key}>{el}</React.Fragment>
}

function renderChildren(nodes: LexicalNode[] | undefined, idMap: Map<LexicalNode, string>) {
  if (!nodes) return null
  return nodes.map((node, i) => renderNode(node, i, idMap))
}

function renderNode(
  node: LexicalNode,
  key: React.Key,
  idMap: Map<LexicalNode, string>,
): React.ReactNode {
  switch (node.type) {
    case 'text':
      return renderText(node, key)

    case 'linebreak':
      return <br key={key} />

    case 'paragraph':
      return (
        <p key={key} className="mb-5 text-[0.95rem] leading-relaxed text-dark-muted">
          {renderChildren(node.children, idMap)}
        </p>
      )

    case 'heading': {
      const text = extractText(node)
      const id = idMap.get(node) ?? slugify(text)

      const headingClasses: Record<string, string> = {
        h1: 'mt-14 mb-5 scroll-mt-28 text-3xl font-black uppercase tracking-[-0.03em] text-dark md:text-4xl',
        h2: 'mt-14 mb-5 scroll-mt-28 text-2xl font-black uppercase tracking-[-0.03em] text-dark md:text-[1.9rem]',
        h3: 'mt-10 mb-4 scroll-mt-28 text-xl font-bold text-dark md:text-2xl',
        h4: 'mt-8 mb-3 scroll-mt-28 text-lg font-bold text-dark',
      }

      switch (node.tag) {
        case 'h1':
          return (
            <h1 key={key} id={id} className={headingClasses.h1}>
              {renderChildren(node.children, idMap)}
            </h1>
          )

        case 'h3':
          return (
            <h3 key={key} id={id} className={headingClasses.h3}>
              {renderChildren(node.children, idMap)}
            </h3>
          )

        case 'h4':
          return (
            <h4 key={key} id={id} className={headingClasses.h4}>
              {renderChildren(node.children, idMap)}
            </h4>
          )

        default:
          return (
            <h2 key={key} id={id} className={headingClasses.h2}>
              {renderChildren(node.children, idMap)}
            </h2>
          )
      }
    }

    case 'list': {
      const Tag = (node.listType === 'number' ? 'ol' : 'ul') as ElementType
      return (
        <Tag
          key={key}
          className={`mb-6 ml-1 space-y-2.5 text-[0.95rem] leading-relaxed text-dark-muted ${
            node.listType === 'number' ? 'list-decimal pl-5' : 'list-none pl-0'
          }`}
        >
          {renderChildren(node.children, idMap)}
        </Tag>
      )
    }

    case 'listitem':
      return (
        <li key={key} className="relative pl-5">
          {node.listType !== 'number' && (
            <span
              className="absolute left-0 top-[0.65em] h-1.5 w-1.5 rounded-full bg-accent"
              aria-hidden="true"
            />
          )}
          {renderChildren(node.children, idMap)}
        </li>
      )

    case 'quote':
      return (
        <blockquote key={key} className="mb-6 border-l-4 border-accent pl-5 italic text-dark-muted">
          {renderChildren(node.children, idMap)}
        </blockquote>
      )

    case 'horizontalrule':
      return <hr key={key} className="my-10 border-t border-[rgba(60,37,21,0.12)]" />

    case 'link': {
      const url = node.fields?.url ?? node.url ?? '#'
      const newTab = node.fields?.newTab
      return (
        <Link
          key={key}
          href={url}
          target={newTab ? '_blank' : undefined}
          rel={newTab ? 'noopener noreferrer' : undefined}
          className="text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:decoration-accent"
        >
          {renderChildren(node.children, idMap)}
        </Link>
      )
    }

    case 'upload': {
      const media = typeof node.value === 'object' ? node.value : null
      if (!media?.url) return null
      return (
        <span key={key} className="my-8 block overflow-hidden rounded-xl">
          <span className="relative block aspect-video w-full">
            <Image
              src={media.url}
              alt={media.alt ?? ''}
              fill
              sizes="(max-width: 1024px) 100vw, 700px"
              className="object-cover"
            />
          </span>
        </span>
      )
    }

    case 'table':
      return (
        <div
          key={key}
          className="mb-8 overflow-x-auto rounded-lg border border-[rgba(60,37,21,0.12)]"
        >
          <table className="w-full border-collapse text-left text-sm">
            <tbody>{renderChildren(node.children, idMap)}</tbody>
          </table>
        </div>
      )

    case 'tablerow':
      return (
        <tr key={key} className="border-b border-[rgba(60,37,21,0.1)] last:border-none">
          {renderChildren(node.children, idMap)}
        </tr>
      )

    case 'tablecell': {
      const isHeader = (node as unknown as { headerState?: number }).headerState === 1
      const Cell = isHeader ? 'th' : 'td'
      return (
        <Cell
          key={key}
          className={`px-4 py-3 align-top ${
            isHeader
              ? 'bg-cream text-xs font-semibold uppercase tracking-[0.14em] text-dark-muted'
              : 'text-dark-muted'
          }`}
        >
          {renderChildren(node.children, idMap)}
        </Cell>
      )
    }

    default:
      // Unknown/unsupported node type — render children if any exist,
      // rather than dropping content or throwing.
      return node.children ? (
        <React.Fragment key={key}>{renderChildren(node.children, idMap)}</React.Fragment>
      ) : null
  }
}

export default function RichText({ content }: { content: LexicalContent }) {
  if (!content?.root?.children) return null
  const idMap = computeHeadingIdMap(content.root)
  return <div className="richtext">{renderChildren(content.root.children, idMap)}</div>
}
