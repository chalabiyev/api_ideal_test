import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { EInsuranceType, InsuranceFormData } from './types';
import { uploadPublicFile } from 'src/api/FileService';
import { toast } from 'sonner';
import { BASE_URL } from 'src/api/request';
import usePost from 'src/api/usePost';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

const SigortaElaveEt = () => {
  const router = useRouter();
  const { postData: createInsurance, loading, error } = usePost('/content/insurance/create');
  const [insuranceFormData, setInsuranceFormData] = useState<InsuranceFormData>({
    insuranceType: EInsuranceType.INDIVIDUAL,
    image: '',
    title: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInsuranceFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const response = await uploadPublicFile(file);
      if (response) {
        console.log('res', response);
        setInsuranceFormData((prev) => ({ ...prev, image: response.data.message }));
        toast.success('Şəkil yükləndi!');
      }
    } catch (error) {
      toast.error('Şəkil yüklənərkən xəta baş verdi!');
    }
  };

  const handleCreateInsurance = async () => {
    toast.promise(createInsurance(insuranceFormData), {
      loading: 'Sığorta yaradılır...',
      // eslint-disable-next-line
      success: (response) => {
        router.push(paths.websigorta.sigortalar);
        return `Məlumat yaradıldı!`;
      },
      error: (err) => {
        const errorMessage = err.response?.data?.message || 'Olmadığı üçün xəta';
        return `Xəta: ${errorMessage}`;
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>İdeal Kredit | Yeni Sığorta</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Yeni Sığorta"
          links={[
            { name: 'Veb sayt idarə paneli' },
            { name: 'Bütün sığortalar', href: '/websigorta/sigortalar' },
            { name: 'Yeni sığorta' },
          ]}
        />

        <Card sx={{ mt: 3 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Sığorta adı"
              name="title"
              value={insuranceFormData.title || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Açıqlama"
              name="description"
              value={insuranceFormData.description || ''}
              onChange={handleChange}
            />

            <FormControl fullWidth>
              <InputLabel id="insurance-type-select-label">Sığorta Növü</InputLabel>
              <Select
                labelId="insurance-type-select-label"
                id="insurance-type-select"
                value={insuranceFormData.insuranceType}
                onChange={(e) => {
                  setInsuranceFormData((prev) => ({
                    ...prev,
                    insuranceType: e.target.value as EInsuranceType,
                  }));
                }}
                name="insuranceType"
                label="Sığorta Növü"
              >
                <MenuItem value={EInsuranceType.COOPERATIVE}>Korporativ</MenuItem>
                <MenuItem value={EInsuranceType.INDIVIDUAL}>Fərdi</MenuItem>
              </Select>
            </FormControl>

            <Typography sx={{ mt: 2 }} variant="button">
              Əsas şəkil
            </Typography>
            {insuranceFormData.image ? (
              <img
                alt="Əsas şəkil"
                src={`${BASE_URL}/file/getPublicFile/${insuranceFormData.image}`}
                className="w-full h-[288px] rounded-md object-cover"
              />
            ) : (
              ''
            )}
            <Button
              fullWidth
              variant="contained"
              color={insuranceFormData.image ? 'secondary' : 'primary'}
              component="label"
            >
              {insuranceFormData.image ? 'Seçilmiş şəkli dəyişdir' : 'Əsas şəkil yüklə'}
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>

            <Divider />
            <Button
              disabled={
                insuranceFormData.image === '' ||
                insuranceFormData.title === '' ||
                insuranceFormData.description === ''
              }
              onClick={handleCreateInsurance}
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

export default SigortaElaveEt;
