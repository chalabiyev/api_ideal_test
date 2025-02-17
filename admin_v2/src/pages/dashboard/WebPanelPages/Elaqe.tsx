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
import { ContactInfoFormData } from './types';
import usePatch from 'src/api/usePatch';
import usePost from 'src/api/usePost';

const Elaqe = () => {
  const router = useRouter();
  const {
    data: contactData,
    hasData: contactHasData,
    loading: contactDataLoading,
    refetch: contactDataRefetch,
  } = useApi(`/content/contact-info/list`);

  const [ID, setID] = useState<null | string>(null);
  const [contactState, setContactState] = useState<ContactInfoFormData>({
    phoneNumber: '',
    insurancePhoneNumber: '',
    email: '',
    locationUrl: '',
    location: '',
    socials: {
      instagram: '',
      facebook: '',
      twitter: '',
      linkedin: '',
      youtube: '',
      tiktok: '',
      telegram: '',
      whatsapp: '',
    },
    businessHours: [
      {
        day: '',
        openTime: '',
        closeTime: '',
      },
      {
        day: '',
        openTime: '',
        closeTime: '',
      },
    ],
  });

  const { patchData: updateContactData } = usePatch(`content/contact-info/${ID}`);
  const { postData: createContactData } = usePost('/content/contact-info/create');

  useEffect(() => {
    if (contactHasData) {
      setContactState(contactData[0]);
      setID(contactData[0].id);
    }
  }, [contactHasData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactState((prev) => ({ ...prev, [name]: value }));
  };

  const handleBusinessHoursChange = (
    index: number,
    field: 'day' | 'openTime' | 'closeTime',
    value: string
  ) => {
    setContactState((prev: any) => {
      const updatedBusinessHours = [...prev.businessHours];
      updatedBusinessHours[index] = { ...updatedBusinessHours[index], [field]: value };
      return { ...prev, businessHours: updatedBusinessHours };
    });
  };
  const handleModifyContact = async () => {
    if (ID) {
      try {
        await updateContactData(contactState);
        toast.success('Məlumatlar yeniləndi');
        contactDataRefetch();
      } catch (err) {
        toast.error('Xəta baş verdi');
      }
    } else {
      toast.promise(createContactData(contactState), {
        loading: 'Əlaqə məlumatları yaradılır...',
        // eslint-disable-next-line
        success: (response) => {
          contactDataRefetch();
          return `Məlumat yaradıldı!`;
        },
        error: (err) => {
          const errorMessage = err.response?.data?.message || 'Olmadığı üçün xəta';
          return `Xəta: ${errorMessage}`;
        },
      });
    }
  };

  if (contactDataLoading) {
    return <LoadingScreen />;
  }
  if (!contactHasData) {
    return (
      <EmptyContent
        action={
          <Button sx={{ mt: 1 }} onClick={handleModifyContact} variant="soft">
            Yenisini yarat
          </Button>
        }
        title="Əlaqə məlumatları yoxdur"
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
          heading="Əlaqə"
          links={[{ name: 'Veb sayt idarə paneli' }, { name: 'Əlaqə' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Card>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Telefon nömrəsi"
                  name="phoneNumber"
                  placeholder="məs: +994501234567"
                  value={contactState.phoneNumber || ''}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Sığorta səhifəsində görünən telefon nömrəsi"
                  name="insurancePhoneNumber"
                  placeholder="məs: +994501234567"
                  value={contactState.insurancePhoneNumber || ''}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="E-poçt"
                  name="email"
                  placeholder="məs: ideal@kredit.az"
                  value={contactState.email || ''}
                  onChange={handleChange}
                />
              </Grid>{' '}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Məkan linki"
                  name="locationUrl"
                  placeholder="məs: https://maps.app.goo.gl/EizopbpcMVKqQJhD7"
                  value={contactState.locationUrl || ''}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  label="Məkan adı"
                  name="location"
                  placeholder="məs: Bakı şəhəri, Ziya Bünyadov prospekti, “Çinar Park” Biznes mərkəzi (2-ci bina, 4-cü mərtəbə)"
                  value={contactState.location || ''}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* is saatlarl  */}
        <Typography variant="h5" sx={{ mt: 2 }}>
          İş saatları
        </Typography>

        <Card>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Grid container spacing={2}>
              {/* Həftə içi iş günləri */}
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Həftə içi iş günləri"
                  placeholder="məs: Bazar ertəsi - Cümə"
                  value={contactState.businessHours[0].day || ''}
                  onChange={(e) => handleBusinessHoursChange(0, 'day', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Açılış saatı"
                  placeholder="məs: 09:00"
                  value={contactState.businessHours[0].openTime || ''}
                  onChange={(e) => handleBusinessHoursChange(0, 'openTime', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Bağlanma saatı"
                  placeholder="məs: 18:00"
                  value={contactState.businessHours[0].closeTime || ''}
                  onChange={(e) => handleBusinessHoursChange(0, 'closeTime', e.target.value)}
                />
              </Grid>

              {/* Həftə sonu iş günləri */}
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Həftə sonu iş günləri"
                  placeholder="məs: Şənbə - Bazar"
                  value={contactState.businessHours[1].day || ''}
                  onChange={(e) => handleBusinessHoursChange(1, 'day', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Açılış saatı"
                  placeholder="məs: 10:00"
                  value={contactState.businessHours[1].openTime || ''}
                  onChange={(e) => handleBusinessHoursChange(1, 'openTime', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Bağlanma saatı"
                  placeholder="məs: 16:00"
                  value={contactState.businessHours[1].closeTime || ''}
                  onChange={(e) => handleBusinessHoursChange(1, 'closeTime', e.target.value)}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* is saatlarl  */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          Sosial media
        </Typography>
        <Card>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Grid container spacing={2}>
              {Object.entries(contactState.socials).map(([key, value]) => (
                <Grid key={key} item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    name={key}
                    placeholder={`məs: https://${key}.com/username`}
                    value={value || ''}
                    onChange={(e) => {
                      setContactState((prev) => ({
                        ...prev,
                        socials: { ...prev.socials, [key]: e.target.value },
                      }));
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        <Button onClick={handleModifyContact} sx={{ mt: 2 }} variant="contained">
          Yadda saxla
        </Button>
      </DashboardContent>
    </>
  );
};

export default Elaqe;
