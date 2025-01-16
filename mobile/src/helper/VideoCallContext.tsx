import React, { createContext, useState, useRef, useEffect } from "react";
import {
  mediaDevices,
  RTCPeerConnection,
  RTCView,
  MediaStream,
  RTCIceCandidate,
  RTCSessionDescription,
} from "react-native-webrtc";
import uuid from "react-native-uuid";
interface VideoCallContextProps {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  startCall: () => void;
  endCall: () => void;
}
export const VideoCallContext = createContext<VideoCallContextProps>({
  localStream: null,
  remoteStream: null,
  startCall: () => {},
  endCall: () => {},
});
export const VideoCallProvider: React.FC = ({ children }) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);

  const clientUUID = uuid.v4();
  const webSocketKey = "0916d3d3-f102-4932-be77-cd0084e13c74";
  const WEB_SOCKET_URL = "wss://api.studentall.az:9899/signal";
  const TURN_ENABLED = true;
  const TURN_SERVER_URL = "turn:46.202.143.42:3478?transport=tcp";
  const TURN_USER = "testname";
  const TURN_PASS = "testpass";

  useEffect(() => {
    initWebSocket();
    startLocalStream();

    return () => {
      if (wsRef.current) wsRef.current.close();
      if (localStream) localStream.getTracks().forEach((t) => t.stop());
      if (pcRef.current) pcRef.current.close();
    };
  }, []);

  const initWebSocket = () => {
    const ws = new WebSocket(WEB_SOCKET_URL);

    ws.onopen = () => {
      console.log("[WebSocket] Bağlantı kuruldu");
      ws.send(
        JSON.stringify({
          type: "setClientUUID",
          clientUUID: clientUUID,
          socketKEY: webSocketKey,
        })
      );
    };

    ws.onmessage = (event) => {
      if (event.data) {
        handleSignalMessage(event.data);
      }
    };

    ws.onclose = () => {
      console.log("[WebSocket] Bağlantı kapandı");
    };

    ws.onerror = (err) => {
      console.error("[WebSocket] Hata:", err);
    };

    wsRef.current = ws;
  };

  // Gelen WebSocket mesajlarını işleyen fonksiyon
  const handleSignalMessage = (data: any) => {
    try {
      const msg: SignalType = JSON.parse(data);
      console.log("[WebSocket] Alınan mesaj:", msg);

      switch (msg.type) {
        case "offer":
          handleOffer(msg);
          break;
        case "answer":
          handleAnswer(msg);
          break;
        case "icecandidate":
          handleCandidate(msg);
          break;
        case "endmeeting":
          endCall();
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("[WebSocket] Mesaj çözümleme hatası:", error);
    }
  };
  const sendSignal = (signal: SignalType) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(signal));
    } else {
      console.warn("[WebSocket] Bağlantı kurulmamış");
    }
  };
  const startLocalStream = async () => {
    try {
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: { facingMode: "user" },
      });
      setLocalStream(stream);
    } catch (err) {
      console.error("[MediaDevices] Hata:", err);
    }
  };

  const startCall = () => {
    const pc = createPeerConnection();
    pcRef.current = pc;

    if (localStream) {
      localStream
        .getTracks()
        .forEach((track) => pc.addTrack(track, localStream));
    }

    pc.createOffer()
      .then((offer) => pc.setLocalDescription(offer))
      .then(() => {
        sendSignal({
          type: "offer",
          sdp: pc.localDescription?.sdp,
        });
      })
      .catch((err) => console.error("[PeerConnection] Offer Hatası:", err));
  };

  const handleOffer = async (msg: SignalType) => {
    const pc = createPeerConnection();
    pcRef.current = pc;

    try {
      await pc.setRemoteDescription(
        new RTCSessionDescription({ type: "offer", sdp: msg.sdp })
      );
      if (localStream) {
        localStream
          .getTracks()
          .forEach((track) => pc.addTrack(track, localStream));
      }
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      sendSignal({
        type: "answer",
        sdp: pc.localDescription?.sdp,
      });
    } catch (err) {
      console.error("[PeerConnection] Teklif İşleme Hatası:", err);
    }
  };

  // Gelen yanıtları işleyen fonksiyon
  const handleAnswer = async (msg: SignalType) => {
    try {
      await pcRef.current?.setRemoteDescription(
        new RTCSessionDescription({ type: "answer", sdp: msg.sdp })
      );
    } catch (err) {
      console.error("[PeerConnection] Yanıt İşleme Hatası:", err);
    }
  };

  // Gelen ICE adaylarını işleyen fonksiyon
  const handleCandidate = async (msg: SignalType) => {
    try {
      const candidate = new RTCIceCandidate(msg.candidate);
      await pcRef.current?.addIceCandidate(candidate);
    } catch (err) {
      console.error("[PeerConnection] ICE Adayı Ekleme Hatası:", err);
    }
  };

  const createPeerConnection = () => {
    const iceServers: RTCIceServer[] = [
      { urls: "stun:stun.l.google.com:19302" },
      ...(TURN_ENABLED
        ? [
            {
              urls: TURN_SERVER_URL,
              username: TURN_USER,
              credential: TURN_PASS,
            },
          ]
        : []),
    ];

    const pc = new RTCPeerConnection({ iceServers });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        sendSignal({
          type: "icecandidate",
          candidate: event.candidate,
          // Diğer gerekli alanları ekleyin
        });
      }
    };

    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    pc.onconnectionstatechange = () => {
      if (
        pc.connectionState === "disconnected" ||
        pc.connectionState === "failed"
      ) {
        endCall();
      }
    };

    return pc;
  };
  const endCall = () => {
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    setRemoteStream(null);
    sendSignal({ type: "endmeeting" });
  };

  return (
    <VideoCallContext.Provider
      value={{
        localStream,
        remoteStream,
        startCall,
        endCall,
      }}
    >
      {children}
    </VideoCallContext.Provider>
  );
};

// SignalType arayüzünü tanımlayın
interface SignalType {
  type:
    | "newcall"
    | "cancel"
    | "answer"
    | "offer"
    | "icecandidate"
    | "acceptcall"
    | "reject"
    | "sendOfferAgain"
    | "endmeeting"
    | "setClientUUID";
  meetingID?: string;
  sdp?: string;
  candidate?: RTCIceCandidate | null;
  senderName?: string;
  sender?: string;
  receiver?: string;
  clientUUID?: string;
  socketKEY?: string;
}
