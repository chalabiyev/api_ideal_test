import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Slider,
  Switch,
  FormControlLabel,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { CreditRequestDto } from 'src/types/CreditRequestDto';

const TabCreditDataPage = ({
  setValue,
  creditRequest,
  setCreditRequest,
}: {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  creditRequest: CreditRequestDto;
  setCreditRequest: React.Dispatch<React.SetStateAction<CreditRequestDto>>;
}) => {
  const calculateCreditAmount = (cashPrice: number, term: number) => {
    const rates = {
      3: 7.52,
      6: 13.7,
      9: 19.1,
      12: 25,
      15: 30,
      18: 34.5,
      24: 40,
    };
    const rate = rates[term as keyof typeof rates] || 0;
    return cashPrice + (cashPrice * rate) / 100;
  };

  return (
    <Box sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ marginBottom: '20px' }}>
            Qaimə məlumatları
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {/* Mağaza adı */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Partnyor mağaza"
            fullWidth
            value={creditRequest?.creditDetails?.storeName || ''}
            disabled
          />
        </Grid>

        {/* Əməliyyat növü */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Əməliyyat növü</InputLabel>
            <Select
              value={creditRequest?.creditDetails?.operationType || ''}
              label="Əməliyyat növü"
              disabled
            >
              <MenuItem value="məhsul">Məhsul</MenuItem>
              <MenuItem value="xidmət">Xidmət</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Məhsulun adı */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Məhsulun adı"
            fullWidth
            value={creditRequest?.creditDetails?.productName || ''}
            disabled
          />
        </Grid>

        {/* Kreditin müddəti */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Kreditin müddəti</InputLabel>
            <Select
              value={creditRequest?.creditDetails?.creditTerm || 0}
              label="Kreditin müddəti"
              disabled
            >
              <MenuItem value={3}>3 ay</MenuItem>
              <MenuItem value={6}>6 ay</MenuItem>
              <MenuItem value={9}>9 ay</MenuItem>
              <MenuItem value={12}>12 ay</MenuItem>
              <MenuItem value={15}>15 ay</MenuItem>
              <MenuItem value={18}>18 ay</MenuItem>
              <MenuItem value={24}>24 ay</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Nağd alış qiyməti */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nağd alış qiyməti (AZN)"
            type="number"
            fullWidth
            value={creditRequest?.creditDetails?.cashPrice || 0}
            disabled
          />
        </Grid>

        {/* Kreditin məbləği */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Kreditin məbləği (AZN)"
            type="number"
            fullWidth
            value={creditRequest?.creditDetails?.creditAmount || 0}
            disabled
          />
        </Grid>

        {/* Mövcud kredit məlumatları */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Kredit Ver
          </Typography>
        </Grid>

        {/* Məhsul Kateqoriyası */}
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Məhsulun kateqoriyası"
            name="category"
            fullWidth
            value={creditRequest?.creditDetails?.category || ''}
            onChange={(e) =>
              setCreditRequest({
                ...creditRequest,
                creditDetails: {
                  ...creditRequest.creditDetails,
                  category: e.target.value,
                },
              })
            }
            SelectProps={{
              native: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          >
            <option value="aksesuar">Aksesuar</option>
            <option value="avtomobil">Avtomobil</option>
            <option value="digər">Digər</option>
            <option value="ev">Ev</option>
            <option value="idman">İdman və həvəskar</option>
            <option value="kitab">Kitab və ofis ləvazimatları</option>
            <option value="texnika">Məişət texnikası</option>
            <option value="mebel">Mebel</option>
            <option value="oyuncaq">Oyuncaq və hobbi</option>
            <option value="telefon">Telefon və planşet</option>
            <option value="komputer">Komputer və laptop</option>
            <option value="saat">Saat və zərgərlik</option>
            <option value="uşaq">Uşaq məhsulları</option>
            <option value="kosmetika">Kosmetika və parfümeriya</option>
            <option value="paltar">Paltar və ayaqqabı</option>
          </TextField>
        </Grid>

        {/* Detallı Məlumat */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Detallı məlumat"
            fullWidth
            placeholder="Məsələn: Avtomobil hissəsi, model, marka və s."
            value={creditRequest?.creditDetails?.detail || ''}
            onChange={(e) =>
              setCreditRequest({
                ...creditRequest,
                creditDetails: {
                  ...creditRequest.creditDetails,
                  detail: e.target.value,
                },
              })
            }
          />
        </Grid>

        {/* Kredi Miktarı */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Kredit Miqdarı (AZN)"
            fullWidth
            value={
              creditRequest?.creditDetails?.creditAmountInput === 0
                ? ''
                : creditRequest?.creditDetails?.creditAmountInput || ''
            }
            onChange={({ target: { value } }) => {
              if (value === '' || /^\d*$/.test(value)) {
                setCreditRequest({
                  ...creditRequest,
                  creditDetails: {
                    ...creditRequest.creditDetails,
                    creditAmountInput: value === '' ? null : Number(value),
                  },
                });
              }
            }}
          />
        </Grid>

        {/* Faiz Oranı */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="İllik Faiz Dərəcəsi (%)"
            fullWidth
            value={
              creditRequest?.creditDetails?.annualPercent === 0
                ? ''
                : creditRequest?.creditDetails?.annualPercent || ''
            }
            onChange={({ target: { value } }) => {
              if (value === '' || /^\d*$/.test(value)) {
                setCreditRequest({
                  ...creditRequest,
                  creditDetails: {
                    ...creditRequest.creditDetails,
                    annualPercent: value === '' ? null : Number(value),
                  },
                });
              }
            }}
          />
        </Grid>

        {/* Kreditin Müddəti */}
        <Grid item xs={12}>
          <Typography gutterBottom>
            Kreditin Müddəti: {creditRequest?.creditDetails?.creditTerm || 0} ay
          </Typography>
          <Slider
            valueLabelDisplay="auto"
            min={3}
            value={creditRequest?.creditDetails?.creditTerm || 12}
            step={3}
            max={18}
            onChange={(_, value) =>
              setCreditRequest({
                ...creditRequest,
                creditDetails: {
                  ...creditRequest.creditDetails,
                  creditTerm: value as number,
                  creditAmount: calculateCreditAmount(
                    creditRequest?.creditDetails?.cashPrice || 0,
                    value as number)
                },
              })
            }
          />
        </Grid>

        {/* Xidmət Haqqı */}
        <Grid item xs={12}>
          <Typography gutterBottom>
            Xidmət haqqı: {creditRequest?.creditDetails?.serviceRate || 0} %
          </Typography>
          <Slider
            valueLabelDisplay="auto"
            min={0.1}
            max={50}
            step={0.1}
            value={creditRequest?.creditDetails?.serviceRate || 1.5}
            onChange={(_, value) =>
              setCreditRequest({
                ...creditRequest,
                creditDetails: {
                  ...creditRequest.creditDetails,
                  serviceRate: value as number,
                },
              })
            }
          />
        </Grid>

        {/* Kart Xərci */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Kart Xərci (AZN)"
            fullWidth
            value={
              creditRequest?.creditDetails?.cardCost === 0
                ? ''
                : creditRequest?.creditDetails?.cardCost || ''
            }
            onChange={({ target: { value } }) => {
              if (value === '' || /^\d*$/.test(value)) {
                setCreditRequest({
                  ...creditRequest,
                  creditDetails: {
                    ...creditRequest.creditDetails,
                    cardCost: value === '' ? null : Number(value),
                  },
                });
              }
            }}
          />
        </Grid>

        {/* Qiymətləndirmə Xərci */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Qiymətləndirmə Xərci (AZN)"
            fullWidth
            value={
              creditRequest?.creditDetails?.valuationCost === 0
                ? ''
                : creditRequest?.creditDetails?.valuationCost || ''
            }
            onChange={({ target: { value } }) => {
              if (value === '' || /^\d*$/.test(value)) {
                setCreditRequest({
                  ...creditRequest,
                  creditDetails: {
                    ...creditRequest.creditDetails,
                    valuationCost: value === '' ? null : Number(value),
                  },
                });
              }
            }}
          />
        </Grid>

        {/* Sığorta Xərci */}
        <Grid item xs={12}>
          <Typography gutterBottom>
            Sığorta xərci: {creditRequest?.creditDetails?.insuranceCost || 0} %
          </Typography>
          <Slider
            valueLabelDisplay="auto"
            min={0.1}
            max={10}
            step={0.1}
            value={creditRequest?.creditDetails?.insuranceCost || 1}
            onChange={(_, value) =>
              setCreditRequest({
                ...creditRequest,
                creditDetails: {
                  ...creditRequest.creditDetails,
                  insuranceCost: value as number,
                },
              })
            }
          />
        </Grid>

        {/* Aylıq Ödəniş */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Aylıq Ödəniş (AZN)"
            fullWidth
            value={
              creditRequest?.creditDetails?.monthlyPayment === 0
                ? ''
                : creditRequest?.creditDetails?.monthlyPayment || ''
            }
            onChange={({ target: { value } }) => {
              if (value === '' || /^\d*$/.test(value)) {
                setCreditRequest({
                  ...creditRequest,
                  creditDetails: {
                    ...creditRequest.creditDetails,
                    monthlyPayment: value === '' ? null : Number(value),
                  },
                });
              }
            }}
          />
        </Grid>

        {/* Cəmi Ödəniş */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Cəmi Ödəniləcək Məbləğ (AZN)"
            fullWidth
            value={
              creditRequest?.creditDetails?.totalPayment === 0
                ? ''
                : creditRequest?.creditDetails?.totalPayment || ''
            }
            onChange={({ target: { value } }) => {
              if (value === '' || /^\d*$/.test(value)) {
                setCreditRequest({
                  ...creditRequest,
                  creditDetails: {
                    ...creditRequest.creditDetails,
                    totalPayment: value === '' ? null : Number(value),
                  },
                });
              }
            }}
          />
        </Grid>

        {/* Məqsəd */}
        <Grid item xs={12}>
          <TextField
            label="Krediti almaq üçün məqsəd"
            multiline
            rows={4}
            value={creditRequest?.creditDetails?.creditPurpose || ''}
            onChange={(e) =>
              setCreditRequest({
                ...creditRequest,
                creditDetails: {
                  ...creditRequest.creditDetails,
                  creditPurpose: e.target.value,
                },
              })
            }
            fullWidth
          />
        </Grid>

        {/* Qərar Sorğusu */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={creditRequest?.creditDetails?.decisionQueryEnabled || false}
                onChange={() =>
                  setCreditRequest({
                    ...creditRequest,
                    creditDetails: {
                      ...creditRequest.creditDetails,
                      decisionQueryEnabled: !creditRequest.creditDetails?.decisionQueryEnabled,
                    },
                  })
                }
              />
            }
            label="Qərar üçün sorğu göndər"
          />
        </Grid>

        {/* Nəzarət Düymələri */}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth>
            Kredit Təsdiqlə
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TabCreditDataPage;
