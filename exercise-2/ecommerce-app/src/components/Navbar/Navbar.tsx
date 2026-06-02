import {
  AppBar,
  Badge,
  Box,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';

interface NavbarProps {
  cartCount?: number;
  onCartClick?: () => void;
}

export function Navbar({ cartCount = 0, onCartClick }: NavbarProps) {
  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StorefrontIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1, letterSpacing: -0.5 }}>
            MiniShop
          </Typography>
          <Box>
            <Tooltip title="Cart">
              <IconButton onClick={onCartClick}>
                <Badge badgeContent={cartCount} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
