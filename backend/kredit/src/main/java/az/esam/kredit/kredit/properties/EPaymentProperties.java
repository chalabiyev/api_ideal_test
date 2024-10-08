package az.esam.kredit.kredit.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "united-payment")
@Data
public class EPaymentProperties {

    private String apiUrl;
    private String mail;
    private String password;
    private String partnerId;
    private String currency;
    private String language;
    private String successUrl;
    private String cancelUrl;
    private String declineUrl;
}
