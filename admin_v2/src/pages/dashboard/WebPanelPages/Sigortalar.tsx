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
    type: 'Fərdi sığorta',
    id: 1,
    title: 'Sürətli pul krediti',
    description: 'lorem ipsum fdsf s dolor sit amet',
    image:
      'https://wallpapers.com/images/hd/chevrolet-cruze-hatchback-png-06232024-q5g01hqgocoeoxlv.jpg',
  },
  {
    type: 'Fərdi sığorta',
    id: 2,
    title: 'Ev krediti',
    description: 'Faizsiz ilkin ödəniş',
    image:
      'https://wallpapers.com/images/hd/chevrolet-cruze-hatchback-png-06232024-q5g01hqgocoeoxlv.jpg',
  },

  {
    type: 'Korporativ sığorta',
    id: 4,
    title: 'İpoteka krediti',
    description: 'Uzunmüddətli ödəmə',
    image:
      'https://wallpapers.com/images/hd/chevrolet-cruze-hatchback-png-06232024-q5g01hqgocoeoxlv.jpg',
  },
];

const Sigortalar = () => {
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
        <title>İdeal Kredit | Sığortalar</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Sığortalar"
          links={[{ name: 'Veb sayt idarə paneli' }, { name: 'Sığortalar' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={() => {
                router.push(paths.websigorta.sigortaelaveet);
              }}
            >
              Əlavə et
            </Button>
          }
        />
        <Typography variant="h5" gutterBottom>
          Fərdi sığortalar
        </Typography>
        <Grid container spacing={2}>
          {data
            .filter((a) => a.type === 'Fərdi sığorta')
            .map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card sx={{ p: 2 }}>
                  <CardMedia
                    sx={{
                      background: 'linear-gradient(to right, #157FBB, #2375b0, #0C6495)',
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
                      <Typography variant="h6">{item.title}</Typography>

                      <IconButton onClick={(event) => handleMenuOpen(event, index)}>
                        <MoreVertIcon />
                      </IconButton>
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Typography variant="h5" sx={{ mt: 5 }} gutterBottom>
          Korporativ sığortalar
        </Typography>
        <Grid container spacing={2}>
          {data
            .filter((a) => a.type === 'Korporativ sığorta')
            .map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card sx={{ p: 2 }}>
                  <CardMedia
                    sx={{
                      background: 'linear-gradient(to right, #157FBB, #2375b0, #0C6495)',
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
                      <Typography variant="h6">{item.title}</Typography>

                      <IconButton onClick={(event) => handleMenuOpen(event, index)}>
                        <MoreVertIcon />
                      </IconButton>
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                      {item.description}
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
              router.push(`/websigorta/sigortaduzeliset/${selectedIndex}`);
            }}
          >
            Düzəliş et
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'red' }}>
            Sil
          </MenuItem>
        </Menu>
      </DashboardContent>
    </>
  );
};

export default Sigortalar;
