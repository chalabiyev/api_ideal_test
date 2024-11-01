package az.esam.kredit.kredit.ws;

import az.esam.kredit.kredit.entities.VideoMeeting;
import az.esam.kredit.kredit.services.internal.videoMeet.VideoMeetingService;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author cihan
 */
@Component
public class SocketHandler extends TextWebSocketHandler {

    private static final String socketKEY = "0916d3d3-f102-4932-be77-cd0084e13c74";
    public static List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
    private static final Logger logger = Logger.getLogger("SocketHandler");
    private static final List<String> sendAllTypes = Arrays
            .asList("acceptcall",
                    "acceptcallnotary",
                    "answer",
                    "callNotary",
                    "cancel",
                    "ClientCheck",
                    "clientOK",
                    "endmeeting",
                    "reject",
                    "rejectnotary",
                    "newcall"
            );
    private static final List<String> setMeetingIdTypes = Arrays
            .asList("acceptcall",
                    "acceptcallnotary",
                    "newcall"
            );

    VideoMeetingService videoMeetingService;

    @Autowired
    public SocketHandler(VideoMeetingService _videoMeetingService) {
        this.videoMeetingService = _videoMeetingService;
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message)
            throws InterruptedException, IOException {
        try {
            Document document = Document.parse(message.getPayload());
            boolean sendAll = false;
            String meetingID = document.containsKey("meetingID") ? document.getString("meetingID") : "";
            if (document.containsKey("type")) {
                if ("setClientUUID".equals(document.getString("type")) && !session.getAttributes().containsKey("clientUUID")) {
                    session.getAttributes().put("clientUUID", document.getString("clientUUID"));
                    if (socketKEY.equals(document.getString("socketKEY"))) {
                        session.getAttributes().put("secured", true);
                    } else {
                        session.getAttributes().put("secured", false);
                        return;
                    }
                    for (WebSocketSession socket : sessions) {
                        try {
                            if (socket.getAttributes().containsKey("meetingID") && socket.getAttributes().get("clientUUID").equals(session.getAttributes().get("clientUUID"))) {
                                session.getAttributes().put("meetingID", socket.getAttributes().get("meetingID"));
                                break;
                            }
                        } catch (Exception e) {
                        }
                    }
                } else if (sendAllTypes.contains(document.getString("type"))) {
                    sendAll = true;
                    if ("endmeeting".equals(document.getString("type"))) {
                        Optional<VideoMeeting> foundedMeeting = videoMeetingService.findByMeetingId(meetingID);
                        if (foundedMeeting.isPresent()) {
                            VideoMeeting vm = foundedMeeting.get();
                            vm.setEndTime(new Date());
                            videoMeetingService.update(vm);
                        }
                    }
                }
                if (setMeetingIdTypes.contains(document.getString("type"))) {
                    session.getAttributes().put("meetingID", meetingID);
                    for (WebSocketSession socket : sessions) {
                        try {
                            if (socket.getAttributes().get("clientUUID").equals(session.getAttributes().get("clientUUID"))) {
                                socket.getAttributes().put("meetingID", meetingID);
                            }
                        } catch (Exception e) {
                        }
                    }
                    if ("newcall".equals(document.getString("type"))) {
                        if (videoMeetingService.findByMeetingId(meetingID).isEmpty()) {
                            videoMeetingService.create(VideoMeeting
                                    .builder()
                                    .meetingId(meetingID)
                                    .clientIP(session.getRemoteAddress().getHostString())
                                    .clientId(session.getAttributes().get("clientUUID").toString())
                                    .startTime(new Date())
                                    .build());
                        }
                    } else if ("acceptcall".equals(document.getString("type"))) {
                        Optional<VideoMeeting> foundedMeeting = videoMeetingService.findByMeetingId(meetingID);
                        if (foundedMeeting.isPresent()) {
                            VideoMeeting vm = foundedMeeting.get();
                            vm.setOperatorIP(session.getRemoteAddress().getHostString());
                            vm.setOperatorId(session.getAttributes().get("clientUUID").toString());
                            videoMeetingService.update(vm);
                        }
                    } else if ("acceptcallnotary".equals(document.getString("type"))) {
                        Optional<VideoMeeting> foundedMeeting = videoMeetingService.findByMeetingId(meetingID);
                        if (foundedMeeting.isPresent()) {
                            VideoMeeting vm = foundedMeeting.get();
                            vm.setNoterIP(session.getRemoteAddress().getHostString());
                            vm.setNoterId(session.getAttributes().get("clientUUID").toString());
                            videoMeetingService.update(vm);
                        }
                    }
                }
            }
            String senderIP = session.getRemoteAddress().getHostString();
            logger.info("sender : ".concat(senderIP));
            logger.info("sender ClientUUID : ".concat(document.containsKey("clientUUID") ? document.getString("clientUUID") : ""));
            logger.info("message : ".concat(message.getPayload().length() < 150 ? message.getPayload() : message.getPayload().substring(0, 149)));

            for (WebSocketSession webSocketSession : sessions) {
                if (webSocketSession.isOpen() && !webSocketSession.getId().equals(session.getId())) {
                    synchronized (webSocketSession) {
                        try {
                            if (sendAll || webSocketSession.getAttributes().get("meetingID").equals(session.getAttributes().get("meetingID"))) {
                                webSocketSession.sendMessage(message);
                            }
                        } catch (Exception e) {
                            logger.log(Level.FINE, "Error", e);
                        }
                    }
                }
            }
        } catch (Exception e) {
            logger.log(Level.FINE, "Error", e);
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        session.setTextMessageSizeLimit(5000000);
        sessions.add(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        try {
            sessions.remove(session);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error", e);
        }
    }

    @Scheduled(fixedDelay = 30000)
    public void printSessionCount() {
        for (WebSocketSession session : sessions) {
            try {
                if (!session.getAttributes().containsKey("secured") || !(boolean) session.getAttributes().get("secured")) {
                    session.close();
                }
            } catch (IOException ex) {
                logger.log(Level.SEVERE, null, ex);
            }
        }
        logger.info(String.format("Active web socket sessions : %d", sessions.size()));
    }
}
