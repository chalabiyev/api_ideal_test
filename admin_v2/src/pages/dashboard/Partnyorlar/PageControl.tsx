import { Box, Button } from '@mui/material';
import React from 'react';
import { Iconify } from 'src/components/iconify';

const PageControl = ({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Button
        startIcon={<Iconify icon="carbon:arrow-left" />}
        onClick={() => {
          switch (value) {
            case '2':
              setValue('1');
              window.scrollTo(0, 0);
              break;
            case '3':
              window.scrollTo(0, 0);
              setValue('2');
              break;
          }
        }}
        disabled={value === '1'}
      >
        geri
      </Button>

      <Button
        color="inherit"
        endIcon={<Iconify icon="carbon:arrow-right" />}
        onClick={() => {
          switch (value) {
            case '1':
              window.scrollTo(0, 0);
              setValue('2');
              break;
            case '2':
              window.scrollTo(0, 0);
              setValue('3');
              break;
          }
        }}
        variant={value === 'bankInfo' ? 'contained' : 'outlined'}
        disabled={value === '3'}
      >
        irəli
      </Button>
    </Box>
  );
};

export default PageControl;
