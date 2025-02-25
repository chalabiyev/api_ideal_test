import { useEffect, useState } from 'react';
import { Button, Card, CardContent, Divider, TextField, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { InfoI } from './types';
import { uploadPublicFile } from 'src/api/FileService';
import { toast } from 'sonner';
import { BASE_URL } from 'src/api/request';
import usePost from 'src/api/usePost';
import { useParams, useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { LoadingScreen } from 'src/components/loading-screen';
import { EmptyContent } from 'src/components/empty-content';
import useApi from 'src/api/useApi';
import usePatch from 'src/api/usePatch';

const HaqqimizdaDuzelisEt = () => {
  const { id } = useParams();
  const router = useRouter();

  const {
    data: infoData,
    hasData: infoHasData,
    loading: infoDataLoading,
    refetch: infoDataRefetch,
  } = useApi(`/content/info/get?id=${id}`);

  const { patchData: updateInfoData } = usePatch(`content/info/${id}`);

  useEffect(() => {
    if (infoHasData) {
      setInfoFormData(infoData);
    }
  }, [infoHasData]);

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

  const handleModifyInfo = async () => {
    if (id) {
      try {
        await updateInfoData(infoFormData);
        toast.success('Məlumatlar yeniləndi');
        router.push(paths.websirket.haqqimizda);
      } catch (err) {
        toast.warning('Xəta baş verdi');
      }
    }
  };

  if (infoDataLoading) {
    return <LoadingScreen />;
  }

  if (!infoHasData) {
    return (
      <EmptyContent
        action={
          <Button
            sx={{ mt: 1 }}
            variant="soft"
            onClick={() => {
              router.push(paths.websirket.haqqimizda);
            }}
          >
            Yenisini əlavə et
          </Button>
        }
        title="Haqqımızda məlumatları yoxdur"
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>İdeal Kredit | Düzəliş et</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Düzəliş et"
          links={[
            { name: 'Veb sayt idarə paneli' },
            { name: 'Haqqımızda kartları', href: `/websirket/haqqimizda` },
            { name: 'Düzəliş et' },
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
              onClick={handleModifyInfo}
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
