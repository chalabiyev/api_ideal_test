package az.esam.kredit.kredit.ws;

/**
 *
 * @author cihan
 */
public class MeetingInfo {

    private String clientIP = "";
    private String operatorIP = "";
    private String notaryIp = "";
    private boolean callStarted = false;

    public MeetingInfo() {
    }

    public MeetingInfo(String clientIP) {
        this.clientIP = clientIP;
    }

    public MeetingInfo(String clientIP, String operatorIp) {
        this.clientIP = clientIP;
        this.operatorIP = operatorIp;
    }

    public String getClientIP() {
        return clientIP;
    }

    public void setClientIP(String clientIP) {
        this.clientIP = clientIP;
    }

    public String getOperatorIP() {
        return operatorIP;
    }

    public void setOperatorIP(String operatorIP) {
        this.operatorIP = operatorIP;
    }

    public boolean isCallStarted() {
        return callStarted;
    }

    public void setCallStarted(boolean callStarted) {
        this.callStarted = callStarted;
    }

    public String getNotaryIp() {
        return notaryIp;
    }

    public void setNotaryIp(String notaryIp) {
        this.notaryIp = notaryIp;
    }

}
