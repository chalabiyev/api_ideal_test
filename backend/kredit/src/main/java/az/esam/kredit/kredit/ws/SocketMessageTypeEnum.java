package az.esam.kredit.kredit.ws;

/**
 *
 * @author cihan
 */
public enum SocketMessageTypeEnum {
    setClientUUID,
    newcall,
    cancel,
    answer,
    offer,
    pranswer,
    rollback,
    icecandidate,
    acceptcall,
    reject,
    sendOfferAgain,
    endmeeting,
    chatincome,
    print,
    incomingfile,
    showSignText,
    hideSignText,
    startVideoRecord,
    stopVideoRecord,
    videoRecord,
    signPdf,
    signingPdf
}
