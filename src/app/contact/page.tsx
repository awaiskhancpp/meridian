import ContactPage from '@/components/contact/ContactPage'
import { Footer, Navbar } from '@/components/homepage'
import { PageHero } from '@/components/ui'

export default function ContactHomePage() {
  return (
    <div>
      <Navbar />
      <PageHero label="" heading="Contact" script="Us" />
      <ContactPage />
      <Footer />
    </div>
  )
}
