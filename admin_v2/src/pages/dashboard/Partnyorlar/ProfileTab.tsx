import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { Icon } from '@iconify/react';
import { EOwnerType } from 'src/types/CreditRequestDto';
import { BASE_URL } from 'src/api/request';
import { toast } from 'sonner';
import { usePostFile } from 'src/api/usePostFile';
import IdFileUploadUI from './IdFileUploadUI';
import RentFileUploadUI from './RentFileUploadUI';
import EstablishmentDocumentUI from './EstablishmentDocumentUI';
import CompanyImagesUI from './CompanyImagesUI';
import { cities, countries } from 'src/helpers/countries';

const ProfileTab = ({
  otherFilesPreview,
  setOtherFilesPreview,
  idFilePreview,
  setIdFilePreview,
  partnerType,
  setPartnerType,
  partnerData,
  setPartnerData,
  logoPreview,
  setLogoPreview,
}: {
  otherFilesPreview: any;
  setOtherFilesPreview: any;
  idFilePreview: any;
  setIdFilePreview: any;
  partnerType: EOwnerType;
  setPartnerType: React.Dispatch<React.SetStateAction<EOwnerType>>;
  partnerData: any;
  setPartnerData: React.Dispatch<React.SetStateAction<any>>;
  logoPreview: any;
  setLogoPreview: any;
}) => {
  const faaliyetSahesiOptions = [
    { label: 'IT', value: 'IT' },
    { label: 'Marketinq', value: 'MARKETING' },
    { label: 'Finans', value: 'FINANCE' },
    { label: 'Satış', value: 'SALES' },
    { label: 'HR', value: 'HR' },
    { label: 'Logistika', value: 'LOGISTICS' },
    { label: 'Digər', value: 'OTHER' },
  ];
  const { postData: uploadFile, response: uploadFileResponse } = usePostFile('file/uploadFile');
  const { postData: uploadMultipleFile, response: uploadMultipleFileResponse } =
    usePostFile('file/uploadMultipleFile');
  const handlePartnerDataChange = (key: any, value: string) => {
    setPartnerData((prev: any) => ({ ...prev, [key]: value }));
  };

  // eslint-disable-next-line
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line
    const files = event.target.files;
    if (files) {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('file', file);
        formData.append('isPublic', 'true');
        // formData.append('fileName', Date.now().toString());
      });

      try {
        await toast.promise(
          (async () => {
            const response = await uploadFile(formData);

            if (response) {
              console.log('response varsa', response);

              setLogoPreview(response.message);

              setPartnerData((prev: any) => {
                const updatedData = {
                  ...prev,
                  image: response.message,
                };
                console.log('Updated Partner Data:', updatedData);
                return updatedData;
              });
            }
          })(),
          {
            loading: 'Şəkil yüklənir...',
            success: 'Şəkil yeniləndi!',
            error: 'Yükləmə zamanı xəta baş verdi!',
          }
        );
      } catch (error) {
        console.error('Yükleme hatası:', error);
        toast.error('Yükləmə zamanı xəta baş verdi!');
      }
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Logo */}
      <Grid item xs={12} sx={{ textAlign: 'left' }}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6">Şirkətin logosu</Typography>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: 180,
              mt: 1,
              borderRadius: 1,
              overflow: 'hidden',
              cursor: 'pointer',
              border: '2px dashed #ccc',
              padding: '8px',
            }}
            onClick={() => document.getElementById('poster-input')?.click()}
          >
            <img
              src={
                logoPreview
                  ? `${BASE_URL}/file/getPublicFile/${logoPreview}`
                  : 'https://via.placeholder.com/700x700?text=se%20se%20se%20se'
              }
              alt="Şəkil əlavə etmək üçün kliklə"
              style={{ width: '100%', height: 'auto', borderRadius: 4 }}
            />
            <input
              type="file"
              id="poster-input"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              accept="image/*"
            />
          </Box>
        </Card>
      </Grid>
      {/* Kredit məlumatları başlığı */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Kredit tarixi haqqında ümumi məlumat
        </Typography>
      </Grid>
      {/* Şirkət Məlumatları */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Biznes Səhifənin Adı"
          placeholder="Ad daxil edin"
          value={partnerData?.businessName}
          onChange={(e) => handlePartnerDataChange('businessName', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Sahibkarın Adı / Şirkət Adı"
          value={partnerData?.companyName}
          onChange={(e) => handlePartnerDataChange('companyName', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Direktor / Sahib"
          value={partnerData?.directorName}
          onChange={(e) => handlePartnerDataChange('directorName', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Telefon"
          value={partnerData?.phoneNumber}
          onChange={(e) => handlePartnerDataChange('phoneNumber', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="VÖEN"
          value={partnerData?.voen || ''}
          onChange={(e) => handlePartnerDataChange('voen', e.target.value)}
        />
      </Grid>
      {partnerType === EOwnerType.HUQUQI ? (
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Şirkətin təsis sənədi
            </Typography>
            <EstablishmentDocumentUI
              otherFilesPreview={otherFilesPreview}
              setOtherFilesPreview={setOtherFilesPreview}
              uploadFile={uploadFile}
              setPartnerData={setPartnerData}
            />
            <Typography sx={{ ml: 1 }} variant="caption" color="text.secondary">
              Dəstəklənən formatlar: pdf, jpg, png
            </Typography>
          </Card>
        </Grid>
      ) : (
        ''
      )}
      {/* Sənədlərin Skanı */}
      <Grid item xs={12}>
        <Card sx={{ p: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Vəsiqə
          </Typography>
          <IdFileUploadUI
            idFilePreview={idFilePreview}
            setIdFilePreview={setIdFilePreview}
            uploadFile={uploadFile}
            setPartnerData={setPartnerData}
          />
          <Typography sx={{ ml: 1 }} variant="caption" color="text.secondary">
            Dəstəklənən formatlar: pdf, jpg, png
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ p: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            İcarə Müqaviləsi
          </Typography>
          <RentFileUploadUI
            otherFilesPreview={otherFilesPreview}
            setOtherFilesPreview={setOtherFilesPreview}
            uploadFile={uploadFile}
            setPartnerData={setPartnerData}
          />
          <Typography sx={{ ml: 1 }} variant="caption" color="text.secondary">
            Dəstəklənən formatlar: pdf, jpg, png
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ p: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Mağazanın şəkilləri
          </Typography>
          <CompanyImagesUI
            otherFilesPreview={otherFilesPreview}
            setOtherFilesPreview={setOtherFilesPreview}
            uploadMultipleFile={uploadMultipleFile}
            setPartnerData={setPartnerData}
          />
          <Typography sx={{ ml: 1 }} variant="caption" color="text.secondary">
            Dəstəklənən formatlar: pdf, jpg, png
          </Typography>
        </Card>
      </Grid>
      {/* Aşağıdakı form */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Aylıq Satış Həcmi"
          value={partnerData?.monthlySales || 100}
          onChange={(e) => {
            const { value } = e.target;

            if (/^\d*$/.test(value)) {
              handlePartnerDataChange('monthlySales', value);
            }
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Fəaliyyətə Başlama Tarixi"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={partnerData?.startDate.split('T')[0]}
          onChange={(e) => handlePartnerDataChange('startDate', `${e.target.value}T00:00:00.000Z`)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          value={partnerData?.activityType}
          onChange={(e) => handlePartnerDataChange('activityType', e.target.value)}
          select
          fullWidth
          label="Şirkətin Fəaliyyət Sahəsi"
        >
          {faaliyetSahesiOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="country-label">Ölkə</InputLabel>
          <Select
            labelId="country-label"
            value={partnerData.country}
            onChange={(e: any) => {
              const selectedCountry = e.target.value;
              handlePartnerDataChange('country', selectedCountry);
            }}
            label="Ölkə"
          >
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="country-label">Şəhər</InputLabel>
          <Select
            labelId="country-label"
            value={partnerData.city}
            onChange={(e: any) => {
              const selectedCountry = e.target.value;
              handlePartnerDataChange('city', selectedCountry);
            }}
            label="Şəhər"
          >
            {cities.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Ünvan"
          value={partnerData?.address}
          onChange={(e) => handlePartnerDataChange('address', e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default ProfileTab;
