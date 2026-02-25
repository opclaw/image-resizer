import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://image-resizer.vercel.app'),
  title: 'Image Resizer — Resize Images Online | Free Tool',
  description: 'Resize images online for free. Change width, height, and maintain aspect ratio.',
  keywords: ['image resizer', 'resize image', 'image size', 'resize photos'],
  authors: [{ name: 'SmartOK Tools' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://image-resizer.vercel.app',
    siteName: 'Image Resizer',
    title: 'Image Resizer — Resize Images Online',
    description: 'Resize images online for free.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Resizer',
    description: 'Resize images online for free.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Image Resizer',
              applicationCategory: 'GraphicsApplication',
              operatingSystem: 'Any',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              featureList: 'Resize by pixels, Maintain aspect ratio, Download as PNG/JPG',
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50">{children}</body>
    </html>
  )
}
