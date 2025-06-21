package az.esam.kredit.kredit.services.external.email;

import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;


@Service
@Slf4j
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String from;

    @Override
    public boolean sendEmail(String from, String to, String subject, String text) throws BadRequestException {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true);

            message.setHeader("Disposition-Notification-To", from);

            javaMailSender.send(message);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new BadRequestException(e.getMessage());
        }
    }


    @Override
    public void sendMailWithAttachment(String from, String to, String subject, String text, List<String> ticketFiles) throws BadRequestException {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true);

            for (String ticketFile : ticketFiles) {
                try {
                    FileSystemResource file = new FileSystemResource(new File(ticketFile));
                    if (file.exists()) { // Check if the file exists before adding
                        helper.addAttachment(file.getFilename(), file);
                    } else {
                        log.warn("File not found: " + ticketFile);
                    }
                } catch (Exception e) {
                    log.error("Error attaching file: " + ticketFile + ". Error: " + e.getMessage());
                }
            }
            javaMailSender.send(message);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new BadRequestException(e.getMessage());
        }
    }
}
