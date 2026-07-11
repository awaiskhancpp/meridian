import React from 'react'
import { Navbar, Hero, About, WhyChooseUs, Contact, Footer } from './index'

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
      <WhyChooseUs />
      <Contact />
      <Footer />
    </main>
  )
}
