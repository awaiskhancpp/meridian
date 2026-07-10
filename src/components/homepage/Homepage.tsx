import React from 'react'
import { Navbar, Hero, About } from './index'

/**
 * Homepage
 * Assembles all homepage sections in order.
 * Add new sections here as they are built — import from ./index.
 */
export default function Homepage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      {/* Future sections — uncomment as they are added to index.ts:
        <Properties />
        <Agents />
        <Blog />
        <Footer />
      */}
    </>
  )
}
