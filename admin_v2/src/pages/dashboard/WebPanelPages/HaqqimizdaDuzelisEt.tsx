import { useState } from 'react';
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
  TextField,
  Divider,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Helmet } from 'react-helmet-async';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { toast } from 'sonner';
import { BASE_URL } from 'src/api/request';
import { uploadPublicFile } from 'src/api/FileService';

const HaqqimizdaDuzelisEt = () => {
  const router = useRouter();

  const [aboutCardInfo, setAboutCardInfo] = useState({
    title: '',
    description: '',
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAboutCardInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
  
      try {
        const response = await uploadPublicFile(file);
        if (response) {
          console.log('res', response);
          setAboutCardInfo((prev) => ({ ...prev, image: response.data.message }));
          toast.success('Şəkil yükləndi!');
        }
      } catch (error) {
        toast.error('Şəkil yüklənərkən xəta baş verdi!');
      }
    };

  return (
    <>
      <Helmet>
        <title>İdeal Kredit | Haqqımızda</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Bura ad gelecek"
          links={[
            { name: 'Veb sayt idarə paneli' },
            { name: 'Haqqımızda səhifəsi', href: paths.websirket.haqqimizda },
            { name: 'Düzəıiş et' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card sx={{ mt: 3 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Başlıq"
              name="title"
              value={aboutCardInfo.title || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Açıqlama"
              name="description"
              value={aboutCardInfo.description || ''}
              onChange={handleChange}
            />

            <Typography sx={{ mt: 2 }} variant="button">
              Əsas şəkil
            </Typography>
            {aboutCardInfo.image ? (
              <img
                alt="Əsas şəkil"
                src={`${BASE_URL}/file/getPublicFile/${aboutCardInfo.image}`}
                className="w-full h-[288px] rounded-md object-cover"
              />
            ) : (
              ''
            )}
            <Button
              fullWidth
              variant="contained"
              color={aboutCardInfo.image ? 'secondary' : 'primary'}
              component="label"
            >
              {aboutCardInfo.image ? 'Seçilmiş şəkli dəyişdir' : 'Əsas şəkil yüklə'}
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>

            <Divider />
            <Button
              disabled={
                aboutCardInfo.image === '' ||
                aboutCardInfo.title === '' ||
                aboutCardInfo.description === ''
              }
              // onClick={handleModifyInsurance}
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

export default HaqqimizdaDuzelisEt;
