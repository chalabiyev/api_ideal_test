import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Card,
  Stack,
  Select,
  Button,
  MenuItem,
  CardHeader,
  InputLabel,
  FormControl,
  OutlinedInput,
} from '@mui/material'

import { useRouter } from 'src/routes/hooks';

import DownloadIcon from 'src/svgIcons/downloadIcon';
import { DashboardContent } from 'src/layouts/dashboard';
import { SeoIllustration } from 'src/assets/illustrations';
import { _analyticTrafficbysite, _analyticTrafficbymobile } from 'src/_mock';

import { VideoCallIcon } from 'src/components/videocall';

import { AppAreaInstalled } from '../app-area-installed';
import { AppCurrentDownload } from '../app-current-download';
import { AnalyticsWidgetSummary } from '../../analytics/analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../../analytics/analytics-traffic-by-site';

// import { useMockedUser } from 'src/auth/hooks';

const CreditDataWidget = [
  {
    title: 'Sorğularin sayı bu gün',
    total: 1234,
    percent: 3,
    icon: <SeoIllustration />,
    chart: {
      series: [22, 8, 35, 50, 82, 84, 77, 12],
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    },
  },
  {
    title: 'Sorğularin sayı bu ay',
    total: 1234,
    percent: 45,
    icon: <SeoIllustration />,
    chart: {
      series: [22, 8, 35, 50, 82, 84, 77, 12, 15, 65],
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    },
  },
  {
    title: 'Bu gün verilən kreditlərin sayı',
    total: 2345,
    percent: 3,
    icon: <SeoIllustration />,
    chart: {
      series: [22, 8, 35, 50, 82, 84, 77, 12],
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    },
  },
  {
    id: 'creditValue',
    title: 'Bu gün verilən məbləğ',
    total: 1234,
    percent: 3,
    icon: <SeoIllustration />,
    chart: {
      series: [22, 8, 35, 50, 82, 84, 77, 12],
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    },
  },
];

const UseraDataWidget = [
  {
    title: 'Müştəri xidməti sorğuların sayı 01.08.2024',
    total: 1234,
    percent: 3,
    icon: <SeoIllustration />,
    chart: {
      series: [22, 8, 35, 50, 82, 84, 77, 12],
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    },
  },
  {
    title: 'Call Center sorğuların sayı 01.08.2024',
    total: 1234,
    percent: 45,
    icon: <SeoIllustration />,
    chart: {
      series: [22, 8, 35, 50, 82, 84, 77, 12, 15, 65],
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    },
  },
  {
    title: 'Sayt sorğularının sayı 01.08.2024',
    total: 2345,
    percent: 3,
    icon: <SeoIllustration />,
    chart: {
      series: [22, 8, 35, 50, 82, 84, 77, 12],
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    },
  },
  {
    title: 'Partnyor mənbəsi sorğuların sayı 01.08.2024',
    total: 1234,
    percent: 3,
    icon: <SeoIllustration />,
    chart: {
      series: [22, 8, 35, 50, 82, 84, 77, 12],
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    },
  },
];

const SoftwareDataWidget = [
  {
    title: `Video zənglə kredit sorğuların sayı ${new Date().toLocaleDateString('en-US', {
      dateStyle: 'medium',
    })}`,
    total: 1234,
    percent: 3,
    icon: <SeoIllustration />,
    chart: {
      series: [22, 8, 35, 50, 82, 84, 77, 12],
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    },
  },
  {
    title: `Süni intellektlə kredit sorğuların sayı ${new Date().toLocaleDateString('en-US', {
      dateStyle: 'medium',
    })}`,
    total: 1234,
    percent: 45,
    icon: <SeoIllustration />,
    chart: {
      series: [22, 8, 35, 50, 82, 84, 77, 12, 15, 65],
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    },
  },
  {
    title: `Direct Sales sorğuların sayı ${new Date().toLocaleDateString('en-US', {
      dateStyle: 'medium',
    })}`,
    total: 2345,
    percent: 3,
    icon: <SeoIllustration />,
    chart: {
      series: [22, 8, 35, 50, 82, 84, 77, 12],
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    },
  },
  {
    title: `İmtina olunan sorğuların sayı ${new Date().toLocaleDateString('en-US', {
      dateStyle: 'medium',
    })}`,
    total: 1234,
    percent: 3,
    icon: <SeoIllustration />,
    chart: {
      series: [22, 8, 35, 50, 82, 84, 77, 12],
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    },
  },
];

export function OverviewAppView() {
  // const { user } = useMockedUser();

  const router = useRouter();

  const theme = useTheme();

  const _years: any = ['2024', '2023', '2022'];
  const _months: any = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const _channels: any = ['Call Center', 'Sayt', 'Partnyor mənbəsi', 'Video zəng'];
  const _products: any = ['Məhsul 1', 'Məhsul 2', 'Məhsul 3', 'Məhsul 4'];
  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        {CreditDataWidget.map((widget, index) => (
          <Grid key={index} xs={12} md={6} lg={3}>
            <AnalyticsWidgetSummary
              id={widget.id}
              sx={{ height: 200 }}
              title={widget.title}
              total={widget.total}
              percent={widget.percent}
              icon={widget.icon}
              chart={widget.chart}
              color="success"
            />
          </Grid>
        ))}
        {UseraDataWidget.map((widget, index) => (
          <Grid key={index} xs={12} md={6} lg={3}>
            <AnalyticsWidgetSummary
              title={widget.title}
              color="secondary"
              sx={{ height: 200 }}
              total={widget.total}
              percent={widget.percent}
              icon={widget.icon}
              chart={widget.chart}
            />
          </Grid>
        ))}

        {SoftwareDataWidget.map((widget, index) => (
          <Grid key={index} xs={12} md={6} lg={3}>
            <AnalyticsWidgetSummary
              title={widget.title}
              color="warning"
              sx={{ height: 200 }}
              total={widget.total}
              percent={widget.percent}
              icon={widget.icon}
              chart={widget.chart}
            />
          </Grid>
        ))}
        <Grid container spacing={3}>
          <Grid xs={12}>
            <Card>
              <CardHeader title="Statistika" />
              <Stack
                spacing={2}
                alignItems={{ xs: 'center', md: 'center' }}
                direction={{ xs: 'column', md: 'row' }}
                sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } , display: 'flex', justifyContent: 'space-around' }}
              >
                <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 250 } ,}}>
                  <InputLabel htmlFor="user-filter-role-select-label">İlə görə</InputLabel>
                  <Select
                    input={<OutlinedInput label="İlə görə" />}
                    inputProps={{ id: 'user-filter-role-select-label' }}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 250 } } }}
                  >
                    {_years.map((year: any, index: any) => (
                      <MenuItem key={index} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 250 } }}>
                  <InputLabel htmlFor="user-filter-role-select-label">Aya görə</InputLabel>
                  <Select
                    input={<OutlinedInput label="Aya görə" />}
                    inputProps={{ id: 'user-filter-role-select-label' }}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 250 } } }}
                  >
                    {_months.map((month: string, index: number) => (
                      <MenuItem key={index} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 250 } }}>
                  <InputLabel htmlFor="user-filter-role-select-label">Kanal</InputLabel>
                  <Select
                    input={<OutlinedInput label="Kanal" />}
                    inputProps={{ id: 'user-filter-role-select-label' }}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 250 }, p: 10 } }}
                  >
                    {_channels.map((channel: string, index: number) => (
                      <MenuItem key={index} value={channel}>
                        {channel}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 250 } }}>
                  <InputLabel htmlFor="user-filter-role-select-label">Məhsul</InputLabel>
                  <Select
                    input={<OutlinedInput label="Məhsul" />}
                    inputProps={{ id: 'user-filter-role-select-label' }}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 250 } } }}
                  >
                    {_products.map((product: string, index: number) => (
                      <MenuItem key={index} value={product}>
                        {product}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* Hesabatı yüklə buttonu */}

                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<DownloadIcon />}
                  sx={{
                    padding: '15px 30px',
                  }}
                >
                  Download
                </Button>
              </Stack>
            </Card>{' '}
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <AppCurrentDownload
              title="Verilmiş kreditlərin müddəti üzrə statistika"
              sx={{ height: 500 }}
              chart={{
                series: [
                  { label: '3 ayadək', value: 12244 },
                  { label: '6 ayadək', value: 53345 },
                  { label: '9 ayadək', value: 44313 },
                  { label: '12 ayadək', value: 78343 },
                  { label: '15 ayadək', value: 78343 },
                  { label: '18 ayadək', value: 78343 },
                  { label: '21 ayadək', value: 78343 },
                  { label: '24 ayadək', value: 78343 },
                ],
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            <AppAreaInstalled
              sx={{ height: 500 }}
              title="Partnyor mənbəsi - kredit statistikası"
              subheader="Keçən ildən 43 % daha çox"
              chart={{
                categories: [
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ],
                series: [
                  {
                    name: '2022',
                    data: [
                      {
                        name: 'Daxil olan sorğular',
                        data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16],
                      },
                      {
                        name: 'Verilən kreditlər',
                        data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16],
                      },
                    ],
                  },
                  {
                    name: '2023',
                    data: [
                      {
                        name: 'Daxil olan sorğular',
                        data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16],
                      },
                      {
                        name: 'Verilən kreditlər',
                        data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16],
                      },
                    ],
                  },
                  {
                    name: '2024',
                    data: [
                      {
                        name: 'Daxil olan sorğular',
                        data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16],
                      },
                      {
                        name: 'Verilən kreditlər',
                        data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16],
                      },
                    ],
                  },
                ],
              }}
            />
          </Grid>
        </Grid>
        <Grid xs={12} md={6} lg={15}>
          <AnalyticsTrafficBySite title="Traffic by site" list={_analyticTrafficbysite} />
        </Grid>
        <Grid xs={12} md={6} lg={15}>
          <AnalyticsTrafficBySite title="Traffic by mobile app" list={_analyticTrafficbymobile} />
        </Grid>
      </Grid>
      <div
        style={{
          position: 'fixed',
          bottom: theme.spacing(10),
          right: theme.spacing(10),
          zIndex: 9999,
          cursor: 'pointer',
        }}
      >
        <VideoCallIcon
          onClick={() => {
            router.push('/dashboard/videocall');
          }}
        />
      </div>
    </DashboardContent>
  );
}
