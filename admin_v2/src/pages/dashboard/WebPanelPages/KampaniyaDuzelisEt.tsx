import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { CampaignFormData } from './types';
import { uploadPublicFile } from 'src/api/FileService';
import { toast } from 'sonner';
import { BASE_URL } from 'src/api/request';
import usePost from 'src/api/usePost';
import { useParams, useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import useApi from 'src/api/useApi';
import usePatch from 'src/api/usePatch';

const KampaniyaDuzelisEt = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: campaignData,
    hasData: campaignHasData,
    loading: campaignDataLoading,
    refetch: campaignDataRefetch,
  } = useApi(`/content/campaign/get?id=${id}`);

  const { patchData: updateCampaign } = usePatch(`content/campaign/${id}`);

  useEffect(() => {
    if (campaignHasData) {
      setCampaignFormData(campaignData);
    }
  }, [campaignData]);

  const [campaignFormData, setCampaignFormData] = useState<CampaignFormData>({
    title: ' ',
    description: '',
    image: '',
    showOnMainPage: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCampaignFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const response = await uploadPublicFile(file);
      if (response) {
        console.log('res', response);
        setCampaignFormData((prev) => ({ ...prev, image: response.data.message }));
        toast.success('Şəkil yükləndi!');
      }
    } catch (error) {
      toast.error('Şəkil yüklənərkən xəta baş verdi!');
    }
  };

  const handleModifyCampaign = async () => {
    if (id) {
      try {
        await updateCampaign(campaignFormData);
        toast.success('Kampaniya yeniləndi');
        router.push(paths.websirket.kampaniyalar);
      } catch (err) {
        toast.warning('Xəta baş verdi');
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>İdeal Kredit | Düzəliş et</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Yeni Kampaniya"
          links={[
            { name: 'Veb sayt idarə paneli' },
            { name: 'Bütün kampaniyalar', href: '/websirket/kampaniyalar' },
            { name: 'Yeni kampaniya' },
          ]}
        />

        <Card sx={{ mt: 3 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Kampaniyanın adı"
              name="title"
              value={campaignFormData.title || ''}
              onChange={handleChange}
            />
            <TextField
              multiline
              rows={6}
              fullWidth
              label="Açıqlama"
              name="description"
              value={campaignFormData.description || ''}
              onChange={handleChange}
            />

            <Typography sx={{ mt: 2 }} variant="button">
              Kampaniyanın şəkli
            </Typography>
            {campaignFormData.image ? (
              <img
                alt="Kampaniyanın şəkli"
                src={`${BASE_URL}/file/getPublicFile/${campaignFormData.image}`}
                className="w-full h-[288px] rounded-md object-cover"
              />
            ) : (
              ''
            )}
            <Button
              fullWidth
              variant="contained"
              color={campaignFormData.image ? 'secondary' : 'primary'}
              component="label"
            >
              {campaignFormData.image ? 'Seçilmiş şəkli dəyişdir' : 'Yüklə'}
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>

            <FormGroup // @ts-ignore
              sx={{ mt: 1, mb: 1 }}
            >
              <FormControlLabel
                control={
                  <Switch
                    // @ts-ignore
                    onChange={() =>
                      setCampaignFormData((prev) => ({
                        ...prev,
                        showOnMainPage: !prev.showOnMainPage,
                      }))
                    }
                    color="success"
                    checked={campaignFormData.showOnMainPage}
                  />
                }
                label="Əsas səhifədə göstər"
              />
            </FormGroup>

            <Divider />
            <Button
              disabled={
                campaignFormData.image === '' ||
                campaignFormData.title === '' ||
                campaignFormData.description === ''
              }
              onClick={handleModifyCampaign}
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

export default KampaniyaDuzelisEt;
