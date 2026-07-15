import { Host_Grotesk, Allura } from 'next/font/google' // Use Google fonts instead
import React from 'react'
import './styles.css'

const hostGrotesk = Host_Grotesk({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-host-grotesk',
  display: 'swap',
})

const allura = Allura({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-allura',
  display: 'swap',
})

export const metadata = {
  description:
    'A warm, editorial remodeling template with a white background and soft brown accents.',
  title: 'Meridian | Remodeling Template',
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${hostGrotesk.variable} ${allura.variable}`}>
      <body className="min-h-screen bg-white font-[family-name:var(--font-host-grotesk)] text-dark antialiased selection:bg-accent selection:text-white">
        {children}
      </body>
    </html>
  )
}
