package az.esam.kredit.kredit.ws;

import org.springframework.web.socket.handler.TextWebSocketHandler;

/**
 *
 * @author cihan
 */
//@Component
public class SocketHandler11 extends TextWebSocketHandler {
/*
    public static List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
    private static final Logger logger = Logger.getLogger("SocketHandler");

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message)
            throws InterruptedException, IOException {
        try {
            String senderIP = session.getRemoteAddress().getHostString();
            logger.info("sender : ".concat(senderIP));
            logger.info("message : ".concat(message.getPayload().length() < 150 ? message.getPayload() : message.getPayload().substring(0, 149)));

            for (WebSocketSession webSocketSession : sessions) {
                if (webSocketSession.isOpen() && !webSocketSession.getId().equals(session.getId())) {
                    synchronized (webSocketSession) {
                        try {
                            webSocketSession.sendMessage(message);
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
*/
}
