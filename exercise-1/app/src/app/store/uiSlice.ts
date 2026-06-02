import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { SectionId } from '@/shared/constants/sections'

type UiState = {
  activeSection: SectionId
  isContactDialogOpen: boolean
  isMobileMenuOpen: boolean
}

const initialState: UiState = {
  activeSection: 'home',
  isContactDialogOpen: false,
  isMobileMenuOpen: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    closeContactDialog(state) {
      state.isContactDialogOpen = false
    },
    closeMobileMenu(state) {
      state.isMobileMenuOpen = false
    },
    openContactDialog(state) {
      state.isContactDialogOpen = true
    },
    openMobileMenu(state) {
      state.isMobileMenuOpen = true
    },
    setActiveSection(state, action: PayloadAction<SectionId>) {
      state.activeSection = action.payload
    },
  },
})

export const {
  closeContactDialog,
  closeMobileMenu,
  openContactDialog,
  openMobileMenu,
  setActiveSection,
} = uiSlice.actions

export const uiReducer = uiSlice.reducer