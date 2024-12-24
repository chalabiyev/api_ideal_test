import React, { useEffect } from 'react';
import {
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  Avatar,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import { Iconify } from '../iconify';
import { LoadingScreen } from '../loading-screen';

const TabIdentification = ({
  loading,
  userInfo,
  hasData,
  setValue,
  getUserInfo,
  setPin,
  setSeriaNo,
  pinValue,
  seriaNoValue,
  setUserInfo
}: {
  hasData: boolean;
  loading: boolean;
  userInfo: any;
  setPin: React.Dispatch<React.SetStateAction<string>>;
  getUserInfo: () => void;
  setSeriaNo: React.Dispatch<React.SetStateAction<string>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  pinValue: string;
  seriaNoValue: string;
  setUserInfo: React.Dispatch<React.SetStateAction<any>>;
  // eslint-disable-next-line
}) => {

  const handleSearch = () => {
    setPin(pinValue);
    setSeriaNo(seriaNoValue);
    getUserInfo();
  };

  useEffect(() => {
    if (userInfo) {
      console.log('User info loaded:', userInfo);
      if (!seriaNoValue)
        setSeriaNo(userInfo.documentNumber);
    }
  }, [userInfo]);
  return (
    <Box sx={{ py: 4 }}>
      {/* Başlık */}

      {/* Serial Number ve Fin */}
      <Card sx={{ mb: 1, p: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Seriya nömrəsi"
                fullWidth
                value={seriaNoValue}
                onChange={(e) => setSeriaNo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="FIN kod"
                fullWidth
                value={pinValue}
                onChange={(e) => setPin(e.target.value)}
              />
            </Grid>
          </Grid>
        </CardContent>
        {/* Axtar Button */}
        <Button
          onClick={handleSearch}
          fullWidth
          startIcon={<Iconify icon="mingcute:search-line" />}
          variant="contained"
          color="primary"
          size="large"
        >
          Axtar
        </Button>{' '}
      </Card>

      {/* Fotoğraf */}
      {hasData ? (
        <>
          <Card sx={{ mb: 1, p: 2, textAlign: 'center' }}>
            <CardContent>
              <Avatar
                sx={{
                  width: 250,
                  height: 250,
                  margin: '0 auto',
                  backgroundColor: '#f0f0f0',
                }}
                src={`data:image/jpeg;base64,${userInfo?.image || 'https://www.pngkey.com/png/full/229-2294342_demo-person-dr-ak-sharma-nephrologist.png'}`}
              >
                Foto
              </Avatar>
            </CardContent>

            {/* Ad ve Soyad */}
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Ad"
                    fullWidth
                    value={userInfo?.personAz?.name || ''}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Soyad"
                    fullWidth
                    value={userInfo?.personAz?.surname || ''}
                    InputProps={{ readOnly: true }}
                  />{' '}
                </Grid>
              </Grid>
            </CardContent>

            {/* Ata Adı ve Vəsiqənin Statusu */}
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Ata adı"
                    fullWidth
                    value={userInfo?.personAz?.patronymic || ''}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Vəsiqənin statusu"
                    fullWidth
                    value={userInfo ? (userInfo.isActive ? 'Aktivdir' : 'Deaktivdir') : ''}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            </CardContent>

            {/* Doğum Tarihi ve Doğum Yeri */}
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="date"
                    label="Doğum Tarixi"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={
                      userInfo?.birthDate
                        ? new Date(userInfo.birthDate).toISOString().split('T')[0]
                        : ''
                    }
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Doğum Yeri"
                    fullWidth
                    value={userInfo?.birthAddress || ''}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            </CardContent>

            {/* Ailə Vəziyyəti ve Cinsi */}
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Ailə Vəziyyəti"
                    fullWidth
                    value={
                      userInfo?.maritalStatus === 'SINGLE'
                        ? 'Subay'
                        : userInfo?.maritalStatus === 'MARRIED'
                          ? 'Evli'
                          : ''
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Cinsi"
                    fullWidth
                    value={
                      userInfo?.gender === 'MALE'
                        ? 'KİŞİ'
                        : userInfo?.gender === 'FEMALE'
                          ? 'QADIN'
                          : ''
                    }
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            </CardContent>

            {/* Qeydiyyat Tarixi ve Telefon */}
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="date"
                    label="Qeydiyyatda olduğu tarix"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={
                      userInfo?.eventDate
                        ? new Date(userInfo.eventDate).toISOString().split('T')[0]
                        : ''
                    }
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Telefon Nömrəsi" fullWidth value={userInfo?.phoneNumber} onChange={(e) => setUserInfo({ ...userInfo, phoneNumber: e.target.value })} />
                </Grid>
              </Grid>
            </CardContent>


          </Card>

          {/* İrəli ve Təstiqlə Butonları */}
          <Box textAlign="center" sx={{ mt: 4 }}>
            <Button
              onClick={() => {
                window.scrollTo(0, 0);
                setValue('2');
              }}
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
            >
              İrəli
            </Button>
            <Button variant="contained" color="success">
              Təstiqlə
            </Button>
          </Box>
        </>
      ) : (
        <></>
      )}
      {loading ? <LoadingScreen /> : <></>}
    </Box>
  );
};

export default TabIdentification;
