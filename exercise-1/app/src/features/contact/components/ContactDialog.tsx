import { zodResolver } from '@hookform/resolvers/zod'
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Stack,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { closeContactDialog } from '@/app/store/uiSlice'

const contactSchema = z.object({
  brief: z
    .string()
    .min(20, 'Cuentame un poco mas sobre el proyecto.')
    .max(280, 'Mantengamos el resumen corto.'),
  email: z.string().email('Ingresa un correo valido.'),
  name: z.string().min(2, 'Escribe al menos 2 caracteres.'),
})

type ContactFormValues = z.infer<typeof contactSchema>

const defaultValues: ContactFormValues = {
  brief: '',
  email: '',
  name: '',
}

export function ContactDialog() {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector((state) => state.ui.isContactDialogOpen)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<ContactFormValues>({
    defaultValues,
    resolver: zodResolver(contactSchema),
  })

  const handleClose = () => {
    dispatch(closeContactDialog())
  }

  const onSubmit = handleSubmit(async () => {
    await Promise.resolve()
    reset(defaultValues)
    handleClose()
    setIsSnackbarOpen(true)
  })

  return (
    <>
      <Dialog fullWidth maxWidth="sm" onClose={handleClose} open={isOpen}>
        <DialogTitle>Cuentame tu proxima idea</DialogTitle>
        <DialogContent>
          <Stack component="form" noValidate onSubmit={onSubmit} spacing={2.5} sx={{ mt: 1 }}>
            <TextField
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              label="Nombre"
              {...register('name')}
            />
            <TextField
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              label="Email"
              type="email"
              {...register('email')}
            />
            <TextField
              error={Boolean(errors.brief)}
              helperText={errors.brief?.message}
              label="Brief"
              minRows={4}
              multiline
              {...register('brief')}
            />
            <DialogActions sx={{ px: 0 }}>
              <Button color="inherit" onClick={handleClose}>
                Cerrar
              </Button>
              <Button disabled={isSubmitting} type="submit" variant="contained">
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </Button>
            </DialogActions>
          </Stack>
        </DialogContent>
      </Dialog>

      <Snackbar
        autoHideDuration={2500}
        onClose={() => setIsSnackbarOpen(false)}
        open={isSnackbarOpen}
      >
        <Alert severity="success" variant="filled">
          Gracias. El formulario quedo listo para conectarlo luego con Strapi.
        </Alert>
      </Snackbar>
    </>
  )
}