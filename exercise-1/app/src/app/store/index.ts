import { configureStore } from '@reduxjs/toolkit'

import { uiReducer } from '@/app/store/uiSlice'

export function createAppStore() {
  return configureStore({
    reducer: {
      ui: uiReducer,
    },
  })
}

export type AppStore = ReturnType<typeof createAppStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']