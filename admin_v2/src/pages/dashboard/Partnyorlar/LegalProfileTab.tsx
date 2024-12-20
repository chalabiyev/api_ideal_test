import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import React from 'react';
import { Icon } from '@iconify/react';

const LegalProfileTab = () => {
  const faaliyetSahesiOptions = [
    { label: 'Ticarət', value: 'ticarət' },
    { label: 'Xidmət', value: 'xidmət' },
    { label: 'İstehsal', value: 'istehsal' },
  ];

  return (
    <Grid container spacing={3}>
      {/* Logo */}
      <Grid item xs={12} sx={{ textAlign: 'left' }}>
        <img src="/ideallogo.png" alt="logo" style={{ width: '200px' }} /> <br />
        <Button
          sx={{ mt: 2 }}
          size="small"
          endIcon={<Icon icon="eva:edit-fill" />}
          variant="outlined"
          color="warning"
          component="label"
        >
          Dəyişdir
          <input hidden accept="image/*" type="file" />
        </Button>
      </Grid>

      {/* Kredit məlumatları başlığı */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Kredit tarixi haqqında ümumi məlumat
        </Typography>
      </Grid>

      {/* Şirkət Məlumatları */}
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Biznes Səhifənin Adı" placeholder="Ad daxil edin" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Sahibkarın Adı / Şirkət Adı" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Direktor / Sahib" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="VÖEN" />
      </Grid>

      {/* Sənədlərin Skanı */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          Şirkətin təsis sənədlər
        </Typography>
        <Button
          endIcon={<Icon icon="eva:file-add-fill" />}
          variant="outlined"
          color="warning"
          component="label"
        >
          Fayl yüklə
          <input hidden accept="application/pdf,image/*" type="file" />
        </Button>
        <Typography sx={{ ml: 1 }} variant="caption" color="text.secondary">
          Dəstəklənən formatlar: pdf, jpg, png
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          Direktorun şəxsiyyət vəsiqəsi
        </Typography>
        <Button
          endIcon={<Icon icon="eva:file-add-fill" />}
          variant="outlined"
          color="warning"
          component="label"
        >
          Fayl yüklə
          <input hidden accept="application/pdf,image/*" type="file" />
        </Button>
        <Typography sx={{ ml: 1 }} variant="caption" color="text.secondary">
          Dəstəklənən formatlar: pdf, jpg, png
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          İcarə müqaviləsi
        </Typography>
        <Button
          endIcon={<Icon icon="eva:file-add-fill" />}
          variant="outlined"
          color="warning"
          component="label"
        >
          Fayl yüklə
          <input hidden accept="application/pdf,image/*" type="file" />
        </Button>
        <Typography sx={{ ml: 1 }} variant="caption" color="text.secondary">
          Dəstəklənən formatlar: pdf, jpg, png
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          Mağaza şəkilləri
        </Typography>
        <Button
          endIcon={<Icon icon="eva:file-add-fill" />}
          variant="outlined"
          color="warning"
          component="label"
        >
          Fayl yüklə
          <input hidden accept="application/pdf,image/*" type="file" multiple />
        </Button>
        <Typography sx={{ ml: 1 }} variant="caption" color="text.secondary">
          Dəstəklənən formatlar: pdf, jpg, png
        </Typography>
      </Grid>

      {/* Aşağıdakı form */}
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Aylıq Satış Həcmi" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Fəaliyyətə Başlama Tarixi"
          type="date"
          defaultValue="2023-01-01"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField select fullWidth label="Şirkətin Fəaliyyət Sahəsi" defaultValue="">
          {faaliyetSahesiOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Ölkə" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Şəhər" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Ünvan" />
      </Grid>
      <Box sx={{ textAlign: 'right', mt: 3, width: '100%' }}>
        <Button sx={{ width: '100%' }} variant="outlined" color="success">
          Yadda Saxla
        </Button>
      </Box>
    </Grid>
  );
};

export default LegalProfileTab;
