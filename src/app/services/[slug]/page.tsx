import { notFound } from 'next/navigation'
import { getAllServices, getServiceBySlug } from '@/lib/services'
import ServicePage from '@/components/Services/ServicePage'

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>
}

/** Pre-renders every real service slug at build time — also means an
 *  unknown slug never has to fall through to a generic placeholder;
 *  it 404s properly instead. */
export function generateStaticParams() {
  return getAllServices().map((service) => ({ slug: service.slug }))
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) notFound()

  return <ServicePage service={service} allServices={getAllServices()} />
}
