import { Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { illikdataset, valueFormatter } from 'src/staticdata/staticdata';

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

export default function IllikBiletSatisi() {
  return (
    <div style={{ width: '100%' }}>
      <Typography variant="button">İllik satış</Typography>
      <BarChart
        colors={['#e64e33']}
        borderRadius={5}
        dataset={illikdataset}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        {...chartSetting}
      />
    </div>
  );
}
