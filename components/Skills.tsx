const skills = {
  languages: [
    'JavaScript / TypeScript',
    'PHP',
    'Python'
  ],
  frameworks: [
    'React.js',
    'Next.js',
    'Node.js',
    'Nest.js',
    'Symfony',
    'Laravel',
    'Vue.js'
  ],
  ops: [
    'Docker',
    'Kubernetes',
    'GitLab CI',
    'Git'
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

export default function Skills() {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-white">Compétences</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Langages de programmation */}
        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-5">
          <h3 className="text-lg font-semibold text-white mb-3">
            Langages
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.languages.map((lang, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-sm rounded-md bg-zinc-800/70 text-zinc-300 border border-zinc-700/50"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Frameworks & Technologies */}
        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-5">
          <h3 className="text-lg font-semibold text-white mb-3">
            Frameworks & Librairies
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.frameworks.map((framework, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-sm rounded-md bg-zinc-800/70 text-zinc-300 border border-zinc-700/50"
              >
                {framework}
              </span>
            ))}
          </div>
        </div>

        {/* DevOps */}
        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-5">
          <h3 className="text-lg font-semibold text-white mb-3">
            DevOps & Outils
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.ops.map((op, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-sm rounded-md bg-zinc-800/70 text-zinc-300 border border-zinc-700/50"
              >
                {op}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Langues et centres d'intérêt en bas, plus petit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Langues */}
        <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-4">
          <h3 className="text-base font-semibold text-white mb-3">
            Langues
          </h3>
          <div className="space-y-2">
            {skills.languages_spoken.map((lang, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-zinc-300">{lang.name}</span>
                <span className="text-zinc-500">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Centres d'intérêt */}
        <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-4">
          <h3 className="text-base font-semibold text-white mb-3">
            Centres d'intérêt
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.interests.map((interest, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-sm rounded-md bg-zinc-800/50 text-zinc-300 border border-zinc-700/30"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
