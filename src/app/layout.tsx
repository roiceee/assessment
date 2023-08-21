import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Assessment website',
  description: 'Assessment website with login/signup functionality',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="synthwave">
      <body>{children}</body>
    </html>
  )
}
