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
import { InfoI } from './types';
import { uploadPublicFile } from 'src/api/FileService';
import { toast } from 'sonner';
import { BASE_URL } from 'src/api/request';
import usePost from 'src/api/usePost';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

const HaqqimizdaElaveEt = () => {
  const router = useRouter();
  const { postData: createInfo, loading, error } = usePost('/content/info/create');
  const [infoFormData, setInfoFormData] = useState<InfoI>({
    title: '',
    description: '',
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfoFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const response = await uploadPublicFile(file);
      if (response) {
        console.log('res', response);
        setInfoFormData((prev) => ({ ...prev, image: response.data.message }));
        toast.success('Şəkil yükləndi!');
      }
    } catch (error) {
      toast.error('Şəkil yüklənərkən xəta baş verdi!');
    }
  };

  const handleCreateInfo = async () => {
    toast.promise(createInfo(infoFormData), {
      loading: 'Yeni kart yaradılır...',
      // eslint-disable-next-line
      success: (response) => {
        router.push(paths.websirket.haqqimizda);
        return `Yeni kart yaradıldı!`;
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
        <title>İdeal Kredit | Yeni kart</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Yeni kart"
          links={[
            { name: 'Veb sayt idarə paneli' },
            { name: 'Haqqımızda kartları', href: `/websirket/haqqimizda` },
            { name: 'Yeni kart' },
          ]}
        />

        <Card sx={{ mt: 3 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Başlıq"
              name="title"
              value={infoFormData.title || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Açıqlama"
              name="description"
              value={infoFormData.description || ''}
              onChange={handleChange}
            />

            <Typography sx={{ mt: 2 }} variant="button">
              Şəkil
            </Typography>
            {infoFormData.image ? (
              <img
                alt="Əsas şəkil"
                src={`${BASE_URL}/file/getPublicFile/${infoFormData.image}`}
                className="w-full h-[288px] rounded-md object-cover"
              />
            ) : (
              ''
            )}
            <Button
              fullWidth
              variant="contained"
              color={infoFormData.image ? 'secondary' : 'primary'}
              component="label"
            >
              {infoFormData.image ? 'Seçilmiş şəkli dəyişdir' : 'Əsas şəkil yüklə'}
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>

            <Divider />
            <Button
              disabled={
                infoFormData.image === '' ||
                infoFormData.title === '' ||
                infoFormData.description === ''
              }
              onClick={handleCreateInfo}
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

export default HaqqimizdaElaveEt;
