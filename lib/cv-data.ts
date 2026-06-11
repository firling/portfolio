// Données centralisées du CV — partagées par les différents concepts de design (/designs/*)
// Les segments entre **doubles astérisques** sont rendus en gras par les composants.

export const profile = {
  name: 'Julien Anquetil',
  title: 'Développeur Full-Stack',
  tagline:
    "Plus de 6 ans d'expérience en conception et développement d'applications web complètes. Expert en architecture logicielle, déploiement continu et optimisation des performances.",
  email: 'julien@anquetil.org',
  linkedin: 'https://linkedin.com/in/julien-anquetil',
  github: 'https://github.com/firling',
  location: 'Annecy, France',
  yearsOfExperience: 6,
}

export interface ExperienceItem {
  title: string
  company: string
  location: string
  period: string
  start: string
  end: string | null
  type: string
  description: string
  project?: string
  achievements: string[]
  technologies: string[]
}

export const experiences: ExperienceItem[] = [
  {
    title: 'Développeur Full-Stack',
    company: 'Trinum',
    location: 'Annecy',
    period: 'Depuis septembre 2021',
    start: '2021',
    end: null,
    type: 'CDI',
    description:
      "Seul développeur de l'équipe, en charge du cycle complet : **développement**, **infrastructure**, **mise en production** et support.",
    project: 'SkiOnLive (SKOL)',
    achievements: [
      'Développement du backend en **Nest.js**',
      "Mise en place d'un serveur **WebSocket** avec Socket.io",
      'Développement du frontend en **React.js**',
      'Utilisation de **TypeScript**, **Redux**, **TanStack**, **Mantine**, Bootstrap',
      'Automatisation du déploiement avec **GitLab CI**',
      'Développement de SkolBox avec **Express.js** et **React.js**',
      'Boitier de diffusion Windows synchronisé avec le Backoffice en **WebSocket**',
      'Création de scripts **bat** et **PowerShell** de déploiement',
    ],
    technologies: [
      'Nest.js',
      'React.js',
      'TypeScript',
      'WebSocket',
      'Redux',
      'TanStack',
      'Mantine',
      'GitLab CI',
      'Express.js',
      'PowerShell',
    ],
  },
  {
    title: 'Développeur Full-Stack',
    company: 'Freelance',
    location: 'Rennes',
    period: 'Mai 2020 - Février 2022',
    start: '2020',
    end: '2022',
    type: 'Freelance',
    description: 'Création de **Backoffice web** pour différents clients.',
    achievements: [
      "Développement d'une application de génération de Leads avec **Laravel**, **Vue.js**, **Node.js**",
      "Développement d'une application de mise en relation entre diagnostiqueurs immobiliers et particuliers avec **Symfony**",
    ],
    technologies: ['Laravel', 'Vue.js', 'Node.js', 'Symfony'],
  },
  {
    title: 'Développeur web',
    company: "Service d'infrastructure de la Défense",
    location: 'Brest',
    period: 'Septembre 2020 - Juillet 2021',
    start: '2020',
    end: '2021',
    type: 'Alternance',
    description:
      "Développement d'une application en **React.js** et **Python** pour cartographier les infrastructures et identifier les vulnérabilités cyber.",
    achievements: [
      'Cartographie des infrastructures',
      'Identification des vulnérabilités',
      'Application de visualisation des risques',
    ],
    technologies: ['React.js', 'Python'],
  },
]

export interface ProjectItem {
  name: string
  description: string
  highlights: string[]
  technologies: string[]
  category: string
  link: string | null
  company: string | null
  image: string | null
}

export const projects: ProjectItem[] = [
  {
    name: 'Pledgr',
    description:
      "Plateforme de fidélité pour restaurants. Interface tablette sans téléchargement d'app, intégration caisse et dashboard de gestion en temps réel.",
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
    image: '/projects/pledgr.png',
  },
  {
    name: 'Le Ciselé',
    description:
      "Plateforme de commande en ligne pour un traiteur gastronomique : catalogue, click & collect et livraison, backoffice de gestion complet et PWA staff pour les tournées.",
    highlights: [
      'E-commerce complet : panier, **click & collect** et **livraison** avec zones dessinées sur carte (**Leaflet**)',
      'Optimisation des tournées de livraison avec **OSRM** et carte interactive pour le staff',
      'PWA staff avec **notifications Web Push** et suivi des commandes en temps réel (**SSE**)',
      'Authentification multi-canal : **Google OAuth**, email et **OTP SMS**',
      'Intégration native du programme de fidélité **Pledgr** (points et récompenses)',
      'Backoffice admin : plats, commandes, statistiques, zones, **factures PDF**',
    ],
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'NextAuth', 'Docker', 'Leaflet'],
    category: 'Application Web Full-Stack',
    link: 'https://lecisele.fr',
    company: null,
    image: '/projects/le-cisele.png',
  },
  {
    name: 'Refonte Livecam Trinum',
    description:
      'Refonte complète des interfaces de visualisation des webcams. Développement from scratch avec Next.js et Tailwind CSS pour une expérience utilisateur moderne.',
    highlights: [
      'Développement from scratch en **Next.js**',
      'Interface moderne et responsive avec **Tailwind CSS**',
      'Optimisation des performances de streaming',
      'Design system cohérent et réutilisable',
      "Amélioration significative de l'UX",
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React.js'],
    category: 'Refonte Graphique',
    link: 'https://next.webcam-hd.com/webcam-station-la-plagne/roche-de-mio',
    company: 'Trinum',
    image: '/projects/livecam-refonte.png',
  },
  {
    name: 'SkiOnLive (SKOL)',
    description:
      'Plateforme complète de diffusion en direct pour les stations de ski. Backend Nest.js avec serveur WebSocket, frontend React avec TypeScript.',
    highlights: [
      'Architecture backend avec **Nest.js**',
      'Communication temps réel via **WebSocket** (socket.io)',
      'Interface utilisateur avec **React** et **Mantine**',
      "Gestion d'état avec **Redux** et **TanStack**",
      'CI/CD avec **GitLab CI**',
    ],
    technologies: ['Nest.js', 'React.js', 'TypeScript', 'WebSocket', 'Redux', 'TanStack', 'Mantine', 'GitLab CI'],
    category: 'Application Web Full-Stack',
    link: null,
    company: 'Trinum',
    image: null,
  },
]

export const skills = {
  languages: ['TypeScript', 'PHP', 'Python', 'Java'],
  frameworks: ['React.js', 'Next.js', 'Nest.js', 'Laravel', 'Vue.js', 'Angular'],
  ops: ['Docker', 'Kubernetes', 'GitLab CI'],
  spoken: [
    { name: 'Français', level: 'Langue maternelle' },
    { name: 'Anglais', level: 'Niveau C1' },
    { name: 'Espagnol', level: 'Notions' },
  ],
  interests: ['Tennis', 'Musique', 'Jeux Vidéo'],
}

export interface EducationItem {
  degree: string
  school: string
  location: string
  period: string
}

export const education: EducationItem[] = [
  {
    degree: 'MBA Développeur Full-Stack',
    school: 'MyDigitalSchool',
    location: 'Annecy',
    period: '2021 - 2023',
  },
  {
    degree: 'Bachelor Sécurité Informatique',
    school: 'Pôle Sup de la Salle',
    location: 'Rennes',
    period: '2020 - 2021',
  },
  {
    degree: 'BTS SIO',
    school: 'Pôle Sup de la Salle',
    location: 'Rennes',
    period: '2018 - 2020',
  },
]
