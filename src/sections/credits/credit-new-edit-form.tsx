import type { IUserItem } from 'src/types/user';

import { z as zod } from 'zod';
import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';

import { PRODUCT_GENDER_OPTIONS } from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import {
  Divider,
  Tab,
  Tabs,
  CardHeader,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

import {
  familyRelationshipOptions,
  whereToGetSignatureOptions,
} from '../_examples/extra/form-validation-view/react-hook-form';

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

  const monthsData = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const yearsData = Array.from({ length: 3 }, (_, i) => new Date().getFullYear() - i);
  const creditsPaidData = Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000));

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Tabs value={currentTab} onChange={handleTabChange}>
        <Tab value="s/v" label="Ş/V" />
        <Tab value="akb" label="AKB" />
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
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
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
                  Borc: 400m
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
              {/* <TableContainer>
                <Table>
                  <TableBody sx={
                    {}
                  }>
                    <TableRow></TableRow>
                    <TableRow>Month</TableRow>
                    <TableRow>Credits Paid</TableRow>
                    {yearsData.map((year, yearIndex) =>
                      monthsData.map((month, monthIndex) => (
                        <TableCell key={`${yearIndex}-${monthIndex}`}>
                          {monthIndex === 0 && <TableRow>{year}</TableRow>}
                          <TableRow>{month}</TableRow>
                          <TableRow>{creditsPaidData[monthIndex]}</TableRow>
                        </TableCell>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer> */}
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
