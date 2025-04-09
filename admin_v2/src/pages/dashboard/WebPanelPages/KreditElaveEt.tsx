import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
  CardActionArea,
  CardActions,
  Tooltip,
  Grid,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { CreditFormData } from './types';
import { uploadFile, uploadPublicFile } from 'src/api/FileService';
import { toast } from 'sonner';
import { Image } from 'src/components/image';
import { BASE_URL } from 'src/api/request';
import usePost from 'src/api/usePost';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

const KreditElaveEt = () => {
  const router = useRouter();
  const { postData: createCredit, loading, error } = usePost('/content/credit-type/create');
  const [creditFormData, setCreditFormData] = useState<CreditFormData>({
    title: '',
    description: '',
    image: '',
    bannerImage: '',
    requirements: {
      age: '',
      documents: '',
      guarantor: '',
      mortgage: '',
    },
    conditions: {
      minAmount: '',
      maxAmount: '',
      minPeriod: '',
      maxPeriod: '',
      minRate: '',
      maxRate: '',
      minFIFD: '',
      maxFIFD: '',
      currency: 'AZN',
      commissionRate: '',
      requiredDocuments: '',
    },
    videoDescription: {
      title: '',
      shortDescription: '',
      description: '',
      videoUrl: '',
    },
  });

  useEffect(() => {
    console.log('creditFormData', creditFormData);
  }, [creditFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequirementsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreditFormData((prev) => ({
      ...prev,
      requirements: {
        ...prev.requirements,
        [name]: value,
      },
    }));
  };

  const handleConditionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreditFormData((prev) => ({
      ...prev,
      conditions: {
        ...prev.conditions,
        [name]: value,
      },
    }));
  };

  const handleVideoDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreditFormData((prev) => ({
      ...prev,
      videoDescription: {
        ...prev.videoDescription,
        [name]: value,
      },
    }));
  };

  const handleBannerImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const response = await uploadPublicFile(file);
      if (response) {
        console.log('res', response);
        setCreditFormData((prev) => ({ ...prev, bannerImage: response.data.message }));
        toast.success('Şəkil yükləndi!');
      }
    } catch (error) {
      toast.error('Şəkil yüklənərkən xəta baş verdi!');
    }
  };
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const response = await uploadPublicFile(file);
      if (response) {
        console.log('res', response);
        setCreditFormData((prev) => ({ ...prev, image: response.data.message }));
        toast.success('Şəkil yükləndi!');
      }
    } catch (error) {
      toast.error('Şəkil yüklənərkən xəta baş verdi!');
    }
  };

  const handleCreateCredit = async () => {
    toast.promise(createCredit(creditFormData), {
      loading: 'Yeni kredit yaradılır...',
      // eslint-disable-next-line
      success: (response) => {
        router.push(paths.webkredit.kreditler);
        return `Məlumat yaradıldı!`;
      },
      error: (err) => {
        const errorMessage = err.response?.data?.message || 'Olmadığı üçün xəta';
        return `Xəta: ${errorMessage}`;
      },
    });
  };

  function isValid() {
    if (!creditFormData.title || !creditFormData.bannerImage || !creditFormData.image) {
      return false;
    }
    return true;
  }

  return (
    <>
      <Helmet>
        <title>İdeal Kredit | Yeni Kredit</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Yeni Kredit"
          links={[
            { name: 'Veb sayt idarə paneli' },
            { name: 'Bütün kreditlər', href: '/webkredit/kreditler' },
            { name: 'Yeni kredit' },
          ]}
        />

        <Card sx={{ mt: 3 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Kreditin adı"
              name="title"
              value={creditFormData.title || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Açıqlama"
              name="description"
              value={creditFormData.description || ''}
              onChange={handleChange}
            />

            <Grid container spacing={2}>
              {/* For Banner Image Section */}
              <Grid item xs={12} md={6}>
                <Typography sx={{ mt: 2 }} variant="button">
                  Kreditin örtük şəkli
                </Typography>
                {creditFormData.bannerImage ? (
                  <img
                    alt="Əsas şəkil"
                    src={`${BASE_URL}/file/getPublicFile/${creditFormData.bannerImage}`}
                    className="w-full h-[288px] rounded-md object-cover"
                  />
                ) : (
                  ''
                )}
                <Button
                  fullWidth
                  sx={{ mt: 2 }}
                  variant="contained"
                  color={creditFormData.bannerImage ? 'secondary' : 'primary'}
                  component="label"
                >
                  {creditFormData.bannerImage ? 'Seçilmiş şəkli dəyişdir' : 'Əsas şəkil yüklə'}
                  <input type="file" hidden accept="image/*" onChange={handleBannerImageChange} />
                </Button>
              </Grid>

              {/* For Cover Image Section */}
              <Grid item xs={12} md={6}>
                <Typography sx={{ mt: 2 }} variant="button">
                  Əsas şəkil
                </Typography>
                {creditFormData.image ? (
                  <img
                    alt="Örtük şəkli"
                    src={`${BASE_URL}/file/getPublicFile/${creditFormData.image}`}
                    className="w-full h-[288px] rounded-md object-cover"
                  />
                ) : (
                  ''
                )}
                <Button
                  fullWidth
                  sx={{ mt: 2 }}
                  variant="contained"
                  color={creditFormData.image ? 'secondary' : 'primary'}
                  component="label"
                >
                  {creditFormData.image ? 'Seçilmiş şəkli dəyişdir' : 'Örtük şəkil yüklə'}
                  <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* requirements  */}
        <Card sx={{ mt: 4 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ mb: 0 }} variant="button">
              Tələblər
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Yaşı"
                  name="age"
                  value={creditFormData.requirements.age || ''}
                  onChange={handleRequirementsChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tələb olunan sənəd"
                  name="documents"
                  value={creditFormData.requirements.documents}
                  onChange={handleRequirementsChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Zamin"
                  name="guarantor"
                  value={creditFormData.requirements.guarantor}
                  onChange={handleRequirementsChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Girov"
                  name="mortgage"
                  value={creditFormData.requirements.mortgage}
                  onChange={handleRequirementsChange}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* conditions */}
        <Card sx={{ mt: 4 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ mb: 0 }} variant="button">
              Şərtlər
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Minimum məbləğ"
                  name="minAmount"
                  value={creditFormData.conditions.minAmount || ''}
                  onChange={handleConditionsChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Maksimum məbləğ"
                  name="maxAmount"
                  value={creditFormData.conditions.maxAmount || ''}
                  onChange={handleConditionsChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Minimum faiz"
                  name="minRate"
                  value={creditFormData.conditions.minRate || ''}
                  onChange={handleConditionsChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Maksimum faiz"
                  name="maxRate"
                  value={creditFormData.conditions.maxRate || ''}
                  onChange={handleConditionsChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Maksimum kredit müddəti"
                  name="maxPeriod"
                  value={creditFormData.conditions.maxPeriod || ''}
                  onChange={handleConditionsChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Minimum kredit müddəti"
                  name="minPeriod"
                  value={creditFormData.conditions.minPeriod || ''}
                  onChange={handleConditionsChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Maksimum faktiki illik faiz dərəcəsi (FİFD)"
                  name="maxFIFD"
                  value={creditFormData.conditions.maxFIFD || ''}
                  onChange={handleConditionsChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Minimum faktiki illik faiz dərəcəsi (FİFD)"
                  name="minFIFD"
                  value={creditFormData.conditions.minFIFD || ''}
                  onChange={handleConditionsChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tələb olunan sənədlər"
                  name="requiredDocuments"
                  value={creditFormData.conditions.requiredDocuments || ''}
                  onChange={handleConditionsChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Komissiya xərci"
                  name="commissionRate"
                  value={creditFormData.conditions.commissionRate || ''}
                  onChange={handleConditionsChange}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Video məlumat */}
        <Card sx={{ mt: 4 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ mb: 0 }} variant="button">
              Video məlumat
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Başlığı"
                  name="title"
                  value={creditFormData.videoDescription.title || ''}
                  onChange={handleVideoDescriptionChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Açıqlaması"
                  name="description"
                  value={creditFormData.videoDescription.description || ''}
                  onChange={handleVideoDescriptionChange}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  placeholder="https://www.youtube.com/embed/VIDEO_ID"
                  fullWidth
                  label="Video linki"
                  name="videoUrl"
                  value={creditFormData.videoDescription.videoUrl || ''}
                  onChange={handleVideoDescriptionChange}
                />
              </Grid>
            </Grid>

            <Tooltip title={`${isValid() === false ? 'Bütün məlumatlar doldurulmalıdır' : ''}`}>
              <Box sx={{ cursor: isValid() == false ? 'not-allowed' : 'pointer' }}>
                <Button
                  fullWidth
                  disabled={isValid() === false}
                  onClick={handleCreateCredit}
                  size="large"
                  type="submit"
                  color="success"
                  variant="contained"
                >
                  Yadda Saxla
                </Button>
              </Box>
            </Tooltip>
          </CardContent>
        </Card>
      </DashboardContent>
    </>
  );
};

export default KreditElaveEt;
