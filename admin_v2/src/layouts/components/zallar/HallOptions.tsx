import { MoreVert } from '@mui/icons-material';
import { Menu, MenuItem, TableCell, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import useDelete from 'src/api/useDelete';
import { toast } from 'sonner';
import { useRouter } from 'src/routes/hooks';
import { Iconify } from 'src/components/iconify';
import { ToastMessages } from 'src/config-global';

const HallOptions = ({ refetch, _id }: { refetch: any; _id: string }) => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { deleteData: deleteSession } = useDelete('/hall/delete');

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEditClose = () => {
    if (_id) {
      router.push(`/kinoteatrlar/zallarduzeliset/${_id}`);
    }
    handleMenuClose();
  };

  const handleDeleteClick = async () => {
    if (_id) {
      toast.promise(
        deleteSession(_id).then(() => {
          refetch();
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

  return (
    <TableCell>
      <IconButton onClick={handleMenuClick}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClose}>
          <Iconify icon="solar:pen-bold" sx={{ mr: 1 }} />
          Düzəliş et
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <Iconify sx={{ mr: 1 }} icon="solar:trash-bin-trash-bold" color="red" />
          <Typography color="primary">Sil</Typography>
        </MenuItem>
      </Menu>
    </TableCell>
  );
};

export default HallOptions;
