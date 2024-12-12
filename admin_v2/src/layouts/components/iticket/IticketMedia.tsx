import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Box, TextField, Typography } from '@mui/material';
import { BASE_URL } from 'src/api/request';
import { usePostFile } from 'src/api/usePostFile';
import { toast } from 'sonner';
import usePatch from 'src/api/usePatch';

const IticketMedia = ({
  movieDetails,
  setMovieDetails,
}: {
  movieDetails: any;
  setMovieDetails: any;
}) => {
  const { id } = useParams();
  const { postData: uploadFile, response: uploadFileResponse } = usePostFile('file/uploadFile');
  //   const { patchData: updateImgOnServer } = usePatch(`/movie/${id}`);

  const [imagePreview, setImagePreview] = useState<string | null>(movieDetails?.image || null);

  useEffect(() => {
    if (movieDetails?.image) {
      setImagePreview(movieDetails.image);
    }
  }, [movieDetails]);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        await toast.promise(
          (async () => {
            const response = await uploadFile(formData);

            if (response) {
              console.log('response', response);

              setImagePreview(response[0]);
              setMovieDetails((prev: any) => ({
                ...prev,
                image: response.message,
              }));
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography sx={{ width: '100%', textAlign: 'left' }} variant="button">
        Şəkil
      </Typography>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 200,
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
              : 'https://via.placeholder.com/150x200?text=Click+to+Add+Image'
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
      <div> </div>
    </Box>
  );
};

export default IticketMedia;
