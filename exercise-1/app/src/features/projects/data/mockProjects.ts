import type { Project } from '@/features/projects/model/project'

export const mockProjects: Project[] = [
  {
    demoUrl: 'https://example.com/editorial-atlas',
    description:
      'Landing editorial pensada para lanzar colecciones digitales con narrativa visual, jerarquia tipografica y una base escalable para CMS.',
    githubUrl: 'https://github.com/example/editorial-atlas',
    id: 1,
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    slugs: ['react', 'mui', 'cms', 'landing'],
    title: 'Editorial Atlas',
  },
  {
    demoUrl: 'https://example.com/north-studio',
    description:
      'Portfolio comercial para un estudio creativo con componentes reutilizables, contenido modular y un ritmo visual sobrio.',
    githubUrl: 'https://github.com/example/north-studio',
    id: 2,
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    slugs: ['vite', 'typescript', 'portfolio', 'design-system'],
    title: 'North Studio',
  },
  {
    demoUrl: 'https://example.com/frame-commerce',
    description:
      'Experiencia orientada a producto para presentar datos, catalogo y acciones clave sin ruido ni sobrecarga visual.',
    githubUrl: 'https://github.com/example/frame-commerce',
    id: 3,
    image:
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80',
    slugs: ['query', 'redux', 'dashboard', 'ecommerce'],
    title: 'Frame Commerce',
  },
  {
    demoUrl: 'https://example.com/casa-nativa',
    description:
      'Sitio para hospitalidad independiente con bloques editables, formularios robustos y estructura lista para integracion con Strapi.',
    githubUrl: 'https://github.com/example/casa-nativa',
    id: 4,
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    slugs: ['zod', 'forms', 'booking', 'strapi-ready'],
    title: 'Casa Nativa',
  },
]