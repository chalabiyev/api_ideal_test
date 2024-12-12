import { Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { ayliqdataset, valueFormatter } from 'src/staticdata/staticdata';

const chartSetting = {
  yAxis: [
    // {
    //   label: 'rainfall (mm)',
    // },
  ],
  series: [{ dataKey: 'seoul', valueFormatter }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

export default function AyliqBiletSatisi() {
  return (
    <div style={{ width: '100%' }}>
      <Typography variant="button">Aylıq satış</Typography>
      <BarChart
        colors={['#00B8D9']}
        borderRadius={3}
        dataset={ayliqdataset}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        {...chartSetting}
      />
    </div>
  );
}
