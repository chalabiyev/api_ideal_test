import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import useApi from 'src/api/useApi';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import TabIdentification from 'src/components/NewCredit/TabIdentification';
import { DashboardContent } from 'src/layouts/dashboard';
import TabGuarantor from 'src/components/NewCredit/TabGuarantor';
import TabVehicleInformation from 'src/components/NewCredit/TabVehicleInformation';
import TabCreditDataPage from 'src/components/NewCredit/TabCreditDataPage';
import RecruiterData from '../../components/NewCredit/RecruiterData';
// import TabFamilyInformation from 'src/components/NewCredit/TabFamilyInformation';

// ----------------------------------------------------------------------

const metadata = { title: `İdeal Kredit | Yeni kredit` };

export default function Page() {
  // tab changes
  const [value, setValue] = React.useState('1');
  const [userInfo, setUserInfo] = React.useState<any>(null);
  const [pin, setPin] = React.useState<string>('');
  const [seriaNo, setSeriaNo] = React.useState<string>('');

  const endpoint = `/document/getIdCardInfo?pin=${pin}&documentNumber=${seriaNo}`;
  const { data, error, hasData, loading, refetch } = useApi(endpoint);

  // Call this function only to set the userInfo after data is fetched
  const getUserInfo = () => {
    if (hasData) {
      console.log(data);
      setUserInfo(data);
    }
  };

  useEffect(() => {
    // Trigger user info update whenever new data is fetched
    getUserInfo();

    // eslint-disable-next-line
  }, [data]);

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
          heading="Yeni kredit yarat"
          links={[{ name: 'Kredit' }, { name: 'Yeni kredit' }]}
          // action={
          //   <Button
          //     component={RouterLink}
          //     // href={paths.haqqinda.elaveet}
          //     variant="contained"
          //     startIcon={<Iconify icon="mingcute:add-line" />}
          //   >
          //     Əlavə et
          //   </Button>
          // }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'Background' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Ş/V" value="1" />
                <Tab label="İş yeri" value="2" />
                <Tab label="Zaminlik haqqında məlumat" value="3" />
                {/* <Tab label="Ailə üzvləri" value="4" /> */}
                <Tab label="Nəqliyyat vasitələri" value="5" />
                <Tab label="Kredit ver" value="6" />
              </TabList>
            </Box>
            <TabPanel sx={{ p: 0 }} value="1">
              {/* Ş/V  */}

              <TabIdentification
                loading={loading}
                userInfo={userInfo}
                getUserInfo={getUserInfo}
                setValue={setValue}
                setPin={setPin}
                setSeriaNo={setSeriaNo}
                hasData={hasData}
              />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="2">
              {/* İşə götürən məlumatları  */}
              <RecruiterData setValue={setValue} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="3">
              {/* zamin  */}
              <TabGuarantor setValue={setValue} />
            </TabPanel>
            {/* <TabPanel sx={{ p: 0 }} value="4">
              {/* zamin  */}
            {/* <TabFamilyInformation /> */}
            {/* </TabPanel> */}
            <TabPanel sx={{ p: 0 }} value="5">
              {/* neqliyyat  */}
              <TabVehicleInformation setValue={setValue} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="6">
              {/* neqliyyat  */}
              <TabCreditDataPage setValue={setValue} />
            </TabPanel>
          </TabContext>
        </Box>
      </DashboardContent>
    </>
  );
}
