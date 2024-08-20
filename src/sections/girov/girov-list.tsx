import type { BoxProps } from '@mui/material/Box';
import type { IGirovItem } from 'src/types/girov';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { GirovItem } from './girov-item';
import { GirovItemSkeleton } from './girov-skeleton';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  loading?: boolean;
  girov: IGirovItem[];
};

export function GirovList({ girov, loading, ...other }: Props) {
  const renderLoading = <GirovItemSkeleton />;

  const renderList = girov.map((giro) => <GirovItem key={giro.id} girov={giro} />);

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        {...other}
      >
        {loading ? renderLoading : renderList}
      </Box>

      {girov.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: { xs: 5, md: 8 },
            [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
          }}
        />
      )}
    </>
  );
}
