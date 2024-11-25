import Stack from '@mui/material/Stack';
import { MenuItem } from '@mui/material';
import Divider from '@mui/material/Divider';

import { useResponsive } from 'src/hooks/use-responsive';

import { _addressBooks } from 'src/_mock';

import { Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export function InvoiceNewEditAddress() {

  const mdUp = useResponsive('up', 'md');

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
          <Field.Text name="voen" label="VÖEN" />
          <Field.Text name="acoount" label="Hesab" />
          <Field.Text name="muxbirHesab" label="Müxbir Hesab" />
          <Field.Text name="swift" label="SWIFT" />
        CDC</Stack>
      </Stack>
  );
}
