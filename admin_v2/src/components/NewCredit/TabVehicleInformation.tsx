import React from 'react';
import { Box, Card, CardContent, Grid, TextField, Typography } from '@mui/material';

const mockVehicles = [
  {
    color: 'Qara metallik',
    bodyNumber: 'MHASH99OP7U131888',
    vehicleRegistryDate: '17/07/2017',
    vehicleNumber: '10TX881',
    vehicleModel: 'HYUNDAI SANTA FE MİNİK',
    vehicleManufactYear: '2023',
    note: 'Alqı satqı müqaviləsi BDYP K.N.N.90OE725',
    pin: 'ABCDKLE',
    patronymic: 'MƏCİD OĞLU',
    surname: 'SADIQOV',
    name: 'TOFİQ',
    engineCapacity: '2188',
  },
  {
    color: 'Ağ',
    bodyNumber: 'GHUJ88PP9T188222',
    vehicleRegistryDate: '01/03/2020',
    vehicleNumber: '90AB123',
    vehicleModel: 'TOYOTA CAMRY MİNİK',
    vehicleManufactYear: '2020',
    note: 'Alqı satqı müqaviləsi XYZ 123',
    pin: 'XYZ1234',
    patronymic: 'ƏLİ OĞLU',
    surname: 'ƏLİYEV',
    name: 'CAVİD',
    engineCapacity: '2500',
  },
];


// eslint-disable-next-line
const TabVehicleInformation = () => {
  return (
    <Box sx={{ py: 4 }}>
      {/* Başlık */}

      {/* Nəqliyyat Vasitələri Listəsi */}
      {mockVehicles.map((vehicle, index) => (
        <Card key={2} sx={{ mb: 3 }}>
          <CardContent>
            <Typography sx={{ mb: 4 }} variant="subtitle1" gutterBottom>
              {vehicle.vehicleModel}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="Modeli" value={vehicle.vehicleModel} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Qeydiyyat Nömrəsi" value={vehicle.vehicleNumber} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Rəngi" value={vehicle.color} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Kuzov Nömrəsi" value={vehicle.bodyNumber} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Qeydiyyat Tarixi" value={vehicle.vehicleRegistryDate} fullWidth />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField label="İstehsal İli" value={vehicle.vehicleManufactYear} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Mühərrik Həcmi" value={vehicle.engineCapacity} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Qeyd" value={vehicle.note} fullWidth />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default TabVehicleInformation;
