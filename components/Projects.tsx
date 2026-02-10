import Image from 'next/image'
import { getTechLogo } from '@/lib/techLogos'

const projects = [
  {
    name: 'Pledgr',
    description: 'Plateforme de fidélité pour restaurants. Interface tablette sans téléchargement d\'app, intégration caisse et dashboard de gestion en temps réel.',
    highlights: [
      'Architecture monorepo avec **Next.js 15** et **React 19**',
      'Base de données **PostgreSQL** avec **Drizzle ORM**',
      'Communication temps réel via **Socket.io**',
      'Application **PWA** avec **Serwist** pour une expérience native',
      'Personnalisation white-label (couleurs, logo, sous-domaine)',
      'Intégration caisse **Popina** pour le crédit automatique de points',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Drizzle', 'Socket.io', 'React.js'],
    category: 'Application Web Full-Stack',
    link: 'https://pledgr.fr',
    company: null,
    image: '/projects/pledgr.png'
  },
  {
    name: 'Le Ciselé',
    description: 'Site vitrine moderne pour un traiteur gastronomique à emporter. Interface élégante avec animations fluides et effets visuels raffinés.',
    highlights: [
      'Design moderne avec **Framer Motion** et animations au scroll',
      'Interface responsive et optimisée pour tous les appareils',
      'Système de gestion de contenu avec **Prisma**',
      'Authentification sécurisée avec **NextAuth**',
      'Envoi d\'emails avec **Resend**',
      'Hébergement des images avec **Vercel Blob**'
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Prisma', 'NextAuth', 'Vercel'],
    category: 'Site Vitrine',
    link: 'https://lecisele.fr',
    company: null,
    image: '/projects/le-cisele.png'
  },
  {
    name: 'Refonte Livecam Trinum',
    description: 'Refonte complète des interfaces de visualisation des webcams. Développement from scratch avec Next.js et Tailwind CSS pour une expérience utilisateur moderne.',
    highlights: [
      'Développement from scratch en **Next.js**',
      'Interface moderne et responsive avec **Tailwind CSS**',
      'Optimisation des performances de streaming',
      'Design system cohérent et réutilisable',
      'Amélioration significative de l\'UX'
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React'],
    category: 'Refonte Graphique',
    link: 'https://next.webcam-hd.com/webcam-station-la-plagne/roche-de-mio',
    company: 'Trinum',
    image: '/projects/livecam-refonte.png'
  },
  {
    name: 'SkiOnLive (SKOL)',
    description: 'Plateforme complète de diffusion en direct pour les stations de ski. Backend Symfony avec serveur WebSocket, frontend React avec TypeScript.',
    highlights: [
      'Architecture backend avec **Nest.js**',
      'Communication temps réel via **WebSocket** (socket.io)',
      'Interface utilisateur avec **React** et **Mantine**',
      'Gestion d\'état avec **Redux** et **TanStack**',
      'CI/CD avec **GitLab CI**'
    ],
    technologies: ['Nest.js', 'React.js', 'TypeScript', 'WebSocket', 'Redux', 'TanStack', 'Mantine', 'GitLab CI'],
    category: 'Application Web Full-Stack',
    link: null,
    company: 'Trinum',
    image: null
  },
]

export default function Projects() {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-white">Projets</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all hover:shadow-lg hover:shadow-blue-500/10 group"
          >
            {project.image && (
              <div className="relative w-full h-48 bg-zinc-800/50">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {project.category}
                  </span>
                  {project.company && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {project.company}
                    </span>
                  )}
                </div>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-semibold text-white hover:text-blue-400 transition-colors inline-flex items-center gap-2"
                  >
                    {project.name}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ) : (
                  <h3 className="text-xl font-semibold text-white">
                    {project.name}
                  </h3>
                )}
              </div>

            <p className="text-zinc-400 mb-4 text-sm leading-relaxed">
              {project.description}
            </p>

            <ul className="space-y-2 mb-4">
              {project.highlights.map((highlight, i) => (
                <li key={i} className="text-sm text-zinc-500 flex items-start gap-2">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span dangerouslySetInnerHTML={{ __html: highlight.replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-300">$1</strong>') }} />
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => {
                const logo = getTechLogo(tech)
                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-zinc-800/70 text-zinc-300 border border-zinc-700/50"
                  >
                    {logo && (
                      <div className="relative w-3.5 h-3.5 flex-shrink-0">
                        <Image
                          src={logo}
                          alt={tech}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    {tech}
                  </span>
                )
              })}
            </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
