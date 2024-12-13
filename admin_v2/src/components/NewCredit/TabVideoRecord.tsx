import { useState } from 'react';
import {
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { format } from 'date-fns';

const TabVideoRecord = ({
  setValue,
}: {
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [recording, setRecording] = useState(false);
  const [dummyTextOpen, setDummyTextOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const handleStartRecording = () => {
    setRecording(true);
  };

  const handleStopRecording = () => {
    setRecording(false);
  };

  const handleDeleteRecording = () => {
    setConfirmationOpen(true);
  };

  const confirmDeleteRecording = () => {
    setRecording(false);
    setConfirmationOpen(false);
    alert('Silindi.');
  };

  const cancelDeleteRecording = () => {
    setConfirmationOpen(false);
  };

  const handleDummyTextOpen = () => {
    setDummyTextOpen(true);
  };

  const handleDummyTextClose = () => {
    setDummyTextOpen(false);
  };

  const today = format(new Date(), 'dd/MM/yyyy');

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Paper
            sx={{
              position: 'relative',
              height: '300px',
              backgroundColor: '#000',
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                color: 'white',
              }}
            >
              {today}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              Video burada
            </Typography>
          </Paper>
        </Grid>

        {/* Sağ taraf - Butonlar */}
        <Grid item xs={4}>
          <Box display="flex" flexDirection="column" gap={2}>
            {!recording ? (
              <Button variant="contained" color="primary" onClick={handleStartRecording}>
                Başlat
              </Button>
            ) : (
              <Button variant="contained" color="secondary" onClick={handleStopRecording}>
                Bitir
              </Button>
            )}
            <Button variant="outlined" color="warning">
              Video çəkilişə bax
            </Button>
            <Button variant="outlined" color="info" onClick={handleDummyTextOpen}>
              PDF mətni göstər
            </Button>
            <Button variant="outlined" color="error" onClick={handleDeleteRecording}>
              Videonu sil
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box textAlign="center" sx={{ mt: 4 }}>
        <Button
          onClick={() => {
            window.scrollTo(0, 0);
            setValue('6');
          }}
          variant="contained"
          color="error"
          sx={{ mr: 2 }}
        >
          Geri
        </Button>
        <Button
          onClick={() => {
            window.scrollTo(0, 0);
            setValue('8');
          }}
          variant="contained"
          color="primary"
        >
          İrəli
        </Button>
      </Box>

      {/* Dummy Text Modal */}
      <Modal open={dummyTextOpen} onClose={handleDummyTextClose} aria-labelledby="dummy-text-title">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 3,
            maxHeight: '80vh',
            overflow: 'auto',
            boxShadow: 24,
          }}
        >
          <Typography id="dummy-text-title" variant="h6" mb={2}>
            Mətn başlığı
          </Typography>
          <Typography>
            {/* dummy text  */}
            Lorem Ipsum is simply
          </Typography>
          <Box mt={2} textAlign="right">
            <Button variant="contained" onClick={handleDummyTextClose}>
              Bağla
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Silme Onayı Dialog */}
      <Dialog
        open={confirmationOpen}
        onClose={cancelDeleteRecording}
        aria-labelledby="delete-confirmation-title"
      >
        <DialogTitle id="delete-confirmation-title">Video qeydiyyatı sil</DialogTitle>
        <DialogContent>
          <Typography>Bu video qeydiyyatı silmək istədiyinizə əminsinizmi?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteRecording} color="inherit">
            Silmə
          </Button>
          <Button onClick={confirmDeleteRecording} color="error" variant="contained">
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TabVideoRecord;
