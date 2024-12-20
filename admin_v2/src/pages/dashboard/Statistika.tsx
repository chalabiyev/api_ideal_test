import { Box, Card, Typography } from '@mui/material';
import useApi from 'src/api/useApi';
import useDelete from 'src/api/useDelete';
import { Helmet } from 'react-helmet-async';
import { usePopover } from 'src/components/custom-popover';
import { DashboardContent } from 'src/layouts/dashboard';
import { Language } from 'src/types/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'src/routes/hooks';
import { usePostFile } from 'src/api/usePostFile';
import usePatch from 'src/api/usePatch';
import DailyCalls from 'src/components/statistika/DailyCalls';
import KinoteartlarinSixligi from 'src/components/statistika/KinoteartlarinSixligi';
import DownloadStatistics from 'src/components/statistika/DownloadStatistics';
import CreditDurationStatistics from 'src/components/statistika/CreditDurationStatistics';
import PartnerSourceStatistics from 'src/components/statistika/PartnerSourceStatistics';
import TrafficStatistics from 'src/components/statistika/TrafficStatistics';
import StatistikaGrid from 'src/components/statistika/StatistikaGrid';

// ----------------------------------------------------------------------

const metadata = { title: `İdeal Kredit | Statistika` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <StatistikaGrid />

        <Typography variant="h4" sx={{ mt: 5, mb: 3 }}>
          Bilet satışı
        </Typography>

        <DownloadStatistics />   
 
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-6 mb-4">
          <CreditDurationStatistics />
          <PartnerSourceStatistics />
        </div>

        <TrafficStatistics />

        <div className="grid gap-5 max-sm:grid-cols-1 max-xl:grid-cols-2 grid-cols-3">
          {/* heftelik bilet satisi  */}
          {/* <Card>
            <Box
              sx={{
                p: 2,
                pb: 0,
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <HeftelikBiletSatisi />
            </Box>
          </Card> */}
          {/* ayliq bilet satisi  */}
          {/* <Card>
            <Box
              sx={{
                p: 2,
                pb: 0,
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <AyliqBiletSatisi />
            </Box>
          </Card> */}

          {/* illik bilet satisi  */}
          {/* <Card>
            <Box
              sx={{
                p: 2,
                pb: 0,
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <IllikBiletSatisi />
            </Box>
          </Card> */}
        </div>

        {/* gunluk bilet satisi */}
        <Card sx={{ mt: 5 }}>
          <Box
            sx={{
              p: 2,
              pb: 0,
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <DailyCalls />
          </Box>
        </Card>

        {/* ziyaretci sayi  */}
        {/* <ZiyaretciSayi /> */}

        {/* <TamasaciSayi/> */}

        <KinoteartlarinSixligi />
      </DashboardContent>
    </>
  );
}
