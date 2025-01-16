import type { CardProps } from '@mui/material/Card';
import type { ChartOptions } from 'src/components/chart';

import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';

import { Chart, useChart, ChartLegends } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    series: {
      label: string;
      value: number;
    }[];
    options?: ChartOptions;
  };
  secondary?: boolean;
};

export function AnalyticsCurrentVisits({ title, subheader, chart, ...other }: Props) {
  const theme = useTheme();

  const chartSeries = chart.series.map((item) => item.value);

  // const chartColors = chart.colors ?? ['#FFD666', '#00A76F', '#006C9C', '#FF5630'];

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    // colors: chartColors,
    labels: chart.series.map((item) => item.label),
    stroke: { width: 3 },
    dataLabels: { enabled: true, dropShadow: { enabled: true } },
    // theme: { mode: theme.p },
    tooltip: {
      followCursor: true,
      fillSeriesColor: true,
      marker: { show: true },
      y: {
        formatter: (value: number) => 'bilet',
        title: { formatter: (seriesName: string) => `${seriesName}` },
      },
    },
    plotOptions: { pie: { donut: { labels: { show: false } } } },
    ...chart.options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Chart
        type="pie"
        series={chartSeries}
        options={chartOptions}
        width={{ xs: 240, xl: 260 }}
        height={{ xs: 240, xl: 260 }}
        sx={{ my: 6, mx: 'auto' }}
      />

      <Divider sx={{ borderStyle: 'dashed' }} />

      <ChartLegends
        labels={chartOptions?.labels}
        colors={chartOptions?.colors}
        sx={{ p: 3, justifyContent: 'center', ':hover': { cursor: 'pointer', color: '#FFD666' } }}
      />
    </Card>
  );
}
