export const navigationItems = [
  { id: 'home', label: 'Inicio' },
  { id: 'skills', label: 'Habilidades' },
  { id: 'about', label: 'Sobre mi' },
  { id: 'projects', label: 'Proyectos' },
] as const

export type SectionId = (typeof navigationItems)[number]['id']