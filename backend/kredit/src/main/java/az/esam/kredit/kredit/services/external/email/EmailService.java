package az.esam.kredit.kredit.services.external.email;

import java.util.List;

public interface EmailService {

    boolean sendEmail(String from, String to, String subject, String text);

    void sendMailWithAttachment(String from, String to, String subject, String text, List<String> ticketFiles);

}
