import { Contact, Footer, Navbar, Services } from '@/components/homepage'
import { ServiceAreaGrid } from '@/components/homepage/Services/ServiceAreaGrid'
import { Container, PageHero } from '@/components/ui'
import siteData from '@/website.json'

export default function AreasPageClient() {
  const { services, serviceAreas } = siteData
  return (
    <div>
      <Navbar />
      <PageHero
        label={serviceAreas.label}
        heading={serviceAreas.heading}
        script={serviceAreas.script}
      />
      <Container className="py-10 lg:py-16">
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="">
            <p className="text-xs font-medium uppercase tracking-[0.34em] text-dark-muted">
              {serviceAreas.label}
            </p>
            <h2 className="mt-2 text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
              All Services
            </h2>
          </div>
          <p className="text-sm text-dark-muted"></p> {services.items.length}{' '}
          {services.items.length === 1 ? 'service' : 'services'}
        </div>
        <div className="mt-8 grid grid-cols-4 gap-x-4  gap-y-8">
          {services.items.map((s, i) => (
            <ServiceAreaGrid key={i} title={s.title} description={s.description} image={s.image} />
          ))}
        </div>
      </Container>
      <Contact />
      <Footer />
    </div>
  )
}
