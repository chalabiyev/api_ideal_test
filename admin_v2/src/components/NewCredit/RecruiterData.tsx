import React from 'react';
import { Box, Card, CardContent, Grid, TextField, Typography, Button } from '@mui/material';

const RecruiterData = ({
  setValue,
}: {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  // eslint-disable-next-line
}) => {
  return (
    <Box sx={{ py: 4 }}>
      {/* Başlık */}
      <Typography variant="h5" gutterBottom>
        İşəgötürən barədə məlumatlar
      </Typography>

      {/* Təhsil və Hüquqi Adı */}
      <Card sx={{ mb: 3, p: 2 }}>
        <CardContent>
          {/* <Typography variant="subtitle1" gutterBottom>
            fdsfsd
          </Typography> */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Təhsili" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="İşlədiyi yerin hüquqi adı" fullWidth />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* İş yeri və əmək haqqı */}
      <Card sx={{ mb: 3, p: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            İş Yeri Məlumatları
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="İşçinin aylıq əmək haqqı (manatla)" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="İşlədiyi yerin ünvanı" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Tutduğu vəzifə" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Staj" fullWidth />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Maliyyə Məlumatları */}
      <Card sx={{ mb: 3, p: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Maliyyə Məlumatları
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Aylıq əmək haqqı" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Aylıq cəmi gəlirlərin məbləği" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Xərclərin cəmi" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Xalis gəlir (İxrac)" fullWidth />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Əmək Müqaviləsi Tarixləri */}
      <Card sx={{ mb: 3, p: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Əmək Müqaviləsi Tarixləri
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Əmək müqaviləsinin bağlandığı tarix"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Müddətli əmək müqaviləsinin qurtardığı tarix"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Yekun Məlumatlar */}
      <Card sx={{ mb: 3, p: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Yekun Məlumatlar
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Toplam ödənişin yekun məbləği" fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField label="AKB məlumatlarına əsasən" fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Daxili risk sistemi üzrə" fullWidth variant="outlined" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* İrəli və Təstiqlə Butonları */}
      <Box textAlign="center" sx={{ mt: 4 }}>
        <Button
          onClick={() => {
            window.scrollTo(0, 0);
            setValue('1');
          }}
          variant="contained"
          color="error"
          sx={{ mr: 2 }}
        >
          Geri
        </Button>
        <Button
          onClick={() => {
            window.scrollTo(0, 0);
            setValue('3');
          }}
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
        >
          İrəli
        </Button>
        <Button variant="contained" color="success">
          Təstiqlə
        </Button>
      </Box>
    </Box>
  );
};

export default RecruiterData;
