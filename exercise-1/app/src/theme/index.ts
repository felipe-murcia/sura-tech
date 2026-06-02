import { alpha, createTheme } from '@mui/material/styles'

export const appTheme = createTheme({
  cssVariables: true,
  palette: {
    background: {
      default: '#f4efe8',
      paper: 'rgba(255, 250, 244, 0.9)',
    },
    divider: 'rgba(34, 31, 26, 0.08)',
    primary: {
      main: '#a35b38',
    },
    secondary: {
      main: '#28534a',
    },
    text: {
      primary: '#221f1a',
      secondary: '#5f5a52',
    },
  },
  shape: {
    borderRadius: 20,
  },
  typography: {
    fontFamily: 'Manrope, sans-serif',
    h1: {
      fontFamily: 'Space Grotesk, sans-serif',
      fontSize: 'clamp(3.4rem, 8vw, 6rem)',
      fontWeight: 700,
      letterSpacing: '-0.08em',
      lineHeight: 0.98,
    },
    h2: {
      fontFamily: 'Space Grotesk, sans-serif',
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: 700,
      letterSpacing: '-0.06em',
      lineHeight: 1.02,
    },
    h3: {
      fontFamily: 'Space Grotesk, sans-serif',
      fontSize: '1.5rem',
      fontWeight: 700,
      letterSpacing: '-0.04em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.8,
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingBlock: 11,
          paddingInline: 22,
        },
        outlined: ({ theme }) => ({
          borderColor: alpha(theme.palette.text.primary, 0.16),
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(34, 31, 26, 0.07)',
          boxShadow: '0 16px 40px rgba(35, 28, 20, 0.05)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          borderRadius: 999,
          color: theme.palette.text.primary,
          fontWeight: 700,
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(34, 31, 26, 0.07)',
          boxShadow: '0 16px 40px rgba(35, 28, 20, 0.05)',
        },
      },
    },
  },
})