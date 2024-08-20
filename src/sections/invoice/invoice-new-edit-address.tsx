import { useFormContext } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { _addressBooks } from 'src/_mock';

import { Iconify } from 'src/components/iconify';

import { Field } from 'src/components/hook-form';
import { Box, CardHeader, MenuItem } from '@mui/material';

import { AddressListDialog } from '../address';

// ----------------------------------------------------------------------

export function InvoiceNewEditAddress() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const mdUp = useResponsive('up', 'md');

  const values = watch();

  const { invoiceFrom, invoiceTo } = values;

  const from = useBoolean();

  const to = useBoolean();

  return (
      <Stack
        spacing={{ xs: 3, md: 5 }}
        direction={{ xs: 'column', md: 'column' }}
        divider={
          <Divider
            flexItem
            orientation={mdUp ? 'vertical' : 'horizontal'}
            sx={{ borderStyle: 'dashed' }}
          />
        }
        sx={{ p: 3 }}
      >
        <Stack sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Field.Text name="hesabFaktura" label="Hesab-Faktura" />
          <Field.Select name="companyName" label="Şirkətin adı">
            {_addressBooks.map((address) => (
              <MenuItem key={address.id} value={address.company}>
                {address.company}
              </MenuItem>
            ))}
          </Field.Select>
          <Field.Text name="companyCode" label="Kodu" />
          <Field.Text name="muxbirHesab" label="Müxbir Hesab" />
          <Field.Text name="swift" label="SWIFT" />
        </Stack>
      </Stack>
  );
}
