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
    VideoMeetingService videoMeetingService;

    @Autowired
    public SocketHandler(VideoMeetingService _videoMeetingService) {
        this.videoMeetingService = _videoMeetingService;
    }

    void sendMessageToAllOperators(TextMessage message) {
        List<WebSocketSession> operatorSessions = sessions.stream().filter(f -> f.getAttributes().containsKey("isOperator") && (boolean) f.getAttributes().get("isOperator") == true).toList();
        for (WebSocketSession webSocketSession : operatorSessions) {
            if (webSocketSession.isOpen()) {
                synchronized (webSocketSession) {
                    try {
                        webSocketSession.sendMessage(message);
                    } catch (Exception e) {
                        logger.log(Level.FINE, "Error", e);
                    }
                }
            }
        }
    }

    void sendMessageToClientId(TextMessage message, String receiver) {
        List<WebSocketSession> operatorSessions = sessions.stream().filter(f -> f.getAttributes().containsKey("clientUUID") && f.getAttributes().get("clientUUID").equals(receiver)).toList();
        for (WebSocketSession webSocketSession : operatorSessions) {
            if (webSocketSession.isOpen()) {
                synchronized (webSocketSession) {
                    try {
                        webSocketSession.sendMessage(message);
                    } catch (Exception e) {
                        logger.log(Level.FINE, "Error", e);
                    }
                }
            }
        }
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message)
            throws InterruptedException, IOException {
        try {
            Document document = Document.parse(message.getPayload());
            boolean sendAll = false;
            String meetingID = document.containsKey("meetingID") ? document.getString("meetingID") : "";
            String sender = document.containsKey("sender") ? document.getString("sender") : "";
            String receiver = document.containsKey("receiver") ? document.getString("receiver") : "";
            String senderIP = session.getRemoteAddress().getHostString();
            if (document.containsKey("type")) {
                SocketMessageTypeEnum type = SocketMessageTypeEnum.valueOf(document.getString("type"));
                switch (type) {
                    case setClientUUID:
                        if (!session.getAttributes().containsKey("clientUUID")) {
                            session.getAttributes().put("clientUUID", document.getString("clientUUID"));
                            if (document.containsKey("operator")) {
                                session.getAttributes().put("isOperator", true);
                            } else {
                                session.getAttributes().put("isOperator", false);
                            }
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
                        }
                        break;
                    case newcall:
                        if (videoMeetingService.findByMeetingId(meetingID).isEmpty()) {
                            videoMeetingService.create(VideoMeeting
                                    .builder()
                                    .meetingId(meetingID)
                                    .clientIP(senderIP)
                                    .clientId(session.getAttributes().get("clientUUID").toString())
                                    .startTime(new Date())
                                    .build());
                        }
                        sendMessageToAllOperators(message);
                        break;
                    case acceptcall:
                        Optional<VideoMeeting> foundedMeeting = videoMeetingService.findByMeetingId(meetingID);
                        if (foundedMeeting.isPresent()) {
                            VideoMeeting vm = foundedMeeting.get();
                            vm.setOperatorIP(senderIP);
                            vm.setOperatorId(session.getAttributes().get("clientUUID").toString());
                            videoMeetingService.update(vm);
                            sendMessageToAllOperators(message);
                            sendMessageToClientId(message, receiver);
                        }
                        break;
                    case reject:
                        sendMessageToAllOperators(message);
                        sendMessageToClientId(message, receiver);
                        break;
                    default:
                        sendMessageToClientId(message, receiver);
                        break;
                }
            }
            logger.info("sender : ".concat(senderIP));
            logger.info("sender ClientUUID : ".concat(document.containsKey("clientUUID") ? document.getString("clientUUID") : ""));
            logger.info("message : ".concat(message.getPayload().length() < 150 ? message.getPayload() : message.getPayload().substring(0, 149)));
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
