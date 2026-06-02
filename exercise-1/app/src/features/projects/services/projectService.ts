import {
	projectsSchema,
	strapiProjectsResponseSchema,
	type Project,
	type StrapiProjectsResponse,
} from '@/features/projects/model/project'
import { apiClient } from '@/shared/lib/apiClient'

const fallbackProjectImages = [
	'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
	'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
	'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80',
	'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
] as const

function getFallbackImage(index: number) {
	return fallbackProjectImages[index % fallbackProjectImages.length]
}

function mapStrapiProjects(response: StrapiProjectsResponse): Project[] {
	return response.data.map((item, index) => ({
		demoUrl: item.link_demo,
		description: item.descripcion,
		githubUrl: item.link_github,
		id: item.id,
		image: getFallbackImage(index),
		slugs: item.stack_sluck ?? [],
		title: item.titulo,
	}))
}

function parseStrapiResponse(payload: unknown): StrapiProjectsResponse {
	if (typeof payload === 'string') {
		try {
			return strapiProjectsResponseSchema.parse(JSON.parse(payload))
		} catch {
			throw new Error(
				'La respuesta de proyectos no es JSON valido. Verifica VITE_API_BASE_URL y que Strapi responda desde http://localhost:1337/api.',
			)
		}
	}

	return strapiProjectsResponseSchema.parse(payload)
}

export async function getProjects() {
	const response = await apiClient.get('/proyectos')
	const parsedResponse = parseStrapiResponse(response.data)

	return projectsSchema.parse(mapStrapiProjects(parsedResponse))
}
