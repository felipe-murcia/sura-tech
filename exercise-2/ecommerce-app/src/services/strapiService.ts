import axios from 'axios';
import type { Product, StrapiResponse, StrapiProductEntry } from '../models/Product';
import { buildApiError } from '../errors/ApiError';

// Change this to match your running Strapi instance URL
const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337';
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN ?? '';

const strapiClient = axios.create({
  baseURL: `${STRAPI_BASE_URL}/api`,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
    ...(STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {}),
  },
});

function mapStrapiEntryToProduct(entry: StrapiProductEntry): Product {
  return {
    id: entry.id,
    title: entry.attributes.title,
    price: entry.attributes.price,
    description: entry.attributes.description,
    category: entry.attributes.category,
    image: entry.attributes.image,
  };
}

export async function fetchStrapiProducts(): Promise<Product[]> {
  try {
    const { data } = await strapiClient.get<StrapiResponse>('/products');
    return data.data.map(mapStrapiEntryToProduct);
  } catch (error) {
    throw buildApiError(error);
  }
}

export async function fetchStrapiProductById(id: number): Promise<Product> {
  try {
    const { data } = await strapiClient.get<{ data: StrapiProductEntry }>(`/products/${id}`);
    return mapStrapiEntryToProduct(data.data);
  } catch (error) {
    throw buildApiError(error);
  }
}
