import { useState, useEffect, useRef } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion'; // LazyMotion ve m import

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
import { primary } from 'src/theme/core';
import { SignalType } from 'src/components/video-call/WebsocketTypes';
import { WebCam } from 'src/components/video-call/WebCam';
import { EsamVideoCallOperator } from 'src/components/video-call/EsamVideoCallOperator';
import { useAuthContext } from 'src/auth/hooks';
import { toast } from 'sonner';


const VideoCall = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [isCallActive, setIsCallActive] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState<any[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [message, setMessage] = useState('');
  const [messageToSend, setMessageToSend] = useState('');
  const [receivedMessage, setReceivedMessage] = useState<any>();
  const [openDialog, setOpenDialog] = useState(false);
  const [incomingCall, setIncomingCall] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const theme = useTheme();

  const [showWebCamSettings, setShowWebCamSettings] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream>();
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [clientPin, setClientPin] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [partnerId, setPartnerId] = useState<string>('');

  const [clientPhoto, setClientPhoto] = useState<string>('');
  const [newCallType, setNewCallType] = useState<string>('');
  const [acceptCall, setAccepCall] = useState(false);
  const [endMeeting, setEndMeeting] = useState(false);
  const [newCallReceived, setNewCallReceived] = useState(false);
  const { user } = useAuthContext();
  const [clientId, setClientId] = useState('');
  const [operatorId, setOperatorId] = useState('');

  useEffect(() => {
    localStream?.getAudioTracks().forEach((track) => {
      track.enabled = isAudioOn;
    })
  }, [isAudioOn]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleLocalStream = (s: MediaStream) => {
    setLocalStream(s);
  };

  const handleNewCall = (v: boolean, s: SignalType) => {
    setNewCallReceived(v);
    if (!v) return;
    setIncomingCall(true);
    if (s.sender)
      setClientId(s.sender);
    if (s.senderName)
      setClientName(s.senderName);
    if (s.senderPin)
      setClientPin(s.senderPin);
    if (s.senderPhoto)
      setClientPhoto(s.senderPhoto);
    if (s.newCallType)
      setNewCallType(s.newCallType);
  };

  // bu kisim ringtone ILKIN
  useEffect(() => {
    const ringtone = new Audio('/ringtone.mp3');
    ringtone.loop = true;
    ringtone.volume = 1;

    if (incomingCall) {
      ringtone.play().catch((err) => console.error('Ringtone play error:', err));
    }

    return () => {
      ringtone.pause();
      ringtone.currentTime = 0;
    };
  }, [incomingCall]);

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
    localStream?.getVideoTracks().forEach((track) => {
      track.enabled = isVideoOn;
    });
    // eslint-disable-next-line
  }, [isVideoOn]);

  const toggleVideo = () => {
    setIsVideoOn((prev) => !prev);
  };

  const toggleAudio = () => {
    setIsAudioOn((prev) => !prev);
  };

  const endCall = () => {
    resetTimer(); // Timer sıfırla
    setIsCallActive(false);
    setEndMeeting(true);
    setAccepCall(false);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const sendMessage = () => {
    if (message) {
      const currentTime = new Date().toLocaleTimeString().slice(0, 5);
      setMessages([...messages, { text: message, sender: user?.fullName, time: currentTime }]);
      setMessageToSend(message);
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
    // eslint-disable-next-line
    console.log("clientId : " + clientId);
    // eslint-disable-next-line
    console.log("operatorId : " + operatorId);
    setIncomingCall(false); // Gelen aramayı kapatıyoruz
    setIsCallActive(true); // Çağrıyı aktif hale getiriyoruz
    setAccepCall(true); // Aramanın kabul edildiğini belirtiyoruz
    startTimer(); // Timer'ı başlatıyoruz
    if (newCallType == 'above') {
      let newTab = window.open(`/videomuraciet/nagd-pul-krediti?pin=${clientPin}&clientId=${clientId}&operatorId=${operatorId}`, '_blank');
      if (newTab)
        newTab.focus();
    }
  };

  const handleRejectCall = () => {
    setIncomingCall(false);
    toast.error('Zəng rədd edildi.');
    setAccepCall(false);
  };

  // timer
  const startTimer = () => {
    if (timer) return; // Zaten çalışan bir timer varsa, yeni başlatma.
    const newTimer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    setTimer(newTimer);
  };

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setCallDuration(0);
  };

  // Örnek kullanım: onReceiverConnected tetiklendiğinde zamanlayıcı başlat
  const handleReceiverConnected = () => {
    setIsCallActive(true);
    startTimer();
  };
  useEffect(() => {
    // Bileşen temizliği sırasında zamanlayıcıyı durdur
    return () => stopTimer();
  }, []);

  useEffect(() => {
    // Bileşen temizliği sırasında zamanlayıcıyı durdur
    return () => stopTimer();
  }, []);

  useEffect(() => {
    if (receivedMessage) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  const renderMessage = (msg: { text: string; sender: string; time: string }) => (
    <Grid
      container
      alignItems="center"
      direction={msg.sender === clientName ? 'row-reverse' : 'row'}
      spacing={2}
      sx={{ marginBottom: 1 }}
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
              msg.sender === clientName
                ? theme.palette.primary.light
                : theme.palette.background.neutral,
          }}
        >
          <Typography variant="body2">{msg.text} {msg.sender}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ p: 2, gap: 1, display: 'flex', height: 'calc(100vh - 69px)', overflow: 'hidden' }}>
      {/* ILKIN gelen arama bu dialog il gozukecek Cihan bey. */}
      <Dialog
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
            src={clientPhoto ? `data:image/jpeg;base64, ${clientPhoto}` : "https://www.pngkey.com/png/full/229-2294342_demo-person-dr-ak-sharma-nephrologist.png"}
            sx={{
              width: 100,
              height: 100,
              margin: '0 auto',
              animation: 'popupAnimation 1s infinite alternate',
            }}
          />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            {clientName} {partnerId}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {/* Embawood mebel mağazası */}
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
      </Dialog>

      <Card
        sx={{
          width: '30%',
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
        }}
      >
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2">Operator:</Typography> {user ? user.fullName : ''}
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {messages.map((msg, index) => renderMessage(msg))}
          <div ref={messagesEndRef} /> {/* Yeni ekleme */}
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
            overflow: 'hidden',
          }}
        >
          {/* // eslint-disable-next-line */}
          <div className=" w-full h-full">
            {/* // eslint-disable-next-line */}
            <video
              ref={remoteVideoRef}
              src=""
              autoPlay
              style={{ objectFit: 'cover' }}
              className="w-full h-full object-cover"
            >
              <track kind="captions" srcLang="az" label="Azerbaycan" default />
            </video>
          </div>
          {/* countdown  */}

          <Card
            sx={{
              display: 'flex',
              padding: 2,
              position: 'absolute',
              top: '-3px',
              left: '-3px',
              p: 0.9,
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
              borderTopRightRadius: '0px',
            }}
          >
            <TimerIcon sx={{ verticalAlign: 'middle', marginRight: 1, color: primary.main }} />
            {Math.floor(callDuration / 60)}:
            {callDuration % 60 < 10 ? `0${callDuration % 60}` : callDuration % 60}{' '}
          </Card>

          {/* my camera draggabl */}
          <LazyMotion features={domAnimation}>
            <m.div
              drag
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              dragMomentum={false}
              style={{
                position: 'absolute',
                top: '2%',
                right: '2%',
                width: '35%',
                height: '27%',
                border: '2px solid #fff',
                borderRadius: '8px',
                backgroundColor: '#000',
                cursor: 'grab',
                display: 'flex',
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              whileDrag={{ cursor: 'grabbing' }}
            >
              {isVideoOn ? (
                <WebCam
                  onStreamChanged={handleLocalStream}
                  setShowSettings={setShowWebCamSettings}
                  showSettings={showWebCamSettings}
                  width={320}
                  height={210}
                  className="w-full h-full object-cover"
                />
              ) : (
                <VideocamOffIcon fontSize="large" style={{ color: '#fff' }} />
              )}
            </m.div>
          </LazyMotion>
        </Box>

        <Box sx={{ width: '100%', marginTop: 2, textAlign: 'center' }}>
          <Box sx={{ marginTop: 2 }}>
            <IconButton onClick={toggleVideo} color="primary" sx={{ margin: 1 }}>
              {isVideoOn ? <VideocamIcon /> : <VideocamOffIcon />}
            </IconButton>
            <IconButton onClick={toggleAudio} color="primary" sx={{ margin: 1 }}>
              {isAudioOn ? <MicIcon /> : <MicOffIcon />}
            </IconButton>
            <IconButton disabled={!acceptCall} onClick={endCall} color="secondary" sx={{ margin: 1 }}>
              <CallEndIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>

      {localStream && (
        <EsamVideoCallOperator
          localName={user?.fullName}
          localPin="1234567"
          localStream={localStream}
          onReceiverConnected={(s: SignalType) => {
            setClientName(s.senderName!);
            setPartnerId(s?.partnerId!);
          }}
          onReceiverStream={(s: MediaStream) => {
            if (remoteVideoRef.current == undefined) return;
            remoteVideoRef.current.srcObject = s;
          }}
          endMeeting={endMeeting}
          acceptCall={acceptCall}
          newCallReceived={newCallReceived}
          setNewCallReceived={handleNewCall}
          onEndMeeting={(s: SignalType) => { }}
          incomingChatMessage={receivedMessage}
          setIncomingChatMessage={setReceivedMessage}
          outgoingChatMessage={messageToSend}
          setOutgoingChatMessage={setMessageToSend}
          setClientUUID={(value: string) => setOperatorId(value)}
        />
      )}
    </Box>
  );
};

export default VideoCall;
