import { z as zod } from 'zod';
import React, { useEffect, useState } from 'react';
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
  TextField,
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
  creditData,
  oldLoanData,
  _customerRole,
  paymentHistory,
  sorguTarixcesi,
  combinedHeaders,
  guarantorLoanData,
  users,
  randomGuarantorData,
} from './credit-data';
import { creditSchema } from '../_examples/extra/form-validation-view/schema';

export type ValuesType = {
  [year: string]: {
    [month: string]: number;
  };
};
// Dummy data for users

// const getBackgroundColor = (daysLate: any) => {
//   if (daysLate === '-') return '#C6C6C6'; // No information (gray)
//   if (daysLate === 0) return '#00B0F0'; // 0 days delay (blue)
//   if (daysLate <= 30) return '#FFFF00'; // 1-30 days delay (yellow)
//   if (daysLate <= 90) return '#FFC000'; // 31-90 days delay (orange)
//   if (daysLate <= 180) return '#FF0000'; // 91-180 days delay (red)
//   if (daysLate <= 360) return '#7030A0'; // 181-360 days delay (dark red)
//   if (daysLate > 360) return '#C00000'; // 361+ days delay (deep red)
//   return '#FFFFFF'; // Default (white)
// };
export function CreateCreditForm() {
  const [currentTab, setCurrentTab] = useState(1);
  const [userData, setUserData] = useState(false);
  const [selectedOption, setSelectedOption] = useState('em');
  const [selectedUserVehicleData, setSelectedUserVehicleData] = useState<any>([]);
  const [selectedUserGuarantorData, setselectedUserGuarantorData] = useState<any>([]);
  const [selectedUserFamilyData, setSelectedUserFamilyData] = useState<any>([]);
  const [guarantorData, setGuarantorData] = useState(false);
  const [newGuarantorData, setNewGuarantorData] = useState<any>([]);

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(creditSchema),
    defaultValues: {
      fin: '',
      serialNumber: '',
      whereToGetSignature: '',
      newZaminFin: '',
      newZaminSerialNumber: '',
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
    setUserData(true);
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
    setSelectedUserVehicleData(user?.vehicleData);
    setselectedUserGuarantorData(user?.zaminData);
    setSelectedUserFamilyData(user?.familyData);
  };

  const guarantors = randomGuarantorData;
  const handleSearchNewGuarantor = () => {
    const fin = watch('newZaminFin');
    const serialNumber = watch('newZaminSerialNumber');
    const guarantor = guarantors.find((g) => g.fin === fin && g.serialNumber === serialNumber);
    try {
      if (serialNumber.length === 0) {
        throw new Error('Zaminin Ş/V seriyası və nömrəsi tələb olunur!');
      } else if (fin.length === 0) {
        throw new Error('Zaminin fini tələb olunur!');
      }
    } catch (error) {
      toast.error(error.message);
    }
    setNewGuarantorData(guarantor);
    setGuarantorData(true);

    console.log('New Guarantor:', guarantor);
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
    try {
      toast.success('Form submitted successfully!');
    } catch (error) {
      toast.error(error.message);
    }
  });
  const handleAddGuarantor = (fin: string) => {
    setSelectedUserFamilyData((prevData: any[]) =>
      prevData.map((member) =>
        member.fields.fin === fin
          ? {
              ...member,
              fields: {
                ...member.fields,
                isGuarantor: true,
              },
            }
          : member
      )
    );
    toast.success('Zamin əlavə edildi!');
  };

  const handleTabChange = (event: any, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleTabIndexChanger = (action: string) => {
    if (action === 'next') {
      setCurrentTab(currentTab + 1);
    } else {
      setCurrentTab(currentTab - 1);
    }
  };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Tabs value={currentTab} onChange={handleTabChange}>
        <Tab value={1} label="Ş/V" />
        {/* didn't added for now */}
        {/* <Tab value="akb2" label="Müştəri skoru" /> */}
        {/* <Tab value="akb" label="AKB" /> */}
        <Tab value={2} label="İş yeri" />
        <Tab value={3} label="Zaminlik haqqında məlumat" />
        <Tab value={4} label="Əmlakları" />
        <Tab value={5} label="Nəqliyyat vasitələri" />
        <Tab value={6} label="Ailə üzvləri" />
        <Tab value={7} label="Kredit ver" />
      </Tabs>
      {(currentTab === 1 && (
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
                <Field.Text name="fin" label="FIN" required variant="outlined" />
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

          <Grid item xs={12}>
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
        (currentTab === 2 && (
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
        (currentTab === 3 && selectedUserGuarantorData && (
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
                {userData && (
                  <Card sx={{ p: 3 }}>
                    <Typography
                      sx={{
                        mb: 3,
                        textAlign: 'center',
                        fontSize: 20,
                        lineHeight: 1.5,
                        fontWeight: 700,
                      }}
                    >
                      Yeni Zamin əlavə etmək üçün aşağıdakı məlumatları doldurun
                    </Typography>
                    <Box
                      display="grid"
                      rowGap={2}
                      columnGap={2}
                      gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
                    >
                      <Field.Text
                        name="newZaminSerialNumber"
                        label="Serial Number"
                        variant="outlined"
                      />
                      <Field.Text name="newZaminFin" label="FIN" variant="outlined" />
                    </Box>
                    <Button
                      onClick={handleSearchNewGuarantor}
                      variant="contained"
                      sx={{ mt: 2, width: '100%', backgroundColor: '#2D9CDB' }}
                    >
                      Axtar
                    </Button>
                  </Card>
                )}

                {guarantorData ? (
                  <Box
                    display="flex"
                    rowGap={3}
                    sx={{
                      my: 4,
                    }}
                    columnGap={2}
                    flexDirection="column"
                  >
                    <Field.UploadAvatar
                      name="newZaminAvatarUrl"
                      maxSize={3145728}
                      sx={{
                        height: '128px',
                        width: '128px',
                      }}
                      disabled
                      value={newGuarantorData.avatarUrl}
                    />
                    <Box
                      display="grid"
                      rowGap={3}
                      columnGap={2}
                      gridTemplateColumns={{ xs: 'repeat(2, 1fr)' }}
                    >
                      <Field.Text
                        name="zaminName"
                        label="Adı"
                        defaultValue={newGuarantorData.name}
                        disabled
                      />
                      <Field.Text
                        name="zaminFin"
                        label="Fin"
                        defaultValue={newGuarantorData.fin}
                        disabled
                      />
                      <Field.Text
                        disabled
                        name="zaminSerialNumber"
                        label="Ş/V seriyası və nömrəsi"
                        defaultValue={newGuarantorData.serialNumber}
                      />
                      <Field.Text
                        disabled
                        name="zaminPassportStatus"
                        label="Vəsiqənin statusu"
                        defaultValue={newGuarantorData.passportStatus}
                      />
                      <Field.Text
                        disabled
                        name="zaminIdentityCard"
                        label="Şəxsiyyət vəsiqəsi"
                        defaultValue={newGuarantorData.identityCard}
                      />
                      <Field.Text
                        disabled
                        name="zaminIssuedBy"
                        label="Kim tərəfindən verilib"
                        defaultValue={newGuarantorData.issuedBy}
                      />
                      <Field.Text
                        disabled
                        name="zaminRegistrationAddress"
                        label="Qeydiyyat ünvanı"
                        defaultValue={newGuarantorData.registrationAddress}
                      />
                      <Field.Text
                        disabled
                        name="zaminResidentialAddress"
                        label="Yaşadığı ünvanı"
                        defaultValue={newGuarantorData.residentialAddress}
                      />
                      <Field.Text
                        disabled
                        name="zaminPhones"
                        label="Telefon"
                        defaultValue={newGuarantorData.phones}
                      />
                    </Box>
                  </Box>
                ) : null}
                <Divider sx={{ mb: 3 }} />
                {selectedUserGuarantorData.map((zamin: any) => (
                  <Box
                    display="flex"
                    rowGap={3}
                    sx={{
                      my: 4,
                    }}
                    columnGap={2}
                    flexDirection="column"
                  >
                    <Box
                      display="flex"
                      rowGap={3}
                      sx={{
                        my: 4,
                      }}
                      columnGap={2}
                      flexDirection="column"
                    >
                      <Field.UploadAvatar
                        name="zaminAvatarUrl"
                        maxSize={3145728}
                        sx={{
                          height: '128px',
                          width: '128px',
                        }}
                        value={zamin.avatarUrl}
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
                          label="Telefon"
                          defaultValue={zamin.phones}
                        />
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>
        )) ||
        (currentTab === 4 && (
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
        (currentTab === 5 && selectedUserVehicleData && (
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
            {selectedUserVehicleData.map((vehicle: any) => (
              <Box
                key={vehicle.id}
                display="grid"
                rowGap={3}
                columnGap={2}
                gridTemplateColumns={{ xs: 'repeat(2, 1fr)' }}
                mb={2}
              >
                <TextField label="Marka" disabled defaultValue={vehicle.vehicleBrand} />
                <TextField
                  name="vehicleModel"
                  label="Model"
                  disabled
                  defaultValue={vehicle.vehicleModel}
                />
                <TextField
                  name="vehicleYear"
                  label="İl"
                  disabled
                  defaultValue={vehicle.vehicleYear}
                />
                <TextField
                  name="vehicleMarketValue"
                  label="Bazar dəyəri"
                  disabled
                  defaultValue={vehicle.vehicleMarketValue}
                />
                <TextField
                  name="vehicleVin"
                  label="VIN nömrəsi"
                  disabled
                  defaultValue={vehicle.vehicleVin}
                />
                <TextField
                  name="vehicleNumber"
                  label="Nömrə"
                  disabled
                  defaultValue={vehicle.vehicleNumber}
                />
              </Box>
            ))}
          </Grid>
        )) ||
        (currentTab === 6 && selectedUserFamilyData && (
          <Box sx={{ mt: 3 }}>
            {selectedUserFamilyData.map((member: any) => (
              <Grid container spacing={3} mb={10} key={member.id}>
                <Box
                  sx={{
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'start',
                  }}
                >
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
                    name="familyMemberAvatarUrl"
                    maxSize={3145728}
                    value={member.fields.avatarUrl}
                    sx={{
                      height: '128px',
                      width: '128px',
                    }}
                    disabled
                  />
                  <Button
                    onClick={() => handleAddGuarantor(member.fields.fin)}
                    variant="contained"
                    sx={{ mt: 2, width: '100%', backgroundColor: '#2D9CDB' }}
                  >
                    Zamin et
                  </Button>
                </Box>
                <Grid xs={12} md={8} item>
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
                        <Field.Text name="fin" label="Fin" value={member.fields.fin} disabled />
                        <Field.Text
                          name="serialNumber"
                          label="Ş/V seriyası və nömrəsi"
                          value={member.fields.serialNumber}
                          disabled
                        />
                        <Field.Text
                          name="passportStatus"
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
                        <Field.Text name="name" label="Adı" value={member.fields.name} disabled />
                        <Field.Text
                          name="surname"
                          label="Soyadı"
                          value={member.fields.surname}
                          disabled
                        />
                        <Field.Text
                          name="fatherName"
                          label="Ata adı"
                          value={member.fields.fatherName}
                          disabled
                        />
                        <Field.Text
                          name="born"
                          label="Doğum tarixi(xx.xx.xxxx)"
                          value={member.fields.born}
                          disabled
                        />
                        <Field.Select
                          native
                          name="familyRelationship"
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
                          name="gender"
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
                        name="address"
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
        (currentTab === 7 && (
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
                Komissiyaya qərar üçün göndər
                <Switch color="info" defaultChecked name="comissionDecide" />
              </Typography>
            </Stack>
          </Grid>
        ))}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={3}
        sx={{ gap: 2 }}
        width="100%"
      >
        <Button
          onClick={(e) => handleTabIndexChanger('back')}
          variant="contained"
          sx={{ mt: 3, backgroundColor: '#2D9CDB', width: '300px' }}
        >
          Geri
        </Button>
        <Button
          onClick={(e) => handleTabIndexChanger('next')}
          variant="contained"
          sx={{ mt: 3, backgroundColor: '#2D9CDB', width: '300px' }}
        >
          İrəli
        </Button>
      </Box>
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{
            backgroundColor: 'black',
            width: '300px',
            color: 'white',
          }}
          onClick={() => {
            console.log('Submitted Data:', methods.getValues());
          }}
        >
          Təsdiqlə
        </Button>
      </Stack>
    </Form>
  );
}
