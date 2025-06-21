package az.esam.kredit.kredit.services.internal.leasing;

import az.esam.kredit.kredit.entities.Leasing;
import az.esam.kredit.kredit.services.external.email.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class LeasingServiceImpl implements LeasingService {

    @Autowired
    private EmailService emailService;

    @Value("${spring.mail.username}")
    private String senderEmail;

    //@Value("#{'${leasing.recipientEmails}'.split(',')}")
    // private List<String> recipientEmails;

    private int currentIndex = 0;
    private final Object lock = new Object();

    @Override
    public String sendRequestToNextEmail(Leasing leasing) {
        String recipientEmail1 = "sevda.a@idealkredit.az";
        String recipientEmail2 = "gunel.eliyeva@idealkredit.az";
//        synchronized (lock) {
//            recipientEmail = recipientEmails.get(currentIndex);
//            currentIndex = (currentIndex + 1) % recipientEmails.size();
//        }

        String htmlContent = buildLeasingEmailHtml(leasing);
        log.info(htmlContent);

        try {
            emailService.sendEmail(senderEmail, recipientEmail1, "Yeni lizinq müraciəti", htmlContent);
            log.info("Letter sent from {} to {}", senderEmail, recipientEmail1);

            emailService.sendEmail(senderEmail, recipientEmail2, "Yeni lizinq müraciəti", htmlContent);
            log.info("Letter sent from {} to {}", senderEmail, recipientEmail2);
        } catch (BadRequestException e) {
            log.error("Error while sending email to {}: {}", recipientEmail1, e.getMessage());
        }

        return recipientEmail1;
    }

    private String buildLeasingEmailHtml(Leasing leasing) {
        return """
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }
                .header {
                    background-color: #007BFF;
                    color: white;
                    padding: 15px;
                    text-align: center;
                    font-size: 20px;
                    border-radius: 5px 5px 0 0;
                }
                .mobile {
                    background-color: #e9f5ff;
                    padding: 15px;
                    margin-top: 20px;
                    border-left: 5px solid #007BFF;
                    font-size: 18px;
                    color: #007BFF;
                    font-weight: bold;
                }
                .content {
                    padding: 20px;
                    color: #333;
                    font-size: 16px;
                }
                .content p {
                    margin: 8px 0;
                }
                .footer {
                    text-align: center;
                    padding: 10px;
                    font-size: 12px;
                    color: #999;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">Yeni Lizinq Müraciəti</div>
                
                <div class="mobile">
                    Mobil nömrə: %s
                </div>
                
                <div class="content">
                    <p><strong>Avtomobilin dəyəri:</strong> %s AZN</p>
                    <p><strong>İlkin ödəniş:</strong> %s AZN</p>
                    <p><strong>Lizinq məbləği:</strong> %s AZN</p>
                    <p><strong>Lizinq müddəti:</strong> %s ay</p>
                </div>
                
                <div class="footer">
                    © 2025 Ideal Kredit. Bütün hüquqlar qorunur.
                </div>
            </div>
        </body>
        </html>
        """.formatted(
                leasing.getMobileNumber(),
                leasing.getCarValue(),
                leasing.getInitialPayment(),
                leasing.getLeasingAmount(),
                leasing.getLeasingPeriod()
        );
    }
}
