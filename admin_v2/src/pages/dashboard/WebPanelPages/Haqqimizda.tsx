import { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
  Box,
  Menu,
  MenuItem,
  Divider,
  TextField,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Helmet } from 'react-helmet-async';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { toast } from 'sonner';
import useApi from 'src/api/useApi';
import { EmptyContent } from 'src/components/empty-content';
import { LoadingScreen } from 'src/components/loading-screen';
import { AboutUsI } from './types';
import usePatch from 'src/api/usePatch';
import usePost from 'src/api/usePost';

const Elaqe = () => {
  const {
    data: aboutData,
    hasData: aboutHasData,
    loading: aboutDataLoading,
    refetch: aboutDataRefetch,
  } = useApi(`/content/about-us/list`);

  const [ID, setID] = useState<null | string>(null);
  const [aboutState, setAboutState] = useState<AboutUsI>({
    title: '',
    description: '',
    appleStoreLink: '',
    googlePlayLink: '',
  });

  const { patchData: updateAboutData } = usePatch(`content/about-us/${ID}`);
  const { postData: createAboutData } = usePost('/content/about-us/create');

  useEffect(() => {
    if (aboutHasData) {
      setAboutState(aboutData[0]);
      setID(aboutData[0].id);
    }
  }, [aboutHasData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAboutState((prev) => ({ ...prev, [name]: value }));
  };

  const handleModifyAbout = async () => {
    if (ID) {
      try {
        await updateAboutData(aboutState);
        toast.success('Məlumatlar yeniləndi');
        aboutDataRefetch();
      } catch (err) {
        toast.error('Xəta baş verdi');
      }
    } else {
      toast.promise(createAboutData(aboutState), {
        loading: 'Haqqımızda məlumatları yaradılır...',
        // eslint-disable-next-line
        success: (response) => {
          aboutDataRefetch();
          return `Məlumat yaradıldı!`;
        },
        error: (err) => {
          const errorMessage = err.response?.data?.message || 'Olmadığı üçün xəta';
          return `Xəta: ${errorMessage}`;
        },
      });
    }
  };

  if (aboutDataLoading) {
    return <LoadingScreen />;
  }
  if (!aboutHasData) {
    return (
      <EmptyContent
        action={
          <Button sx={{ mt: 1 }} onClick={handleModifyAbout} variant="soft">
            Yenisini yarat
          </Button>
        }
        title="Haqqımızda məlumatları yoxdur"
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>İdeal Kredit | Kreditlər</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Haqqımızda"
          links={[{ name: 'Veb sayt idarə paneli' }, { name: 'Haqqımızda' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Card>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Başlıq"
                  name="title"
                  value={aboutState.title || ''}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Açıqlama"
                  name="description"
                  value={aboutState.description || ''}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Google Play"
                  name="googlePlayLink"
                  value={aboutState.googlePlayLink || ''}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="App Store"
                  name="appleStoreLink"
                  value={aboutState.appleStoreLink || ''}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Button onClick={handleModifyAbout} sx={{ mt: 2 }} variant="contained">
          Yadda saxla
        </Button>
      </DashboardContent>
    </>
  );
};

export default Elaqe;
