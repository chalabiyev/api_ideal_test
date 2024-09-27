import type { IGirovItem } from 'src/types/girov';

import { useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTabs } from 'src/hooks/use-tabs';

import { varAlpha } from 'src/theme/styles';
import { PRODUCT_PUBLISH_OPTIONS } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';

import { GirovDetailsSkeleton } from '../girov-skeleton';
import { GirovDetailsReview } from '../girov-details-review';
import { GirovDetailsSummary } from '../girov-details-summary';
import { GirovDetailsToolbar } from '../girov-details-toolbar';
import { GirovDetailsCarousel } from '../girov-details-carousel';
import { GirovDetailsDescription } from '../girov-details-description';

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
  girov?: IGirovItem;
  loading?: boolean;
  error?: any;
};

export function GirovDetailsView({ girov, error, loading }: Props) {
  const tabs = useTabs('description');

  const [publish, setPublish] = useState('');

  useEffect(() => {
    if (girov) {
      setPublish(girov?.publish);
    }
  }, [girov]);

  const handleChangePublish = useCallback((newValue: string) => {
    setPublish(newValue);
  }, []);

  if (loading) {
    return (
      <DashboardContent sx={{ pt: 5 }}>
        <GirovDetailsSkeleton />
      </DashboardContent>
    );
  }

  if (error) {
    return (
      <DashboardContent sx={{ pt: 5 }}>
        <EmptyContent
          filled
          title="Girov not found!"
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.girov.root}
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

  return (
    <DashboardContent>
      <GirovDetailsToolbar
        backLink={paths.dashboard.girov.root}
        editLink={paths.dashboard.girov.edit(`${girov?.id}`)}
        liveLink={paths.dashboard.girov.details(`${girov?.id}`)}
        publish={publish}
        onChangePublish={handleChangePublish}
        publishOptions={PRODUCT_PUBLISH_OPTIONS}
      />

      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
        <Grid xs={12} md={6} lg={7}>
          <GirovDetailsCarousel images={girov?.images ?? []} />
        </Grid>

        <Grid xs={12} md={6} lg={5}>
          {girov && <GirovDetailsSummary disableActions girov={girov} />}
        </Grid>
      </Grid>

      <Box
        gap={5}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
        sx={{ my: 10 }}
      >
        {SUMMARY.map((item) => (
          <Box key={item.title} sx={{ textAlign: 'center', px: 5 }}>
            <Iconify icon={item.icon} width={32} sx={{ color: 'primary.main' }} />

            <Typography variant="subtitle1" sx={{ mb: 1, mt: 2 }}>
              {item.title}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </Box>
        ))}
      </Box>

      <Card>
        <Tabs
          value={tabs.value}
          onChange={tabs.onChange}
          sx={{
            px: 3,
            boxShadow: (theme) =>
              `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
          }}
        >
          {[
            { value: 'description', label: 'Description' },
            { value: 'reviews', label: `Reviews (${girov?.reviews.length})` },
          ].map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        {tabs.value === 'description' && (
          <GirovDetailsDescription description={girov?.description ?? ''} />
        )}

        {tabs.value === 'reviews' && (
          <GirovDetailsReview
            ratings={girov?.ratings ?? []}
            reviews={girov?.reviews ?? []}
            totalRatings={girov?.totalRatings ?? 0}
            totalReviews={girov?.totalReviews ?? 0}
          />
        )}
      </Card>
    </DashboardContent>
  );
}
