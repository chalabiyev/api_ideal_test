import { useEffect, useRef, useState } from 'react';
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
import { SignalType } from '../video-call/WebsocketTypes';
import { callDeleteFile, callGetFile } from 'src/api/FileService';
import { toast } from 'sonner';
import { Iconify } from '../iconify';
import { CreditRequestDto } from 'src/types/CreditRequestDto';
import { set } from 'nprogress';

const TabVideoRecordPartner = ({
  userInfo,
  creditRequest,
  setValue,
  newSignal,
  sendSignal,
  videoData,
  setVideoData,
  setCreditRequest
}: {
  userInfo: any;
  creditRequest: CreditRequestDto;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  newSignal: SignalType | undefined;
  sendSignal: (s: SignalType) => void;
  videoData: string;
  setVideoData: (s: string) => void;
  setCreditRequest: React.Dispatch<React.SetStateAction<CreditRequestDto>>;
}) => {
  const [recording, setRecording] = useState(false);
  const [signTextOpen, setSignTextOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRecordStarted, setIsRecordStarted] = useState(false);

  useEffect(() => {
    if (userInfo && creditRequest.creditAmount && creditRequest.creditTerm) {
      setCreditRequest({
        ...creditRequest,
        videoSignText: `Mən ${userInfo.personAz?.surname} ${userInfo.personAz?.name} ${userInfo?.personAz?.patronymic}, İdeal kreditdən ${creditRequest.creditTerm} aylıq ${creditRequest.creditAmount} azn kredit götürdüyüm haqqında müraciəti təsdiq edirəm.`
      }
      );
    }
  }, [userInfo, creditRequest]);

  const handleStartRecording = () => {
    showSignText();
    sendSignal({ type: 'startVideoRecord' });
    setRecording(true);
    toast.success('Video yazı başladı');
    setIsRecordStarted(true);
  };

  const handleStopRecording = () => {
    hideSignText();
    sendSignal({ type: 'stopVideoRecord' });
    setRecording(false);
    toast.warning('Video yüklənir..');
    setIsRecordStarted(false);
  };

  const handlePlayVideo = () => {
    if (videoRef.current) videoRef.current.play();
  };

  const handleDeleteRecording = () => {
    setConfirmationOpen(true);
  };

  const confirmDeleteRecording = () => {
    if (!creditRequest.videoSignFileName) return;

    setRecording(false);
    setConfirmationOpen(false);
    callDeleteFile(creditRequest.videoSignFileName)
      .then((res) => {
        toast.success(res == true ? 'Silindi.' : 'Silinmədi.');
        if (res == true) {
          setCreditRequest({ ...creditRequest, videoSignFileName: '' });
          setVideoData('');
        }
      })
      .catch((err) => {
        toast.error('Silinmədi.');
      });
  };

  const cancelDeleteRecording = () => {
    setConfirmationOpen(false);
  };

  const showSignText = () => {
    sendSignal({ type: 'showSignText', msg: creditRequest.videoSignText });
    setSignTextOpen(true);
  };

  const hideSignText = () => {
    sendSignal({ type: 'hideSignText' });
    setSignTextOpen(false);
  };

  const today = format(new Date(), 'dd/MM/yyyy');

  useEffect(() => {
    if (newSignal && newSignal.type == 'videoRecord' && newSignal.msg) {
      setCreditRequest({ ...creditRequest, videoSignFileName: newSignal.msg });
      callGetFile(newSignal.msg).then((res) => {
        if (res) setVideoData(res);
      });
    }
  }, [newSignal]);

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Paper
            sx={{
              position: 'relative',
              height: '300px',
              backgroundColor: '#000',
              overflow: 'hidden',
            }}
          >
            {isRecordStarted ?
              <div className="absolute w-[50px] bg-[khaki]/0 h-[50px] left-0 top-0 z-[1] rounded-sm rounded-l-none flex items-center justify-center animate-pulse">
                <Iconify width={35} icon="mdi:record" color='red' />
              </div>
              :
              <Typography
                variant="subtitle1"
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  color: 'white',
                  zIndex: 1,
                }}
              >
                {today}
              </Typography>
            }

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
              <video
                ref={videoRef}
                src={videoData}
                style={{ width: '100%', height: '100%' }}
                controls
              >
                <track kind="captions" srcLang="az" label="Azerbaycan" default />
              </video>
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
            {/* <Button variant="outlined" color="warning" onClick={handlePlayVideo}>
              Video çəkilişə bax
            </Button> */}
            <Button variant="outlined" color="info" onClick={showSignText}>
              İmza mətni göstər
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
            setValue('8');
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
            setValue('10');
          }}
          variant="contained"
          color="primary"
        >
          İrəli
        </Button>
      </Box>

      <Modal open={signTextOpen} onClose={hideSignText} aria-labelledby="dummy-text-title">
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
          <Typography>{creditRequest.videoSignText}</Typography>
          <Box mt={2} textAlign="right">
            <Button variant="contained" onClick={hideSignText}>
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

export default TabVideoRecordPartner;
