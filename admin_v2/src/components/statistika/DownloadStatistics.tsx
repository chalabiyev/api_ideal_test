import React, { useState } from 'react';
import { Grid, TextField, MenuItem, Button } from '@mui/material';
import { Icon } from '@iconify/react';

const DownloadStatistics = () => {
  // Yıllar, aylar, kanallar ve məhsullar için veriler
  const years = Array.from({ length: 2024 - 2010 + 1 }, (_, i) => `${2010 + i}`);
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

  // State'ler
  const [year, setYear] = useState(years[0]); // İlk yıl varsayılan seçili
  const [month, setMonth] = useState(months[0]); // İlk ay varsayılan seçili
  const [channel, setChannel] = useState(channels[0]); // İlk kanal varsayılan seçili
  const [product, setProduct] = useState(products[0]); // İlk məhsul varsayılan seçili

  return (
    <Grid container spacing={2} sx={{ mb: 5 }}>
      {/* İlk input: Yıllar */}
      <Grid item xs={12} sm={6} md={2.4}>
        <TextField
          label="İl"
          select
          fullWidth
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* İkinci input: Aylar */}
      <Grid item xs={12} sm={6} md={2.4}>
        <TextField
          label="Ay"
          select
          fullWidth
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          {months.map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* Üçüncü input: Kanal */}
      <Grid item xs={12} sm={6} md={2.4}>
        <TextField
          label="Kanal"
          select
          fullWidth
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
        >
          {channels.map((channel) => (
            <MenuItem key={channel} value={channel}>
              {channel}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* Dördüncü input: Məhsul */}
      <Grid item xs={12} sm={6} md={2.4}>
        <TextField
          label="Məhsul"
          select
          fullWidth
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        >
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
          onClick={() =>
            console.log(`Seçili Yıl: ${year}, Ay: ${month}, Kanal: ${channel}, Məhsul: ${product}`)
          }
        >
          Yüklə
        </Button>
      </Grid>
    </Grid>
  );
};

export default DownloadStatistics;
