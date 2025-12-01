import Hero from '@/components/Hero'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import SkillsAndEducation from '@/components/SkillsAndEducation'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <Hero />
        <Experience />
        <Projects />
        <SkillsAndEducation />
        <Footer />
      </div>
    </main>
  )
}
