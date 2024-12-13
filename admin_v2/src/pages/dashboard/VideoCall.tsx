import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Grid,
  Typography,
  IconButton,
  TextField,
  Button,
  Paper,
  useTheme,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  Avatar,
} from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import TimerIcon from '@mui/icons-material/Timer';

const VideoCall = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [isCallActive, setIsCallActive] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Salam, necə kömək edə bilərəm?', sender: 'Operator', time: '09:30' },
    { text: 'Salam, bir problemim var.', sender: 'User', time: '09:31' },
  ]);
  const [message, setMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [incomingCall, setIncomingCall] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const theme = useTheme();

  // bu kisim ringtone ILKIN
  // useEffect(() => {
  //   const ringtone = new Audio('/ringtone.mp3');
  //   ringtone.loop = true;
  //   ringtone.volume = 1;
  //   ringtone.play();

  //   return () => {
  //     ringtone.pause();
  //     ringtone.currentTime = 0;
  //   };
  // }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isCallActive) {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isCallActive]);

  useEffect(() => {
    if (isVideoOn) {
      // Kamera erişimi ve videoya bağlama
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((mediaStream) => {
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        })
        .catch((error) => {
          console.error('Kamera erişim hatası:', error);
        });
    } else if (stream) {
      // Kamera akışını durdur
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isVideoOn]);

  const toggleVideo = () => {
    setIsVideoOn((prev) => !prev);
  };

  const toggleAudio = () => {
    setIsAudioOn((prev) => !prev);
  };

  const endCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
  };

  const sendMessage = () => {
    if (message) {
      const currentTime = new Date().toLocaleTimeString().slice(0, 5);
      setMessages((prev) => [...prev, { text: message, sender: 'User', time: currentTime }]);
      setMessage('');
    }
  };

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setOpenDialog(true);
  };

  const handleAcceptCall = () => {
    setIncomingCall(false);
    setIsCallActive(true);
  };

  const handleRejectCall = () => {
    setIncomingCall(false);
    alert('Zəng rədd edildi.');
  };

  const renderMessage = (msg: { text: string; sender: string; time: string }) => (
    <Grid
      container
      direction={msg.sender === 'User' ? 'row-reverse' : 'row'}
      spacing={2}
      sx={{ marginBottom: 1, backgroundColor: 'khaki' }}
    >
      <Grid item>
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
          {msg.time}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Paper
          sx={{
            padding: 1,
            backgroundColor:
              msg.sender === 'User'
                ? theme.palette.primary.light
                : theme.palette.background.neutral,
          }}
        >
          <Typography variant="body2">{msg.text}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ p: 2, gap: 1, display: 'flex', height: 'calc(100vh - 69px)', overflow: 'hidden' }}>
      {/* ILKIN gelen arama bu dialog il gozukecek Cihan bey. */}
      {/* <Dialog
        sx={{
          textAlign: 'center',
          padding: 4,
        }}
        open={incomingCall}
      >
        <DialogContent
          sx={{
            textAlign: 'center',
            padding: 4,
          }}
        >
          <Avatar
            src="https://www.pngkey.com/png/full/229-2294342_demo-person-dr-ak-sharma-nephrologist.png"
            sx={{
              width: 100,
              height: 100,
              margin: '0 auto',
              animation: 'popupAnimation 1s infinite alternate',
            }}
          />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Əhməd Əliyev Əli oğlu
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Embawood mebel mağazası
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', padding: 2, gap: 2, width: '100%' }}>
          <IconButton
            onClick={handleAcceptCall}
            color="primary"
            sx={{
              backgroundColor: theme.palette.success.main,
              color: '#fff',
              '&:hover': { backgroundColor: theme.palette.success.dark },
            }}
          >
            <CallEndIcon />
          </IconButton>
          <IconButton
            onClick={handleRejectCall}
            color="secondary"
            sx={{
              backgroundColor: theme.palette.error.main,
              color: '#fff',
              '&:hover': { backgroundColor: theme.palette.error.dark },
            }}
          >
            <CallEndIcon />
          </IconButton>
        </DialogActions>

        <style>
          {`
          @keyframes popupAnimation {
            from {
              transform: scale(1);
              box-shadow: 0 0 10px ${theme.palette.primary.main};
            }
            to {
              transform: scale(1.2);
              box-shadow: 0 0 20px ${theme.palette.secondary.main};
            }
          }
        `}
        </style>
      </Dialog> */}

      <Card
        sx={{
          width: '30%',
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
        }}
      >
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2">Operator:</Typography> Əhməd
        </Typography>
        <Box sx={{ flexGrow: 1, overflowY: 'auto', marginTop: 2, backgroundColor: 'khaki' }}>
          {messages.map((msg, index) => renderMessage(msg))}
        </Box>
        <Grid container spacing={2} sx={{ marginTop: 0 }}>
          <Grid item xs={9}>
            <TextField
              label="Mesaj yazın"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage();
              }}
              fullWidth
              size="small"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={sendMessage}
              fullWidth
              disabled={!message}
            >
              Göndər
            </Button>
          </Grid>
        </Grid>
      </Card>
      {/* Video call kısmı */}
      <Card
        sx={{
          width: '70%',
          display: 'flex',
          flexDirection: 'column',
          padding: 3,
          color: '#fff',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '70%',
            backgroundColor: '#333',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 1.4,
            position: 'relative',
          }}
        >
          {/* my camera  */}
          <div className="w-[25%] flex items-center justify-center absolute right-5 top-5 h-[27%] rounded-md bg-gray-900">
            {isVideoOn ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            ) : (
              <VideocamOffIcon fontSize="large" />
            )}
          </div>
        </Box>

        <Box sx={{ width: '100%', marginTop: 2, textAlign: 'center' }}>
          <Typography variant="body1">
            <TimerIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
            {Math.floor(callDuration / 60)}:
            {callDuration % 60 < 10 ? `0${callDuration % 60}` : callDuration % 60}
          </Typography>

          <Box sx={{ marginTop: 2 }}>
            <IconButton onClick={toggleVideo} color="primary" sx={{ margin: 1 }}>
              {isVideoOn ? <VideocamIcon /> : <VideocamOffIcon />}
            </IconButton>
            <IconButton onClick={toggleAudio} color="primary" sx={{ margin: 1 }}>
              {isAudioOn ? <MicIcon /> : <MicOffIcon />}
            </IconButton>
            <IconButton onClick={endCall} color="secondary" sx={{ margin: 1 }}>
              <CallEndIcon />
            </IconButton>
            <IconButton
              onClick={isRecording ? stopRecording : startRecording}
              color="error"
              sx={{
                margin: 1,
                position: 'relative',
              }}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default VideoCall;
