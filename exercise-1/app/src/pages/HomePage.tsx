import { Helmet } from 'react-helmet-async'

import { MainLayout } from '@/layout/MainLayout'

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Luis Perdomo | Senior Frontend Developer</title>
        <meta
          name="description"
          content="Portfolio personal minimalista construido con React, TypeScript y Material UI."
        />
      </Helmet>
      <MainLayout />
    </>
  )
}