import React, { useState } from 'react';
import { Box, Button, Typography, Grid, IconButton, Stack, Card, Tooltip } from '@mui/material';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';
import { usePostFile } from 'src/api/usePostFile';
import { BASE_URL } from 'src/api/ContractService';
import { callGetFile } from 'src/api/FileService';

const FizikiMuqavile = ({
  uploadedFile,
  setUploadedFile,
  setOtherFilesPreview,
  setPartnerData,
}: {
  uploadedFile: any;
  setUploadedFile: any;
  setOtherFilesPreview: any;
  setPartnerData: any;
}) => {
  const { postData: uploadFile } = usePostFile('file/uploadFile');

  const openFile = () => {
    callGetFile(uploadedFile).then((response) => {
      if (!response) return;
      const link = document.createElement('a');
      link.href = response;
      link.setAttribute('download', uploadedFile!);
      document.body.appendChild(link);
      link.click();
    });
  };
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('isPublic', 'false');

      try {
        await toast.promise(
          (async () => {
            const response = await uploadFile(formData);
            if (response) {
              console.log('response varsa', response);
              setOtherFilesPreview((prev: any) => ({
                ...prev,
                singableContract: [response.message],
              }));
              setUploadedFile(response.message);
              setPartnerData((prev: any) => ({
                ...prev,
                singableContract: response.message,
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

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const fileInputEvent = {
        target: {
          files: [file],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileChange(fileInputEvent);
    }
  };

  const handleFileRemove = () => {
    setUploadedFile(null);
    setOtherFilesPreview((prev: any) => ({
      ...prev,
      singableContract: '',
    }));
    setPartnerData((prev: any) => ({
      ...prev,
      singableContract: '',
    }));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Fiziki Müqavilə Yükləmə
      </Typography>
      {!uploadedFile ? (
        <Card
          sx={{
            border: '2px dashed #ddd',
            padding: 4,
            transitionDuration: '0.3s',
            textAlign: 'center',
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
        >
          <img src="/file.png" className="w-[20%]" alt="" />
          <Typography variant="h6" mt={2} mb={1}>
            Sürüşdürüb buraxın ya da fayl seçin
          </Typography>
          <Typography variant="caption" color="text.secondary" mb={2}>
            Dəstəklənən format yalnız PDF-dir
          </Typography>{' '}
          <br />
          <Button
            variant="outlined"
            color="success"
            component="label"
            sx={{ mt: 2 }}
            startIcon={<Icon icon="mdi:upload" />}
          >
            Fayl seç
            <input hidden accept=".pdf" type="file" onChange={handleFileChange} />
          </Button>
        </Card>
      ) : (
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{
            border: '1px solid #ddd',
            borderRadius: 2,
            padding: 2,
          }}
        >
          <Icon icon="mdi:file-document" width={40} color="#4caf50" />

          <Box flex={1}>
            <Tooltip title="Faylı yüklə">
              {/*  eslint-disable-next-line */}
              <div
                className="!text-[#2196f3] hover:scale-110 cursor-pointer inline-flex duration-200"
                // href={`${BASE_URL}/file/getFile/${uploadedFile}`}
                onClick={openFile}
              >
                <Typography variant="body2" noWrap>
                  {uploadedFile}
                </Typography>
              </div>
            </Tooltip>
          </Box>

          <IconButton
            color="primary"
            component="label"
            size="small"
            sx={{
              color: '#2196f3',
            }}
          >
            <Icon icon="mdi:file-replace-outline" />
            <input hidden accept=".pdf,.doc,.docx" type="file" onChange={handleFileChange} />
          </IconButton>
          <IconButton
            color="error"
            onClick={handleFileRemove}
            size="small"
            sx={{
              color: '#f44336',
            }}
          >
            <Icon icon="mdi:delete" />
          </IconButton>
        </Stack>
      )}

      {/* <Button
        onClick={() => {
          setUploadedFile(null);
          toast.success('Muqavilə göndərildi!');
        }}
        disabled={!uploadedFile}
        color="success"
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
      >
        İmzala və göndər
      </Button> */}
    </Box>
  );
};

export default FizikiMuqavile;
