import React from 'react'
import { Navbar, Hero, About, WhyChooseUs, Contact } from './index'

/**
 * Homepage
 * White canvas with editorial sections stacked in a service-template flow.
 */
export default function Homepage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-[1440px]">
        <Navbar />
        <Hero />
        <About />
        <WhyChooseUs />
        <Contact />
      </div>
    </main>
  )
}
