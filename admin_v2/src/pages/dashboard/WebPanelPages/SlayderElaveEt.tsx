import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { SliderListI } from './types';
import { uploadPublicFile } from 'src/api/FileService';
import { toast } from 'sonner';
import { BASE_URL } from 'src/api/request';
import usePost from 'src/api/usePost';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

const SigortaElaveEt = () => {
  const router = useRouter();
  const { postData: createSlider, loading, error } = usePost('/content/slider/create');
  const [sliderFormData, setSliderFormData] = useState<SliderListI>({
    title: '',
    subTitle: '',
    link: '',
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSliderFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const response = await uploadPublicFile(file);
      if (response) {
        console.log('res', response);
        setSliderFormData((prev) => ({ ...prev, image: response.data.message }));
        toast.success('Şəkil yükləndi!');
      }
    } catch (error) {
      toast.error('Şəkil yüklənərkən xəta baş verdi!');
    }
  };

  const handleCreateInsurance = async () => {
    toast.promise(createSlider(sliderFormData), {
      loading: 'Slayd yaradılır...',
      // eslint-disable-next-line
      success: (response) => {
        router.push(paths.webesassehife.slayder);
        return `Slayd yaradıldı!`;
      },
      error: (err) => {
        const errorMessage = err.response?.data?.message || 'Olmadığı üçün xəta';
        return `Xəta: ${errorMessage}`;
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>İdeal Kredit | Yeni Slayd</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Yeni Slayd"
          links={[
            { name: 'Veb sayt idarə paneli' },
            { name: 'Bütün slayderlər', href: '/webesassehife/slayder' },
            { name: 'Yeni slayd' },
          ]}
        />

        <Card sx={{ mt: 3 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Başlıq"
              name="title"
              value={sliderFormData.title || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Açıqlama"
              name="subTitle"
              value={sliderFormData.subTitle || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Link"
              name="link"
              value={sliderFormData.link || ''}
              onChange={handleChange}
            />

            <Typography sx={{ mt: 2 }} variant="button">
              Slayd şəkli
            </Typography>
            {sliderFormData.image ? (
              <img
                alt="Əsas şəkil"
                src={`${BASE_URL}/file/getPublicFile/${sliderFormData.image}`}
                className="w-full h-[288px] rounded-md object-cover"
              />
            ) : (
              ''
            )}
            <Button
              fullWidth
              variant="contained"
              color={sliderFormData.image ? 'secondary' : 'primary'}
              component="label"
            >
              {sliderFormData.image ? 'Seçilmiş şəkli dəyişdir' : 'Əsas şəkil yüklə'}
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>

            <Divider />
            <Button
              disabled={
                sliderFormData.image === '' ||
                sliderFormData.title === '' ||
                sliderFormData.subTitle === '' ||
                sliderFormData.link === ''
              }
              onClick={handleCreateInsurance}
              type="submit"
              color="success"
              variant="contained"
            >
              Yadda Saxla
            </Button>
          </CardContent>
        </Card>
      </DashboardContent>
    </>
  );
};

export default SigortaElaveEt;
