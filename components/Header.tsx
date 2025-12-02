import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.png"
                alt="Julien Anquetil"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-white font-semibold text-lg hidden sm:inline">
              Julien Anquetil
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <a
              href="#contact"
              className="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
            >
              Contact
            </a>
            <a
              href="/cv"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium text-white"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden sm:inline">CV</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
