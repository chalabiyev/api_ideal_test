import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, Button, Grid, TextField, Typography, Box, Divider } from '@mui/material';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';

const Muraciet = () => {
  const mockData = {
    fullName: 'Ad Soyad',
    contactNumbers: ['0501234567', '0517654321'],
    phoneNumber: '0501112233',
    loanAmount: 10000,
    loanDuration: 12,
    statusByBank: 'Baxılır',
    statusByCustomer: 'Testiqlənib',
    finCode: 'ABC1234',
    serialNumber: 'AZE12345678',
    address: 'Nəsimi rayonu, Bakı',
    workplace: 'X Şirkəti',
    position: 'Proqramçı',
    salary: 1500,
    ownership: 'Fərdi',
    experience: 3,
    taxID: '123456789',
    education: 'Ali',
    childrenCount: 2,
    loanType: 'İpoteka',
    serviceFee: 100,
    cardCost: 50,
    insuranceCost: 200,
    valuationCost: 300,
    monthlyPayment: 850,
    totalAmount: 10200,
    loanPurpose: 'Ev almaq',
    guarantors: [
      {
        name: 'Zamin Ad Soyad',
        serialNumber: 'AZE56789012',
        phone: '0509876543',
        address: 'Nərimanov rayonu, Bakı',
        workplace: 'Y Şirkəti',
        position: 'Mühəndis',
      },
    ],
    guaranteeType: 'Əmlak',
  };

  return (
    <>
      <Helmet>
        <title>İdeal Kredit | Müraciət</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Müraciət edənin adı soyadı"
          links={[
            { name: 'Bütün Müraciətlər', href: '/esassehife/statistika' },
            { name: 'Burada ad soyad' },
            { name: 'Burada müraciət etdiyi kredit növü' },
          ]}
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
              <TextField fullWidth label="Ad Soyad" value={mockData.fullName} variant="outlined" />
            </Grid>

            {/* Contact Numbers */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Əlaqə Nömrələri"
                value={mockData.contactNumbers.join(', ')}
                variant="outlined"
              />
            </Grid>

            {/* Phone Number */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Əlaqəli Şəxsin Telefon Nömrəsi"
                value={mockData.phoneNumber}
                variant="outlined"
              />
            </Grid>

            {/* Loan Amount */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Kreditin Məbləği"
                value={mockData.loanAmount}
                variant="outlined"
              />
            </Grid>

            {/* Loan Duration */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Kreditin Müddəti (Ay)"
                value={mockData.loanDuration}
                variant="outlined"
              />
            </Grid>

            {/* Status by Bank */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Status (Bank tərəfindən)"
                value={mockData.statusByBank}
                variant="outlined"
              />
            </Grid>

            {/* Status by Customer */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Status (Müştəri tərəfindən)"
                value={mockData.statusByCustomer}
                variant="outlined"
              />
            </Grid>

            {/* Other Details */}
            {[
              { label: 'FİN Kodu', value: mockData.finCode },
              { label: 'Seriya Nömrəsi', value: mockData.serialNumber },
              { label: 'Ünvan', value: mockData.address },
              { label: 'İş Yeri', value: mockData.workplace },
              { label: 'Vəzifəsi', value: mockData.position },
              { label: 'Maaşı', value: mockData.salary },
              { label: 'Təcrübə', value: `${mockData.experience} il` },
            ].map((item, index) => (
              <Grid key={index} item xs={12} md={6}>
                <TextField fullWidth label={item.label} value={item.value} variant="outlined" />
              </Grid>
            ))}

            {/* Guarantor Details */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Zamin Məlumatları
              </Typography>
              {mockData.guarantors.map((guarantor, index) => (
                <Grid container spacing={3} key={index}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Zaminin Adı Soyadı"
                      value={guarantor.name}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Zaminin Seriya Nömrəsi"
                      value={guarantor.serialNumber}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Zaminin Əlaqə Telefonu"
                      value={guarantor.phone}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Zaminin Ünvanı"
                      value={guarantor.address}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Zaminin İş Yeri"
                      value={guarantor.workplace}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Zaminin Vəzifəsi"
                      value={guarantor.position}
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
                value={mockData.loanPurpose}
                variant="outlined"
              />
            </Grid>
            {/* Actions */}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Button variant="contained" color="error">
                  Müraciəti Ləğv Et
                </Button>
                <Button variant="contained" color="success">
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
