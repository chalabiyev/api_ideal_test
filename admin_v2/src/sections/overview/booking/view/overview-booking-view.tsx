import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import { DashboardContent } from 'src/layouts/dashboard';
import {
  BookingIllustration,
  CheckInIllustration,
  CheckoutIllustration,
} from 'src/assets/illustrations';

import { BookingBooked } from '../booking-booked';
import { BookingDetails } from '../booking-details';
import { BookingAvailable } from '../booking-available';
import { BookingStatistics } from '../booking-statistics';
import { BookingTotalIncomes } from '../booking-total-incomes';
import { BookingWidgetSummary } from '../booking-widget-summary';
import { BookingCheckInWidgets } from '../booking-check-in-widgets';

// ----------------------------------------------------------------------

export function OverviewBookingView() {
  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3} disableEqualOverflow>
        <Grid xs={12} md={4}>
          <BookingWidgetSummary
            title="Total booking"
            percent={2.6}
            total={714000}
            icon={<BookingIllustration />}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <BookingWidgetSummary
            title="Sold"
            percent={0.2}
            total={311000}
            icon={<CheckInIllustration />}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <BookingWidgetSummary
            title="Canceled"
            percent={-0.1}
            total={124000}
            icon={<CheckoutIllustration />}
          />
        </Grid>

        <Grid container xs={12}>
          <Grid xs={12} md={7} lg={8}>
            <Box
              sx={{
                mb: 3,
                p: { md: 1 },
                display: 'flex',
                gap: { xs: 3, md: 1 },
                borderRadius: { md: 2 },
                flexDirection: 'column',
                bgcolor: { md: 'background.neutral' },
              }}
            >
              <Box
                sx={{
                  p: { md: 1 },
                  display: 'grid',
                  gap: { xs: 3, md: 0 },
                  borderRadius: { md: 2 },
                  bgcolor: { md: 'background.paper' },
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
                }}
              >
                <BookingTotalIncomes
                  title="Total incomes"
                  total={18765}
                  percent={2.6}
                  chart={{
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                    series: [{ data: [10, 41, 80, 100, 60, 120, 69, 91, 160] }],
                  }}
                />
              </Box>

              <BookingCheckInWidgets
                chart={{
                  series: [
                    { label: 'Sold', percent: 73.9, total: 38566 },
                    { label: 'Pending for payment', percent: 45.6, total: 18472 },
                  ],
                }}
                sx={{ boxShadow: { md: 'none' } }}
              />
            </Box>

            <BookingStatistics
              title="Statistics"
              chart={{
                series: [
                  {
                    name: 'Günlük',
                    categories: [
                      '1',
                      '2',
                      '3',
                      '4',
                      '5',
                      '6',
                      '7',
                      '8',
                      '9',
                      '10',
                      '11',
                      '12',
                      '13',
                      '14',
                      '15',
                      '16',
                      '17',
                      '18',
                      '19',
                      '20',
                      '21',
                      '22',
                      '23',
                      '24',
                      '25',
                      '26',
                      '27',
                      '28',
                      '29',
                      '30',
                      '31',
                    ],
                    data: [
                      {
                        name: 'Sıxlığı',
                        data: [
                          24, 41, 35, 151, 49, 38, 51, 55, 52, 61, 69, 91, 106, 114, 125, 132, 141,
                          148, 152, 158, 162, 166, 170, 174, 177, 180, 183, 186, 188, 190, 192,
                        ],
                      },
                    ],
                  },
                  {
                    name: 'Həftəlik',
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                    data: [{ name: 'Sıxlığı', data: [83, 112, 119, 88, 103, 112, 114, 108, 93] }],
                  },
                  {
                    name: 'Aylıq',
                    categories: [
                      'Yanvar',
                      'Fevral',
                      'Mart',
                      'Aprel',
                      'May',
                      'İyun',
                      'İyul',
                      'Avqust',
                      'Sentyabr',
                      'Oktyabr',
                      'Noyabr',
                      'Dekabr',
                    ],
                    data: [
                      { name: 'Sıxlığı', data: [76, 42, 29, 41, 27, 96, 31, 32, 37, 31, 39, 41] },
                    ],
                  },
                ],
              }}
            />
          </Grid>

          <Grid xs={12} md={5} lg={4}>
            <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
              <BookingAvailable
                title="Tours available"
                chart={{
                  series: [
                    { label: 'Sold out', value: 120 },
                    { label: 'Available', value: 66 },
                  ],
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
