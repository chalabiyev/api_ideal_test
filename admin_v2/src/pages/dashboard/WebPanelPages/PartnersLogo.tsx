import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
  IconButton,
  Paper,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { LoadingScreen } from 'src/components/loading-screen';
import { Iconify } from 'src/components/iconify';
import { usePostFile } from 'src/api/usePostFile';
import useApi from 'src/api/useApi';
import { BASE_URL } from 'src/api/request';
import DeleteIcon from '@mui/icons-material/Delete';
import useDelete from 'src/api/useDelete';

// Fayl məlumatları üçün interfeys
interface PartnerLogoItem {
  id: string;
  name: string;
  type: 'IMAGE' | 'VIDEO';
  sizeInMb: number;
  createdDate: string;
}

const metadata = { title: `İdeal Kredit | Partnyorlar Logo` };

export default function Page() {
  const {
    data: sliderData,
    hasData: sliderHasData,
    loading: sliderLoading,
  } = useApi('/slider/list');
  const { deleteData: deleteSlider } = useDelete('slider/delete');
  const { postData: uploadFile } = usePostFile('slider/upload');

  const [items, setItems] = useState<PartnerLogoItem[]>([]); // Typing burada tətbiq edilir

  useEffect(() => {
    if (sliderHasData) {
      setItems(sliderData as PartnerLogoItem[]); // Gələn məlumatları interfeysə uyğun olaraq istifadə edirik
    }
  }, [sliderData, sliderHasData]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        await toast.promise(
          (async () => {
            const response = await uploadFile(formData);
            if (response) {
              setItems((prevItems) => [...prevItems, response as PartnerLogoItem]); // Yeni faylı siyahıya əlavə edirik
            }
          })(),
          {
            loading: 'Fayl yüklənir...',
            success: 'Fayl yükləndi!',
            error: 'Yükləmə zamanı xəta baş verdi!',
          }
        );
      } catch (error) {
        console.error('Yükləmə xətası:', error);
        toast.error('Yükləmə zamanı xəta baş verdi!');
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await toast.promise(deleteSlider(id), {
        loading: 'Silinir...',
        success: 'Element silindi!',
        error: 'Silmə zamanı xəta baş verdi!',
      });
      setItems((prevItems) => prevItems.filter((item) => item.id !== id)); // Elementi siyahıdan silirik
    } catch (error) {
      console.error('Silmə xətası:', error);
    }
  };

  if (sliderLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl" style={{ backgroundColor: '' }}>
        <CustomBreadcrumbs
          heading="Partnyorlar Logoları"
          links={[{ name: 'Ana səhifədəki partnyorların logoları' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
          action={
            <Button
              onClick={() => document.getElementById('file-add')?.click()}
              variant="contained"
              startIcon={<Iconify icon="fluent:add-24-regular" />}
            >
              <input
                type="file"
                id="file-add"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="image/*,video/*"
              />
              Yeni logo
            </Button>
          }
        />

        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 200 }}>Element</TableCell>
                <TableCell sx={{ minWidth: 100 }}>Tip</TableCell>
                <TableCell sx={{ minWidth: 100 }}>Ölçü (MB)</TableCell>
                <TableCell sx={{ minWidth: 100 }}>Tarix</TableCell>
                <TableCell sx={{ minWidth: 100 }}>Əməliyyatlar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.type === 'IMAGE' ? (
                      <Tooltip title="Şəkil">
                        <img
                          src={`${BASE_URL}/file/getFile/${item.name}`}
                          alt="slider"
                          style={{ width: '100px', height: 'auto', borderRadius: '8px' }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Video">
                        {/* eslint-disable-next-line */}
                        <video
                          src={`${BASE_URL}/file/getFile/${item.name}`}
                          controls
                          style={{ width: '150px', height: 'auto', borderRadius: '8px' }}
                        />
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell>{item.type === 'IMAGE' ? 'Şəkil' : 'Video'}</TableCell>
                  <TableCell>{item.sizeInMb.toFixed(2)} MB</TableCell>
                  <TableCell>{new Date(item.createdDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(item.id)}
                      aria-label="Delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardContent>
    </>
  );
}
