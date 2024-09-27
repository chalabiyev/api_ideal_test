import type { IProductItem } from 'src/types/product';

import { useState, useEffect, useCallback } from 'react';

import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTabs } from 'src/hooks/use-tabs';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';



// ----------------------------------------------------------------------

const SUMMARY = [
  {
    title: '100% original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: 'solar:verified-check-bold',
  },
  {
    title: '10 days replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: 'solar:clock-circle-bold',
  },
  {
    title: 'Year warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: 'solar:shield-check-bold',
  },
];

// ----------------------------------------------------------------------

type Props = {
  channel?: IProductItem;
  loading?: boolean;
  error?: any;
};

export function ChannelDetailsView({ channel, error, loading }: Props) {
  const tabs = useTabs('description');

  const [publish, setPublish] = useState('');

  useEffect(() => {
    if (channel) {
      setPublish(channel?.publish);
    }
  }, [channel]);

  const handleChangePublish = useCallback((newValue: string) => {
    setPublish(newValue);
  }, []);

  if (error) {
    return (
      <DashboardContent sx={{ pt: 5 }}>
        <EmptyContent
          filled
          title="Channel not found!"
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.product.root}
              startIcon={<Iconify width={16} icon="eva:arrow-ios-back-fill" />}
              sx={{ mt: 3 }}
            >
              Back to list
            </Button>
          }
          sx={{ py: 10, height: 'auto', flexGrow: 'unset' }}
        />
      </DashboardContent>
    );
  }

}
