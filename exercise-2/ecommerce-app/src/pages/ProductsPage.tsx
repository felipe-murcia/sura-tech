import { useMemo, useState } from 'react';
import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import { ProductList } from '../components/ProductList/ProductList';
import { FilterBar } from '../components/FilterBar/FilterBar';
import { useProducts } from '../hooks/useProducts';
import { fetchProducts } from '../services/fakeStoreService';
import { fetchStrapiProducts } from '../services/strapiService';
import type { Product } from '../models/Product';

type DataSource = 'fakestore' | 'strapi';

export function ProductsPage() {
  const [source, setSource] = useState<DataSource>('fakestore');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [cart, setCart] = useState<Product[]>([]);

  const fetchFn = useMemo(
    () => (source === 'fakestore' ? fetchProducts : fetchStrapiProducts),
    [source]
  );

  const { products, loading, error, refetch } = useProducts(fetchFn);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))].sort(),
    [products]
  );

  const filtered = useMemo(() => {
    let result = products;
    if (category) result = result.filter((p) => p.category === category);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [products, category, search]);

  function handleAddToCart(product: Product) {
    setCart((prev) => [...prev, product]);
  }

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: { xs: 6, md: 10 },
          mb: 6,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h4" gutterBottom>
            Discover Our Products
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.7 }}>
            Curated picks from the best categories — quality you can trust.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl">
        {/* Source tabs */}
        <Tabs
          value={source}
          onChange={(_, val) => {
            setSource(val as DataSource);
            setSearch('');
            setCategory('');
          }}
          sx={{ mb: 4, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab value="fakestore" label="FakeStore API" />
          <Tab value="strapi" label="Strapi API" />
        </Tabs>

        <FilterBar
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          categories={categories}
          totalCount={filtered.length}
        />

        <ProductList
          products={filtered}
          loading={loading}
          error={error}
          onAddToCart={handleAddToCart}
          onRetry={refetch}
        />
      </Container>

      {/* Invisible cart counter stored in state — passed to Navbar via context in a real app */}
      <Box sx={{ display: 'none' }}>{cart.length}</Box>
    </Box>
  );
}
