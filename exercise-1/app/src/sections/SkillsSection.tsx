import { Chip, Stack } from '@mui/material'
import { motion } from 'framer-motion'

import { SectionShell } from '@/components/common/SectionShell'
import { skillItems } from '@/shared/constants/skills'

export function SkillsSection() {
  return (
    <SectionShell
      description="Tecnologias con las que trabajo hoy en producto, arquitectura y entrega continua."
      eyebrow="Habilidades"
      id="skills"
      title="Stack real para construir y escalar"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.4 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <Stack direction="row" flexWrap="wrap" gap={1.25}>
          {skillItems.map((skill) => (
            <Chip key={skill} label={skill} sx={{ px: 1, py: 2.6 }} variant="filled" />
          ))}
        </Stack>
      </motion.div>
    </SectionShell>
  )
}