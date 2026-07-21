import { Contact, CTABanner, Footer, Navbar, Testimonials, WhyChooseUs } from '../homepage'
import { About, TrustSection } from '../Services'
import { Container, PageHero } from '../ui'
import CoreValues from './CoreValues'
import MissionValues from './MissionValues'
import OurStory from './OurStory'

export default function AboutHomePage() {
  return (
    <div>
      <Navbar />
      <PageHero label="" heading="About" script="Us" />
      <OurStory />
      <WhyChooseUs />
      <CoreValues />
      <TrustSection />
      {/* <MissionValues /> */}
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  )
}
