import { useEffect, useState } from 'react';
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
import useApi from 'src/api/useApi';
import { LoadingScreen } from 'src/components/loading-screen';
import { EmptyContent } from 'src/components/empty-content';
import { CreditFormData } from './types';
import { BASE_URL } from 'src/api/request';
import useDelete from 'src/api/useDelete';

const Kreditler = () => {
  const {
    data: creditData,
    hasData: creditHasData,
    loading: creditDataLoading,
    refetch: creditDataRefetch,
  } = useApi(`/content/credit-type/list`);

  const { deleteData: deleteCredit } = useDelete('/content/credit-type/delete?id=');

  const router = useRouter();

  const [menuState, setMenuState] = useState<{
    anchorEl: null | HTMLElement;
    item: CreditFormData | null;
  }>({
    anchorEl: null,
    item: null,
  });

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, item: CreditFormData) => {
    setMenuState({ anchorEl: event.currentTarget, item });
  };

  const handleMenuClose = () => {
    setMenuState({ anchorEl: null, item: null });
  };

  const handleDelete = async () => {
    if (!menuState.item) return;
    try {
      // @ts-ignore
      await toast.promise(deleteCredit(menuState.item.id), {
        loading: 'Kredit silinir...',
        success: 'Kredit silindi!',
        error: 'Silmə zamanı xəta baş verdi!',
      });

      handleMenuClose();
      setTimeout(() => {
        creditDataRefetch();
      }, 300);
    } catch (error) {
      console.error('Silmə xətası:', error);
    }
  };

  if (creditDataLoading) {
    return <LoadingScreen />;
  }

  if (!creditHasData) {
    return (
      <EmptyContent
        action={
          <Button
            sx={{ mt: 1 }}
            variant="soft"
            onClick={() => {
              router.push(paths.webkredit.kreditelaveet);
            }}
          >
            Yenisini əlavə et
          </Button>
        }
        title="Kredit məlumatları yoxdur"
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>İdeal Kredit | Kreditlər</title>
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

        <Grid container spacing={2}>
          {creditData?.map((item: CreditFormData, index: number) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ p: 2 }}>
                <CardMedia
                  sx={{
                    background: 'linear-gradient(to right, #110792, #0B0C6A, #123566)',
                    borderRadius: '8px',
                  }}
                  component="img"
                  height="200"
                  image={
                    item.image
                      ? `${BASE_URL}/file/getPublicFile/${item.image}`
                      : 'https://e7.pngegg.com/pngimages/709/358/png-clipart-price-toyservice-soil-business-no-till-farming-no-rectangle-pie.png'
                  }
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

                    <IconButton onClick={(event) => handleMenuOpen(event, item)}>
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
          anchorEl={menuState.anchorEl}
          open={Boolean(menuState.anchorEl)}
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
              router.push(`/webkredit/kreditduzeliset/${menuState.item?.id}`);
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
