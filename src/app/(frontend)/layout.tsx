import { DM_Sans } from 'next/font/google'
import React from 'react'
import './styles.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-[family-name:var(--font-dm-sans)] bg-[#0d1b2a] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
