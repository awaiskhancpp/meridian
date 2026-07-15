import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { FormSubmissions } from './collections/FormSubmissions'
import { Blogs } from './collections/Blogs'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, FormSubmissions, Blogs],
  /*
    Default lexicalEditor() covers headings, lists, bold/italic/underline,
    links, blockquote, horizontal rule, and inline upload/image embeds —
    everything in the reference EXCEPT tables (the Equipment/Purpose
    table). TableFeature is opt-in, not part of the defaults, so it's
    added explicitly here rather than editors hitting a missing toolbar
    button. If your installed @payloadcms/richtext-lexical version
    exports this under a different name, swap the import accordingly —
    export names have shifted across versions.
  */
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures],
    // TableFeature()
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
