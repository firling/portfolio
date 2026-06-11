'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  education,
  experiences,
  profile,
  projects,
  skills,
  type ExperienceItem,
  type ProjectItem,
} from '@/lib/cv-data'
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
        const py = ((s.y + scrollY * 0.08 * s.z) % canvas.height + canvas.height) % canvas.height
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
// Ouvert par défaut sur desktop (la fiche a la place), replié sur mobile
function Details({ label, items }: { label: string; items: string[] }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(min-width: 768px)').matches) setOpen(true)
  }, [])
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

const glass = 'bg-[#0a0c1c]/80 backdrop-blur-md border border-white/10 rounded-2xl'

/* ── Les trois systèmes du voyage : chacun a sa couleur et sa forme d'orbite ── */
interface SystemDef {
  title: string
  subtitle: string
  color: string
  rxMul: number
  ryMul: number
  tiltDeg: number
}

const SYSTEMS: SystemDef[] = [
  {
    title: 'Expériences',
    subtitle: 'Journal de mission — trois postes, du backend à la production',
    color: '#818cf8',
    rxMul: 1,
    ryMul: 0.34,
    tiltDeg: -6,
  },
  {
    title: 'Projets',
    subtitle: 'Constellations explorées — quatre applications livrées',
    color: '#22d3ee',
    rxMul: 1.12,
    ryMul: 0.2,
    tiltDeg: 8,
  },
  {
    title: 'Compétences',
    subtitle: "Inventaire de bord — l'arsenal embarqué pour chaque mission",
    color: '#fbbf24',
    rxMul: 0.85,
    ryMul: 0.46,
    tiltDeg: -10,
  },
]

/* ── Étapes du voyage : intro → arrivée + planètes de chaque système → contact ── */
// Libellés courts pour les planètes et le rail (les noms longs débordent de l'écran)
const SHORT_LABEL: Record<string, string> = {
  "Service d'infrastructure de la Défense": 'Défense',
}

type Stop =
  | { kind: 'intro'; label: string }
  | { kind: 'contact'; label: string }
  | { kind: 'arrival'; label: string; sys: number }
  | { kind: 'exp'; label: string; sys: number; size: number; exp: ExperienceItem }
  | { kind: 'project'; label: string; sys: number; size: number; project: ProjectItem }
  | { kind: 'skillcat'; label: string; sys: number; size: number; items: string[] }
  | { kind: 'edu'; label: string; sys: number; size: number }

const STOPS: Stop[] = [
  { kind: 'intro', label: 'Départ' },
  { kind: 'arrival', label: 'Expériences', sys: 0 },
  ...experiences.map((exp) => ({
    kind: 'exp' as const,
    label: SHORT_LABEL[exp.company] ?? exp.company,
    sys: 0,
    size: 54,
    exp,
  })),
  { kind: 'arrival', label: 'Projets', sys: 1 },
  ...projects.map((project) => ({
    kind: 'project' as const,
    label: project.name,
    sys: 1,
    size: 46,
    project,
  })),
  { kind: 'arrival', label: 'Compétences', sys: 2 },
  { kind: 'skillcat', label: 'Langages', sys: 2, size: 42, items: skills.languages },
  { kind: 'skillcat', label: 'Frameworks', sys: 2, size: 42, items: skills.frameworks },
  { kind: 'skillcat', label: 'DevOps', sys: 2, size: 42, items: skills.ops },
  { kind: 'edu', label: 'Académie', sys: 2, size: 42 },
  { kind: 'contact', label: 'Contact' },
]

const isBody = (s: Stop): s is Extract<Stop, { size: number }> =>
  s.kind === 'exp' || s.kind === 'project' || s.kind === 'skillcat' || s.kind === 'edu'

// Géométrie de chaque système : étape d'arrivée + index globaux de ses planètes
const SYS_META = SYSTEMS.map((_, s) => {
  const arr = STOPS.findIndex((st) => st.kind === 'arrival' && st.sys === s)
  const bodyIdx = STOPS.map((st, i) => (isBody(st) && st.sys === s ? i : -1)).filter((i) => i >= 0)
  return { arr, first: bodyIdx[0], last: bodyIdx[bodyIdx.length - 1], count: bodyIdx.length, bodyIdx }
})

const KIND_LABEL: Record<string, string> = {
  exp: 'Expérience',
  project: 'Projet',
  skillcat: 'Module',
  edu: 'Formation',
}

/* ── Contenu de la fiche affichée quand une planète est au premier plan ── */
function StopCard({ stop, pos, count }: { stop: Stop; pos: number; count: number }) {
  if (!isBody(stop)) return null
  const sys = SYSTEMS[stop.sys]
  const header = (
    <p className="text-[10px] tracking-[0.3em] uppercase text-slate-500 mb-3">
      <span style={{ color: `${sys.color}cc` }}>{sys.title}</span> · {pos}/{count} · {KIND_LABEL[stop.kind]}
    </p>
  )

  if (stop.kind === 'exp') {
    const { exp } = stop
    return (
      <>
        {header}
        <p className="text-[11px] tracking-[0.25em] uppercase text-cyan-300/80 mb-2">
          {exp.period} · {exp.type}
        </p>
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          {exp.title} <span className="text-indigo-300 font-normal">@ {exp.company}</span>
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed mt-3">
          <RichText text={exp.description} />
        </p>
        {exp.project && <p className="text-xs text-cyan-200/80 mt-2">Mission principale : {exp.project}</p>}
        <div className="flex flex-wrap gap-2 mt-4">
          {exp.technologies.map((tech) => (
            <TechChip key={tech} name={tech} variant="indigo" />
          ))}
        </div>
        <Details label="Détails de la mission" items={exp.achievements} />
      </>
    )
  }

  if (stop.kind === 'project') {
    const { project: p } = stop
    return (
      <>
        {header}
        {p.image && (
          <div className="relative w-full h-32 rounded-xl overflow-hidden mb-4 hidden md:block">
            <Image src={p.image} alt={p.name} fill className="object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c1c] via-transparent to-transparent" />
          </div>
        )}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] tracking-[0.25em] uppercase text-cyan-300/80">{p.category}</span>
          {p.company && (
            <span className="text-[11px] tracking-[0.2em] uppercase text-indigo-300/70">{p.company}</span>
          )}
        </div>
        {p.link ? (
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl sm:text-2xl font-bold text-white hover:text-cyan-200 transition-colors w-fit"
          >
            {p.name} <span className="text-cyan-300">↗</span>
          </a>
        ) : (
          <h3 className="text-xl sm:text-2xl font-bold text-white">{p.name}</h3>
        )}
        <p className="text-sm text-slate-400 leading-relaxed mt-3">
          <RichText text={p.description} />
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {p.technologies.map((tech) => (
            <TechChip key={tech} name={tech} variant="neutral" />
          ))}
        </div>
        <Details label="Points clés" items={p.highlights} />
      </>
    )
  }

  if (stop.kind === 'skillcat') {
    return (
      <>
        {header}
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">{stop.label}</h3>
        <div className="flex flex-wrap gap-2">
          {stop.items.map((item) => (
            <TechChip key={item} name={item} variant="cyan" />
          ))}
        </div>
      </>
    )
  }

  // edu
  return (
    <>
      {header}
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Académie</h3>
      <ul className="space-y-3">
        {education.map((e) => (
          <li key={e.degree} className="text-sm">
            <p className="text-white font-medium">{e.degree}</p>
            <p className="text-slate-400">
              {e.school} — {e.location}
              <span className="text-cyan-300/70 text-xs tracking-widest ml-2">{e.period}</span>
            </p>
          </li>
        ))}
      </ul>
      <div className="border-t border-white/10 mt-4 pt-3 text-sm text-slate-400 space-y-1.5">
        <p>
          <span className="text-[11px] tracking-[0.25em] uppercase text-indigo-300 mr-2">Langues</span>
          {skills.spoken.map((l) => `${l.name} (${l.level})`).join(' · ')}
        </p>
        <p>
          <span className="text-[11px] tracking-[0.25em] uppercase text-indigo-300 mr-2">Intérêts</span>
          {skills.interests.join(' · ')}
        </p>
      </div>
    </>
  )
}

export default function Orbit3D() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const systemRef = useRef<HTMLDivElement>(null)
  const sunRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const outroRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLElement>(null)
  const planetEls = useRef<(HTMLButtonElement | null)[]>([])
  const cardEls = useRef<(HTMLDivElement | null)[]>([])
  const ringEls = useRef<(HTMLDivElement | null)[]>([])
  const titleEls = useRef<(HTMLDivElement | null)[]>([])
  const nebulaEls = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)

  const scrollToStop = useCallback((i: number) => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const chapter = (wrapper.offsetHeight - window.innerHeight) / (STOPS.length - 1)
    const top = wrapper.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + i * chapter, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const N = STOPS.length
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    let displayed = 0
    let lastActive = -1
    const dim = { rx: 300, mobile: false }

    const measure = () => {
      const vw = window.innerWidth
      dim.mobile = vw < 768
      dim.rx = dim.mobile ? Math.min(vw * 0.4, 170) : Math.min(vw * 0.26, 340)
    }

    const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
    // Easing continu : ralenti près des étapes mais jamais de zone morte,
    // sinon les crans de la molette semblent ne rien faire (effet "site buggé")
    const ramp = (t: number) => t * t * (3 - 2 * t)

    const render = (p: number) => {
      const journey = clamp01(p)
      const outro = clamp01(p - (N - 2))

      let maxPresence = 0
      let maxZone = 0

      SYS_META.forEach((m, s) => {
        const sys = SYSTEMS[s]
        // Présence : le système apparaît à l'arrivée et disparaît après sa dernière planète
        const presence = Math.min(
          clamp01((p - (m.arr - 0.75)) / 0.55),
          clamp01((m.last + 0.75 - p) / 0.55)
        )
        // Zone "fiches" : pilote le décalage du système vers la gauche (desktop)
        const zone = Math.min(clamp01((p - (m.first - 0.6)) / 0.5), clamp01((m.last + 0.6 - p) / 0.5))
        maxPresence = Math.max(maxPresence, presence)
        maxZone = Math.max(maxZone, zone)

        const rx = dim.rx * sys.rxMul
        const ry = rx * sys.ryMul
        const phi = (sys.tiltDeg * Math.PI) / 180

        const ring = ringEls.current[s]
        if (ring) {
          ring.style.width = `${rx * 2}px`
          ring.style.height = `${ry * 2}px`
          ring.style.transform = `translate(-50%,-50%) rotate(${sys.tiltDeg}deg)`
          ring.style.opacity = `${presence * 0.55 * (1 - outro)}`
        }

        const title = titleEls.current[s]
        if (title) title.style.opacity = `${clamp01(1 - Math.abs(p - m.arr) / 0.55) * (1 - outro)}`

        const nebula = nebulaEls.current[s]
        if (nebula) nebula.style.opacity = `${presence * (1 - 0.5 * outro)}`

        const rot = (-(p - m.first) * Math.PI * 2) / m.count
        m.bodyIdx.forEach((stopIdx, b) => {
          const el = planetEls.current[stopIdx]
          if (!el) return
          const theta = rot + (b * Math.PI * 2) / m.count
          const z = Math.cos(theta) // 1 = premier plan, -1 = derrière le soleil
          const bx = Math.sin(theta) * rx
          const by = z * ry
          // Les planètes arrivent de loin et repartent au loin lors des transitions
          const fly = 1.7 - 0.7 * presence
          const x = (bx * Math.cos(phi) - by * Math.sin(phi)) * fly
          const y = (bx * Math.sin(phi) + by * Math.cos(phi)) * fly
          const depth = (z + 1) / 2
          const focus = clamp01(1 - Math.abs(p - stopIdx) / 0.5)
          const scale = (0.5 + depth * 0.5 + focus * 0.55) * (0.55 + 0.45 * presence) * (1 - 0.2 * outro)
          el.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale})`
          el.style.opacity = `${(0.3 + 0.7 * depth) * presence * (1 - 0.55 * outro)}`
          el.style.zIndex = `${100 + Math.round(z * 40)}`
          el.style.filter = `brightness(${0.75 + depth * 0.25 + focus * 0.35})`
          el.style.pointerEvents = presence > 0.25 ? 'auto' : 'none'
        })
      })

      // Décalage vers la gauche quand une fiche est affichée + léger zoom-out en voyage
      const sysEl = systemRef.current
      if (sysEl) {
        const shift = dim.mobile ? 0 : -window.innerWidth * 0.13 * maxZone * (1 - outro)
        const warp = 1 - 0.08 * (1 - maxPresence)
        sysEl.style.transform = `translate3d(${shift}px, 0, 0) scale(${warp})`
      }

      const sun = sunRef.current
      if (sun) {
        const s = 1 + 0.35 * (1 - journey) + 0.5 * outro
        sun.style.transform = `translate(-50%, -50%) scale(${s})`
        // Pendant l'intro et l'outro, le soleil s'efface en halo derrière les titres
        sun.style.opacity = `${0.3 + 0.7 * journey * (1 - outro)}`
      }

      for (let s = 0; s < N; s++) {
        const el = cardEls.current[s]
        if (!el) continue
        const prox = clamp01(1 - Math.abs(p - s) / 0.4)
        el.style.opacity = `${prox}`
        el.style.transform = `translateY(${(1 - prox) * 26}px)`
        el.style.pointerEvents = prox > 0.55 ? 'auto' : 'none'
      }

      const intro = introRef.current
      if (intro) intro.style.opacity = `${clamp01(1 - p / 0.65)}`

      const out = outroRef.current
      if (out) {
        const o = clamp01((p - (N - 2) - 0.35) / 0.5)
        out.style.opacity = `${o}`
        out.style.pointerEvents = o > 0.5 ? 'auto' : 'none'
      }

      const rail = railRef.current
      if (rail) rail.style.opacity = `${clamp01(p / 0.65)}`
    }

    // Snap directionnel pour la molette : à l'arrêt du scroll, on continue
    // dans le sens du mouvement dès qu'on a dépassé 10 % du chapitre — un seul
    // cran suffit pour avancer, et on ne revient jamais en arrière.
    // (jamais pendant un drag de barre de scroll : déclenché par la molette uniquement)
    let lastScrolled = -1
    let idleFrames = 0
    let lastWheel = 0
    let scrollDir = 0
    const onWheel = () => {
      lastWheel = performance.now()
    }

    const tick = () => {
      const total = wrapper.offsetHeight - window.innerHeight
      const chapter = total / (N - 1)
      const top = wrapper.getBoundingClientRect().top
      const scrolled = Math.min(Math.max(-top, 0), total)
      const pRaw = scrolled / chapter
      const i = Math.floor(pRaw)
      const target = Math.min(i + ramp(pRaw - i), N - 1)
      displayed += (target - displayed) * (reduced ? 1 : 0.09)
      if (Math.abs(target - displayed) < 0.001) displayed = target
      render(displayed)
      const act = Math.round(displayed)
      if (act !== lastActive) {
        lastActive = act
        setActive(act)
      }

      if (Math.abs(scrolled - lastScrolled) > 0.5) {
        scrollDir = Math.sign(scrolled - lastScrolled)
        lastScrolled = scrolled
        idleFrames = 0
      } else {
        idleFrames++
      }
      const frac = pRaw - i
      if (
        !reduced &&
        idleFrames === 12 &&
        frac > 0.04 &&
        frac < 0.96 &&
        performance.now() - lastWheel < 2500
      ) {
        let snapTo = Math.round(pRaw)
        if (scrollDir > 0 && frac > 0.1) snapTo = i + 1
        else if (scrollDir < 0 && frac < 0.9) snapTo = i
        snapTo = Math.min(Math.max(snapTo, 0), N - 1)
        window.scrollTo({ top: window.scrollY + top + snapTo * chapter, behavior: 'smooth' })
      }

      raf = requestAnimationFrame(tick)
    }

    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('wheel', onWheel, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', measure)
      window.removeEventListener('wheel', onWheel)
    }
  }, [])

  return (
    <div className="text-slate-200 overflow-x-clip" style={{ background: '#05060f' }}>
      <style>{`@keyframes o3d-sun { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.18); } }`}</style>
      <Starfield />

      {/* Halo de nébuleuse de base + teinte propre à chaque système */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 50% at 70% 10%, rgba(99,102,241,0.10) 0%, transparent 70%), radial-gradient(50% 40% at 20% 80%, rgba(34,211,238,0.06) 0%, transparent 70%)',
        }}
      />
      {SYSTEMS.map((sys, s) => (
        <div
          key={sys.title}
          ref={(el) => {
            nebulaEls.current[s] = el
          }}
          aria-hidden
          className="fixed inset-0 -z-10 pointer-events-none opacity-0"
          style={{
            background: `radial-gradient(55% 45% at 50% 45%, ${sys.color}1f 0%, transparent 70%)`,
          }}
        />
      ))}

      {/* Lien vers la version classique */}
      <a
        href="/designs/orbit"
        className="fixed top-5 right-5 z-40 text-[11px] tracking-[0.2em] uppercase text-slate-500 hover:text-cyan-200 transition-colors"
      >
        Vue classique ↗
      </a>

      {/* Rail de navigation : on sait toujours où on est */}
      <nav
        ref={railRef}
        aria-label="Étapes du voyage"
        className="fixed z-40 top-1/2 -translate-y-1/2 right-2 md:right-auto md:left-5 flex flex-col gap-2 md:gap-2.5"
        style={{ opacity: 0 }}
      >
        {STOPS.map((s, i) => {
          const isArrival = s.kind === 'arrival'
          const sysColor = isArrival || isBody(s) ? SYSTEMS[(s as { sys: number }).sys].color : '#67e8f9'
          return (
            <button
              key={`${s.kind}-${s.label}`}
              onClick={() => scrollToStop(i)}
              aria-label={s.label}
              className={`group flex items-center gap-3 py-0.5 ${isArrival ? 'mt-2.5' : ''}`}
            >
              <span
                className={`rounded-full transition-all duration-300 ${isArrival ? 'w-2.5 h-2.5' : 'w-2 h-2'} ${
                  active === i ? 'scale-125' : ''
                }`}
                style={{
                  background: active === i ? sysColor : isArrival ? `${sysColor}66` : 'rgba(255,255,255,0.25)',
                  boxShadow: active === i ? `0 0 10px ${sysColor}cc` : 'none',
                }}
              />
              <span
                className={`hidden md:block text-[10px] uppercase tracking-[0.2em] transition-opacity duration-300 ${
                  isArrival
                    ? active === i
                      ? 'opacity-100'
                      : 'opacity-60 group-hover:opacity-100'
                    : active === i
                      ? 'text-cyan-200 opacity-100'
                      : 'text-slate-400 opacity-0 group-hover:opacity-70'
                }`}
                style={isArrival ? { color: sysColor } : undefined}
              >
                {s.label}
              </span>
            </button>
          )
        })}
      </nav>

      {/* ── Scène orbitale épinglée, pilotée par le scroll ── */}
      <div ref={wrapperRef} className="relative" style={{ height: `${STOPS.length * 70}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Le voyage : soleil + systèmes successifs */}
          <div ref={systemRef} className="absolute inset-0 will-change-transform">
            {/* Titres d'arrivée dans chaque système */}
            {SYSTEMS.map((sys, s) => (
              <div
                key={sys.title}
                ref={(el) => {
                  titleEls.current[s] = el
                }}
                className="absolute inset-x-0 top-[10%] md:top-[14%] text-center px-6 opacity-0 pointer-events-none"
              >
                <p className="text-[11px] tracking-[0.4em] uppercase mb-2" style={{ color: sys.color }}>
                  Système {String(s + 1).padStart(2, '0')}
                </p>
                <h2 className="text-3xl sm:text-5xl font-bold text-white">{sys.title}</h2>
                <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">{sys.subtitle}</p>
              </div>
            ))}

            <div className="absolute left-1/2 top-1/2 max-md:top-[38%] w-0 h-0">
              {/* Trajectoires des orbites */}
              {SYSTEMS.map((sys, s) => (
                <div
                  key={sys.title}
                  ref={(el) => {
                    ringEls.current[s] = el
                  }}
                  aria-hidden
                  className="absolute left-0 top-0 rounded-full border border-dashed opacity-0"
                  style={{ zIndex: 50, borderColor: `${sys.color}33`, transform: 'translate(-50%,-50%)' }}
                />
              ))}

              {/* Le soleil : Julien, constant au fil du voyage */}
              <div ref={sunRef} className="absolute left-0 top-0" style={{ transform: 'translate(-50%,-50%)', zIndex: 100 }}>
                <div
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-indigo-300/40"
                  style={{
                    boxShadow: '0 0 60px rgba(129,140,248,0.8), 0 0 140px rgba(99,102,241,0.4)',
                    animation: 'o3d-sun 5s ease-in-out infinite',
                  }}
                >
                  <Image src="/profile.png" alt="Julien Anquetil" fill className="object-cover" sizes="112px" />
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'radial-gradient(circle at 35% 30%, transparent 45%, rgba(99,102,241,0.30) 100%)',
                      boxShadow: 'inset 0 0 26px rgba(99,102,241,0.45)',
                    }}
                  />
                </div>
              </div>

              {/* Les planètes : cliquables pour se rendre à l'étape */}
              {STOPS.map((stop, i) =>
                isBody(stop) ? (
                  <button
                    key={`${stop.kind}-${stop.label}`}
                    ref={(el) => {
                      planetEls.current[i] = el
                    }}
                    onClick={() => scrollToStop(i)}
                    aria-label={`Aller à ${stop.label}`}
                    className="absolute left-0 top-0 opacity-0 will-change-transform cursor-pointer pointer-events-none"
                    style={{ transform: 'translate(-50%,-50%)' }}
                  >
                    <span className="flex flex-col items-center gap-1.5">
                      <span
                        className="block rounded-full"
                        style={{
                          width: stop.size,
                          height: stop.size,
                          background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.85) 0%, ${SYSTEMS[stop.sys].color} 38%, #0b0d1f 100%)`,
                          boxShadow: `0 0 26px ${SYSTEMS[stop.sys].color}66, inset -8px -10px 18px rgba(0,0,0,0.55)`,
                        }}
                      />
                      <span className="text-[11px] font-medium text-slate-200 whitespace-nowrap">{stop.label}</span>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap">
                        {KIND_LABEL[stop.kind]}
                      </span>
                    </span>
                  </button>
                ) : null
              )}
            </div>
          </div>

          {/* Fiches d'étape (une par planète) */}
          <div className="absolute inset-0 pointer-events-none">
            {STOPS.map((stop, i) => {
              if (!isBody(stop)) return null
              const meta = SYS_META[stop.sys]
              return (
                <div
                  key={`${stop.kind}-${stop.label}`}
                  className="absolute left-4 right-8 bottom-5 md:left-auto md:right-[5vw] md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:w-[min(460px,38vw)]"
                >
                  <div
                    ref={(el) => {
                      cardEls.current[i] = el
                    }}
                    className={`${glass} p-5 sm:p-6 max-h-[50vh] md:max-h-[72vh] overflow-y-auto opacity-0 will-change-transform`}
                    style={{ pointerEvents: 'none' }}
                  >
                    <StopCard stop={stop} pos={meta.bodyIdx.indexOf(i) + 1} count={meta.count} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Intro : le héros, au centre du voyage */}
          <div
            ref={introRef}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
          >
            <p className="text-cyan-300/80 tracking-[0.5em] uppercase text-xs sm:text-sm mb-6">
              Transmission entrante · {profile.location}
            </p>
            <h1
              className="font-bold leading-none mb-5"
              style={{
                fontSize: 'clamp(2.6rem, 8vw, 6.5rem)',
                background: 'linear-gradient(180deg, #fff 30%, #818cf8 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 0 80px rgba(129,140,248,0.35)',
              }}
            >
              Julien Anquetil
            </h1>
            <p className="text-lg sm:text-2xl font-light text-indigo-200/90">
              {profile.title} — <span className="text-cyan-300">{profile.yearsOfExperience}+ années en orbite</span>
            </p>
            <p className="mt-5 max-w-xl text-sm sm:text-base text-slate-400 leading-relaxed">{profile.tagline}</p>
            <p className="mt-6 text-[11px] tracking-[0.3em] uppercase text-slate-500">
              Trois systèmes à explorer —{' '}
              {SYSTEMS.map((s, i) => (
                <span key={s.title}>
                  <span style={{ color: `${s.color}cc` }}>{s.title}</span>
                  {i < SYSTEMS.length - 1 && ' · '}
                </span>
              ))}
            </p>
            <div className="absolute bottom-10 flex flex-col items-center gap-2 text-slate-500 text-xs tracking-[0.3em] uppercase">
              Scrollez pour lancer la mission
              <span className="block w-px h-10 bg-gradient-to-b from-cyan-300/80 to-transparent" />
            </div>
          </div>

          {/* Outro : fin de transmission, contact */}
          <div
            ref={outroRef}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0"
            style={{ pointerEvents: 'none' }}
          >
            <p className="text-cyan-300/80 tracking-[0.4em] uppercase text-xs mb-6">Fin de transmission</p>
            <h2 className="text-3xl sm:text-6xl font-bold leading-tight mb-8 max-w-3xl">
              Prêt à lancer une{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-400">
                nouvelle mission
              </span>{' '}
              ?
            </h2>
            <a
              href={`mailto:${profile.email}`}
              className="inline-block px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 text-[#05060f] font-bold text-base sm:text-lg hover:opacity-90 transition-opacity shadow-[0_0_50px_rgba(34,211,238,0.4)]"
            >
              {profile.email}
            </a>
            <div className="flex justify-center gap-8 mt-10 text-sm text-slate-400">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-200 transition-colors">
                GitHub ↗
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-200 transition-colors">
                LinkedIn ↗
              </a>
              <a href="/cv" target="_blank" className="hover:text-cyan-200 transition-colors">
                Journal de bord (CV) ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
