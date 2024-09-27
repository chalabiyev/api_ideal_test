import type { IProductItem } from 'src/types/product';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import {
  _tags,
  PRODUCT_COLOR_NAME_OPTIONS,
  PRODUCT_GENDER_OPTIONS,
  PRODUCT_SIZE_OPTIONS,
  USER_CATEGORY_GROUP_OPTIONS,
} from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

export type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

export const NewProductSchema = zod.object({
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

type Props = {
  currentProduct?: IProductItem;
};

export function GirovNewEditForm({ currentProduct }: Props) {
  const router = useRouter();

  const [includeTaxes, setIncludeTaxes] = useState(false);
  const [displayCredit, setDisplayCredit] = useState(false);

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      subDescription: currentProduct?.subDescription || '',
      images: currentProduct?.images || [],
      //
      code: currentProduct?.code || '',
      sku: currentProduct?.sku || '',
      price: currentProduct?.price || 0,
      quantity: currentProduct?.quantity || 0,
      priceSale: currentProduct?.priceSale || 0,
      tags: currentProduct?.tags || [],
      taxes: currentProduct?.taxes || 0,
      gender: currentProduct?.gender || [],
      category: currentProduct?.category || USER_CATEGORY_GROUP_OPTIONS[0].classify[1],
      time: currentProduct?.time || USER_CATEGORY_GROUP_OPTIONS[0].classify[1],
      percentage: currentProduct?.percentage || USER_CATEGORY_GROUP_OPTIONS[0].classify[1],

      colors: currentProduct?.colors || [],
      sizes: currentProduct?.sizes || [],
      newLabel: currentProduct?.newLabel || { enabled: false, content: '' },
      saleLabel: currentProduct?.saleLabel || { enabled: false, content: '' },
    }),
    [currentProduct]
  );

  const methods = useForm<NewProductSchemaType>({
    resolver: zodResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentProduct) {
      reset(defaultValues);
    }
  }, [currentProduct, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentProduct?.taxes || 0);
    }
  }, [currentProduct?.taxes, includeTaxes, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentProduct ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.product.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      const filtered = values.images && values.images?.filter((file) => file !== inputFile);
      setValue('images', filtered);
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('images', [], { shouldValidate: true });
  }, [setValue]);
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayCredit(!displayCredit);
  };
  const renderDetails = (
    <Box
      columnGap={2}
      rowGap={3}
      display="grid"
      gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
    >
      <Field.Select
        native
        name="girovtype"
        label="Girov Əmlakın növü"
        InputLabelProps={{ shrink: true }}
      >
        {PRODUCT_SIZE_OPTIONS.map((classify) => (
          <option key={classify.value} value={classify.value}>
            {classify.label}
          </option>
        ))}
      </Field.Select>
      <Field.Select native name="total" label="Girov Məbləği" InputLabelProps={{ shrink: true }}>
        {PRODUCT_SIZE_OPTIONS.map((classify) => (
          <option key={classify.value} value={classify.value}>
            {classify.label}
          </option>
        ))}
      </Field.Select>
      <Field.Select native name="status" label="Status" InputLabelProps={{ shrink: true }}>
        {PRODUCT_SIZE_OPTIONS.map((classify) => (
          <option key={classify.value} value={classify.value}>
            {classify.label}
          </option>
        ))}
      </Field.Select>
    </Box>
  );

  const renderProperties = (
    <Card>
      <Box
        mb={5}
        onClick={() =>
          handleSwitchChange({
            target: { value: 'girovcreditbox', checked: !displayCredit },
          } as React.ChangeEvent<HTMLInputElement>)
        }
      >
        <Field.Switch name="girovcredit" label="Girovu kredite bağla" checked={displayCredit} />
      </Box>

      {!displayCredit && (
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <Field.Text
            name="credit"
            label="Kredit Məbləği"
            placeholder="0.00"
            type="number"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box component="span" sx={{ color: 'text.disabled' }}>
                    $
                  </Box>
                </InputAdornment>
              ),
            }}
          />
          <Field.Text
            name="credit"
            label="Kredit Məbləği"
            placeholder="0.00"
            type="number"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box component="span" sx={{ color: 'text.disabled' }}>
                    $
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}

      <Stack spacing={3} sx={{ p: 3 }}>
        <Box>
          <Box
            columnGap={2}
            rowGap={3}
            display="grid"
            my={5}
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
          >
            <Field.Text
              name="code"
              label="Fin"
              placeholder="0"
              type="number"
              InputLabelProps={{ shrink: true }}
            />
            <Field.Text
              name="code"
              label="Ş/V seriyası və nömrəsi"
              placeholder="0"
              type="number"
              InputLabelProps={{ shrink: true }}
            />
            <Field.Text
              name="code"
              label="Vəsiqənin statusu"
              placeholder="0"
              type="number"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box
            columnGap={2}
            rowGap={3}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          >
            <Field.Text
              name="code"
              label="Ad"
              placeholder="0"
              type="number"
              InputLabelProps={{ shrink: true }}
            />
            <Field.Text
              name="code"
              label="Soyad"
              placeholder="0"
              type="number"
              InputLabelProps={{ shrink: true }}
            />
            <Field.Text
              name="code"
              label="Ata adı"
              placeholder="0"
              type="number"
              InputLabelProps={{ shrink: true }}
            />
            <Field.Text
              name="code"
              label="Anadan olduğu il"
              placeholder="0"
              type="number"
              InputLabelProps={{ shrink: true }}
            />
            <Field.Text
              name="code"
              label="Ailə vəziyyəti"
              placeholder="0"
              type="number"
              InputLabelProps={{ shrink: true }}
            />
            <Field.Text
              name="code"
              label="Cinsi"
              placeholder="0"
              type="number"
              InputLabelProps={{ shrink: true }}
            />
            <Field.Text
              name="code"
              label="Qeydiyyatda olduğu ünvan"
              placeholder="0"
              type="number"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Images</Typography>
            <Field.Upload
              multiple
              thumbnail
              name="images"
              maxSize={3145728}
              onRemove={handleRemoveFile}
              onRemoveAll={handleRemoveAllFiles}
              onUpload={() => console.info('ON UPLOAD')}
            />
          </Stack>
        </Box>

        <Button
          type="button"
          sx={{ color: 'text.secondary',  }}
          onClick={
            ()=> handleSubmit
          } 
        >
          <Chip label="Əlavə et"sx={{p:3}} />
        </Button>
      </Stack>
    </Card>
  );
  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto' }}>
        {renderDetails}
        {renderProperties}
      </Stack>
    </Form>
  );
}
