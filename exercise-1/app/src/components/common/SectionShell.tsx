import type { PropsWithChildren, ReactNode } from 'react'
import { Box, Container, Stack, Typography } from '@mui/material'

type SectionShellProps = PropsWithChildren<{
  description?: ReactNode
  eyebrow?: string
  id: string
  title: string
}>

export function SectionShell({
  children,
  description,
  eyebrow,
  id,
  title,
}: SectionShellProps) {
  return (
    <Box
      component="section"
      id={id}
      sx={{ py: { xs: 8, md: 10 }, scrollMarginTop: (theme) => theme.spacing(14) }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2.5} sx={{ mb: 5 }}>
          {eyebrow ? (
            <Typography
              color="primary.main"
              fontSize={13}
              fontWeight={800}
              letterSpacing="0.18em"
              textTransform="uppercase"
            >
              {eyebrow}
            </Typography>
          ) : null}
          <Typography variant="h2">{title}</Typography>
          {description ? (
            <Typography color="text.secondary" maxWidth={720} variant="body1">
              {description}
            </Typography>
          ) : null}
        </Stack>
        {children}
      </Container>
    </Box>
  )
}