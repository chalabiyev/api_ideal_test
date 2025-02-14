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
    title: 'Sürətli pul krediti',
    description: 'lorem ipsum fdsf s dolor sit amet',
    image:
      'https://images.unsplash.com/photo-1738447429433-69e3ecd0bdd0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    title: 'Ev krediti',
    description: 'Faizsiz ilkin ödəniş',
    image:
      'https://images.unsplash.com/photo-1738447429433-69e3ecd0bdd0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    title: 'İpoteka krediti',
    description: 'Uzunmüddətli ödəmə',
    image:
      'https://images.unsplash.com/photo-1738447429433-69e3ecd0bdd0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const Slayder = () => {
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

  const handleEdit = () => {
    handleMenuClose();
    router.push(`/webesassehife/slayderduzeliset?id=`);
  };

  const handleDelete = () => {
    toast.success('Silindi');
    handleMenuClose();
  };

  return (
    <>
      <Helmet>
        <title>İdeal Kredit | Slayder</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Slayder"
          links={[{ name: 'Veb sayt idarə paneli' }, { name: 'Slayder' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={() => {
                router.push(paths.webesassehife.slayderelaveet);
              }}
            >
              Əlavə et
            </Button>
          }
        />

        <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ p: 2 }}>
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
                <CardContent sx={{ p: 1, pl: 2 }}>
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
              router.push(`/webesassehife/slayderduzeliset/${selectedIndex}`);
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

export default Slayder;
