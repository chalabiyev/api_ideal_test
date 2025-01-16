import React from 'react';
import { Box, Card, CardContent, Grid, TextField, Typography, Button } from '@mui/material';
import { RecruiterDataType } from 'src/pages/dashboard/VideoMuraciet/types';
import { CreditRequestDto } from 'src/types/CreditRequestDto';

const RecruiterData = ({
  setValue,
  creditRequest,
  setCreditRequest,
}: {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  creditRequest: CreditRequestDto;
  setCreditRequest: React.Dispatch<React.SetStateAction<CreditRequestDto>>;
}) => {
  const handleChange = (key: keyof RecruiterDataType, value: any) => {
    setCreditRequest((prev) => ({ ...prev, recruiter: { ...prev.recruiter, [key]: value } }));
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
                value={creditRequest.recruiter.education}
                onChange={(e) => handleChange('education', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="İşlədiyi yerin hüquqi adı"
                fullWidth
                value={creditRequest.recruiter.companyName}
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
                value={creditRequest.recruiter.salary}
                onChange={(e) => handleChange('salary', parseFloat(e.target.value))}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="İşlədiyi yerin ünvanı"
                fullWidth
                value={creditRequest.recruiter.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Tutduğu vəzifə"
                fullWidth
                value={creditRequest.recruiter.position}
                onChange={(e) => handleChange('position', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Staj"
                fullWidth
                value={creditRequest.recruiter.workExperience}
                onChange={(e) => handleChange('workExperience', parseFloat(e.target.value))}
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
                value={creditRequest.recruiter.ayliqemekhaqqi}
                onChange={(e) => handleChange('ayliqemekhaqqi', parseFloat(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Aylıq cəmi gəlirlərin məbləği"
                fullWidth
                value={creditRequest.recruiter.ayliqcemigelir}
                onChange={(e) => handleChange('ayliqcemigelir', parseFloat(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Xərclərin cəmi"
                fullWidth
                value={creditRequest.recruiter.xerclerincemi}
                onChange={(e) => handleChange('xerclerincemi', parseFloat(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Xalis gəlir (İxrac)"
                fullWidth
                value={creditRequest.recruiter.xalisgelir}
                onChange={(e) => handleChange('xalisgelir', parseFloat(e.target.value))}
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
                value={creditRequest.recruiter.contractStartDate}
                onChange={(e) => handleChange('contractStartDate', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Müddətli əmək müqaviləsinin qurtardığı tarix"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={creditRequest.recruiter.contractEndDate}
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
                value={creditRequest.recruiter.toplamodenis}
                onChange={(e) => handleChange('toplamodenis', parseFloat(e.target.value))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="AKB məlumatlarına əsasən"
                fullWidth
                variant="outlined"
                value={creditRequest.recruiter.akbmelumatlari}
                onChange={(e) => handleChange('akbmelumatlari', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Daxili risk sistemi üzrə"
                fullWidth
                variant="outlined"
                value={creditRequest.recruiter.daxilirisk}
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
