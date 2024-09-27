package az.esam.kredit.kredit.email;

public interface EmailService {

    boolean sendEmail(String from, String to, String subject, String text);

}
