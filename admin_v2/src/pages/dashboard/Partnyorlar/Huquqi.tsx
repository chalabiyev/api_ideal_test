import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Grid, MenuItem, Tab, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import useApi from 'src/api/useApi';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import BankInfoTab from './BankInfoTab';
import ProfileTab from './ProfileTab';
import { DashboardContent } from 'src/layouts/dashboard';
import FizikiMuqavile from './FizikiMuqavile';
import LegalProfileTab from './LegalProfileTab';
// import TabFamilyInformation from 'src/components/NewCredit/TabFamilyInformation';

// ----------------------------------------------------------------------

const metadata = { title: `Yeni partnyor (hüquqi)` };

export default function Page() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Yeni partnyor (hüquqi)"
          links={[{ name: 'Partnyor' }, { name: 'Yeni partnyor' }, { name: 'Hüquqi' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderColor: 'Background' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs">
                <Tab label="Profil" value="1" />
                <Tab label="Bank məlumatları" value="2" />
                <Tab label="Müqavilə" value="3" />
              </TabList>
            </Box>
            <TabPanel sx={{ py: 3, px: 0 }} value="1">
              <LegalProfileTab />
            </TabPanel>
            <TabPanel sx={{ py: 3, px: 0 }} value="2">
              <Typography variant="h6" sx={{ mb: 3 }}>VÖEN-ə bağlı bank hesabı məlumatlarını doldur</Typography>
              <BankInfoTab />
            </TabPanel>
            <TabPanel sx={{ py: 3, px: 0 }} value="3">
              <FizikiMuqavile />
            </TabPanel>
          </TabContext>
        </Box>
      </DashboardContent>
    </>
  );
}
