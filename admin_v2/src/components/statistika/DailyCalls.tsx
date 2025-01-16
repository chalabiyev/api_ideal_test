import { Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { gunlukdataset, valueFormatter } from 'src/staticdata/staticdata';

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

export default function DailyCalls() {
  return (
    <div style={{ width: '100%' }}>
      <Typography variant="button">Günlük gələn zənglərin sayı</Typography>
      <BarChart
        colors={['#FFBC33']}
        borderRadius={5}
        dataset={gunlukdataset}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        {...chartSetting}
      />
    </div>
  );
}
