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
} from '@mui/material';
import { CreditRequestDto } from 'src/types/CreditRequestDto';

const TabCreditDataPage = ({
  setValue,
  creditRequest,
  setCreditRequest
}: {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  creditRequest: CreditRequestDto;
  setCreditRequest: React.Dispatch<React.SetStateAction<CreditRequestDto>>;
}) => {

  const calculateMonthlyPayment = (): string => {
    if (!creditRequest || !creditRequest.creditAmount || !creditRequest.annualPercent || !creditRequest.creditTerm) return '0.00';

    // const principal = parseFloat(creditRequest.creditAmount);
    const monthlyRate = creditRequest.annualPercent / 100 / 12;
    const durationInMonths = parseInt(creditRequest.creditTerm.toString(), 10);

    if (monthlyRate === 0) {
      return (creditRequest.creditAmount / durationInMonths).toFixed(2);
    }

    const monthlyPayment =
      // eslint-disable-next-line
      (creditRequest.creditAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -durationInMonths));

    return monthlyPayment.toFixed(2);
  };

  const calculateTotalPayment = (): string => {
    return (parseFloat(calculateMonthlyPayment()) * creditRequest.creditTerm!).toFixed(2);
  };

  const calculateTotalInterest = (): string => {
    return (parseFloat(calculateTotalPayment()) - creditRequest.creditAmount!).toFixed(2);
  };

  const calculateCardAmount = (): string => {
    const principal = creditRequest.creditAmount || 0;
    const serviceCost = (principal * (creditRequest.serviceRate || 0)) / 100;
    const insuranceCost = (principal * (creditRequest.insuranceCost || 0)) / 100;

    const cardAmount = principal - serviceCost - insuranceCost - creditRequest.cartCost! - creditRequest.valuationCost!;

    return cardAmount.toFixed(2);
  };

  useEffect(() => {
    setCreditRequest({
      ...creditRequest,
      monthlyPayment: parseFloat(calculateMonthlyPayment()),
      amountToBePaid: parseFloat(calculateTotalPayment()),
      insuranceCost: parseFloat(calculateTotalInterest()),
      cartCost: parseFloat(calculateCardAmount())
    });
  }, [creditRequest.creditAmount, creditRequest.annualPercent, creditRequest.creditTerm, creditRequest.serviceRate, creditRequest.insuranceCost, creditRequest.cartCost, creditRequest.valuationCost]);

  return (
    <Box sx={{ py: 4 }}>
      {/* Başlıq */}
      <Typography variant="h5" gutterBottom>
        Kredit Ver
      </Typography>

      <Grid container spacing={4}>
        {/* Kredi Miktarı */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Kredit Miqdarı (AZN)"
            type="number"
            value={creditRequest.creditAmount}
            onChange={(e) => setCreditRequest({ ...creditRequest, creditAmount: parseFloat(e.target.value) })}
            fullWidth
          />
        </Grid>

        {/* Faiz Oranı */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="İllik Faiz Dərəcəsi (%)"
            type="number"
            value={creditRequest.annualPercent}
            onChange={(e) => setCreditRequest({ ...creditRequest, annualPercent: parseFloat(e.target.value) })}
            fullWidth
          />
        </Grid>

        {/* Kreditin Müddəti */}
        <Grid item xs={12}>
          <Typography gutterBottom>Kreditin Müddəti: {creditRequest.creditTerm} ay</Typography>
          <Slider
            value={creditRequest.creditTerm}
            onChange={(e, newValue) => setCreditRequest({ ...creditRequest, creditTerm: newValue as number })}
            valueLabelDisplay="auto"
            min={6}
            defaultValue={12}
            max={84}
          />
        </Grid>

        {/* Xidmət Haqqı */}
        <Grid item xs={12}>
          <Typography gutterBottom>Xidmət haqqı: {creditRequest.serviceRate} %</Typography>
          <Slider
            value={creditRequest.serviceRate}
            onChange={(e, newValue) => setCreditRequest({ ...creditRequest, serviceRate: newValue as number })}
            valueLabelDisplay="auto"
            min={0.1}
            max={50}
            step={0.1}
            defaultValue={1.5}
          />
        </Grid>

        {/* Kart Xərci */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Kart Xərci (AZN)"
            type="number"
            value={creditRequest.cartCost}
            onChange={(e) => setCreditRequest({ ...creditRequest, cartCost: parseFloat(e.target.value) })}
            fullWidth
          />
        </Grid>

        {/* Qiymətləndirmə Xərci */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Qiymətləndirmə Xərci (AZN)"
            type="number"
            value={creditRequest.valuationCost}
            onChange={(e) => setCreditRequest({ ...creditRequest, valuationCost: parseFloat(e.target.value) })}
            fullWidth
          />
        </Grid>

        {/* Sığorta Xərci */}
        <Grid item xs={12}>
          <Typography gutterBottom>Sığorta xərci: {creditRequest.insuranceCost} %</Typography>
          <Slider
            value={creditRequest.insuranceCost}
            onChange={(e, newValue) => setCreditRequest({ ...creditRequest, insuranceCost: newValue as number })}
            valueLabelDisplay="auto"
            min={0.1}
            max={10}
            step={0.1}
            defaultValue={1}
          />
        </Grid>

        {/* Aylıq Ödəniş */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Aylıq Ödəniş (AZN)"
            value={creditRequest.monthlyPayment}
            fullWidth
            disabled
          />
        </Grid>

        {/* Cəmi Ödəniş */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Cəmi Ödəniləcək Məbləğ (AZN)"
            value={creditRequest.amountToBePaid}
            fullWidth
            disabled
          />
        </Grid>

        {/* Karta Gedən Məbləğ */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Karta Gedən Məbləğ (AZN)"
            value={creditRequest.cartCost}
            fullWidth
            disabled
          />
        </Grid>

        {/* Məqsəd */}
        <Grid item xs={12}>
          <TextField
            label="Krediti almaq üçün məqsəd"
            multiline
            rows={4}
            value={creditRequest.creditPurpose}
            onChange={(e) => setCreditRequest({ ...creditRequest, creditPurpose: e.target.value })}
            fullWidth
          />
        </Grid>

        {/* Qərar Sorğusu */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={creditRequest.decisionQueryEnabled}
                onChange={() => setCreditRequest({ ...creditRequest, decisionQueryEnabled: !creditRequest.decisionQueryEnabled })}
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
        <Button
          onClick={() => {
            window.scrollTo(0, 0);
            setValue('7');
          }}
          variant="contained"
          color="primary"
        >
          İrəli
        </Button>
      </Box>
    </Box>
  );
};

export default TabCreditDataPage;
