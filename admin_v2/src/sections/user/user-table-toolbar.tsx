import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import { Dispatch, SetStateAction } from 'react';

// ----------------------------------------------------------------------

export function UserTableToolbar({
  searchinputvalue,
  setsearchinputvalue,
}: {
  searchinputvalue: string;
  setsearchinputvalue: Dispatch<SetStateAction<string>>;
}) {
  const popover = usePopover();

  function handleSearch(e: any) {
    setsearchinputvalue(e.target.value);
  }
  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
      >
        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <TextField
            fullWidth
            value={searchinputvalue}
            // eslint-disable-next-line
            onChange={handleSearch}
            placeholder="Axtarış..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />

          <IconButton onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>
      </Stack>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          {/* <MenuItem
            onClick={() => {
              popover.onClose();
            }}
          >
            <Iconify icon="solar:file-download-bold" />
            Çıxarış
          </MenuItem> */}
        </MenuList>
      </CustomPopover>
    </>
  );
}
