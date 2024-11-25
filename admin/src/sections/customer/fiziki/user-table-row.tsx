import type { IUserItem } from 'src/types/user';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  row: IUserItem;
  selected: boolean;
  onEditRow: () => void;
  onSelectRow: () => void;
  onDeleteRow: () => void;
};

export function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }: Props) {

  const router = useRouter()
  const confirm = useBoolean();

  const popover = usePopover();


  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell padding="checkbox">
          <Checkbox id={row.id} checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell onClick={onEditRow} sx={{ cursor: 'pointer' }}>
          {/* {row.} */}
2
        </TableCell>

        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Link color="inherit" onClick={onEditRow} sx={{ cursor: 'pointer' }}>
              {row.name}
            </Link>
          </Stack>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {/* {row.} */}
          11.12.2023
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.state}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {row.city}
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {row.phoneNumber}
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {row.role}
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {row.status}
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center">
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>

          <MenuItem
            onClick={() => {
              onEditRow();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push(`/dashboard/customer/${row.id}/createrequest`);
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Request
          </MenuItem>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
