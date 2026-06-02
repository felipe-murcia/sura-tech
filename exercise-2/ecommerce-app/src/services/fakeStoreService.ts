import axios from 'axios';
import type { FakeStoreProduct } from '../models/Product';
import { buildApiError } from '../errors/ApiError';

const BASE_URL = 'https://fakestoreapi.com';

const fakeStoreClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

export async function fetchProducts(): Promise<FakeStoreProduct[]> {
  try {
    const { data } = await fakeStoreClient.get<FakeStoreProduct[]>('/products');
    return data;
  } catch (error) {
    throw buildApiError(error);
  }
}

export async function fetchProductById(id: number): Promise<FakeStoreProduct> {
  try {
    const { data } = await fakeStoreClient.get<FakeStoreProduct>(`/products/${id}`);
    return data;
  } catch (error) {
    throw buildApiError(error);
  }
}

export async function fetchProductsByCategory(category: string): Promise<FakeStoreProduct[]> {
  try {
    const { data } = await fakeStoreClient.get<FakeStoreProduct[]>(
      `/products/category/${encodeURIComponent(category)}`
    );
    return data;
  } catch (error) {
    throw buildApiError(error);
  }
}
