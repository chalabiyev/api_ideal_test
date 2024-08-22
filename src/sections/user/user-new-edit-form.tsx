import type { IUserItem } from 'src/types/user';

import { z as zod } from 'zod';
import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';

import { PRODUCT_GENDER_OPTIONS } from 'src/_mock';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { familyRelationshipOptions } from '../_examples/extra/form-validation-view/react-hook-form';

// ----------------------------------------------------------------------

export type NewUserSchemaType = zod.infer<typeof NewUserSchema>;

export const NewUserSchema = zod.object({
  fin: zod.string().min(1, { message: 'Fin is required!' }),
  serialNumber: zod.string().min(1, { message: 'Ş/V seriyası və nömrəsi is required!' }),
  passportStatus: zod.string().min(1, { message: 'Vəsiqənin statusu is required!' }),
  avatarUrl: schemaHelper.file({ message: { required_error: 'Avatar is required!' } }),
  name: zod.string().min(1, { message: 'Name is required!' }),
  surname: zod.string().min(1, { message: 'Surname is required!' }),
  fatherName: zod.string().min(1, { message: 'Father name is required!' }),
  born: zod.string().min(1, { message: 'Born is required!' }),
  familyRelationship: zod.string().min(1, { message: 'Family relationship is required!' }),
  gender: zod.string().min(1, { message: 'Gender is required!' }),
  state: zod.string().min(1, { message: 'State is required!' }),
  city: zod.string().min(1, { message: 'City is required!' }),
  zipCode: zod.string().min(1, { message: 'Zip code is required!' }),
  role: zod.string().min(1, { message: 'Role is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  phoneNumber: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  country: zod.string().min(1, { message: 'Country is required!' }),
  status: zod.string().optional(),
});

// ----------------------------------------------------------------------

type Props = {
  currentUser?: IUserItem;
};

export function UserNewEditForm({ currentUser }: Props) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      status: currentUser?.status || '',
      avatarUrl: currentUser?.avatarUrl || null,
      isVerified: currentUser?.isVerified || true,
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      country: currentUser?.country || '',
      state: currentUser?.state || '',
      city: currentUser?.city || '',
      address: currentUser?.address || '',
      zipCode: currentUser?.zipCode || '',
      company: currentUser?.company || '',
      role: currentUser?.role || '',
    }),
    [currentUser]
  );

  const methods = useForm<NewUserSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentUser ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.user.list);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentUser && (
              <Label
                color={
                  (values.status === 'active' && 'success') ||
                  'warning'
                }
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <Field.UploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

          

            {currentUser && (
              <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Button variant="soft" color="error">
                  Delete user
                </Button>
              </Stack>
            )}
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' }}
            >
              <Box
                display="grid"
                rowGap={3}
                columnGap={2}
                gridTemplateColumns={{ xs: 'repeat(3  , 1fr)' }}
              >
                <Field.Text name="fin" label="Fin" />
                <Field.Text name="serialNumber" label="Ş/V seriyası və nömrəsi" />
                <Field.Text name="passportStatus" label="Vəsiqənin statusu" />
              </Box>

              <Box
                display="grid"
                rowGap={3}
                columnGap={2}
                gridTemplateColumns={{ xs: 'repeat(2  , 1fr)' }}
              >
                <Field.Text name="name" label="Adı" />
                <Field.Text name="surname" label="Soyadı" />
                <Field.Text name="fatherName" label="Ata adı" />
                <Field.Text name="born" label="Doğum tarixi" />
                <Field.Text name="email" label="Email" />
                <Field.Text name="country" label="Ölkə" />
                <Field.Text name="state" label="Şəhər" />
                <Field.Text name="city" label="Rayon" />
                <Field.Text name="zipCode" label="Poçt kodu" />
                <Field.Text name="role" label="Rol" />
                <Field.Select
                  native
                  name="familyRelationship"
                  label="Ailə vəziyyəti"
                  InputLabelProps={{ shrink: true }}
                >
                  {familyRelationshipOptions.map((option: any) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field.Select>
                <Field.Select native name="gender" label="Cinsi" InputLabelProps={{ shrink: true }}>
                  {PRODUCT_GENDER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field.Select>
              </Box>

              <Field.Text name="address" label="Qeydiyyatda olduğu ünvan" />
              <Field.Text name="phoneNumber" label="Telefon nömrəsi" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentUser ? 'User yarat' : 'Save changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
