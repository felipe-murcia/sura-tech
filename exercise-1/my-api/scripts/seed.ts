const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337'
const STRAPI_TOKEN = process.env.STRAPI_ADMIN_TOKEN ?? ''

const proyectosSeed = [
  {
    titulo: 'Portfolio Personal',
    descripcion:
      'Landing page de portfolio con React, MUI y animaciones con Framer Motion.',
    stack_sluck: ['React', 'TypeScript', 'Material UI', 'Framer Motion', 'Vite'],
    link_demo: 'https://miportfolio.vercel.app',
    link_github: 'https://github.com/usuario/portfolio',
  },
  {
    titulo: 'E-Commerce App',
    descripcion:
      'Tienda online completa con carrito de compras, pagos con Stripe y panel admin.',
    stack_sluck: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Prisma'],
    link_demo: 'https://myshop.vercel.app',
    link_github: 'https://github.com/usuario/ecommerce',
  },
  {
    titulo: 'Dashboard Analytics',
    descripcion:
      'Panel de analíticas en tiempo real con gráficas interactivas y filtros avanzados.',
    stack_sluck: ['React', 'Recharts', 'TanStack Query', 'Tailwind CSS'],
    link_demo: 'https://dashboard.vercel.app',
    link_github: 'https://github.com/usuario/dashboard',
  },
]

async function seed() {
  console.log(`Seeding ${STRAPI_URL}/api/proyectos...`)

  for (const proyecto of proyectosSeed) {
    const res = await fetch(`${STRAPI_URL}/api/proyectos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({ data: proyecto }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error(`Error al crear "${proyecto.titulo}":`, err)
      continue
    }

    const created = await res.json()
    const createdId = created?.data?.id

    console.log(`✓ Creado: "${proyecto.titulo}" (id: ${createdId ?? 'sin id'})`)
  }

  console.log('Seed completado.')
}

seed().catch(console.error)
