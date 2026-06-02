import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Rating,
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import type { Product } from '../../models/Product';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: 4 },
      }}
    >
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        sx={{
          height: 220,
          objectFit: 'contain',
          bgcolor: '#fafafa',
          p: 2,
        }}
      />
      <CardContent sx={{ flexGrow: 1, pb: 0 }}>
        <Chip
          label={product.category}
          size="small"
          variant="outlined"
          sx={{ mb: 1, textTransform: 'capitalize', fontSize: 11 }}
        />
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.4,
            mb: 0.5,
          }}
        >
          {product.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 1,
          }}
        >
          {product.description}
        </Typography>
        {product.rating && (
          <Box display="flex" alignItems="center" gap={0.5} mb={0.5}>
            <Rating value={product.rating.rate} precision={0.1} size="small" readOnly />
            <Typography variant="caption" color="text.secondary">
              ({product.rating.count})
            </Typography>
          </Box>
        )}
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight={700} color="primary">
          ${product.price.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          size="small"
          disableElevation
          startIcon={<ShoppingCartOutlinedIcon />}
          onClick={() => onAddToCart?.(product)}
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
