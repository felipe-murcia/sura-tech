import { Route, Routes } from 'react-router-dom'

import { ScrollToHash } from '@/app/router/ScrollToHash'
import { HomePage } from '@/pages/HomePage'

export function AppRouter() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route element={<HomePage />} path="*" />
      </Routes>
    </>
  )
}