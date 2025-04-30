import React, { useEffect } from 'react';
import {
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CardHeader,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AKBBorrowerScoreResponse, Report } from 'src/pages/dashboard/VideoMuraciet/types';

const TabAKB = ({
  AKB_STATE,
  setAKB_STATE,
  AKB_SCORE,
  setAKB_SCORE
}: {
  AKB_STATE: Report;
  setAKB_STATE: React.Dispatch<React.SetStateAction<Report>>;
  AKB_SCORE: AKBBorrowerScoreResponse,
  setAKB_SCORE: React.Dispatch<React.SetStateAction<AKBBorrowerScoreResponse>>;
}) => {

  return (
    <Box sx={{ py: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h6">Məlumat</Typography>
          <Grid sx={{ mt: 2 }} container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Müharibə iştirakçısı olub olmadığı"
                fullWidth
                value={
                  AKB_STATE.borrower.participantOfPatrioticWar === true
                    ? 'Bəli'
                    : AKB_STATE.borrower.participantOfPatrioticWar === false
                      ? 'Xeyr'
                      : ''
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Kredit reytinqi"
                fullWidth
                value={AKB_SCORE.point || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Balans" fullWidth value={AKB_STATE.balance || ''} />
            </Grid>
            {/* <Grid item xs={12} sm={12}>
              <TextField label="Əlavə qeyd" fullWidth value={AKB_STATE.comments || ''} />
            </Grid> */}
          </Grid>
        </CardContent>
      </Card>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Öhdəlik kreditləri:
      </Typography>

      {AKB_STATE.liabilities.sort((a, b) => (a.outstandingDebtMain > b.outstandingDebtMain ? -1 : 1)).map((liability, index) => (
        <Card sx={{ mb: 1, mt: 1, border: `1px solid #2968E9` }}>
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                variant="subtitle2"
                sx={{ mt: 1, px: 2 }}
                color="primary.main"
                gutterBottom
              >
                {liability.bankName} - {liability.creditType}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Kredit nə vaxt verilib"
                    fullWidth
                    value={liability.grantedOn || ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="⁠İlkin məbləg"
                    fullWidth
                    value={liability.initialAmount || ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="⁠Xəttin dəyəri" fullWidth value={liability.lineAmount || ''} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="⁠Ödənilməmiş faiz günləri"
                    fullWidth
                    value={liability.daysInterestOverdue || ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="⁠Ödənilməmiş əsas borc günləri"
                    fullWidth
                    value={liability.daysMainSumOverdue || ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="⁠Müqavilənin son tarixi"
                    fullWidth
                    value={liability.daysMainSumOverdue || ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="⁠Faiz dərəcəsi"
                    fullWidth
                    value={liability.interestRate || ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="⁠Son ödəniş tarixi"
                    fullWidth
                    value={liability.lastPaymentDate || ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="⁠Qalıq əsas borc"
                    fullWidth
                    value={liability.outstandingDebtMain || ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="⁠Qalıq faiz borcu"
                    fullWidth
                    value={liability.outstandingDebtInterest || ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Aylıq ödəniş məbləği"
                    fullWidth
                    value={liability.monthlyPaymentAmount || ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Uzadılmalar" fullWidth value={liability.prolongations || ''} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Status" fullWidth value={liability.creditStatus || ''} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Kredit məqsədi"
                    fullWidth
                    value={liability.creditPurpose || ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Valyuta" fullWidth value={liability.currency || ''} />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    label="Birgə kredit götürənlərin sayı"
                    fullWidth
                    value={liability.coBorrowerCount || ''}
                  />
                </Grid> */}
              </Grid>

              <Typography variant="subtitle1" sx={{ mt: 5, mb: 4 }}>
                Girov
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Əmlakının Qeydiyyat Agentliyi"
                    fullWidth
                    value={liability.collateralRegistryAgency || ''}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    label="Əmlakının Bazardakı Dəyəri"
                    fullWidth
                    value={liability.collateralMarketValue || ''}
                  />
                </Grid> */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Əmlakının Qeydiyyat Nömrəsi"
                    fullWidth
                    value={liability.collateralRegistryNo || ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Əmlakla Bağlı Hər Hansı Məlumat"
                    fullWidth
                    value={liability.collateralAnyInfo || ''}
                  />
                </Grid>
              </Grid>

              <Typography variant="subtitle1" sx={{ mt: 5, mb: 4 }}>
                Tarixçə
              </Typography>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Report tarixi</TableCell>
                      <TableCell align="center">Gecikmiş günlər</TableCell>
                      <TableCell align="center">Kredit status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {liability.history.map((history, index) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{history.reportingPeriod}</TableCell>
                        <TableCell align="center">{history.overdueDays} gün</TableCell>
                        <TableCell align="center">{history.creditStatus}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        </Card>
      ))}

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="subtitle2">
            Şəxsin məlumatlarının sorğulanması haqqında məlumat
          </Typography>

          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Kim tərəfindən</TableCell>
                  <TableCell align="center">Tarix</TableCell>
                  <TableCell align="center">Məqsəd</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {AKB_STATE.inquiryHistory.map((history, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center">{history.inqBankName}</TableCell>
                    <TableCell align="center">{history.inqDate}</TableCell>
                    <TableCell align="center">{history.inqPurposeId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TabAKB;
