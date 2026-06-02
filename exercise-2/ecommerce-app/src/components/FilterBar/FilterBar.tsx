import {
  Box,
  Chip,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
  totalCount: number;
}

export function FilterBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  totalCount,
}: FilterBarProps) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      alignItems={{ sm: 'center' }}
      mb={4}
    >
      <TextField
        size="small"
        placeholder="Search products…"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
        sx={{ minWidth: 240 }}
      />
      <TextField
        select
        size="small"
        label="Category"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        sx={{ minWidth: 180 }}
      >
        <MenuItem value="">All categories</MenuItem>
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat} sx={{ textTransform: 'capitalize' }}>
            {cat}
          </MenuItem>
        ))}
      </TextField>
      <Box flexGrow={1} />
      <Chip
        label={
          <Typography variant="body2">
            <strong>{totalCount}</strong> product{totalCount !== 1 ? 's' : ''}
          </Typography>
        }
        variant="outlined"
      />
    </Stack>
  );
}
