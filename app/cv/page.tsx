import Image from 'next/image'
import { getTechLogo } from '@/lib/techLogos'
import PrintButton from '@/components/PrintButton'
import { profile, experiences, projects, skills, education } from '@/lib/cv-data'

// Rend les segments **entre doubles astérisques** en gras.
function bold(text: string) {
  return { __html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }
}

// Première phrase d'une description, pour la colonne latérale compacte.
function firstSentence(text: string) {
  const end = text.indexOf('. ')
  return end === -1 ? text : text.slice(0, end + 1)
}

function hostOf(url: string) {
  try {
    return new URL(url).host
  } catch {
    return url
  }
}

const [firstName, ...lastNameParts] = profile.name.split(' ')
const lastName = lastNameParts.join(' ').toUpperCase()
const githubHandle = profile.github.replace(/\/+$/, '').split('/').pop()
const linkedinHandle = profile.linkedin.replace(/\/+$/, '').split('/').pop()

export default function CVPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 print:p-0 print:bg-white">
      {/* Container A4 */}
      <div className="w-[210mm] mx-auto bg-white shadow-lg print:shadow-none">
        {/* Page A4 */}
        <div className="w-[210mm] p-8 print:p-12 flex flex-col">
          {/* Header */}
          <header className="mb-6 pb-4 border-b-2 border-gray-300">
            <div className="flex items-start gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0">
                <Image
                  src="/profile.png"
                  alt={profile.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  {firstName} {lastName}
                </h1>
                <p className="text-lg text-gray-700 font-medium mb-2">{profile.title}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                  <span>✉️ {profile.email}</span>
                  <span>📍 {profile.location}</span>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600 mt-2">
                  <a href="https://julien.anquetil.org" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                    🌐 julien.anquetil.org
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-blue-600">
                    <div className="relative w-3 h-3 flex-shrink-0">
                      <Image
                        src="/logo/linkedin.png"
                        alt="LinkedIn"
                        fill
                        className="object-contain"
                      />
                    </div>
                    @{linkedinHandle}
                  </a>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-blue-600">
                    <div className="relative w-3 h-3 flex-shrink-0">
                      <Image
                        src="/logo/github.png"
                        alt="GitHub"
                        fill
                        className="object-contain"
                      />
                    </div>
                    @{githubHandle}
                  </a>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-3 leading-relaxed">{profile.tagline}</p>
          </header>

          {/* Main content grid */}
          <div className="flex-1 grid grid-cols-3 gap-6">
            {/* Colonne principale (2/3) */}
            <div className="col-span-2 space-y-4">
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
                        <p
                          className="text-gray-600 text-xs mb-1 italic"
                          dangerouslySetInnerHTML={bold(exp.description)}
                        />
                      )}
                      <ul className="space-y-0.5 mb-2">
                        {exp.achievements.map((achievement, j) => (
                          <li key={j} className="text-xs text-gray-700 flex gap-1">
                            <span className="text-blue-600">•</span>
                            <span dangerouslySetInnerHTML={bold(achievement)} />
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
                          <p className="text-xs text-gray-600">{edu.school} • {edu.location}</p>
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
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-500 hover:text-blue-600"
                        >
                          {hostOf(project.link)}
                        </a>
                      )}
                      <p className="text-gray-600 mb-1">{firstSentence(project.description)}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, j) => {
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
                  {([
                    ['Langages', skills.languages],
                    ['Frameworks', skills.frameworks],
                    ['DevOps', skills.ops],
                  ] as const).map(([label, items]) => (
                    <div key={label}>
                      <h3 className="text-xs font-semibold text-gray-700 mb-1">{label}</h3>
                      <div className="flex flex-wrap gap-1">
                        {items.map((item, i) => {
                          const logo = getTechLogo(item)
                          return (
                            <span
                              key={i}
                              className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-700 rounded"
                            >
                              {logo && (
                                <div className="relative w-2 h-2 flex-shrink-0">
                                  <Image
                                    src={logo}
                                    alt={item}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              )}
                              {item}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Langues */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-2 pb-1 border-b border-gray-300">
                  Langues
                </h2>
                <div className="space-y-1 text-xs">
                  {skills.spoken.map((lang, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-gray-700">{lang.name}</span>
                      <span className="text-gray-600">{lang.level}</span>
                    </div>
                  ))}
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
