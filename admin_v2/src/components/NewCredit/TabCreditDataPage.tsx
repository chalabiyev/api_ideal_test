import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Slider,
  Switch,
  FormControlLabel,
  Button,
} from '@mui/material';

const TabCreditDataPage = ({ setValue }: { setValue: React.Dispatch<React.SetStateAction<string>> }) => {
  const [creditAmount, setCreditAmount] = useState<string>('');
  const [annualInterestRate, setAnnualInterestRate] = useState<string>('');
  const [creditDuration, setCreditDuration] = useState<number>(6);
  const [isDecisionQueryEnabled, setIsDecisionQueryEnabled] = useState<boolean>(false);

  const calculateMonthlyPayment = (): string => {
    if (!creditAmount || !annualInterestRate || !creditDuration) return '0.00';

    const principal = parseFloat(creditAmount);
    const monthlyRate = parseFloat(annualInterestRate) / 100 / 12;
    const durationInMonths = parseInt(creditDuration.toString(), 10);

    if (monthlyRate === 0) {
      return (principal / durationInMonths).toFixed(2);
    }

    const monthlyPayment =
      // eslint-disable-next-line
      (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -durationInMonths));

    return monthlyPayment.toFixed(2);
  };

  // eslint-disable-next-line
  const calculateTotalPayment = (): string => {
    return (parseFloat(calculateMonthlyPayment()) * creditDuration).toFixed(2);
  };

  // eslint-disable-next-line
  const calculateTotalInterest = (): string => {
    return (parseFloat(calculateTotalPayment()) - parseFloat(creditAmount)).toFixed(2);
  };

  return (
    <Box sx={{ py: 4 }}>
      {/* Başlık */}
      <Typography variant="h5" gutterBottom>
        Kredit Ver
      </Typography>

      <Grid container spacing={4}>
        {/* Kredi Miktarı */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Kredit Miqdarı (AZN)"
            type="number"
            value={creditAmount}
            onChange={(e) => setCreditAmount(e.target.value)}
            fullWidth
          />
        </Grid>

        {/* Faiz Oranı */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="İllik Faiz Dərəcəsi (%)"
            type="number"
            value={annualInterestRate}
            onChange={(e) => setAnnualInterestRate(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>Kreditin Müddəti: {creditDuration} ay</Typography>
          <Slider
            value={creditDuration}
            onChange={(e, newValue) => setCreditDuration(newValue as number)}
            valueLabelDisplay="auto"
            min={6}
            max={84}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Aylıq Ödəniş (AZN)"
            value={calculateMonthlyPayment()}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Cəmi Ödəniləcək Məbləğ (AZN)"
            value={calculateTotalPayment()}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Cəmi Faiz (AZN)" value={calculateTotalInterest()} fullWidth disabled />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={isDecisionQueryEnabled}
                onChange={() => setIsDecisionQueryEnabled((prev) => !prev)}
              />
            }
            label="Qərar üçün sorğu göndər"
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth>
            Kredit Təsdiqlə
          </Button>
        </Grid>
      </Grid>
      <Box textAlign="center" sx={{ mt: 4 }}>
        <Button
          onClick={() => {
            window.scrollTo(0, 0);
            setValue('5');
          }}
          variant="contained"
          color="error"
          sx={{ mr: 2 }}
        >
          Geri
        </Button>
      </Box>
    </Box>
  );
};

export default TabCreditDataPage;
