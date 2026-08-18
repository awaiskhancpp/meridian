import localFont from 'next/font/local'
import React from 'react'
import './styles.css'

const hostGrotesk = localFont({
  src: '../fonts/HostGrotesk-Latin.woff2',
  weight: '300 800',
  style: 'normal',
  variable: '--font-host-grotesk',
  display: 'swap',
})

const allura = localFont({
  src: '../fonts/Allura-Latin.woff2',
  weight: '400',
  style: 'normal',
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
      <head>
        <link rel="icon" href="/favicon.ico?v=2" type="image/x-icon" />
      </head>
      <body className="min-h-screen bg-page font-sans text-dark antialiased selection:bg-accent selection:text-white">
        {children}
      </body>
    </html>
  )
}
