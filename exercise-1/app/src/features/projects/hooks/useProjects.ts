import { useQuery } from '@tanstack/react-query'

import { getProjects } from '@/features/projects/services/projectService'

export function useProjects() {
  return useQuery({
    queryFn: getProjects,
    queryKey: ['projects'],
    refetchOnMount: 'always',
    staleTime: 0,
  })
}