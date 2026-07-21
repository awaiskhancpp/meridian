import { Contact, Footer, Navbar } from '../homepage'
import { PageHero } from '../ui'

export default function ContactPage() {
  return (
    <div>
      <Navbar />
      <PageHero label="" heading="Contact" script="Us" />
      <Contact />
      <Footer />
    </div>
  )
}
