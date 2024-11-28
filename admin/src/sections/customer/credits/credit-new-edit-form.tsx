
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
  Slider,
  Divider,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';

import { PRODUCT_GENDER_OPTIONS } from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { _familyRelationshipOptions, whereToGetSignatureOptions } from 'src/sections/_examples/extra/form-validation-view/react-hook-form';

// eslint-disable-next-line
export type ValuesType = {
  [year: string]: {
    [month: string]: number;
  };
};

// ----------------------------------------------------------------------

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
});

export function CreateCreditForm() {
  const [currentTab, setCurrentTab] = useState('s/v');
  // eslint-disable-next-line
  const tabledata = {
    2024: ['01', '02', '03', '04','05', '06', '07', '08'],
    2023: ['12', '11', '10', '09', '08', '07','06', '05', '04', '03', '02', '01'],
    2022: ['12', '11']
  };
  // eslint-disable-next-line
  const values: ValuesType = {
    2024: { '01': 10, '02': 20, '03': 30, '04': 40, '05': 50, '06': 60, '07': 70, '08': 80 },
    2023: { '12': 90, '11': 100, '10': 110, '09': 120, '08': 130, '07': 140, '06': 150, '05': 160, '04': 170, '03': 180, '02': 190, '01': 200 },
    2022: { '12': 210, '11': 220 }
  }
  const router = useRouter();

  const methods = useForm<NewUserSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(NewUserSchema),
    defaultValues: {
      fin: '',
      serialNumber: '',
      passportStatus: '',
      name: '',
      surname: '',
      fatherName: '',
      born: '',
      familyRelationship: '',
      whereToGetSignature: '',
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

  return (
    <Form methods={methods} onSubmit={onSubmit}>

      
      <Tabs value={currentTab} onChange={handleTabChange}>
        <Tab value="s/v" label="Ş/V" />
        <Tab value="akb" label="AKB" />
        <Tab value="workplace" label="İş yeri" />
        <Tab value="occupancy" label="Əmlakları" />
        <Tab value="vehicle" label="Nəqliyyat vasitələri" />
        <Tab value="familyMembers" label="Ailə üzvləri" />
        <Tab value="credits" label="Kreditlər" />
      </Tabs>
      {(currentTab === 's/v' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={4}>
            <Card sx={{ pt: 10, pb: 5, px: 3 }}>
              <Box sx={{ mb: 5 }}>
                <Field.UploadAvatar
                  name="avatarUrl"
                  maxSize={3145728}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 3,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.disabled',
                      }}
                    >
                      İcazə verilənlər; *.jpeg, *.jpg, *.png, *.gif
                      <br /> maximum həcm {fData(3145728)}
                    </Typography>
                  }
                />
              </Box>
            </Card>
          </Grid>

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
                  <Field.Text name="fin" label="Fin" />
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
                  <Field.Text name="zipCode" label="Poçt kodu" />
                  <Field.Text name="role" label="Rol" />
                  <Field.Select
                    native
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
                <Field.Text name="name" label="Аktiv kreditlər üzrə ümumi borc" />

                <Field.Text name="subDescription" label="Sayı" />

                <Field.Text
                  name="name"
                  label="Müştərinin zamin kimi çıxış etdiyi kreditlər üzrə borcun ümumi məbləği"
                />

                <Field.Text name="subDescription" label="Sayı" />

                <Field.Text
                  name="name"
                  label="Son 24 ayda ödənilmiş kreditlər üzrə borcun ümumi məbləği"
                />

                <Field.Text name="subDescription" label="Sayı" />

                <Field.Text name="name" label="Son 24 aydan əvvəl ödənilmiş borcun ümumi məbləği" />

                <Field.Text name="subDescription" label="Sayı" />
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
                <Field.Text name="name" label="AKB məlumatlarına əsasən" />

                <Field.Text name="subDescription" label="Daxili risk sistemi üzrə" />
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
                <Field.Text name="name" label="AKB məlumatlarına əsasən" />

                <Field.Text name="subDescription" label="Daxili risk sistemi üzrə" />
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
                <Field.Text name="name" label="Informasiya provideri" />

                <Field.Text name="subDescription" label="Kredit balansının məbləği" />

                <Field.Text name="name" label="Aylıq ödəniş məbləği" />

                <Field.Text name="subDescription" label="Son ödəniş tarixi" />

                <Field.Text name="name" label="Məqsəd" />

                <Field.Text
                  name="subDescription"
                  label="Əsas borc üzrə vaxtı keçmiş günlərin sayı"
                />

                <Field.Text name="name" label="Hesab nömrəsi" />

                <Field.Text name="subDescription" label="Faiz məbləği" />
                <Field.Text name="subDescription" label="Faiz dərəcəsi" />
                <Field.Text name="subDescription" label="Kreditin verilmə tarixi" />
                <Field.Text name="subDescription" label="Kreditin bitmə tarixi" />
                <Field.Text
                  name="subDescription"
                  label="Faizli borc üzrə vaxtı keçmiş günlərin sayı"
                />
                <Field.Text
                  name="subDescription"
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
                İşçi barədə məlumat
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Box
                display="grid"
                rowGap={3}
                columnGap={2}
                gridTemplateColumns={{ xs: 'repeat(2  , 1fr)' }}
              >
                <Field.Text name="name" label="FİN" />

                <Field.Text name="subDescription" label="Ş/V seriyası və nömrəsi" />

                <Field.Text name="name" label="Ad" />

                <Field.Text name="subDescription" label="Soyad" />

                <Field.Text name="name" label="Ata adı" />

                <Field.Text name="subDescription" label="Doğum tarixi" />

                <Field.Text
                  name="name"
                  label="Qeydiyyatda olduğu ünvan"
                  sx={{
                    gridArea: '4 / 1 / 4 / 3',
                  }}
                />
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
                İşəgötürən barədə məlumatlar
              </Typography>

              <Stack
                display="grid"
                rowGap={3}
                columnGap={2}
                gridTemplateColumns={{ xs: 'repeat(2  , 1fr)' }}
              >
                <Field.Text name="name" label="İşəgötürənin tam adı" />

                <Field.Text name="subDescription" label="Struktur bölmənin adı" />

                <Field.Text
                  name="name"
                  label="İşçinin vəzifəsinin(peşəsinin) adı"
                  sx={{
                    gridArea: '2 / 1 / 4 / 3',
                  }}
                />
              </Stack>
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
                <Field.Text name="name" label="Informasiya provideri" />

                <Field.Text name="subDescription" label="Kredit balansının məbləği" />

                <Field.Text name="name" label="Aylıq ödəniş məbləği" />

                <Field.Text name="subDescription" label="Son ödəniş tarixi" />

                <Field.Text name="name" label="Məqsəd" />

                <Field.Text
                  name="subDescription"
                  label="Əsas borc üzrə vaxtı keçmiş günlərin sayı"
                />

                <Field.Text name="name" label="Hesab nömrəsi" />

                <Field.Text name="subDescription" label="Faiz məbləği" />
                <Field.Text name="subDescription" label="Faiz dərəcəsi" />
                <Field.Text name="subDescription" label="Kreditin verilmə tarixi" />
                <Field.Text name="subDescription" label="Kreditin bitmə tarixi" />
                <Field.Text
                  name="subDescription"
                  label="Faizli borc üzrə vaxtı keçmiş günlərin sayı"
                />
                <Field.Text
                  name="subDescription"
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
            </Stack>
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
            <Stack>
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

              <Box
                display="grid"
                rowGap={3}
                columnGap={2}
                gridTemplateColumns={{ xs: 'repeat(2  , 1fr)' }}
              >
                <Field.Text name="name" label="Tipi" />

                <Field.Text name="subDescription" label="Qeydiyyat nömrə nişanı" />
              </Box>
            </Stack>
          </Grid>
        )) ||
        (currentTab === 'familyMembers' && (
          <>
            <Box>
              <Grid container spacing={3}>
                <Grid xs={12} md={4}>
                  <Card sx={{ px: 3, pb: 5 }}>
                    <Typography
                      sx={{
                        my: 3,
                        fontSize: 20,
                        lineHeight: 1.5,
                        fontWeight: 700,
                      }}
                    >
                      Həyat yoldaşı
                    </Typography>
                    <Box sx={{ mb: 5 }}>
                      <Field.UploadAvatar
                        name="avatarUrl"
                        maxSize={3145728}
                        helperText={
                          <Typography
                            variant="caption"
                            sx={{
                              mt: 3,
                              mx: 'auto',
                              display: 'block',
                              textAlign: 'center',
                              color: 'text.disabled',
                            }}
                          >
                            İcazə verilənlər; *.jpeg, *.jpg, *.png, *.gif
                            <br /> maksimum həcm {fData(3145728)}
                          </Typography>
                        }
                      />
                    </Box>
                  </Card>
                </Grid>

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
                        <Field.Text name="fin" label="Fin" />
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
                        <Field.Select
                          native
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
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={3}>
                <Grid xs={12} md={4}>
                  <Card sx={{ px: 3, pb: 5 }}>
                    <Typography
                      sx={{
                        my: 3,
                        fontSize: 20,
                        lineHeight: 1.5,
                        fontWeight: 700,
                      }}
                    >
                      Övladı
                    </Typography>
                    <Box sx={{ mb: 5 }}>
                      <Field.UploadAvatar
                        name="avatarUrl"
                        maxSize={3145728}
                        helperText={
                          <Typography
                            variant="caption"
                            sx={{
                              mt: 3,
                              mx: 'auto',
                              display: 'block',
                              textAlign: 'center',
                              color: 'text.disabled',
                            }}
                          >
                            İcazə verilərlər; *.jpeg, *.jpg, *.png, *.gif
                            <br /> maximum həcm {fData(3145728)}
                          </Typography>
                        }
                      />
                    </Box>
                  </Card>
                </Grid>

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
                        <Field.Text name="fin" label="Fin" />
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
                        <Field.Select
                          native
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
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </>
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

                <Slider
                  name="months"
                  sx={{
                    gridArea: '2 / 1 / 3 / 3',
                  }}
                  defaultValue={30}
                  step={1}
                  min={1}
                  max={84}
                  valueLabelDisplay="on"
                  color="info"
                />
                <Field.Text name="name" label="Aylıq ödəniş" />

                <Field.Text name="subDescription" label="Cəmi ödəniləcək məbləğ" />
                <Field.Text name="subDescription" label="Cəmi faiz" />
              </Box>
            </Stack>
          </Grid>
        ))}
      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Kredit yarat
        </LoadingButton>
      </Stack>
    </Form>
  );
}
