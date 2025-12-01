export const techLogos: Record<string, string> = {
  'React.js': '/logo/react.png',
  'Next.js': '/logo/nextjs.svg',
  'Nest.js': '/logo/nestjs.svg',
  'TypeScript': '/logo/typescript.png',
  'Python': '/logo/python.png',
  'Vue.js': '/logo/vue.png',
  'Laravel': '/logo/laravel.png',
  'PHP': '/logo/php.png',
  'Java': '/logo/java.png',
  'Angular': '/logo/angular.png',
  'GitLab CI': '/logo/gitlab.png',
  'Docker': '/logo/docker.svg',
  'Kubernetes': '/logo/kubernetes.png',
}

export function getTechLogo(techName: string): string | null {
  return techLogos[techName] || null
}
