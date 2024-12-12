import { useState } from 'react';
import { Box, Button, Card, CardContent, Grid, TextField, Typography, Avatar } from '@mui/material';

interface Zamin {
  surname: unknown;
  name: unknown;
  id: number;
  fin: string;
  serial: string;
  detailsFetched: boolean;
  photo: string;
  address: string;
  birthDate: string;
  birthPlace: string;
  maritalStatus: string;
  gender: string;
  status: string;
  fatherName: string;
  motherName: string;
}

const TabGuarantor = () => {
  const [zaminList, setZaminList] = useState<Zamin[]>([]);

  // Yeni Zamin Ekleme Fonksiyonu
  const handleAddZamin = () => {
    setZaminList((prev: any) => [
      ...prev,
      { id: prev.length, fin: '', serial: '', detailsFetched: false },
    ]);
  };

  // Input Değişimi Takibi
  const handleInputChange = (id: number, field: string, value: string) => {
    setZaminList((prev) =>
      prev.map((zamin) =>
        zamin.id === id ? { ...zamin, [field]: value, detailsFetched: false } : zamin
      )
    );
  };

  // Bilgi Getirme (Simülasyon)
  const fetchDetails = (id: number) => {
    const exampleDetails = {
      name: 'Adı',
      surname: 'Soyadı',
      fatherName: 'Ata Adı',
      status: 'Aktiv',
      birthDate: '1990-01-01',
      birthPlace: 'Şəhər',
      maritalStatus: 'Evli',
      gender: 'Kişi',
      address: 'Ünvan',
    };

    setZaminList((prev) =>
      prev.map((zamin) =>
        zamin.id === id ? { ...zamin, ...exampleDetails, detailsFetched: true } : zamin
      )
    );
  };

  // Zamin Silme Fonksiyonu
  const handleDeleteZamin = (id: number) => {
    setZaminList((prev) => prev.filter((zamin) => zamin.id !== id));
  };

  return (
    <Box sx={{ py: 4 }}>
      {/* Başlık */}
      <Typography variant="h5" gutterBottom>
        Zamin Barəsində Məlumatlar
      </Typography>

      {/* Zamin Listesi */}
      {zaminList.map((zamin, index) => (
        <Card key={zamin.id} sx={{ mb: 3, p: 2 }}>
          <CardContent>
            {/* FIN və Serial Number Inputları */}
            <Typography variant="subtitle1" gutterBottom>
              Zamin {index + 1}
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="FIN"
                  value={zamin.fin}
                  onChange={(e) => handleInputChange(zamin.id, 'fin', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Serial Number"
                  value={zamin.serial}
                  onChange={(e) => handleInputChange(zamin.id, 'serial', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  onClick={() => fetchDetails(zamin.id)}
                  disabled={!zamin.fin || !zamin.serial || zamin.detailsFetched}
                  fullWidth
                >
                  Axtarış et
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteZamin(zamin.id)}
                  fullWidth
                >
                  Sil
                </Button>
              </Grid>
            </Grid>

            {/* Zaminin Diğer Bilgileri */}
            {zamin.detailsFetched && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      margin: '0 auto',
                      backgroundColor: '#f0f0f0',
                    }}
                    src="https://via.placeholder.com/120"
                  >
                    Foto
                  </Avatar>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Ad" value={zamin?.name} fullWidth disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Soyad" value={zamin.surname} fullWidth disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Ata Adı" value={zamin.fatherName} fullWidth disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Vəsiqənin Statusu"
                        value={zamin.status}
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Doğum Tarixi" value={zamin.birthDate} fullWidth disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Doğum Yeri" value={zamin.birthPlace} fullWidth disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Ailə Vəziyyəti"
                        value={zamin.maritalStatus}
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Cinsi" value={zamin.gender} fullWidth disabled />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        label="Qeydiyyatda Olduğu Ünvan"
                        value={zamin.address}
                        fullWidth
                        disabled
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Yeni Zamin Əlavə Et Butonu */}
      <Box textAlign="center" sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleAddZamin}>
          Yeni Zamin Əlavə Et
        </Button>
      </Box>
    </Box>
  );
};

export default TabGuarantor;
