import { Button, Chip, Container, Paper, Stack, Typography, styled } from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import { FiArrowDownRight, FiArrowUpRight } from 'react-icons/fi'

import { useAppDispatch } from '@/app/store/hooks'
import { openContactDialog } from '@/app/store/uiSlice'

const HeroPanel = styled(Paper)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: theme.spacing(5),
  padding: theme.spacing(5),
  background:
    'linear-gradient(145deg, rgba(255,255,255,0.78) 0%, rgba(249,244,238,0.96) 60%, rgba(242,232,221,0.96) 100%)',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(7),
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 'auto -64px -64px auto',
    width: 220,
    height: 220,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(163, 91, 56, 0.18), transparent 70%)',
  },
}))

export function HeroSection() {
  const dispatch = useAppDispatch()

  return (
    <Container component="section" id="home" maxWidth="lg" sx={{ pt: { xs: 5, md: 8 } }}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.35 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <HeroPanel elevation={0}>
          <Stack spacing={4} sx={{ maxWidth: 760 }}>
            <Chip
              color="primary"
              label="Disponible para proyectos selectivos"
              sx={{ alignSelf: 'flex-start', fontWeight: 700 }}
            />
            <Stack spacing={2}>
              <Typography variant="h1">Luis Perdomo</Typography>
              <Typography sx={{ fontSize: { xs: 22, md: 28 }, letterSpacing: '-0.04em' }}>
                Senior Frontend Developer especializado en experiencias web limpias y
                mantenibles.
              </Typography>
              <Typography color="text.secondary" maxWidth={620} variant="body1">
                Desarrollo interfaces de alto detalle con React, TypeScript y Material UI,
                cuidando arquitectura, escalabilidad y una estetica minimalista sin exceso.
              </Typography>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                component={RouterLink}
                endIcon={<FiArrowDownRight />}
                size="large"
                to="/#projects"
                variant="contained"
              >
                Ver proyectos
              </Button>
              <Button
                color="inherit"
                endIcon={<FiArrowUpRight />}
                onClick={() => dispatch(openContactDialog())}
                size="large"
                variant="outlined"
              >
                Iniciar conversacion
              </Button>
            </Stack>
          </Stack>
        </HeroPanel>
      </motion.div>
    </Container>
  )
}