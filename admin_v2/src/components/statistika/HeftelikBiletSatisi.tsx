import { Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { heftelikdataset, valueFormatter } from 'src/staticdata/staticdata';

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

export default function HeftelikBiletSatisi() {
  return (
    <div style={{ width: '100%' }}>
      <Typography variant="button">Həftəlik satış</Typography>
      <BarChart
        colors={['#007867']}
        borderRadius={5}
        dataset={heftelikdataset}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        {...chartSetting}
      />
    </div>
  );
}
