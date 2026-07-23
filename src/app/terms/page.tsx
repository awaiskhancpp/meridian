import React from 'react'
import Link from 'next/link'
import { Container, PageHero } from '@/components/ui'
import { Footer, Navbar } from '@/components/homepage'

export const metadata = {
  title: 'Terms & Conditions | Meridian',
  description:
    'Terms and conditions governing use of the Meridian website and remodeling services.',
}

export default function TermsPage() {
  const lastUpdated = 'July 10, 2026'
  const company = 'Meridian'
  const email = 'hello@meridian.studio'

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHero label="" heading="Terms &amp;" script="Conditions" />
      {/* Header */}
      <div className="border-b border-subtle py-10 lg:py-16">
        <Container>
          <div className="max-w-3xl">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.28em] text-dark-muted transition-colors hover:text-dark"
            >
              ← Back to home
            </Link>
            <p className="text-xs font-medium uppercase tracking-[0.34em] text-dark-muted">Legal</p>
            <h1 className="mt-3 heading-2 text-dark">Terms &amp; Conditions</h1>
            <p className="mt-4 text-sm text-dark-muted">Last updated: {lastUpdated}</p>
          </div>
        </Container>
      </div>

      {/* Body */}
      <Container>
        <div className="max-w-3xl py-10 lg:py-16 [&_h2]:mt-10 [&_h2]:text-base [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-[0.18em] [&_h2]:text-dark [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-dark-muted [&_ul]:text-sm [&_ul]:leading-relaxed [&_ul]:text-dark-muted [&_a]:text-dark [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-accent">
          <p>
            Please read these Terms &amp; Conditions carefully before using the {company} website or
            engaging our services. By accessing our website or contacting us, you agree to be bound
            by these terms.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By using this website, you confirm that you are at least 18 years of age and have the
            legal authority to agree to these terms. If you do not agree, please discontinue use of
            the website immediately.
          </p>

          <h2>2. Use of the Website</h2>
          <p>You agree to use this website only for lawful purposes and in a way that does not:</p>
          <ul>
            <li>Infringe the rights of others or restrict their use of the site.</li>
            <li>Transmit unsolicited commercial communications (spam).</li>
            <li>Introduce malicious code, viruses, or other harmful material.</li>
            <li>
              Attempt to gain unauthorized access to any part of the site or its infrastructure.
            </li>
          </ul>

          <h2>3. Intellectual Property</h2>
          <p>
            All content on this website — including text, images, graphics, logos, and design — is
            the property of {company} or its licensors and is protected by applicable copyright and
            trademark laws. You may not reproduce, distribute, or create derivative works without
            our prior written consent.
          </p>

          <h2>4. Contact Form &amp; Inquiries</h2>
          <p>
            Submitting a contact form constitutes an expression of interest only. It does not create
            a binding contract or guarantee the provision of services. All service engagements are
            subject to a separate written agreement signed by both parties.
          </p>

          <h2>5. Service Engagements</h2>
          <p>
            Any remodeling or design services provided by {company} are governed by a separate
            written contract agreed upon between {company} and the client. These Terms &amp;
            Conditions do not constitute or modify any such service agreement.
          </p>

          <h2>6. Disclaimers</h2>
          <p>
            This website and its content are provided &quot;as is&quot; without warranties of any
            kind, either express or implied. {company} does not warrant that the website will be
            uninterrupted, error-free, or free of viruses or other harmful components.
          </p>
          <p>
            Project outcomes, timelines, and costs displayed or discussed on this website are
            illustrative examples only and are not guarantees of results for any specific
            engagement.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, {company} shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages arising from your use of this
            website or reliance on any information provided herein.
          </p>

          <h2>8. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. These links are provided for your
            convenience only. {company} has no control over the content or availability of those
            sites and accepts no responsibility for them.
          </p>

          <h2>9. Privacy</h2>
          <p>
            Your use of this website is also governed by our{' '}
            <Link href="/privacy-policy">Privacy Policy</Link>, which is incorporated into these
            Terms by reference.
          </p>

          <h2>10. Changes to These Terms</h2>
          <p>
            We reserve the right to modify these Terms &amp; Conditions at any time. Changes are
            effective immediately upon posting. Your continued use of the website constitutes
            acceptance of the revised terms.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State
            of New York, without regard to its conflict of law provisions.
          </p>

          <h2>12. Contact</h2>
          <p>
            For questions about these Terms &amp; Conditions, contact us at{' '}
            <a href={`mailto:${email}`}>{email}</a>.
          </p>
        </div>
      </Container>
      <Footer />
    </main>
  )
}
