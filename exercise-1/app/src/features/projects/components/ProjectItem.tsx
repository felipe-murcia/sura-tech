import GitHubIcon from '@mui/icons-material/GitHub'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import { Button, Card, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'

import type { Project } from '@/features/projects/model/project'

type ProjectItemProps = {
  index: number
  project: Project
}

export function ProjectItem({ index, project }: ProjectItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <Card
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: 1,
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <CardMedia component="img" height="260" image={project.image} title={project.title} />
        <CardContent sx={{ p: 3.5 }}>
          <Stack spacing={2.5}>
            <Typography variant="h3">{project.title}</Typography>

            {project.slugs.length ? (
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {project.slugs.map((slug) => (
                  <Chip key={slug} label={slug} size="small" />
                ))}
              </Stack>
            ) : null}

            <Typography color="text.secondary" variant="body1">
              {project.description}
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button
                component={project.demoUrl ? 'a' : 'button'}
                disabled={!project.demoUrl}
                endIcon={<OpenInNewRoundedIcon />}
                href={project.demoUrl ?? undefined}
                rel="noreferrer"
                target="_blank"
                variant="contained"
              >
                Demo
              </Button>
              <Button
                color="inherit"
                component={project.githubUrl ? 'a' : 'button'}
                disabled={!project.githubUrl}
                endIcon={<GitHubIcon />}
                href={project.githubUrl ?? undefined}
                rel="noreferrer"
                target="_blank"
                variant="outlined"
              >
                GitHub
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  )
}