'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { education, experiences, profile, projects, skills } from '@/lib/cv-data'
import { getTechLogo } from '@/lib/techLogos'

/* ── Champ d'étoiles avec parallax (canvas) ── */
function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let stars: { x: number; y: number; z: number; r: number; tw: number }[] = []
    const pointer = { x: 0, y: 0 }
    let scrollY = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Densité proportionnelle à la surface, graine déterministe par index
      const count = Math.floor((canvas.width * canvas.height) / 5000)
      stars = Array.from({ length: count }, (_, i) => {
        const seed = (n: number) => {
          const s = Math.sin(i * 127.1 + n * 311.7) * 43758.5453
          return s - Math.floor(s)
        }
        return {
          x: seed(1) * canvas.width,
          y: seed(2) * canvas.height,
          z: 0.2 + seed(3) * 0.8,
          r: 0.4 + seed(4) * 1.2,
          tw: seed(5) * Math.PI * 2,
        }
      })
    }

    const onMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const onScroll = () => {
      scrollY = window.scrollY
    }

    let t = 0
    const draw = () => {
      t += 0.015
      ctx.fillStyle = '#05060f'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      for (const s of stars) {
        const px = s.x + pointer.x * 18 * s.z
        const py = ((s.y + scrollY * 0.25 * s.z) % canvas.height + canvas.height) % canvas.height
        const alpha = 0.35 + 0.65 * Math.abs(Math.sin(t + s.tw))
        ctx.beginPath()
        ctx.arc(px, py + pointer.y * 12 * s.z, s.r * s.z, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(190, 210, 255, ${alpha * s.z})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" aria-hidden />
}

/* ── Apparition au scroll ── */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity .8s ease ${delay}ms, transform .8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ── Carte avec inclinaison 3D au survol ── */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(8px)`
  }
  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transition: 'transform .25s ease', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}

/* ── Rendu des segments **en gras** des textes du CV ── */
function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-slate-200">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  )
}

/* ── Badge techno avec logo ── */
function TechChip({ name, variant = 'indigo' }: { name: string; variant?: 'indigo' | 'neutral' | 'cyan' }) {
  const logo = getTechLogo(name)
  const styles = {
    indigo: 'border-indigo-400/30 text-indigo-200/90 bg-indigo-500/10',
    neutral: 'border-white/10 text-slate-300',
    cyan: 'border-cyan-300/20 bg-cyan-400/5 text-cyan-100/90',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-full border ${styles[variant]}`}>
      {logo && (
        <span className="relative w-3.5 h-3.5 shrink-0">
          <Image src={logo} alt={name} fill className="object-contain" />
        </span>
      )}
      {name}
    </span>
  )
}

/* ── Accordéon pour les détails (highlights / réalisations) ── */
function Details({ label, items }: { label: string; items: string[] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-t border-white/10 mt-4 pt-3">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-cyan-300/80 hover:text-cyan-200 transition-colors"
      >
        <span
          className="inline-block transition-transform duration-300"
          style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
        >
          ▸
        </span>
        {label}
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <ul className="space-y-2 pt-3">
            {items.map((item) => (
              <li key={item} className="text-sm text-slate-400 flex items-start gap-2.5 leading-relaxed">
                <span className="text-cyan-300/80 mt-0.5 shrink-0">✦</span>
                <span>
                  <RichText text={item} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const glass = 'bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl'

export default function Orbit() {
  return (
    <div className="min-h-screen text-slate-200 overflow-x-clip" style={{ background: '#05060f' }}>
      <Starfield />

      {/* Halo de nébuleuse fixe */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 50% at 70% 10%, rgba(99,102,241,0.16) 0%, transparent 70%), radial-gradient(50% 40% at 20% 80%, rgba(34,211,238,0.10) 0%, transparent 70%)',
        }}
      />

      {/* ── Héro ── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative">
        <p className="text-cyan-300/80 tracking-[0.5em] uppercase text-xs sm:text-sm mb-6 animate-pulse">
          Transmission entrante · {profile.location}
        </p>
        <h1
          className="font-bold leading-none mb-6"
          style={{
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            background: 'linear-gradient(180deg, #fff 30%, #818cf8 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 0 80px rgba(129,140,248,0.35)',
          }}
        >
          Julien
          <br />
          Anquetil
        </h1>
        <p className="text-lg sm:text-2xl font-light text-indigo-200/90">
          {profile.title} — <span className="text-cyan-300">{profile.yearsOfExperience}+ années en orbite</span>
        </p>
        <p className="mt-6 max-w-xl text-sm sm:text-base text-slate-400 leading-relaxed">{profile.tagline}</p>

        <div className="flex gap-4 mt-10">
          <a
            href={`mailto:${profile.email}`}
            className="px-6 py-3 rounded-full bg-indigo-500/90 hover:bg-indigo-400 text-white font-medium transition-colors shadow-[0_0_30px_rgba(99,102,241,0.5)]"
          >
            Établir le contact
          </a>
          <a
            href="/cv"
            target="_blank"
            className="px-6 py-3 rounded-full border border-white/20 hover:border-cyan-300/60 hover:text-cyan-200 transition-colors"
          >
            Journal de bord (CV)
          </a>
        </div>

        <div className="absolute bottom-10 flex flex-col items-center gap-2 text-slate-500 text-xs tracking-[0.3em] uppercase">
          Scroller pour explorer
          <span className="block w-px h-10 bg-gradient-to-b from-cyan-300/80 to-transparent" />
        </div>
      </section>

      {/* ── Journal de mission (expériences) ── */}
      <section className="max-w-5xl mx-auto px-6 py-28">
        <Reveal>
          <p className="text-cyan-300/80 tracking-[0.4em] uppercase text-xs mb-3">Phase 01</p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-16">Journal de mission</h2>
        </Reveal>
        <div className="relative pl-8 sm:pl-12">
          {/* Ligne de trajectoire */}
          <div className="absolute left-2 sm:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-300/60 via-indigo-400/40 to-transparent" />
          <div className="space-y-14">
            {experiences.map((exp, i) => (
              <Reveal key={exp.company + exp.period} delay={i * 120}>
                <article className="relative">
                  <span
                    className="absolute -left-8 sm:-left-12 top-2 w-4 h-4 sm:w-5 sm:h-5 -translate-x-[7px] sm:-translate-x-[9px] rounded-full border-2 border-cyan-300 bg-[#05060f]"
                    style={{ boxShadow: '0 0 16px rgba(34,211,238,0.7)' }}
                  />
                  <div className={`${glass} p-6 sm:p-8`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {exp.title} <span className="text-indigo-300 font-normal">@ {exp.company}</span>
                      </h3>
                      <span className="text-xs tracking-[0.25em] uppercase text-cyan-300/70">
                        {exp.period} · {exp.type}
                      </span>
                    </div>
                    <p className="text-slate-400 leading-relaxed mb-4">
                      <RichText text={exp.description} />
                    </p>
                    {exp.project && (
                      <p className="text-sm text-cyan-200/80 mb-4">Mission principale : {exp.project}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <TechChip key={tech} name={tech} variant="indigo" />
                      ))}
                    </div>
                    <Details label="Détails de la mission" items={exp.achievements} />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Constellations (projets) ── */}
      <section className="max-w-6xl mx-auto px-6 py-28">
        <Reveal>
          <p className="text-cyan-300/80 tracking-[0.4em] uppercase text-xs mb-3">Phase 02</p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-16">Constellations explorées</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={(i % 2) * 120}>
              <TiltCard className="h-full">
                <article className={`${glass} overflow-hidden h-full flex flex-col hover:border-cyan-300/40 transition-colors`}>
                  {p.image && (
                    <div className="relative w-full h-52">
                      <Image src={p.image} alt={p.name} fill className="object-cover opacity-90" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05060f] via-transparent to-transparent" />
                    </div>
                  )}
                  <div className="p-6 sm:p-7 flex flex-col gap-3 grow">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] tracking-[0.25em] uppercase text-cyan-300/80">{p.category}</span>
                      {p.company && <span className="text-[11px] tracking-[0.2em] uppercase text-indigo-300/70">{p.company}</span>}
                    </div>
                    {p.link ? (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl font-bold text-white hover:text-cyan-200 transition-colors w-fit"
                      >
                        {p.name} <span className="text-cyan-300">↗</span>
                      </a>
                    ) : (
                      <h3 className="text-2xl font-bold text-white">{p.name}</h3>
                    )}
                    <p className="text-sm text-slate-400 leading-relaxed grow">
                      <RichText text={p.description} />
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {p.technologies.map((tech) => (
                        <TechChip key={tech} name={tech} variant="neutral" />
                      ))}
                    </div>
                    <Details label="Points clés" items={p.highlights} />
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Systèmes embarqués (skills) + Académie ── */}
      <section className="max-w-5xl mx-auto px-6 py-28">
        <Reveal>
          <p className="text-cyan-300/80 tracking-[0.4em] uppercase text-xs mb-3">Phase 03</p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-16">Systèmes embarqués</h2>
        </Reveal>
        <Reveal>
          <div className={`${glass} px-6 sm:px-8 py-2`}>
            {(
              [
                ['Langages', skills.languages],
                ['Frameworks', skills.frameworks],
                ['DevOps', skills.ops],
              ] as [string, string[]][]
            ).map(([title, items]) => (
              <div
                key={title}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-5 border-b border-white/5 last:border-0"
              >
                <h3 className="text-sm tracking-[0.3em] uppercase text-indigo-300 sm:w-40 shrink-0">{title}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <TechChip key={item} name={item} variant="cyan" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className={`${glass} p-6 mt-6`}>
            <h3 className="text-sm tracking-[0.3em] uppercase text-indigo-300 mb-5">Académie</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {education.map((e) => (
                <div key={e.degree}>
                  <p className="text-white font-medium">{e.degree}</p>
                  <p className="text-sm text-slate-400 mt-1">{e.school}</p>
                  <p className="text-xs text-cyan-300/70 tracking-widest mt-1">{e.period}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Contact ── */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-32 text-center">
        <Reveal>
          <p className="text-cyan-300/80 tracking-[0.4em] uppercase text-xs mb-6">Fin de transmission</p>
          <h2 className="text-4xl sm:text-6xl font-bold leading-tight mb-8">
            Prêt à lancer une <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-400">nouvelle mission</span> ?
          </h2>
          <a
            href={`mailto:${profile.email}`}
            className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 text-[#05060f] font-bold text-lg hover:opacity-90 transition-opacity shadow-[0_0_50px_rgba(34,211,238,0.4)]"
          >
            {profile.email}
          </a>
          <div className="flex justify-center gap-8 mt-12 text-sm text-slate-400">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-200 transition-colors">
              GitHub ↗
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-200 transition-colors">
              LinkedIn ↗
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
