import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import useApi from 'src/api/useApi';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import ProfileTab from './ProfileTab';
import BankInfoTab from './BankInfoTab';
import FizikiMuqavile from './FizikiMuqavile';
import LegalProfileTab from './LegalProfileTab';

const metadata = { title: `Partnyor | Düzəliş et` };

enum PartnerType {
  fiziki = 'FIZIKI',
  huqiqi = 'HUQUQI',
}

const EditPartnyor = () => {
  // bu sayfada path kismindaki id = editledigimiz partnerin id si
  const { id } = useParams();

  //   const {  data: partnerData, hasData: hasPartnerData,   loading: partnerLoading,   error: partnerError,   refetch: partnerRefetch, } = useApi(`endpointgelecekburaya/${id}`);

  // ILKIN burada partnerin huqiqi mi fiziki mi oldugunu kontrol etmemiz gerekli.
  // buna uygun olarak bazı inputlar gösterilecek, bazıları gizli olacak

  //   const { partnerType, setPartnerType } = useState<PartnerType>(PartnerType.fiziki);

  //   useEffect(() => {
  //     // partnerin fiziki mi huquqi mi oldugunu burada set ediyoruz
  //     if (partnerData.formOfOwnership === 'FIZIKI') {
  //       setPartnerType(PartnerType.fiziki);
  //     } else {
  //       setPartnerType(PartnerType.huqiqi);
  //     }
  //   }, [partnerData]);

  //   bunlar tablar
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      {' '}
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Partnerin adı gelecek"
          links={[{ name: 'Bütün Partnyor', href: '/partynorlar/list' }, { name: 'Düzəliş et' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderColor: 'Background' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs">
                <Tab label="Profil" value="1" />
                <Tab label="Bank məlumatları" value="2" />
                {/* <Tab label="Müqavilə" value="3" /> */}
              </TabList>
            </Box>
            <TabPanel sx={{ py: 3, px: 0 }} value="1">
              {/* parner eger fiziki ise bu tab  */}
              <ProfileTab />
              {/* huquqi ise bu tab  */}
              {/* <LegalProfileTab /> */}
            </TabPanel>
            <TabPanel sx={{ py: 3, px: 0 }} value="2">
              <BankInfoTab />
            </TabPanel>
            {/* <TabPanel sx={{ py: 3, px: 0 }} value="3">
              <FizikiMuqavile />
            </TabPanel> */}
          </TabContext>
        </Box>
      </DashboardContent>
    </>
  );
};

export default EditPartnyor;
