import React, { useEffect, useState } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  Typography,
  TablePagination,
  Button,
  Paper,
  Menu,
  MenuItem,
  IconButton,
  Icon,
  Box,
} from '@mui/material';
import { GridMoreVertIcon } from '@mui/x-data-grid';
import { LoadingScreen } from 'src/components/loading-screen';
import { EmptyContent } from 'src/components/empty-content';
import { BASE_URL } from 'src/api/request';
import { Iconify } from 'src/components/iconify';
import { toast } from 'sonner';
import useDelete from 'src/api/useDelete';
import usePost from 'src/api/usePost';
import { ToastMessages } from 'src/config-global';

const IticketTable = ({
  _iticketData,
  _iticketHasData,
  _iticketRefetch,
  _iticketLoading,
}: {
  _iticketData: any;
  _iticketHasData: any;
  _iticketRefetch: any;
  _iticketLoading: any;
}) => {
  const { deleteData: deleteTicket } = useDelete('/i-ticket/delete');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState<string | any>(null);
  const [statusID, setStatusID] = useState<string | any>(null);

  const { postData: changeStatus } = usePost(`/i-ticket/changeStatus/${statusID}`);

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleToggleActive = async (id: any) => {
    setStatusID(id);
    try {
      await changeStatus({});
      toast.success('Status dəyişdirildi');

      // eslint-disable-next-line
      _iticketRefetch && _iticketRefetch();
    } catch (error) {
      toast.error('Nə isə səhv oldu');
    }
  };

  const handleMenuOpen = (event: any, row: any) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEdit = () => {
    alert(`Editing row: ${selectedRow.name}`);
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedRow?.id) {
      toast.promise(
        deleteTicket(selectedRow?.id).then(() => {
          // eslint-disable-next-line
          _iticketRefetch && _iticketRefetch();
        }),
        {
          loading: ToastMessages.deleting.loading,
          success: () => ToastMessages.deleting.success,
          error: () => ToastMessages.deleting.error,
        }
      );

      handleMenuClose();
    }
  };

  //   if (_iticketLoading) {
  //     return <LoadingScreen />;
  //   }

  if (!_iticketHasData) {
    return <EmptyContent title="iTicket" description="iTicket səhifəsi boşdur" />;
  }

  return (
    <Card sx={{ p: 2 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell>Şəkli</TableCell>
              <TableCell sx={{ minWidth: 130 }}>Adı</TableCell>
              <TableCell sx={{ minWidth: 110 }}>Tarix</TableCell>
              <TableCell sx={{ minWidth: 150 }}>Link</TableCell>
              <TableCell>Status</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_iticketHasData ? (
              _iticketData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: number) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ width: 10 }}>
                      <Typography variant="caption" color="GrayText">
                        {index + 1}.
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <img
                        src={`${BASE_URL}/file/getFile/${row.image}`}
                        alt="Thumbnail"
                        style={{
                          width: 70,
                          aspectRatio: 11 / 16,
                          objectFit: 'cover',
                          borderRadius: 5,
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.translations[0]?.title}</TableCell>
                    <TableCell> {row.date?.slice(0, 10).split('-').reverse().join('.')}</TableCell>
                    <TableCell>
                      {row.iticketLink ? (
                        <Box display="flex" alignItems="center" gap={1}>
                          <Button
                            variant="soft"
                            href={row.iticketLink}
                            target="_blank"
                            rel="noopener"
                            sx={{ textTransform: 'none' }}
                          >
                            <Iconify
                              icon="mdi:link-variant"
                              style={{ fontSize: 20, color: '#9e9e9e', marginRight: 5 }}
                            />
                            Keçid et
                          </Button>
                        </Box>
                      ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Iconify icon="mdi:block-helper" style={{ color: '#FF0000' }} />
                          <Typography variant="body2">Link yoxdur</Typography>
                        </Box>
                      )}
                    </TableCell>
                    <TableCell onMouseEnter={() => setStatusID(row.id)}>
                      <Switch
                        size="medium"
                        checked={row.active}
                        onChange={() => handleToggleActive(row.id)}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={(event) => handleMenuOpen(event, row)}>
                        <GridMoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={menuAnchorEl}
                        open={Boolean(menuAnchorEl)}
                        onClose={handleMenuClose}
                      >
                        {/* <MenuItem onClick={handleEdit}>Düzəliş et</MenuItem> */}
                        <MenuItem onClick={handleDelete}>
                          <Typography color="error">Sil</Typography>
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow> </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage="Səhifə başına sətir sayı"
        component="div"
        count={_iticketData.length}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
      />
    </Card>
  );
};

export default IticketTable;
