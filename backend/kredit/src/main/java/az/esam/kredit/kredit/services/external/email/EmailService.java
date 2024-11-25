package az.esam.kredit.kredit.services.external.email;

import org.apache.coyote.BadRequestException;

import java.util.List;

public interface EmailService {

    boolean sendEmail(String from, String to, String subject, String text) throws BadRequestException;

    void sendMailWithAttachment(String from, String to, String subject, String text, List<String> ticketFiles) throws BadRequestException;

}
