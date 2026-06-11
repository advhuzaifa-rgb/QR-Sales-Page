import type { Metadata } from 'next'
import React from 'react'
import { Poppins } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const ppHatton = localFont({
  src: '../../../public/fonts/PPHatton-Regular.ttf',
  variable: '--font-pp-hatton',
  weight: '400',
  display: 'swap',
})

const modernline = localFont({
  src: '../../../public/fonts/modernline-personal-use.bold.otf',
  variable: '--font-modernline',
  weight: '700',
  display: 'swap',
})
export const metadata: Metadata = {
  title: 'Al Huzaifa',
  description:
    'Al Huzaifa ',
  keywords: [
    'interior design Dubai',
    'luxury interior design UAE',
    'hospitality interior design',
    'bespoke villa interiors',
    'commercial interior design Dubai',
    'F&B restaurant design',
    'residential interior design Dubai',
    'turnkey interior fit-out',
    'Al Huzaifa Design Studio',
    'design studio Dubai',
    'hotel interior design',
    'luxury apartment interiors',
  ],
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Al Huzaifa ',
    description:
      'Al Huzaifa ',
    siteName: 'Al Huzaifa ',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Al Huzaifa ',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Al Huzaifa ',
    description:
      'Al Huzaifa',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${poppins.variable} ${ppHatton.variable} ${modernline.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
