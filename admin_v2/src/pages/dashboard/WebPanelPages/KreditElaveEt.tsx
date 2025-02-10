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

const KreditElaveEt = () => {
  const [formData, setFormData] = useState({
    title: 'title',
    subtitle: 'subtitle',
    link: 'link',
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
        <title>İdeal Kredit | Yeni Slayder</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Yeni Slayder"
          links={[
            { name: 'Veb sayt idarə paneli' },
            { name: 'Bütün slayderlər', href: '/webesassehife/slayder' },
            { name: 'Yeni slayder' },
          ]}
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
              label="Link"
              name="link"
              value={formData.link}
              onChange={handleChange}
            />

            {/* Şəkil Yükləmə Inputu */}
            <Button variant="contained" color={imageName ? 'info' : 'secondary'} component="label">
              {imageName ? 'Seçilmiş şəkli dəyişdir' : 'Şəkil yüklə'}
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>

            {/* Seçilən şəkil adı */}
            {imageName && (
              <Typography variant="body2" sx={{ mb: 2, fontWeight: 'bold' }}>
                Seçilmiş şəkil: {imageName}
              </Typography>
            )}

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

export default KreditElaveEt;
