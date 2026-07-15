import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    /*
      Added so blog post bylines have something better to show than a
      raw email address. Optional and falls back to email at render time
      (see getAuthorName in lib/blogs.ts) — nothing breaks for existing
      users who haven't set one.
    */
    {
      name: 'name',
      type: 'text',
      label: 'Display Name',
      admin: {
        description:
          'Shown publicly as the author byline on blog posts (e.g. "Written by Jane Smith"). Falls back to the account email if left blank.',
      },
    },
  ],
}
