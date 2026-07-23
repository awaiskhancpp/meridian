import { Contact, CTABanner, Footer, Navbar, Testimonials, WhyChooseUs } from '../homepage'
import { Container, PageHero } from '../ui'
import { AboutTrustSection, CoreValues, OurStory, AboutWhyChooseUs } from './index'

export default function AboutHomePage() {
  return (
    <div>
      <Navbar />
      <PageHero label="" heading="CRAFTING SPACES" script="THAT LAST." />
      <OurStory />
      <AboutWhyChooseUs />
      <CoreValues />
      <AboutTrustSection />
      <CTABanner />
      <Footer />
    </div>
  )
}
