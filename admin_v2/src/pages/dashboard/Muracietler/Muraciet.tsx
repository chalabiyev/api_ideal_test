import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, Button, Grid, TextField, Typography, Box, Divider } from '@mui/material';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { CreditRequest } from 'src/types/CreditRequestDto';
import {
  acceptCreditRequestByAdmin,
  getCreditRequest,
  rejectCreditRequestByAdmin,
} from 'src/api/CreditService';
import { creditTypeMap } from 'src/components/Applications';
import { toast } from 'sonner';
import { Label } from 'recharts';
import { callGetFile } from 'src/api/FileService';
import { Iconify } from 'src/components/iconify';

const Muraciet = () => {
  const [data, setData] = React.useState<CreditRequest>({
    creditDetails: {
      storeName: '',
      operationType: 'product',
      productName: '',
      creditTerm: 0,
      cashPrice: 0,
      creditAmount: 0,
      category: '',
      detail: '',
      creditAmountInput: 0,
      annualPercent: 0,
      monthlyPayment: 0,
      totalPayment: 0,
      cardCost: 0,
      valuationCost: 0,
      insuranceCost: 0,
      creditPurpose: '',
      decisionQueryEnabled: false,
      serviceRate: 0,
    },
    workExperience: '',
    familyMembers: '',
    familyIncome: '',
    isRenting: false,
    rentAmount: '',
    rentDuration: '',
    actualAddress: '',
    additionalIncomes: [],
    idQuality: 0,
    generalNote: '',
    relatedPersons: [],
    pensioner: {
      name: '',
      patronymic: '',
      birthDate: '',
      surname: '',
      allowance: [],
      pension: [],
    },
  });
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  useEffect(() => {
    if (!id) return;
    getCreditRequest(id).then((response) => {
      if (!response) return;
      setData(response);
    });
  }, []);

  const handleApprove = async () => {
    if (!id) return;
    let res = await acceptCreditRequestByAdmin(id!);
    if (res) {
      toast.success('Müraciət təsdiq edildi');
    } else {
      toast.error('Müraciət təsdiq edilə bilmədi');
    }
  };

  const handleReject = async () => {
    if (!id) return;
    let res = await rejectCreditRequestByAdmin(id!);
    if (res) {
      toast.success('Müraciət ləğv edildi');
    } else {
      toast.error('Müraciət ləğv edilə bilmədi');
    }
  };

  const handleDownloadContract = () => {
    if (!data.contractFileName) return;
    callGetFile(data.contractFileName).then((response) => {
      if (!response) return;
      const link = document.createElement('a');
      link.href = response;
      link.setAttribute('download', data.contractFileName!);
      document.body.appendChild(link);
      link.click();
    });
  };

  const handleDownloadVideoSign = () => {
    if (!data.videoSignFileName) return;
    callGetFile(data.videoSignFileName).then((response) => {
      if (!response) return;
      const link = document.createElement('a');
      link.href = response;
      link.setAttribute('download', data.videoSignFileName!);
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <>
      <Helmet>
        <title>İdeal Kredit | Müraciət</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading={`${
            data.requestedUser?.name
              ? data.requestedUser.name.charAt(0).toUpperCase() +
                data.requestedUser.name.slice(1).toLowerCase()
              : ''
          } ${
            data.requestedUser?.surname
              ? data.requestedUser.surname.charAt(0).toUpperCase() +
                data.requestedUser.surname.slice(1).toLowerCase()
              : ''
          }`}
          links={[{ name: 'Bütün Müraciətlər', href: '/esassehife/statistika' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card className="p-4">
          <Typography variant="h6" gutterBottom>
            Müraciət Forması
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            {/* Full Name */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Ad Soyad"
                value={`${
                  data.requestedUser?.name
                    ? data.requestedUser.name.charAt(0).toUpperCase() +
                      data.requestedUser.name.slice(1).toLowerCase()
                    : ''
                } ${
                  data.requestedUser?.surname
                    ? data.requestedUser.surname.charAt(0).toUpperCase() +
                      data.requestedUser.surname.slice(1).toLowerCase()
                    : ''
                }`}
                variant="outlined"
              />
            </Grid>

            {/* Contact Numbers */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Əlaqə Nömrələri"
                value={data.otherPhoneNumbers || ''}
                variant="outlined"
              />
            </Grid>

            {/* Phone Number */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                value={data.phoneNumber || ''}
                label="Əlaqəli Şəxsin Telefon Nömrəsi"
                variant="outlined"
              />
            </Grid>

            {/* Loan Amount */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Kreditin Məbləği"
                value={data.creditAmount || ''}
                variant="outlined"
              />
            </Grid>

            {/* Loan Duration */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Kreditin Müddəti (Ay)"
                value={data.creditTerm || ''}
                variant="outlined"
              />
            </Grid>

            {/* Status by Bank */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Status (Bank tərəfindən)"
                value={data.confirmStatus || ''}
                variant="outlined"
              />
            </Grid>

            {/* Status by Customer */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Status (Müştəri tərəfindən)"
                value={data.activateStatus || ''}
                variant="outlined"
              />
            </Grid>

            {/* Other Details */}
            {[
              { label: 'FİN Kodu', value: data.requestedUser?.pin },
              { label: 'Seriya Nömrəsi', value: data.requestedUser?.seriaNo },
              { label: 'Ünvan', value: data.requestedUser?.address },
              { label: 'İş Yeri', value: data.requestedUser?.workAddress },
              { label: 'Vəzifəsi', value: data.requestedUser?.position },
              { label: 'Maaşı', value: data.requestedUser?.salary },
              { label: 'Təcrübə', value: `${data.requestedUser?.experience} il` },
            ].map((item, index) => (
              <Grid key={index} item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={item.label || ''}
                  value={item.value || ''}
                  variant="outlined"
                />
              </Grid>
            ))}

            {/* Guarantor Details */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Zamin Məlumatları
              </Typography>
              {data.guarantors?.map((guarantor, index) => (
                <Grid container spacing={3} key={index}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Zaminin Adı Soyadı"
                      value={guarantor.personAz.name || ''}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Zaminin Seriya Nömrəsi"
                      value={guarantor.documentNumber || ''}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Zaminin Əlaqə Telefonu"
                      value={guarantor.phoneNumber || ''}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Zaminin Ünvanı"
                      value={guarantor.addressDetail.address || ''}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Zaminin İş Yeri"
                      value={guarantor.workPlace || ''}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Zaminin Vəzifəsi"
                      value={guarantor.position || ''}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>

            {/* Loan Purpose */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Kreditin Məqsədi"
                value={data.creditPurpose}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}
            >
              <Button
                variant="contained"
                color="primary"
                title="Download PDF Contract"
                startIcon={<Iconify icon="fa6-solid:file-pdf" />}
                onClick={handleDownloadContract}
              >
                Müqaviləyə bax
              </Button>
              <Button
                variant="contained"
                color="secondary"
                title="Download VideoSign"
                startIcon={<Iconify icon="tabler:video-filled" />}
                onClick={handleDownloadVideoSign}
              >
                Video qeydiyyata bax
              </Button>
            </Grid>
            {/* Actions */}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Button variant="contained" color="error" onClick={handleReject}>
                  Müraciəti Ləğv Et
                </Button>
                <Button variant="contained" color="success" onClick={handleApprove}>
                  Müraciəti Təsdiq Et
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </DashboardContent>
    </>
  );
};

export default Muraciet;
