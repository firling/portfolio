import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Julien Anquetil — Développeur Full-Stack',
  description: 'Portfolio de Julien Anquetil, développeur Full-Stack basé à Annecy.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
