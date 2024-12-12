import React from 'react';
import {
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  Avatar,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import { Iconify } from '../iconify';

const TabIdentification = ({
  setValue,
}: {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  // eslint-disable-next-line
}) => {
  return (
    <Box sx={{ p: 4 }}>
      {/* Başlık */}
      <Typography variant="h5" gutterBottom>
        Tab Identification
      </Typography>

      {/* Serial Number ve Fin */}
      <Card sx={{ mb: 1, p: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Serial Number" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Fin" fullWidth />
            </Grid>
          </Grid>
        </CardContent>
        {/* Axtar Button */}
        <Button
          fullWidth
          startIcon={<Iconify icon="mingcute:search-line" />}
          variant="contained"
          color="primary"
          size="large"
        >
          Axtar
        </Button>{' '}
      </Card>

      {/* Fotoğraf */}
      <Card sx={{ mb: 1, p: 2, textAlign: 'center' }}>
        <CardContent>
          <Avatar
            sx={{
              width: 250,
              height: 250,
              margin: '0 auto',
              backgroundColor: '#f0f0f0',
            }}
            src="https://www.pngkey.com/png/full/229-2294342_demo-person-dr-ak-sharma-nephrologist.png"
          >
            Foto
          </Avatar>
        </CardContent>

        {/* Ad ve Soyad */}
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Ad" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Soyad" fullWidth />
            </Grid>
          </Grid>
        </CardContent>

        {/* Ata Adı ve Vəsiqənin Statusu */}
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Ata adı" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Vəsiqənin statusu" fullWidth />
            </Grid>
          </Grid>
        </CardContent>

        {/* Doğum Tarihi ve Doğum Yeri */}
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Doğum Tarixi"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Doğum Yeri" fullWidth />
            </Grid>
          </Grid>
        </CardContent>

        {/* Ailə Vəziyyəti ve Cinsi */}
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Select fullWidth defaultValue="" displayEmpty>
                <MenuItem value="" disabled>
                  Ailə vəziyyəti
                </MenuItem>
                <MenuItem value="evli">Evli</MenuItem>
                <MenuItem value="subay">Subay</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select fullWidth defaultValue="" displayEmpty>
                <MenuItem value="" disabled>
                  Cinsi
                </MenuItem>
                <MenuItem value="kisi">Kişi</MenuItem>
                <MenuItem value="qadin">Qadın</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </CardContent>

        {/* Qeydiyyat Tarixi ve Telefon */}
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Qeydiyyatda olduğu tarix"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Telefon Nömrəsi" fullWidth />
            </Grid>
          </Grid>
        </CardContent>

        {/* Müqavilə Vasitələri ve Email */}
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Select fullWidth defaultValue="" displayEmpty>
                <MenuItem value="" disabled>
                  Müqavilənin əlavə ediləcəyi vasitələr
                </MenuItem>
                <MenuItem value="whatsapp">WhatsApp</MenuItem>
                <MenuItem value="telegram">Telegram</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Email" fullWidth />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* İrəli ve Təstiqlə Butonları */}
      <Box textAlign="center" sx={{ mt: 4 }}>
        <Button onClick={() => setValue('2')} variant="contained" color="primary" sx={{ mr: 2 }}>
          İrəli
        </Button>
        <Button variant="contained" color="secondary">
          Təstiqlə
        </Button>
      </Box>
    </Box>
  );
};

export default TabIdentification;
