import { useState, useEffect, useCallback } from 'react';
import type { Product } from '../models/Product';
import type { ApiError } from '../errors/ApiError';

type FetchFn = () => Promise<Product[]>;

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: ApiError | null;
  refetch: () => void;
}

export function useProducts(fetchFn: FetchFn): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [trigger, setTrigger] = useState(0);

  const refetch = useCallback(() => setTrigger((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchFn()
      .then((data) => {
        if (!cancelled) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch((err: ApiError) => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return { products, loading, error, refetch };
}
