import { Avatar, FormControlLabel, FormGroup, Switch, Typography } from '@mui/material';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { BASE_URL } from 'src/api/request';
import { useRouter } from 'src/routes/hooks';
import useApi from 'src/api/useApi';
import { toast } from 'sonner';
import usePost from 'src/api/usePost';
import useDelete from 'src/api/useDelete';
import { ToastMessages } from 'src/config-global';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
  refetch?: () => void;
};

export function UserTableRow({ row, selected, refetch }: Props) {
  const confirm = useBoolean();

  const { postData: changeStatus } = usePost(`/movie/changeStatus/${row?.id}`);
  const { deleteData: deleteItem } = useDelete('/movie/delete');

  const router = useRouter();

  const popover = usePopover();

  const handleChange = async (event: any) => {
    try {
      await changeStatus({});
      toast.success('Status dəyişdirildi');

      // eslint-disable-next-line
      refetch && refetch();
      popover.onClose();
    } catch (error) {
      toast.error('Nə isə səhv oldu');
    }
  };

  const handleDelete = async () => {
    if (row.id) {
      toast.promise(
        deleteItem(row.id).then(() => {
          // eslint-disable-next-line
          refetch && refetch();
        }),
        {
          loading: ToastMessages.deleting.loading,
          success: () => ToastMessages.deleting.success,
          error: () => ToastMessages.deleting.error,
        }
      );

      popover.onClose();
    }
  };

  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell>
          {/* https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg */}

          {row?.image ? (
            <img
              alt=" default poster"
              className="rounded-sm"
              src={`${BASE_URL}/file/getFile/${row?.image}?t=${new Date().getTime()}`}
            />
          ) : (
            <img
              className="rounded-sm"
              alt="default img"
              src="https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg"
            />
          )}
        </TableCell>
        <TableCell
          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}
        >
          {/* <Checkbox id={row.id} checked={selected} onClick={onSelectRow} /> */}
          <Typography
            variant="subtitle2"
            noWrap
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {' '}
            {row?.translations[0]?.name}
          </Typography>
        </TableCell>

        <TableCell
          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}
        >
          {/* <Stack spacing={2} direction="row" alignItems="center">
            <Avatar alt={row.name} src={row.avatarUrl} />

            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Link color="inherit" onClick={onEditRow} sx={{ cursor: 'pointer' }}>
                {row.name}
              </Link>
              <Box component="span" sx={{ color: 'text.disabled' }}>
                {row.email}
              </Box>
            </Stack>
          </Stack> */}
          <Typography
            variant="body2"
            noWrap
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {row?.translations[0]?.description}
          </Typography>
        </TableCell>

        <TableCell>
          {row?.firstScreeningDate?.slice(0, 10).split('-').reverse().join('.')}
        </TableCell>
        <TableCell>{row?.lastScreeningDate?.slice(0, 10).split('-').reverse().join('.')}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {row?.genres
            ?.map((item: any) => item?.translations[0]?.title)
            .filter(Boolean)
            .join(', ')}{' '}
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}> {row?.translations[0]?.director}</TableCell>

        <TableCell>{row?.translations[0]?.country}</TableCell>

        <TableCell>
          {Math.floor(row.duration / 60)} saat, {row.duration % 60} dəqiqə
        </TableCell>
        <TableCell>
          {' '}
          <Label variant="soft" color={row?.active ? 'success' : 'error'}>
            {row?.active ? 'Aktiv' : 'Deaktiv'}
          </Label>{' '}
        </TableCell>
        <TableCell>
          <Stack direction="row" alignItems="center">
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>

      {/* <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} /> */}

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
            Sil
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
              router.push(`/filmler/duzeliset/${row.id}`);
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Düzəliş et
          </MenuItem>
          <MenuItem onClick={handleChange}>
            <FormGroup>
              <FormControlLabel
                sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}
                control={<Switch checked={row.active} size="small" />}
                label={row.active ? 'Deaktiv et' : 'Aktiv et'}
              />
            </FormGroup>
          </MenuItem>
        </MenuList>
      </CustomPopover>

    
    </>
  );
}
