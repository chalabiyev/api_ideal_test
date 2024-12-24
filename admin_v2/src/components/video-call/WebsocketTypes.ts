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
    senderPhoto?: string;
    receiver?: string;
    receiverName?: string;
    receiverPin?: string;
    newCallType?: string;
    type: 'newcall' | 'cancel' | 'answer' | 'offer' | 'pranswer' | 'rollback' | 'icecandidate' | 'acceptcall' | 'reject' | 'sendOfferAgain' | 'endmeeting' | 'chatincome' | 'print' | 'incomingfile' | 'showSignText' | 'hideSignText' | 'startVideoRecord' | 'stopVideoRecord' | 'videoRecord' | 'signPdf' | 'signingPdf';
    meetingID?: string | null;
    sdp?: string;
    candidate?: RTCIceCandidate | null;
    msg?: string;
}