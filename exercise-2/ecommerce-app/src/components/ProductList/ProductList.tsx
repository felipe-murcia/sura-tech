import { Alert, Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ProductCard } from '../ProductCard/ProductCard';
import type { Product } from '../../models/Product';
import type { ApiError } from '../../errors/ApiError';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: ApiError | null;
  onAddToCart?: (product: Product) => void;
  onRetry?: () => void;
}

function ErrorBanner({ error, onRetry }: { error: ApiError; onRetry?: () => void }) {
  const severityMap = {
    client: 'warning',
    server: 'error',
    network: 'error',
    unknown: 'error',
  } as const;

  return (
    <Alert
      severity={severityMap[error.type]}
      action={
        onRetry && (
          <Button
            color="inherit"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={onRetry}
          >
            Retry
          </Button>
        )
      }
      sx={{ mb: 3 }}
    >
      <Typography fontWeight={600}>{error.name}</Typography>
      {error.message}
      {error.statusCode > 0 && (
        <Typography variant="caption" display="block" color="text.secondary">
          Status code: {error.statusCode}
        </Typography>
      )}
    </Alert>
  );
}

export function ProductList({ products, loading, error, onAddToCart, onRetry }: ProductListProps) {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {error && <ErrorBanner error={error} onRetry={onRetry} />}

      {!error && products.length === 0 && (
        <Typography textAlign="center" color="text.secondary" py={10}>
          No products found.
        </Typography>
      )}

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
