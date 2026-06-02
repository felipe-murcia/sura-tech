// Shared Product interface used by both FakeStore and Strapi services
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

// FakeStore API response matches Product directly
export type FakeStoreProduct = Product;

// Strapi v4 wraps data in { data: [{ id, attributes }] }
export interface StrapiProductAttributes {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface StrapiProductEntry {
  id: number;
  attributes: StrapiProductAttributes;
}

export interface StrapiResponse {
  data: StrapiProductEntry[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
