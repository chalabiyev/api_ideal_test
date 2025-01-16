import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SignalType } from './WebsocketTypes';

export interface EsamVideoCallOperatorProp {
  partnerId?: string;
  setPartnerId: (value: string) => void;
  localStream: MediaStream;
  localPin: string;
  localName: string;
  newCallReceived: boolean;
  setNewCallReceived: (value: boolean, signal: SignalType) => void;
  onReceiverConnected: (signal: SignalType) => void;
  onReceiverStream: (stream: MediaStream) => void;
  endMeeting: boolean;
  onEndMeeting: (signal: SignalType) => void;
  acceptCall: boolean;
  incomingChatMessage?: any[];
  setIncomingChatMessage?: any
  outgoingChatMessage?: any;
  setOutgoingChatMessage?: any;
  setClientUUID: any;
}

const turnServerURL = import.meta.env.VITE_TURN_SERVER_URL;
const turnEnabled = import.meta.env.VITE_TURN_ENABLED;
const turnUser = import.meta.env.VITE_TURN_USER;
const turnPass = import.meta.env.VITE_TURN_PASSWORD;
const webSocketKey = import.meta.env.VITE_WEB_SOCKET_KEY;
const webSocketUri = import.meta.env.VITE_WEB_SOCKET_URL;
const clientUUID = uuidv4();

let meetingID = '';
let receiverName = '';
let receiverPin;
let receiver = '';
let inCall = false;
let calling = false;
let peerConnection: RTCPeerConnection;
let ws: WebSocket;

export const EsamVideoCallOperator = (prop: EsamVideoCallOperatorProp) => {
  const handleSocketOpen = () => {
    if (ws) {
      ws.send(
        JSON.stringify({ type: 'setClientUUID', clientUUID: clientUUID, socketKEY: webSocketKey, operator: true })
      );
      if (prop.setClientUUID)
        prop.setClientUUID(clientUUID);
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
    if (!ws) {
      ws = new WebSocket(webSocketUri);
      ws.onopen = handleSocketOpen;
      ws.onmessage = handleMessage;
      setInterval(() => {
        if (ws.readyState == WebSocket.CLOSED) {
          ws = new WebSocket(webSocketUri);
        }
      }, 30000);
    }
  }, []);

  useEffect(() => {
    sendSignal({ type: 'endmeeting', receiver: receiver, meetingID: meetingID });
  }, [prop.endMeeting]);

  const preparePeerConnection = () => {
    const configuration = {
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
      iceServers: [],
    };
    const turnConfiguration = {
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
      iceServers: [
        {
          urls: turnServerURL,
          username: turnUser,
          credential: turnPass,
        },
      ],
    };
    peerConnection = new RTCPeerConnection(turnEnabled ? turnConfiguration : configuration);

    if (!peerConnection) return;

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        sendSignal({
          type: 'icecandidate',
          candidate: event.candidate,
          meetingID: meetingID,
          receiver: receiver,
        });
      }
    };

    peerConnection.onconnectionstatechange = () => {
      if (peerConnection.connectionState == 'connected') {
        sendCamAndMicStreams();
      } else if (peerConnection.connectionState == 'failed') {
        console.log('Retrying connection...');
        peerConnection.close();
        preparePeerConnection();
      } else if (peerConnection.connectionState == 'disconnected') {
        calling = false;
        inCall = false;
        receiver = '';
        receiverName = '';
        receiverPin = '';
        prop.setNewCallReceived(false, { type: 'cancel' });
      }
    };
    peerConnection.ontrack = displayRemoteStream;
  };

  const sendCamAndMicStreams = async () => {
    if (!peerConnection) return;
    if (!prop.localStream) {
      alert('Webcam bağlantısı kurulamadı!');
    }
    prop.localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, prop.localStream);
    });
  };

  const displayRemoteStream = (e: RTCTrackEvent) => {
    try {
      let strm = e.streams[0];
      prop.onReceiverStream(strm);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCandidate = async (s: SignalType) => {
    if (!peerConnection || !s.candidate || !peerConnection.remoteDescription) return;
    await peerConnection.addIceCandidate(s.candidate);
  };

  const sendSignal = (data: SignalType) => {
    console.log("sendSignal", data);
    if (ws && ws.readyState == WebSocket.OPEN) {
      let msg = { ...data, clientUUID: clientUUID, sender: clientUUID };
      ws.send(JSON.stringify(msg));
    }
  };

  const handleNewCall = (s: SignalType) => {
    if (inCall || !prop.setNewCallReceived || !s.meetingID || !s.sender || !s.senderName) return;

    inCall = true;
    // eslint-disable-next-line
    meetingID = s.meetingID;
    receiver = s.sender;
    receiverName = s.senderName;
    // eslint-disable-next-line
    if (s.senderPin) receiverPin = s.senderPin;
    prop.setNewCallReceived(true, s);
    if (s.partnerId) {
      const { partnerId } = s;
      prop.setPartnerId(partnerId);
      prop.partnerId = partnerId;
    }
  };

  useEffect(() => {
    if (!prop.newCallReceived) return;
    if (prop.acceptCall) {
      inCall = true;
      sendSignal({ type: 'acceptcall', receiver: receiver, meetingID: meetingID });
      preparePeerConnection();
    } else {
      sendSignal({ type: 'reject', receiver: receiver, meetingID: meetingID });
      inCall = false;
      receiver = '';
      receiverName = '';
      receiverPin = '';
    }
  }, [prop.acceptCall]);

  const handleOffer = async (s: SignalType) => {
    if (!peerConnection) return;
    let remoteDesc = new RTCSessionDescription({ type: 'offer', sdp: s.sdp });
    await peerConnection.setRemoteDescription(remoteDesc);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    sendSignal({ type: 'answer', sdp: answer.sdp, receiver: receiver });
  };

  const handleCancel = (s: SignalType) => {
    if (s.meetingID != meetingID || s.sender != receiver) return;
    inCall = false;
    receiver = '';
    receiverName = '';
    receiverPin = '';
    prop.setNewCallReceived(false, s);
  };

  const handleEndMeeting = (s: SignalType) => {
    if (!prop.onEndMeeting) return;
    prop.onEndMeeting(s);
  };

  useEffect(() => {
    if (prop.outgoingChatMessage && prop.setOutgoingChatMessage) {
      sendSignal({ type: 'chatincome', receiver: receiver, msg: prop.outgoingChatMessage });
      prop.setOutgoingChatMessage('');
    }
  }, [prop.outgoingChatMessage]);

  useEffect(() => {
    if (prop.localStream && peerConnection) {
      prop.localStream.getTracks().forEach((track) => {
        if (peerConnection) {
          peerConnection.addTrack(track, prop.localStream);
        }
      });
    }
  }, [prop.localStream]);

  const listenSignals = (s: SignalType) => {
    console.log("listenSignals", s);
    if (s.type == 'newcall' || s.type == 'cancel' || s.receiver == clientUUID) {
      switch (s.type) {
        case 'newcall':
          handleNewCall(s);
          break;
        case 'cancel':
          handleCancel(s);
          break;
        case 'offer':
          handleOffer(s);
          break;
        case 'icecandidate':
          handleCandidate(s);
          break;
        case 'endmeeting':
          handleEndMeeting(s);
          break;
        case 'chatincome':
          if (prop.setIncomingChatMessage && s.msg) {
            const currentTime = new Date().toLocaleTimeString().slice(0, 5);
            prop.setIncomingChatMessage({ text: s.msg, sender: receiverName, time: currentTime });
          }
          break;
      }
    }
  };

  return <></>;
};
