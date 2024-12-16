import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from 'src/auth/hooks';
import { signInWithPassword } from 'src/auth/context/jwt';
import { Box, Typography, useTheme } from '@mui/material';
import { CONFIG } from 'src/config-global';
import { bgGradient, varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export type SignInSchemaType = zod.infer<typeof SignInSchema>;

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'İstifadəçi adı vacibdir!' })
    .min(3, { message: 'İstifadəçi adı minimum 3 simvoldan ibarət olmalıdır!' }),
  password: zod
    .string()
    .min(1, { message: 'Şifrə vacibdir!' }) // Password is required
    .min(6, { message: 'Şifrə minimum 6 simvol olmalıdır!' }), // Password length validation
});

// ----------------------------------------------------------------------

export function JwtSignInView() {
  const theme = useTheme();
  const router = useRouter();
  const { checkUserSession } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState('');
  const password = useBoolean();

  const defaultValues = {
    email: 'admin',
    password: '123456',
  };

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signInWithPassword({
        username: data.email,
        password: data.password,
      });

      await checkUserSession?.();
      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMsg(error instanceof Error ? error.message : 'Login failed');
    }
  });

  const renderForm = (
    <Stack spacing={3}>
      <div className="w-full flex items-center justify-center">
        {/* <img src="/ideallogo.png" alt="İdeal Kredit logo" className="w-[60%]" /> */}
      </div>
      <Typography sx={{ textAlign: 'center' }} variant="h3">
        Daxil ol
      </Typography>
      <Field.Text
        name="email"
        label="Telefon nömrəsi"
        // InputLabelProps={{ shrink: true }}
        placeholder="Məs: 994123456789"
      />

      <Stack spacing={1.5}>
        <Field.Text
          name="password"
          label="Şifrə"
          placeholder="6+ simvol olmalıdır"
          type={password.value ? 'text' : 'password'}
          // InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Giriş et..."
      >
        Giriş et
      </LoadingButton>
    </Stack>
  );

  return (
    <DashboardContent
      maxWidth="xl"
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mx: 'auto',
        py: { xs: 3, md: 0 },
        px: { xs: 2, md: 0 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
        }}
      >
        {/* Şəkil Bölməsi */}
        <Box
          sx={{
            flex: 1,
            display: { xs: 'none', md: 'flex' },
            textAlign: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: { xs: '100%', md: '35%' },
            backgroundColor: `${theme.palette.background.neutral}`,
            height: { xs: '100%', md: '100vh' },
          }}
        >
          <Typography variant="h3" sx={{ mb: 2 }}>
            <img src="/ideallogo.png" alt="İdeal Kredit logo" className="w-[40%]" />
          </Typography>

          <Typography sx={{ color: 'text.secondary', textAlign: 'center', mt: 2 }}>
            İnternet BOKT-la işlərinizə sürət qatın!
          </Typography>

          <Box>
            <Box
              component="img"
              alt="Dashboard illustration"
              src={`${CONFIG.site.basePath}/assets/illustrations/illustration-dashboard.webp`}
              sx={{
                width: 1,
                aspectRatio: '4/3',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Box>

        {/* Form Bölməsi */}
        <Box
          sx={{
            flex: 1,
            maxWidth: { xs: '100%', md: '400px' }, // Formun eni ekran ölçüsünə görə dəyişir
            mx: 'auto', // Kiçik ekranlarda mərkəzləşdirir
            p: 3, // Daxili boşluq
          }}
        >
          {!!errorMsg && (
            <Alert severity="error" sx={{ mb: 3 }}>
              İstifadəçi adı və ya şifrə səhvdir
            </Alert>
          )}

          <Form methods={methods} onSubmit={onSubmit}>
            {renderForm}
          </Form>
        </Box>
      </Box>
    </DashboardContent>
  );
}
