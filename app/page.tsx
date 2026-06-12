import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import Orbit3D from '@/components/Orbit3D'

const grotesk = Space_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })

export const metadata: Metadata = {
  title: 'Julien Anquetil — Développeur Full-Stack',
  description:
    'Portfolio immersif de Julien Anquetil, développeur Full-Stack. Un système orbital piloté au scroll : expériences, projets et compétences comme autant de planètes à explorer.',
}

export default function Home() {
  return (
    <main className={grotesk.className}>
      <Orbit3D />
    </main>
  )
}
