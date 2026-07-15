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
