import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { toBlogCard } from '@/lib/blogs'
import {
  Navbar,
  Hero,
  About,
  WhyChooseUs,
  Services,
  Blogs,
  Contact,
  Footer,
  Process,
  Faq,
  Testimonials,
  Gallery,
} from './index'

/**
 * Homepage
 * White canvas with editorial sections stacked in a service-template flow.
 *
 * Fetches `featured: true` blog posts here (server-side) and passes
 * them into Blogs — that's the "featured (shown on homepage)" field on
 * the Blogs collection actually taking effect. Blogs itself falls back
 * to the static siteData items if the CMS has no featured posts yet.
 */
export default async function Homepage() {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'blogs',
    depth: 1,
    where: { featured: { equals: true } },
    limit: 6,
    sort: '-datePosted',
  })

  const featuredPosts = docs.map(toBlogCard)

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />

      <Process />
      <Testimonials />

      <Gallery />
      <Blogs />
      {/* posts={featuredPosts}  */}
      <Faq />
      <Contact />
      <Footer />
    </main>
  )
}
