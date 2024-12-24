import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
} from "react-native";
import { makeStyles } from "./style";
import colors from "../../../constants/colors/colors";
import { globalSpacingStyle } from "../../../constants/space/style";
import { ContractModal, Text } from "../../../components";
import {
  AddUserIcon,
  CameraIcon,
  CancelCameraIcon,
  CloseTelephoneIcon,
  MessageIcon,
  MicrofonIcon,
  CancelMicrofonIcon,
  ShareIcon,
  ShareScreenIcon,
} from "../../../assets";
import { useNavigation, useRoute } from "@react-navigation/native";
import { scale } from "react-native-size-matters";
import {
  mediaDevices,
  RTCView,
  RTCPeerConnection,
  MediaStream,
  RTCIceCandidate,
  RTCSessionDescription,
} from "react-native-webrtc";

const { width } = Dimensions.get("window");
const globalStyle = globalSpacingStyle();
const styles = makeStyles();
const WEB_SOCKET_URL = "wss://api.studentall.az:9899/signal";
const TURN_ENABLED = true;
const TURN_SERVER_URL = "turn:46.202.143.42:3478?transport=tcp";
const TURN_USER = "testname";
const TURN_PASS = "testpass";

export interface SignalType {
  type:
    | "newcall"
    | "cancel"
    | "answer"
    | "offer"
    | "icecandidate"
    | "acceptcall"
    | "reject"
    | "sendOfferAgain"
    | "endmeeting";
  meetingID?: string;
  sdp?: string;
  candidate?: RTCIceCandidate | null;
  senderName?: string;
  sender?: string;
  receiver?: string;
}

export default function VideoCall() {
  const navigation = useNavigation();
  const route = useRoute();

  const [showGif, setShowGif] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isBoxVisible, setBoxVisible] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;
  const [isCameraOn, setCameraOn] = useState(true);
  const [isMicrophoneOn, setMicrophoneOn] = useState(true);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);

  const [meetingID, setMeetingID] = useState<string | null>(null);
  const [calling, setCalling] = useState<boolean>(false);
  const [callAccepted, setCallAccepted] = useState<boolean>(false);
  const [socketReady, setSocketReady] = useState<boolean>(false);
  const [callStarted, setCallStarted] = useState<boolean>(false);
  useEffect(() => {
    if (route.params?.showGif) {
      setShowGif(true);
      setTimeout(() => setShowGif(false), 2000);
    }
  }, [route.params]);
  useEffect(() => {
    if (elapsedSeconds === 3) {
      setModalOpen(true);
    }
  }, [elapsedSeconds]);
  useEffect(() => {
    console.log("[VideoCall] Mount => initWebSocket & startLocalStream");
    initWebSocket();
    startLocalStream();

    return () => {
      console.log("[VideoCall] Unmount => closing resources");
      if (wsRef.current) wsRef.current.close();
      if (localStream) localStream.getTracks().forEach((t) => t.stop());
      if (pcRef.current) pcRef.current.close();
    };
  }, []);
  useEffect(() => {
    if (socketReady && !callStarted) {
      console.log(
        "[VideoCall] socketReady=true & callStarted=false => startNewCall"
      );
      startNewCall();
    }
  }, [socketReady, callStarted]);
  useEffect(() => {
    if (callStarted) {
      console.log("[VideoCall] callStarted => starting timer");
      const timer = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [callStarted]);

  const initWebSocket = () => {
    console.log("[VideoCall] initWebSocket =>", WEB_SOCKET_URL);
    const ws = new WebSocket(WEB_SOCKET_URL);

    ws.onopen = () => {
      console.log("[WebSocket] onopen => connected!");
      setSocketReady(true);
    };

    ws.onmessage = (event) => {
      if (event.data) {
        console.log("[WebSocket] onmessage => raw data:", event.data);
        handleSignalMessage(event.data);
      }
    };

    ws.onclose = () => {
      console.log("[WebSocket] onclose => disconnected!");
      setSocketReady(false);
    };

    ws.onerror = (err) => {
      console.log("[WebSocket] onerror =>", err);
    };

    wsRef.current = ws;
  };

  const handleSignalMessage = (data: any) => {
    try {
      const msg: SignalType = JSON.parse(data);
      console.log("[WebSocket] onmessage => parsed msg:", msg);

      switch (msg.type) {
        case "acceptcall":
          handleAcceptCall(msg);
          break;
        case "reject":
          handleRejectCall(msg);
          break;
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
          endMeeting();
          break;
      }
    } catch (error) {
      console.log("[WebSocket] onmessage => parse error:", error);
    }
  };

  const sendSignal = (signal: SignalType) => {
    if (wsRef.current && socketReady) {
      console.log(">>> Sending:", signal);
      wsRef.current.send(JSON.stringify(signal));
    } else {
      console.log("WebSocket not ready, cannot send =>", signal);
    }
  };
  const startLocalStream = async () => {
    console.log("[VideoCall] startLocalStream => requesting camera/mic");
    try {
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: { facingMode: "user" },
      });
      console.log("[VideoCall] got localStream =>", stream);
      setLocalStream(stream);
    } catch (err) {
      console.log("[VideoCall] getUserMedia error =>", err);
    }
  };
  const startNewCall = () => {
    const newMeetingID = "dummy-random-" + Date.now();
    setMeetingID(newMeetingID);
    setCalling(true);

    console.log(
      "[VideoCall] startNewCall => newcall with meetingID=",
      newMeetingID
    );
    sendSignal({
      type: "newcall",
      meetingID: newMeetingID,
      senderName: "MobileUser",
    });
    setTimeout(() => {
      if (!callAccepted && calling) {
        console.log("[VideoCall] No acceptcall within 30s => cancelCall");
        cancelCall();
      }
    }, 30000);

    setElapsedSeconds(0);
    setCallStarted(true);
  };

  const cancelCall = () => {
    console.log("[VideoCall] cancelCall => meetingID=", meetingID);
    if (meetingID) {
      sendSignal({ type: "cancel", meetingID });
    }
    setCalling(false);
    setMeetingID(null);
    setCallStarted(false);
    setElapsedSeconds(0);
  };
  const handleAcceptCall = (s: SignalType) => {
    console.log("[VideoCall] handleAcceptCall =>", s);
    if (callAccepted || s.meetingID !== meetingID) return;
    setCallAccepted(true);
    setCalling(false);
    preparePeerConnection();
    setCallStarted(true);
  };

  const handleRejectCall = (s: SignalType) => {
    console.log("[VideoCall] handleRejectCall =>", s);
    if (!callAccepted && s.meetingID === meetingID) {
      setCalling(false);
      setMeetingID(null);
      setCallStarted(false);
      setElapsedSeconds(0);
    }
  };
  const preparePeerConnection = () => {
    console.log(
      "[VideoCall] preparePeerConnection => TURN_ENABLED=",
      TURN_ENABLED
    );

    let iceServersConfig: RTCIceServer[] = [
      { urls: "stun:stun.l.google.com:19302" },
    ];
    if (TURN_ENABLED && TURN_SERVER_URL && TURN_USER && TURN_PASS) {
      iceServersConfig = [
        {
          urls: TURN_SERVER_URL,
          username: TURN_USER,
          credential: TURN_PASS,
        },
      ];
    }

    const pc = new RTCPeerConnection({
      iceServers: iceServersConfig,
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log(
          "[PeerConnection] onicecandidate => sending",
          event.candidate
        );
        sendSignal({
          type: "icecandidate",
          candidate: event.candidate,
          meetingID: meetingID ?? "",
        });
      }
    };

    pc.onconnectionstatechange = () => {
      console.log("[PeerConnection] connectionState =>", pc.connectionState);
      if (
        pc.connectionState === "disconnected" ||
        pc.connectionState === "failed"
      ) {
        endMeeting();
      }
    };

    pc.ontrack = (event) => {
      console.log("[PeerConnection] ontrack => got remote stream");
      setRemoteStream(event.streams[0]);
    };

    if (localStream) {
      console.log("[PeerConnection] adding localStream tracks =>", localStream);
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });
    }
    pcRef.current = pc;
    sendOfferSignal();
  };

  /** --------------------------
   * OFFER / ANSWER / ICE
   * -------------------------- */
  const sendOfferSignal = async () => {
    if (!pcRef.current) return;
    try {
      console.log("[VideoCall] sendOfferSignal => createOffer");
      const offer = await pcRef.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await pcRef.current.setLocalDescription(offer);
      console.log(
        "[VideoCall] sendOfferSignal => sending offer sdp length=",
        offer.sdp?.length
      );
      sendSignal({
        type: "offer",
        sdp: offer.sdp,
        meetingID: meetingID ?? "",
      });
    } catch (err) {
      console.log("[VideoCall] sendOfferSignal error =>", err);
    }
  };

  const handleOffer = async (s: SignalType) => {
    console.log("[VideoCall] handleOffer =>", s);
    if (!pcRef.current) {
      preparePeerConnection();
    }
    if (!pcRef.current) return;

    await pcRef.current.setRemoteDescription(
      new RTCSessionDescription({ type: "offer", sdp: s.sdp })
    );
    const answer = await pcRef.current.createAnswer();
    await pcRef.current.setLocalDescription(answer);
    sendSignal({
      type: "answer",
      sdp: answer.sdp,
      meetingID: s.meetingID,
    });
  };

  const handleAnswer = async (s: SignalType) => {
    console.log("[VideoCall] handleAnswer =>", s);
    if (!pcRef.current) return;
    await pcRef.current.setRemoteDescription(
      new RTCSessionDescription({ type: "answer", sdp: s.sdp })
    );
  };

  const handleCandidate = async (s: SignalType) => {
    console.log("[VideoCall] handleCandidate =>", s);
    if (!pcRef.current || !s.candidate) return;
    try {
      await pcRef.current.addIceCandidate(new RTCIceCandidate(s.candidate));
    } catch (err) {
      console.log("[VideoCall] addIceCandidate error =>", err);
    }
  };
  const endMeeting = () => {
    console.log("[VideoCall] endMeeting => close PC & reset states");
    pcRef.current?.close();
    pcRef.current = null;
    setRemoteStream(null);
    setMeetingID(null);
    setCalling(false);
    setCallAccepted(false);
    setCallStarted(false);
    setElapsedSeconds(0);

    navigation.navigate("Scoring");
  };
  const handleSharePress = () => {
    setBoxVisible(!isBoxVisible);
    Animated.timing(animationValue, {
      toValue: isBoxVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const boxHeight = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80],
  });
  const boxOpacity = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const mm = minutes < 10 ? `0${minutes}` : minutes;
    const ss = secs < 10 ? `0${secs}` : secs;
    return `${mm}:${ss}`;
  };

  const toggleCamera = () => {
    console.log("[VideoCall] toggleCamera =>", !isCameraOn);
    setCameraOn((prev) => !prev);
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !isCameraOn;
      });
    }
  };

  const toggleMicrophone = () => {
    console.log("[VideoCall] toggleMicrophone =>", !isMicrophoneOn);
    setMicrophoneOn((prev) => !prev);
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !isMicrophoneOn;
      });
    }
  };

  const endMeetingAndNavigate = () => {
    console.log("[VideoCall] endMeetingAndNavigate =>");
    endMeeting();
  };

  const mockupData = [
    {
      id: "1",
      icon: isCameraOn ? <CameraIcon /> : <CancelCameraIcon />,
      onPress: toggleCamera,
      backgroundColor: "#1D7BF5",
    },
    {
      id: "2",
      icon: isMicrophoneOn ? <MicrofonIcon /> : <CancelMicrofonIcon />,
      onPress: toggleMicrophone,
      backgroundColor: "#1D7BF5",
    },
    {
      id: "3",
      icon: <ShareIcon />,
      onPress: handleSharePress,
      backgroundColor: "#3C4865",
    },
    {
      id: "4",
      icon: <CloseTelephoneIcon />,
      onPress: endMeetingAndNavigate,
      backgroundColor: "#1D7BF5",
    },
  ];

  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.whiteText }} />
      <View style={styles.container}>
        <Text text="Video" type="semiBold" size="20" position="center" />
        <View style={styles.videocallScreen}>
          {showGif ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../assets/gif/signing.gif")}
                style={{
                  width: scale(300),
                  height: scale(300),
                  marginLeft: 40,
                  bottom: 100,
                }}
                resizeMode="contain"
              />
            </View>
          ) : (
            <>
              <Text
                text={formatTime(elapsedSeconds)}
                type="regular"
                size="16"
                position="center"
                style={globalStyle.space20VT}
              />
              <View style={{ flex: 1, width: "100%" }}>
                {localStream && (
                  <RTCView
                    style={{
                      width: "100%",
                      height: "50%",
                      backgroundColor: "#333",
                    }}
                    streamURL={localStream.toURL()}
                    objectFit="cover"
                  />
                )}
                {remoteStream && (
                  <RTCView
                    style={{
                      width: "100%",
                      height: "50%",
                      backgroundColor: "#666",
                    }}
                    streamURL={remoteStream.toURL()}
                    objectFit="cover"
                  />
                )}
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate("Chat")}
                style={styles.messageContainer}
              >
                <MessageIcon />
              </TouchableOpacity>

              <View style={styles.callStick}>
                {mockupData.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={item.onPress}
                    style={[
                      styles.stickBox,
                      { backgroundColor: item.backgroundColor },
                    ]}
                  >
                    {item.icon}
                  </TouchableOpacity>
                ))}
                <Animated.View
                  style={[
                    styles.settingsBox,
                    {
                      height: boxHeight,
                      opacity: boxOpacity,
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={[styles.stickBox, { backgroundColor: "#1D7BF5" }]}
                  >
                    <AddUserIcon />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.stickBox, { backgroundColor: "#1D7BF5" }]}
                  >
                    <ShareScreenIcon />
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </>
          )}
        </View>
      </View>
      <ContractModal state={isModalOpen} setState={setModalOpen} />
    </>
  );
}
