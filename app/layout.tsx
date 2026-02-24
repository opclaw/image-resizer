import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Online Tool',
  description: 'Free online tool',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
