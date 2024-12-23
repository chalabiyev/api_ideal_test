import { Grid } from '@mui/material';
import React from 'react';
import { CONFIG } from 'src/config-global';
import { AnalyticsWidgetSummary } from 'src/sections/overview/analytics/analytics-widget-summary';

// eslint-disable-next-line
const StatistikaGrid = () => {
  const cardStyle = {
    minHeight: '200px',
    maxHeight: '200px',
    // aspectRatio: '1/1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <AnalyticsWidgetSummary
          title="Təstiqlənmiş kredit"
          percent={0.8}
          total={1352831}
          color="secondary"
          sx={cardStyle}
          icon={
            <img alt="icon" src={`${CONFIG.site.basePath}/assets/icons/glass/ic-glass-users.svg`} />
          }
          chart={{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            series: [56, 47, 40, 62, 73, 30, 23, 54],
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <AnalyticsWidgetSummary
          title="Ümumi kredit məbləği"
          percent={2.8}
          total={1723315}
          sx={cardStyle}
          color="warning"
          icon={
            <img alt="icon" src={`${CONFIG.site.basePath}/assets/icons/glass/ic-glass-buy.svg`} />
          }
          chart={{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            series: [40, 70, 50, 28, 70, 75, 7, 64],
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <AnalyticsWidgetSummary
          title="Müraciət sayı"
          percent={86.6}
          sx={cardStyle}
          total={86}
          icon={<img alt="icon" src={`${CONFIG.site.basePath}/assets/icons/glass/ic-stats.svg`} />}
          color="success"
          chart={{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            series: [22, 8, 35, 50, 82, 84, 77, 12],
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AnalyticsWidgetSummary
          title="İmtina edilmiş müraciət"
          percent={3.6}
          sx={cardStyle}
          total={234}
          color="error"
          icon={
            <img alt="icon" src={`${CONFIG.site.basePath}/assets/icons/glass/ic-warning.svg`} />
          }
          chart={{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            series: [56, 30, 23, 54, 47, 40, 62, 73],
          }}
        />
      </Grid>
    </Grid>
  );
};

export default StatistikaGrid;
