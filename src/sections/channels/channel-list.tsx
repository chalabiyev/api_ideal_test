import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { ChannelItem } from './channel-item';
import { ChannelItemSkeleton } from './channel-skeleton';
import { IChannelItem } from 'src/types/channel';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  loading?: boolean;
  products: IChannelItem[];
};

export function ChannelList({ products, loading, ...other }: Props) {
  const renderLoading = <ChannelItemSkeleton />;

  const renderList = products.map((product) => <ChannelItem key={product.id} channel={product} />);

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

      {products.length > 8 && (
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
