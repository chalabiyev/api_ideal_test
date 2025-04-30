import { useState } from 'react';
import {
  Card,
  CardContent,
  Tabs,
  Tab,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Typography,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';

const mockData = [
  {
    id: 1,
    name: 'Əli Məmmədov',
    father: 'Musa',
    type: 'Partner',
    operator: 'Orxan Əliyev',
    date: '2024-03-01',
    amount: 5000,
    duration: 12,
    interest: 14,
    status: 'Krediti olan',
  },
  {
    id: 2,
    name: 'Leyla Əhmədova',
    father: 'Vaqif',
    type: 'Biznes',
    operator: 'Nigar Həsənova',
    date: '2024-02-15',
    amount: 25000,
    duration: 240,
    interest: 6,
    status: 'Krediti bağlanmış',
  },
  {
    id: 3,
    name: 'Murad Quliyev',
    father: 'Əli',
    type: 'Avtomobil',
    operator: 'Elçin Rüstəmov',
    date: '2024-01-10',
    amount: 15000,
    duration: 60,
    interest: 10,
    status: 'Imtina edilmiş',
  },
  {
    id: 4,
    name: 'Aygün Həsənli',
    father: 'Cavid',
    type: 'Partner',
    operator: 'Zaur Məmmədov',
    date: '2024-03-05',
    amount: 3000,
    duration: 6,
    interest: 16,
    status: 'Gözləyən',
  },
  {
    id: 5,
    name: 'Rəşad Abbasov',
    father: 'Ramin',
    type: 'Biznes',
    operator: 'Elçin Rüstəmov',
    date: '2024-02-28',
    amount: 20000,
    duration: 180,
    interest: 5,
    status: 'Yeni',
  },
  {
    id: 6,
    name: 'Nigar Kazımova',
    father: 'Faiq',
    type: 'Partner',
    operator: 'Orxan Əliyev',
    date: '2024-03-02',
    amount: 7000,
    duration: 24,
    interest: 12,
    status: 'Krediti olan',
  },
  {
    id: 7,
    name: 'Elvin Rzayev',
    father: 'Həsən',
    type: 'Avtomobil',
    operator: 'Nigar Həsənova',
    date: '2024-02-20',
    amount: 18000,
    duration: 72,
    interest: 9,
    status: 'Imtina edilmiş',
  },
  {
    id: 8,
    name: 'Tərlan Əsədov',
    father: 'Sadiq',
    type: 'Biznes',
    operator: 'Elçin Rüstəmov',
    date: '2024-02-10',
    amount: 30000,
    duration: 300,
    interest: 4,
    status: 'Krediti bağlanmış',
  },
  {
    id: 9,
    name: 'Aydın Məmmədli',
    father: 'Tahir',
    type: 'Partner',
    operator: 'Zaur Məmmədov',
    date: '2024-03-10',
    amount: 4000,
    duration: 8,
    interest: 15,
    status: 'Gözləyən',
  },
  {
    id: 10,
    name: 'Zaur Hacıyev',
    father: 'Rəşid',
    type: 'Avtomobil',
    operator: 'Orxan Əliyev',
    date: '2024-02-25',
    amount: 22000,
    duration: 84,
    interest: 8,
    status: 'Yeni',
  },
];

const statuses = [
  'Hamısı',
  'Krediti olan',
  'Krediti bağlanmış',
  'Imtina edilmiş',
  'Gözləyən',
  'Yeni',
];

const Clients = () => {
  const [activeTab, setActiveTab] = useState(statuses[0]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredData = mockData
    .filter((item) => activeTab === 'Hamısı' || item.status === activeTab)
    .filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.type.toLowerCase().includes(search.toLowerCase())
    );

  const getStatusCount = (status: string) =>
    mockData.filter((item) => status === 'Hamısı' || item.status === status).length;

  return (
    <>
      <Helmet>
        <title>İdeal Kredit | Kreditlər</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Müştərilər"
          links={[{ name: 'Müştərilər cədvəli' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <CardContent>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              variant="scrollable"
            >
              {statuses.map((status) => (
                <Tab
                  key={status}
                  label={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography>{status}</Typography>
                      <Box
                        sx={{
                          textDecoration: 'underline',
                        }}
                      >
                        {getStatusCount(status)}
                      </Box>
                    </Box>
                  }
                  value={status}
                />
              ))}
            </Tabs>

            <TextField
              fullWidth
              variant="outlined"
              label="Axtarış"
              placeholder="Ad və ya müraciətin növü görə axtarış"
              sx={{ mt: 2, mb: 2 }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell sx={{ minWidth: '150px' }}>Ad Soyad Ata adı</TableCell>
                    <TableCell sx={{ minWidth: '150px' }}>Müraciətin növü</TableCell>
                    <TableCell sx={{ minWidth: '150px' }}>Operator</TableCell>
                    <TableCell sx={{ minWidth: '150px' }}>Müraciətin tarixi</TableCell>
                    <TableCell sx={{ minWidth: '150px' }}>Məbləğ</TableCell>
                    <TableCell>Müddət</TableCell>
                    <TableCell>Faiz</TableCell>
                    <TableCell sx={{ minWidth: '150px' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {row.name} {row.father}
                        </TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.operator}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.amount} AZN</TableCell>
                        <TableCell>{row.duration} ay</TableCell>
                        <TableCell>{row.interest}%</TableCell>
                        <TableCell>{row.status}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              labelRowsPerPage="Səhifədə başına sətir sayı"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
              count={filteredData.length}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
          </CardContent>
        </Card>
      </DashboardContent>
    </>
  );
};

export default Clients;
