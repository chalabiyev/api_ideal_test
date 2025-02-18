import { useEffect, useState } from 'react';
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
import { useParams, useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import usePatch from 'src/api/usePatch';
import useApi from 'src/api/useApi';
import { LoadingScreen } from 'src/components/loading-screen';
import { EmptyContent } from 'src/components/empty-content';

const SlayderDuzelisEt = () => {
  const { id } = useParams();
  const { patchData: updateSlideData } = usePatch(`content/slider/${id}`);

  const {
    data: slideData,
    hasData: slideHasData,
    loading: slideDataLoading,
    refetch: slideDataRefetch,
  } = useApi(`/content/slider/get?id=${id}`);

  useEffect(() => {
    if (slideHasData) {
      setSliderFormData(slideData);
    }
  }, [slideHasData]);

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

  const handleModifySlide = async () => {
    if (id) {
      try {
        await updateSlideData(sliderFormData);
        toast.success('Məlumatlar yeniləndi');
        router.push(paths.webesassehife.slayder);
      } catch (err) {
        toast.warning('Xəta baş verdi');
      }
    }
  };

  if (slideDataLoading) {
    return <LoadingScreen />;
  }

  if (!slideHasData) {
    return (
      <EmptyContent
        action={
          <Button
            sx={{ mt: 1 }}
            variant="soft"
            onClick={() => {
              router.push(paths.webesassehife.slayderelaveet);
            }}
          >
            Əlavə et
          </Button>
        }
        title="Slayder məlumatları yoxdur"
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>İdeal Kredit | Düzəliş et</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading={sliderFormData.title}
          links={[
            { name: 'Veb sayt idarə paneli' },
            { name: 'Bütün slayderlər', href: '/webesassehife/slayder' },
            { name: 'Düzəliş et' },
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
              onClick={handleModifySlide}
              type="submit"
              color="success"
              variant="contained"
            >
              Dəyişiklikləri yaddaşa ver
            </Button>
          </CardContent>
        </Card>
      </DashboardContent>
    </>
  );
};

export default SlayderDuzelisEt;
