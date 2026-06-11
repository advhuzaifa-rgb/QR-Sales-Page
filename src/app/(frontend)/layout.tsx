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
  metadataBase: new URL('https://signaturepartners.alhuzaifa.com'),
  title: 'Signature Partners Card | Al Huzaifa',
  description:
    'Join the Al Huzaifa Signature Partners Card — exclusive privileges, preferred commissions, and priority access for trusted brokers and design partners. Apply for partnership today.',
  keywords: [
    'Al Huzaifa Signature Partners Card',
    'Al Huzaifa partner program',
    'broker partnership Dubai',
    'design partner program UAE',
    'preferred commission for brokers',
    'real estate broker rewards Dubai',
    'property collaboration UAE',
    'luxury partner program Dubai',
    'Al Huzaifa Properties',
    'Al Huzaifa furniture',
    'Al Huzaifa Design Studio',
    'become a signature partner',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Signature Partners Card | Al Huzaifa',
    description:
      'Exclusive privileges, preferred commissions, and priority access for trusted brokers and design partners. Become an Al Huzaifa Signature Partner.',
    url: 'https://signaturepartners.alhuzaifa.com',
    siteName: 'Al Huzaifa',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Al Huzaifa Signature Partners Card',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Signature Partners Card | Al Huzaifa',
    description:
      'Exclusive privileges, preferred commissions, and priority access for trusted brokers and design partners. Become an Al Huzaifa Signature Partner.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${ppHatton.variable} ${modernline.variable}`}
    >
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}