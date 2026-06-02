import { Box } from '@mui/material'
import { useEffect } from 'react'

import { useAppDispatch } from '@/app/store/hooks'
import { setActiveSection } from '@/app/store/uiSlice'
import { TopNav } from '@/components/navigation/TopNav'
import { ContactDialog } from '@/features/contact/components/ContactDialog'
import { AboutSection } from '@/sections/AboutSection'
import { HeroSection } from '@/sections/HeroSection'
import { ProjectsSection } from '@/sections/ProjectsSection'
import { SkillsSection } from '@/sections/SkillsSection'
import { navigationItems, type SectionId } from '@/shared/constants/sections'

export function MainLayout() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const sections = navigationItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (!sections.length || typeof IntersectionObserver === 'undefined') {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)[0]

        if (visibleEntry?.target.id) {
          dispatch(setActiveSection(visibleEntry.target.id as SectionId))
        }
      },
      {
        rootMargin: '-25% 0px -45% 0px',
        threshold: [0.2, 0.4, 0.65],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [dispatch])

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <TopNav />
      <Box component="main">
        <HeroSection />
        <SkillsSection />
        <AboutSection />
        <ProjectsSection />
      </Box>
      <ContactDialog />
    </Box>
  )
}