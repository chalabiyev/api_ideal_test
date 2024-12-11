import React, { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

export interface WebsocketContextType {
    ready: boolean;
    value: string | null;
    send: (value: string) => void;
}

export interface SignalType {
    sender?: string;
    receiver?: string;
    type: 'newcall' | 'cancel' | 'answer' | 'offer' | 'pranswer' | 'rollback' | 'icecandidate' | 'acceptcall' | 'operatorReady';
    date?: Date;
    clientName?: string | null;
    clientPin?: string | null;
    meetingID?: string | null;
    sdp?: string;
    operator?: string | null;
    candidate?: RTCIceCandidate | null;
}

export const WebsocketContext = React.createContext<WebsocketContextType>({ ready: false, send: () => { }, value: null });
//                                            ready, value, send

// Make sure to put WebsocketProvider higher up in
// the component tree than any consumer.
export const WebsocketProvider = ({ children }: { children: any }) => {
    const webSocketKey = import.meta.env.VITE_WEB_SOCKET_KEY;
    const webSocketUri = import.meta.env.VITE_WEB_SOCKET_URL;
    const [isReady, setIsReady] = useState(false)
    const [val, setVal] = useState<string | null>(null)
    const [clientUUID, setClientUUID] = useState(localStorage.getItem("clientUUID"));

    const ws = useRef<any>(null)

    useEffect(() => {
        console.log("websocket initialized...");
        if (!clientUUID) {
            let newClientUUID = uuidv4();
            setClientUUID(newClientUUID);
            localStorage.setItem("clientUUID", newClientUUID);
        }
        let socket = new WebSocket(webSocketUri);
        const onOpen = () => {
            setIsReady(true);
            setRet({ ...ret, ready: true });
            socket.send(JSON.stringify({ "type": "setClientUUID", "clientUUID": clientUUID, "socketKEY": webSocketKey }));
            console.log("connected..");
        }
        const onClose = () => {
            setIsReady(false);
        }

        socket.onopen = onOpen;
        socket.onclose = onClose;
        socket.onmessage = (event) => {
            if (event.data) {
                try {
                    let msg = JSON.parse(event.data);
                    msg.msgid = uuidv4();
                    let strmsg = JSON.stringify(msg);
                    setVal(strmsg);
                    setRet({ ...ret, ready: socket.readyState == 1, value: strmsg });
                } catch (error) {

                }
            }
        };
        ws.current = socket;

        setInterval(() => {
            if (socket.readyState == WebSocket.CLOSED) {
                socket = new WebSocket(webSocketUri);
                socket.onopen = onOpen;
                socket.onclose = onClose;
                socket.onmessage = (event) => setVal(event.data);
                ws.current = socket;
            }
        }, 30000);

        return () => {
            socket.close();
        }
    }, [])

    const sendF = (data: any) => {
        console.log("sendf", data, ws.current.readyState);
        if (ws.current && ws.current.readyState == 1) {
            let msg = { ...data, "clientUUID": clientUUID };
            ws.current.send(JSON.stringify(msg));
        }
    }

    const [ret, setRet] = React.useState<WebsocketContextType>({
        ready: isReady,
        send: sendF,
        value: val
    });

    return (
        <WebsocketContext.Provider value={ret}>
            {children}
        </WebsocketContext.Provider >
    )
}