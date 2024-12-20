import React, { useState } from 'react';
import { Box, Button, Typography, Grid, IconButton, Stack, Card } from '@mui/material';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';

const FizikiMuqavile = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleFileRemove = () => {
    setUploadedFile(null);
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
            <Typography variant="body2" noWrap>
              {uploadedFile.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
            </Typography>
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

      <Button
        onClick={() => {
          setUploadedFile(null);
          toast.success('Muqavilə göndərildi!')
        }}
        disabled={!uploadedFile}
        color="success"
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
      >
        İmzala və göndər
      </Button>
    </Box>
  );
};

export default FizikiMuqavile;
