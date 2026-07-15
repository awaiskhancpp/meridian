import type { CollectionConfig } from 'payload'
import { estimateReadTimeMinutes } from '@/lib/richText'

/**
 * Blogs
 *
 * Backs both the homepage "Journal" carousel (featured posts only) and
 * the full /blogs listing + search page. Fields cover everything a post
 * card or detail page needs: title, slug, description (card excerpt),
 * image, author, datePosted, category (used for the listing page's
 * category filter pills), featured (homepage carousel toggle), the
 * post body itself, a table of contents, and per-post FAQs.
 *
 * Table of contents: modeled as a manually-curated array field rather
 * than auto-derived from the rich text at render time. Auto-deriving
 * from heading nodes is the lower-effort route and worth doing too,
 * but it means the ToC always matches heading structure 1:1 whether or
 * not that's what an editor wants (e.g. skipping a minor heading,
 * relabeling an entry to something shorter than the actual heading
 * text). A manual field gives editorial control; the single-post page
 * ALSO auto-derives one from `content` as a fallback when this array is
 * left empty (see extractHeadings in lib/richText.tsx), so a post never
 * ships with a missing ToC just because an editor skipped this field.
 *
 * NOTE: this is unrelated to Lexical's TableFeature (commented out in
 * payload.config.ts) — that's rich-text table INSERTION (spreadsheet-
 * style rows/columns inside post body content), a completely different
 * feature that happens to share the word "table." Nothing here depends
 * on it.
 *
 * FAQs: optional array, rendered as an accordion at the bottom of the
 * post via PostFaqs.tsx. Leave empty to omit the section entirely.
 *
 * Access: reading is public (the frontend needs it unauthenticated for
 * both the homepage and the listing page); writes require an admin
 * session, same pattern as FormSubmissions.
 */
export const Blogs: CollectionConfig = {
  slug: 'blogs',
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Posts',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'category', 'datePosted', 'featured'],
    description: 'Journal / blog posts shown on the homepage carousel and the /blogs page.',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Used in the post URL: /blogs/[slug]. Lowercase, hyphenated, no spaces.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short excerpt shown on blog cards (homepage carousel + listing grid).',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Automatically set to whoever creates the post — not editable.',
      },
    },
    {
      name: 'datePosted',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Kitchen Remodeling', value: 'kitchen-remodeling' },
        { label: 'Bathroom Remodeling', value: 'bathroom-remodeling' },
        { label: 'Whole-Home Remodeling', value: 'whole-home-remodeling' },
        { label: 'Design Tips', value: 'design-tips' },
        { label: 'Materials & Finishes', value: 'materials-finishes' },
        { label: 'Project Planning', value: 'project-planning' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured (show on homepage)',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Featured posts appear in the homepage Journal carousel.',
      },
    },
    {
      name: 'readTimeMinutes',
      type: 'number',
      label: 'Read Time (minutes)',
      admin: {
        position: 'sidebar',
        description:
          'Leave blank to auto-calculate from the body content (~200 words/minute) on save.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Body (Rich Text)',
      required: true,
    },
    {
      name: 'tableOfContents',
      type: 'array',
      label: 'Table of Contents (optional)',
      admin: {
        description:
          "Leave empty to auto-generate from H2/H3 headings in the body. Fill in manually for editorial control over which headings appear and how they're labeled.",
      },
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'anchorId',
          type: 'text',
          required: true,
          admin: {
            description: 'Must match the target heading\'s rendered id (e.g. "getting-started").',
          },
        },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs (optional)',
      admin: {
        description:
          'Shown as an accordion at the bottom of this post. Leave empty to omit the section entirely.',
      },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === 'create' && req.user) {
          data.author = req.user.id
        }

        if (!data.readTimeMinutes && data.content) {
          data.readTimeMinutes = estimateReadTimeMinutes(data.content)
        }

        return data
      },
    ],
  },
  timestamps: true,
}
