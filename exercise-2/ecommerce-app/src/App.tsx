import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from './theme/theme';
import { Navbar } from './components/Navbar/Navbar';
import { ProductsPage } from './pages/ProductsPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar />
        <ProductsPage />
      </Box>
    </ThemeProvider>
  );
}

export default App;
