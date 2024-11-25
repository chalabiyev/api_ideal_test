import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
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

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { PRODUCT_GENDER_OPTIONS } from 'src/_mock';

import { toast } from 'src/components/snackbar';
import SearchIconSVG from 'src/components/searchIcon';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import ScoreCard from './scoreBoard';
import {
  familyRelationshipOptions,
  whereToGetSignatureOptions,
} from '../_examples/extra/form-validation-view/react-hook-form';

// ----------------------------------------------------------------------
export type ValuesType = {
  [year: string]: {
    [month: string]: number;
  };
};

export type NewUserSchemaType = zod.infer<typeof NewUserSchema>;

export const NewUserSchema = zod.object({
  fin: zod.string().min(1, { message: 'Fin is required!' }),
  serialNumber: zod.string().min(1, { message: 'Ş/V seriyası və nömrəsi is required!' }),
  passportStatus: zod.string().min(1, { message: 'Vəsiqənin statusu is required!' }),
  name: zod.string().min(1, { message: 'Name is required!' }),
  surname: zod.string().min(1, { message: 'Surname is required!' }),
  fatherName: zod.string().min(1, { message: 'Father name is required!' }),
  born: zod.string().min(1, { message: 'Born is required!' }),
  familyRelationship: zod.string().min(1, { message: 'Family relationship is required!' }),
  gender: zod.string().min(1, { message: 'Gender is required!' }),
  state: zod.string().min(1, { message: 'State is required!' }),
  city: zod.string().min(1, { message: 'City is required!' }),
  zipCode: zod.string().min(1, { message: 'Zip code is required!' }),
  role: zod.string().min(1, { message: 'Role is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  phoneNumber: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  country: zod.string().min(1, { message: 'Country is required!' }),
  status: zod.string().optional(),
  whereToGetSignature: zod.string().min(1, { message: 'Where to get signature is required!' }),
  reportNum: zod.string().min(1, { message: 'Report is required!' }),
  dateMade: zod.string().min(1, { message: 'Date made is required!' }),
  historyMadeDate: zod.string().min(1, { message: 'History made date is required!' }),
  loanerId: zod.string().min(1, { message: 'Loaner ID is required!' }),
  loanerScore: zod.number().min(1, { message: 'Loaner score is required!' }),
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
const creditData = [
  0,
  '-',
  0,
  30,
  90,
  180,
  0,
  361,
  0,
  '-',
  180,
  30,
  0,
  30,
  0,
  '-',
  90,
  361,
  0,
  30,
  '-',
  180,
  90,
  0,
];
const familyData = [
  {
    id: '1',
    title: 'Ata',
    fields: {
      avatarUrl:
        'https://images.pexels.com/photos/17455462/pexels-photo-17455462/free-photo-of-train-at-railway-station.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      fin: '123456789',
      serialNumber: '132456789',
      passportStatus: 'Active',
      name: 'TestFather',
      surname: 'TestFather',
      fatherName: 'TestFather',
      born: '11.10.2001',
      familyRelationship: 'Married',
      gender: 'Men',
      address: 'Baki azerbaycan',
    },
  },
  {
    id: '2',
    title: 'Ana',
    fields: {
      avatarUrl:
        'https://images.pexels.com/photos/17455462/pexels-photo-17455462/free-photo-of-train-at-railway-station.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      fin: '123456789',
      serialNumber: '132456789',
      passportStatus: 'Active',
      name: 'TestFather',
      surname: 'TestFather',
      fatherName: 'TestFather',
      born: '11.10.2001',
      familyRelationship: 'Married',
      gender: 'Women',
      address: 'Baki azerbaycan',
    },
  },
];

const combinedHeaders = [
  { label: '04/2024' },
  { label: '03/2024' },
  { label: '02/2024' },
  { label: '01/2024' },
  { label: '12/2023' },
  { label: '11/2023' },
  { label: '10/2023' },
  { label: '09/2023' },
  { label: '08/2023' },
  { label: '07/2023' },
  { label: '06/2023' },
  { label: '05/2023' },
  { label: '04/2023' },
  { label: '03/2023' },
  { label: '02/2023' },
  { label: '01/2023' },
  { label: '12/2022' },
  { label: '11/2022' },
  { label: '10/2022' },
  { label: '09/2022' },
  { label: '08/2022' },
  { label: '07/2022' },
  { label: '06/2022' },
  { label: '05/2022' },
];
const _customerRole = [
  { value: 'customer', label: 'Müştəri' },
  { value: 'guarantor', label: 'Zamin' },
  { value: 'employee', label: 'Əməkdaş' },
];

export function CreateCreditForm() {
  const [currentTab, setCurrentTab] = useState('akb2');

  const sorguTarixcesi = [
    {
      bankName: 'Bank 1',
      date: '2023-12-12',
      purpose: 'Kredit Müraciəti',
    },
    {
      bankName: 'Bank 2',
      date: '2022-11-02',
      purpose: 'Kredit Müraciəti',
    },
  ];

  const loanData = {
    dataProvider: 'XXX',
    KIN: 'ZZ42VZ3A0M',
    accountNumber: '*****',
    totalAmount: 47521.55,
    monthlyPayment: 386,
    lastPaymentDate: '05.03.2018',
    loanPurpose: 'Fiziki şəxslərə ipoteka kreditləri',
    overdueDaysMainDebt: 0,
    interestAmount: 170.99,
    issuanceDate: '14.01.2014',
    initialContractEndDate: '31.12.2039',
    lastContractEndDate: '31.12.2039',
    overdueDaysInterest: 0,
    collateralType: 'Daşınmaz əmlak',
    collateralValue: 90000,
    collateralDescription: 'Bakı şəhəri / Nəsimi rayonunda iki otaqlı mənzil',
    registrationAuthority: 'DƏDYDR xidməti',
    registrationDate: '14.01.2014',
  };

  const oldLoanData = {
    totalAmount: '1 500 AZN',
    KIN: 'ZZ42VZ3A0M',
    dataProvider: 'XXX',
    accountNumber: '*****',
    monthlyPayment: 386,
    lastPaymentDate: '05.03.2012',
    loanPurpose: 'Fiziki şəxslərə istehlak kreditləri',
    overdueDaysMainDebt: 0,
    issuanceDate: '14.01.2014',
    initialContractEndDate: '31.12.2034',
    lastContractEndDate: '31.12.2034',
    overdueDaysInterest: 0,
  };

  const guarantorLoanData = {
    totalAmount: '2 500 AZN',
    KIN: 'ZZ42VZ3A0M',
    dataProvider: 'XXX',
    accountNumber: '*****',
    monthlyPayment: 386,
    lastPaymentDate: '05.03.2012',
    loanPurpose: 'Fiziki şəxslərə istehlak kreditləri',
    overdueDaysMainDebt: 0,
    issuanceDate: '14.01.2014',
    initialContractEndDate: '31.12.2034',
    lastContractEndDate: '31.12.2034',
    overdueDaysInterest: 0,
  };

  const vehicleData = [
    { id: '1', title: 'Audi', year: '2021', model: 'A6', vin: '123456789', licensePlate: 'AA1234' },
  ];

  const paymentHistory = [
    {
      title: 'Aktiv kreditlərin cəmi qalıq məbləği',
      amount: '1 894.07',
      creditCount: '2',
      creditCompanyCount: '2',
    },
    {
      title: 'Kreditlər üzrə qalıq məbləğ',
      amount: '632',
      creditCount: '0',
      creditCompanyCount: '2',
    },
    {
      title: ' Kredit xətləri üzrə qalıq məbləğ',
      amount: '1 894.07',
      creditCount: '2',
      creditCompanyCount: '2',
    },
    {
      title: 'Qarantiya üzrə qalıq məbləğ',
      amount: '1 894.07',
      creditCount: '2',
      creditCompanyCount: '2',
    },
    {
      title: 'Cəmi aylıq ödəniş məbləği',
      amount: '1 894.07',
      creditCount: '2',
      creditCompanyCount: '2',
    },
    {
      title: 'Tam ödənilmiş kreditlərin cəmi məbləği',
      amount: '1 894.07',
      creditCount: '2',
      creditCompanyCount: '2',
    },
    {
      title: 'Zamin olduğu öhdəliyin məbləği',
      amount: '1 894.07',
      creditCount: '2',
      creditCompanyCount: '2',
    },
  ];

  const tabledata = {
    2024: ['01', '02', '03', '04', '05', '06', '07', '08'],
    2023: ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01'],
    2022: ['12', '11'],
  };
  const values: ValuesType = {
    2024: { '01': 10, '02': 20, '03': 30, '04': 40, '05': 50, '06': 60, '07': 70, '08': 80 },
    2023: {
      '12': 90,
      '11': 100,
      '10': 110,
      '09': 120,
      '08': 130,
      '07': 140,
      '06': 150,
      '05': 160,
      '04': 170,
      '03': 180,
      '02': 190,
      '01': 200,
    },
    2022: { '12': 210, '11': 220 },
  };
  const router = useRouter();

  const methods = useForm<NewUserSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(NewUserSchema),
    defaultValues: {
      fin: 'fin',
      serialNumber: 'serialnumber',
      passportStatus: '',
      name: 'testName',
      surname: 'testSurname',
      fatherName: 'testFatherName',
      born: '11.10.2001',
      reportNum: 'testreport',
      familyRelationship: '',
      whereToGetSignature: '',
      dateMade: '11 oktyabr 2001',
      historyMadeDate: '11 oktyabr 2002',
      loanerId: 'AZE000000',
      loanerScore: 400,
    },
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const selectedOption = watch('whereToGetSignature');

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success('Create success!');
      router.push(paths.dashboard.user.list);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleTabChange = (event: any, newValue: string) => {
    setCurrentTab(newValue);
  };

  const loanerScore = Number(watch('loanerScore'));
  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Tabs value={currentTab} onChange={handleTabChange}>
        <Tab value="akb2" label="AKB 2" />
        <Tab value="s/v" label="Ş/V" />
        <Tab value="akb" label="AKB" />
        <Tab value="workplace" label="İş yeri" />
        <Tab value="occupancy" label="Əmlakları" />
        <Tab value="vehicle" label="Nəqliyyat vasitələri" />
        <Tab value="familyMembers" label="Ailə üzvləri" />
        <Tab value="credits" label="Kreditlər" />
      </Tabs>
      {(currentTab === 'akb2' && (
        <Grid container gap="55px" mt={3}>
          <Box
            sx={{
              display: 'grid',
              rowGap: 3,
              columnGap: 2,
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
            }}
          >
            <Field.Text name="name" label="Ad" />
            <Field.Text name="surname" label="Soyad" />
            <Field.Text name="fatherName" label="Ata adı" />
          </Box>
          <Box
            sx={{
              display: 'grid',
              rowGap: 3,
              columnGap: 2,
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
            }}
          >
            <Field.Text name="reportNum" label="Hesabat" />
            <Field.Text name="dateMade" label="Tərtib olunma tarixi:" />
            <Field.Text name="dateMade" label="Borcalan haqqında tarixçənin açıldığı tarix" />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'column',
              gap: 5,
            }}
          >
            <Typography>1. Borcalanın şəxsi məlumatları</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 5,
              }}
            >
              <Box
                sx={{
                  width: '45%',
                }}
              >
                <Field.Text sx={{ marginBottom: 2 }} name="loanerId" label="Borcalanın İD-si:" />
                <Field.Text sx={{ marginBottom: 2 }} name="loanerAdd" label="Ünvanı:" />
                <Field.Text sx={{ marginBottom: 2 }} name="loanerBornAdd" label="Doğum yeri:" />
                <Field.Text sx={{ marginBottom: 2 }} name="loanerBornDate" label="Doğum tarixi:" />
              </Box>
              <Box
                sx={{
                  width: '45%',
                }}
              >
                <ScoreCard score={loanerScore} />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'column',
              gap: 5,
              width: '100%',
            }}
          >
            <Typography>2. Kredit məlumatlarının icmalı (manatla)</Typography>
            <TableContainer my={4} component={Box}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>N</TableCell>
                    <TableCell> </TableCell>
                    <TableCell>Məbləğ</TableCell>
                    <TableCell>Kreditlərin sayı</TableCell>
                    <TableCell>Kr.təşkilatlarının sayı</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paymentHistory.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 700,
                        }}
                      >
                        {payment.title}
                      </TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.creditCount}</TableCell>
                      <TableCell>{payment.creditCompanyCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'column',
              gap: 5,
              width: '100%',
            }}
          >
            <Typography>2.1 Borcalanın sorğu tarixçəsi</Typography>
            <TableContainer my={4} component={Box}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>N</TableCell>
                    <TableCell>Bankın adı</TableCell>
                    <TableCell>Tarix</TableCell>
                    <TableCell>Məqsəd</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sorguTarixcesi.map((sorgu, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{sorgu.bankName}</TableCell>
                      <TableCell>{sorgu.date}</TableCell>
                      <TableCell>{sorgu.purpose}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'column',
              gap: 5,
              width: '100%',
            }}
          >
            <Typography>3. Borcalanın aktiv öhdəlikləri</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Typography>3.1 Kredit - {loanData.totalAmount}</Typography>
              <Typography>KIN: {loanData.KIN}</Typography>
            </Box>
            <TableContainer component={Box} my={4}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2">Məlumat təchizatçısı:</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{loanData.dataProvider}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">Hesab nömrəsi:</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{loanData.accountNumber}</Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={2} sx={{ backgroundColor: '#E3F2FD' }}>
                      <Typography variant="h5">Qalıq məbləği</Typography>
                      <Typography variant="h4">{loanData.totalAmount.toFixed(2)}</Typography>
                    </TableCell>
                    <TableCell colSpan={3} sx={{ backgroundColor: '#E3F2FD' }}>
                      <Typography variant="h5">Faiz məbləği</Typography>
                      <Typography variant="h4">{loanData.interestAmount.toFixed(2)}</Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Aylıq ödəniş məbləği</TableCell>
                    <TableCell>{loanData.monthlyPayment}</TableCell>
                    <TableCell>Verilmə tarixi</TableCell>
                    <TableCell>{loanData.issuanceDate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sonuncu ödəniş tarixi</TableCell>
                    <TableCell>{loanData.lastPaymentDate}</TableCell>
                    <TableCell>İlkin müqavilə ilə bitmə tarixi</TableCell>
                    <TableCell>{loanData.initialContractEndDate}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Məqsədi</TableCell>
                    <TableCell>{loanData.loanPurpose}</TableCell>
                    <TableCell>Son müqavilə ilə bitmə tarixi</TableCell>
                    <TableCell>{loanData.lastContractEndDate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Əsas borcun gecikdirildiyi gün sayı</TableCell>
                    <TableCell>{loanData.overdueDaysMainDebt}</TableCell>
                    <TableCell>Faizlərin gecikdirildiyi gün sayı</TableCell>
                    <TableCell>{loanData.overdueDaysInterest}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={4} sx={{ backgroundColor: '#E3F2FD' }}>
                      <Typography variant="h6" align="right">
                        Təminat
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Növü</TableCell>
                    <TableCell>{loanData.collateralType}</TableCell>
                    <TableCell>Dəyəri (manatla)</TableCell>
                    <TableCell>{loanData.collateralValue}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Predmeti və təsviri:</TableCell>
                    <TableCell colSpan={4}>{loanData.collateralDescription}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Qeydiyyata almış orqan</TableCell>
                    <TableCell colSpan={3}>{loanData.registrationAuthority}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4} align="right">
                      Tarixi: {loanData.registrationDate}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer component={Box} my={4}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{ backgroundColor: '#0070C0', color: 'white', padding: '8px' }}
                    >
                      <Typography variant="body2">Tarixçə</Typography>
                    </TableCell>
                    {combinedHeaders.reverse().map((header, index) => (
                      <TableCell
                        key={index}
                        align="center"
                        sx={{ backgroundColor: '#1F4E79', color: 'white', padding: '8px' }}
                      >
                        <Typography variant="body2">{header.label}</Typography>
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* Data Row */}
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        backgroundColor: '#0070C0',
                        color: 'white',
                        border: '1px solid black',
                        padding: '8px',
                      }}
                    >
                      <Typography variant="body2">Ödəniş Tarixçəsi</Typography>
                    </TableCell>
                    {creditData.map((daysLate, index) => (
                      <TableCell
                        key={index}
                        align="center"
                        sx={{
                          backgroundColor: getBackgroundColor(daysLate),
                          color: daysLate === '-' ? 'black' : 'white',
                          border: '1px solid black',
                          padding: '8px',
                          height: '50px',
                          width: '50px',
                        }}
                      >
                        <Typography variant="body2">{daysLate}</Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography>4. Borcalanın bağlanmış öhdəlikləri</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Typography>4.1 Kredit - {oldLoanData.totalAmount}</Typography>
              <Typography>KIN: {oldLoanData.KIN}</Typography>
            </Box>
            <TableContainer component={Box} my={4}>
              <Table>
                <TableBody>
                  <TableRow
                    sx={{
                      backgroundColor: '#e3f2fd',
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2">Məlumat təchizatçısı:</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{oldLoanData.dataProvider}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">Hesab nömrəsi:</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{oldLoanData.accountNumber}</Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Aylıq ödəniş məbləği</TableCell>
                    <TableCell>{oldLoanData.monthlyPayment}</TableCell>
                    <TableCell>Verilmə tarixi</TableCell>
                    <TableCell>{oldLoanData.issuanceDate}</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      backgroundColor: '#e3f2fd',
                    }}
                  >
                    <TableCell>Sonuncu ödəniş tarixi</TableCell>
                    <TableCell>{oldLoanData.lastPaymentDate}</TableCell>
                    <TableCell>İlkin müqavilə ilə bitmə tarixi</TableCell>
                    <TableCell>{oldLoanData.initialContractEndDate}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Məqsədi</TableCell>
                    <TableCell>{oldLoanData.loanPurpose}</TableCell>
                    <TableCell>Son müqavilə ilə bitmə tarixi</TableCell>
                    <TableCell>{oldLoanData.lastContractEndDate}</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      backgroundColor: '#e3f2fd',
                    }}
                  >
                    <TableCell>Əsas borcun gecikdirildiyi gün sayı</TableCell>
                    <TableCell>{oldLoanData.overdueDaysMainDebt}</TableCell>
                    <TableCell>Faizlərin gecikdirildiyi gün sayı</TableCell>
                    <TableCell>{oldLoanData.overdueDaysInterest}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography>5. Borcalanın zamin olduğu öhdəlikləri</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Typography>5.1 Kredit Xətti - {guarantorLoanData.totalAmount}</Typography>
              <Typography>KIN: {guarantorLoanData.KIN}</Typography>
            </Box>
            <TableContainer component={Box} my={4}>
              <Table>
                <TableBody>
                  <TableRow
                    sx={{
                      backgroundColor: '#e3f2fd',
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2">Məlumat təchizatçısı:</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{guarantorLoanData.dataProvider}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">Hesab nömrəsi:</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{guarantorLoanData.accountNumber}</Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Aylıq ödəniş məbləği</TableCell>
                    <TableCell>{guarantorLoanData.monthlyPayment}</TableCell>
                    <TableCell>Verilmə tarixi</TableCell>
                    <TableCell>{guarantorLoanData.issuanceDate}</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      backgroundColor: '#e3f2fd',
                    }}
                  >
                    <TableCell>Sonuncu ödəniş tarixi</TableCell>
                    <TableCell>{guarantorLoanData.lastPaymentDate}</TableCell>
                    <TableCell>İlkin müqavilə ilə bitmə tarixi</TableCell>
                    <TableCell>{guarantorLoanData.initialContractEndDate}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Məqsədi</TableCell>
                    <TableCell>{guarantorLoanData.loanPurpose}</TableCell>
                    <TableCell>Son müqavilə ilə bitmə tarixi</TableCell>
                    <TableCell>{guarantorLoanData.lastContractEndDate}</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      backgroundColor: '#e3f2fd',
                    }}
                  >
                    <TableCell>Əsas borcun gecikdirildiyi gün sayı</TableCell>
                    <TableCell>{guarantorLoanData.overdueDaysMainDebt}</TableCell>
                    <TableCell>Faizlərin gecikdirildiyi gün sayı</TableCell>
                    <TableCell>{guarantorLoanData.overdueDaysInterest}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <div
            style={{
              width: '100%',
              borderBottom: '1px solid blue',
              borderTop: '1px solid blue',
              padding: '10px 0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '10px 0',
              color: 'blue',
            }}
          >
            <span>Hesabatın sonu</span>
          </div>
        </Grid>
      )) ||
        (currentTab === 's/v' && (
          <Grid container gap="55px" mt={3}>
            <Box>
              <Field.UploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                sx={{
                  height: '128px',
                  width: '128px',
                }}
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
                    gridTemplateColumns={{ xs: 'repeat(3  , 1fr)' }}
                  >
                    <Field.Text
                      variant="outlined"
                      required
                      name="fin"
                      fullWidth
                      label="Fin"
                      id="fin"
                      autoFocus
                      InputProps={{
                        endAdornment: <SearchIconSVG />,
                      }}
                    />

                    <Field.Text name="serialNumber" label="Ş/V seriyası və nömrəsi" />
                    <Field.Text name="passportStatus" label="Vəsiqənin statusu" />
                  </Box>

                  <Box
                    display="grid"
                    rowGap={3}
                    columnGap={2}
                    gridTemplateColumns={{ xs: 'repeat(2  , 1fr)' }}
                  >
                    <Field.Text name="name" label="Adı" />
                    <Field.Text name="surname" label="Soyadı" />
                    <Field.Text name="fatherName" label="Ata adı" />
                    <Field.Text name="born" label="Doğum tarixi(xx.xx.xxxx)" />
                    <Field.Text name="state" label="Şəhər" />
                    <Field.Text name="city" label="Rayon" />
                    <Field.Text name="role" label="Vəzifə" />
                    <Field.Select
                      native
                      name="familyRelationship"
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
                      name="familyRelationship"
                      label="Ailə vəziyyəti"
                      InputLabelProps={{ shrink: true }}
                    >
                      {familyRelationshipOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field.Select>
                    <Field.Select
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
                  <Field.Text name="address" label="Qeydiyyatda olduğu ünvan" />
                  <Field.Text name="phoneNumber" label="Telefon nömrəsi" />
                  <Box
                    display="grid"
                    rowGap={3}
                    columnGap={2}
                    gridTemplateColumns={{ xs: 'repeat(2  , 1fr)' }}
                  >
                    <Field.Select
                      native
                      name="whereToGetSignature"
                      label="Müqavilənin əldə ediləcəyi vasitələr"
                      InputLabelProps={{ shrink: true }}
                    >
                      {whereToGetSignatureOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field.Select>

                    {selectedOption === 'tg' && (
                      <Field.Text name="telegramUsername" label="Telegram Username" />
                    )}

                    {selectedOption === 'wp' && (
                      <Field.Text name="whatsappNumber" label="WhatsApp Number" />
                    )}

                    {selectedOption === 'em' && <Field.Text name="email" label="Email" />}
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        )) ||
        (currentTab === 'akb' && (
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
                Kredit tarixçəsi haqqında ümumi məlumat
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Box
                display="grid"
                rowGap={3}
                columnGap={2}
                gridTemplateColumns={{ xs: 'repeat(2  , 1fr)' }}
              >
                <Field.Text name="total" label="Аktiv kreditlər üzrə ümumi borc" />

                <Field.Text name="subDescription" label="Sayı" />

                <Field.Text
                  name="totalZamin"
                  label="Müştərinin zamin kimi çıxış etdiyi kreditlər üzrə borcun ümumi məbləği"
                />

                <Field.Text name="countZamin" label="Sayı" />

                <Field.Text
                  name="name"
                  label="Son 24 ayda ödənilmiş kreditlər üzrə borcun ümumi məbləği"
                />

                <Field.Text name="countTotal24" label="Sayı" />

                <Field.Text
                  name="before24Months"
                  label="Son 24 aydan əvvəl ödənilmiş borcun ümumi məbləği"
                />

                <Field.Text name="countBefore24" label="Sayı" />
              </Box>
            </Stack>
            <Divider sx={{ my: 3 }} />

            <Stack>
              <Typography
                sx={{
                  my: 3,
                  fontSize: 20,
                  lineHeight: 1.5,
                  fontWeight: 700,
                }}
              >
                Ödənişlər haqqında məlumat{' '}
              </Typography>
              <Typography
                sx={{
                  my: 3,
                  fontSize: 20,
                  lineHeight: 1.5,
                  fontWeight: 700,
                }}
              >
                Aktiv kreditlər üzrə ödənişlərin ümumi məbləği{' '}
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Stack
                display="grid"
                rowGap={3}
                columnGap={2}
                gridTemplateColumns={{ xs: 'repeat(2  , 1fr)' }}
              >
                <Field.Text name="ActiveDueToAKB" label="AKB məlumatlarına əsasən" />

                <Field.Text name="ActiveDueToRisk" label="Daxili risk sistemi üzrə" />
              </Stack>
              <Typography
                sx={{
                  my: 3,
                  fontSize: 20,
                  lineHeight: 1.5,
                  fontWeight: 700,
                }}
              >
                Müştərinin zamin kimi çıxış etdiyi kreditlər üzrə ödənişlərin ümumi məbləği{' '}
              </Typography>
              <Box
                display="grid"
                rowGap={3}
                columnGap={2}
                gridTemplateColumns={{ xs: 'repeat(2  , 1fr)' }}
              >
                <Field.Text name="ZaminDueToAKB" label="AKB məlumatlarına əsasən" />

                <Field.Text name="ZaminDueToRisk" label="Daxili risk sistemi üzrə" />
              </Box>
              <Typography
                sx={{
                  my: 3,
                  fontSize: 20,
                  lineHeight: 1.5,
                  fontWeight: 700,
                }}
              >
                Toplam ödənişin yekun məbləği{' '}
              </Typography>
              <Box
                display="grid"
                rowGap={3}
                columnGap={2}
                gridTemplateColumns={{ xs: 'repeat(2  , 1fr)' }}
              >
                <Field.Text name="totalPrice" label="AKB məlumatlarına əsasən" />

                <Field.Text name="subDescription" label="Daxili risk sistemi üzrə" />
              </Box>
            </Stack>
            <Divider sx={{ my: 3 }} />

            <Stack>
              <Typography
                sx={{
                  my: 3,
                  fontSize: 20,
                  lineHeight: 1.5,
                  fontWeight: 700,
                }}
              >
                Borcalanın cari öhdəlikləri{' '}
              </Typography>
              <Box
                display="grid"
                rowGap={3}
                columnGap={2}
                gridTemplateColumns={{ xs: 'repeat(2  , 1fr)' }}
              >
                <Typography
                  sx={{
                    my: 3,
                    fontSize: 22,
                    lineHeight: 1.5,
                    fontWeight: 700,
                  }}
                >
                  Borc: 400&#x20BC;
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                    gap: 2,
                  }}
                >
                  <Typography
                    sx={{
                      my: 3,
                      fontSize: 20,
                      lineHeight: 1.5,
                      fontWeight: 600,
                    }}
                  >
                    Yenidən maliyyələşdirmə üçün uyğundur
                  </Typography>
                  <Switch defaultChecked />
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Stack
                display="grid"
                rowGap={3}
                columnGap={2}
                gridTemplateColumns={{ xs: 'repeat(2  , 1fr)' }}
              >
                <Field.Text name="informationProvider" label="Informasiya provideri" />

                <Field.Text name="creditBalanceAmount" label="Kredit balansının məbləği" />

                <Field.Text name="monthlyPaymentAmount" label="Aylıq ödəniş məbləği" />

                <Field.Text name="lastPaymentDate" label="Son ödəniş tarixi" />

                <Field.Text name="aim" label="Məqsəd" />

                <Field.Text
                  name="mainDebtOverdueDays"
                  label="Əsas borc üzrə vaxtı keçmiş günlərin sayı"
                />

                <Field.Text name="AccountNumber" label="Hesab nömrəsi" />

                <Field.Text name="percentAmount" label="Faiz məbləği" />
                <Field.Text name="percentDegree" label="Faiz dərəcəsi" />
                <Field.Text name="creditGivenDate" label="Kreditin verilmə tarixi" />
                <Field.Text name="creditEndDate" label="Kreditin bitmə tarixi" />
                <Field.Text
                  name="interestOverdueDays"
                  label="Faizli borc üzrə vaxtı keçmiş günlərin sayı"
                />
                <Field.Text
                  name="monthlyPaymentAmountDueToRisk"
                  label="Daxili risk sistemlərinin hesablanmasına uyğun olaraq aylıq ödəniş"
                />
              </Stack>
              <Typography
                sx={{
                  my: 3,
                  fontSize: 22,
                  lineHeight: 1.5,
                  fontWeight: 700,
                }}
              >
                Borcalanın cari ödənişləri
              </Typography>

              <TableContainer
                sx={{
                  border: '1px solid black',
                }}
              >
                <Table
                  sx={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}
                  aria-label="simple table"
                >
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: 'white' }}> </TableCell>
                      {Object.entries(tabledata).map(([year, months]) => (
                        <TableCell
                          sx={{
                            backgroundColor: 'white',
                            border: '1px solid black',
                            textAlign: 'center',
                          }}
                          colSpan={months.length}
                          key={year}
                        >
                          {year}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          backgroundColor: 'white',
                          border: '1px solid black',
                          padding: '8px',
                        }}
                      >
                        Aylar
                      </TableCell>
                      {Object.entries(tabledata).flatMap(([year, months]) =>
                        months.map((month, index) => (
                          <TableCell
                            sx={{ border: '1px solid black', padding: '8px' }}
                            key={`${year}-${month}`}
                          >
                            {month}
                          </TableCell>
                        ))
                      )}
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          backgroundColor: 'white',
                          border: '1px black',
                          padding: '8px',
                        }}
                      >
                        Tarixçə
                      </TableCell>
                      {Object.entries(tabledata).flatMap(([year, months]) =>
                        months.map((month, index) => (
                          <TableCell
                            sx={{ border: '1px  black', padding: '8px' }}
                            key={`${year}-${month}`}
                          >
                            {values[year][month]}
                          </TableCell>
                        ))
                      )}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
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
                gridTemplateColumns={{ xs: 'repeat(2  , 1fr)' }}
              >
                <Field.Text name="name" label="Əmək müqaviləsinin bağlandığı tarix" />

                <Field.Text
                  name="subDescription"
                  label="Müddətli əmək müqaviləsinin qurtardığı tarix"
                />

                <Field.Text
                  name="name"
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
                Toplam ödənişin yekun məbləği{' '}
              </Typography>
              <Box
                display="grid"
                rowGap={3}
                columnGap={2}
                gridTemplateColumns={{ xs: 'repeat(2  , 1fr)' }}
              >
                <Field.Text name="name" label="AKB məlumatlarına əsasən" />

                <Field.Text name="subDescription" label="Daxili risk sistemi üzrə" />
              </Box>
            </Stack>
            <Divider sx={{ my: 3 }} />
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
                Daşınmaz əmlakı
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Box
                display="grid"
                rowGap={3}
                columnGap={2}
                gridTemplateColumns={{ xs: 'repeat(2  , 1fr)' }}
              >
                <Field.Text name="name" label="Tipi" />

                <Field.Text name="subDescription" label="Qeyd No." />
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
                    aria-disabled
                    name={`vehicleBrand_${vehicle.id}`}
                    label="Marka"
                    defaultValue={vehicle.title}
                  />
                  <Field.Text
                    aria-disabled
                    name={`vehicleNumber_${vehicle.id}`}
                    label="Qeydiyyat nömrə nişanı"
                    defaultValue={vehicle.licensePlate}
                  />
                  <Field.Text
                    aria-disabled
                    name={`vehicleYear_${vehicle.id}`}
                    label="İl"
                    defaultValue={vehicle.year}
                  />
                  <Field.Text
                    aria-disabled
                    name={`vehicleModel_${vehicle.id}`}
                    label="Model"
                    defaultValue={vehicle.model}
                  />
                  <Field.Text
                    aria-disabled
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
                      {/* Row 1 */}
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
                          aria-disabled
                        />
                        <Field.Text
                          name={`serialNumber_${member.id}`}
                          label="Ş/V seriyası və nömrəsi"
                          value={member.fields.serialNumber}
                          aria-disabled
                        />
                        <Field.Text
                          name={`passportStatus_${member.id}`}
                          label="Vəsiqənin statusu"
                          value={member.fields.passportStatus}
                          aria-disabled
                        />
                      </Box>

                      {/* Row 2 */}
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
                          aria-disabled
                        />
                        <Field.Text
                          name={`surname_${member.id}`}
                          label="Soyadı"
                          value={member.fields.surname}
                          aria-disabled
                        />
                        <Field.Text
                          name={`fatherName_${member.id}`}
                          label="Ata adı"
                          value={member.fields.fatherName}
                          aria-disabled
                        />
                        <Field.Text
                          name={`born_${member.id}`}
                          label="Doğum tarixi(xx.xx.xxxx)"
                          value={member.fields.born}
                          aria-disabled
                        />
                        <Field.Select
                          native
                          name={`familyRelationship_${member.id}`}
                          label="Ailə vəziyyəti"
                          value={member.fields.familyRelationship}
                          InputLabelProps={{ shrink: true }}
                          aria-disabled
                        >
                          {familyRelationshipOptions.map((option) => (
                            <option aria-disabled key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Field.Select>
                        <Field.Select
                          aria-disabled
                          native
                          name={`gender_${member.id}`}
                          label="Cinsi"
                          value={member.fields.gender}
                          InputLabelProps={{ shrink: true }}
                        >
                          {PRODUCT_GENDER_OPTIONS.map((option) => (
                            <option aria-disabled key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Field.Select>
                      </Box>

                      <Field.Text
                        aria-disabled
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
                <Field.Text name="name" label="Kreditin məbləği" />

                <Field.Text name="subDescription" label="İllik dərəcəsi(%)" />

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
                    name="months"
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
                <Field.Text name="name" label="Aylıq ödəniş" />

                <Field.Text name="subDescription" label="Cəmi ödəniləcək məbləğ" />
                <Field.Text name="subDescription" label="Cəmi faiz" />
              </Box>
              <Typography mt={4}>
                Komissiyaya qərar üçün göndər <Switch color="info" defaultChecked />
              </Typography>
            </Stack>
          </Grid>
        ))}
      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" color="info" loading={isSubmitting}>
          Təsdiqlə
        </LoadingButton>
      </Stack>
    </Form>
  );
}
