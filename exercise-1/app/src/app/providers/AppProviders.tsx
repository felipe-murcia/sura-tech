import { useState } from 'react'
import type { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { CssBaseline, GlobalStyles } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'

import { createAppStore } from '@/app/store'
import { createAppQueryClient } from '@/shared/lib/queryClient'
import { appTheme } from '@/theme'

export function AppProviders({ children }: PropsWithChildren) {
  const [store] = useState(() => createAppStore())
  const [queryClient] = useState(() => createAppQueryClient())

  return (
    <HelmetProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={appTheme}>
            <CssBaseline />
            <GlobalStyles
              styles={{
                body: {
                  color: appTheme.palette.text.primary,
                },
              }}
            />
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </HelmetProvider>
  )
}