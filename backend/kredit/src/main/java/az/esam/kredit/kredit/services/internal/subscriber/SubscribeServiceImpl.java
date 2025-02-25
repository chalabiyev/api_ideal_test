package az.esam.kredit.kredit.services.internal.subscriber;

import az.esam.kredit.kredit.dtos.requests.SubscribeRequest;
import az.esam.kredit.kredit.entities.content_management.Campaign;
import az.esam.kredit.kredit.entities.content_management.Subscriber;
import az.esam.kredit.kredit.repositories.content_management.CampaignRepository;
import az.esam.kredit.kredit.repositories.content_management.SubscriberRepository;
import az.esam.kredit.kredit.services.external.email.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

import static az.esam.kredit.kredit.services.internal.subscriber.ContentHtml.subscribeHtmlContent;
import static az.esam.kredit.kredit.services.internal.subscriber.ContentHtml.unSubscribeHtmlContent;

@Service
@Slf4j
public class SubscribeServiceImpl implements SubscribeService {

    @Value("${spring.mail.username}")
    private String from;

    @Autowired
    private SubscriberRepository subscriberRepository;

    @Autowired
    EmailService emailService;

    @Autowired
    CampaignRepository campaignRepository;

    public static final String url = "https://kreditlanding.studentall.az";

    @Override
    public boolean subscribe(SubscribeRequest request) throws BadRequestException {
        String email = request.getEmail();
        if (subscriberRepository.existsByEmail(email)) {
            log.info("Subscriber with email {} already exists", email);
            throw new RuntimeException("Subscriber with email " + email + " already exists");
        }
        Subscriber subscriber = Subscriber.builder()
                .email(email)
                .active(true)
                .subscribedAt(new Date())
                .build();

        subscriberRepository.save(subscriber);
        log.info("Subscribing email {}", email);
        sendWelcomeEmail(email);
        log.info("Welcome email sent to {}", email);
        return true;
    }

    @Override
    public boolean unsubscribe(SubscribeRequest request) throws BadRequestException {
        String email = request.getEmail();
        Subscriber subscriber = subscriberRepository.findByEmail(email).orElse(null);
        if (subscriber == null) {
            log.info("Subscriber with email {} does not exist", email);
            throw new RuntimeException("Subscriber with email " + email + " does not exist");
        }

        log.info("Unsubscribing email {}", email);
        subscriberRepository.delete(subscriber);
        sendUnsubscribeEmail(email);
        log.info("Unsubscribe email sent to {}", email);
        return true;
    }

    private void sendWelcomeEmail(String email) throws BadRequestException {
        emailService.sendEmail(
                from,
                email,
                "Wunderkingə xoş gəldiniz!",
                subscribeHtmlContent
        );
    }

    private void sendUnsubscribeEmail(String email) throws BadRequestException {
        emailService.sendEmail(
                from,
                email,
                "Abunəlikdən çıxmısınız",
                unSubscribeHtmlContent
        );
    }

    @Override
    public boolean sendCampaignEmail(String campaignId) {
        try {
            Campaign campaign = campaignRepository.findById(campaignId)
                    .orElseThrow(() -> new RuntimeException("Campaign with this id does not exist"));

            String htmlContent = "<!DOCTYPE html>" +
                    "<html>" +
                    "<head>" +
                    "<style>" +
                    "body {font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;}" +
                    ".container {max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px;}" +
                    ".header {background-color: #007BFF; padding: 20px; color: white; text-align: center; font-size: 24px;}" +
                    ".content {padding: 20px; font-size: 16px; color: #333333;}" +
                    ".footer {background-color: #f4f4f4; text-align: center; padding: 10px; font-size: 12px; color: #888888;}" +
                    "</style>" +
                    "</head>" +
                    "<body>" +
                    "<div class='container'>" +
                    "<div class='header'>Yeni kampaniya: " + campaign.getTitle() + "</div>" +
                    "<div class='content'>" +
                    "<p>" + (campaign.getDescription().length() > 50 ?
                    campaign.getDescription().substring(0, 50) + "..." :
                    campaign.getDescription()) + "</p>" +
                    "<p><a href='" + url + "/kampaniyalar/" + campaign.getId() + "'>Read More</a></p>" +
                    "</div>" +
                    "<div class='footer'>" +
                    "© 2024 Ideal Kredit. All rights reserved." +
                    "</div>" +
                    "</div>" +
                    "</body>" +
                    "</html>";

            subscriberRepository.findAllByActiveTrue().forEach(
                    subscriber -> {
                        try {
                            emailService.sendEmail(
                                    from,
                                    subscriber.getEmail(),
                                    "Yeni məqalə: " + campaign.getTitle(),
                                    htmlContent);
                        } catch (BadRequestException e) {
                            log.error("Error sending email to {}", subscriber.getEmail());
                            throw new RuntimeException(e);
                        }
                    }
            );

            campaign.setSubscriptionMailSent(true);
            campaignRepository.save(campaign);
            return true;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Subscriber> list() {
        return subscriberRepository.findAll();
    }

    @Override
    public boolean changeStatus(String email) {
        Subscriber subscriber = subscriberRepository.findByEmail(email).orElse(null);
        if (subscriber == null) {
            log.info("Subscriber with email {} does not exist", email);
            throw new RuntimeException("Subscriber with email " + email + " does not exist");
        }

        subscriber.setActive(!subscriber.isActive());
        subscriberRepository.save(subscriber);
        return subscriber.isActive();
    }
}
