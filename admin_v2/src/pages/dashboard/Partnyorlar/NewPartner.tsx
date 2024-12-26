import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useApi from 'src/api/useApi';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import BankInfoTab from './BankInfoTab';
import ProfileTab from './ProfileTab';
import { DashboardContent } from 'src/layouts/dashboard';
import FizikiMuqavile from './FizikiMuqavile';
import { ActivityType, EOwnerType } from 'src/types/CreditRequest';
import SubmitPartnerButton from './SubmitPartnerButton';
import PageControl from './PageControl';

const metadata = { title: `Yeni partnyor` };
export default function Page() {
  // partner type
  const [partnerType, setPartnerType] = React.useState<EOwnerType>(EOwnerType.HUQUQI);

  // tablar
  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // partner datalari
  const [partnerData, setPartnerData] = useState<any>({
    // 1
    formOfOwnership: partnerType,
    image: '1735127578079_1735112882144_SDGFFDS_Image.avif',
    businessName: 'test', //
    companyName: 'test',
    directorName: 'test',
    voen: 543242342,
    // ANCAQ HUQUQI
    establishmentDocument: ['1735127578079_1735112882144_SDGFFDS_Image.avif'],
    // ANCAQ HUQUQI
    identityCard: '1735127578079_1735112882144_SDGFFDS_Image.avif',
    rentContract: '1735127578079_1735112882144_SDGFFDS_Image.avif',
    companyImages: ['1735127578079_1735112882144_SDGFFDS_Image.avif'],
    monthlySales: 10,
    startDate: new Date().toISOString().split('T')[0],
    activityType: 'SALES',
    country: 'Azərbaycan',
    city: 'Bakı',
    address: 'test',
    // 2

    bank: 'test',
    clientBankAccount: 'test',
    reportBankAccount: 'test',
    bankCode: 123,
    bankVoen: 5433,
    swiftCode: 'test',
    // 3
    signableContract: '',
  });

  // eger huqiquden fizikiye gecis yaparsa bu input sifirlanmali
  useEffect(() => {
    console.log('partnerData : ', partnerData);
    if (partnerType === EOwnerType.FIZIKI) {
      setOtherFilesPreview((prev: any) => ({
        ...prev,
        establishmentDocument: [],
      }));

      setPartnerData((prev: any) => ({
        ...prev,
        establishmentDocument: [],
      }));
    }
  }, [partnerType]);
  useEffect(() => {
    console.log('partnerData : ', partnerData);
  }, [partnerData]);
  // tab1
  const [logoPreview, setLogoPreview] = useState<string | null>(partnerData?.image || null);
  const [idFilePreview, setIdFilePreview] = useState<string | null>(
    partnerData?.identityCard || null
  );
  const [otherFilesPreview, setOtherFilesPreview] = useState({
    rentContract: partnerData?.rentContract || null,
    establishmentDocument: partnerData?.establishmentDocument || [],
    companyImages: partnerData?.companyImages || [],
  });

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Yeni partnyor"
          links={[
            { name: 'Bütün partnyorlar', href: '/partynorlar/list' },
            { name: 'Yeni partnyor' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Box className="">
          <FormControl>
            <InputLabel id="demo-simple-select-label">Partnyor tipi</InputLabel>
            <Select
              sx={{
                borderRadius: 2,
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select-label"
              value={partnerType}
              label="Partnyor tipi"
              onChange={(e) => setPartnerType(e.target.value as EOwnerType)}
            >
              <MenuItem value={EOwnerType.FIZIKI}>Fiziki partnyor</MenuItem>
              <MenuItem value={EOwnerType.HUQUQI}>Hüquqi partnyor</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: '100%', typography: 'body1', p: 2 }}>
          <TabContext value={value}>
            <Box sx={{ borderColor: 'Background' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs">
                <Tab label="Profil" value="1" />
                <Tab label="Bank məlumatları" value="2" />
                <Tab label="Müqavilə" value="3" />
              </TabList>
            </Box>
            <TabPanel sx={{ py: 3, px: 0 }} value="1">
              <ProfileTab
                otherFilesPreview={otherFilesPreview}
                setOtherFilesPreview={setOtherFilesPreview}
                idFilePreview={idFilePreview}
                setIdFilePreview={setIdFilePreview}
                partnerType={partnerType}
                setPartnerType={setPartnerType}
                partnerData={partnerData}
                setPartnerData={setPartnerData}
                logoPreview={logoPreview}
                setLogoPreview={setLogoPreview}
              />
            </TabPanel>
            <TabPanel sx={{ py: 3, px: 0 }} value="2">
              <BankInfoTab partnerData={partnerData} setPartnerData={setPartnerData} />
            </TabPanel>
            <TabPanel sx={{ py: 3, px: 0 }} value="3">
              <FizikiMuqavile
                setPartnerData={setPartnerData}
                setOtherFilesPreview={setOtherFilesPreview}
              />
            </TabPanel>
          </TabContext>
          <PageControl value={value} setValue={setValue} />
          <SubmitPartnerButton partnerData={partnerData} />
        </Box>
      </DashboardContent>
    </>
  );
}
