import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useApi from 'src/api/useApi';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import TabIdentification from 'src/components/NewCredit/TabIdentification';
import { DashboardContent } from 'src/layouts/dashboard';
import TabGuarantor from 'src/components/NewCredit/TabGuarantor';
import TabVehicleInformation from 'src/components/NewCredit/TabVehicleInformation';
import TabCreditDataPage from 'src/components/NewCredit/TabCreditDataPage';
import TabVideoRecord from 'src/components/NewCredit/TabVideoRecord';
import RecruiterData from 'src/components/NewCredit/RecruiterData';
import TabFamilyInformation from 'src/components/NewCredit/TabFamilyInformation';
import TabContract from 'src/components/NewCredit/TabContract';

// ----------------------------------------------------------------------

const metadata = { title: `Video müraciət | Nağd ` };

export default function Page() {
  // eslint-disable-next-line
  const location = window.location;
  const queryParams = new URLSearchParams(location.search);
  const clientPin: string = queryParams.get("pin") ?? '';
  const clientId: string = queryParams.get("clientId") ?? '';
  const operatorId: string = queryParams.get("operatorId") ?? '';

  // tab changes
  const [value, setValue] = React.useState('1');
  const [userInfo, setUserInfo] = React.useState<any>(null);
  const [pin, setPin] = React.useState<string>('');
  const [seriaNo, setSeriaNo] = React.useState<string>('');

  // guarantor
  const [guarantorInfo, setGuarantorInfo] = React.useState<any>(null);
  const [guarantorPin, setGuarantorPin] = React.useState<string>('');
  const [guarantorSeriaNo, setGuarantorSeriaNo] = React.useState<string>('');
  const [creditAmount, setCreditAmount] = useState<number>(0);
  const [creditDuration, setCreditDuration] = useState<number>(12);

  const guarantorEndpoint = `/document/getIdCardInfo?pin=${guarantorPin}&documentNumber=${guarantorSeriaNo}`;
  const {
    data: guarantorData,
    error: guarantorError,
    hasData: hasGuarantorData,
    loading: guarantorLoading,
    refetch: guarantorRefetch,
  } = useApi(guarantorEndpoint);

  const endpoint = `/document/getIdCardInfoByPin?pin=${pin}`;
  const { data, error, hasData, loading, refetch } = useApi(endpoint);
  const endpointUserByUserName = `/auth/getUserByUserName/${pin}`;
  const { data: userData } = useApi(endpointUserByUserName);

  // Call this function only to set the userInfo after data is fetched
  const getUserInfo = () => {
    if (hasData) {
      if (userData)
        data.phoneNumber = userData.phoneNumber;
      setUserInfo(data);
    }
  };

  const getGuarantorInfo = () => {
    if (hasGuarantorData) {
      console.log('guarantorData : ', guarantorData);
      setGuarantorInfo(guarantorData);
    }
  };

  useEffect(() => {
    if (clientPin) {
      setPin(clientPin);
    }
  }, [clientPin]);

  useEffect(() => {
    // Trigger user info update whenever new data is fetched
    getUserInfo();
    getGuarantorInfo();

    // eslint-disable-next-line
  }, [data, guarantorData]);

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
          heading="Nağd pul krediti"
          links={[{ name: 'Video müraciət' }, { name: 'Nağd pul krediti' }]}
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
            <Box sx={{ borderBottom: 1, borderColor: 'transparent' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Ş/V" value="1" />
                <Tab label="İş yeri" value="2" />
                <Tab label="Zaminlik haqqında məlumat" value="3" />
                <Tab label="Əlaqəli şəxlər" value="4" />
                <Tab label="Nəqliyyat vasitələri" value="5" />
                <Tab label="Kredit ver" value="6" />
                <Tab label="Video qeydiyyat" value="7" />
                <Tab label="Müqavilə" value="8" />
              </TabList>
            </Box>

            <TabPanel sx={{ p: 0 }} value="1">
              <TabIdentification
                loading={loading}
                userInfo={userInfo}
                getUserInfo={getUserInfo}
                setValue={setValue}
                setPin={setPin}
                setSeriaNo={setSeriaNo}
                hasData={hasData}
                pinValue={pin}
                seriaNoValue={seriaNo}
                setUserInfo={setUserInfo}
              />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="2">
              <RecruiterData setValue={setValue} />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="3">
              <TabGuarantor
                setValue={setValue}
                loading={guarantorLoading}
                guarantorInfo={guarantorInfo}
                getGuarantorInfo={getGuarantorInfo}
                setPin={setGuarantorPin}
                setSeriaNo={setGuarantorSeriaNo}
                hasData={hasGuarantorData}
              />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="4">
              <TabFamilyInformation />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="5">
              <TabVehicleInformation setValue={setValue} />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="6">
              <TabCreditDataPage setValue={setValue} creditAmount={creditAmount} creditDuration={creditDuration} setCreditAmount={setCreditAmount} setCreditDuration={setCreditDuration} />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="7">
              <TabVideoRecord setValue={setValue} userInfo={userInfo} creditAmount={creditAmount} creditDuration={creditDuration} clientId={clientId} operatorId={operatorId} />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="8">
              <TabContract />
            </TabPanel>
          </TabContext>
        </Box>
      </DashboardContent>
    </>
  );
}
