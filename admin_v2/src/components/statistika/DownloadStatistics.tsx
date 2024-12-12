import React from 'react';
import { Grid, TextField, MenuItem, Button } from '@mui/material';
import { Icon } from '@iconify/react';

const DownloadStatistics = () => {
  const years = Array.from({ length: 2024 - 2010 + 1 }, (_, i) => 2010 + i); // 2010-2024 arası yıllar
  const months = [
    'Yanvar',
    'Fevral',
    'Mart',
    'Aprel',
    'May',
    'İyun',
    'İyul',
    'Avqust',
    'Sentyabr',
    'Oktyabr',
    'Noyabr',
    'Dekabr',
  ];
  const channels = ['Call Center', 'Sayt', 'Partnyor mənbəsi', 'Video zəng'];
  const products = ['Məhsul 1', 'Məhsul 2'];

  return (
    <Grid container spacing={2} sx={{ mb: 5 }}>
      {/* İlk input: Yıllar */}
      <Grid item xs={12} sm={6} md={2.4}>
        <TextField label="İl" select fullWidth>
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* İkinci input: Aylar */}
      <Grid item xs={12} sm={6} md={2.4}>
        <TextField label="Ay" select fullWidth>
          {months.map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* Üçüncü input: Kanal */}
      <Grid item xs={12} sm={6} md={2.4}>
        <TextField label="Kanal" select fullWidth>
          {channels.map((channel) => (
            <MenuItem key={channel} value={channel}>
              {channel}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* Dördüncü input: Məhsul */}
      <Grid item xs={12} sm={6} md={2.4}>
        <TextField label="Məhsul" select fullWidth>
          {products.map((product) => (
            <MenuItem key={product} value={product}>
              {product}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* Beşinci grid: Yükleme butonu */}
      <Grid item xs={12} sm={6} md={2.4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<Icon icon="mdi:download" />}
          fullWidth
        >
          Yüklə
        </Button>
      </Grid>
    </Grid>
  );
};

export default DownloadStatistics;
