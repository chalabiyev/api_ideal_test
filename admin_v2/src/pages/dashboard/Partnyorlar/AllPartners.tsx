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
} from '@mui/material';
import { ArrowRightIcon } from '@mui/x-date-pickers';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useApi from 'src/api/useApi';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { DashboardContent } from 'src/layouts/dashboard';
import { useRouter } from 'src/routes/hooks';
import { EOwnerType, EStatus, Partner } from 'src/types/CreditRequest';

// const getTabCounts = (data: Partner[]) => ({
//   all: data?.length,
//   active: data.filter((row) => row.status === EStatus.ACCEPTED).length,
//   pending: data.filter((row) => row.status === EStatus.PENDING).length,
//   deactive: data.filter((row) => row.status === EStatus.REJECTED).length,
// });

const getTabCounts = (data: Partner[] | null | undefined) => {
  if (!data) {
    return { all: 0, active: 0, pending: 0, deactive: 0 };
  }

  return {
    all: data.length,
    active: data.filter((row) => row.status === EStatus.ACCEPTED).length,
    pending: data.filter((row) => row.status === EStatus.PENDING).length,
    deactive: data.filter((row) => row.status === EStatus.REJECTED).length,
  };
};

export default function Kredit() {
  const router = useRouter();
  const [tabValue, setTabValue] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activityFilter, setActivityFilter] = useState('all');

  const { data: partnerList, hasData: partnerHasData, loading, error } = useApi('/partner/list');

  //   popup
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

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

  const handleActivateClick = (row: any) => {
    setSelectedRow(row);
    setOpenPopup(true);
  };

  const handleActivityFilterChange = (event: any) => {
    setActivityFilter(event.target.value);
  };
  const tabCounts = partnerHasData
    ? getTabCounts(partnerList)
    : { all: 0, active: 0, pending: 0, deactive: 0 };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value.toLowerCase());
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = partnerList
    ? partnerList.filter((row: Partner) => {
        const statusMatches =
          tabValue === 'all' || row?.status?.toLowerCase() === tabValue.toLowerCase();
        const searchMatches = row?.companyName?.toLowerCase().includes(search);
        const activityMatches =
          activityFilter === 'all' ||
          row?.activityType?.toLowerCase() === activityFilter.toLowerCase();
        return statusMatches && searchMatches && activityMatches;
      })
    : [];

  // Pagination logic
  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Helmet>
        <title>İdeal Kredit | Yeni kredit</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Partnyorların cədvəli"
          links={[{ name: 'Partnyorlar' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        {/* Tabs */}
        <Card className="p-1 px-5">
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 0 }}>
              <TabList onChange={handleTabChange}>
                {[
                  { value: 'all', label: 'Hamısı', count: tabCounts.all, color: 'default' },
                  {
                    value: EStatus.ACCEPTED,
                    label: 'Aktiv',
                    count: tabCounts.active,
                    color: 'success',
                  },
                  {
                    value: EStatus.REJECTED,
                    label: 'Deaktiv',
                    count: tabCounts.deactive,
                    color: 'error',
                  },
                  {
                    value: EStatus.PENDING,
                    label: 'Gözlənilir',
                    count: tabCounts.pending,
                    color: 'warning',
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
                          variant={tabValue === tab.value ? 'filled' : 'soft'}
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
                label="Axtar"
                variant="outlined"
                size="medium"
                fullWidth
                onChange={handleSearch}
              />
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size="medium"
                value={activityFilter}
                onChange={handleActivityFilterChange}
                displayEmpty
                sx={{ minWidth: 200, ml: 2 }}
              >
                <MenuItem value="" disabled>
                  Şirkətin fəaliyyət sahəsi
                </MenuItem>
                <MenuItem value="all">Hamısı</MenuItem>
                <MenuItem value="ticarət">Ticarət</MenuItem>
                <MenuItem value="qida">Qida</MenuItem>
                <MenuItem value="xidmət">Xidmət</MenuItem>
                <MenuItem value="istehsal">İstehsal</MenuItem>
              </Select>
            </Box>

            {/* Table */}
            <TabPanel sx={{ p: 0 }} value={tabValue}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ minWidth: '100px' }}>N°</TableCell>
                      <TableCell sx={{ minWidth: '160px' }}>Partnyorun adı</TableCell>
                      <TableCell sx={{ minWidth: '200px' }}>Direktor/Sahib</TableCell>
                      <TableCell sx={{ minWidth: '100px' }}>VÖEN</TableCell>
                      <TableCell sx={{ minWidth: '210px' }}>Şirkətin fəaliyyət sahəsi</TableCell>
                      <TableCell sx={{ minWidth: '210px' }}>Sahibkarlıq forması</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell sx={{ minWidth: '150px' }}> </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedData.map((row: Partner) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.companyName}</TableCell>
                        <TableCell>{row.directorName}</TableCell>
                        <TableCell>{row.voen}</TableCell>
                        <TableCell>{row.activityType}</TableCell>
                        <TableCell>
                          <Label
                            endIcon={
                              row.formOfOwnership === EOwnerType.FIZIKI ? (
                                <Person2 />
                              ) : (
                                <BusinessCenter />
                              )
                            }
                            variant="filled"
                          >
                            {' '}
                            {row.formOfOwnership === EOwnerType.FIZIKI ? 'Fiziki' : 'Hüquqi'}
                          </Label>
                        </TableCell>
                        <TableCell>
                          <Label
                            color={
                              row.status === EStatus.REJECTED
                                ? 'error'
                                : row.status === EStatus.PENDING
                                  ? 'warning'
                                  : 'success'
                            }
                          >
                            {row.status}
                          </Label>
                        </TableCell>
                        <TableCell
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 2,
                          }}
                        >
                          {/* Status Değiştir ve Düzenle Butonu */}
                          <Button
                            endIcon={<Iconify icon="eva:edit-fill" />}
                            variant="outlined"
                            size="small"
                            sx={{ textWrap: 'nowrap' }}
                            onClick={(event) => handleEditClick(event, row)}
                          >
                            Status Dəyiş
                          </Button>
                          <Button
                            onClick={() => {
                              router.push(`/partynorlar/duzeliset/${row.id}`);
                            }}
                            sx={{ borderRadius: 100 }}
                            variant="text"
                            size="small"
                          >
                            <Iconify icon="mdi:pencil" />
                          </Button>
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
                        <MenuItem value={EStatus.ACCEPTED} color="success" sx={{ text: 'green' }}>
                          Aktiv
                        </MenuItem>
                        <MenuItem value={EStatus.REJECTED}>Deaktiv</MenuItem>
                        <MenuItem value={EStatus.PENDING}>Gözlənilir</MenuItem>
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
                count={filteredData.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TabPanel>
          </TabContext>
        </Card>
      </DashboardContent>
    </>
  );
}
