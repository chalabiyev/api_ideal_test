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
import { callGetFile } from 'src/api/FileService';

let wsVideoRecord: WebSocket;

const TabVideoRecord = ({
  userInfo,
  creditAmount,
  creditDuration,
  setValue,
  clientId,
  operatorId
}: {
  userInfo: any;
  creditAmount: number;
  creditDuration: number;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  clientId: string;
  operatorId: string;
}) => {
  const [recording, setRecording] = useState(false);
  const [dummyTextOpen, setDummyTextOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [videoSignText, setVideoSignText] = useState('');
  const [videoData, setVideoData] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (userInfo && creditAmount && creditDuration) {
      setVideoSignText(`Mən ${userInfo.personAz?.surname} ${userInfo.personAz?.name} ${userInfo?.personAz?.patronymic}, İdeal kreditdən ${creditDuration} aylıq ${creditAmount} azn kredit götürdüyüm haqqında müraciəti təsdiq edirəm.`);
    }
  }, [userInfo, creditAmount, creditDuration]);

  const handleStartRecording = () => {
    sendSignal({ type: 'startVideoRecord' });
    setRecording(true);
  };

  const handleStopRecording = () => {
    sendSignal({ type: 'stopVideoRecord' });
    setRecording(false);
  };

  const handlePlayVideo = () => {
    if (videoRef.current)
      videoRef.current.play();
  }

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
    sendSignal({ type: 'showSignText', msg: videoSignText });
    setDummyTextOpen(true);
  };

  const handleDummyTextClose = () => {
    sendSignal({ type: 'hideSignText' });
    setDummyTextOpen(false);
  };

  const today = format(new Date(), 'dd/MM/yyyy');
  const webSocketUri = import.meta.env.VITE_WEB_SOCKET_URL;
  const webSocketKey = import.meta.env.VITE_WEB_SOCKET_KEY;

  const handleSocketOpen = () => {
    if (wsVideoRecord) {
      wsVideoRecord.send(
        JSON.stringify({ type: 'setClientUUID', clientUUID: operatorId, socketKEY: webSocketKey })
      );
    }
  };

  const sendSignal = (data: SignalType) => {
    if (wsVideoRecord && wsVideoRecord.readyState == WebSocket.OPEN) {
      let msg = { ...data, clientUUID: operatorId, sender: operatorId, receiver: clientId };
      console.log("sendSignal", msg);
      wsVideoRecord.send(JSON.stringify(msg));
    }
  };

  const listenSignals = (s: SignalType) => {
    console.log("listenSignals", s);
    if (s.receiver == operatorId) {
      if (s.type == 'videoRecord' && s.msg) {
        callGetFile(s.msg).then((res) => {
          if (res)
            setVideoData(res);
        })
      }
    }
  };

  const handleMessage = (event: MessageEvent) => {
    if (event.data && event.data.trim().length > 0) {
      try {
        let msg = JSON.parse(event.data) as SignalType;
        listenSignals(msg);
      } catch (error) { }
    }
  };

  useEffect(() => {
    if (!wsVideoRecord) {
      wsVideoRecord = new WebSocket(webSocketUri);
      wsVideoRecord.onopen = handleSocketOpen;
      wsVideoRecord.onmessage = handleMessage;
      setInterval(() => {
        if (wsVideoRecord.readyState == WebSocket.CLOSED) {
          wsVideoRecord = new WebSocket(webSocketUri);
        }
      }, 30000);
    }
  }, []);


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
              <video ref={videoRef} src={videoData} style={{ width: '100%', height: '100%' }} controls>
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
            <Button variant="outlined" color="warning" onClick={handlePlayVideo}>
              Video çəkilişə bax
            </Button>
            <Button variant="outlined" color="info" onClick={handleDummyTextOpen}>
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
            {videoSignText}
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
