import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import Orbit from './Orbit'

const grotesk = Space_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })

export const metadata: Metadata = {
  title: 'Julien Anquetil — Mission Full-Stack',
  description: 'Portfolio immersif de Julien Anquetil, développeur Full-Stack. Embarquez pour une exploration spatiale.',
}

export default function OrbitPage() {
  return (
    <main className={grotesk.className}>
      <Orbit />
    </main>
  )
}
