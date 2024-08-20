import type { IGirovItem, IGirovFilters } from 'src/types/girov';

import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';
import { useDebounce } from 'src/hooks/use-debounce';
import { useSetState } from 'src/hooks/use-set-state';

import { orderBy } from 'src/utils/helper';

import { useSearchGirovs} from 'src/actions/girov';
import {
  PRODUCT_SORT_OPTIONS,
  PRODUCT_COLOR_OPTIONS,
  PRODUCT_GENDER_OPTIONS,
  PRODUCT_RATING_OPTIONS,
  PRODUCT_CATEGORY_OPTIONS,
} from 'src/_mock';

import { EmptyContent } from 'src/components/empty-content';

import { GirovList } from '../girov-list';
import { GirovSort } from '../girov-sort';
import { GirovSearch } from '../girov-search';
import { CartIcon } from '../components/cart-icon';
import { GirovFilters } from '../girov-filters';
import { useCheckoutContext } from '../../checkout/context';
import { GirovFiltersResult } from '../girov-filters-result';

// ----------------------------------------------------------------------

type Props = {
  girovs: IGirovItem[];
  loading?: boolean;
};

export function GirovShopView({ girovs, loading }: Props) {
  const checkout = useCheckoutContext();

  const openFilters = useBoolean();

  const [sortBy, setSortBy] = useState('featured');

  const [searchQuery, setSearchQuery] = useState('');

  const debouncedQuery = useDebounce(searchQuery);

  const filters = useSetState<IGirovFilters>({
    gender: [],
    colors: [],
    rating: '',
    category: 'all',
    priceRange: [0, 200],
  });

  const { searchResults, searchLoading } = useSearchGirovs(debouncedQuery);

  const dataFiltered = applyFilter({ inputData: girovs, filters: filters.state, sortBy });

  const canReset =
    filters.state.gender.length > 0 ||
    filters.state.colors.length > 0 ||
    filters.state.rating !== '' ||
    filters.state.category !== 'all' ||
    filters.state.priceRange[0] !== 0 ||
    filters.state.priceRange[1] !== 200;

  const notFound = !dataFiltered.length && canReset;

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback((inputValue: string) => {
    setSearchQuery(inputValue);
  }, []);

  const girovsEmpty = !loading && !girovs.length;

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >
      <GirovSearch
        query={debouncedQuery}
        results={searchResults}
        onSearch={handleSearch}
        loading={searchLoading}
      />

      <Stack direction="row" spacing={1} flexShrink={0}>
        <GirovFilters
          filters={filters}
          canReset={canReset}
          open={openFilters.value}
          onOpen={openFilters.onTrue}
          onClose={openFilters.onFalse}
          options={{
            colors: PRODUCT_COLOR_OPTIONS,
            ratings: PRODUCT_RATING_OPTIONS,
            genders: PRODUCT_GENDER_OPTIONS,
            categories: ['all', ...PRODUCT_CATEGORY_OPTIONS],
          }}
        />

        <GirovSort sort={sortBy} onSort={handleSortBy} sortOptions={PRODUCT_SORT_OPTIONS} />
      </Stack>
    </Stack>
  );

  const renderResults = (
    <GirovFiltersResult filters={filters} totalResults={dataFiltered.length} />
  );

  const renderNotFound = <EmptyContent filled sx={{ py: 10 }} />;

  return (
    <Container sx={{ mb: 15 }}>
      <CartIcon totalItems={checkout.totalItems} />

      <Typography variant="h4" sx={{ my: { xs: 3, md: 5 } }}>
        Shop
      </Typography>

      <Stack spacing={2.5} sx={{ mb: { xs: 3, md: 5 } }}>
        {renderFilters}

        {canReset && renderResults}
      </Stack>

      {(notFound || girovsEmpty) && renderNotFound}

      <GirovList girov={dataFiltered} loading={loading} />
    </Container>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  sortBy: string;
  filters: IGirovFilters;
  inputData: IGirovItem[];
};

function applyFilter({ inputData, filters, sortBy }: ApplyFilterProps) {
  const { gender, category, colors, priceRange, rating } = filters;

  const min = priceRange[0];

  const max = priceRange[1];

  // Sort by
  if (sortBy === 'featured') {
    inputData = orderBy(inputData, ['totalSold'], ['desc']);
  }

  if (sortBy === 'newest') {
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'priceDesc') {
    inputData = orderBy(inputData, ['price'], ['desc']);
  }

  if (sortBy === 'priceAsc') {
    inputData = orderBy(inputData, ['price'], ['asc']);
  }


  if (category !== 'all') {
    inputData = inputData.filter((girov) => girov.category === category);
  }

  if (colors.length) {
    inputData = inputData.filter((girov) =>
      girov.colors.some((color) => colors.includes(color))
    );
  }

  if (min !== 0 || max !== 200) {
    inputData = inputData.filter((girov) => girov.price >= min && girov.price <= max);
  }

  if (rating) {
    inputData = inputData.filter((girov) => {
      const convertRating = (value: string) => {
        if (value === 'up4Star') return 4;
        if (value === 'up3Star') return 3;
        if (value === 'up2Star') return 2;
        return 1;
      };
      return girov.totalRatings > convertRating(rating);
    });
  }

  return inputData;
}
