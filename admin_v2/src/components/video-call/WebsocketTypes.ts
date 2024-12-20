export interface WebsocketContextType {
    ready: boolean;
    value: string | null;
    clientUUID: string;
    ws: WebSocket | null;
}

export interface SignalType {
    msgid?: string;
    sender?: string;
    senderName?: string;
    senderPin?: string;
    receiver?: string;
    receiverName?: string;
    receiverPin?: string;
    type: 'newcall' | 'cancel' | 'answer' | 'offer' | 'pranswer' | 'rollback' | 'icecandidate' | 'acceptcall' | 'reject' | 'sendOfferAgain' | 'endmeeting' | 'chatincome' | 'print' | 'incomingfile';
    meetingID?: string | null;
    sdp?: string;
    candidate?: RTCIceCandidate | null;
    msg?: string;
}