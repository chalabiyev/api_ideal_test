import React from 'react';
import { Grid, TextField, Box, Button } from '@mui/material';

export default function BankInfoTab({
  partnerData,
  setPartnerData,
}: {
  partnerData: any;
  setPartnerData: React.Dispatch<React.SetStateAction<any>>;
}) {
  const handlePartnerDataChange = (key: any, value: any) => {
    setPartnerData((prev: any) => ({ ...prev, [key]: value }));
  };
  return (
    <Box>
      <Grid container spacing={3}>
        {/* VÖEN */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="VÖEN"
            value={partnerData?.voen || ''}
            onChange={(e) => {
              const { value } = e.target;
              if (/^\d*$/.test(value)) {
                handlePartnerDataChange('voen', value);
              }
            }}
          />
        </Grid>

        {/* Bank */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Bank və filial"
            placeholder="Bank və filialını daxil edin"
            value={partnerData?.bank || ''}
            onChange={(e) => handlePartnerDataChange('bank', e.target.value.toUpperCase())}
          />
        </Grid>

        {/* Müştəri Hesabı */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Müştəri Hesabı"
            placeholder="Müştəri Hesabını daxil edin"
            value={partnerData?.clientBankAccount?.toUpperCase() || ''}
            onChange={(e) =>
              handlePartnerDataChange('clientBankAccount', e.target.value.toUpperCase())
            }
          />
        </Grid>

        {/* Müxbir Hesab */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Müxbir Hesab"
            placeholder="Müxbir Hesabını daxil edin"
            value={partnerData?.reportBankAccount?.toUpperCase()}
            onChange={(e) =>
              handlePartnerDataChange('reportBankAccount', e.target.value.toUpperCase())
            }
          />
        </Grid>

        {/* Kod */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Kod"
            value={partnerData?.bankCode || ''}
            onChange={(e) => {
              const { value } = e.target;
              if (/^\d*$/.test(value)) {
                handlePartnerDataChange('bankCode', value.toUpperCase());
              }
            }}
          />
        </Grid>

        {/* Bank VÖEN */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Bank VÖEN"
            value={partnerData?.bankVoen || ''}
            onChange={(e) => {
              const { value } = e.target;
              if (/^\d*$/.test(value)) {
                handlePartnerDataChange('bankVoen', value.toUpperCase());
              }
            }}
          />
        </Grid>

        {/* S.W.I.F.T. */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="S.W.I.F.T."
            placeholder="S.W.I.F.T. kodunu daxil edin"
            value={partnerData?.swiftCode?.toUpperCase()}
            onChange={(e) => handlePartnerDataChange('swiftCode', e.target.value.toUpperCase())}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
