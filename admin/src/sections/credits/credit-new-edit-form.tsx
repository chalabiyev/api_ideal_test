import { z as zod } from 'zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import {
  Tab,
  Tabs,
  Table,
  Slider,
  Divider,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
} from '@mui/material';
import { toast } from 'src/components/snackbar';

import { Form, Field } from 'src/components/hook-form';

import { PRODUCT_GENDER_OPTIONS } from 'src/_mock';

import ScoreCard from './scoreBoard';
import {
  _familyRelationshipOptions,
  whereToGetSignatureOptions,
} from '../_examples/extra/form-validation-view/react-hook-form';
import {
  loanData,
  zaminData,
  creditData,
  familyData,
  oldLoanData,
  vehicleData,
  _customerRole,
  paymentHistory,
  sorguTarixcesi,
  combinedHeaders,
  guarantorLoanData,
} from './credit-data';

export type ValuesType = {
  [year: string]: {
    [month: string]: number;
  };
};
// Dummy data for users
const users = [
  {
    fin: '1234567',
    serialNumber: 'aze16883446',
    avatarUrl:
      'https://images.pexels.com/photos/17455462/pexels-photo-17455462/free-photo-of-train-at-railway-station.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    passportStatus: 'aktiv',
    name: 'Aysel',
    surname: 'Aliyev',
    fatherName: 'Cavid',
    born: '11.10.2001',
    reportNum: 'testreport №229',
    familyRelationship: 'single',
    gender: 'Women',
    dateMade: '11 oktyabr 2001',
    historyMadeDate: '123456',
    loanerId: 'AZE000000',
    loanerAdd: 'Baku, Hovsan, xyz',
    loanerScore: 400,
    loanerBornAdd: 'Baku, Hovsan, xyz',
    loanerBornDate: '11.10.2001',
    state: 'Baku',
    role: 'customer',
    address: 'Baku, Hovsan, xyz',
    phoneNumber: '+994 50 123 45 67',
    education: 'ali',
    workplaceName: '"Soliton LTD "MMC',
    workplaceAddress: 'Bakı şəh.Babək pr.11-26 Quter Mebel salonu',
    positionAndExperience: 'menecer',
    monthlySalary: '1200 AZN',
    totalMonthlyIncome: '2500',
    totalExpenses: '969',
    netIncome: '1531',
    contractStartDate: '11 yanvar 2024',
    contractEndDate: '11 yanvar 2025',
    monthlySalaryAmount: '500',
    akbInfo: '6000',
    internalRiskSystem: '6000',
    propertyType: 'həyət evi',
    registrationNumber: '12345',
    occupancyAddress: '123 Main St, Baku',
    ownershipStatus: 'öz adınadır',
    numberOfRooms: '3',
    area: '120',
    constructionYear: '2010',
    marketValue: '150000',
    mortgageStatus: 'No Mortgage',
    monthlyRent: '1000',
  },
  {
    fin: '7654321',
    serialNumber: 'aa1234567',
    avatarUrl:
      'https://images.pexels.com/photos/17455462/pexels-photo-17455462/free-photo-of-train-at-railway-station.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    passportStatus: 'aktiv',
    name: 'testName',
    surname: 'testSurname',
    fatherName: 'testFatherName',
    born: '11.10.2001',
    reportNum: 'testreport №229',
    familyRelationship: 'married',
    gender: 'Men',
    dateMade: '11 oktyabr 2001',
    historyMadeDate: '123456',
    loanerId: 'AZE000000',
    loanerAdd: 'Baku, Hovsan, xyz',
    loanerScore: 400,
    loanerBornAdd: 'Baku, Hovsan, xyz',
    loanerBornDate: '11.10.2001',
    state: 'Baku',
    role: 'customer',
    address: 'Baku, Hovsan, xyz',
    phoneNumber: '+994 50 123 45 67',
    education: 'ali',
    workplaceName: '"Soliton LTD "MMC',
    workplaceAddress: 'Bakı şəh.Babək pr.11-26 Quter Mebel salonu',
    positionAndExperience: 'menecer',
    monthlySalary: '1200 AZN',
    totalMonthlyIncome: '2500',
    totalExpenses: '969',
    netIncome: '1531',
    contractStartDate: '11 yanvar 2024',
    contractEndDate: '11 yanvar 2025',
    monthlySalaryAmount: '500',
    akbInfo: '6000',
    internalRiskSystem: '6000',
    propertyType: 'həyət evi',
    registrationNumber: '12345',
    occupancyAddress: '123 Main St, Baku',
    ownershipStatus: 'öz adınadır',
    numberOfRooms: '3',
    area: '120',
    constructionYear: '2010',
    marketValue: '150000',
    mortgageStatus: 'No Mortgage',
    monthlyRent: '1000',
  },
  {
    fin: '1235678',
    serialNumber: 'aze12345678',
    avatarUrl:
      'https://images.pexels.com/photos/17455462/pexels-photo-17455462/free-photo-of-train-at-railway-station.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    passportStatus: 'aktiv',
    name: 'testName',
    surname: 'testSurname',
    fatherName: 'testFatherName',
    born: '11.10.2001',
    reportNum: 'testreport №229',
    familyRelationship: 'married',
    gender: 'Men',
    dateMade: '11 oktyabr 2001',
    historyMadeDate: '123456',
    loanerId: 'AZE000000',
    loanerAdd: 'Baku, Hovsan, xyz',
    loanerScore: 400,
    loanerBornAdd: 'Baku, Hovsan, xyz',
    loanerBornDate: '11.10.2001',
    state: 'Baku',
    role: 'customer',
    address: 'Baku, Hovsan, xyz',
    phoneNumber: '+994 50 123 45 67',
    education: 'ali',
    workplaceName: '"Soliton LTD "MMC',
    workplaceAddress: 'Bakı şəh.Babək pr.11-26 Quter Mebel salonu',
    positionAndExperience: 'menecer',
    monthlySalary: '1200 AZN',
    totalMonthlyIncome: '2500',
    totalExpenses: '969',
    netIncome: '1531',
    contractStartDate: '11 yanvar 2024',
    contractEndDate: '11 yanvar 2025',
    monthlySalaryAmount: '500',
    akbInfo: '6000',
    internalRiskSystem: '6000',
    propertyType: 'həyət evi',
    registrationNumber: '12345',
    occupancyAddress: '123 Main St, Baku',
    ownershipStatus: 'öz adınadır',
    numberOfRooms: '3',
    area: '120',
    constructionYear: '2010',
    marketValue: '150000',
    mortgageStatus: 'No Mortgage',
    monthlyRent: '1000',
  },
];

export const schema = zod
  .object({
    fin: zod
      .string()
      .min(7, { message: 'Fin 7 simvoldan az ola bilməz!' })
      .max(7, { message: 'Fini 7 simvoldan çox ola bilməz!' }),
    serialNumber: zod
      .string()
      .max(11, { message: 'Ş/V seriyası 11 simvoldan çox ola bilməz!' })
      .min(9, {
        message: 'Ş/V seriyası və nömrəsi 9 simvoldan az ola bilməz!',
      }),
    passportStatus: zod.string().min(1, { message: 'Vəsiqənin statusu tələb olunur!' }),
    name: zod.string().min(1, { message: 'Ad tələb olunur!' }),
    surname: zod.string().min(1, { message: 'Soyad tələb olunur!' }),
    fatherName: zod.string().min(1, { message: 'Ata adı tələb olunur!' }),
    born: zod.string().min(1, { message: 'Doğum tarixi tələb olunur!' }),
    familyRelationship: zod.string().min(1, { message: 'Ailə vəziyyəti tələb olunur!' }),
    gender: zod.string().min(1, { message: 'Cinsiyyət tələb olunur!' }),
    state: zod.string().min(1, { message: 'Doğum yeri tələb olunur!' }),
    zipCode: zod.string().min(1, { message: 'Zip kodu tələb olunur!' }),
    role: zod.string().min(1, { message: 'Rol tələb olunur!' }),
    email: zod
      .string()
      .min(1, { message: 'Email tələb olunur!' })
      .email({ message: 'Email Adresini düzgün daxil edin!' }),
    phoneNumber: zod.string().min(1, { message: 'Telefon nömrəsi tələb olunur!' }),
    address: zod.string().min(1, { message: 'Yaşayış yeri tələb olunur!' }),
    country: zod.string().min(1, { message: 'Ölkə tələb olunur!' }),
    status: zod.string(),
    reportNum: zod.string().min(1, { message: 'Hesabat nömrəsi tələb olunur!' }),
    dateMade: zod.string().min(1, { message: 'Hesabatın yaradıldığı tarix tələb olunur!' }),
    historyMadeDate: zod.string().min(1, { message: 'Tarixçənin açıldığı tarix tələb olunur!' }),
    loanerId: zod.string().min(1, { message: 'Borcalanın ID-si tələb olunur!' }),
    loanerScore: zod.number().min(1, { message: 'Borcalanın skoru tələb olunur!' }),
    loanerAdd: zod.string().min(1, { message: 'Borcalanın ünvanı tələb olunur!' }),
    loanerBornAdd: zod.string().min(1, { message: 'Borcalanın doğum yeri tələb olunur!' }),
    loanerBornDate: zod.string().min(1, { message: 'Borcalanın doğum tarixi tələb olunur!' }),
    education: zod.string().min(1, { message: 'Təhsil tələb olunur!' }),
    workplaceName: zod.string().min(1, { message: 'İş yeri adı tələb olunur!' }),
    workplaceAddress: zod.string().min(1, { message: 'İş yeri ünvanı tələb olunur!' }),
    positionAndExperience: zod.string().min(1, { message: 'Vəzifə və təcrübə tələb olunur!' }),
    monthlySalary: zod.string().min(1, { message: 'Aylıq maaş tələb olunur!' }),
    totalMonthlyIncome: zod.string().min(1, { message: 'Cəmi aylıq gəlir tələb olunur!' }),
    totalExpenses: zod.string().min(1, { message: 'Cəmi xərclər tələb olunur!' }),
    netIncome: zod.string().min(1, { message: 'Net gəlir tələb olunur!' }),
    contractStartDate: zod.string().min(1, { message: 'Müqavilənin başlama tarixi tələb olunur!' }),
    contractEndDate: zod.string().min(1, { message: 'Müqavilənin bitmə tarixi tələb olunur!' }),
    monthlySalaryAmount: zod.string().min(1, { message: 'Aylıq maaş məbləği tələb olunur!' }),
    akbInfo: zod.string().min(1, { message: 'AKB məlumatı tələb olunur!' }),
    internalRiskSystem: zod.string().min(1, { message: 'Daxili risk sistemi tələb olunur!' }),
    propertyType: zod.string().min(1, { message: 'Əmlak növü tələb olunur!' }),
    registrationNumber: zod.string().min(1, { message: 'Qeydiyyat nömrəsi tələb olunur!' }),
    occupancyAddress: zod.string().min(1, { message: 'Ünvanı tələb olunur!' }),
    ownershipStatus: zod.string().min(1, { message: 'Sahiblik statusu tələb olunur!' }),
    numberOfRooms: zod.string().min(1, { message: 'Otaq sayı tələb olunur!' }),
    area: zod.string().min(1, { message: 'Sahə tələb olunur!' }),
    constructionYear: zod.string().min(1, { message: 'İnşa tarixi tələb olunur!' }),
    marketValue: zod.string().min(1, { message: 'Bazar dəyəri tələb olunur!' }),
    mortgageStatus: zod.string().min(1, { message: 'İpoteka statusu tələb olunur!' }),
    monthlyRent: zod.string().min(1, { message: 'Aylıq icarə məbləği tələb olunur!' }),
    avatarUrl: zod.string(),
    loanTotal: zod.number().min(1, { message: 'Kredit məbləği boş buraxıla bilməz!' }),
    loanPercentagePerYear: zod
      .number()
      .min(1, { message: 'İllik faiz dərəcəsi boş buraxıla bilməz!' }),
    payPerMonth: zod.number().min(1, { message: 'Aylıq ödəniş məbləği boş buraxıla bilməz!' }),
    totalCredit: zod.number().min(1, { message: 'Cəmi kredit məbləği boş buraxıla bilməz!' }),
    totalPercetange: zod.number().min(1, { message: 'Cəmi faiz dərəcəsi boş buraxıla bilməz!' }),
    comissionDecide: zod.boolean(),
    whereToGetSignature: zod
      .string()
      .min(1, { message: 'Müqavilənin əldə ediləcəyi vasitə(lər) tələb olunur!' }),
    telegramUsernameToGet: zod
      .string()
      .min(1, { message: 'Telegram istifadəçi adı tələb olunur!' }),
    whatsappNumberToGet: zod.string().min(1, { message: 'WhatsApp nömrəsi tələb olunur!' }),
    emailToGet: zod.string().min(1, { message: 'Email tələb olunur!' }),
  })
  .refine((data) => data.telegramUsernameToGet || data.whatsappNumberToGet || data.emailToGet, {
    message: 'At least one of Telegram Username, WhatsApp Number, or Email is required!',
    path: ['telegramUsernameToGet', 'whatsappNumberToGet', 'emailToGet'],
  });
const getBackgroundColor = (daysLate: any) => {
  if (daysLate === '-') return '#C6C6C6'; // No information (gray)
  if (daysLate === 0) return '#00B0F0'; // 0 days delay (blue)
  if (daysLate <= 30) return '#FFFF00'; // 1-30 days delay (yellow)
  if (daysLate <= 90) return '#FFC000'; // 31-90 days delay (orange)
  if (daysLate <= 180) return '#FF0000'; // 91-180 days delay (red)
  if (daysLate <= 360) return '#7030A0'; // 181-360 days delay (dark red)
  if (daysLate > 360) return '#C00000'; // 361+ days delay (deep red)
  return '#FFFFFF'; // Default (white)
};
export function CreateCreditForm() {
  const [currentTab, setCurrentTab] = useState('s/v');
  const [selectedOption, setSelectedOption] = useState('em');

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      fin: '',
      serialNumber: '',
      whereToGetSignature: '',
    },
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handleSearch = () => {
    const fin = watch('fin');
    const serialNumber = watch('serialNumber');
    const user = users.find((u) => u.fin === fin && u.serialNumber === serialNumber);
    // if (fin.length === 0) {
    //   toast.error('Fin tələb olunur!');
    // } else if (serialNumber.length === 0) {
    //   toast.error('Ş/V seriyası və nömrəsi tələb olunur!');
    // }
    // if (user) {
    //   reset(user);
    //   toast.success('Məlumatlar tapıldı!');
    // } else {
    //   toast.error('Daxil edilən Ş/V seriyası və ya fin səhvdir!');
    // }
    try {
      if (serialNumber.length === 0) {
        throw new Error('Ş/V seriyası və nömrəsi tələb olunur!');
      } else if (fin.length === 0) {
        throw new Error('Fin tələb olunur!');
      }
      if (user) {
        reset(user);
        toast.success('Məlumatlar tapıldı!');
      } else {
        toast.error('Daxil edilən Ş/V seriyası və ya fin səhvdir!');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmit = handleSubmit((data) => {
    console.log('Submitted Data:', data);
    toast.success('Form submitted successfully!');
    if (Object.keys(errors).length > 0) {
      toast.error(
        Object.values(errors)
          .map((error) => error.message)
          .join('\n')
      );
    }
  });

  const handleTabChange = (event: any, newValue: string) => {
    setCurrentTab(newValue);
  };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Tabs value={currentTab} onChange={handleTabChange}>
        <Tab value="s/v" label="Ş/V" />
        {/* didn't added for now */}
        {/* <Tab value="akb2" label="Müştəri skoru" /> */}
        {/* <Tab value="akb" label="AKB" /> */}
        <Tab value="workplace" label="İş yeri" />
        <Tab value="zamin" label="Zaminlik haqqında məlumat" />
        <Tab value="occupancy" label="Əmlakları" />
        <Tab value="vehicle" label="Nəqliyyat vasitələri" />
        <Tab value="familyMembers" label="Ailə üzvləri" />
        <Tab value="credits" label="Kreditlər" />
      </Tabs>
      {(currentTab === 's/v' && (
        <Grid container gap="55px" mt={3}>
          <Grid
            item
            xs={12}
            sx={{
              alignItems: 'center',
            }}
          >
            <Card sx={{ p: 3 }}>
              <Box
                display="grid"
                rowGap={2}
                columnGap={2}
                gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
              >
                <Field.Text name="serialNumber" label="Serial Number" required variant="outlined" />
                <Field.Text
                  name="fin"
                  label="FIN"
                  required
                  variant="outlined"
                  // InputProps={{
                  //   endAdornment: (
                  //     <Button
                  //       onClick={handleSearch}
                  //       sx={{ ':hover': { backgroundColor: 'transparent' } }}
                  //     >
                  //       <SearchIconSVG />
                  //     </Button>
                  //   ),
                  // }}
                />
              </Box>
              <Button
                onClick={handleSearch}
                variant="contained"
                sx={{ mt: 2, width: '100%', backgroundColor: '#2D9CDB' }}
              >
                Axtar
              </Button>
            </Card>
          </Grid>

          <Grid xs={12}>
            <Box>
              <Field.UploadAvatar
                disabled
                name="avatarUrl"
                maxSize={3145728}
                sx={{
                  height: '128px',
                  width: '128px',
                }}
              />
            </Box>
            <Card sx={{ p: 3 }}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' }}
              >
                <Box
                  display="grid"
                  rowGap={3}
                  columnGap={2}
                  gridTemplateColumns={{ xs: 'repeat(2  , 1fr)' }}
                >
                  <Field.Text disabled name="name" label="Adı" />
                  <Field.Text name="surname" disabled label="Soyadı" />
                  <Field.Text name="fatherName" label="Ata adı" disabled />
                  <Field.Text
                    name="passportStatus"
                    disabled
                    label="Vəsiqənin statusu"
                    placeholder="asdf"
                  />
                  <Field.Text name="born" label="Doğum tarixi(xx.xx.xxxx)" disabled />
                  <Field.Text name="state" label="Doğum yeri" disabled />
                  <Field.Text name="role" label="Vəzifə" disabled />
                  <Field.Select
                    native
                    disabled
                    name="role"
                    label="Rol"
                    InputLabelProps={{ shrink: true }}
                  >
                    {_customerRole.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field.Select>
                  <Field.Select
                    native
                    disabled
                    name="familyRelationship"
                    label="Ailə vəziyyəti"
                    InputLabelProps={{ shrink: true }}
                  >
                    {_familyRelationshipOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field.Select>
                  <Field.Select
                    disabled
                    native
                    name="gender"
                    label="Cinsi"
                    InputLabelProps={{ shrink: true }}
                  >
                    {PRODUCT_GENDER_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field.Select>
                </Box>
                <Field.Text disabled name="address" label="Qeydiyyatda olduğu ünvan" />
                <Field.Text name="phoneNumber" label="Telefon nömrəsi" />
                <Box
                  display="grid"
                  rowGap={3}
                  columnGap={2}
                  gridTemplateColumns={{ xs: 'repeat(2  , 1fr)' }}
                >
                  <Field.Select
                    name="whereToGetSignature"
                    native
                    label="Müqavilənin əldə ediləcəyi vasitələr"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleOptionChange}
                  >
                    {whereToGetSignatureOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field.Select>

                  {selectedOption === 'tg' && (
                    <Field.Text name="whereToGetSignature" label="Telegram Username" />
                  )}
                  {selectedOption === 'wp' && (
                    <Field.Text name="whereToGetSignature" label="WhatsApp Number" />
                  )}
                  {selectedOption === 'em' && (
                    <Field.Text name="whereToGetSignature" label="Email" type="email" />
                  )}
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      )) ||
        (currentTab === 'workplace' && (
          <Grid spacing={3}>
            <Stack>
              <Typography
                sx={{
                  my: 3,
                  fontSize: 20,
                  lineHeight: 1.5,
                  fontWeight: 700,
                }}
              >
                İşəgötürən barədə məlumatlar
              </Typography>
              <Box
                display="grid"
                rowGap={3}
                columnGap={2}
                gridTemplateColumns={{ xs: 'repeat(2, 1fr)' }}
              >
                <Field.Text name="education" label="Təhsili" disabled />
                <Field.Text name="workplaceName" label="İşlədiyi yerin hüquqi adı" disabled />
                <Field.Text name="workplaceAddress" label="İşlədiyi yerin ünvanı" disabled />
                <Field.Text name="positionAndExperience" label="Tutduğu vəzifə və staj" disabled />
                <Field.Text name="monthlySalary" label="Aylıq əmək haqqı" disabled />
                <Field.Text
                  name="totalMonthlyIncome"
                  label="Aylıq cəmi gəlirlərin məbləği"
                  disabled
                />
                <Field.Text name="totalExpenses" label="Xərclərin cəmi" disabled />
                <Field.Text name="netIncome" label="Xalis gəlir (ixrac)" disabled />
                <Field.Text
                  name="contractStartDate"
                  label="Əmək müqaviləsinin bağlandığı tarix"
                  disabled
                />
                <Field.Text
                  disabled
                  name="contractEndDate"
                  label="Müddətli əmək müqaviləsinin qurtardığı tarix"
                />
                <Field.Text
                  disabled
                  name="monthlySalaryAmount"
                  label="İşçinin aylıq əməkhaqqının məbləği(manatla)"
                  sx={{
                    gridArea: '2 / 1 / 4 / 3',
                  }}
                />
              </Box>
              <Typography
                sx={{
                  my: 3,
                  fontSize: 20,
                  lineHeight: 1.5,
                  fontWeight: 700,
                }}
              >
                Toplam ödənişin yekun məbləği
              </Typography>
              <Box
                display="grid"
                rowGap={3}
                columnGap={2}
                gridTemplateColumns={{ xs: 'repeat(2, 1fr)' }}
              >
                <Field.Text name="akbInfo" label="AKB məlumatlarına əsasən" disabled />
                <Field.Text name="internalRiskSystem" label="Daxili risk sistemi üzrə" disabled />
              </Box>
            </Stack>
            <Divider sx={{ my: 3 }} />
          </Grid>
        )) ||
        (currentTab === 'zamin' && (
          <Grid spacing={3}>
            <Grid xs={12}>
              <Stack>
                <Typography
                  sx={{
                    my: 3,
                    fontSize: 20,
                    lineHeight: 1.5,
                    fontWeight: 700,
                  }}
                >
                  Zamin barəsində məlumatlar
                </Typography>
                <Divider sx={{ mb: 3 }} />
                {zaminData.map((zamin) => (
                  <Box
                    key={zamin.id}
                    display="grid"
                    rowGap={3}
                    columnGap={2}
                    gridTemplateColumns={{ xs: '128px 1fr', sm: '128px 1fr' }}
                  >
                    <Field.UploadAvatar
                      name="avatarUrl"
                      maxSize={3145728}
                      sx={{
                        height: '128px',
                        width: '128px',
                      }}
                      disabled
                    />
                    <Box
                      display="grid"
                      rowGap={3}
                      columnGap={2}
                      gridTemplateColumns={{ xs: 'repeat(2, 1fr)' }}
                    >
                      <Field.Text
                        name={`zaminName_${zamin.id}`}
                        label="Adı"
                        defaultValue={zamin.name}
                        disabled
                      />
                      <Field.Text
                        name={`zaminFin_${zamin.id}`}
                        disabled
                        label="Fin"
                        defaultValue={zamin.fin}
                      />
                      <Field.Text
                        name={`zaminSerialNumber_${zamin.id}`}
                        label="Ş/V seriyası və nömrəsi"
                        disabled
                        defaultValue={zamin.serialNumber}
                      />
                      <Field.Text
                        name={`zaminPassportStatus_${zamin.id}`}
                        disabled
                        label="Vəsiqənin statusu"
                        defaultValue={zamin.passportStatus}
                      />
                      <Field.Text
                        disabled
                        name={`zaminIdentityCard_${zamin.id}`}
                        label="Şəxsiyyət vəsiqəsi"
                        defaultValue={zamin.identityCard}
                      />
                      <Field.Text
                        name={`zaminIssuedBy_${zamin.id}`}
                        disabled
                        label="Kim tərəfindən verilib"
                        defaultValue={zamin.issuedBy}
                      />
                      <Field.Text
                        name={`zaminFullName_${zamin.id}`}
                        disabled
                        label="Ad, Soy ad, Atasının adı"
                        defaultValue={zamin.fullName}
                      />
                      <Field.Text
                        name={`zaminBorrowerInfo_${zamin.id}`}
                        disabled
                        label="Borcalan Haqında"
                        defaultValue={zamin.borrowerInfo}
                      />
                      <Field.Text
                        name={`zaminRegistrationAddress_${zamin.id}`}
                        disabled
                        label="Qeydiyyat ünvanı"
                        defaultValue={zamin.registrationAddress}
                      />
                      <Field.Text
                        name={`zaminResidentialAddress_${zamin.id}`}
                        disabled
                        label="Yaşadığı ünvanı"
                        defaultValue={zamin.residentialAddress}
                      />
                      <Field.Text
                        name={`zaminPhones_${zamin.id}`}
                        disabled
                        label="Telefonlar"
                        defaultValue={zamin.phones}
                      />
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>
        )) ||
        (currentTab === 'occupancy' && (
          <Grid spacing={3}>
            <Stack>
              <Typography
                sx={{
                  my: 3,
                  fontSize: 20,
                  lineHeight: 1.5,
                  fontWeight: 700,
                }}
              >
                Daşınmaz əmlak
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Box
                display="grid"
                rowGap={3}
                columnGap={2}
                gridTemplateColumns={{ xs: 'repeat(2, 1fr)' }}
              >
                <Field.Text name="propertyType" label="Tipi" disabled />
                <Field.Text name="registrationNumber" label="Qeyd No." disabled />
                <Field.Text name="occupancyAddress" label="Ünvan" disabled />
                <Field.Text name="ownershipStatus" label="Mülkiyyət statusu" disabled />
                <Field.Text name="numberOfRooms" label="Otaqların sayı" disabled />
                <Field.Text name="area" label="Sahə (m²)" disabled />
                <Field.Text name="constructionYear" label="Tikinti ili" disabled />
                <Field.Text name="marketValue" label="Bazar dəyəri" disabled />
                <Field.Text name="mortgageStatus" label="İpoteka statusu" disabled />
                <Field.Text name="monthlyRent" label="Aylıq kirayə" disabled />
              </Box>
            </Stack>
          </Grid>
        )) ||
        (currentTab === 'vehicle' && (
          <Grid spacing={3}>
            <Typography
              sx={{
                my: 3,
                fontSize: 20,
                lineHeight: 1.5,
                fontWeight: 700,
              }}
            >
              Nəqliyyat vasitələri
            </Typography>
            <Divider sx={{ mb: 3 }} />
            {vehicleData.map((vehicle) => (
              <Box
                key={vehicle.id}
                display="grid"
                rowGap={3}
                columnGap={2}
                gridTemplateColumns={{ xs: 'repeat(2, 1fr)' }}
              >
                <Field.Text
                  disabled
                  name={`vehicleBrand_${vehicle.id}`}
                  label="Marka"
                  defaultValue={vehicle.title}
                />
                <Field.Text
                  disabled
                  name={`vehicleNumber_${vehicle.id}`}
                  label="Qeydiyyat nömrə nişanı"
                  defaultValue={vehicle.licensePlate}
                />
                <Field.Text
                  disabled
                  name={`vehicleYear_${vehicle.id}`}
                  label="İl"
                  defaultValue={vehicle.year}
                />
                <Field.Text
                  disabled
                  name={`vehicleModel_${vehicle.id}`}
                  label="Model"
                  defaultValue={vehicle.model}
                />
                <Field.Text
                  disabled
                  name={`vehicleVin_${vehicle.id}`}
                  label="VIN"
                  defaultValue={vehicle.vin}
                />
              </Box>
            ))}
          </Grid>
        )) ||
        (currentTab === 'familyMembers' && (
          <Box sx={{ mt: 3 }}>
            {familyData.map((member) => (
              <Grid container spacing={3} key={member.id}>
                <Box sx={{ mr: 2 }}>
                  <Typography
                    sx={{
                      my: 3,
                      fontSize: 20,
                      lineHeight: 1.5,
                      fontWeight: 700,
                    }}
                  >
                    {member.title}
                  </Typography>

                  <Field.UploadAvatar
                    name={`avatarUrl_${member.id}`}
                    maxSize={3145728}
                    value={member.fields.avatarUrl}
                    sx={{
                      height: '128px',
                      width: '128px',
                    }}
                    disabled
                  />
                </Box>
                <Grid xs={12} md={8}>
                  <Card sx={{ p: 3 }}>
                    <Box
                      rowGap={3}
                      columnGap={2}
                      display="grid"
                      gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' }}
                    >
                      <Box
                        display="grid"
                        rowGap={3}
                        columnGap={2}
                        gridTemplateColumns={{ xs: 'repeat(3, 1fr)' }}
                      >
                        <Field.Text
                          name={`fin_${member.id}`}
                          label="Fin"
                          value={member.fields.fin}
                          disabled
                        />
                        <Field.Text
                          name={`serialNumber_${member.id}`}
                          label="Ş/V seriyası və nömrəsi"
                          value={member.fields.serialNumber}
                          disabled
                        />
                        <Field.Text
                          name={`passportStatus_${member.id}`}
                          label="Vəsiqənin statusu"
                          value={member.fields.passportStatus}
                          disabled
                        />
                      </Box>
                      <Box
                        display="grid"
                        rowGap={3}
                        columnGap={2}
                        gridTemplateColumns={{ xs: 'repeat(2, 1fr)' }}
                      >
                        <Field.Text
                          name={`name_${member.id}`}
                          label="Adı"
                          value={member.fields.name}
                          disabled
                        />
                        <Field.Text
                          name={`surname_${member.id}`}
                          label="Soyadı"
                          value={member.fields.surname}
                          disabled
                        />
                        <Field.Text
                          name={`fatherName_${member.id}`}
                          label="Ata adı"
                          value={member.fields.fatherName}
                          disabled
                        />
                        <Field.Text
                          name={`born_${member.id}`}
                          label="Doğum tarixi(xx.xx.xxxx)"
                          value={member.fields.born}
                          disabled
                        />
                        <Field.Select
                          native
                          name={`familyRelationship_${member.id}`}
                          label="Ailə vəziyyəti"
                          value={member.fields.familyRelationship}
                          InputLabelProps={{ shrink: true }}
                          disabled
                        >
                          {_familyRelationshipOptions.map((option) => (
                            <option disabled key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Field.Select>
                        <Field.Select
                          disabled
                          native
                          name={`gender_${member.id}`}
                          label="Cinsi"
                          value={member.fields.gender}
                          InputLabelProps={{ shrink: true }}
                        >
                          {PRODUCT_GENDER_OPTIONS.map((option) => (
                            <option disabled key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Field.Select>
                      </Box>
                      <Field.Text
                        disabled
                        name={`address_${member.id}`}
                        label="Qeydiyyatda olduğu ünvan"
                        value={member.fields.address}
                      />
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            ))}
          </Box>
        )) ||
        (currentTab === 'credits' && (
          <Grid spacing={3}>
            <Stack>
              <Typography
                sx={{
                  my: 3,
                  fontSize: 20,
                  lineHeight: 1.5,
                  fontWeight: 700,
                }}
              >
                Nağd pul krediti
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Box
                display="grid"
                rowGap={3}
                columnGap={2}
                gridTemplateColumns={{ xs: 'repeat(2  , 1fr)' }}
              >
                <Field.Text name="loanTotal" label="Kreditin məbləği" type="number" />
                <Field.Text name="loanPercentagePerYear" label="İllik dərəcəsi(%)" type="number" />
                <Box
                  sx={{
                    gridArea: '2 / 1 / 3 / 3',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                    }}
                  >
                    Kreditin müddəti(aylarla)
                  </Typography>
                  <Slider
                    name="monthsToPay"
                    defaultValue={30}
                    aria-labelledby="discrete-slider"
                    step={1}
                    min={1}
                    max={84}
                    valueLabelDisplay="on"
                    color="info"
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography sx={{ fontSize: 14 }}>12 ay</Typography>
                    <Typography sx={{ fontSize: 14 }}>84 ay</Typography>
                  </Box>
                </Box>
                <Field.Text name="payPerMonth" label="Aylıq ödəniş" type="number" />
                <Field.Text name="totalCredit" label="Cəmi ödəniləcək məbləğ" type="number" />
                <Field.Text name="totalPercetange" label="Cəmi faiz" type="number" />
              </Box>
              <Typography mt={4}>
                Komissiyaya qərar üçün göndər{' '}
                <Switch color="info" defaultChecked name="comissionDecide" />
              </Typography>
            </Stack>
          </Grid>
        ))}
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          onClick={() => {
            console.log('Submitted Data:', methods.getValues());
          }}
        >
          Submit
        </Button>
      </Stack>
    </Form>
  );
}
