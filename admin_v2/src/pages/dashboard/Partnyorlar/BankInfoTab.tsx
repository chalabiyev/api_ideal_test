import React from 'react';
import { Grid, TextField, Box, Button } from '@mui/material';

export default function BankInfoTab() {
  return (
    <Box>
      <Grid container spacing={3}>
        {/* VÖEN */}
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="VÖEN" placeholder="VÖEN daxil edin" />
        </Grid>

        {/* Bank */}
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Bank" placeholder="Bank adı daxil edin" />
        </Grid>

        {/* Müştəri Hesabı */}
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Müştəri Hesabı" placeholder="Müştəri Hesabını daxil edin" />
        </Grid>

        {/* Müxbir Hesab */}
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Müxbir Hesab" placeholder="Müxbir Hesabını daxil edin" />
        </Grid>

        {/* Kod */}
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Kod" placeholder="Bank kodunu daxil edin" />
        </Grid>

        {/* Bank VÖEN */}
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Bank VÖEN" placeholder="Bank VÖEN-ni daxil edin" />
        </Grid>

        {/* S.W.I.F.T. */}
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="S.W.I.F.T." placeholder="S.W.I.F.T. kodunu daxil edin" />
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'right', mt: 3, width: '100%' }}>
        <Button sx={{ width: '100%' }} variant="outlined" color="success">
          Yadda Saxla
        </Button>
      </Box>
    </Box>
  );
}
