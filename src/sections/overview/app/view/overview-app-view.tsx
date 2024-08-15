import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

import { useRouter } from 'src/routes/hooks';

import { _analyticTraffic } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { SeoIllustration } from 'src/assets/illustrations';

// import { useMockedUser } from 'src/auth/hooks';

import { VideoCallIcon } from 'src/components/videocall';

import { AppAreaInstalled } from '../app-area-installed';
import { AppCurrentDownload } from '../app-current-download';
import { AnalyticsWidgetSummary } from '../../analytics/analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../../analytics/analytics-traffic-by-site';

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
    title: 'Partnyor kanalı sorğuların sayı 01.08.2024',
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

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        {CreditDataWidget.map((widget, index) => (
          <Grid key={index} xs={12} md={6} lg={3}>
            <AnalyticsWidgetSummary
              id={widget.id}
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
              total={widget.total}
              percent={widget.percent}
              icon={widget.icon}
              chart={widget.chart}
            />
          </Grid>
        ))}

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentDownload
            title="Verilmiş kreditlərin müddəti üzrə statistika"
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
            title="Partnyor kanalı - kredit statistikası"
            subheader="(+43%) than last year"
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

        <Grid xs={12} md={6} lg={15}>
          <AnalyticsTrafficBySite title="Traffic by site" list={_analyticTraffic} />
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
        <VideoCallIcon  onClick={() => {
          router.push('/dashboard/videocall');
        }}/>
      </div>
    </DashboardContent>
  );
}
