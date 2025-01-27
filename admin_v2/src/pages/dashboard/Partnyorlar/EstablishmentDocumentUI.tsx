import React from 'react';
import { Box, Typography, IconButton, Stack, Tooltip } from '@mui/material';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';
import { BASE_URL } from 'src/api/request';
import { Label } from 'src/components/label';


const EstablishmentDocumentUI = ({
  otherFilesPreview,
  setOtherFilesPreview,
  uploadFile,
  setPartnerData,
}: {
  otherFilesPreview: any;
  setOtherFilesPreview: any;
  uploadFile: any;
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
              setOtherFilesPreview((prev: any) => ({
                ...prev,
                establishmentDocument: [response.message],
              })); // Yüklenen dosyanın URL'si
              setPartnerData((prev: any) => ({
                ...prev,
                establishmentDocument: response.message,
              }));
            }
          })(),
          {
            loading: 'Yükleniyor...',
            success: 'Dosya yüklendi!',
            error: 'Yükleme sırasında  oluştu!',
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
    setOtherFilesPreview.establishmentDocument(null);
    setPartnerData((prev: any) => ({
      ...prev,
      establishmentDocument: null,
    }));
    toast.success('Fayl silindi.');
  };

  return (
    <Box>
      {/* Drag & Drop veya Tıklama */}
      {!otherFilesPreview.establishmentDocument && (
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
          onClick={() => document.getElementById('estab-input')?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Typography variant="body2" color="text.secondary">
            Sürüşdürüb buraxın ya da fayl seçin
          </Typography>
          <input
            type="file"
            id="estab-input"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            accept="image/*,application/pdf"
          />
        </Box>
      )}

      {/* Yüklenen Dosya Önizlemesi */}
      {otherFilesPreview.establishmentDocument && (
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <a
            href={`${BASE_URL}/file/getPublicFile/${otherFilesPreview.establishmentDocument}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <Tooltip title={otherFilesPreview.establishmentDocument}>
              <Typography color="primary" variant="body2">
                <Label sx={{ cursor: 'pointer' }}> {otherFilesPreview.establishmentDocument}</Label>
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

export default EstablishmentDocumentUI;
