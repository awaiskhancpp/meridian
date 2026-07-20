import React from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui'

export const metadata = {
  title: 'Privacy Policy | Meridian',
  description:
    'How Meridian collects, uses, and protects your personal information when you use our website or contact us.',
}

export default function PrivacyPolicyPage() {
  const lastUpdated = 'July 10, 2026'
  const company = 'Meridian'
  const email = 'hello@meridian.studio'
  const address = '123 Artisan Lane, New York, NY 10001'

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-subtle py-16 lg:py-24">
        <Container>
          <div className="max-w-3xl">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.28em] text-dark-muted transition-colors hover:text-dark"
            >
              ← Back to home
            </Link>
            <p className="text-xs font-medium uppercase tracking-[0.34em] text-dark-muted">
              Legal
            </p>
            <h1 className="mt-3 text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm text-dark-muted">Last updated: {lastUpdated}</p>
          </div>
        </Container>
      </div>

      {/* Body */}
      <Container>
        <div className="prose prose-neutral max-w-3xl py-16 lg:py-20 [&_h2]:mt-10 [&_h2]:text-base [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-[0.18em] [&_h2]:text-dark [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-dark-muted [&_ul]:text-sm [&_ul]:leading-relaxed [&_ul]:text-dark-muted [&_a]:text-dark [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-accent">

          <p>
            {company} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website or submit a contact form.
          </p>

          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly to us, including:</p>
          <ul>
            <li><strong>Contact form data:</strong> name, email address, phone number, service of interest, and message content.</li>
            <li><strong>Technical data:</strong> IP address, browser type, operating system, referring URLs, and pages visited — collected automatically via server logs and analytics tools.</li>
            <li><strong>Cookies:</strong> small files stored on your device to improve your experience and analyze traffic.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your inquiries and provide the services you request.</li>
            <li>Send follow-up communications related to your project or consultation.</li>
            <li>Improve and optimize our website performance and user experience.</li>
            <li>Comply with applicable legal obligations.</li>
            <li>Prevent fraudulent or unauthorized use of our services.</li>
          </ul>
          <p>We do not sell, trade, or rent your personal information to third parties.</p>

          <h2>3. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to analyze trends, administer the
            website, and gather demographic information. You can control cookie settings through
            your browser preferences. Disabling cookies may affect some functionality of our site.
          </p>

          <h2>4. Third-Party Services</h2>
          <p>
            We may use third-party services such as analytics providers (e.g., Google Analytics)
            that collect, monitor, and analyze usage data. These providers have their own privacy
            policies governing use of that information.
          </p>

          <h2>5. Data Retention</h2>
          <p>
            We retain form submission data for as long as necessary to respond to your inquiry and
            fulfill any resulting engagement, or as required by law. You may request deletion of
            your data at any time by contacting us at{' '}
            <a href={`mailto:${email}`}>{email}</a>.
          </p>

          <h2>6. Data Security</h2>
          <p>
            We implement reasonable technical and organizational measures to protect your personal
            information from unauthorized access, disclosure, alteration, or destruction. However,
            no method of internet transmission is 100% secure and we cannot guarantee absolute
            security.
          </p>

          <h2>7. Your Rights</h2>
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Request correction of inaccurate data.</li>
            <li>Request deletion of your personal data.</li>
            <li>Object to or restrict certain processing of your data.</li>
            <li>Withdraw consent where processing is based on consent.</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{' '}
            <a href={`mailto:${email}`}>{email}</a>.
          </p>

          <h2>8. Children&apos;s Privacy</h2>
          <p>
            Our website is not directed to children under the age of 13. We do not knowingly collect
            personal information from children. If you believe we have inadvertently collected such
            information, please contact us immediately.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page
            with a revised &quot;last updated&quot; date. Continued use of our website after changes
            constitutes acceptance of the updated policy.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul>
            <li><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></li>
            <li><strong>Address:</strong> {address}</li>
          </ul>
        </div>
      </Container>
    </main>
  )
}
