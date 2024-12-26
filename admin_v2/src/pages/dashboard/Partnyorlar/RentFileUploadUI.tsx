import React from 'react';
import { Box, Typography, IconButton, Stack, Tooltip } from '@mui/material';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';
import { BASE_URL } from 'src/api/request';
import { Label } from 'src/components/label';

const RentFileUploadUI = ({
  otherFilesPreview,
  setOtherFilesPreview,
  uploadFile,
  setPartnerData,
}: {
  otherFilesPreview: any;
  setOtherFilesPreview: any;
  uploadFile: (formData: FormData) => Promise<any>;
  setPartnerData: (value: any) => void;
}) => {
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
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
                rentContract: [response.message],
              }));
              setPartnerData((prev: any) => ({
                ...prev,
                rentContract: response.message,
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
    setOtherFilesPreview((prev: any) => ({
      ...prev,
      rentContract: null,
    }));
    setPartnerData((prev: any) => ({
      ...prev,
      rentContract: null,
    }));
    toast.success('Fayl silindi.');
  };

  return (
    <Box>
      {/* Drag & Drop veya Tıklama */}
      {otherFilesPreview.rentContract == null && (
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
          onClick={() => document.getElementById('rent-input')?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Typography variant="body2" color="text.secondary">
            Sürüşdürüb buraxın ya da fayl seçin
          </Typography>
          <input
            type="file"
            id="rent-input"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            accept="image/*,application/pdf"
          />
        </Box>
      )}

      {/* Yüklenen Dosya Önizlemesi */}
      {otherFilesPreview.rentContract != null && (
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <a
            href={`${BASE_URL}/file/getPublicFile/${otherFilesPreview.rentContract}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <Tooltip title={otherFilesPreview.rentContract}>
              <Typography color="primary" variant="body2">
                <Label sx={{ cursor: 'pointer' }}> {otherFilesPreview.rentContract}</Label>
              </Typography>
            </Tooltip>
          </a>
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

export default RentFileUploadUI;
