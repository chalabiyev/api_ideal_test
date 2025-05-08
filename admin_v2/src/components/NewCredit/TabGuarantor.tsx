import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Grid, TextField, Typography, Avatar } from '@mui/material';
import { Guarantor } from 'src/pages/dashboard/VideoMuraciet/types';
import { CreditRequest } from 'src/types/CreditRequest';

const TabGuarantor = ({
  setValue,
  loading,
  guarantorInfo,
  hasData,
  setPin,
  setSeriaNo,
  creditRequest,
  setCreditRequest,
}: {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  guarantorInfo: any;
  hasData: boolean;
  setPin: React.Dispatch<React.SetStateAction<string>>;
  setSeriaNo: React.Dispatch<React.SetStateAction<string>>;
  creditRequest: CreditRequest;
  setCreditRequest: React.Dispatch<React.SetStateAction<CreditRequest>>;
}) => {
  const [zaminList, setZaminList] = useState<Guarantor[]>([]);

  const handleSearch = (id: number) => {
    const targetZamin = zaminList.find((zamin) => zamin.id === id);

    if (targetZamin?.pin && targetZamin.documentNumber) {
      setPin(targetZamin.pin);
      setSeriaNo(targetZamin.documentNumber);

    } else {
      console.log('PIN veya Serial Number eksik');
    }
  };

  useEffect(() => {
    if (guarantorInfo) {
      setZaminList((prev) =>
        prev.map((zamin) =>
          zamin.pin === guarantorInfo.pin
            ? {
              ...zamin,
              personAz: guarantorInfo.personAz,
              birthAddress: guarantorInfo.birthAddress,
              birthDate: guarantorInfo.birthDate,
              maritalStatus: guarantorInfo.maritalStatus,
              gender: guarantorInfo.gender,
              addressDetail: guarantorInfo.addressDetail,
              image: `data:image/jpeg;base64,${guarantorInfo.image}`,
              isActive: guarantorInfo.isActive,
            }
            : zamin
        )
      );
    }
  }, [guarantorInfo]);

  console.log('zaminList : ', zaminList);

  const handleAddZamin = () => {
    setZaminList((prev: Guarantor[]) => [
      ...prev,
      {
        personAz: { name: '', surname: '', patronymic: '' },
        id: prev.length + 1,
        pin: '',
        documentNumber: '',
        image: '',
        addressDetail: { address: '' },
        birthDate: '',
        birthAddress: '',
        maritalStatus: '',
        militaryStatus: '',
        gender: '',
        isActive: false,
        relation: '',
      },
    ]);
  };

  useEffect(() => {
    setCreditRequest((prev) => ({
      ...prev,
      guarantors: zaminList,
    }));
  }, [zaminList]);

  // Input Değişimi Takibi d
  const handleInputChange = (id: number, field: string, value: string) => {
    setZaminList((prev) =>
      prev.map((zamin) => (zamin.id === id ? { ...zamin, [field]: value } : zamin))
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
                  value={zamin.pin}
                  onChange={(e) => handleInputChange(zamin.id, 'pin', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Serial Number"
                  value={zamin.documentNumber}
                  onChange={(e) => handleInputChange(zamin.id, 'documentNumber', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  onClick={() => handleSearch(zamin.id)}
                  disabled={!zamin.pin || !zamin.documentNumber || loading}
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
            {guarantorInfo && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      margin: '0 auto',
                      backgroundColor: '#f0f0f0',
                    }}
                    src={zamin.image || 'https://via.placeholder.com/120'}
                  >
                    Foto
                  </Avatar>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Ad" value={zamin?.personAz.name} fullWidth disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Soyad" value={zamin.personAz.surname} fullWidth disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Ata Adı"
                        value={zamin.personAz.patronymic}
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Vəsiqənin Statusu"
                        value={zamin.isActive ? 'Aktiv' : 'Aktiv deyil'}
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Doğum Tarixi" value={zamin.birthDate} fullWidth disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Doğum Yeri" value={zamin.birthAddress} fullWidth disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Ailə Vəziyyəti"
                        value={
                          zamin?.maritalStatus === 'SINGLE'
                            ? 'Subay'
                            : zamin?.maritalStatus === 'MARRIED'
                              ? 'Evli'
                              : ''
                        }
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Cinsi"
                        value={
                          zamin?.gender === 'MALE'
                            ? 'KİŞİ'
                            : zamin?.gender === 'FEMALE'
                              ? 'QADIN'
                              : ''
                        }
                        fullWidth
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        label="Qeydiyyatda Olduğu Ünvan"
                        value={zamin.addressDetail.address}
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
