import localFont from 'next/font/local'
import React from 'react'
import './styles.css'

const hostGrotesk = localFont({
  src: [
    { path: '../../fonts/HostGrotesk-Latin.woff2', weight: '300 800', style: 'normal' },
    { path: '../../fonts/HostGrotesk-LatinExt.woff2', weight: '300 800', style: 'normal' },
  ],
  variable: '--font-host-grotesk',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

const allura = localFont({
  src: [
    { path: '../../fonts/Allura-Latin.woff2', weight: '400', style: 'normal' },
    { path: '../../fonts/Allura-Latin2.woff2', weight: '400', style: 'normal' },
    { path: '../../fonts/Allura-LatinExt.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-allura',
  display: 'swap',
  fallback: ['cursive'],
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
