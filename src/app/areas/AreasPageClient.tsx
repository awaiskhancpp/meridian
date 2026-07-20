import { Contact, Footer, Map, Navbar, Services } from '@/components/homepage'
import { ServiceAreaGrid } from '@/components/homepage/ServiceAreaGrid'
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
              Primary {serviceAreas.label}
            </p>
            <h2 className="mt-2 text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
              Surrounding Areas
            </h2>
          </div>
          <p className="text-sm text-dark-muted"></p> {services.items.length}{' '}
          {serviceAreas.areas.length === 1 ? 'Area' : 'Areas'}
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4  gap-y-8">
          {serviceAreas.areas.map((s, i) => (
            <ServiceAreaGrid
              key={i}
              title={s.title}
              description={s.description}
              image={s.image}
              imageAlt={s.imageAlt}
            />
          ))}
        </div>
      </Container>
      <Map />
      <Contact />
      <Footer />
    </div>
  )
}
