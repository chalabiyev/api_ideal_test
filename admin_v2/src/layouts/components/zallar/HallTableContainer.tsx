import React, { useState } from 'react';
import {
  Card,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  MenuItem,
  Select,
  Button,
  Grid,
  Paper,
  Tooltip,
} from '@mui/material';
import { EmptyContent } from 'src/components/empty-content';
import { LoadingScreen } from 'src/components/loading-screen';
import HallOptions from './HallOptions';

interface Hall {
  id: string;
  theatreTitle: string;
}

const HallTableContainer = ({
  _hallData,
  _hallHasData,
  _hallLoading,
  _hallRefetch,
}: {
  _hallData: any;
  _hallHasData: any;
  _hallLoading: any;
  _hallRefetch: any;
}) => {
  const [cinemaFilter, setCinemaFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = _hallData
    ?.filter((hall: any) =>
      cinemaFilter ? hall.theatreTitle.toLowerCase() === cinemaFilter.toLowerCase() : true
    )
    .filter((hall: any) =>
      searchTerm ? hall.title.toLowerCase().includes(searchTerm.toLowerCase()) : true
    );

  const displayedData = filteredData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (_hallLoading) {
    return <LoadingScreen />;
  }

  if (!_hallHasData) {
    return <EmptyContent title="Zallar" description="Heç bir zal məlumatı tapılmadı" />;
  }

  return (
    <Card sx={{ p: 2 }}>
      {/* Filters */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Select
            fullWidth
            value={cinemaFilter}
            onChange={(e) => setCinemaFilter(e.target.value)}
            displayEmpty
            placeholder="Filter by Cinema"
          >
            <MenuItem value="">Bütün kinoteatrlar</MenuItem>
            {_hallHasData
              ? Array.from(new Set(_hallData.map((hall: any) => hall.theatreTitle))).map(
                  (uniqueTitle) => (
                    // @ts-ignore
                    <MenuItem key={uniqueTitle} value={uniqueTitle}>
                      {uniqueTitle}
                    </MenuItem>
                  )
                )
              : null}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            placeholder="Zalın adına görə axtarış"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Tooltip title="Bütün filtrləri sıfırla">
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                setCinemaFilter('');
                setSearchTerm('');
              }}
            >
              Sıfırla
            </Button>
          </Tooltip>
        </Grid>
      </Grid>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Adı</TableCell>
              <TableCell>Kinoteatr</TableCell>
              <TableCell>Hündürlük</TableCell>
              <TableCell>Uzunluq</TableCell>
              <TableCell>Oturacaq Sayı</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((hall: any) => (
              <TableRow key={hall?.id}>
                <TableCell>{hall?.title}</TableCell>
                <TableCell>{hall?.theatreTitle}</TableCell>
                <TableCell>{hall?.height}</TableCell>
                <TableCell>{hall?.width}</TableCell>
                <TableCell>{hall?.placesCount}</TableCell>
                <HallOptions _id={hall?.id} refetch={_hallRefetch} />
              </TableRow>
            ))}
            {displayedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Səhifə başına sətir sayı"
      />
    </Card>
  );
};

export default HallTableContainer;
