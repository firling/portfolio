const education = [
  {
    degree: 'MBA Développeur Full-Stack',
    school: 'MyDigitalSchool',
    location: 'Annecy',
    period: 'Septembre 2021 - Juillet 2023'
  },
  {
    degree: 'Bachelor Sécurité Informatique',
    school: 'Pôle Sup de la Salle',
    location: 'Rennes',
    period: 'Septembre 2020 - Juillet 2021'
  },
  {
    degree: 'BTS Service Informatique aux Organisations',
    school: 'Pôle Sup de la Salle',
    location: 'Rennes',
    period: 'Septembre 2018 - Juillet 2020'
  }
]

export default function Education() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6 text-white">Formation</h2>
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div
            key={index}
            className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-4 hover:border-zinc-700/50 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
                <p className="text-sm text-zinc-400">{edu.school} • {edu.location}</p>
              </div>
              <span className="text-sm text-zinc-500">{edu.period}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
