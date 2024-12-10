package az.esam.kredit.kredit.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "e-point")
public class EPointPaymentProperties {

    private String privateKey;
    private String publicKey;
    private String language;
    private String currency;
    private String successURL;
    private String errorUrl;
    private String apiUrl;
    private String origin;

}
