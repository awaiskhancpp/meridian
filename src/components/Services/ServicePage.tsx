import { Footer, Navbar, Testimonials } from '@/components/homepage'
import { Container } from '@/components/ui'
import siteData from '@/website.json'
import type { ServiceCardData } from '@/lib/services'
import ServiceHero from './ServiceHero'
import ServiceAbout from './ServiceAbout'
import BeforeAfter from './BeforeAfter'
import ExploreOtherServices from './ExploreOtherServices'
import AreasWeServe from './AreasWeServe'
import ServiceProcess from './ServiceProcess'
import ServiceFaqs from './ServiceFaq'
import { ServiceForm, ServiceWhyChooseUs } from './index'

interface ServicePageProps {
  service: ServiceCardData
  allServices: ServiceCardData[]
}
export default function ServicePage({ service, allServices }: ServicePageProps) {
  const { serviceAreas, serviceWhyChooseUs } = siteData
  const whyChooseUsData = serviceWhyChooseUs?.[service.slug as keyof typeof serviceWhyChooseUs]

  return (
    <div>
      <Navbar />

      <ServiceHero
        title={service.title}
        subtitle={service.subtitle}
        tagline={service.tagline}
        image={service.image}
        label="Our Services"
        statBoxes={service.statBoxes}
        ctaLabel="Schedule a Consultation"
        ctaHref="/#contact"
      />

      <Container className="pt-10 pb-10">
        <ServiceAbout
          label={service.about?.label || 'About'}
          heading={service.about?.heading || 'About'}
          script={service.about?.script || 'Us'}
          statBoxes={service.statBoxes}
          imageAlt={service.description}
          image={service.image}
          highlights={service.highlights}
          description={service.description}
        />
      </Container>

      {whyChooseUsData && <ServiceWhyChooseUs data={whyChooseUsData} />}

      {service.process && service.process.steps.length > 0 && (
        <ServiceProcess
          label={service.processSection?.label || 'Our Process'}
          heading={service.processSection?.heading || 'Our Simple'}
          script={service.processSection?.script || 'Process'}
          image={service.image}
          steps={service.process.steps}
        />
      )}
      {service.beforeAfter && service.beforeAfter.length > 0 && (
        <BeforeAfter
          label="Our Work"
          heading="Before &"
          script="After"
          subheading={`See the transformation from a recent ${service.title.toLowerCase()} project.`}
          items={service.beforeAfter}
        />
      )}
      <Testimonials />

      <ExploreOtherServices currentSlug={service.slug} services={allServices} />
      <Container>
        <ServiceFaqs
          label={service.faqSection?.label || 'FAQ'}
          heading={service.faqSection?.heading || 'What homeowners'}
          script={service.faqSection?.script || 'ask us.'}
          faqs={service.faqs ?? []}
        />
      </Container>

      <AreasWeServe
        label={serviceAreas.label}
        heading={serviceAreas.heading}
        script={serviceAreas.script}
        subheading={serviceAreas.subheading}
        areas={serviceAreas.areas}
      />

      <ServiceForm serviceTitle={service.title} />

      <Footer />
    </div>
  )
}
