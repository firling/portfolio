import Image from 'next/image'
import { getTechLogo } from '@/lib/techLogos'

const experiences = [
  {
    title: 'Développeur Full-Stack',
    company: 'Trinum',
    location: 'Annecy',
    period: 'Depuis septembre 2021',
    type: 'CDI',
    description: 'Seul développeur de l\'équipe, en charge du cycle complet : développement, infrastructure, mise en production et support.',
    project: 'SkiOnLive (SKOL)',
    achievements: [
      'Développement du backend en **Nest.js**',
      'Mise en place d\'un serveur **WebSocket** avec Socket.io',
      'Développement du frontend en **React.js**',
      'Utilisation de **TypeScript**, **Redux**, **TanStack**, **Mantine**, Bootstrap',
      'Automatisation du déploiement avec **GitLab CI**',
      'Développement de SkolBox avec **Express.js** et **React.js**',
      'Boitier de diffusion Windows synchronisé avec le Backoffice en **WebSocket**',
      'Création de scripts **bat** et **PowerShell** de déploiement'
    ],
    technologies: ['Nest.js', 'React.js', 'TypeScript', 'WebSocket', 'Redux', 'TanStack', 'Mantine', 'GitLab CI', 'Express.js', 'PowerShell']
  },
  {
    title: 'Développeur Full-Stack',
    company: 'Freelance',
    location: 'Rennes',
    period: 'Mai 2020 - Février 2022',
    type: 'Freelance',
    description: 'Création de Backoffice web pour différents clients.',
    achievements: [
      'Développement d\'une application de génération de Leads avec **Laravel**, **Vue.js**, **Node.js**',
      'Développement d\'une application de mise en relation entre diagnostiqueurs immobiliers et particuliers avec **Symfony**'
    ],
    technologies: ['Laravel', 'Vue.js', 'Node.js', 'Symfony']
  },
  {
    title: 'Développeur web',
    company: 'Service d\'infrastructure de la Défense',
    location: 'Brest',
    period: 'Septembre 2020 - Juillet 2021',
    type: 'Alternance',
    description: 'Développement d\'une application en **React.js** et **Python** pour cartographier les infrastructures et identifier les vulnérabilités cyber.',
    achievements: [
      'Cartographie des infrastructures',
      'Identification des vulnérabilités',
      'Application de visualisation des risques'
    ],
    technologies: ['React.js', 'Python']
  }
]

export default function Experience() {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-white">Expériences professionnelles</h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all hover:shadow-lg hover:shadow-purple-500/10"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
              <div>
                <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                <p className="text-purple-400 font-medium">{exp.company} • {exp.location}</p>
              </div>
              <div className="flex flex-col sm:items-end gap-1">
                <span className="text-sm text-zinc-400">{exp.period}</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 w-fit">
                  {exp.type}
                </span>
              </div>
            </div>

            {exp.project && (
              <p className="text-sm font-medium text-blue-400 mb-2">Projet: {exp.project}</p>
            )}

            <p className="text-zinc-400 mb-4" dangerouslySetInnerHTML={{ __html: exp.description.replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-300">$1</strong>') }} />

            <ul className="space-y-2 mb-4">
              {exp.achievements.map((achievement, i) => (
                <li key={i} className="text-sm text-zinc-500 flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span dangerouslySetInnerHTML={{ __html: achievement.replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-300">$1</strong>') }} />
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech, i) => {
                const logo = getTechLogo(tech)
                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-full bg-zinc-800/50 text-zinc-300 border border-zinc-700/50"
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
        ))}
      </div>
    </section>
  )
}
