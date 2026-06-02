import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'

import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import {
  closeMobileMenu,
  openContactDialog,
  openMobileMenu,
} from '@/app/store/uiSlice'
import { navigationItems } from '@/shared/constants/sections'
import { appTheme } from '@/theme'

export function TopNav() {
  const dispatch = useAppDispatch()
  const activeSection = useAppSelector((state) => state.ui.activeSection)
  const isMobileMenuOpen = useAppSelector((state) => state.ui.isMobileMenuOpen)
  const isDesktop = useMediaQuery(appTheme.breakpoints.up('md'))

  useEffect(() => {
    if (isDesktop && isMobileMenuOpen) {
      dispatch(closeMobileMenu())
    }
  }, [dispatch, isDesktop, isMobileMenuOpen])

  const handleContactClick = () => {
    dispatch(closeMobileMenu())
    dispatch(openContactDialog())
  }

  return (
    <AppBar
      color="transparent"
      elevation={0}
      position="sticky"
      sx={{
        backdropFilter: 'blur(22px)',
        backgroundColor: 'rgba(248, 245, 240, 0.82)',
        borderBottom: '1px solid',
        borderColor: 'rgba(34, 31, 26, 0.08)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: 76 }}>
          <Box>
            <Typography fontWeight={800} letterSpacing="-0.04em" variant="h6">
              Luis Perdomo
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Senior Frontend Developer
            </Typography>
          </Box>

          {isDesktop ? (
            <Stack alignItems="center" direction="row" spacing={1}>
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  color={activeSection === item.id ? 'primary' : 'inherit'}
                  component={RouterLink}
                  to={`/#${item.id}`}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                color="primary"
                endIcon={<FiArrowUpRight />}
                onClick={handleContactClick}
                variant="contained"
              >
                Hablemos
              </Button>
            </Stack>
          ) : (
            <IconButton
              aria-label="Open navigation menu"
              color="inherit"
              onClick={() => dispatch(openMobileMenu())}
            >
              <MenuRoundedIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        onClose={() => dispatch(closeMobileMenu())}
        open={isMobileMenuOpen}
        PaperProps={{
          sx: {
            backgroundColor: 'background.paper',
            width: 280,
          },
        }}
      >
        <Stack spacing={1.5} sx={{ p: 3, pt: 10 }}>
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              component={RouterLink}
              onClick={() => dispatch(closeMobileMenu())}
              to={`/#${item.id}`}
            >
              {item.label}
            </Button>
          ))}
          <Button onClick={handleContactClick} variant="contained">
            Hablemos
          </Button>
        </Stack>
      </Drawer>
    </AppBar>
  )
}