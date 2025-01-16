import { Grid } from '@mui/material';
import { useState } from 'react';
import { AnalyticsCurrentVisits } from 'src/sections/overview/analytics/analytics-current-visits';

// eslint-disable-next-line
const ZiyaretciSayi = () => {
  return (
    <div className="grid grid-cols-3 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
      <Grid sx={{ mt: 5 }} item xs={12} sm={6} md={3}>
        <AnalyticsCurrentVisits
          title="Film üzrə bilet satışı"
          
          
          chart={{
            series: [
              { label: 'sfds', value: 500 },
              { label: 'Asia', value: 500 },
              { label: 'Europe', value: 500 },
              { label: 'Africa', value: 500 },
            ],
          }}
        />
      </Grid>
      <Grid sx={{ mt: 5 }} item xs={12} sm={6} md={3}>
        <AnalyticsCurrentVisits
          title="Tamaşaçıların yaş kateqoriyası"
          chart={{
            series: [
              { label: 'America', value: 500 },
              { label: 'Asia', value: 2500 },
              { label: 'Europe', value: 1500 },
              { label: 'Africa', value: 500 },
            ],
          }}
        />
      </Grid>
      <Grid sx={{ mt: 5 }} item xs={12} sm={6} md={3}>
        <AnalyticsCurrentVisits
          title="Janr seçimləri"
          chart={{
            series: [
              { label: 'America', value: 500 },
              { label: 'Asia', value: 2500 },
              { label: 'Europe', value: 1500 },
              { label: 'Africa', value: 500 },
            ],
          }}
        />
      </Grid>
    </div>
  );
};

export default ZiyaretciSayi;
