import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { SignalType } from "./WebsocketTypes";

export interface EsamVideoCallOperatorProp {
    ws: WebSocket;
    value: SignalType | null;
    clientUUID: string;
    localStream: MediaStream;
    localPin: string;
    localName: string;
    newCallReceived: boolean;
    setNewCallReceived: (value: boolean, signal: SignalType) => void;
    onReceiverConnected: (signal: SignalType) => void;
    onReceiverStream: (stream: MediaStream) => void;
    endMeeting: boolean;
    acceptCall: boolean;
}


export const EsamVideoCallOperator = (prop: EsamVideoCallOperatorProp) => {
    const turnServerURL = import.meta.env.VITE_TURN_SERVER_URL;
    const turnEnabled = false;// import.meta.env.VITE_TURN_ENABLED;
    const turnUser = import.meta.env.VITE_TURN_USER;
    const turnPass = import.meta.env.VITE_TURN_PASSWORD;
    const [meetingID, setMeetingID] = useState<string>("");
    const [receiverName, setReceiverName] = useState<string>("");
    const [receiverPin, setReceiverPin] = useState<string>("");
    const [receiver, setReceiver] = useState<string>("");
    const [inCall, setInCall] = useState<boolean>(false);
    const [calling, setCalling] = useState<boolean>(false);
    const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>();


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
        setPeerConnection(new RTCPeerConnection(
            turnEnabled ? turnConfiguration : configuration
        ));
    }

    const sendCamAndMicStreams = async () => {
        console.log("sendCamAndMicStreams", peerConnection, prop);
        if (!peerConnection) return;
        if (!prop.localStream) {
            alert("Webcam bağlantısı kurulamadı!");
        }
        prop.localStream.getTracks().forEach((track) => {
            console.log("peerConnection.addTrack", track);
            peerConnection.addTrack(track, prop.localStream);
        });
    };

    const displayRemoteStream = (e: RTCTrackEvent) => {
        try {
            let strm = e.streams[0];
            prop.onReceiverStream(strm);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCandidate = async (s: SignalType) => {
        if (!peerConnection || !s.candidate || !peerConnection.remoteDescription) return;
        await peerConnection.addIceCandidate(s.candidate);
    };

    const sendSignal = (data: SignalType) => {
        if (prop.ws && prop.ws.readyState == WebSocket.OPEN) {
            let msg = { ...data, "clientUUID": prop.clientUUID, sender: prop.clientUUID };
            prop.ws.send(JSON.stringify(msg));
        }
    }

    useEffect(() => {
        if (!peerConnection) return;

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                sendSignal({
                    type: 'icecandidate',
                    candidate: event.candidate,
                    meetingID: meetingID
                    , receiver: receiver
                });
            }
        };

        peerConnection.onconnectionstatechange = () => {
            console.log("peerConnection.onconnectionstatechange", peerConnection.connectionState);
            if (peerConnection.connectionState == "connected") {
                sendCamAndMicStreams();
            } else if (peerConnection.connectionState == "failed") {
                console.log("Retrying connection...");
                peerConnection.close();
                preparePeerConnection();
            } else if (peerConnection.connectionState == 'disconnected') {
                setCalling(false);
                setInCall(false);
                setReceiver("");
                setReceiverName("");
                setReceiverPin("");
                prop.setNewCallReceived(false, { type: 'cancel' });
            }
        };
        peerConnection.ontrack = displayRemoteStream;

    }, [peerConnection]);

    const handleNewCall = (s: SignalType) => {
        if (inCall || !prop.setNewCallReceived || !s.meetingID || !s.sender || !s.senderName) return;
        setMeetingID(s.meetingID);
        setReceiver(s.sender);
        setReceiverName(s.senderName);
        if (s.senderPin)
            setReceiverPin(s.senderPin);
        prop.setNewCallReceived(true, s);
    }

    useEffect(() => {
        if (!prop.newCallReceived) return;
        if (prop.acceptCall) {
            setInCall(true);
            sendSignal({ type: 'acceptcall', receiver: receiver, meetingID: meetingID });
            preparePeerConnection();
        } else {
            sendSignal({ type: 'reject', receiver: receiver, meetingID: meetingID });
            setInCall(false);
            setReceiver("");
            setReceiverName("");
            setReceiverPin("");
        }
    }, [prop.acceptCall]);

    useEffect(() => {
        if (!prop.newCallReceived || !prop.acceptCall) return;
        sendSignal({ type: 'endmeeting', receiver: receiver, meetingID: meetingID });
        setInCall(false);
        setReceiver("");
        setReceiverName("");
        setReceiverPin("");
    }, [prop.endMeeting]);

    const handleOffer = async (s: SignalType) => {
        if (!peerConnection) return;
        let remoteDesc = new RTCSessionDescription({ type: "offer", sdp: s.sdp });
        await peerConnection.setRemoteDescription(remoteDesc);
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        sendSignal({ type: 'answer', sdp: answer.sdp, receiver: receiver });
    }

    const handleCancel = (s: SignalType) => {
        if (s.meetingID != meetingID || s.sender != receiver) return;
        setInCall(false);
        setReceiver("");
        setReceiverName("");
        setReceiverPin("");
        prop.setNewCallReceived(false, s);
    }


    const listenSignals = (s: SignalType) => {
        if (s.type == 'newcall' || s.type == 'cancel' || s.receiver == prop.clientUUID) {
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
                case "icecandidate":
                    handleCandidate(s);
                    break;
            }
        }
    }

    useEffect(() => {
        if (prop.value)
            listenSignals(prop.value);
    }, [prop.value]);

    return (<></>);
}
