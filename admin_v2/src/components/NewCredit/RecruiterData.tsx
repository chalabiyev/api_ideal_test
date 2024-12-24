import React from 'react';
import { Box, Card, CardContent, Grid, TextField, Typography, Button } from '@mui/material';
import { RecruiterDataType } from 'src/pages/dashboard/VideoMuraciet/types';

const RecruiterData = ({
  setValue,
  recruiterData,
  setRecruiterData,
}: {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  recruiterData: RecruiterDataType;
  setRecruiterData: React.Dispatch<React.SetStateAction<RecruiterDataType>>;
}) => {
  const handleChange = (key: keyof RecruiterDataType, value: string) => {
    setRecruiterData((prev) => ({ ...prev, [key]: value }));
  };
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
              <TextField
                label="Təhsili"
                fullWidth
                value={recruiterData.education}
                onChange={(e) => handleChange('education', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="İşlədiyi yerin hüquqi adı"
                fullWidth
                value={recruiterData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
              />
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
              <TextField
                label="İşçinin aylıq əmək haqqı (manatla)"
                value={recruiterData.salary}
                onChange={(e) => handleChange('salary', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="İşlədiyi yerin ünvanı"
                fullWidth
                value={recruiterData.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Tutduğu vəzifə"
                fullWidth
                value={recruiterData.position}
                onChange={(e) => handleChange('position', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Staj"
                fullWidth
                value={recruiterData.workExperience}
                onChange={(e) => handleChange('workExperience', e.target.value)}
              />
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
              <TextField
                label="Aylıq əmək haqqı"
                fullWidth
                value={recruiterData.ayliqemekhaqqi}
                onChange={(e) => handleChange('ayliqemekhaqqi', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Aylıq cəmi gəlirlərin məbləği"
                fullWidth
                value={recruiterData.ayliqcemigelir}
                onChange={(e) => handleChange('ayliqcemigelir', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Xərclərin cəmi"
                fullWidth
                value={recruiterData.xerclerincemi}
                onChange={(e) => handleChange('xerclerincemi', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Xalis gəlir (İxrac)"
                fullWidth
                value={recruiterData.xalisgelir}
                onChange={(e) => handleChange('xalisgelir', e.target.value)}
              />
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
                value={recruiterData.contractStartDate}
                onChange={(e) => handleChange('contractStartDate', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Müddətli əmək müqaviləsinin qurtardığı tarix"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={recruiterData.contractEndDate}
                onChange={(e) => handleChange('contractEndDate', e.target.value)}
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
              <TextField
                label="Toplam ödənişin yekun məbləği"
                fullWidth
                variant="outlined"
                value={recruiterData.toplamodenis}
                onChange={(e) => handleChange('toplamodenis', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="AKB məlumatlarına əsasən"
                fullWidth
                variant="outlined"
                value={recruiterData.akbmelumatlari}
                onChange={(e) => handleChange('akbmelumatlari', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Daxili risk sistemi üzrə"
                fullWidth
                variant="outlined"
                value={recruiterData.daxilirisk}
                onChange={(e) => handleChange('daxilirisk', e.target.value)}
              />
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
