import { BusinessCenter, Person2, PersonPinCircleOutlined } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Box,
  Tab,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
  Button,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  SelectChangeEvent,
  Popover,
  Tooltip,
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { ArrowRightIcon } from '@mui/x-date-pickers';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { countOfCreditRequests, countOfCreditRequestsAll, creditRequestSearch } from 'src/api/CreditService';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { DashboardContent } from 'src/layouts/dashboard';
import { useRouter } from 'src/routes/hooks';
import { ECreditType } from 'src/types/CreditRequestDto';
import { CreditRequestSearchResponse } from 'src/types/CreditRequestSearchResponse';
import { formatDate, formatDDate } from 'src/utils/formatDate';

// // Table Data
// const MOCK_DATA = [
//   {
//     id: 1,
//     creditType: '500 azn-dən yuxarı',
//     amount: '350 azn',
//     applicationDate: '12/12/2024',
//     operator: 'Əhməd Mustafayev',
//     name: 'Şaban Qarabağlı Mahmud oğlu',
//     contactNumbers: ['0709919999', '0551234567', '0779876543'],
//     contactPerson: 'Rəşad Məmmədov',
//     contactPersonRole: 'Əmisi',
//     contactPersonNumber: '0708765432',
//     statusM: 'Baxılır',
//     statusIK: 'Təstiqlənib',
//   },
//   {
//     id: 2,
//     creditType: '500 azn-dən aşağı',
//     amount: '200 azn',
//     applicationDate: '10/12/2024',
//     operator: 'Günel Qurbanova',
//     name: 'Murad Əliyev Orxan oğlu',
//     contactNumbers: ['0553332211', '0705557788'],
//     contactPerson: 'Aysel Həsənova',
//     contactPersonRole: 'Bacısı',
//     contactPersonNumber: '0501112233',
//     statusM: 'Təstiqlənib',
//     statusIK: 'İmtina edilib',
//   },
//   {
//     id: 3,
//     creditType: 'Partnyorluq',
//     amount: '1500 azn',
//     applicationDate: '08/12/2024',
//     operator: 'Elçin Hüseynov',
//     name: 'Namiq Süleymanlı Həsən oğlu',
//     contactNumbers: ['0504567890', '0771239876'],
//     contactPerson: 'Vüqar Rəhimov',
//     contactPersonRole: 'Dostu',
//     contactPersonNumber: '0559991122',
//     statusM: 'Baxılır',
//     statusIK: 'Baxılır',
//   },
//   {
//     id: 4,
//     creditType: 'Biznes',
//     amount: '5000 azn',
//     applicationDate: '05/12/2024',
//     operator: 'Leyla Sadıqlı',
//     name: 'Arif Məmmədov Elçin oğlu',
//     contactNumbers: ['0519876543', '0555432109'],
//     contactPerson: 'Rəşid Orucov',
//     contactPersonRole: 'Qardaşı',
//     contactPersonNumber: '0776543210',
//     statusM: 'İmtina edilib',
//     statusIK: 'Təstiqlənib',
//   },
//   {
//     id: 5,
//     creditType: '500 azn-dən yuxarı',
//     amount: '600 azn',
//     applicationDate: '01/12/2024',
//     operator: 'Kamil Qasımov',
//     name: 'Nigar Əhmədova Qasım qızı',
//     contactNumbers: ['0502345678', '0779874321'],
//     contactPerson: 'Cavid Məmmədov',
//     contactPersonRole: 'Ata',
//     contactPersonNumber: '0558765432',
//     statusM: 'Təstiqlənib',
//     statusIK: 'İmtina edilib',
//   },
//   {
//     id: 6,
//     creditType: '500 azn-dən aşağı',
//     amount: '120 azn',
//     applicationDate: '29/11/2024',
//     operator: 'Nail Rüstəmov',
//     name: 'Elnur Quliyev Tahir oğlu',
//     contactNumbers: ['0701234567', '0554567890'],
//     contactPerson: 'Kamran Həsənov',
//     contactPersonRole: 'Baba',
//     contactPersonNumber: '0709876543',
//     statusM: 'Baxılır',
//     statusIK: 'Təstiqlənib',
//   },
//   {
//     id: 7,
//     creditType: 'Partnyorluq',
//     amount: '800 azn',
//     applicationDate: '25/11/2024',
//     operator: 'Aysel Məmmədli',
//     name: 'Nazim Qurbanov Tural oğlu',
//     contactNumbers: ['0515678901', '0508765432'],
//     contactPerson: 'Esmira Vəliyeva',
//     contactPersonRole: 'Qohum',
//     contactPersonNumber: '0771234567',
//     statusM: 'Təstiqlənib',
//     statusIK: 'İmtina edilib',
//   },
//   {
//     id: 8,
//     creditType: 'Biznes',
//     amount: '2000 azn',
//     applicationDate: '20/11/2024',
//     operator: 'Orxan Həsənov',
//     name: 'Cavid Nəcəfov Əli oğlu',
//     contactNumbers: ['0771122334', '0506677889'],
//     contactPerson: 'Hikmət Rəhimov',
//     contactPersonRole: 'Anası',
//     contactPersonNumber: '0559988776',
//     statusM: 'Baxılır',
//     statusIK: 'Baxılır',
//   },
//   {
//     id: 9,
//     creditType: '500 azn-dən yuxarı',
//     amount: '900 azn',
//     applicationDate: '15/11/2024',
//     operator: 'Sevinc Həsənova',
//     name: 'Tamerlan Orucov Fərhad oğlu',
//     contactNumbers: ['0702233445', '0556677889'],
//     contactPerson: 'Rəşid Məmmədov',
//     contactPersonRole: 'Dost',
//     contactPersonNumber: '0701122334',
//     statusM: 'Təstiqlənib',
//     statusIK: 'Təstiqlənib',
//   },
//   {
//     id: 10,
//     creditType: '500 azn-dən aşağı',
//     amount: '450 azn',
//     applicationDate: '10/11/2024',
//     operator: 'Samir Hüseynov',
//     name: 'Esmira Quliyeva Cavid qızı',
//     contactNumbers: ['0509988776', '0775544332'],
//     contactPerson: 'Səmra İsmayılova',
//     contactPersonRole: 'Anası',
//     contactPersonNumber: '0772233445',
//     statusM: 'İmtina edilib',
//     statusIK: 'Baxılır',
//   },
// ];

// const getTabCounts = (data: typeof MOCK_DATA) => ({
//   all: data.length,
//   above: data.filter((row) => row.creditType === '500 azn-dən yuxarı').length,
//   below: data.filter((row) => row.creditType === '500 azn-dən aşağı').length,
//   partner: data.filter((row) => row.creditType === 'Partnyorluq').length,
//   businness: data.filter((row) => row.creditType === 'Biznes').length,
// });

export const creditTypeMap = { undefined: '', 'ABOVE_500': '500 azn-dən yuxarı', 'BELOW_500': '500 azn-dən aşağı', 'PARTNER_CREDIT': 'Partnyorluq', 'BUSINESS_CREDIT': 'Biznes' };

export default function Kredit() {
  const router = useRouter();
  const [creditType, setCreditType] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [activityFilter, setActivityFilter] = useState('all');

  //   popup
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // const [filteredData, setFilteredData] = useState<any[]>([]);
  const [tabCounts, setTabCounts] = useState<any>({ all: 0, above: 0, below: 0, partner: 0, businness: 0 });
  const [data, setData] = useState<CreditRequestSearchResponse>({ content: [], numberOfElements: 0, totalPages: 0, totalElements: 0 });

  useEffect(() => {
    if (tabCounts.all === 0) {
      setTabCounts({
        ...tabCounts,
        all: countOfCreditRequestsAll(),
        below: countOfCreditRequests('BELOW_500'),
        above: countOfCreditRequests('ABOVE_500'),
        partner: countOfCreditRequests('PARTNER_CREDIT'),
        businness: countOfCreditRequests('BUSINESS_CREDIT')
      });
    }
  }, []);

  const handleEditClick = (event: React.MouseEvent<HTMLElement>, row: any) => {
    setAnchorEl(event.currentTarget); // Butonun konumunu al
    setSelectedRow(row); // Seçili satırı ayarla
  };

  const handleClosePopup = () => {
    setAnchorEl(null); // Popover'u kapat
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    if (selectedRow) {
      selectedRow.status = event.target.value; // Durumu değiştir
    }
    setAnchorEl(null); // Popover'u kapat
  };

  const isPopupOpen = Boolean(anchorEl);

  // const handleActivateClick = (row: any) => {
  //   setSelectedRow(row);
  //   setOpenPopup(true);
  // };

  // const handleActivityFilterChange = (event: any) => {
  //   setActivityFilter(event.target.value);
  // };
  // const tabCounts = getTabCounts(MOCK_DATA);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCreditType(newValue);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const filteredData = MOCK_DATA.filter((row) => {
  //   const statusMatches =
  //     tabValue === 'all' || row.creditType.toLowerCase() === tabValue.toLowerCase();
  //   const searchMatches = row.name.toLowerCase().includes(search);
  //   const activityMatches = activityFilter === 'all';
  //   return statusMatches && searchMatches && activityMatches;
  // });

  // Pagination logic
  // const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  useEffect(() => {
    creditRequestSearch({ page: page, pageSize: rowsPerPage, search: search, creditType: creditType as ECreditType })
      .then((res: CreditRequestSearchResponse | null) => {
        setData(res ?? { content: [], numberOfElements: 0, totalPages: 0, totalElements: 0 });
      });
  }, [page, rowsPerPage, creditType, search]);


  return (
    <Box mt={3}>
      {/* Tabs */}
      <Card className="p-1 px-5">
        <TabContext value={creditType}>
          <Box sx={{ borderBottom: 0 }}>
            <TabList onChange={handleTabChange}>
              {[
                { value: '', label: 'Hamısı', count: tabCounts.all, color: 'default' },
                {
                  value: 'ABOVE_500',
                  label: '500 azn-dən yuxarı',
                  count: tabCounts.above,
                  color: 'success',
                },
                {
                  value: 'BELOW_500',
                  label: '500 azn-dən aşağı',
                  count: tabCounts.below,
                  color: 'error',
                },
                {
                  value: 'PARTNER_CREDIT',
                  label: 'Partnyorluq',
                  count: tabCounts.partner,
                  color: 'warning',
                },
                {
                  value: 'BUSINESS_CREDIT',
                  label: 'Biznes',
                  count: tabCounts.businness,
                  color: 'info',
                },
              ].map((tab) => (
                <Tab
                  sx={{ border: 'none' }}
                  key={tab.value}
                  value={tab.value}
                  label={
                    <Box display="flex" alignItems="center" gap={1}>
                      {tab.label}
                      <Label
                        variant={creditType === tab.value ? 'filled' : 'soft'}
                        color={tab.color as 'default' | 'success' | 'error' | 'warning'}
                      >
                        {tab.count}
                      </Label>
                    </Box>
                  }
                />
              ))}
            </TabList>
          </Box>

          {/* Search */}
          <Box sx={{ my: 3, width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <TextField
              label="Ada görə axtarış"
              variant="outlined"
              size="medium"
              fullWidth
              onChange={handleSearch}
            />
          </Box>

          {/* Table */}
          <TabPanel sx={{ p: 0 }} value={creditType}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>N°</TableCell>
                    <TableCell sx={{ minWidth: '160px' }}>Kreditin növü</TableCell>
                    <TableCell sx={{ minWidth: '100px' }}>Miqdarı</TableCell>
                    <TableCell sx={{ minWidth: '150px' }}>Müraciətin tarixi</TableCell>
                    <TableCell sx={{ minWidth: '160px' }}>İcraçı</TableCell>
                    <TableCell sx={{ minWidth: '260px' }}>Soyadı, adı, atasının adı</TableCell>
                    <TableCell sx={{ minWidth: '340px' }}>Əlaqə nömrəsi</TableCell>
                    <TableCell sx={{ minWidth: '340px' }}>
                      Əlaqədar şəxsin adı, soyadı, ata adı
                    </TableCell>
                    <TableCell sx={{ minWidth: '170px' }}>Əlaqədar şəxsin rolu</TableCell>
                    <TableCell sx={{ minWidth: '210px' }}>Əlaqədar şəxsin nömrəsi</TableCell>
                    <TableCell sx={{ minWidth: '150px' }}>Status M.</TableCell>
                    <TableCell sx={{ minWidth: '150px' }}>Status İ.K.</TableCell>
                    <TableCell sx={{ minWidth: '150px' }}>Ətraflı</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.content.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.creditType ? creditTypeMap[row.creditType] : ''}</TableCell>
                      <TableCell>{row.creditAmount}</TableCell>
                      <TableCell>{row.requestDate ? formatDDate(row.requestDate) : ''}</TableCell>
                      <TableCell>{row.createdBy}</TableCell>
                      <TableCell>{`${row.requestedUser?.surname},  ${row.requestedUser?.name}, ${row.requestedUser?.fatherName} `}</TableCell>
                      <TableCell>
                        {row.phoneNumber &&
                          <Card sx={{ display: 'inline-block', mr: 1 }}>
                            {' '}
                            <Label variant="filled">
                              {row.phoneNumber}
                            </Label>
                          </Card>}
                        {row.otherPhoneNumbers?.Ev &&
                          <Card sx={{ display: 'inline-block', mr: 1 }}>
                            {' '}
                            <Label variant="filled">
                              {row.otherPhoneNumbers?.Ev}
                            </Label>
                          </Card>}
                        {row.otherPhoneNumbers?.GSM &&
                          <Card sx={{ display: 'inline-block', mr: 1 }}>
                            {' '}
                            <Label variant="filled">
                              {row.otherPhoneNumbers?.GSM}
                            </Label>
                          </Card>}
                      </TableCell>
                      <TableCell>{row.guarantors && row.guarantors.length > 0 ? `${row.guarantors[0].personAz.name} ${row.guarantors[0].personAz.surname} ${row.guarantors[0].personAz.patronymic}` : ''}</TableCell>
                      <TableCell>{row.guarantors && row.guarantors.length > 0 ? row.guarantors[0].relation : ''}</TableCell>
                      <TableCell>
                        {row.guarantors && row.guarantors.length > 0 ? (
                          <Label variant="filled">{row.guarantors[0].phoneNumber}</Label>
                        ) : (
                          ''
                        )}
                      </TableCell>
                      <TableCell>
                        {row.activateStatus ? (
                          <Label
                            color={
                              row.activateStatus === 'PENDING'
                                ? 'warning'
                                : row.activateStatus === 'ACCEPTED'
                                  ? 'success'
                                  : 'error'
                            }
                            variant="soft"
                          >
                            {row.activateStatus == 'PENDING' ? 'Baxılır' : row.activateStatus == 'ACCEPTED' ? 'Təstiqlənib' : 'İmtina edilib'}
                          </Label>
                        ) : (
                          <Label
                            color='warning'
                            variant="soft"
                          >
                            Baxılır
                          </Label>
                        )}
                      </TableCell>
                      <TableCell>
                        {row.finalStatus ? (
                          <Label
                            color={
                              row.finalStatus === 'PENDING'
                                ? 'warning'
                                : row.finalStatus === 'ACCEPTED'
                                  ? 'success'
                                  : 'error'
                            }
                            variant="soft"
                          >
                            {row.finalStatus == 'PENDING' ? 'Baxılır' : row.finalStatus == 'ACCEPTED' ? 'Təstiqlənib' : 'İmtina edilib'}
                          </Label>
                        ) : (
                          <Label
                            color='warning'
                            variant="soft"
                          >
                            Baxılır
                          </Label>
                        )}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Ətraflı" placement="top" arrow>
                          <Button
                            onClick={() => {
                              router.push(`/muracietler/muraciet?id=${row.id}`);
                            }}
                            sx={{ borderRadius: 100, cursor: 'pointer' }}
                            variant="text"
                            size="small"
                          >
                            {/* eye icon  */}
                            <Label sx={{ cursor: 'pointer' }}>
                              <Iconify icon="eva:eye-fill" />
                            </Label>
                          </Button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

                {/* Status Değiştirme Popover */}
                <Popover
                  open={isPopupOpen}
                  anchorEl={anchorEl}
                  onClose={handleClosePopup}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <Box sx={{ p: 2, minWidth: 150 }}>
                    <Select
                      value={selectedRow?.status || ''}
                      onChange={handleStatusChange}
                      fullWidth
                      size="small"
                    >
                      <MenuItem value="Aktiv" color="success" sx={{ text: 'green' }}>
                        Aktiv
                      </MenuItem>
                      <MenuItem value="Deaktiv">Deaktiv</MenuItem>
                      <MenuItem value="Gözlənilir">Gözlənilir</MenuItem>
                    </Select>
                  </Box>
                </Popover>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
              component="div"
              labelRowsPerPage="Səhifədə başına sətir sayı"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
              showFirstButton
              showLastButton
              count={data.totalElements}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
          </TabPanel>
        </TabContext>
      </Card>
    </Box>
  );
}
