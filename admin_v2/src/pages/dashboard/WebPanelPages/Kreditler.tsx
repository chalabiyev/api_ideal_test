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
      'https://t4.ftcdn.net/jpg/09/20/66/15/360_F_920661586_utQVLmBJdjfs9EUsyYAHfjt20YhvmwFK.jpg',
  },
  {
    id: 2,
    title: 'Ev krediti',
    description: 'Faizsiz ilkin ödəniş',
    image:
      'https://t4.ftcdn.net/jpg/09/20/66/15/360_F_920661586_utQVLmBJdjfs9EUsyYAHfjt20YhvmwFK.jpg',
  },
  {
    id: 3,
    title: 'İpoteka krediti',
    description: 'Uzunmüddətli ödəmə',
    image:
      'https://t4.ftcdn.net/jpg/09/20/66/15/360_F_920661586_utQVLmBJdjfs9EUsyYAHfjt20YhvmwFK.jpg',
  },
];

const Kreditler = () => {
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
          heading="Kreditlər"
          links={[{ name: 'Veb sayt idarə paneli' }, { name: 'Kreditlər' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={() => {
                router.push(paths.webkredit.kreditelaveet);
              }}
            >
              Əlavə et
            </Button>
          }
        />

        <Grid container spacing={4}>
          {data.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardMedia component="img" height="200" image={item.image} alt={item.title} />
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

export default Kreditler;
