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
  FormGroup,
  FormControlLabel,
  Checkbox,
  Switch,
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
import { CampaignFormData } from './types';
import { BASE_URL } from 'src/api/request';
import useDelete from 'src/api/useDelete';
import { MoreHoriz } from '@mui/icons-material';
import usePost from 'src/api/usePost';

const Kampaniyalar = () => {
  const {
    data: campaignData,
    hasData: campaignHasData,
    loading: campaignDataLoading,
    refetch: campaignDataRefetch,
  } = useApi(`/content/campaign/list`);

  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);

  const [menuState, setMenuState] = useState<{
    anchorEl: null | HTMLElement;
    item: CampaignFormData | null;
  }>({
    anchorEl: null,
    item: null,
  });

  const { deleteData: deleteCampaign } = useDelete('/content/campaign/delete?id=');

  const { postData: changeShow } = usePost(
    // @ts-ignore
    selectedIndex ? `/content/campaign/changeShow?id=${selectedIndex}` : null
  );
  const { postData: sendMail } = usePost(
    // @ts-ignore
    menuState.item ? `/content/subscribe/send-campaign?campaignId=${menuState.item.id}` : null
  );

  useEffect(() => {
    if (selectedIndex) {
      handleChangeStatus();
    }
  }, [selectedIndex]);

  const router = useRouter();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, item: CampaignFormData) => {
    setMenuState({ anchorEl: event.currentTarget, item });
  };

  const handleMenuClose = () => {
    setMenuState({ anchorEl: null, item: null });
  };

  const handleDelete = async () => {
    if (!menuState.item) return;

    // @ts-ignore
    await toast.promise(deleteCampaign(menuState.item.id), {
      loading: 'Silinir...',
      // eslint-disable-next-line
      success: (response) => {
        handleMenuClose();
        campaignDataRefetch();
        return 'Kampaniya silindi!';
      },
      error: (err) => {
        const errorMessage = err.response?.data?.message || 'Olmadığı üçün xəta';
        return `Xəta: ${errorMessage}`;
      },
    });
  };
  const handleSendMail = async () => {
    if (!menuState.item?.id) return;
    handleMenuClose();

    await toast.promise(sendMail({ campaignId: menuState.item.id }), {
      loading: 'Mail göndərilir...',
      success: () => {
        campaignDataRefetch();
        return 'Mail göndərildi!';
      },
      error: (err) => {
        const errorMessage = err.response?.data?.message || 'Xəta baş verdi';
        return `Xəta: ${errorMessage}`;
      },
    });
  };
  const handleChangeStatus = async () => {
    if (!selectedIndex) return;

    await toast.promise(changeShow(selectedIndex), {
      loading: 'Status dəyişdirilir...',
      success: () => {
        handleMenuClose();
        campaignDataRefetch();
        setSelectedIndex(null);
        return 'Status yeniləndi!';
      },
      error: (err) => {
        const errorMessage = err.response?.data?.message || 'Olmadığı üçün xəta';
        return `${errorMessage}`;
      },
    });
  };

  if (campaignDataLoading) {
    return <LoadingScreen />;
  }

  if (!campaignHasData) {
    return (
      <EmptyContent
        action={
          <Button
            sx={{ mt: 1 }}
            variant="soft"
            onClick={() => {
              router.push(paths.websirket.kampaniyaelaveet);
            }}
          >
            Yenisini əlavə et
          </Button>
        }
        title="Kampaniya məlumatları yoxdur"
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>İdeal Kredit | Kampaniyalar</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Kampaniyalar"
          links={[{ name: 'Veb sayt idarə paneli' }, { name: 'Kampaniyalar' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={() => {
                router.push(paths.websirket.kampaniyaelaveet);
              }}
            >
              Əlavə et
            </Button>
          }
        />

        <Grid container spacing={2}>
          {campaignData?.map((item: CampaignFormData, index: any) => (
            <Grid item xs={12} sm={12} md={6} key={item.id}>
              <Card sx={{ p: 2, display: 'flex', maxHeight: '260px', minHeight: '260px' }}>
                <CardContent
                  sx={{
                    p: 0,
                    width: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography color="#919EAB" variant="caption">
                    {item.createdDate?.toLocaleString().slice(0, 10).split('-').reverse().join('.')}{' '}
                  </Typography>
                  <Typography sx={{ mt: 2, mb: 1 }} variant="h6">
                    {item.title.slice(0, 18)}
                    {item.title.length > 18 && '...'}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {item.description.slice(0, 60)}
                    {item.description.length > 60 && '...'}
                  </Typography>

                  <FormGroup // @ts-ignore
                    sx={{ mt: 1, mb: 1 }}
                  >
                    <FormControlLabel
                      control={
                        <Switch
                          // @ts-ignore
                          onChange={() => setSelectedIndex(item.id)}
                          color="success"
                          checked={item.showOnMainPage}
                        />
                      }
                      label="Əsas səhifədə göstər"
                    />
                  </FormGroup>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Iconify
                      icon={`iconamoon:${item.subscriptionMailSent ? 'check' : 'close'}-bold`}
                      width={21}
                      height={21}
                      sx={{ color: item.subscriptionMailSent ? '#00A76F' : '#FF0000' }}
                    />
                    <Typography
                      variant="caption"
                      color={item.subscriptionMailSent ? '#00A76F' : '#FF0000'}
                    >
                      {item.subscriptionMailSent ? 'Mail göndərilib' : 'Göndərilməyib'}
                    </Typography>
                  </Box>

                  <Box sx={{ width: '100%', textAlign: 'left' }}>
                    <IconButton onClick={(event) => handleMenuOpen(event, item)}>
                      <MoreHoriz />
                    </IconButton>
                  </Box>
                </CardContent>
                <CardMedia
                  sx={{
                    background: 'linear-gradient(to right, #EE9CA7, #FFDDE1)',
                    borderRadius: '8px',
                    minWidth: '40%',
                    maxWidth: '40%',
                  }}
                  component="img"
                  width="10%"
                  image={item.image ? `${BASE_URL}/file/getPublicFile/${item.image}` : ''}
                ></CardMedia>
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
              handleSendMail();
            }}
          >
            İstifadəçilərə mail bildirşi göndər
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              router.push(`/websirket/kampaniyaduzeliset/${menuState.item?.id}`);
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

export default Kampaniyalar;
