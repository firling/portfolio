import { Inter } from 'next/font/google'
import Hero from '@/components/layout/Hero'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Hero>
        <h1 className="text-4xl uppercase font-bold tracking-tight sm:text-6xl"><small>Salut, je suis</small> Julien Anquetil.</h1>
        <p className="mt-6 text-lg leading-8">
          Je suis un développeur fullstack Javascript. <br />
          & Auto entrepreneur depuis 3 ans
        </p>
        <div className='mt-6 flex space-x-4 justify-center'>
          <a href='#about' className="group transition duration-300">
            → En savoir plus
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
          </a>
          <a href='#project' className="group transition duration-300">
            → Découvrir mes projets
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
          </a>
        </div>
        
      </Hero>
      <section id='about' className="bg-stone-800 bg-pattern bg-repeat bg-center bg-fixed">
        <div className='container mx-auto'>
          zizon <br />
          zizon <br />
          zizon <br />
          zizon <br />
          zizon <br />
          zizon <br />
          zizon <br />
          zizon <br />
        </div>
      </section>
    </>
  )
}
