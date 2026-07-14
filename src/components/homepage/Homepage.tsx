import React from 'react'
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
 */
export default function Homepage() {
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
      <Footer />
    </main>
  )
}
