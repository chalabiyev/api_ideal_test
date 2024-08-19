import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type NewChannelSchemaType = zod.infer<typeof NewChannelSchema>;

export const NewChannelSchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  description: schemaHelper.editor({ message: { required_error: 'Description is required!' } }),
  images: schemaHelper.files({ message: { required_error: 'Images is required!' } }),
  code: zod.string().min(1, { message: 'Product code is required!' }),
  sku: zod.string().min(1, { message: 'Product sku is required!' }),
  quantity: zod.number().min(1, { message: 'Quantity is required!' }),
  colors: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  sizes: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  tags: zod.string().array().min(2, { message: 'Must have at least 2 items!' }),
  gender: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  price: zod.number().min(1, { message: 'Price should not be $0.00' }),
  // Not required
  category: zod.string(),
  priceSale: zod.number(),
  subDescription: zod.string(),
  taxes: zod.number(),
  saleLabel: zod.object({ enabled: zod.boolean(), content: zod.string() }),
  newLabel: zod.object({ enabled: zod.boolean(), content: zod.string() }),
});

// ----------------------------------------------------------------------
interface IChannelItem {
  id: string;
  name: string;
}
type Props = {
  currentChannel?: IChannelItem;
};

export function ChannelNewEditForm({ currentChannel }: Props) {
  const router = useRouter();

  const [includeTaxes, setIncludeTaxes] = useState(false);

  const defaultValues = useMemo(
    () => ({
      name: currentChannel?.name || '',
    }),
    [currentChannel]
  );

  const methods = useForm<NewChannelSchemaType>({
    resolver: zodResolver(NewChannelSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const channelName = [
    { value: 'internet', label: 'Internet sayt' },
    { value: 'filial', label: 'Filial' },
    { value: 'partner', label: 'Partnyor' },
    { value: 'online', label: 'Online' },
    { value: 'bot', label: 'Bot' },
  ];

  const values = watch();

  useEffect(() => {
    if (currentChannel) {
      reset(defaultValues);
    }
  }, [currentChannel, defaultValues, reset]);


  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentChannel ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.product.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderDetails = (
    <Card>
      <CardHeader title="Yeni Kanal" sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <Field.Select native name="name" label="Kanalın adı" InputLabelProps={{ shrink: true }}>
            {channelName.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Field.Select>

          <Field.Text name="subDescription" label="Kanalın №" />
        </Box>
        <Divider />

        <Field.Text defaultValue={
          defaultValues.name
        } name="description" label="Kredit mütəxəssisi" />

        <Field.Text name="description" label="Mağaza adı" />

        <Field.Text name="description" label="URL-link" />
      </Stack>
    </Card>
  );

  const renderActions = (
    <Stack spacing={3} direction="row" alignItems="center" justifyContent="end" flexWrap="wrap">
      <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
        {!currentChannel ? 'Kanal Yarat' : 'Yadda saxla'}
      </LoadingButton>
    </Stack>
  );
  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails}

        {renderActions}
      </Stack>
    </Form>
  );
}
