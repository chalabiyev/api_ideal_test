import React from 'react';
import { Box, Typography, IconButton, Stack, Tooltip } from '@mui/material';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';
import { BASE_URL } from 'src/api/request';
import { Label } from 'src/components/label';

const IdFileUploadUI = ({
  idFilePreview,
  setIdFilePreview,
  uploadFile,
  setPartnerData,
}: {
  idFilePreview: string | null;
  setIdFilePreview: (value: string | null) => void;
  uploadFile: (formData: FormData) => Promise<any>;
  setPartnerData: (value: any) => void;
}) => {
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]; // Tek bir dosya seçilir
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('isPublic', 'true');

      try {
        await toast.promise(
          (async () => {
            const response = await uploadFile(formData);
            if (response) {
              setIdFilePreview(response.message); // Yüklenen dosyanın URL'si
              setPartnerData((prev: any) => ({
                ...prev,
                identityCard: response.message,
              }));
            }
          })(),
          {
            loading: 'Yükleniyor...',
            success: 'Dosya yüklendi!',
            error: 'Yükleme sırasında hata oluştu!',
          }
        );
      } catch (error) {
        console.error('Yükleme hatası:', error);
        toast.error('Yükleme sırasında hata oluştu!');
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    handleImageChange({
      target: { files: [droppedFile] },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  const handleDeleteFile = () => {
    setIdFilePreview(null);
    setPartnerData((prev: any) => ({
      ...prev,
      identityCard: null,
    }));
    toast.success('Fayl silindi.');
  };

  return (
    <Box>
      {/* Drag & Drop veya Tıklama */}
      {!idFilePreview && (
        <Box
          sx={{
            border: '2px dashed #ccc',
            borderRadius: 1,
            p: 2,
            cursor: 'pointer',
            textAlign: 'center',
            mb: 2,
            width: '100%',
            maxWidth: 400,
          }}
          onClick={() => document.getElementById('file-input')?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Typography variant="body2" color="text.secondary">
            Sürüşdürüb buraxın ya da fayl seçin
          </Typography>
          <input
            type="file"
            id="file-input"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            accept="image/*,application/pdf"
          />
        </Box>
      )}

      {/* Yüklenen Dosya Önizlemesi */}
      {idFilePreview && (
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <a
            href={`${BASE_URL}/file/getPublicFile/${idFilePreview}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <Tooltip title={idFilePreview}>
              <Typography color="primary" variant="body2">
                <Label sx={{ cursor: 'pointer' }}> {idFilePreview}</Label>
              </Typography>
            </Tooltip>
          </a>

          {/* Sil butonu */}
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={handleDeleteFile}
            sx={{ color: 'error.main' }}
          >
            <Icon icon="mdi:delete" />
          </IconButton>
        </Stack>
      )}
    </Box>
  );
};

export default IdFileUploadUI;
