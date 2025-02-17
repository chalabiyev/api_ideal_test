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
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Helmet } from 'react-helmet-async';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { toast } from 'sonner';

const data = [
  {
    id: 1,
    title: 'İdeal Kredit',
    description:
      'Bank Olmayan Kredit Təşkilatı "İdeal Kredit” Məhdud Məsuliyyətli Cəmiyyəti "İdeal Kredit” adı ilə 11.11.2014-cü il tarixdən fəaliyyətə başlayıb və  öz fəaliyyətini bir neçə fundamental istiqamətdə davam...',
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    title: 'Müştərilərlə qarşılıqlı əlaqələr',
    description:
      'Kredit bazarında aparıcı təşkilatlardan olan "İdeal Kredit” müştərilərlə qarşılıqlı əlaqələrə xüsusi önəm verir. BOKT müştərilərlə əlaqəni çoxsaylı kommunikasiya vasitələri ilə saxlayır...',
    image:
      'https://images.unsplash.com/photo-1603201667141-5a2d4c673378?q=80&w=1792&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    title: 'Bizim inkişaf strategiyamız',
    description:
      '2014-cü ildə "İdeal Kredit”-in Müşahidə Şurası BOKT-un yeni strateji inkişaf proqramını təsdiq etdi. Proqramın əsas cəhətlərindən bir neçəsini filial şəbəkəsinin genişləndirilməsi, risklərin və maliyyə göstəricilərin strateji tənzimlənməsi,xidmət keyfiyyətinin yaxşılaşdırılması təşkil edir. Proqram çərçivəsində "İdeal Kredit”-in paytaxt və regionlarda yeni filialları açılır. Bundan başqa, müştəri xidmətlərində texnoloji yeniliklərin, yeni kredit məhsul və xidmətlərinin tətbiqi, kadr potensialının təkmilləşdirilməsinə xüsusi diqqət yetirilir.. Müştərilərin gözləntilərini qarşılamaq və "İdeal Seçim” şüarını doğrultmaqda davam etmək üçün "İdeal Kredit” özünün dinamik inkişafına davam edəcək.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const HaqqimizdaPage = () => {
  const router = useRouter();

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleMenuOpen = (event: any, index: any) => {
    setMenuAnchor(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedIndex(null);
  };

  const handleDelete = () => {
    toast.success('Silindi');
    handleMenuClose();
  };

  return (
    <>
      <Helmet>
        <title>İdeal Kredit | Haqqımızda</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Haqqımızda"
          links={[{ name: 'Veb sayt idarə paneli' }, { name: 'Haqqımızda səhifəsi' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ p: 2, maxHeight: 390 }}>
                <CardMedia
                  sx={{
                    background: 'linear-gradient(to right, #110792, #0B0C6A, #123566)',
                    borderRadius: '8px',
                  }}
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.title}
                ></CardMedia>
                <CardContent sx={{ p: 0, pt: 1 }}>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="h6">
                      {item.title.slice(0, 20)}
                      {item.title.length > 20 ? '...' : ''}
                    </Typography>

                    <IconButton onClick={(event) => handleMenuOpen(event, index)}>
                      <MoreVertIcon />
                    </IconButton>
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    {item.description.slice(0, 150)}...
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Açılan menyu */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem
            onClick={() => {
              handleMenuClose();
              router.push(`/websirket/haqqimizdaduzeliset/${selectedIndex}`);
            }}
          >
            Düzəliş et
          </MenuItem>
        </Menu>
      </DashboardContent>
    </>
  );
};

export default HaqqimizdaPage;
