import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Box, TextField, Typography } from '@mui/material';
import { BASE_URL } from 'src/api/request';
import { usePostFile } from 'src/api/usePostFile';
import { toast } from 'sonner';
import usePatch from 'src/api/usePatch';

const TheaterCover = ({
  formData,
  handleFormFieldChange,
}: {
  formData: any;
  handleFormFieldChange: any;
}) => {
  const { id } = useParams();
  const { postData: uploadFile, response: uploadFileResponse } = usePostFile('file/uploadFile');
  //   const { patchData: updateImgOnServer } = usePatch(`/movie/${id}`);

  const [imagePreview, setImagePreview] = useState<string | null>(formData?.image || null);

  useEffect(() => {
    if (formData?.image) {
      setImagePreview(formData.image);
    }
  }, [formData]);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formDataForImg = new FormData();
      formDataForImg.append('file', file);

      try {
        await toast.promise(
          (async () => {
            const response = await uploadFile(formDataForImg);

            if (response) {
              console.log('response', response);

              setImagePreview(response[0]);

              handleFormFieldChange('image', response.message);
            }
          })(),
          {
            loading: 'Şəkil yüklənir...',
            success: 'Şəkil yeniləndi!',
            error: 'Yükləmə zamanı xəta baş verdi!',
          }
        );
      } catch (error) {
        console.error('Yükləmə xətası:', error);
        toast.error('Yükləmə zamanı xəta baş verdi!');
      }
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        boxShadow: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'start',
        width: '100%',
        mt: 2,
      }}
    >
      <Typography variant="button">Kinotatrın şəkli</Typography>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 380,
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
            imagePreview
              ? `${BASE_URL}/file/getFile/${imagePreview}`
              : 'https://via.placeholder.com/2000x1400?text=Dəyişdirmək+üçün+klik+edin'
          }
          alt="Selected"
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
    </Box>
  );
};

export default TheaterCover;
