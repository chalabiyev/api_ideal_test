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
  Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CreditRequest, RecruiterState } from 'src/types/CreditRequest';
import { EmployeeInfoResponse, RecruiterDataType } from 'src/pages/dashboard/VideoMuraciet/types';
import { GetEmployeeInfoByPin } from 'src/api/AsanFinanceService';

const RecruiterData = ({
  setCreditRequest,
  pin,
  setValue,
  creditRequest,
  recruiterState,
  setRecruiterState,
}: {
  setCreditRequest: React.Dispatch<React.SetStateAction<CreditRequest>>;
  pin: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  creditRequest: CreditRequest;
  recruiterState: RecruiterState;
  setRecruiterState: React.Dispatch<React.SetStateAction<RecruiterState>>;
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [fetchFromService, setFetchFromService] = useState<boolean>(false);

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const GetEmployeeInfoByPinFunc = async () => {
    const _EMPLOYEE_DATA = await GetEmployeeInfoByPin(pin, fetchFromService);

    if (typeof _EMPLOYEE_DATA === 'object' && _EMPLOYEE_DATA !== null) {
      setRecruiterState(_EMPLOYEE_DATA as RecruiterState);
    } else {
      console.error('Invalid employee data:', _EMPLOYEE_DATA);
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Card sx={{ m: 4, p: 2, display: 'flex', alignItems: 'center', backgroundColor: '#F9f' }}>
        <Button onClick={GetEmployeeInfoByPinFunc} variant="contained" color="secondary">
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
        sx={{ display: recruiterState.active.length > 0 ? 'block' : 'none' }}
        gutterBottom
      >
        Hazırki iş yer(lər)i
      </Typography>
      {/* hazirki  yeri məlumatları */}
      {recruiterState.active.map((item, index) => (
        <Card sx={{ mb: 4 }} key={index}>
          <Typography variant="h6" sx={{ mt: 2, px: 2 }} color="primary.main" gutterBottom>
            {item.employer.legalAddress}
          </Typography>
          <Accordion
            expanded={expanded === `panel${index + 43123}`}
            onChange={handleAccordionChange(`panel${index + 43123}`)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">İşə götürənin məlumatları</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Hüquqi ünvan"
                    value={item.employer.legalAddress || ''}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="İşçi sayı" value={item.employer.workerCount || 0} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Qurumun adı" fullWidth value={item.employer.name || ''} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Mülkiyyətin növü"
                    fullWidth
                    value={item?.employer?.propertyType?.description || ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="VÖEN" fullWidth value={item.employer.voen || ''} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Əlaqə nömrəsi" value={item.employer.phone || ''} fullWidth />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          {/* İşçi məlumatları */}
          <Accordion
            expanded={expanded === `panel${index + 243212}`}
            onChange={handleAccordionChange(`panel${index + 243212}`)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">İşçi məlumatları</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Əmək müqaviləsi üzrə vəzifəsi"
                    value={item.employee.positionLabourContract || ''}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Sosial Sığorta Nömrəsi"
                    value={item.employee.ssn || ''}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Məşğulluq üzrə vəzifə"
                    value={item.employee.position || ''}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Əmək haqqı" value={item.employee.salary || ''} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="İş yeri" value={item.employee.workPlace || ''} fullWidth />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          {/* Müqavilə məlumatları */}
          <Accordion
            expanded={expanded === `panel${index + 3432213}`}
            onChange={handleAccordionChange(`panel${index + 3432213}`)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">Müqavilə məlumatları</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Sistemə daxil edilmə tarixi"
                    value={item.contract.insertDate || ''}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Müqavilənin növbəti bitmə tarixi"
                    value={item.contract.nextEndDate || ''}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Başlama tarixi"
                    value={item.contract.beginDate || ''}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="İmzalama tarixi"
                    value={item.contract.signDate || ''}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Bitmə tarixi" value={item.contract.endDate || ''} fullWidth />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Card>
      ))}

      {/* kohne yeri məlumatları */}
      <Typography sx={{ mt: 4 }} variant="h5" gutterBottom>
        Köhnə iş yer(lər)i
      </Typography>

      {recruiterState.deactive.map((item, index) => (
        <Card sx={{ mb: 4 }} key={index}>
          <Typography variant="h6" sx={{ mt: 2, px: 2 }} color="error" gutterBottom>
            {item.employer.name}
          </Typography>
          <Accordion
            expanded={expanded === `panel${index + 322}`}
            onChange={handleAccordionChange(`panel${index + 322}`)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">İşə götürənin məlumatları</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField value={item.employer.name || ''} label="Qurumun adı" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="VÖEN" value={item.employer.voen || ''} fullWidth />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          {/* İşçi məlumatları */}
          <Accordion
            expanded={expanded === `panel${index + 154}`}
            onChange={handleAccordionChange(`panel${index + 154}`)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">İşçi məlumatları</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={item.employee.position || ''}
                    label="Əmək müqaviləsi üzrə vəzifəsi"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Əmək haqqı" value={item.employee.salary || ''} fullWidth />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          {/* Müqavilə məlumatları */}
          <Accordion
            expanded={expanded === `panel${index + 653254}`}
            onChange={handleAccordionChange(`panel${index + 653254}`)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">Müqavilə məlumatları</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Başlama tarixi"
                    value={item.contract.beginDate || ''}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Bitmə tarixi" value={item.contract.endDate || ''} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Xitam tarixi"
                    value={item.contract.terminateDate || ''}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Card>
      ))}
    </Box>
  );
};

export default RecruiterData;
