import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import Orbit3D from './Orbit3D'

const grotesk = Space_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })

export const metadata: Metadata = {
  title: 'Julien Anquetil — Système orbital',
  description:
    "Portfolio immersif 3D de Julien Anquetil, développeur Full-Stack. Un système planétaire piloté au scroll : chaque planète est une mission.",
}

export default function Orbit3DPage() {
  return (
    <main className={grotesk.className}>
      <Orbit3D />
    </main>
  )
}
