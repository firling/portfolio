import Image from 'next/image'

const skills = {
  languages: [
    { name: 'TypeScript', logo: '/logo/typescript.png' },
    { name: 'PHP', logo: '/logo/php.png' },
    { name: 'Python', logo: '/logo/python.png' },
    { name: 'Java', logo: '/logo/java.png' }
  ],
  frameworks: [
    { name: 'React.js', logo: '/logo/react.png' },
    { name: 'Next.js', logo: '/logo/nextjs.svg' },
    { name: 'Nest.js', logo: '/logo/nestjs.svg' },
    { name: 'Laravel', logo: '/logo/laravel.png' },
    { name: 'Vue.js', logo: '/logo/vue.png' },
    { name: 'Angular', logo: '/logo/angular.png' }
  ],
  ops: [
    { name: 'Docker', logo: '/logo/docker.svg' },
    { name: 'Kubernetes', logo: '/logo/kubernetes.png' },
    { name: 'GitLab CI', logo: '/logo/gitlab.png' }
  ],
  languages_spoken: [
    { name: 'Français', level: 'Langue maternelle' },
    { name: 'Anglais', level: 'Niveau C1' },
    { name: 'Espagnol', level: 'Notions' }
  ],
  interests: [
    'Tennis',
    'Musique',
    'Jeux Vidéo'
  ]
}

const education = [
  {
    degree: 'MBA Développeur Full-Stack',
    school: 'MyDigitalSchool',
    location: 'Annecy',
    period: '2021 - 2023'
  },
  {
    degree: 'Bachelor Sécurité Informatique',
    school: 'Pôle Sup de la Salle',
    location: 'Rennes',
    period: '2020 - 2021'
  },
  {
    degree: 'BTS SIO',
    school: 'Pôle Sup de la Salle',
    location: 'Rennes',
    period: '2018 - 2020'
  }
]

export default function SkillsAndEducation() {
  return (
    <section className="mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Colonne Compétences */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-white">Compétences</h2>

          {/* Compétences techniques */}
          <div className="space-y-4 mb-6">
            {/* Langages */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-4">
              <h3 className="text-base font-semibold text-white mb-3">
                Langages
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.languages.map((lang, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-zinc-800/70 text-zinc-300 border border-zinc-700/50 hover:border-zinc-600 transition-colors"
                  >
                    <div className="relative w-5 h-5 flex-shrink-0">
                      <Image
                        src={lang.logo}
                        alt={lang.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm">{lang.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Frameworks */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-4">
              <h3 className="text-base font-semibold text-white mb-3">
                Frameworks & Librairies
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.frameworks.map((framework, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-zinc-800/70 text-zinc-300 border border-zinc-700/50 hover:border-zinc-600 transition-colors"
                  >
                    <div className="relative w-5 h-5 flex-shrink-0">
                      <Image
                        src={framework.logo}
                        alt={framework.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm">{framework.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DevOps */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-4">
              <h3 className="text-base font-semibold text-white mb-3">
                DevOps & Outils
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.ops.map((op, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-zinc-800/70 text-zinc-300 border border-zinc-700/50 hover:border-zinc-600 transition-colors"
                  >
                    <div className="relative w-5 h-5 flex-shrink-0">
                      <Image
                        src={op.logo}
                        alt={op.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm">{op.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Langues et Intérêts */}
          <div className="grid grid-cols-2 gap-4">
            {/* Langues */}
            <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-white mb-3">
                Langues
              </h3>
              <div className="space-y-2">
                {skills.languages_spoken.map((lang, i) => (
                  <div key={i} className="flex flex-col text-xs">
                    <span className="text-zinc-300">{lang.name}</span>
                    <span className="text-zinc-500">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Centres d'intérêt */}
            <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-white mb-3">
                Intérêts
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.interests.map((interest, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs rounded-md bg-zinc-800/50 text-zinc-300 border border-zinc-700/30"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Colonne Formation */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-white">Formation</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition-colors"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
                  <p className="text-sm text-zinc-400">{edu.school} • {edu.location}</p>
                  <span className="text-xs text-zinc-500">{edu.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
