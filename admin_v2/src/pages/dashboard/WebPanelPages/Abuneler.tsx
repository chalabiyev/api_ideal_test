import { useState } from 'react';
import {
  Card,
  Box,
  TableContainer,
  Paper,
  TextField,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  TablePagination,
  Switch,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';

import useApi from 'src/api/useApi';
import { LoadingScreen } from 'src/components/loading-screen';
import { EmptyContent } from 'src/components/empty-content';
import { SubscribersListI } from './types';
import { Label } from 'src/components/label';
import usePost from 'src/api/usePost';
import { toast } from 'sonner';

const Abuneler = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //   --------------------------------------------------------------------------------------------------------------------

  const {
    data: subscribersData,
    hasData: subscribersHasData,
    loading: subscribersDataLoading,
    refetch: subscribersDataRefetch,
  } = useApi(`/content/subscribe/list`);

  const { postData: makeSubscribe } = usePost(`/content/subscribe/subscribe`);
  const { postData: makeUnSubscribe } = usePost(`/content/subscribe/unsubscribe`);

  const handleStatusChange = (subscriberMail: string, subscriberStatus: boolean) => {
    if (subscriberStatus) {
      const userData = {
        email: subscriberMail,
      };
      toast.promise(makeUnSubscribe(userData), {
        loading: 'Abunəlikdəndən çıxarılır...',
        // eslint-disable-next-line
        success: (response) => {
          subscribersDataRefetch();
          return `Çıxarıldı!`;
        },
        error: (err) => {
          const errorMessage = err.response?.data?.message || 'Olmadığı üçün xəta';
          return `Xəta: ${errorMessage}`;
        },
      });
    } else {
      const userData = {
        email: subscriberMail,
      };
      toast.promise(makeUnSubscribe(userData), {
        loading: 'Abunə edilir...',
        // eslint-disable-next-line
        success: (response) => {
          subscribersDataRefetch();
          return `Abunə edildi!`;
        },
        error: (err) => {
          const errorMessage = err.response?.data?.message || 'Olmadığı üçün xəta';
          return `Xəta: ${errorMessage}`;
        },
      });
    }
  };

  if (subscribersDataLoading) {
    return <LoadingScreen />;
  }

  if (!subscribersHasData) {
    return <EmptyContent title="Heç kim abunə olmayıb" />;
  }

  return (
    <>
      <Helmet>
        <title>İdeal Kredit | Abunələr</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Abunələr"
          links={[{ name: 'Veb sayt idarə paneli' }, { name: 'Abunələr cədvəli' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <Box sx={{ p: 2 }}>
            <TextField fullWidth label="Mail üzrə axtarış" />
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 250 }}>E-poçt</TableCell>
                  <TableCell sx={{ minWidth: 200 }}>Abunə olduğu tarix</TableCell>
                  <TableCell sx={{ minWidth: 200 }}>Statusu</TableCell>
                  <TableCell sx={{ minWidth: 250 }}>Abunəliyi idarə et</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {subscribersData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((subscriber: SubscribersListI) => (
                    <TableRow key={subscriber.id}>
                      <TableCell>{subscriber.email}</TableCell>

                      <TableCell>
                        {subscriber.updatedDate
                          .toString()
                          .slice(0, 10)
                          .split('-')
                          .reverse()
                          .join('.')}
                      </TableCell>
                      <TableCell>
                        <Label color={subscriber.active ? 'success' : 'error'}>
                          {subscriber.active ? 'Abunədir' : 'Abunə deyil'}
                        </Label>
                      </TableCell>
                      <TableCell>
                        <Switch
                          // @ts-ignore
                          onChange={(e) => handleStatusChange(subscriber.email, subscriber.active)}
                          color="warning"
                          checked={subscriber.active}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={subscribersData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Səhifə başına sətir sayı"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} dənə ${count !== -1 ? count : `more than ${to}`}`
              }
            />
          </TableContainer>
        </Card>
      </DashboardContent>
    </>
  );
};

export default Abuneler;
