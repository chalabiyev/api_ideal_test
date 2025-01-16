import React from 'react';
import { Box, Typography, IconButton, Stack, Tooltip } from '@mui/material';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';
import { BASE_URL } from 'src/api/request';
import { Label } from 'src/components/label';

const CompanyImagesUI = ({
  otherFilesPreview,
  setOtherFilesPreview,
  uploadMultipleFile,
  setPartnerData,
}: {
  otherFilesPreview: any;
  setOtherFilesPreview: any;
  uploadMultipleFile: (formData: FormData) => Promise<any>;
  setPartnerData: (value: any) => void;
}) => {
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const formData = new FormData();
      Array.from(selectedFiles).forEach((file) => {
        formData.append('file', file);
        formData.append('isPublic', 'true');
      });

      try {
        const response = await uploadMultipleFile(formData);

        if (response) {
          const serverFiles = response;

          const newUploadedFiles = [...otherFilesPreview.companyImages, ...serverFiles];

          setOtherFilesPreview((prev: any) => ({
            ...prev,
            companyImages: newUploadedFiles,
          }));

          setPartnerData((prev: any) => ({
            ...prev,
            companyImages: newUploadedFiles,
          }));

          toast.success('Dosya(lar) yüklendi!');
        }
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
    const droppedFiles = event.dataTransfer.files;
    handleImageChange({ target: { files: droppedFiles } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleDeleteFile = (fileUrl: string) => {
    const updatedFiles = otherFilesPreview.companyImages.filter((file: string) => file !== fileUrl);
    console.log('After Delete: ', updatedFiles);

    setOtherFilesPreview((prev: any) => ({
      ...prev,
      companyImages: updatedFiles,
    }));
    setPartnerData((prev: any) => ({
      ...prev,
      companyImages: updatedFiles,
    }));
    toast.success('Dosya silindi.');
  };

  return (
    <Box>
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
        onClick={() => document.getElementById('company-input')?.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Typography variant="body2" color="text.secondary">
          Sürüşdürüb buraxın ya da fayl seçin
        </Typography>
        <input
          type="file"
          id="company-input"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          accept="image/*"
          multiple
        />
      </Box>

      {otherFilesPreview.companyImages.length > 0 && (
        <Stack direction="column" spacing={2}>
          {otherFilesPreview.companyImages.map((fileUrl: string, index: number) => (
            <Stack direction="row" alignItems="center" spacing={2} key={index}>
              <a
                href={`${BASE_URL}/file/getPublicFile/${fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Tooltip title={fileUrl}>
                  <Typography color="primary" variant="body2">
                    <Label sx={{ cursor: 'pointer' }}> {fileUrl}</Label>
                  </Typography>
                </Tooltip>
              </a>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteFile(fileUrl)}
                sx={{ color: 'error.main' }}
              >
                <Icon icon="mdi:delete" />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default CompanyImagesUI;
