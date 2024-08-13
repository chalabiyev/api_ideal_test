import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

import { DashboardContent } from 'src/layouts/dashboard';
import { SeoIllustration } from 'src/assets/illustrations';
import { _appAuthors, _appRelated, _appFeatured, _appInvoices, _appInstalled } from 'src/_mock';

import { svgColorClasses } from 'src/components/svg-color';

import { useMockedUser } from 'src/auth/hooks';

import { AppWidget } from '../app-widget';
import { AppWelcome } from '../app-welcome';
import { AppFeatured } from '../app-featured';
import { AppNewInvoice } from '../app-new-invoice';
import { AppTopAuthors } from '../app-top-authors';
import { AppTopRelated } from '../app-top-related';
import { AppAreaInstalled } from '../app-area-installed';
import { AppWidgetSummary } from '../app-widget-summary';
import { AppCurrentDownload } from '../app-current-download';
import { AppTopInstalledCountries } from '../app-top-installed-countries';
import { AnalyticsWidgetSummary } from '../../analytics/analytics-widget-summary';
import { CartIcon } from 'src/sections/product/components/cart-icon';

// ----------------------------------------------------------------------

export function OverviewAppView() {
  const { user } = useMockedUser();

  const theme = useTheme();

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
       
       
        <Grid xs={12} md={6} lg={3}>
          <AnalyticsWidgetSummary
            title="Sorğularin sayı bu gün"
            total={1234}
            percent={3}
            icon={<SeoIllustration />}
            chart={{
              series: [22, 8, 35, 50, 82, 84, 77, 12],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={3}>
          <AnalyticsWidgetSummary
            title="Sorğularin sayı bu gün"
            total={1234}
            percent={3}
            icon={<SeoIllustration />}
            chart={{
              series: [22, 8, 35, 50, 82, 84, 77, 12],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={3}>
          <AnalyticsWidgetSummary
            title="Bu gün verilən kreditlərin sayı"
            total={2345}
            percent={3}
            icon={<SeoIllustration />}
            chart={{
              series: [22, 8, 35, 50, 82, 84, 77, 12],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={3}>
          <AnalyticsWidgetSummary
          id='creditValue'
            title="Bu gün verilən məbləğ"
            total={1234}
            percent={3}
            icon={<SeoIllustration />}
            chart={{
              series: [22, 8, 35, 50, 82, 84, 77, 12],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            }}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total active users"
            percent={2.6}
            total={18765}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [15, 18, 12, 51, 68, 11, 39, 37],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total installed"
            percent={0.2}
            total={4876}
            chart={{
              colors: [theme.vars.palette.info.main],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [20, 41, 63, 33, 28, 35, 50, 46],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total downloads"
            percent={-0.1}
            total={678}
            chart={{
              colors: [theme.vars.palette.error.main],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [18, 19, 31, 8, 16, 37, 12, 33],
            }}
          />
        </Grid>

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

        <Grid xs={12} md={6} lg={4}>
          <AppTopInstalledCountries title="Top installed countries" list={_appInstalled} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTopAuthors title="Top authors" list={_appAuthors} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
            <AppWidget
              title="Conversion"
              total={38566}
              icon="solar:user-rounded-bold"
              chart={{ series: 48 }}
            />

            <AppWidget
              title="Applications"
              total={55566}
              icon="fluent:mail-24-filled"
              chart={{
                series: 75,
                colors: [theme.vars.palette.info.light, theme.vars.palette.info.main],
              }}
              sx={{ bgcolor: 'info.dark', [`& .${svgColorClasses.root}`]: { color: 'info.light' } }}
            />
          </Box>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
