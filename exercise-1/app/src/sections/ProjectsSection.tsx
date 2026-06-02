import {
  Alert,
  Box,
  Card,
  Skeleton,
  Stack,
} from '@mui/material'

import { SectionShell } from '@/components/common/SectionShell'
import { useProjects } from '@/features/projects/hooks/useProjects'
import type { Project } from '@/features/projects/model/project'
import { ProjectItem } from '@/features/projects/components/ProjectItem'

export function ProjectsSection() {
  const { data, error, isLoading } = useProjects()
  console.log('ProjectsSection data:', data, 'error:', error, 'isLoading:', isLoading)
  const items: Array<Project | null> = isLoading ? Array.from({ length: 4 }, () => null) : (data ?? [])

  return (
    <SectionShell
      description="Cuatro piezas iniciales cargadas con data estatica y listas para migrar despues a Strapi sin cambiar la UI."
      eyebrow="Proyectos"
      id="projects"
      title="Trabajo reciente con foco en producto y ejecucion"
    >
      {error ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          No fue posible cargar los proyectos.
        </Alert>
      ) : null}

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, minmax(0, 1fr))',
          },
        }}
      >
        {items.map((project, index) =>
          project ? (
            <ProjectItem index={index} key={project.id} project={project} />
          ) : (
            <Card key={`skeleton-${index}`} sx={{ borderRadius: 5, p: 3 }}>
              <Stack spacing={2}>
                <Skeleton height={240} variant="rounded" />
                <Skeleton height={32} width="60%" />
                <Skeleton height={20} width="100%" />
                <Skeleton height={20} width="85%" />
              </Stack>
            </Card>
          ),
        )}
      </Box>
    </SectionShell>
  )
}