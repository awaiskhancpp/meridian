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
  CTA,
} from './index'

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
      <Faq />
      <Contact />
      <CTA />
      <Footer />
    </main>
  )
}
