import { useState } from 'react';
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
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { useRouter } from 'src/routes/hooks';

const Haqqimizda = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: 'title',
    subtitle: 'subtitle',
    link: 'link',
    googlePlay: 'googlePlay',
    appStore: 'appStore',
    imgUrl: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageName(file.name);
    }
  };

  return (
    <>
      <Helmet>
        <title>İdeal Kredit | Slayder</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Haqqımızda"
          links={[{ name: 'Veb sayt idarə paneli' }, { name: 'Haqqımızda' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Başlıq"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Altyazı"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="GooglePlay"
              name="googlePlay"
              value={formData.googlePlay}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="AppStore"
              name="appStore"
              value={formData.appStore}
              onChange={handleChange}
            />

            <Button
              disabled={!imageFile || !formData.title || !formData.subtitle || !formData.link}
              variant="contained"
              onClick={() => {
                console.log(formData);
              }}
            >
              Yadda Saxla
            </Button>
          </CardContent>
        </Card>
      </DashboardContent>
    </>
  );
};

export default Haqqimizda;
