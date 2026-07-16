import { Footer, Navbar } from '@/components/homepage'
import Servicepage from '@/components/Services/ServicePage'
import { Container } from '@/components/ui'
export default function ServiceDetailedPage() {
  return (
    <div>
      <Navbar />
      <Container>
        <Servicepage />
      </Container>
      <Footer />
    </div>
  )
}
