package az.esam.kredit.kredit.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.data.annotation.Id;

import java.util.Date;

@AllArgsConstructor
@Builder
public class VideoMeeting {

    @Id
    private String id;
    private String meetingId;
    private String clientId;
    private String clientIP;
    private String operatorId;
    private String operatorIP;
    private String noterId;
    private String noterIP;
    private Date startTime;
    private Date endTime;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getClientIP() {
        return clientIP;
    }

    public void setClientIP(String clientIP) {
        this.clientIP = clientIP;
    }

    public String getOperatorId() {
        return operatorId;
    }

    public void setOperatorId(String operatorId) {
        this.operatorId = operatorId;
    }

    public String getOperatorIP() {
        return operatorIP;
    }

    public void setOperatorIP(String operatorIP) {
        this.operatorIP = operatorIP;
    }

    public String getNoterId() {
        return noterId;
    }

    public void setNoterId(String noterId) {
        this.noterId = noterId;
    }

    public String getNoterIP() {
        return noterIP;
    }

    public void setNoterIP(String noterIP) {
        this.noterIP = noterIP;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public String getMeetingId() {
        return meetingId;
    }

    public void setMeetingId(String meetingId) {
        this.meetingId = meetingId;
    }
}
