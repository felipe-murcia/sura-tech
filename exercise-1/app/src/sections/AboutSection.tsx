import { Box, Paper, Typography } from '@mui/material'
import { motion } from 'framer-motion'

import { SectionShell } from '@/components/common/SectionShell'

export function AboutSection() {
  return (
    <SectionShell
      description="Un resumen breve y honesto para abrir la puerta a futuras iteraciones de contenido."
      eyebrow="Sobre mi"
      id="about"
      title="Construyo interfaces claras, utiles y consistentes"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.35 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <Paper
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 5,
            p: { xs: 3, md: 4 },
          }}
        >
          <Box maxWidth={840}>
            <Typography color="text.secondary" variant="body1">
              Soy un desarrollador enfocado en crear productos digitales sobrios, rapidos y
              mantenibles. Me interesa que cada decision visual tenga una razon funcional,
              desde la jerarquia tipografica hasta la forma en que una interfaz responde cuando
              el contenido real empieza a crecer.
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </SectionShell>
  )
}