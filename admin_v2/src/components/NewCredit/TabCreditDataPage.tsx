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
import { CreditRequest } from 'src/types/CreditRequest';

const TabCreditDataPage = ({
  setValue,
  creditAmount,
  creditDuration,
  setCreditAmount,
  setCreditDuration,
  creditRequest,
  setCreditRequest
}: {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  creditAmount: number;
  creditDuration: number;
  setCreditAmount: React.Dispatch<React.SetStateAction<number>>;
  setCreditDuration: React.Dispatch<React.SetStateAction<number>>;
  creditRequest: CreditRequest;
  setCreditRequest: React.Dispatch<React.SetStateAction<CreditRequest>>;
}) => {
  // const [creditAmount, setCreditAmount] = useState<string>('');
  const [serviceFee, setServiceFee] = useState<number>(1.5);
  const [annualInterestRate, setAnnualInterestRate] = useState<string>('');
  // const [creditDuration, setCreditDuration] = useState<number>(12);
  const [cardCost, setCardCost] = useState<number>(10);
  const [valuationFee, setValuationFee] = useState<number>(20);
  const [insuranceFee, setInsuranceFee] = useState<number>(1);
  const [purpose, setPurpose] = useState<string>('');
  const [isDecisionQueryEnabled, setIsDecisionQueryEnabled] = useState<boolean>(false);

  const calculateMonthlyPayment = (): string => {
    if (!creditAmount || !annualInterestRate || !creditDuration) return '0.00';

    // const principal = parseFloat(creditAmount);
    const monthlyRate = parseFloat(annualInterestRate) / 100 / 12;
    const durationInMonths = parseInt(creditDuration.toString(), 10);

    if (monthlyRate === 0) {
      return (creditAmount / durationInMonths).toFixed(2);
    }

    const monthlyPayment =
      // eslint-disable-next-line
      (creditAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -durationInMonths));

    return monthlyPayment.toFixed(2);
  };

  const calculateTotalPayment = (): string => {
    return (parseFloat(calculateMonthlyPayment()) * creditDuration).toFixed(2);
  };

  const calculateTotalInterest = (): string => {
    return (parseFloat(calculateTotalPayment()) - creditAmount).toFixed(2);
  };

  const calculateCardAmount = (): string => {
    const principal = creditAmount || 0;
    const serviceCost = (principal * serviceFee) / 100;
    const insuranceCost = (principal * insuranceFee) / 100;

    const cardAmount = principal - serviceCost - insuranceCost - cardCost - valuationFee;

    return cardAmount.toFixed(2);
  };

  useEffect(() => {
    setCreditRequest({
      ...creditRequest,
      creditAmount: creditAmount,
      creditTerm: creditDuration,
      annualPercent: parseFloat(annualInterestRate),
      serviceRate: serviceFee,
      cartCost: cardCost,
      valuationCost: valuationFee,
      insuranceCost: insuranceFee,
      monthlyPayment: parseFloat(calculateMonthlyPayment()),
      amountToBePaid: parseFloat(calculateTotalPayment()),
      creditPurpose: purpose
    });
  }, [creditAmount, creditDuration, serviceFee, cardCost, purpose, valuationFee, insuranceFee]);

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
            value={creditAmount}
            onChange={(e) => setCreditAmount(parseFloat(e.target.value))}
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

        {/* Kreditin Müddəti */}
        <Grid item xs={12}>
          <Typography gutterBottom>Kreditin Müddəti: {creditDuration} ay</Typography>
          <Slider
            value={creditDuration}
            onChange={(e, newValue) => setCreditDuration(newValue as number)}
            valueLabelDisplay="auto"
            min={6}
            defaultValue={12}
            max={84}
          />
        </Grid>

        {/* Xidmət Haqqı */}
        <Grid item xs={12}>
          <Typography gutterBottom>Xidmət haqqı: {serviceFee} %</Typography>
          <Slider
            value={serviceFee}
            onChange={(e, newValue) => setServiceFee(newValue as number)}
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
            value={cardCost}
            onChange={(e) => setCardCost(Number(e.target.value))}
            fullWidth
          />
        </Grid>

        {/* Qiymətləndirmə Xərci */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Qiymətləndirmə Xərci (AZN)"
            type="number"
            value={valuationFee}
            onChange={(e) => setValuationFee(Number(e.target.value))}
            fullWidth
          />
        </Grid>

        {/* Sığorta Xərci */}
        <Grid item xs={12}>
          <Typography gutterBottom>Sığorta xərci: {insuranceFee} %</Typography>
          <Slider
            value={insuranceFee}
            onChange={(e, newValue) => setInsuranceFee(newValue as number)}
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
            value={calculateMonthlyPayment()}
            fullWidth
            disabled
          />
        </Grid>

        {/* Cəmi Ödəniş */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Cəmi Ödəniləcək Məbləğ (AZN)"
            value={calculateTotalPayment()}
            fullWidth
            disabled
          />
        </Grid>

        {/* Karta Gedən Məbləğ */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Karta Gedən Məbləğ (AZN)"
            value={calculateCardAmount()}
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
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            fullWidth
          />
        </Grid>

        {/* Qərar Sorğusu */}
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
