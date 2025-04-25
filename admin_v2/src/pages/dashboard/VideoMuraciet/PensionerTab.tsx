import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CreditRequest } from 'src/types/CreditRequestDto';
import { PensionerInfoResponse } from 'src/pages/dashboard/VideoMuraciet/types';
import { GetPensionerInfoByPin } from 'src/api/AsanFinanceService';

const PensionerTab = ({
  pin,
  setValue,
  creditRequest,
  setCreditRequest,
}: {
  pin: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  creditRequest: CreditRequest;
  setCreditRequest: React.Dispatch<React.SetStateAction<CreditRequest>>;
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [fetchFromService, setFetchFromService] = useState<boolean>(false);

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const GetPensionerInfoByPinFunc = async () => {
    const _PENSIONER_DATA = await GetPensionerInfoByPin(pin, fetchFromService);
    if (typeof _PENSIONER_DATA === 'object' && _PENSIONER_DATA !== null) {
      const transformedPensioner = {
        ..._PENSIONER_DATA,
        allowance: _PENSIONER_DATA.allowance?.map(item => ({
          beginDate: item.beginDate || '',
          endDate: item.endDate || '',
          type: {
            id: item.type?.id || 0,
            description: item.type?.description || ''
          },
          group: {
            id: item.group?.id || 0, 
            description: item.group?.description || ''
          },
          amount: item.amount || 0
        })) || [],
        pension: (_PENSIONER_DATA.pension || []).map(item => ({
          type: {
            id: item.type?.id || 0,
            description: item.type?.description || '',
            label: item.type?.description || ''
          },
          group: {
            id: item.group?.id || 0,
            description: item.group?.description || ''
          },
          amount: item.amount || 0,
          startDate: item.startDate || '',
          endDate: item.endDate || ''
        }))
      };
      setCreditRequest({ ...creditRequest, pensioner: transformedPensioner });
    } else {
      console.error('Invalid PENSIONER data:', _PENSIONER_DATA);
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Card sx={{ m: 4, p: 2, display: 'flex', alignItems: 'center', backgroundColor: '#F9f' }}>
        <Button onClick={GetPensionerInfoByPinFunc} variant="contained" color="secondary">
          Axtar
        </Button>
        <Typography color="white" sx={{ ml: 2 }}>
          Bunu check etdiyiniz zaman məlumatlar ASAN Finans servisdən gələcək
        </Typography>
        <Checkbox
          onChange={() => {
            setFetchFromService(!fetchFromService);
          }}
          checked={fetchFromService}
        />
      </Card>
      <Typography
        variant="h5"
        sx={{ display: creditRequest.pensioner.allowance.length > 0 ? 'block' : 'none' }}
        gutterBottom
      >
        Təyin olunmuş müavinətlər
      </Typography>

      {/* hazirki  yeri məlumatları */}
      {creditRequest.pensioner.allowance.map((item, index) => (
        <Card sx={{ mb: 1 }} key={index}>
          <Accordion
            expanded={expanded === `panel${index + 43123}`}
            onChange={handleAccordionChange(`panel${index + 43123}`)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">{item?.type?.description}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Başlanğıc tarixi" value={item.beginDate || ''} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Bitmə tarixi" value={item.endDate || ''} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Identifikasiyaya uyğun izah (QRUP)"
                    value={item?.group?.description || ''}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Məbləğ" value={item?.amount || ''} fullWidth />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Card>
      ))}

      {/* kohne yeri məlumatları */}
      <Typography sx={{ mt: 4 }} variant="h5" gutterBottom>
        Təqaüd məlumatları
      </Typography>

      {creditRequest.pensioner.pension.map((item, index) => (
        <Card sx={{ mb: 1 }} key={index}>
          <Accordion
            expanded={expanded === `panel${index + 4323123}`}
            onChange={handleAccordionChange(`panel${index + 4323123}`)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">{item?.type?.label}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Identifikasiyaya uyğun izah (Tip)"
                    value={item.type.description || ''}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Identifikasiyaya uyğun izah (QRUP)"
                    value={item.group.description || ''}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Başlanğıc tarixi" value={item.startDate || ''} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Bitmə tarixi" value={item.endDate || ''} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Məbləğ" value={item.amount || ''} fullWidth />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Card>
      ))}
    </Box>
  );
};

export default PensionerTab;
