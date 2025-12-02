import Image from 'next/image'
import { getTechLogo } from '@/lib/techLogos'
import PrintButton from '@/components/PrintButton'

const experiences = [
  {
    title: 'Développeur Full-Stack',
    company: 'Trinum',
    location: 'Annecy',
    period: 'Depuis sept. 2021',
    type: 'CDI',
    description: 'Seul développeur de l\'équipe, en charge du cycle complet : développement, infrastructure, mise en production et support.',
    achievements: [
      'Développement du backend en **Nest.js** avec architecture microservices',
      'Mise en place serveur **WebSocket** (Socket.io) pour communication temps réel',
      'Développement frontend **React.js** avec **TypeScript**, **Redux**, **TanStack**, **Mantine**',
      'Automatisation CI/CD avec **GitLab CI**',
      'Développement SkolBox (**Express.js**/**React**) avec scripts **PowerShell**'
    ],
    technologies: ['Nest.js', 'React.js', 'TypeScript', 'GitLab CI']
  },
  {
    title: 'Développeur Full-Stack',
    company: 'Freelance',
    location: 'Rennes',
    period: 'Mai 2020 - Fév. 2022',
    type: 'Freelance',
    achievements: [
      'Application de génération de Leads (**Laravel**, **Vue.js**, **Node.js**)',
      'Plateforme de mise en relation diagnostiqueurs immobiliers (**Symfony**)'
    ],
    technologies: ['Laravel', 'Vue.js', 'React.js', 'Python']
  },
  {
    title: 'Développeur web',
    company: 'Service d\'infrastructure de la Défense',
    location: 'Brest',
    period: 'Sept. 2020 - Juil. 2021',
    type: 'Alternance',
    achievements: [
      'Application **React.js**/**Python** de cartographie des infrastructures',
      'Identification des vulnérabilités cyber'
    ],
    technologies: ['React.js', 'Python']
  }
]

const projects = [
  {
    name: 'Le Ciselé',
    link: 'lecisele.fr',
    description: 'Site vitrine traiteur gastronomique',
    tech: ['Next.js', 'TypeScript', 'Prisma']
  },
  {
    name: 'SkiOnLive',
    description: 'Plateforme diffusion stations de ski',
    tech: ['Nest.js', 'React.js', 'WebSocket']
  },
  {
    name: 'SkolBox',
    description: 'Boîtier diffusion Windows',
    tech: ['Express.js', 'React.js']
  },
  {
    name: 'Livecam Trinum',
    description: 'Refonte interfaces webcams',
    tech: ['Next.js', 'TypeScript']
  }
]

const skills = {
  languages: ['TypeScript', 'PHP', 'Python', 'Java'],
  frameworks: ['React.js', 'Next.js', 'Nest.js', 'Laravel', 'Vue.js'],
  ops: ['Docker', 'Kubernetes', 'GitLab CI']
}

const education = [
  { degree: 'MBA Développeur Full-Stack', school: 'MyDigitalSchool Annecy', period: '2021-2023' },
  { degree: 'Bachelor Sécurité Informatique', school: 'Pôle Sup de la Salle Rennes', period: '2020-2021' },
  { degree: 'BTS SIO', school: 'Pôle Sup de la Salle Rennes', period: '2018-2020' }
]

export default function CVPage() {
  return (
    <div className="min-h-screen bg-white p-4 md:p-8 print:p-0">
      {/* Container A4 */}
      <div className="w-full max-w-full md:max-w-[210mm] mx-auto bg-white md:shadow-lg print:shadow-none print:max-w-full">
        {/* Page A4 */}
        <div className="w-full md:w-[210mm] print:w-full min-h-0 print:min-h-0 p-4 md:p-8 print:p-12 flex flex-col">
          {/* Header */}
          <header className="mb-4 md:mb-6 pb-4 border-b-2 border-gray-300">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0">
                <Image
                  src="/profile.png"
                  alt="Julien Anquetil"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Julien ANQUETIL</h1>
                <p className="text-base md:text-lg text-gray-700 font-medium mb-2">Développeur Full-Stack</p>
                <div className="flex flex-wrap gap-x-3 md:gap-x-4 gap-y-1 text-xs md:text-sm text-gray-600">
                  <span>✉️ julien@anquetil.org</span>
                  <span>📍 Annecy, France</span>
                  <span>🎂 25 ans</span>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600 mt-2">
                  <a href="https://julien.anquetil.org" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                    🌐 julien.anquetil.org
                  </a>
                  <a href="https://linkedin.com/in/julien-anquetil" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-blue-600">
                    <div className="relative w-3 h-3 flex-shrink-0">
                      <Image
                        src="/logo/linkedin.png"
                        alt="LinkedIn"
                        fill
                        className="object-contain"
                      />
                    </div>
                    @julien-anquetil
                  </a>
                  <a href="https://github.com/firling" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-blue-600">
                    <div className="relative w-3 h-3 flex-shrink-0">
                      <Image
                        src="/logo/github.png"
                        alt="GitHub"
                        fill
                        className="object-contain"
                      />
                    </div>
                    @firling
                  </a>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-3 leading-relaxed">
              Plus de 5 ans d'expérience en conception et développement d'applications web complètes.
              Expert en architecture logicielle, déploiement continu et optimisation des performances.
            </p>
          </header>

          {/* Main content grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 print:grid-cols-3 gap-4 md:gap-6">
            {/* Colonne principale (2/3) */}
            <div className="md:col-span-2 print:col-span-2 space-y-4">
              {/* Expériences */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3 pb-1 border-b border-gray-300">
                  Expériences professionnelles
                </h2>
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="text-sm">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="font-bold text-gray-900">{exp.title}</h3>
                          <p className="text-gray-700">{exp.company} • {exp.location}</p>
                        </div>
                        <span className="text-xs text-gray-600 whitespace-nowrap">{exp.period}</span>
                      </div>
                      {exp.description && (
                        <p className="text-gray-600 text-xs mb-1 italic">{exp.description}</p>
                      )}
                      <ul className="space-y-0.5 mb-2">
                        {exp.achievements.map((achievement, j) => (
                          <li key={j} className="text-xs text-gray-700 flex gap-1">
                            <span className="text-blue-600">•</span>
                            <span dangerouslySetInnerHTML={{ __html: achievement.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1">
                        {exp.technologies.map((tech, j) => {
                          const logo = getTechLogo(tech)
                          return (
                            <span
                              key={j}
                              className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded border border-gray-300"
                            >
                              {logo && (
                                <div className="relative w-2.5 h-2.5 flex-shrink-0">
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
                  ))}
                </div>
              </section>

              {/* Formation */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-2 pb-1 border-b border-gray-300">
                  Formation
                </h2>
                <div className="space-y-2">
                  {education.map((edu, i) => (
                    <div key={i} className="text-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                          <p className="text-xs text-gray-600">{edu.school}</p>
                        </div>
                        <span className="text-xs text-gray-600 whitespace-nowrap">{edu.period}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Colonne latérale (1/3) */}
            <div className="space-y-4">
              {/* Projets */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-2 pb-1 border-b border-gray-300">
                  Projets
                </h2>
                <div className="space-y-2">
                  {projects.map((project, i) => (
                    <div key={i} className="text-xs">
                      <h3 className="font-bold text-gray-900 text-sm">
                        {project.name}
                      </h3>
                      {project.link && (
                        <a
                          href={`https://${project.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-500 hover:text-blue-600"
                        >
                          {project.link}
                        </a>
                      )}
                      <p className="text-gray-600 mb-1">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.tech.map((tech, j) => {
                          const logo = getTechLogo(tech)
                          return (
                            <span
                              key={j}
                              className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                            >
                              {logo && (
                                <div className="relative w-2 h-2 flex-shrink-0">
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
                  ))}
                </div>
              </section>

              {/* Compétences */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-2 pb-1 border-b border-gray-300">
                  Compétences
                </h2>
                <div className="space-y-2">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-700 mb-1">Langages</h3>
                    <div className="flex flex-wrap gap-1">
                      {skills.languages.map((lang, i) => {
                        const logo = getTechLogo(lang)
                        return (
                          <span
                            key={i}
                            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-700 rounded"
                          >
                            {logo && (
                              <div className="relative w-2 h-2 flex-shrink-0">
                                <Image
                                  src={logo}
                                  alt={lang}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            )}
                            {lang}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-700 mb-1">Frameworks</h3>
                    <div className="flex flex-wrap gap-1">
                      {skills.frameworks.map((fw, i) => {
                        const logo = getTechLogo(fw)
                        return (
                          <span
                            key={i}
                            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-700 rounded"
                          >
                            {logo && (
                              <div className="relative w-2 h-2 flex-shrink-0">
                                <Image
                                  src={logo}
                                  alt={fw}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            )}
                            {fw}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-700 mb-1">DevOps</h3>
                    <div className="flex flex-wrap gap-1">
                      {skills.ops.map((op, i) => {
                        const logo = getTechLogo(op)
                        return (
                          <span
                            key={i}
                            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-700 rounded"
                          >
                            {logo && (
                              <div className="relative w-2 h-2 flex-shrink-0">
                                <Image
                                  src={logo}
                                  alt={op}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            )}
                            {op}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </section>

              {/* Langues */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-2 pb-1 border-b border-gray-300">
                  Langues
                </h2>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Français</span>
                    <span className="text-gray-600">Natif</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Anglais</span>
                    <span className="text-gray-600">C1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Espagnol</span>
                    <span className="text-gray-600">Notions</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton d'impression (masqué à l'impression) */}
      <PrintButton />
    </div>
  )
}
